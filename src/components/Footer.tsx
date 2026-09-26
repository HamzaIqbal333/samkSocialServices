import { ArrowUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Marquee } from './Marquee';

export function Footer() {
  const { content } = useContent();

  const footerMarqueeTags = [
    'SAM K. SOCIALS',
    'NOW BOOKING Q4 & Q1 RETAINERS',
    'ON-LOCATION CONTENT CREATION',
    'BESPOKE DIGITAL AUTHORITY',
    'SYDNEY • WORLDWIDE'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E0A09] text-[#FAF8F5] pt-0 pb-12 border-t border-[#231A15] overflow-hidden">
      {/* Top Ambient Marquee Strip */}
      <div className="border-b border-[#231A15] bg-[#140F0D] py-3.5 mb-14">
        <Marquee speedSeconds={28} direction="right">
          {footerMarqueeTags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0 whitespace-nowrap">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium text-[#A38468]">
                {tag}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3A2E28] shrink-0" />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-[#A38468]/50 flex items-center justify-center bg-[#1F1714] text-[#FAF8F5] text-xs font-serif italic">
                SK
              </div>
              <span className="font-heading text-lg font-medium tracking-tight text-[#FAF8F5]">
                {content.nav.logoText}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#A38468] font-medium">
                Socials
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8E7158] font-light max-w-md leading-relaxed">
              {content.contact.footerBio}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#A38468] font-medium">
              {content.footer.exploreTitle}
            </p>
            <ul className="space-y-2 text-xs">
              {content.footer.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#C4B29E] hover:text-[#FAF8F5] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiries */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#A38468] font-medium">
              {content.footer.inquiriesTitle}
            </p>
            <p className="text-xs text-[#FAF8F5]">
              {content.contact.email}
            </p>
            <p className="text-xs text-[#8E7158]">
              {content.contact.location}
            </p>
            <p className="text-xs text-[#A38468]">
              {content.contact.instagramHandle}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C1512] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#746150]">
          <p>{content.footer.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            <span>{content.footer.backToTopText}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
