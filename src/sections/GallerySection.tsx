import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/couple_portrait_left.jpg', title: 'The Couple' },
  { src: '/couple_closeup.jpg', title: 'Intimate Moments' },
  { src: '/hero_couple_main.jpg', title: 'The Ceremony' },
  { src: '/venue_wide_right.jpg', title: 'The Venue' },
  { src: '/table_detail.jpg', title: 'Tablescapes' },
  { src: '/hero_guests_candid.jpg', title: 'Celebration' },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.gallery-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="section-flowing bg-black py-20 lg:py-28 relative">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <span className="micro-badge text-gold mb-4 block gallery-animate">Real Weddings</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white gallery-animate">
              Moments we&apos;ve <span className="italic text-gold">crafted.</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium group gallery-animate">
            View full gallery
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`gallery-animate group relative overflow-hidden rounded-xl lg:rounded-2xl border border-gold/10 cursor-pointer ${idx === 0 || idx === 3 ? 'aspect-[4/5]' : 'aspect-square'
                }`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-serif text-lg">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
            <X size={24} />
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
