import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Instagram, X, Eye, Play, Pause } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { GalleryItem } from '../types';
import { Marquee } from './Marquee';
import { getAssetUrl } from '../utils/assetUrl';

export function Gallery() {
  const { content } = useContent();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    setIsAutoScroll(false);
    if (scrollRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 sm:py-36 bg-[#130E0C] border-b border-[#2A201A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
              {content.gallery.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-[#FAF8F5] leading-tight">
              {content.gallery.heading}{' '}
              <span className="font-serif italic font-normal text-[#A38468]">
                {content.gallery.headingItalic}
              </span>
            </h2>
            <p className="text-[#C4B29E] text-base sm:text-lg font-light leading-relaxed">
              {content.gallery.description}
            </p>
          </div>

          {/* Controls: Auto-marquee toggle & Arrows */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                isAutoScroll
                  ? 'border-[#A38468] bg-[#A38468]/15 text-[#FAF8F5]'
                  : 'border-[#3A2E28] bg-[#1E1714] text-[#8E7158] hover:text-[#FAF8F5]'
              }`}
              title={isAutoScroll ? 'Pause Continuous Flow' : 'Enable Continuous Flow'}
            >
              {isAutoScroll ? <Pause className="w-3.5 h-3.5 text-[#A38468]" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isAutoScroll ? 'Continuous' : 'Paused'}</span>
            </button>
            <button
              onClick={() => scroll('left')}
              className="p-2.5 sm:p-3 rounded-full border border-[#3A2E28] bg-[#1E1714] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 sm:p-3 rounded-full border border-[#3A2E28] bg-[#1E1714] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous Flow Marquee or Manual Carousel */}
        {isAutoScroll ? (
          <div className="py-2">
            <Marquee speedSeconds={35} direction="left" pauseOnHover={true} className="py-2">
              {content.gallery.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative flex-none w-[270px] sm:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#2D231E] bg-[#181210] shadow-lg hover:border-[#A38468]/70 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.text}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130E0C] via-[#130E0C]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* View Overlay Icon */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-[#130E0C]/70 backdrop-blur-sm text-[#FAF8F5] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>

                  {/* Bottom Details */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-1">
                    <p className="text-sm font-heading font-medium tracking-wider text-[#FAF8F5]">
                      {item.text}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {content.gallery.items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative flex-none w-[280px] sm:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#2D231E] bg-[#181210] shadow-lg hover:border-[#A38468]/60 transition-all duration-300 snap-start cursor-pointer"
              >
                <img
                  src={getAssetUrl(item.image)}
                  alt={item.text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130E0C] via-[#130E0C]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* View Overlay Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-[#130E0C]/70 backdrop-blur-sm text-[#FAF8F5] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <p className="text-sm font-heading font-medium tracking-wider text-[#FAF8F5]">
                    {item.text}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Cue & Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2A201A]">
          <p className="text-xs text-[#746150] tracking-wide">
            {content.gallery.cueText}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#C4B29E] hover:text-[#FAF8F5] transition-colors"
          >
            <span>{content.gallery.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A38468]" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#130E0C]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-[#3A2E28] bg-[#1E1714] shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#130E0C]/80 text-[#C4B29E] hover:text-[#FAF8F5] border border-[#3A2E28]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#130E0C]">
              <img
                src={getAssetUrl(selectedItem.image)}
                alt={selectedItem.text}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-medium text-[#FAF8F5]">
                  {selectedItem.text}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                  {selectedItem.subtext}
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-medium uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all"
              >
                Inquire For This Aesthetic
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
