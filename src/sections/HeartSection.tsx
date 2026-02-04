import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeartSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgLRef = useRef<HTMLDivElement>(null);
  const imgTRRef = useRef<HTMLDivElement>(null);
  const imgBRRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imgL = imgLRef.current;
    const imgTR = imgTRRef.current;
    const imgBR = imgBRRef.current;
    const text = textRef.current;

    if (!section || !imgL || !imgTR || !imgBR || !text) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
      scrollTl
        .fromTo(imgL, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(imgTR, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo(imgBR, { x: '60vw', y: '10vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(text, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);
      scrollTl
        .fromTo(imgL, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgTR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgBR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(text, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-black z-[100]">
      <div className="vignette" />
      <div ref={imgLRef} className="collage-card will-change-transform" style={{ left: '6vw', top: '10vh', width: '44vw', height: '80vh' }}>
        <img src="/hero_couple_main.jpg" alt="Wedding couple" className="w-full h-full object-cover" />
      </div>
      <div ref={imgTRRef} className="collage-card will-change-transform" style={{ left: '52vw', top: '10vh', width: '42vw', height: '34vh' }}>
        <img src="/hero_guests_candid.jpg" alt="Wedding guests" className="w-full h-full object-cover" />
      </div>
      <div ref={imgBRRef} className="collage-card will-change-transform" style={{ left: '52vw', top: '48vh', width: '42vw', height: '42vh' }}>
        <img src="/detail_rings_stationery.jpg" alt="Wedding details" className="w-full h-full object-cover" />
      </div>
      <div ref={textRef} className="text-block will-change-transform" style={{ left: '54vw', top: '62vh', width: '38vw' }}>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Heart &<br /><span className="italic text-gold">detail</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md">
          We notice the small things—so you can stay present for the big ones.
        </p>
      </div>
    </section>
  );
};

export default HeartSection;
