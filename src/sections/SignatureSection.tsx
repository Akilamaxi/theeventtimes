import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SignatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgLRef = useRef<HTMLDivElement>(null);
  const imgTRRef = useRef<HTMLDivElement>(null);
  const imgBRRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imgL = imgLRef.current;
    const imgTR = imgTRRef.current;
    const imgBR = imgBRRef.current;
    const text = textRef.current;
    const chips = chipsRef.current;

    if (!section || !imgL || !imgTR || !imgBR || !text || !chips) return;

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

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(imgL, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(imgTR, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo(imgBR, { x: '60vw', y: '10vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(text, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(chips.children, { y: '10vh', scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.02, ease: 'none' }, 0.16);

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(imgL, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgTR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgBR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(text, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(chips, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signature"
      className="section-pinned bg-black z-40"
    >
      <div className="vignette" />

      {/* Left image */}
      <div
        ref={imgLRef}
        className="collage-card will-change-transform"
        style={{
          left: '6vw',
          top: '10vh',
          width: '44vw',
          height: '62vh',
        }}
      >
        <img
          src="/ceremony_wide.jpg"
          alt="Wedding ceremony"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top-right image */}
      <div
        ref={imgTRRef}
        className="collage-card will-change-transform"
        style={{
          left: '52vw',
          top: '10vh',
          width: '42vw',
          height: '34vh',
        }}
      >
        <img
          src="/table_detail.jpg"
          alt="Table details"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom-right image */}
      <div
        ref={imgBRRef}
        className="collage-card will-change-transform"
        style={{
          left: '52vw',
          top: '48vh',
          width: '42vw',
          height: '42vh',
        }}
      >
        <img
          src="/hero_guests_candid.jpg"
          alt="Wedding guests"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text block */}
      <div
        ref={textRef}
        className="text-block will-change-transform"
        style={{
          left: '8vw',
          top: '58vh',
          width: '40vw',
        }}
      >
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Signature<br />
          <span className="italic text-gold">celebrations</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md">
          From sunrise ceremonies to midnight toasts—every chapter designed 
          around your story.
        </p>
      </div>

      {/* Thumbnail chips */}
      <div
        ref={chipsRef}
        className="absolute flex gap-4 will-change-transform"
        style={{
          left: '8vw',
          top: '78vh',
          width: '40vw',
          zIndex: 6,
        }}
      >
        {['Ceremony', 'Styling', 'Reception'].map((label, idx) => (
          <div
            key={idx}
            className="thumbnail-chip flex-1 px-4 py-3"
          >
            <span className="text-sm font-medium text-white">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SignatureSection;
