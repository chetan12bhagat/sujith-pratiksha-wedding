import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onReopenEnvelope?: () => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Invitation', href: '#invitation' },
    { label: 'Blessings', href: '#blessings' },
    { label: 'Couple', href: '#couple' },
    { label: 'Events', href: '#events' },
    { label: 'Style', href: '#wardrobe' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-950/90 backdrop-blur-md py-3 border-b border-gold/20 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#invitation"
            onClick={(e) => handleLinkClick(e, '#invitation')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center bg-navy-900 group-hover:border-gold transition-colors">
              <span className="font-display text-xs text-gold font-bold">S&P</span>
            </div>
            <span className="font-display text-sm tracking-wider text-ivory hidden sm:inline group-hover:text-gold transition-colors">
              Sujith & Pratiksha
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans-elegant text-xs uppercase tracking-[0.2em] text-ivory/80 hover:text-gold transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="#rsvp"
              onClick={(e) => handleLinkClick(e, '#rsvp')}
              className="px-4 py-1.5 rounded-full border border-gold bg-gold/10 hover:bg-gold text-gold hover:text-navy-950 font-sans-elegant text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300"
            >
              RSVP
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-ivory hover:text-gold transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-navy-950/98 backdrop-blur-lg border-b border-gold/30 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans-elegant text-sm uppercase tracking-[0.25em] text-ivory/80 hover:text-gold py-2 transition-colors border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <span className="font-serif text-xs text-gold/70 italic">
                  21 December 2026 • Ashirwad Celebration, Wardha
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

