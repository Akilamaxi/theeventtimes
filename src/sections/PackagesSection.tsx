import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Crown, Heart, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    id: 'intimate',
    name: 'Intimate Wedding',
    icon: Heart,
    guests: 'Up to 40 Guests',
    duration: '1 Day',
    description: 'Perfect for couples who want a meaningful, elegant ceremony with close family and friends.',
    price: '$8,500',
    features: [
      'Dedicated wedding coordinator',
      'Ceremony timeline planning',
      'Hand-picked ceremony venue',
      'Basic venue styling with arch',
      'Fresh floral arrangements',
      'Bridal bouquet & boutonnière',
      'Professional photographer',
      'Basic sound system',
    ],
  },
  {
    id: 'elegant',
    name: 'Elegant Celebration',
    icon: Sparkles,
    guests: 'Up to 120 Guests',
    duration: '3 Days',
    description: 'Designed for couples who want a relaxed yet luxurious multi-day celebration.',
    price: '$25,000',
    features: [
      'Full planning support',
      'Ceremony, Reception & Pre-wedding',
      'Custom theme décor & lighting',
      'Airport transfers & transportation',
      'Hotel/villa selection',
      'Hair & makeup coordination',
      'Traditional dancers or live music',
      'Full-day photography & videography',
    ],
    popular: true,
  },
  {
    id: 'grand',
    name: 'Grand Luxury Wedding',
    icon: Crown,
    guests: '200+ Guests',
    duration: '7 Days',
    description: 'A full destination wedding experience crafted to perfection.',
    price: '$65,000',
    features: [
      'Senior wedding manager',
      'Multiple event coordinators',
      'Premium venues for all events',
      'Bespoke décor & floral installations',
      '4★/5★ hotels & luxury villas',
      'Luxury coaches & bridal car',
      'Multi-cuisine catering',
      'DJs, live bands & fireworks',
    ],
  },
];

const PackagesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.pkg-animate'),
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="packages" className="section-flowing bg-black py-20 lg:py-28 z-30">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4 pkg-animate">
            <Sparkles size={16} className="text-gold" />
            <span className="micro-badge">Wedding Packages</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 pkg-animate">
            Select the perfect canvas for your <span className="italic text-gold">love story.</span>
          </h2>
          <p className="text-white/50 text-base lg:text-lg max-w-2xl mx-auto pkg-animate">
            From intimate gatherings to week-long grand celebrations, we handle every detail.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isExpanded = expandedId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`pkg-animate relative rounded-2xl lg:rounded-3xl overflow-hidden border transition-all duration-500 ${
                  pkg.popular 
                    ? 'border-gold/50 bg-gradient-to-b from-gold/10 to-black' 
                    : 'border-gold/20 bg-black'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gold text-black text-xs font-medium px-3 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                <div className="p-5 lg:p-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                      <Icon size={18} className="text-gold lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg lg:text-xl text-white">{pkg.name}</h3>
                      <p className="text-xs lg:text-sm text-white/50">{pkg.guests} • {pkg.duration}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">{pkg.description}</p>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="font-serif text-2xl lg:text-3xl text-gold">{pkg.price}</span>
                    <span className="text-white/40 text-sm ml-1">starting</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-5">
                    {pkg.features.slice(0, isExpanded ? undefined : 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-white/60">
                        <Check size={14} className="text-gold mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expand */}
                  {pkg.features.length > 5 && (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                      className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors mb-4"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-2.5 lg:py-3 border border-gold text-gold text-sm font-medium rounded-full hover:bg-gold hover:text-black transition-all duration-300"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 lg:mt-12 text-center pkg-animate">
          <p className="text-white/40 text-sm mb-3">Need a custom package? We can tailor to your needs.</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
