import { useContent } from '../context/ContentContext';

export function Mission() {
  const { content } = useContent();

  return (
    <section className="relative py-20 sm:py-32 bg-[#16110F] border-b border-[#2A201A] overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-8 sm:space-y-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#A38468]">
          <span className="w-8 h-[1px] bg-[#A38468]/60" />
          {content.mission.eyebrow}
          <span className="w-8 h-[1px] bg-[#A38468]/60" />
        </div>

        {/* Large Statement */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-[#FAF8F5] leading-snug sm:leading-tight">
          <span>{content.mission.statementPart1} </span>
          <span className="font-serif italic font-normal text-[#D4C3B3]">
            {content.mission.statementItalic1}
          </span>
          <br className="hidden md:inline" />
          <span> {content.mission.statementPart2} </span>
          <span className="font-serif italic font-normal text-[#A38468]">
            {content.mission.statementItalic2}
          </span>
          <span> {content.mission.statementPart3}</span>
        </blockquote>

        {/* Badge */}
        <div className="pt-4 flex justify-center">
          <div className="inline-block px-5 py-2 rounded-full border border-[#3A2E28] bg-[#1E1714] text-[11px] tracking-widest uppercase font-medium text-[#C4B29E]">
            {content.mission.badge}
          </div>
        </div>
      </div>
    </section>
  );
}
