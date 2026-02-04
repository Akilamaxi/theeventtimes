import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Palette, ClipboardList } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgLRef = useRef<HTMLDivElement>(null);
  const imgTRRef = useRef<HTMLDivElement>(null);
  const imgBRRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imgL = imgLRef.current;
    const imgTR = imgTRRef.current;
    const imgBR = imgBRRef.current;
    const text = textRef.current;
    const badges = badgesRef.current;

    if (!section || !imgL || !imgTR || !imgBR || !text || !badges) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
      scrollTl
        .fromTo(imgL, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(imgTR, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo(imgBR, { x: '60vw', y: '10vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(text, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(badges.children, { y: '10vh', scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.02, ease: 'none' }, 0.16);
      scrollTl
        .fromTo(imgL, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgTR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgBR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(text, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(badges, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  const teamRoles = [
    { icon: User, label: 'Planner' },
    { icon: Palette, label: 'Stylist' },
    { icon: ClipboardList, label: 'Coordinator' },
  ];

  return (
    <section ref={sectionRef} className="section-pinned bg-black z-[120]">
      <div className="vignette" />
      <div ref={imgLRef} className="collage-card will-change-transform" style={{ left: '6vw', top: '10vh', width: '44vw', height: '80vh' }}>
        <img src="/couple_portrait_left.jpg" alt="Couple portrait" className="w-full h-full object-cover" />
      </div>
      <div ref={imgTRRef} className="collage-card will-change-transform" style={{ left: '52vw', top: '10vh', width: '42vw', height: '34vh' }}>
        <img src="/team_planner.jpg" alt="Wedding planner" className="w-full h-full object-cover" />
      </div>
      <div ref={imgBRRef} className="collage-card will-change-transform" style={{ left: '52vw', top: '48vh', width: '42vw', height: '42vh' }}>
        <img src="/venue_wide_right.jpg" alt="Wedding venue" className="w-full h-full object-cover" />
      </div>
      <div ref={textRef} className="text-block will-change-transform" style={{ left: '54vw', top: '62vh', width: '38vw' }}>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Curated<br /><span className="italic text-gold">team</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md">
          Planners, stylists, and on-the-day leads—aligned to your vibe and your venue.
        </p>
      </div>
      <div ref={badgesRef} className="absolute flex gap-3 will-change-transform" style={{ left: '54vw', top: '82vh', width: '38vw', zIndex: 6 }}>
        {teamRoles.map((role, idx) => {
          const Icon = role.icon;
          return (
            <div key={idx} className="flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-xl">
              <Icon size={16} className="text-gold" />
              <span className="text-sm text-white">{role.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamSection;
