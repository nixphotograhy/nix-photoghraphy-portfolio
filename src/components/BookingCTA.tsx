'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Mail, Phone, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const CATEGORIES = [
  'Wedding Shoot',
  'Pre-wedding Shoot',
  'Editorial Shoot',
  'Modeling Shoot',
]

interface BookingCTAProps {
  contactInfo?: {
    email?: string
    phone?: string
    commissionStatus?: string
  }
  socialLinks?: {
    instagram?: string
    twitter?: string
  }
}

export default function BookingCTA({ contactInfo, socialLinks }: BookingCTAProps) {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'wedding', details: '' })

  return (
    <section id="contact" className="bg-obsidian py-16 md:py-32 px-6 md:px-16 lg:px-24 flex flex-col items-center scroll-mt-24 md:scroll-mt-32">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: Branding & Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start gap-12">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 py-2 px-4 border border-forest-light/20 rounded-full"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-forest-light">Project Enquiries Open</span>
            </motion.div>

            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-[12vw] md:text-8xl lg:text-9xl font-serif italic text-cream leading-[1.1] md:leading-[0.85] tracking-tighter"
            >
              Document your <br /> next <span className="text-forest-light/40">narrative.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-cream/50 text-sm md:text-lg max-w-lg font-sans leading-relaxed tracking-wide mt-4 italic pl-4 border-l border-forest-light/10"
            >
              {contactInfo?.commissionStatus || "Limited availability for global commissions. We prioritize narratives that resonate with our docutorial philosophy."}
            </motion.p>

            {/* Social HUD */}
            <div className="flex flex-wrap gap-12 mt-12 py-12 border-t border-forest-light/10 w-full">
               {[
                 { 
                   icon: Instagram, 
                   label: 'Instagram', 
                   value: socialLinks?.instagram ? '@nix_photography_09' : '@nix_photography_09', // Value display logic
                   href: socialLinks?.instagram || 'https://www.instagram.com/nix_photography_09?igsh=MXhtcWJsdDNibDE1cA==' 
                 },
                 { 
                   icon: Mail, 
                   label: 'Email', 
                   value: contactInfo?.email || 'vikaskakare7@gmail.com', 
                   href: `mailto:${contactInfo?.email || 'vikaskakare7@gmail.com'}` 
                 },
                 { 
                   icon: Phone, 
                   label: 'Mobile', 
                   value: contactInfo?.phone || '+91 7020037904', 
                   href: `tel:${contactInfo?.phone?.replace(/\s/g, '') || '+917020037904'}` 
                 }
               ].map((item, i) => (
                 <a key={i} href={item.href} target={item.label === 'Instagram' ? '_blank' : undefined} className="flex flex-col gap-2 group hover:text-white transition-colors">
                    <span className="text-forest-light tracking-[0.4em] uppercase text-[9px] font-sans group-hover:text-cream">{item.label}</span>
                    <span className="text-cream/60 flex items-center gap-4 text-xs font-sans tracking-widest uppercase group-hover:text-cream">
                      {item.value} <item.icon size={12} className="opacity-40" />
                    </span>
                 </a>
               ))}
            </div>
          </div>

          {/* RIGHT: Digital Atelier Inquiry Form */}
          <div className="lg:col-span-6 w-full lg:pl-12">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8, duration: 1 }}
               className="bg-forest-deep/10 border border-forest-light/5 p-12 lg:p-16 rounded-sm shadow-2xl relative"
            >
               {/* Frame Corner Detail */}
               <div className="absolute top-0 right-0 p-8">
                  <span className="text-white/5 text-[4rem] font-serif italic select-none">Contact</span>
               </div>

               <form className="space-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Field: Name */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-forest-light/60 tracking-[0.3em] uppercase text-[9px] font-sans">Full Name / Agency</label>
                    <input 
                      type="text" 
                      placeholder="Enter identity..."
                      className="bg-transparent border-b border-forest-light/20 py-4 text-cream font-sans focus:outline-none focus:border-cream transition-colors placeholder:text-cream/10 text-lg" 
                    />
                  </div>

                  {/* Field: Project Type */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-forest-light/60 tracking-[0.3em] uppercase text-[9px] font-sans">Project Category</label>
                    <select className="bg-transparent border-b border-forest-light/20 py-4 text-cream font-sans focus:outline-none focus:border-cream transition-colors text-lg appearance-none uppercase tracking-widest">
                       {CATEGORIES.map((cat) => (
                         <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')} className="bg-obsidian">
                           {cat}
                         </option>
                       ))}
                    </select>
                  </div>

                  {/* Field: Details */}
                  <div className="flex flex-col gap-2 group">
                    <label className="text-forest-light/60 tracking-[0.3em] uppercase text-[9px] font-sans">Narrative Details</label>
                    <textarea 
                      placeholder="Tell us about the moments you wish to capture..."
                      rows={4}
                      className="bg-transparent border-b border-forest-light/20 py-4 text-cream font-sans focus:outline-none focus:border-cream transition-colors placeholder:text-cream/10 text-lg resize-none italic" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="group relative flex items-center justify-center gap-4 sm:gap-6 w-full bg-cream text-obsidian py-6 md:py-8 px-6 md:px-12 rounded-full overflow-hidden hover:bg-forest-light transition-all duration-700"
                  >
                    <span className="relative z-10 text-lg md:text-xl font-serif uppercase tracking-widest font-bold text-center leading-tight">Initiate <br className="sm:hidden" />Dialogue</span>
                    <ArrowUpRight size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
                    
                    <motion.div 
                       initial={{ x: '-100%' }}
                       whileHover={{ x: '100%' }}
                       transition={{ duration: 1.5, ease: 'linear' }}
                       className="absolute inset-0 bg-white/40 pointer-events-none"
                    />
                  </button>
               </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
