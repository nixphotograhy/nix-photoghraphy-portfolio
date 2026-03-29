import { client } from '@/sanity/lib/client'
import { homePageQuery, galleriesQuery, quoteQuery, philosophyQuery, siteSettingsQuery } from '@/sanity/lib/queries'

import EditorialHero from '@/components/EditorialHero'
import MasonryGrid from '@/components/MasonryGrid'
import FilmStripGallery from '@/components/FilmStripGallery'
import PhilosophySection from '@/components/PhilosophySection'
import StaircaseGallery from '@/components/StaircaseGallery'
import BookingCTA from '@/components/BookingCTA'
import PremiumFooter from '@/components/PremiumFooter'

export const revalidate = 60 // Revalidate data every 60 seconds

export default async function Home() {
  // Fetch data in parallel for high performance
  const [homeData, galleries, quoteData, philosophyData, siteSettings] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(galleriesQuery),
    client.fetch(quoteQuery),
    client.fetch(philosophyQuery),
    client.fetch(siteSettingsQuery)
  ])

  return (
    <main className="bg-obsidian min-h-screen overflow-x-hidden">
      
      {/* 1. THE HERO : Intro & High-End Branding */}
      <EditorialHero 
        title={homeData?.title}
        subtitle={homeData?.subtitle}
        heroImage={homeData?.heroImage}
        editorialText={homeData?.editorialText}
      />

      {/* 2. THE 3D CHAMBER : Immersive Photography Carousel */}
      <FilmStripGallery 
        images={homeData?.filmStripImages} 
      />

      {/* 3. THE STAIRCASE : Staggered Editorial Showcase (New Section) */}
      <StaircaseGallery 
        images={homeData?.staircaseImages}
      />

      {/* 4. THE ABOUT SECTION : Deep Archival Narrative */}
      <PhilosophySection 
          heading={philosophyData?.title || homeData?.philosophySection?.heading}
          body={philosophyData?.description || homeData?.philosophySection?.body}
          image={philosophyData?.featuredImage}
          focusAreas={philosophyData?.focusAreas}
      />

      {/* 5. THE GALLERY : Full Collection Masonry Grid */}
      <MasonryGrid 
        images={galleries?.map((g: any) => ({
          ...g.mainImage,
          slug: g.slug?.current,
          projectTitle: g.title
        }))} 
        title="GALLERY"
      />

      {/* 6. THE CONCLUSION : Booking & Deep Footer Info */}
      <BookingCTA 
        contactInfo={siteSettings?.contactInfo}
        socialLinks={siteSettings?.socialLinks}
      />
      <PremiumFooter 
        contactInfo={siteSettings?.contactInfo}
        socialLinks={siteSettings?.socialLinks}
      />
    </main>
  )
}
