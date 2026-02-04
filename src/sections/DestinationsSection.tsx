import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Waves, Mountain, Building2, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: 'galle',
    name: 'Galle',
    tagline: 'Heritage & Horizon',
    promise: 'Where history meets the ocean, and forever begins.',
    image: '/dest_galle.jpg',
    category: 'coastal',
    icon: Waves,
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    tagline: 'Tropical Dream',
    promise: 'A sunset kiss, an ocean breeze, a promise for life.',
    image: '/dest_mirissa.jpg',
    category: 'coastal',
    icon: Waves,
  },
  {
    id: 'ella',
    name: 'Ella',
    tagline: 'Vows Above the Clouds',
    promise: 'For the adventurous souls—breathtaking valley views.',
    image: '/dest_ella.jpg',
    category: 'highland',
    icon: Mountain,
  },
  {
    id: 'nuwara',
    name: 'Nuwara Eliya',
    tagline: 'Little England',
    promise: 'Cool climates, colonial architecture, timeless atmosphere.',
    image: '/dest_nuwara.jpg',
    category: 'highland',
    icon: Mountain,
  },
  {
    id: 'kandy',
    name: 'Kandy',
    tagline: 'Sacred Traditions',
    promise: 'Experience a wedding steeped in majesty and culture.',
    image: '/dest_kandy.jpg',
    category: 'culture',
    icon: Landmark,
  },
  {
    id: 'colombo',
    name: 'Colombo',
    tagline: 'Modern Elegance',
    promise: 'Chic rooftop venues and grand colonial ballrooms.',
    image: '/dest_colombo.jpg',
    category: 'city',
    icon: Building2,
  },
];

const DestinationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const horizontal = horizontalRef.current;

    if (!section) return;

    const mm = gsap.matchMedia();

    // Common Animations (Header)
    mm.add("all", () => {
      gsap.fromTo(
        section.querySelectorAll('.dest-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Desktop Horizontal Scroll Logic
    mm.add("(min-width: 768px)", () => {
      if (trigger && horizontal) {
        // Calculate the distance to scroll
        const scrollAmount = horizontal.scrollWidth - window.innerWidth;

        gsap.to(horizontal, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: `+=${scrollAmount + 500}`, // Add some padding duration
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });
      }
    });

    return () => mm.revert();
  }, []);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % destinations.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);

  return (
    <section ref={sectionRef} id="destinations" className="bg-black relative z-20 scroll-mt-24">

      {/* DESKTOP VIEW: Horizontal Scroll Pinned Section */}
      <div ref={triggerRef} className="hidden md:flex flex-col h-screen w-full overflow-hidden relative">
        {/* Fixed Header within the pinned section */}
        <div className="absolute top-12 left-12 z-30 lg:left-20 max-w-lg pointer-events-none">
          <div className="flex items-center gap-2 mb-4 dest-animate">
            <MapPin size={16} className="text-gold" />
            <span className="micro-badge backdrop-blur-md bg-black/50">Our Signature Destinations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white dest-animate drop-shadow-2xl">
            Where will you say <span className="italic text-gold">I do?</span>
          </h2>
          <p className="text-white/70 text-base lg:text-lg mt-4 dest-animate backdrop-blur-sm bg-black/20 p-2 rounded-lg inline-block">
            Swipe to explore Sri Lanka&apos;s finest venues.
          </p>
        </div>

        {/* Horizontal Moving Rail */}
        <div ref={horizontalRef} className="flex items-center h-full pl-[5vw] pr-[20vw] gap-8 pt-20">
          {/* Spacer for the text on the left */}
          <div className="w-[30vw] flex-shrink-0" />

          {destinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <div
                key={dest.id}
                className="dest-card relative flex-shrink-0 h-[65vh] w-auto aspect-[3/4] rounded-2xl overflow-hidden group border border-gold/10 hover:border-gold/30 transition-all duration-500"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Icon size={14} className="text-gold" />
                  <span className="text-xs text-white/90 uppercase tracking-widest font-medium">{dest.category}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-3xl text-white mb-2">{dest.name}</h3>
                  <p className="text-gold text-lg italic mb-3">{dest.tagline}</p>
                  <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-white/80 text-sm leading-relaxed border-t border-white/10 pt-3">{dest.promise}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final CTA Card in the rail */}
          <div className="flex-shrink-0 w-[300px] h-[300px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-white font-serif text-2xl mb-4">Find your paradise</h3>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Keep carousel (hidden on desktop) */}
      <div className="md:hidden min-h-screen flex flex-col justify-center py-20 px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-gold" />
            <span className="micro-badge">Destinations</span>
          </div>
          <h2 className="font-serif text-3xl text-white">
            Your <span className="italic text-gold">Venue</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-gold/10">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {destinations.map((dest) => {
                const Icon = dest.icon;
                return (
                  <div key={dest.id} className="w-full flex-shrink-0 relative aspect-[3/4]">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gold/20">
                      <Icon size={12} className="text-gold" />
                      <span className="text-[10px] text-white/80 uppercase tracking-wider">{dest.category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl text-white mb-0.5">{dest.name}</h3>
                      <p className="text-gold text-sm italic mb-1">{dest.tagline}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{dest.promise}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {destinations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-gold w-6' : 'bg-gold/30'}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Book a Destination Tour
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
