import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getAssetUrl } from '../utils/assetUrl';

export function Diagnostic() {
  const { content } = useContent();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = content.checklist.items[activeIndex] || content.checklist.items[0];

  return (
    <section id="philosophy" className="py-24 sm:py-36 bg-[#16110F] border-b border-[#2A201A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20 space-y-4">
          <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
            {content.checklist.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-[#FAF8F5] leading-tight">
            {content.checklist.heading}{' '}
            <span className="font-serif italic font-normal text-[#A38468]">
              {content.checklist.headingItalic}
            </span>
          </h2>
          <p className="text-[#C4B29E] text-base sm:text-lg font-light leading-relaxed">
            {content.checklist.description}
          </p>
        </div>

        {/* Interactive Diagnostic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Interactive 5 Diagnostic Items */}
          <div className="lg:col-span-7 space-y-3">
            {content.checklist.items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.num}
                  onClick={() => setActiveIndex(index)}
                  className={`group p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#1F1714] border-[#A38468]/70 shadow-xl shadow-black/40'
                      : 'bg-[#1A1412]/50 border-[#2A201A] hover:border-[#3A2E28] hover:bg-[#1A1412]'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span
                      className={`text-sm sm:text-base font-serif italic transition-colors ${
                        isActive ? 'text-[#A38468]' : 'text-[#746150] group-hover:text-[#C4B29E]'
                      }`}
                    >
                      {item.num}
                    </span>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={`text-base sm:text-lg font-heading font-medium tracking-wide transition-colors ${
                            isActive ? 'text-[#FAF8F5]' : 'text-[#D4C3B3] group-hover:text-[#FAF8F5]'
                          }`}
                        >
                          {item.title}
                        </h3>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#A38468] shrink-0" />
                        )}
                      </div>

                      <p
                        className={`text-xs sm:text-sm font-light leading-relaxed transition-all ${
                          isActive
                            ? 'text-[#C4B29E] max-h-32 opacity-100 mt-2'
                            : 'text-[#8E7158] max-h-0 sm:max-h-32 opacity-80 overflow-hidden sm:overflow-visible'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Archive Preview & Quote */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-[#3A2E28] bg-[#1E1714] shadow-2xl space-y-6 p-6">
              {/* Image Preview with Smooth Transition */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#130E0C]">
                <img
                  key={activeItem.image}
                  src={getAssetUrl(activeItem.image)}
                  alt={activeItem.title}
                  className="w-full h-full object-cover filter contrast-[1.05] transition-opacity duration-500 animate-fadeIn"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130E0C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-right">
                  <span className="text-[10px] tracking-widest uppercase font-medium text-[#C4B29E] bg-[#130E0C]/80 backdrop-blur-sm px-2.5 py-1 rounded">
                    {activeItem.caption}
                  </span>
                </div>
              </div>

              {/* Dynamic Quote */}
              <blockquote className="border-l-2 border-[#A38468] pl-4 py-1">
                <p className="text-base sm:text-lg font-serif italic text-[#FAF8F5] leading-relaxed">
                  "{activeItem.quote}"
                </p>
              </blockquote>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-[#2A201A] space-y-3">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-medium uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all"
                >
                  <span>{content.checklist.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-[11px] text-center text-[#746150] tracking-wide">
                  {content.checklist.responseTimeText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
