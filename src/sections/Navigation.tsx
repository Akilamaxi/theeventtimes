import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Destinations', id: 'destinations' },
    { label: 'Packages', id: 'packages' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
          ? 'bg-black/40 backdrop-blur-2xl border-b border-white/5 shadow-2xl supports-[backdrop-filter]:bg-black/20'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-5 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className="relative w-10 h-10 hidden sm:flex items-center justify-center">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full h-full border border-gold/30 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-gold/60 transition-all duration-500">
                  <Sparkles strokeWidth={1.5} size={18} className="text-gold group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-medium leading-none ml-0.5 mb-1 opacity-80 group-hover:opacity-100 transition-opacity">The</span>
                <span className="font-serif text-xl lg:text-2xl text-white tracking-wide leading-none">
                  Event<span className="font-light text-white/60 group-hover:text-white transition-colors">Times</span>
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 border border-gold text-gold text-sm rounded-full hover:bg-gold hover:text-black transition-all duration-300"
              >
                Book a call
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-serif text-2xl text-white hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-4 px-8 py-3 border border-gold text-gold text-lg rounded-full hover:bg-gold hover:text-black transition-all duration-300"
          >
            Book a call
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
