import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PlanningSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgTLRef = useRef<HTMLDivElement>(null);
  const imgBLRef = useRef<HTMLDivElement>(null);
  const imgRRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imgTL = imgTLRef.current;
    const imgBL = imgBLRef.current;
    const imgR = imgRRef.current;
    const text = textRef.current;

    if (!section || !imgTL || !imgBL || !imgR || !text) return;

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
        .fromTo(imgR, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(imgTL, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo(imgBL, { x: '-60vw', y: '10vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(text, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.14);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(imgR, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgTL, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imgBL, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(text, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Calendar, label: 'Timeline design' },
    { icon: Users, label: 'Vendor curation' },
    { icon: Clock, label: 'On-the-day coordination' },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-black z-50"
    >
      <div className="vignette" />

      {/* Top-left image */}
      <div
        ref={imgTLRef}
        className="collage-card will-change-transform"
        style={{
          left: '6vw',
          top: '10vh',
          width: '44vw',
          height: '34vh',
        }}
      >
        <img
          src="/detail_rings_stationery.jpg"
          alt="Wedding details"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom-left image */}
      <div
        ref={imgBLRef}
        className="collage-card will-change-transform"
        style={{
          left: '6vw',
          top: '48vh',
          width: '44vw',
          height: '42vh',
        }}
      >
        <img
          src="/couple_portrait_left.jpg"
          alt="Couple portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right image */}
      <div
        ref={imgRRef}
        className="collage-card will-change-transform"
        style={{
          left: '52vw',
          top: '10vh',
          width: '42vw',
          height: '80vh',
        }}
      >
        <img
          src="/venue_wide_right.jpg"
          alt="Wedding venue"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text block */}
      <div
        ref={textRef}
        className="text-block will-change-transform"
        style={{
          left: '54vw',
          top: '62vh',
          width: '38vw',
        }}
      >
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Seamless<br />
          <span className="italic text-gold">planning</span>
        </h2>
        <p className="text-white/60 text-lg leading-relaxed max-w-md mb-6">
          Budgeting, timelines, vendor curation—handled quietly so the day 
          feels effortless.
        </p>
        
        {/* Service list */}
        <div className="flex flex-wrap gap-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full"
              >
                <Icon size={16} className="text-gold" />
                <span className="text-sm text-white">{service.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;
