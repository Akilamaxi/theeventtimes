import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, Palette, Flower2, Clock, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Calendar,
    title: 'Seamless Planning',
    description: 'Budgeting, timelines, vendor curation—handled quietly so the day feels effortless.',
  },
  {
    icon: Palette,
    title: 'Your Vision, Our Craft',
    description: 'We translate personality into palettes, florals, and flowing timelines.',
  },
  {
    icon: Heart,
    title: 'Moments That Breathe',
    description: 'We design space for the unscripted: laughter, happy tears, and real connection.',
  },
  {
    icon: Flower2,
    title: 'Timeless Design',
    description: 'Typography, florals, tablescapes, and light—composed with restraint.',
  },
  {
    icon: Users,
    title: 'Curated Team',
    description: 'Planners, stylists, and on-the-day leads aligned to your vibe.',
  },
  {
    icon: Clock,
    title: 'From Vows to Party',
    description: 'One cohesive design language across every chapter of your celebration.',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.service-animate'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
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
    <section ref={sectionRef} id="services" className="section-flowing bg-black py-20 lg:py-28 z-40">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="micro-badge text-gold mb-4 block service-animate">Our Services</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 service-animate">
            Signature <span className="italic text-gold">celebrations</span>
          </h2>
          <p className="text-white/50 text-base lg:text-lg max-w-2xl mx-auto service-animate">
            From sunrise ceremonies to midnight toasts—every chapter designed around your story.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="service-animate group p-5 lg:p-6 rounded-2xl border border-gold/10 hover:border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all duration-300"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg lg:text-xl text-white mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* Image Gallery */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 service-animate">
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-gold/10">
            <img src="/ceremony_wide.jpg" alt="Ceremony" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-gold/10">
            <img src="/table_detail.jpg" alt="Table details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-gold/10">
            <img src="/hero_detail_flowers.jpg" alt="Flowers" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-gold/10">
            <img src="/reception_dancing.jpg" alt="Reception" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
