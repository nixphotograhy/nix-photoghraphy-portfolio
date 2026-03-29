import { client } from '@/sanity/lib/client'
import { galleriesQuery } from '@/sanity/lib/queries'
import MasonryGrid from '@/components/MasonryGrid'
import NavigationHUD from '@/components/NavigationHUD'
import PremiumFooter from '@/components/PremiumFooter'
import { motion } from 'framer-motion'

export const revalidate = 60

export default async function GalleryIndexPage() {
  const galleries = await client.fetch(galleriesQuery)

  return (
    <main className="bg-obsidian min-h-screen">
      
      {/* GALLERY INDEX HERO */}
      <section className="pt-48 pb-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
           <span className="text-forest-light tracking-[0.6em] uppercase text-[10px] md:text-sm font-sans">
             Narratival Archives
           </span>
           <h1 className="text-cream text-6xl md:text-9xl font-serif italic leading-none tracking-tighter">
             The Collections
           </h1>
           <div className="h-[1px] w-24 bg-forest-light/20 mt-8" />
        </div>
      </section>

      {/* FULL PROJECT GRID */}
      <section className="pb-48">
        <MasonryGrid 
            images={galleries?.map((g: any) => ({
              ...g.mainImage,
              slug: g.slug?.current,
              projectTitle: g.title
            }))} 
            title="ALL PROJECTS"
        />
      </section>

      <PremiumFooter />
    </main>
  )
}
