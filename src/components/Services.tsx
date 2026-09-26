import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Services() {
  const { content, setSelectedService } = useContent();

  const handleInquireService = (serviceName: string) => {
    setSelectedService(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-36 bg-[#16110F] border-b border-[#2A201A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
            {content.servicesHeader.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-[#FAF8F5] leading-tight">
            {content.servicesHeader.heading}{' '}
            <span className="font-serif italic font-normal text-[#A38468]">
              {content.servicesHeader.headingItalic}
            </span>
          </h2>
          <p className="text-[#C4B29E] text-base sm:text-lg font-light leading-relaxed">
            {content.servicesHeader.description}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12 sm:space-y-16">
          {content.services.map((service, index) => (
            <div
              key={service.id}
              className="rounded-3xl border border-[#2D231E] bg-[#1A1412] overflow-hidden p-6 sm:p-10 lg:p-12 hover:border-[#3E3029] transition-all duration-300 shadow-xl shadow-black/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left/Middle Content: Details & Deliverables */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Top Meta: Number & Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-serif italic text-[#A38468]">
                      {service.num}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-[#3A2E28] bg-[#140F0D] text-[#C4B29E]">
                      {service.badge}
                    </span>
                  </div>

                  {/* Service Title & Scope */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-medium text-[#FAF8F5]">
                      {service.name}
                    </h3>
                    <p className="text-sm sm:text-base font-serif italic text-[#D4C3B3] mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[#C4B29E] text-sm sm:text-base leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                      {content.servicesHeader.inclusionsLabel}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#EFEBE4]">
                          <Check className="w-3.5 h-3.5 text-[#A38468] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleInquireService(service.name)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-medium uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all transform active:scale-95 cursor-pointer shadow-md shadow-black/20"
                    >
                      <span>{content.servicesHeader.inquireCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: High-Res Editorial Photography */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#3A2E28] bg-[#140F0D] group">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130E0C]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-right">
                      <span className="text-[9px] uppercase tracking-widest font-medium text-[#C4B29E] bg-[#130E0C]/80 px-2.5 py-1 rounded">
                        {service.caption}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hybrid Scope Banner */}
        <div className="mt-16 p-8 rounded-2xl border border-[#2D231E] bg-[#1A1412]/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="text-sm text-[#C4B29E] font-light max-w-xl">
            {content.servicesHeader.bottomNote}
          </p>
          <button
            onClick={() => handleInquireService('Custom Hybrid Retainer')}
            className="px-6 py-3 rounded-full border border-[#4A3B32] text-xs tracking-wider uppercase font-medium text-[#FAF8F5] hover:border-[#A38468] hover:bg-[#2A201A] transition-all cursor-pointer whitespace-nowrap"
          >
            {content.servicesHeader.bottomCtaText}
          </button>
        </div>
      </div>
    </section>
  );
}
