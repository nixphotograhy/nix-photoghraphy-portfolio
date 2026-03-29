import { client } from '@/sanity/lib/client'
import { galleryQuery, nextGalleryQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import GalleryProjectHero from '@/components/GalleryProjectHero'
import MasonryGrid from '@/components/MasonryGrid'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import NavigationHUD from '@/components/NavigationHUD'
import PremiumFooter from '@/components/PremiumFooter'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function GalleryProjectPage({ params }: PageProps) {
  const { slug } = params

  // Fetch project data
  const project = await client.fetch(galleryQuery, { slug })

  if (!project) {
    notFound()
  }

  // Fetch next project for navigation
  const nextProject = await client.fetch(nextGalleryQuery, { id: project._id })

  return (
    <main className="bg-obsidian min-h-screen">
      
      {/* 1. PROJECT HERO */}
      <GalleryProjectHero 
        title={project.title}
        category={project.category}
        description={project.description}
        mainImage={project.mainImage}
      />

      {/* 2. HIGH-DENSITY MASONRY (20-25 Images) */}
      <div className="py-12 md:py-24">
        {/* Combine Main Image with the rest of the Gallery to ensure all 20+ images show up together */}
        <MasonryGrid 
            images={[
              { ...project.mainImage, projectTitle: project.title },
              ...(project.images || [])
            ]} 
            title={project.title} 
            isLightboxEnabled={true}
        />
      </div>

      {/* 3. NEXT PROJECT NAVIGATION */}
      {nextProject && (
        <section className="bg-obsidian py-48 px-8 md:px-16 lg:px-24 flex flex-col items-center border-t border-forest-light/10">
          <div className="max-w-7xl w-full">
            <span className="text-forest-light tracking-[0.6em] uppercase text-[10px] md:text-xs font-sans mb-12 block text-center">Next Narrative</span>
            
            <Link 
              href={`/gallery/${nextProject.slug.current}`}
              className="group relative flex flex-col items-center text-center cursor-none"
            >
              <div className="relative w-full max-w-2xl aspect-[16/9] overflow-hidden rounded-sm mb-12 shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                <Image
                  src={urlForImage(nextProject.mainImage).url()}
                  alt={nextProject.title}
                  fill
                  className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <h2 className="text-cream text-5xl md:text-8xl font-serif italic tracking-tighter transition-all duration-500 group-hover:text-white">
                {nextProject.title}
              </h2>
              
              <div className="mt-12 w-24 h-[1px] bg-forest-light/20 transition-all duration-700 group-hover:w-48 group-hover:bg-forest-light" />
            </Link>
          </div>
        </section>
      )}

      <PremiumFooter />
    </main>
  )
}
