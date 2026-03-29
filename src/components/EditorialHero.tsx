'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

interface EditorialHeroProps {
  title?: string
  subtitle?: string
  heroImage?: SanityImage
  editorialText?: string
}

export default function EditorialHero({ 
  title = "Nix Portfolio", 
  subtitle = "DOCUTORIAL PHOTOGRAPHER", 
  heroImage,
  editorialText 
}: EditorialHeroProps) {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-end p-6 md:p-16 lg:p-24 overflow-hidden pt-40 md:pt-48 mb-12 md:mb-0">
      
      {/* CINEMATIC LIGHT LEAK: A high-fidelity entry flare that triggers after the preloader */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-orange-500/10 via-red-500/5 to-transparent mix-blend-screen"
      />

      {/* Background Image Container with Architectural Frame */}
      <div className="absolute inset-0 z-0 bg-obsidian">
        {heroImage ? (
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] }}
            className="relative w-full h-full p-4 md:p-8"
          >
            {/* The Frame: Architectural blueprint marks for premium aesthetic */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 z-10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 z-10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 z-10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 z-10" />

            <Image
              src={urlForImage(heroImage).url() || ''}
              alt={title || 'Nix Portfolio'}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
              style={{
                objectPosition: heroImage.hotspot
                  ? `${heroImage.hotspot.x * 100}% ${heroImage.hotspot.y * 100}%`
                  : 'center',
              }}
              className="object-cover grayscale-[0.1] brightness-[0.7] transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-80" />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-forest-deep opacity-20" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end pb-12">
        <div className="lg:col-span-8 flex flex-col items-start pr-4 md:pr-0">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-forest-light tracking-[0.4em] uppercase text-[10px] md:text-sm font-sans mb-4"
          >
            {subtitle}
          </motion.p>
          
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
            className="text-white text-[15vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-serif italic leading-[1.1] md:leading-[0.85] tracking-tighter"
          >
            {title}
          </motion.h1>
        </div>

        <div className="lg:col-span-4 self-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="max-w-xs md:max-w-sm mt-12 md:mt-24 border-l border-white/10 pl-6 md:pl-8"
          >
            <p className="text-cream/50 text-[9px] md:text-xs uppercase tracking-[0.5em] leading-relaxed">
              {editorialText || "ARCHIVAL DOCUMENTATION // HIGH-FIDELITY CINEMATIC"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section Divider Accent */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 2, ease: "circIn" }}
        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-white/10 via-transparent to-transparent" 
      />
    </section>
  )
}
