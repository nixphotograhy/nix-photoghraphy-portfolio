'use client'

/**
 * This route is responsible for rendering the Sanity Studio.
 * It uses the Next.js App Router for high performance and seamless integration.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
