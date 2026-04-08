'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Preloader() {
  const [mounted, setMounted] = useState(false)
  const [percent, setPercent] = useState(0)
  const pathname = usePathname()

  // Use a spring for buttery smooth progress bar movements
  const progressSpring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)

    if (pathname?.startsWith('/studio')) return

    // Elite Beast: Session-based loading logic
    const hasVisited = sessionStorage.getItem('nix_visited')
    if (hasVisited) {
      setPercent(100)
      return
    }

    // Faster interval and larger increments for a snappy, non-chopy feel
    const interval = setInterval(() => {
      setPercent(prev => {
        const next = prev + Math.floor(Math.random() * 25) + 15
        if (next >= 100) {
          clearInterval(interval)
          sessionStorage.setItem('nix_visited', 'true')
          return 100
        }
        return next
      })
    }, 60) // Even faster for Elite performance

    // Safety Escape: Force load completion if it takes more than 2 seconds
    const timeout = setTimeout(() => {
      setPercent(100)
      sessionStorage.setItem('nix_visited', 'true')
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [pathname])

  useEffect(() => {
    progressSpring.set(percent)
  }, [percent, progressSpring])

  if (!mounted || pathname?.startsWith('/studio')) return null

  return (
    <AnimatePresence>
      {percent < 100 && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
          }}
          className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center cursor-none"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif italic text-cream"
            >
              Nix.
            </motion.h1>
            
            <div className="flex flex-col items-center gap-4">
              {/* Progress Bar with Spring Smoothing */}
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-cream"
                  style={{ width: `${percent}%` }}
                />
              </div>
              
              <motion.span 
                className="text-white/40 text-[10px] font-sans tracking-[0.4em] uppercase"
                key={percent}
              >
                {/* 01-100 Format as requested */}
                {percent.toString().padStart(2, '0')}% — Initializing
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
