'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'
import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface MasonryImage extends SanityImage {
  slug?: string
  projectTitle?: string
}

interface MasonryGridProps {
  images?: MasonryImage[]
  title?: string
  isLightboxEnabled?: boolean
}

export default function MasonryGrid({ images = [], title = "ARCHIVES", isLightboxEnabled = false }: MasonryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handlePrevious = useCallback(() => {
    if (activeIndex === null) return
    setActiveIndex(prev => (prev! === 0 ? images.length - 1 : prev! - 1))
  }, [activeIndex, images.length])

  const handleNext = useCallback(() => {
    if (activeIndex === null) return
    setActiveIndex(prev => (prev! === images.length - 1 ? 0 : prev! + 1))
  }, [activeIndex, images.length])

  const handleClose = useCallback(() => {
    setActiveIndex(null)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, handlePrevious, handleNext, handleClose])

  if (images.length === 0) return null

  return (
    <section id="gallery" className="bg-obsidian py-16 md:py-24 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-4 mb-16 border-b border-forest-light/10 pb-6 sm:pb-8">
        <h2 className="text-5xl md:text-6xl font-serif italic text-cream leading-[1.1] md:leading-none tracking-tighter">
          {title}
        </h2>
        <span className="text-forest-light tracking-[0.2em] uppercase text-[9px] md:text-xs font-sans text-left sm:text-right">
          Collection 2026 <span className="sm:hidden">|</span><br className="hidden sm:block"/> &mdash; {images.length} {images.length === 1 ? 'Frame' : 'Frames'}
        </span>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
        {images.map((image, index) => {
          const content = (
            <div 
              className="relative aspect-[3/4] transition-all duration-700 hover:scale-[1.03] grayscale-[0.8] hover:grayscale-0 group"
              onClick={() => isLightboxEnabled && setActiveIndex(index)}
            >
              <Image
                src={urlForImage(image).url() || ''}
                alt={image.projectTitle || 'Gallery image'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{
                  objectPosition: image.hotspot
                    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                    : 'center',
                }}
                className="object-cover transition-opacity duration-700"
              />
              {/* Tonal Overlay */}
              <div className="absolute inset-0 bg-forest-deep mix-blend-multiply opacity-10 group-hover:opacity-0 transition-opacity" />
              
              {/* Detail Info Overlay - Elite Beast Refinement for Mobile */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent">
                <p className="text-[8px] md:text-[10px] uppercase font-sans tracking-[0.4em] text-forest-light mb-1">
                  Collection {image.projectTitle || 'Editorial'}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-cream text-sm md:text-lg font-serif italic">Frame {index + 1}</span>
                  {isLightboxEnabled ? (
                    <Maximize2 size={16} className="text-cream/40" />
                  ) : image.slug && (
                    <span className="text-[7px] md:text-[8px] uppercase font-sans tracking-[0.3em] text-white bg-white/10 px-3 py-2 rounded-full w-fit self-start sm:self-auto border border-white/5">
                      View Project
                    </span>
                  )}
                </div>
              </div>
            </div>
          )

          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1, 
                delay: (index % 3) * 0.2, 
                ease: [0.33, 1, 0.68, 1] 
              }}
              className="relative break-inside-avoid group overflow-hidden rounded-[0px]"
            >
              {!isLightboxEnabled && image.slug ? (
                <Link href={`/gallery/${image.slug}`} className="block">
                  {content}
                </Link>
              ) : (
                content
              )}
            </motion.div>
          )
        })}
      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-8 md:p-24"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
            
            {/* Top Navigation HUD */}
            <div className="absolute top-12 inset-x-12 flex justify-between items-center z-20">
              <div className="flex flex-col gap-1">
                <span className="text-forest-light tracking-[0.4em] uppercase text-[10px] font-sans">{title}</span>
                <span className="text-cream font-serif italic text-lg leading-none">Frame {activeIndex + 1} / {images.length}</span>
              </div>
              <button 
                onClick={handleClose}
                className="w-14 h-14 md:w-12 md:h-12 border border-white/10 rounded-full flex items-center justify-center text-cream hover:bg-white/10 transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={24} className="md:size-5" />
              </button>
            </div>

            {/* Main Image Container */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full h-full max-w-6xl z-10"
            >
              <Image
                src={urlForImage(images[activeIndex]).url()}
                alt={title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Pagination Controls */}
            <div className="absolute bottom-12 inset-x-12 flex justify-between items-end z-20">
               <button 
                onClick={handlePrevious}
                className="group flex flex-col items-start gap-4"
                aria-label="Previous Image"
               >
                 <span className="text-forest-light tracking-[0.4em] uppercase text-[9px] font-sans opacity-40 group-hover:opacity-100 transition-opacity hidden md:block">Previous</span>
                 <div className="w-16 h-16 md:w-12 md:h-12 border border-white/10 rounded-full flex items-center justify-center text-cream group-hover:bg-white/10 transition-colors">
                    <ChevronLeft size={28} className="md:size-5" />
                 </div>
               </button>

               <button 
                onClick={handleNext}
                className="group flex flex-col items-end gap-4"
                aria-label="Next Image"
               >
                 <span className="text-forest-light tracking-[0.4em] uppercase text-[9px] font-sans opacity-40 group-hover:opacity-100 transition-opacity hidden md:block">Next Narrative</span>
                 <div className="w-16 h-16 md:w-12 md:h-12 border border-white/10 rounded-full flex items-center justify-center text-cream group-hover:bg-white/10 transition-colors">
                    <ChevronRight size={28} className="md:size-5" />
                 </div>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
