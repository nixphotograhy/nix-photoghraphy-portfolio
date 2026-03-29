'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

interface PhilosophySectionProps {
  heading?: string
  body?: string
  image?: SanityImage
  focusAreas?: string[]
}

const FALLBACK_FOCUS = [
  "Wedding Narratives",
  "Editorial Shoots",
  "Street Noir"
]

export default function PhilosophySection({ 
  heading = "EXPERIENCE THE NARRATIVE", 
  body = "Photography is more than a capture...", 
  image,
  focusAreas = FALLBACK_FOCUS
}: PhilosophySectionProps) {
  return (
    <section id="about" className="bg-obsidian py-16 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        
        {/* LEFT COMPONENT: Narrative & Typography */}
        <div className="relative z-10 w-[90%] lg:w-full self-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-forest-light tracking-[0.6em] uppercase text-[10px] md:text-xs font-sans mb-8 block">
              The Aesthetic Ethos
            </span>
            
            <h2 className="text-cream text-[14vw] md:text-8xl font-serif italic leading-[1.1] md:leading-[0.85] tracking-tighter mb-12">
              {heading}
            </h2>

            <div className="max-w-xl space-y-8">
              <p className="text-cream/80 text-base md:text-2xl font-sans font-light leading-relaxed tracking-wide">
                {body}
              </p>
              
              <div className="h-[1px] w-24 bg-forest-light/30" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-white/20">Expertise / Focus</span>
                <div className="flex flex-col gap-4">
                  {(focusAreas?.length ? focusAreas : FALLBACK_FOCUS).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-1 h-1 rounded-full bg-forest-light group-hover:scale-150 transition-transform" />
                      <span className="text-xs md:text-sm uppercase tracking-widest text-cream/60 group-hover:text-cream transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COMPONENT: Deep Editorial Image */}
        <div className="relative w-[85%] lg:w-full self-end lg:self-auto -mt-12 lg:mt-0">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
             className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto"
          >
            {/* Architectural Frame Accents */}
            <div className="absolute -inset-4 border border-white/5 pointer-events-none z-20" />
            <div className="absolute top-0 right-0 p-4 z-20">
               <span className="text-white/20 text-[10px] font-sans tracking-[0.5em] uppercase vertical-text">Nix Signature</span>
            </div>

            <div className="relative w-full h-full overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              {image ? (
                <Image
                  src={urlForImage(image).url()}
                  alt="Nix Philosophy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] ease-out hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-forest-deep/20" />
              )}
            </div>

            {/* Floating Detail */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 1 }}
               className="absolute -bottom-8 -left-8 bg-cream p-8 md:p-12 shadow-2xl z-20 hidden md:block"
            >
               <p className="text-obsidian text-3xl font-serif italic leading-[1.1] md:leading-none">Est. 2024</p>
               <p className="text-obsidian/40 text-[8px] uppercase tracking-widest mt-2 font-sans">Global Commissions</p>
            </motion.div>
          </motion.div>

          {/* Background Typography */}
          <span className="absolute -top-32 -right-32 text-[20rem] font-serif italic text-white/5 select-none pointer-events-none -z-10">
            Art
          </span>
        </div>

      </div>
    </section>
  )
}
