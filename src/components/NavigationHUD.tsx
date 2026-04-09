'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import MenuOverlay from '@/components/MenuOverlay'

export const MENU_LINKS = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reels', href: '/#reels' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function NavigationHUD() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  
  // Header background opacity increases on scroll for maximum contrast
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 0.9])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Do not render navigation HUD on Sanity Studio route to prevent hydration/DOM conflicts
  if (!mounted || pathname?.startsWith('/studio')) return null

  return (
    <>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* REFINED SOLID HEADER: Ensuring 100% visibility natively within a Pill */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-[60] pointer-events-none"
      >
        <div className="w-full max-w-7xl mx-auto bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-5 py-3 md:px-8 md:py-3 flex items-center justify-between pointer-events-auto">
          
          {/* Branding: NIX PHOTOGRAPHY Logo */}
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="group flex-shrink-0">
            <h1 className="text-lg md:text-xl font-serif italic text-white flex items-center gap-3 md:gap-4 tracking-tight">
              Nix <span className="opacity-40 font-sans text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] pt-0.5">Photography</span>
            </h1>
          </Link>

          {/* Navigation HUD Items */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-8">
              {MENU_LINKS.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="group relative text-[9px] uppercase font-sans tracking-[0.4em] text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
              
              <div className="h-4 w-[1px] bg-white/10" />

              <Link 
                href="/#contact" 
                className="text-[9px] uppercase font-sans tracking-[0.4em] text-obsidian bg-cream hover:bg-forest-light px-5 py-2 rounded-full transition-all duration-300 font-bold"
              >
                Inquiry
              </Link>
            </div>

            {/* Bold Mobile Toggle: Ensuring visibility on all devices */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="flex flex-col gap-1.5 w-10 h-10 items-end justify-center group flex-shrink-0 relative z-[70]"
              aria-label="Toggle Menu"
            >
              <div className="h-[2px] w-7 bg-white transition-all duration-300 group-hover:bg-forest-light" />
              <div className="h-[1px] w-5 bg-white/60 transition-all duration-300 group-hover:bg-forest-light" />
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
