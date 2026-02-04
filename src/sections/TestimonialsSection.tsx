import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They didn't just plan our wedding—they protected the feeling of it.",
    name: "Priya & James",
    location: "Portugal",
    image: "/couple_closeup.jpg",
  },
  {
    quote: "Every detail was perfect. The team understood our vision from day one.",
    name: "Sarah & Michael",
    location: "Galle, Sri Lanka",
    image: "/couple_portrait_left.jpg",
  },
  {
    quote: "Our guests are still talking about how magical everything was.",
    name: "Emma & David",
    location: "Mirissa, Sri Lanka",
    image: "/hero_couple_main.jpg",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.testimonial-animate'),
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

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} id="testimonials" className="section-flowing bg-black py-20 lg:py-28 z-[60]">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="micro-badge text-gold mb-4 block testimonial-animate">Kind Words</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white testimonial-animate">
            What couples <span className="italic text-gold">say.</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto testimonial-animate">
          <div className="relative bg-gold/5 border border-gold/20 rounded-2xl lg:rounded-3xl p-6 lg:p-10">
            <Quote size={48} className="text-gold/20 absolute top-4 left-4 lg:top-6 lg:left-6" />
            
            <div className="relative z-10">
              {/* Content */}
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                {/* Image */}
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Quote */}
                <div className="text-center lg:text-left">
                  <p className="font-serif text-xl lg:text-3xl text-white leading-snug mb-4 italic">
                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                  </p>
                  <p className="text-gold font-medium">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-white/50 text-sm">
                    {testimonials[activeIndex].location}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center lg:justify-end gap-4 mt-6 lg:mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-gold w-6' : 'bg-gold/30'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
