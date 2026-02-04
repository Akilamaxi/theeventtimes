import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';
import './App.css';

import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import DestinationsSection from './sections/DestinationsSection';
import PackagesSection from './sections/PackagesSection';
import ServicesSection from './sections/ServicesSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Only enable global snapping on desktop where pinning occurs
    mm.add("(min-width: 1024px)", (context) => {
      const timer = setTimeout(() => {
        // Re-enter GSAP context to ensure proper cleanup/tracking
        context.add(() => {
          const pinned = ScrollTrigger.getAll()
            .filter((st) => st.vars.pin)
            .sort((a, b) => a.start - b.start);

          const maxScroll = ScrollTrigger.maxScroll(window);

          if (!maxScroll || pinned.length === 0) return;

          const pinnedRanges = pinned.map((st) => ({
            start: st.start / maxScroll,
            end: (st.end ?? st.start) / maxScroll,
            center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
          }));

          ScrollTrigger.create({
            snap: {
              snapTo: (value: number) => {
                const inPinned = pinnedRanges.some(
                  (r) => value >= r.start - 0.02 && value <= r.end + 0.02
                );
                if (!inPinned) return value;

                const target = pinnedRanges.reduce(
                  (closest, r) =>
                    Math.abs(r.center - value) < Math.abs(closest - value)
                      ? r.center
                      : closest,
                  pinnedRanges[0]?.center ?? 0
                );
                return target;
              },
              duration: { min: 0.15, max: 0.35 },
              delay: 0,
              ease: 'power2.out',
            },
          });
        });
      }, 500);

      return () => clearTimeout(timer);
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-black min-h-screen overflow-x-hidden">
      <div className="paper-grain" />
      <ParticleBackground />
      <Navigation />

      <main className="relative">
        <HeroSection />
        <DestinationsSection />
        <PackagesSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Floating Scroll to Top - Bottom Left */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3 lg:p-4 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 group ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
}

export default App;
