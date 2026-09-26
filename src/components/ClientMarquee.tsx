import { Marquee } from './Marquee';

interface BrandMarqueeProps {
  heading?: string;
}

const clientBrands = [
  { name: 'AURA AESTHETICS', niche: 'Cosmetic Medicine' },
  { name: 'MAISON ÉLÉGANCE', niche: 'Haute Horlogerie' },
  { name: 'SOLARIS WELLNESS', niche: 'Holistic Retreat' },
  { name: 'STUDIO NOIR', niche: 'Architectural Design' },
  { name: 'VALENTINE & CO.', niche: 'Fine Jewelry' },
  { name: 'LUMINA SKIN', niche: 'Clinical Dermal' },
  { name: 'ATELIER ROUGE', niche: 'Boutique Hospitality' },
  { name: 'VERVE BOTANICALS', niche: 'Clean Skincare' }
];

const editorialPillars = [
  '7+ YEARS STRATEGIC EXPERTISE',
  '4K IPHONE ON-LOCATION CAPTURE',
  'ZERO COOKIE-CUTTER TEMPLATES',
  'FOUNDER-DIRECT PARTNERSHIP',
  'METRIC-BACKED REVENUE GROWTH',
  'SYDNEY & INTERNATIONAL CLIENTS'
];

export function ClientMarquee({ heading }: BrandMarqueeProps) {
  return (
    <section className="relative py-12 sm:py-16 bg-[#110D0B] border-b border-[#2A201A] overflow-hidden">
      {/* Subtle top label */}
      <div className="text-center mb-8 px-4">
        <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium text-[#A38468]">
          {heading || 'Trusted by Discerning Founders & High-Ticket Studios'}
        </p>
      </div>

      {/* Row 1: Brand & Studio Names (Scrolling Left) */}
      <div className="py-2.5">
        <Marquee speedSeconds={25} direction="left">
          {clientBrands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-4 sm:gap-6 px-4 py-2 rounded-full border border-[#2D231E]/80 bg-[#17120F]/60 hover:border-[#A38468]/50 hover:bg-[#1E1714] transition-all cursor-default shrink-0 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A38468] shrink-0" />
              <span className="text-xs sm:text-sm font-heading font-medium tracking-wider text-[#FAF8F5]">
                {brand.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-serif italic text-[#A38468]">
                ({brand.niche})
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Row 2: Editorial Accolades & Value Props (Scrolling Right) */}
      <div className="pt-4 pb-1">
        <Marquee speedSeconds={35} direction="right">
          {editorialPillars.map((text, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12 shrink-0 whitespace-nowrap">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#8E7158] font-light">
                {text}
              </span>
              <span className="text-xs font-serif italic text-[#A38468]/60">✦</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
