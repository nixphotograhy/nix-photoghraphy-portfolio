'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { Play, Pause, Film, Zap, Volume2, VolumeX } from 'lucide-react'
import type { Image as SanityImage } from 'sanity'

interface VideoClip {
  _id: string
  title: string
  category?: string
  videoUrl: string
  previewImage: SanityImage
}

interface CinematicNarrativeProps {
  clips: VideoClip[]
}

function ReelCard({ 
  clip, 
  index,
  activeAudioId,
  activeVideoId,
  onAudioToggle,
  onPlayToggle
}: { 
  clip: VideoClip; 
  index: number;
  activeAudioId: string | null;
  activeVideoId: string | null;
  onAudioToggle: (id: string, isMuting: boolean) => void;
  onPlayToggle: (id: string, isPlaying: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)

  // Derived state based on global mutual exclusion
  const isPlaying = activeVideoId === clip._id
  const isMuted = activeAudioId !== clip._id

  // Control Playback
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setHasError(true))
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  // Control Audio
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      // For iOS Safari explicit binding if unmuting while playing
      if (!isMuted && isPlaying) {
        videoRef.current.play().catch(() => setHasError(true))
      }
    }
  }, [isMuted, isPlaying])

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      onPlayToggle(clip._id, true)
    }
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      onPlayToggle(clip._id, false)
      if (videoRef.current) videoRef.current.currentTime = 0
      onAudioToggle(clip._id, true) // ensure it mutes when leaving
    }
  }

  const handleToggle = (e: React.MouseEvent) => {
    onPlayToggle(clip._id, !isPlaying)
    if (isPlaying) {
      onAudioToggle(clip._id, true) // auto-mute if paused manually
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation() 
    onAudioToggle(clip._id, !isMuted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[16/9] group relative bg-forest-deep/20 overflow-hidden border border-white/5 shadow-2xl cursor-pointer snap-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
    >
      {/* Fallback Image / Preview */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={urlForImage(clip.previewImage).url()}
              alt={clip.title}
              fill
              className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-colors duration-500" />
            
            {/* Play Button HUD */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-cream/90 flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                <Play size={24} className="text-obsidian fill-obsidian ml-1" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Video Element - preload="none" stops bandwidth hogging */}
      <video
        ref={videoRef}
        src={clip.videoUrl}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        loop
        playsInline
        preload="none"
      />

      {/* Volume Toggle HUD */}
      <button 
        onClick={toggleMute}
        className={`absolute top-4 right-12 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-all ${isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        {isMuted ? (
          <VolumeX size={16} className="text-cream" />
        ) : (
          <Volume2 size={16} className="text-cream" />
        )}
      </button>

      {/* Title Info Visibility on Hover or playing */}
      <div className={`absolute bottom-0 left-0 p-6 md:p-8 w-full z-20 transition-all duration-500 ${isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase font-sans tracking-[0.3em] text-forest-light mb-1">{clip.category || 'Reel'}</p>
            <p className="text-cream font-serif italic text-xl md:text-2xl">{clip.title}</p>
          </div>
          {isPlaying && (
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Pause size={16} className="text-cream" />
            </div>
          )}
        </div>
      </div>

      {/* Architectural Detail */}
      <div className="absolute top-4 right-4 text-[9px] font-sans tracking-widest text-white/20 z-20">
        REEL_REF_{index + 1}
      </div>
    </motion.div>
  )
}

export default function CinematicNarrative({ clips = [] }: CinematicNarrativeProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Mutual Exclusion State
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null)

  const handlePlayToggle = (id: string, isPlaying: boolean) => {
    setActiveVideoId(isPlaying ? id : null)
    // If playing a new video, ensure only it has audio active if there was overlapping audio
    if (isPlaying && activeAudioId && activeAudioId !== id) {
       setActiveAudioId(null) // mute the old one
    }
  }

  const handleAudioToggle = (id: string, isMuting: boolean) => {
    setActiveAudioId(isMuting ? null : id)
  }

  if (!clips || clips.length === 0) return null

  return (
    <section id="reels" className="bg-obsidian pt-16 pb-16 md:pb-32 px-0 overflow-hidden relative scroll-mt-20 md:scroll-mt-28">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-deep/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="px-6 md:px-16 lg:px-24 mb-12 md:mb-20">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-forest-light">
              <Film size={20} className="animate-pulse" />
              <span className="text-[10px] uppercase font-sans tracking-[0.5em] font-bold">Motion / Narrative</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif italic text-cream leading-tight">
              Cinematic <br className="hidden md:block" /> Reels
            </h2>
          </div>
          <p className="max-w-md text-forest-light/60 font-sans text-sm md:text-base leading-relaxed border-l border-forest-light/10 pl-6">
            Capturing the flow of time beyond the static frame. Our narrative reels are editorial-grade segments designed to evoke atmosphere and emotion.
          </p>
        </header>
      </div>

      {/* The Cinematic Strip: Horizontal Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-12 overflow-x-auto px-6 md:px-16 lg:px-24 pb-12 cursor-grab active:cursor-grabbing no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {clips.map((clip, index) => (
          <ReelCard 
            key={clip._id} 
            clip={clip} 
            index={index} 
            activeAudioId={activeAudioId}
            activeVideoId={activeVideoId}
            onAudioToggle={handleAudioToggle}
            onPlayToggle={handlePlayToggle}
          />
        ))}
        
        {/* Spacer at the end for clean padding */}
        <div className="flex-shrink-0 w-6 md:w-24 h-full" />
      </div>

      {/* Visual Navigation Hint */}
      <div className="flex justify-center mt-8 gap-2">
        {clips.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />
        ))}
      </div>
    </section>
  )
}
