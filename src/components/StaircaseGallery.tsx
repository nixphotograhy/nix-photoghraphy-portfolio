'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

interface StaircaseGalleryProps {
  images?: SanityImage[]
}

export default function StaircaseGallery({ images = [] }: StaircaseGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Fluid viewport-based parallax shifts to scale perfectly on mobile and desktop
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-5vw"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vw", "-15vw"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vw", "-25vw"])

  if (!images || images.length === 0) return null

  const displayImages = images.slice(0, 3)

  return (
    <section id="stairs" ref={containerRef} className="bg-obsidian pt-24 pb-16 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col relative">
        
        {/* Architectural Guide Line (Top to Bottom) */}
        <div className="absolute top-0 left-12 w-[1px] h-full bg-forest-light/5 hidden md:block" />

        {/* Step 01: Top Left */}
        {displayImages[0] && (
          <motion.div 
            style={{ y: y1 }}
            viewport={{ once: true }}
            className="relative z-10 w-[60%] md:w-[35%] self-start flex flex-col gap-4 md:gap-12 mt-16 md:mt-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/5 shadow-2xl group">
              {/* Corner Architectural Marks */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <Image 
                src={urlForImage(displayImages[0]).url()} 
                alt="Editorial Step 01" 
                fill 
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                style={{
                    objectPosition: (displayImages[0] as any).hotspot
                      ? `${(displayImages[0] as any).hotspot.x * 100}% ${(displayImages[0] as any).hotspot.y * 100}%`
                      : 'center',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Step 02: Center Step */}
        {displayImages[1] && (
          <motion.div 
            style={{ y: y2 }}
            viewport={{ once: true }}
            className="relative z-20 w-[60%] md:w-[35%] self-center mt-4 md:-mt-32 lg:-mt-48 flex flex-col gap-4 md:gap-12"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/5 shadow-[0_60px_120px_rgba(0,0,0,0.6)] group">
               {/* Corner Architectural Marks */}
               <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <Image 
                src={urlForImage(displayImages[1]).url()} 
                alt="Editorial Step 02" 
                fill 
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                style={{
                  objectPosition: (displayImages[1] as any).hotspot
                    ? `${(displayImages[1] as any).hotspot.x * 100}% ${(displayImages[1] as any).hotspot.y * 100}%`
                    : 'center',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Step 03: Bottom Right */}
        {displayImages[2] && (
          <motion.div 
            style={{ y: y3 }}
            viewport={{ once: true }}
            className="relative z-10 w-[60%] md:w-[35%] self-end mt-4 md:-mt-32 lg:-mt-48 flex flex-col gap-4 md:gap-12"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/5 shadow-2xl group">
               {/* Corner Architectural Marks */}
               <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <Image 
                src={urlForImage(displayImages[2]).url()} 
                alt="Editorial Step 03" 
                fill 
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                style={{
                  objectPosition: (displayImages[2] as any).hotspot
                    ? `${(displayImages[2] as any).hotspot.x * 100}% ${(displayImages[2] as any).hotspot.y * 100}%`
                    : 'center',
                }}
              />
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}
