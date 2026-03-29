import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalCursor from "@/components/GlobalCursor";
import Preloader from "@/components/Preloader";
import NavigationHUD from "@/components/NavigationHUD";
import CinematicOverlays from "@/components/CinematicOverlays";

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ['300', '400', '500', '600', '700'],
  style: ['italic', 'normal']
});
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nixphotography.in"),
  title: "Nix Photography | Docutorial Narratives",
  description: "A cinematic documentation of moments that transcend the frame. Expert photography blending documentary intimacy and editorial polish.",
  openGraph: {
    title: "Nix Photography",
    description: "Docutorial Narratives by Nix. Cinematic photography at the intersection of documentary and editorial.",
    url: "https://www.nixphotography.in",
    siteName: "Nix Photography",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nix Photography",
    description: "Docutorial Narratives by Nix.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-obsidian">
      <body className={`${cormorantGaramond.variable} ${outfit.variable} font-sans text-cream antialiased selection:bg-forest-light selection:text-obsidian`}>
        {/* Safe Cinematic Overlays (Excluded from Sanity Studio) */}
        <CinematicOverlays />
        
        <SmoothScroll>
          <Preloader />
          <GlobalCursor />
          <NavigationHUD />
          <main className="relative z-0">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
