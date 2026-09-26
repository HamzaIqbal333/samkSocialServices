import { useState } from 'react';
import { Quote, Play, Pause, Star } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Marquee } from './Marquee';
import { getAssetUrl } from '../utils/assetUrl';

export function Testimonials() {
  const { content } = useContent();
  const [isPaused, setIsPaused] = useState(false);

  // Expanded client testimonials & quotes collection for continuous flowing marquee
  const allTestimonials = [
    ...content.testimonials,
    {
      id: "test-4",
      name: "Charlotte Hayes",
      role: "Founder, Atelier Noire Sydney",
      quote: "Our engagement skyrocketed by 280% in the first quarter. Sam's taste level is unmatched in the luxury space.",
      image: "/images/testimonial-sarah.jpg"
    },
    {
      id: "test-5",
      name: "Julian Sterling",
      role: "Managing Director, Sterling Fine Art",
      quote: "The iPhone 4K capture looks richer and more authentic than any six-figure production agency we hired previously.",
      image: "/images/testimonial-marcus.jpg"
    },
    {
      id: "test-6",
      name: "Amara Davies",
      role: "Creative Director, Lumina Skin Clinic",
      quote: "Client inquiries are consistently booking out 4 weeks in advance. Handing our marketing over to Sam was our best ROI.",
      image: "/images/testimonial-elena.jpg"
    }
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#130E0C] border-b border-[#2A201A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow & Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div className="space-y-3">
            <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
              {content.testimonialsHeader.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-[#FAF8F5]">
              Trusted by Modern Founders
            </h2>
          </div>

          {/* Pause / Play Toggle for Marquee */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider rounded-full border border-[#3A2E28] bg-[#1E1714] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#A38468]" /> : <Pause className="w-3.5 h-3.5 text-[#A38468]" />}
              <span>{isPaused ? 'Resume Flow' : 'Pause Flow'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Row 1: Flowing Testimonial Cards (Left Direction) */}
      <div className="py-3">
        <Marquee speedSeconds={42} direction="left" pauseOnHover={!isPaused}>
          {allTestimonials.map((test) => (
            <div
              key={test.id}
              className="flex-none w-[340px] sm:w-[420px] p-7 sm:p-9 rounded-2xl border border-[#2D231E] bg-[#1A1412] flex flex-col justify-between space-y-6 hover:border-[#A38468]/70 hover:shadow-2xl transition-all duration-300 cursor-default select-none mx-2 sm:mx-3"
            >
              {/* Top Quote & Rating */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 text-[#A38468]" />
                  <div className="flex items-center gap-1 text-[#A38468]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A38468]" />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base font-serif italic text-[#FAF8F5] leading-relaxed line-clamp-4">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Meta */}
              <div className="flex items-center gap-4 pt-5 border-t border-[#261E1A]">
                <img
                  src={getAssetUrl(test.image)}
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#A38468]/40 shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-heading font-medium text-[#FAF8F5] truncate">
                    {test.name}
                  </h4>
                  <p className="text-xs text-[#8E7158] font-light truncate">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Marquee Row 2: Reverse Direction Flowing Quotes Ribbon (Right Direction) */}
      <div className="mt-8 border-t border-[#261E1A] bg-[#181210]/60 py-3.5">
        <Marquee speedSeconds={35} direction="right" pauseOnHover={!isPaused}>
          {allTestimonials.map((test, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0 whitespace-nowrap">
              <span className="text-xs sm:text-sm font-serif italic text-[#D4C3B3]">
                "{test.quote.substring(0, 75)}..."
              </span>
              <span className="text-xs text-[#A38468] font-heading font-medium tracking-wider">
                — {test.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A38468] shrink-0" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
