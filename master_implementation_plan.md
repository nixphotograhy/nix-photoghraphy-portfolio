# Implementation Plan: Nix Photography Portfolio (Next.js + Sanity.io)

This plan outlines the professional development of Nix's photography portfolio. We will integrate a headless architecture using Sanity.io for content management and Next.js for a high-performance, statically generated frontend.

## User Review Required

> [!IMPORTANT]
> **Sanity Project ID**: I will need to initialize a new Sanity project. If you already have a Sanity account/project, please let me know. Otherwise, I will guide you through the `npx sanity init` process which requires a quick login on your end.

> [!WARNING]
> **Free Tier Limits**: We will strictly use free tiers. Sanity's free tier is generous (10k documents, 100k API reqs/mo), which is perfect for a portfolio. Vercel/Netlify will host the frontend at zero cost.

## Proposed Architecture

### Phase 1: CMS Initialization & Schema Design

Current focus is on defining the structural backbone for Nix to manage content via their smartphone.

#### [NEW] Sanity Studio Setup
- Initialization in `./studio` or a integrated `./cms` folder.
- **Singletons Configuration**: Prevent duplicate "Home" or "Settings" pages.
- **Schemas**:
  - `homePage.js`: Hero content management.
  - `quoteSection.js`: Management of the project's marquee quote.
  - `gallery.js`: Collection for multiple photographic projects/archives.
  - `philosophySection.js`: Editorial points about Nix's process.
  - `siteSettings.js`: Global logo, contact, and social links.

---

### Phase 2: Frontend Development (Next.js)

Connecting the design system to the data.

#### [NEW] Next.js Application (`./frontend` or root)
- **Tech**: Next.js 14+ (App Router), Tailwind CSS (for layout), `next-sanity`.
- **Data Fetching**: GROQ queries to pull SEO metadata, hero assets, and masonry galleries.
- **Components**:
  - `EditorialHero`: Asymmetrical layout matching Stitch reference.
  - `MasonryGrid`: High-performance image loading with Sanity's image pipeline.
  - `HUDNav`: Minimal overlay navigation.
- **Typography**: Integration of `Newsreader` and `Manrope`.

---

### Phase 3: Deployment & Automation

Ensuring a hands-off experience for the client.

- **Vercel/Netlify Deployment**: Automated CI/CD.
- **Webhooks**: Configure build hooks in Sanity to trigger a site rebuild whenever Nix hits "Publish" on their phone.

## Open Questions

1. **Integrated or Separate Folders?**: Do you prefer the Sanity Studio inside the Next.js project (Monorepo-style) or as two separate folders? (Monorepo is usually easier for small projects).
2. **Hosting Preference**: Do you have a preference between Vercel or Netlify? (Vercel is generally better integrated with Next.js).

## Verification Plan

### Technical Verification
- **GROQ Testing**: Use the Sanity Vision plugin to verify that all data is correctly queryable.
- **Performance**: Lighthouse audit targeting 95+ for performance and SEO.

### User Verification
- **CMS Ease of Use**: confirm the Sanity Studio UI looks clean on a mobile browser preview.
- **Design Fidelity**: Compare the final Next.js output with the Stitch `reference.html`.
