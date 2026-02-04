import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const images = imagesRef.current;

    if (!section || !content || !images) return;

    const ctx = gsap.context(() => {
      // Load animation
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        images.children,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );

      // Continuous floating animation for each image
      Array.from(images.children).forEach((img, index) => {
        gsap.to(img, {
          y: index === 0 ? -12 : -8,
          duration: 2.5 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });
      });

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        Array.from(images.children).forEach((img, index) => {
          const depth = (index + 1) * 0.3;
          gsap.to(img, {
            x: moveX * depth,
            y: moveY * depth,
            rotationY: moveX * 0.5,
            rotationX: -moveY * 0.5,
            duration: 1,
            ease: 'power2.out',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Smooth scroll fade effect
      gsap.to([content, images], {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="hero" className="section-pinned bg-black z-10 flex items-center pt-16 lg:pt-20">
      <div className="vignette" />

      <div className="w-full px-6 lg:px-12 xl:px-20 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-6">
              <Heart size={14} className="text-gold" />
              <span className="micro-badge">Editorial • Intimate • Timeless</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              Where love becomes<br />
              <span className="italic text-gold">a celebration.</span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl mb-8 max-w-md">
              Destination weddings & events in Sri Lanka, planned with heart.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('destinations')}
                className="btn-primary flex items-center gap-2"
              >
                Explore weddings
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/50 hover:text-gold transition-colors text-sm font-medium"
              >
                Start planning
              </button>
            </div>
          </div>

          {/* Images Grid */}
          <div ref={imagesRef} className="order-1 lg:order-2 grid grid-cols-2 gap-3 lg:gap-4" style={{ perspective: '1000px' }}>
            <div className="hero-image-card col-span-2 aspect-[16/10] rounded-2xl overflow-hidden border border-gold/20 relative group" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img src="/hero_couple_main.jpg" alt="Wedding couple" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/10 rounded-2xl group-hover:ring-gold/30 transition-all duration-500" />
            </div>
            <div className="hero-image-card aspect-square rounded-2xl overflow-hidden border border-gold/20 relative group" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img src="/hero_detail_flowers.jpg" alt="Floral details" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/10 rounded-2xl group-hover:ring-gold/30 transition-all duration-500" />
            </div>
            <div className="hero-image-card aspect-square rounded-2xl overflow-hidden border border-gold/20 relative group" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img src="/hero_guests_candid.jpg" alt="Wedding guests" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/10 rounded-2xl group-hover:ring-gold/30 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
