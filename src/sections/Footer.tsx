import { Instagram, Facebook, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Destinations', id: 'destinations' },
    { label: 'Packages', id: 'packages' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-black border-t border-gold/10 py-12 lg:py-16 z-[80]">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-serif text-2xl lg:text-3xl text-white mb-4 block hover:text-gold transition-colors"
            >
              TheEventTimes
            </button>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              Destination weddings & events in Sri Lanka, planned with heart. 
              We transform your love story into an unforgettable celebration.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group">
                <Instagram size={16} className="text-gold group-hover:text-black" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group">
                <Facebook size={16} className="text-gold group-hover:text-black" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all group">
                <Linkedin size={16} className="text-gold group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/50 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>hello@theeventtimes.studio</li>
              <li>+94 77 123 4567</li>
              <li>Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} TheEventTimes. All rights reserved.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-gold" fill="currentColor" /> in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
