import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  isAdminModeActive?: boolean;
}

export function Navbar({ isAdminModeActive = false }: NavbarProps) {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isAdminModeActive ? 'top-10 sm:top-11' : 'top-0'
        } ${
          scrolled
            ? 'bg-[#130E0C]/90 backdrop-blur-md border-b border-[#2A201A] py-3.5 shadow-xl shadow-black/20'
            : 'bg-gradient-to-b from-[#130E0C]/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full border border-[#A38468]/50 flex items-center justify-center bg-[#1F1714] text-[#FAF8F5] text-xs font-serif italic group-hover:border-[#A38468] transition-colors">
              SK
            </div>
            <div>
              <span className="font-heading text-lg sm:text-xl font-medium tracking-tight text-[#FAF8F5] group-hover:text-[#A38468] transition-colors">
                {content.nav.logoText}
              </span>
              <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase text-[#A38468] ml-2 font-medium">
                Socials
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-[#C4B29E]">
            {content.nav.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#FAF8F5] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#A38468] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase font-medium rounded-full bg-[#FAF8F5] text-[#130E0C] hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all transform active:scale-95 shadow-md shadow-black/20"
            >
              {content.nav.ctaText}
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#FAF8F5] hover:bg-[#1E1714] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#130E0C]/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-10 flex flex-col justify-between">
          <div className="space-y-6">
            <p className="text-[11px] tracking-widest uppercase text-[#A38468] font-medium border-b border-[#2A201A] pb-2">
              Menu Navigation
            </p>
            <div className="flex flex-col space-y-4">
              {content.nav.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif italic text-[#FAF8F5] hover:text-[#A38468] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#2A201A]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-3.5 text-xs tracking-widest uppercase font-medium rounded-full bg-[#FAF8F5] text-[#130E0C] hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all"
            >
              {content.nav.ctaText}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
