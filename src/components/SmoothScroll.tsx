'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Do not render Lenis on Sanity Studio to restore native mouse scroll and prevent hydration errors
  if (!mounted || pathname?.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
