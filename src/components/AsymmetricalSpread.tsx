'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

interface AsymmetricalSpreadProps {
  title?: string
  image?: SanityImage
  description?: string
  reversed?: boolean
}

export default function AsymmetricalSpread({ 
  title = "THE ARCHIVAL NARRATIVE", 
  image, 
  description = "A deep dive into the raw, candid moments that define our docutorial approach.",
  reversed = false
}: AsymmetricalSpreadProps) {
  return (
    <section className="bg-obsidian py-24 md:py-32 px-8 md:px-16 lg:px-24 flex flex-col items-center">
      <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Large Image Frame (Offset) */}
        <motion.div 
          initial={{ x: reversed ? 50 : -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className={`lg:col-span-8 relative aspect-[4/5] md:aspect-[16/10] overflow-hidden ${reversed ? 'lg:order-last' : ''}`}
        >
          {image ? (
            <Image
              src={urlForImage(image).url() || ''}
              alt={title || 'Featured Work'}
              fill
              className="object-cover transition-transform duration-1000 scale-105 hover:scale-100"
              style={{
                objectPosition: image.hotspot
                  ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                  : 'center',
              }}
            />
          ) : (
             <div className="w-full h-full bg-forest-deep/10" />
          )}
          
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-[0.03]" />
        </motion.div>

        {/* Floating Editorial Content */}
        <div className={`lg:col-span-4 flex flex-col ${reversed ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-5xl font-serif italic text-cream leading-tight tracking-tight mb-8"
          >
            {title}
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.5 }}
            className={`border-t pt-8 border-forest-light/10 max-w-sm`}
          >
            <p className="text-forest-light/80 text-sm md:text-base font-sans font-light leading-relaxed">
              {description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <span className="text-cream tracking-[0.4em] uppercase text-[10px] font-sans border-b border-cream/20 pb-2 cursor-pointer hover:border-cream transition-all">
              Explore The Spread
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
