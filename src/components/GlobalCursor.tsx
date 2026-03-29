'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function GlobalCursor() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const pathname = usePathname()
  
  // Motion values
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // SNAPPY PHYSICS: Increased stiffness to 550 for zero-lag tracking (Award-Winning Snappiness)
  const springConfig = { damping: 28, stiffness: 550, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    // Check for touch device
    const touchQuery = window.matchMedia('(pointer: coarse)')
    setIsTouch(touchQuery.matches)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    if (typeof window !== 'undefined' && !touchQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  // Don't render custom cursor on Sanity Studio route or Touch Devices
  if (!mounted || pathname?.startsWith('/studio') || isTouch) return null

  return (
    <>
      {/* Precision Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cream rounded-full pointer-events-none mix-blend-difference z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      {/* Luxury Trailing Ring (Now Snappier) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none mix-blend-difference z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    </>
  )
}
