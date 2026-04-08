'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { Play, X, Film, Zap } from 'lucide-react'
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

export default function CinematicNarrative({ clips = [] }: CinematicNarrativeProps) {
  const [activeVideo, setActiveVideo] = useState<VideoClip | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!clips || clips.length === 0) return null

  return (
    <section id="reels" className="bg-obsidian py-24 md:py-32 px-6 md:px-16 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-deep/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clips.map((clip, index) => (
            <motion.div
              key={clip._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative aspect-[16/9] bg-forest-deep/20 overflow-hidden border border-white/5 shadow-2xl cursor-pointer"
              onClick={() => setActiveVideo(clip)}
            >
              <Image
                src={urlForImage(clip.previewImage).url()}
                alt={clip.title}
                fill
                className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-colors duration-500" />
              
              {/* Play Button HUD */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                  <Play size={24} className="text-obsidian fill-obsidian ml-1" />
                </div>
              </div>

              {/* Title Info */}
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase font-sans tracking-[0.3em] text-forest-light mb-1">{clip.category || 'Reel'}</p>
                <p className="text-cream font-serif italic text-xl">{clip.title}</p>
              </div>

              {/* Architectural Detail */}
              <div className="absolute top-4 right-4 text-[9px] font-sans tracking-widest text-white/20">
                CHPT_{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal (Theater Mode) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-cream/60 hover:text-white flex items-center gap-2 group transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans">Close Studio</span>
                <X size={20} />
              </button>

              <video 
                src={activeVideo.videoUrl} 
                className="w-full h-full object-contain" 
                controls 
                autoPlay 
              />
              
              <div className="absolute -bottom-16 md:-bottom-20 left-0 w-full flex justify-between items-end border-t border-white/10 pt-6">
                <div>
                   <h3 className="text-cream text-2xl md:text-3xl font-serif italic">{activeVideo.title}</h3>
                   <p className="text-[10px] uppercase tracking-[0.5em] text-forest-light mt-2">{activeVideo.category || 'Editorial Narrrative'}</p>
                </div>
                <div className="hidden md:flex items-center gap-4 text-white/20 mb-2">
                   <Zap size={14} />
                   <span className="text-[8px] uppercase tracking-[0.3em]">4K Cinematic Rendering Path</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
