'use client'

import { motion } from 'framer-motion'

interface QuoteSectionProps {
  quote?: string
  author?: string
}

export default function QuoteSection({ quote, author }: QuoteSectionProps) {
  if (!quote) return null

  return (
    <section className="bg-obsidian py-16 md:py-32 px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.div
         initial={{ scale: 0.9, opacity: 0 }}
         whileInView={{ scale: 1, opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
         className="max-w-4xl"
      >
        <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-cream leading-tight tracking-tight mb-8">
          "{quote}"
        </blockquote>
        {author && (
          <cite className="text-forest-light tracking-[0.4em] uppercase text-[10px] md:text-xs font-sans not-italic">
            — {author}
          </cite>
        )}
      </motion.div>
      
      {/* Dynamic Scale Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
        className="h-[1px] w-24 bg-forest-light/60 mt-16"
      />
    </section>
  )
}
