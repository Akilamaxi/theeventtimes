import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Calendar, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    location: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.contact-animate'),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@theeventstime.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Inquiry: ${formData.name}`,
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          date: '',
          location: '',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please email us directly at info@theeventstime.com");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contact" className="section-flowing bg-black py-20 lg:py-28 relative z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none" />

      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4 contact-animate">
              <Mail size={16} className="text-gold" />
              <span className="micro-badge">Get in Touch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 contact-animate">
              Let&apos;s plan something <span className="italic text-gold">beautiful.</span>
            </h2>

            <p className="text-white/50 text-base lg:text-lg mb-8 contact-animate">
              Tell us your date, your place, and the mood you want. We&apos;ll reply within 48 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-8 mb-10 contact-animate">
              {/* Sri Lanka */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <h3 className="text-white font-serif text-xl">Sri Lanka</h3>
                </div>
                <div className="pl-11 space-y-2">
                  <p className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                    <MapPin size={14} className="text-gold/50" />
                    217, World Trade Center
                  </p>
                  <a href="tel:+94707123353" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                    <Phone size={14} className="text-gold/50" />
                    +94 70 712 3353
                  </a>
                  <a href="mailto:info@theeventstime.com" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                    <Mail size={14} className="text-gold/50" />
                    info@theeventstime.com
                  </a>
                </div>
              </div>

              {/* UAE */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <h3 className="text-white font-serif text-xl">UAE</h3>
                </div>
                <div className="pl-11 space-y-2">
                  <p className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                    <MapPin size={14} className="text-gold/50" />
                    Amber Tower, Downtown, Dubai
                  </p>
                  <a href="tel:+971582273323" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                    <Phone size={14} className="text-gold/50" />
                    +971 58 227 3323
                  </a>
                  <a href="tel:+971553258530" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                    <Phone size={14} className="text-gold/50" />
                    +971 55 325 8530
                  </a>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium contact-animate">
              <Calendar size={16} />
              Book a 20-min discovery call
            </button>
          </div>

          {/* Form */}
          <div className="contact-animate bg-gold/5 border border-gold/20 rounded-2xl lg:rounded-3xl p-5 lg:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">Thank you!</h3>
                <p className="text-white/60">We&apos;ll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold/30 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-all"
                      placeholder="John & Jane"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold/30 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold/30 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold/30 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-all"
                      placeholder="Galle, Sri Lanka"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Tell us about your vision</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold/30 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-all resize-none"
                    placeholder="We dream of a beach ceremony with..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 border border-gold text-gold text-sm font-medium rounded-full hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
