'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface GalleryProjectHeroProps {
  title: string
  category?: string
  description?: string
  mainImage: SanityImage
}

export default function GalleryProjectHero({ title, category, description, mainImage }: GalleryProjectHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden bg-obsidian">
      
      {/* Background with subtle parallax/zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={urlForImage(mainImage).url()}
            alt={title}
            fill
            priority
            className="object-cover grayscale-[0.3] brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        </motion.div>
      </div>

      {/* Back Button */}
      <Link 
        href="/#gallery" 
        className="absolute top-32 left-8 md:left-16 lg:left-24 z-20 flex items-center gap-4 group cursor-none"
      >
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-cream group-hover:text-obsidian transition-all duration-500">
          <ArrowLeft size={18} />
        </div>
        <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
          Return to Archives
        </span>
      </Link>

      {/* Project Meta */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-start gap-8">
          
          <div className="flex flex-col gap-2">
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-forest-light tracking-[0.6em] uppercase text-[10px] md:text-xs font-sans"
            >
              {category || 'Editorial'} collection
            </motion.span>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
              className="text-white text-5xl md:text-7xl lg:text-9xl font-serif italic leading-[1.1] md:leading-none tracking-tighter"
            >
              {title}
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="max-w-2xl border-l border-forest-light/20 pl-8 mt-4"
          >
            <p className="text-cream/70 text-sm md:text-lg font-sans font-light leading-relaxed tracking-wide italic">
              {description || "An editorial deep-dive exploring the intersection of raw documentation and high-fashion aesthetics."}
            </p>
          </motion.div>

        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 right-8 md:right-16 lg:right-24 hidden md:flex flex-col items-center gap-4"
      >
         <span className="text-[9px] uppercase font-sans tracking-[0.5em] text-white/20 rotate-90 origin-right translate-x-4">Scroll to View Content</span>
         <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>

    </section>
  )
}
