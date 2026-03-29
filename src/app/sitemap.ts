import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { galleriesQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nixphotography.in'

  // Fetch all gallery data to generate dynamic routes
  const galleries = await client.fetch(galleriesQuery)

  const galleryRoutes = (galleries || []).map((gallery: any) => ({
    url: `${baseUrl}/gallery/${gallery.slug?.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...galleryRoutes,
  ]
}
