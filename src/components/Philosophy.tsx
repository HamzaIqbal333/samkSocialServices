import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getAssetUrl } from '../utils/assetUrl';

export function Philosophy() {
  const { content } = useContent();

  return (
    <section id="about" className="relative py-24 sm:py-36 bg-[#130E0C] border-b border-[#2A201A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Imagery Gallery */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-[#3A2E28] shadow-2xl shadow-black/60 bg-[#1B1512]">
                <img
                  src={getAssetUrl(content.philosophy.founderImage1)}
                  alt={content.philosophy.founderName}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130E0C]/90 via-transparent to-transparent" />

                {/* Founder Name Tag */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xl sm:text-2xl font-serif italic text-[#FAF8F5]">
                    {content.philosophy.founderName}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium mt-0.5">
                    {content.philosophy.founderTitle}
                  </p>
                </div>
              </div>

              {/* Floating Secondary Accent Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden border border-[#A38468]/40 shadow-2xl bg-[#1E1714] hidden sm:block">
                <img
                  src={getAssetUrl(content.philosophy.founderImage2)}
                  alt="On location capture"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#130E0C]/85 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#3A2E28] text-center">
                  <p className="text-[10px] uppercase tracking-widest text-[#FAF8F5] font-medium">
                    {content.philosophy.onSetLabel}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[#A38468]">
                    {content.philosophy.onSetSub}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy & Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
                {content.philosophy.eyebrow}
              </span>

              <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-[#FAF8F5] leading-tight">
                {content.philosophy.heading}{' '}
                <span className="font-serif italic font-normal text-[#A38468]">
                  {content.philosophy.headingItalic}
                </span>
              </h2>
            </div>

            <p className="text-[#C4B29E] text-base sm:text-lg leading-relaxed font-light">
              {content.philosophy.description}
            </p>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {content.philosophy.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-[#2D231E] bg-[#1A1412]/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#A38468] shrink-0" />
                  <span className="text-sm font-medium text-[#FAF8F5] tracking-wide">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase font-medium rounded-full bg-[#FAF8F5] text-[#130E0C] hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all"
              >
                <span>{content.philosophy.ctaPrimaryText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase font-medium rounded-full border border-[#3A2E28] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all"
              >
                {content.philosophy.ctaSecondaryText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
