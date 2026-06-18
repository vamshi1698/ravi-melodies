'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import ScrollStorySection from '@/components/sections/ScrollStorySection';
import TimelineSection from '@/components/sections/TimelineSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GallerySection from '@/components/sections/GallerySection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ConversionSection from '@/components/sections/ConversionSection';
import Footer from '@/components/sections/Footer';
import WhatsAppAssistant from '@/components/ui/WhatsAppAssistant';
import CursorSpotlight from '@/components/ui/CursorSpotlight';
import StickyMobileCTA from '@/components/ui/StickyMobileCTA';

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-matte-black flex items-center justify-center">
      <div className="animate-pulse text-gold text-lg sm:text-2xl">Loading Experience...</div>
    </div>
  ),
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    setIsLoaded(true);

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative min-h-screen bg-matte-black"
    >
      <CursorSpotlight />
      <Header />
      <HeroSection />
      <ScrollStorySection />
      <TimelineSection />
      <ServicesSection />
      <GallerySection />
      <SocialProofSection />
      <TestimonialsSection />
      <ConversionSection />
      <Footer />
      <WhatsAppAssistant />
      <StickyMobileCTA />
    </motion.main>
  );
}
