'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

interface FilmStripGalleryProps {
  images?: SanityImage[]
}

const LUXURY_EASE = [0.76, 0, 0.24, 1]

export default function FilmStripGallery({ images = [] }: FilmStripGalleryProps) {
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-100%", "200%"]), springConfig)
  const sheenOpacity = useSpring(useTransform(mouseX, [-0.5, 0.5], [0.05, 0.25]), springConfig)

  // Pure mathematical mapping for physics: completely safe from strings causing Spring to NaN crash!
  const cursorX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, mounted && typeof window !== 'undefined' ? window.innerWidth : 1000]), { damping: 20, stiffness: 250 })
  const cursorY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, mounted && typeof window !== 'undefined' ? window.innerHeight : 800]), { damping: 20, stiffness: 250 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = (touch.clientX - rect.left) / rect.width - 0.5
    const y = (touch.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleTouchEnd = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  useEffect(() => {
    setMounted(true)
    if (images.length === 0) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-[60vh] md:h-screen bg-obsidian flex items-center justify-center overflow-hidden cursor-none py-24 md:py-0"
      style={{ perspective: "2000px" }}
    >
      <div className="absolute top-12 left-12 z-50 pointer-events-none">
        <span className="text-white/20 text-[10px] uppercase tracking-[1em]">Archive Chamber</span>
        <h4 className="text-cream/40 text-xs italic">NX.{new Date().getFullYear()}</h4>
      </div>

      <motion.div style={{ rotateX, rotateY }} className="relative w-[85vw] h-[70vh] md:w-[60vw] md:h-[80vh] preserve-3d">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, z: -1500, rotateY: 30, filter: "blur(30px) brightness(0.1)" }}
            animate={{ opacity: 1, z: 0, rotateY: 0, filter: "blur(0px) brightness(0.9)" }}
            exit={{ opacity: 0, z: 1500, rotateY: -30, filter: "blur(40px) brightness(2)" }}
            transition={{ duration: 2.2, ease: LUXURY_EASE }}
            className="absolute inset-0 preserve-3d"
          >
            <div className="relative w-full h-full overflow-hidden border border-white/5 bg-black shadow-2xl">
              <Image
                src={urlForImage(images[index]).url() || ''}
                alt={(images[index] as any).alt || 'Archive Frame'}
                fill
                priority
                className="object-cover scale-[1.05] grayscale-[0.2] transition-all duration-[6000ms] ease-linear"
                style={{
                  objectPosition: (images[index] as any).hotspot
                    ? `${(images[index] as any).hotspot.x * 100}% ${(images[index] as any).hotspot.y * 100}%`
                    : 'center',
                }}
              />
              <motion.div style={{ left: sheenX, opacity: sheenOpacity }} className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] pointer-events-none blur-3xl z-20" />
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="absolute -bottom-20 left-0 right-0 flex justify-between items-end">
              <span className="text-white/40 text-[9px] uppercase tracking-[0.8em]">NX_RECORD_{index + 1}</span>
              <span className="text-white/10 text-[8px] uppercase tracking-[0.3em]">ISO_200 // f/1.4</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
        <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div key={index} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} className="absolute top-0 left-0 h-full bg-cream/50" />
        </div>
        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-white/20">Archive Sequence // {index + 1} of {images.length}</span>
      </div>

    </section>
  )
}
