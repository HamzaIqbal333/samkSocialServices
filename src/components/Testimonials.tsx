import { Quote } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Testimonials() {
  const { content } = useContent();

  return (
    <section className="py-24 sm:py-36 bg-[#130E0C] border-b border-[#2A201A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
            {content.testimonialsHeader.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-medium text-[#FAF8F5]">
            Trusted by Modern Founders
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.map((test) => (
            <div
              key={test.id}
              className="p-8 sm:p-10 rounded-2xl border border-[#2D231E] bg-[#1A1412] flex flex-col justify-between space-y-8 hover:border-[#3E3029] transition-all duration-300"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#A38468]/50" />
                <p className="text-base sm:text-lg font-serif italic text-[#FAF8F5] leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-[#261E1A]">
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#A38468]/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-heading font-medium text-[#FAF8F5]">
                    {test.name}
                  </h4>
                  <p className="text-xs text-[#8E7158] font-light">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
