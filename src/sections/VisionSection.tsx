import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Flower2, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgLRef = useRef<HTMLDivElement>(null);
  const imgTRRef = useRef<HTMLDivElement>(null);
  const imgBRRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imgL = imgLRef.current;
    const imgTR = imgTRRef.current;
    const imgBR = imgBRRef.current;
    const text = textRef.current;
    const strip = stripRef.current;

    if (!section || !imgL || !imgTR || !imgBR || !text || !strip) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl
        .fromTo(imgL, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(imgTR, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo(imgBR, { x: '60vw', y: '10vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(text, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(strip.children, { y: '10vh', scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.02, ease: 'none' }, 0.16);

      scrollTl
        .fromTo(imgL, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgTR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgBR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(text, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(strip, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  const moodItems = [
    { icon: Palette, label: 'Palette' },
    { icon: Flower2, label: 'Florals' },
    { icon: FileText, label: 'Paper' },
  ];

  return (
    <section ref={sectionRef} className="section-pinned bg-black z-[60]">
      <div className="vignette" />
      <div ref={imgLRef} className="collage-card will-change-transform" style={{ left: '6vw', top: '10vh', width: '44vw', height: '80vh' }}>
        <img src="/couple_closeup.jpg" alt="Couple closeup" className="w-full h-full object-cover" />
      </div>
      <div ref={imgTRRef} className="collage-card will-change-transform" style={{ left: '52vw', top: '10vh', width: '42vw', height: '34vh' }}>
        <img src="/table_detail.jpg" alt="Table details" className="w-full h-full object-cover" />
      </div>
      <div ref={imgBRRef} className="collage-card will-change-transform" style={{ left: '52vw', top: '48vh', width: '42vw', height: '42vh' }}>
        <img src="/reception_dancing.jpg" alt="Reception dancing" className="w-full h-full object-cover" />
      </div>
      <div ref={textRef} className="text-block will-change-transform" style={{ left: '8vw', top: '62vh', width: '40vw' }}>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Your vision,<br /><span className="italic text-gold">our craft</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md">
          We translate personality into palettes, florals, and flowing timelines—cohesive from invitation to last dance.
        </p>
      </div>
      <div ref={stripRef} className="absolute flex gap-3 will-change-transform" style={{ left: '8vw', top: '84vh', width: '40vw', zIndex: 6 }}>
        {moodItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-xl">
              <Icon size={16} className="text-gold" />
              <span className="text-sm text-white">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VisionSection;
