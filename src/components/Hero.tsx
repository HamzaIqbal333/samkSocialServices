import { ArrowDownRight, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Hero() {
  const { content } = useContent();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden border-b border-[#2A201A]">
      {/* Background Image with Warm Vignette & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.bgImage}
          alt="Editorial social media session capture"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.08]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130E0C] via-[#130E0C]/60 to-[#130E0C]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#130E0C]/40 to-[#130E0C]/90" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full my-auto">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[#A38468]/30 bg-[#1E1714]/70 backdrop-blur-sm text-[11px] tracking-widest uppercase text-[#C4B29E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A38468]" />
            Editorial Social Media • Content Capture • Paid Ads
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-semibold tracking-tight text-[#FAF8F5] leading-[1.05] sm:leading-[1.02]">
            <span>{content.hero.titleLine1} </span>
            <span className="font-serif italic font-normal text-[#D4C3B3]">
              {content.hero.titleItalic1}
            </span>
            <span> {content.hero.titleAfterItalic1}</span>
            <br className="hidden sm:inline" />
            <span> {content.hero.titleLine2} </span>
            <span className="font-serif italic font-normal text-[#A38468]">
              {content.hero.titleItalic2}
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#C4B29E] text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            {content.hero.description}
          </p>

          {/* Call to Actions */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
            <a
              href={content.hero.ctaPrimaryLink}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm tracking-wider uppercase font-medium rounded-full bg-[#FAF8F5] text-[#130E0C] hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all transform active:scale-95 shadow-lg shadow-black/40 group"
            >
              <span>{content.hero.ctaPrimaryText}</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            <a
              href={content.hero.ctaSecondaryLink}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm tracking-wider uppercase font-medium rounded-full border border-[#4A3B32] bg-[#1E1714]/60 text-[#FAF8F5] hover:border-[#A38468] hover:bg-[#2A201A] transition-all"
            >
              {content.hero.ctaSecondaryText}
            </a>
          </div>
        </div>
      </div>

      {/* Ticker / Marquee Bar */}
      <div className="relative z-10 w-full mt-10 border-t border-b border-[#2A201A] bg-[#17110F]/80 backdrop-blur-sm py-3.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          {[...content.hero.tickerItems, ...content.hero.tickerItems, ...content.hero.tickerItems].map(
            (item, index) => (
              <div key={index} className="flex items-center gap-10">
                <span className="text-xs sm:text-sm tracking-widest uppercase font-medium text-[#C4B29E]">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A38468]/70" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
