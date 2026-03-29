'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MENU_LINKS = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[40] bg-obsidian flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Subtle Background Grain / Accent */}
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
          
          <nav className="flex flex-col items-center gap-12 z-50">
            {MENU_LINKS.map((link, index) => (
              <motion.div 
                key={link.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.6, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <Link 
                  href={link.href} 
                  onClick={onClose}
                  className="text-5xl md:text-8xl font-serif italic text-cream hover:text-forest-light transition-colors relative group block"
                >
                  <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm font-sans not-italic text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-white/40 text-[10px] uppercase font-sans tracking-[0.4em]">
              The Cinematic Curator
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
