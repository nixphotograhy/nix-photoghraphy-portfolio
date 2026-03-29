'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'

interface PremiumFooterProps {
  contactInfo?: {
    email?: string
    phone?: string
  }
  socialLinks?: {
    instagram?: string
    twitter?: string
  }
}

export default function PremiumFooter({ contactInfo, socialLinks }: PremiumFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-obsidian pt-24 md:pt-64 pb-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto h-[1px] bg-white/10 mb-16 md:mb-24" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-16">
        
        {/* Column 1: Branding & Philosophy */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left gap-12">
          <Link href="/">
            <h4 className="text-4xl md:text-5xl font-serif italic text-cream tracking-tighter">Nix.</h4>
          </Link>
          <p className="max-w-md text-forest-light/60 font-sans font-light leading-relaxed tracking-wide text-xs md:text-base">
            Documenting humanity from an archival perspective. Nix bridges the gap between raw reality and high-editorial curation. High-fidelity documentation for the cinematic curator.
          </p>
        </div>

        {/* Column 2: Navigation / Sitemap */}
        <div className="flex flex-col items-center md:items-start gap-8">
          <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-white/20">Studio Navigation</span>
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/gallery" className="text-sm md:text-base font-serif italic text-cream hover:text-forest-light transition-colors">Archives Case</Link>
            <Link href="/#about" className="text-sm md:text-base font-serif italic text-cream hover:text-forest-light transition-colors">About Us</Link>
            <Link href="/#contact" className="text-sm md:text-base font-serif italic text-cream hover:text-forest-light transition-colors">Book A Shoot</Link>
          </div>
        </div>

        {/* Column 3: Social / Connection */}
        <div className="flex flex-col items-center md:items-start gap-8">
          <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-white/20 text-center md:text-left">Global Connection</span>
          <div className="flex items-center gap-6">
            <Link href={socialLinks?.instagram || "https://www.instagram.com/nix_photography_09?igsh=MXhtcWJsdDNibDE1cA=="} target="_blank" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-cream hover:bg-white/10 transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href={`mailto:${contactInfo?.email || "vikaskakare7@gmail.com"}`} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-cream hover:bg-white/10 transition-colors">
              <Mail size={20} />
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2 w-full">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-forest-light/40">
              <MapPin size={10} />
              <span>India-Based / Global Commissions</span>
            </div>
            {[
              { icon: Instagram, label: 'Instagram', value: '@nix_photography_09', href: socialLinks?.instagram || 'https://www.instagram.com/nix_photography_09?igsh=MXhtcWJsdDNibDE1cA==' },
              { icon: Mail, label: 'Email', value: contactInfo?.email || 'vikaskakare7@gmail.com', href: `mailto:${contactInfo?.email || 'vikaskakare7@gmail.com'}` },
              { icon: Phone, label: 'Mobile', value: contactInfo?.phone || '+91 7020037904', href: `tel:${contactInfo?.phone?.replace(/\s/g, '') || '+917020037904'}` }
            ].map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/60 hover:text-cream transition-colors">
                <item.icon size={10} />
                <span>{item.value}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Baseline Legals */}
      <div className="max-w-7xl mx-auto mt-24 md:mt-48 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 opacity-30 text-[9px] uppercase tracking-[0.6em] font-sans text-center">
        <p>© {currentYear} Nix Studio — All Rights Reserved.</p>
        <p className="hidden md:block">Curated Design By Nix & Co.</p>
        <div className="flex items-center gap-12">
            <span>Privat_01</span>
            <span>Terms_02</span>
        </div>
      </div>
    </footer>
  )
}
