'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CinematicOverlays() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Do not render overlays on Sanity Studio route to prevent hydration/DOM conflicts
  if (!mounted || pathname?.startsWith('/studio')) return null

  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
      <div className="fixed inset-0 z-[9998] pointer-events-none bg-radial-vignette opacity-50" />
    </>
  )
}
