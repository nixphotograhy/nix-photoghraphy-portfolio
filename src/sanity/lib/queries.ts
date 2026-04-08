import { groq } from 'next-sanity'

// Fetch global site settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  logo {
    asset->,
    hotspot,
    crop
  },
  socialLinks,
  contactInfo
}`

// Fetch home page content
export const homePageQuery = groq`*[_type == "homePage"][0]{
  title,
  subtitle,
  heroImage {
    asset->,
    hotspot,
    crop
  },
  editorialText,
  philosophySection,
  staircaseImages[] {
    asset->,
    hotspot,
    crop
  },
  filmStripImages[] {
    asset->,
    hotspot,
    crop
  }
}`

// Fetch marquee quote
export const quoteQuery = groq`*[_type == "quoteSection"][0]{
  quote,
  author
}`

// Fetch all galleries for the grid
export const galleriesQuery = groq`*[_type == "gallery"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  mainImage {
    asset,
    hotspot,
    crop
  },
  description
}`

// Fetch a single gallery by slug
export const galleryQuery = groq`*[_type == "gallery" && slug.current == $slug][0]{
  _id,
  title,
  description,
  category,
  mainImage {
    asset,
    hotspot,
    crop
  },
  images[] {
    asset,
    hotspot,
    crop
  }
}`

// Fetch next project for deep-dive navigation
export const nextGalleryQuery = groq`*[_type == "gallery" && _id != $id] | order(_createdAt desc)[0]{
  title,
  slug,
  mainImage {
    asset->,
    hotspot
  }
}`

// Fetch philosophy standalone document (includes the featured image)
export const philosophyQuery = groq`*[_type == "philosophySection"][0]{
  title,
  description,
  featuredImage {
    asset->,
    hotspot,
    crop
  },
  focusAreas
}`

// Fetch cinematic narrative video clips
export const videoClipsQuery = groq`*[_type == "videoClip"] | order(_createdAt desc)[0...5]{
  _id,
  title,
  category,
  "videoUrl": videoFile.asset->url,
  previewImage {
    asset->,
    hotspot,
    crop
  }
}`
