// Server component — imports only client components.
// No 'use client' needed here.
import HeroSection from '@/components/sections/HeroSection';
import ImageRevealSection from '@/components/sections/ImageRevealSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SlideSection from '@/components/sections/SlideSection';
import TextRevealSection from '@/components/sections/TextRevealSection';
import ParallaxDemoSection from '@/components/sections/ParallaxDemoSection';
import ScrubSection from '@/components/sections/ScrubSection';
import ScrollPinSection from '@/components/sections/ScrollPinSection';
import ScrollProgressSection from '@/components/sections/ScrollProgressSection';
import HooksSection from '@/components/sections/HooksSection';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ImageRevealSection />
      <hr className="divider" />
      <StatsSection />
      <hr className="divider" />
      <FeaturesSection />
      <hr className="divider" />
      <SlideSection />
      <hr className="divider" />
      <TextRevealSection />
      <hr className="divider" />
      <ParallaxDemoSection />
      <hr className="divider" />
      <ScrubSection />
      <hr className="divider" />
      <ScrollPinSection />
      <hr className="divider" />
      <ScrollProgressSection />
      <hr className="divider" />
      <HooksSection />
      <Footer />
    </main>
  );
}
