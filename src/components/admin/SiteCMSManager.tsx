import { useState } from 'react';
import {
  Layers,
  Sparkles,
  Image as ImageIcon,
  Quote,
  CheckSquare,
  Type,
  Save,
  RotateCcw,
  CheckCircle2,
  PhoneCall,
  Compass
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { ServicesManager } from './ServicesManager';
import { GalleryManager } from './GalleryManager';
import { TestimonialsManager } from './TestimonialsManager';
import { DiagnosticManager } from './DiagnosticManager';

export function SiteCMSManager() {
  const { content, updateField, updateSection, resetToDefault, isSaving, saveMessage } = useContent();

  const [cmsSubTab, setCmsSubTab] = useState<'services' | 'gallery' | 'testimonials' | 'diagnostic' | 'hero' | 'contact'>('services');

  // Copy editing state for Hero
  const [heroTitle1, setHeroTitle1] = useState(content.hero.titleLine1);
  const [heroItalic1, setHeroItalic1] = useState(content.hero.titleItalic1);
  const [heroTitle2, setHeroTitle2] = useState(content.hero.titleLine2);
  const [heroItalic2, setHeroItalic2] = useState(content.hero.titleItalic2);
  const [heroDesc, setHeroDesc] = useState(content.hero.description);
  const [tickerItemsStr, setTickerItemsStr] = useState(content.hero.tickerItems.join('\n'));

  // Copy editing state for Contact / Studio
  const [contactEmail, setContactEmail] = useState(content.contact.email);
  const [contactLocation, setContactLocation] = useState(content.contact.location);
  const [instagramHandle, setInstagramHandle] = useState(content.contact.instagramHandle);
  const [founderQuote, setFounderQuote] = useState(content.contact.founderQuote);
  const [availability, setAvailability] = useState(content.contact.availability);

  const handleSaveHero = async () => {
    const tickers = tickerItemsStr
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    await updateSection('hero', {
      ...content.hero,
      titleLine1: heroTitle1,
      titleItalic1: heroItalic1,
      titleLine2: heroTitle2,
      titleItalic2: heroItalic2,
      description: heroDesc,
      tickerItems: tickers.length ? tickers : content.hero.tickerItems
    });
  };

  const handleSaveContact = async () => {
    await updateSection('contact', {
      ...content.contact,
      email: contactEmail,
      location: contactLocation,
      instagramHandle: instagramHandle,
      founderQuote: founderQuote,
      availability: availability
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation for CRUD and Sections */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#171210] border border-[#2D231E]">
        <button
          onClick={() => setCmsSubTab('services')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            cmsSubTab === 'services'
              ? 'bg-[#A38468] text-[#130E0C] shadow-md'
              : 'text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#1F1714]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Services ({content.services.length})</span>
        </button>

        <button
          onClick={() => setCmsSubTab('gallery')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            cmsSubTab === 'gallery'
              ? 'bg-[#A38468] text-[#130E0C] shadow-md'
              : 'text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#1F1714]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Feed Showcase ({content.gallery.items.length})</span>
        </button>

        <button
          onClick={() => setCmsSubTab('testimonials')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            cmsSubTab === 'testimonials'
              ? 'bg-[#A38468] text-[#130E0C] shadow-md'
              : 'text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#1F1714]'
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          <span>Testimonials ({content.testimonials.length})</span>
        </button>

        <button
          onClick={() => setCmsSubTab('diagnostic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            cmsSubTab === 'diagnostic'
              ? 'bg-[#A38468] text-[#130E0C] shadow-md'
              : 'text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#1F1714]'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Diagnostic Checklist ({content.checklist.items.length})</span>
        </button>

        <button
          onClick={() => setCmsSubTab('hero')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            cmsSubTab === 'hero'
              ? 'bg-[#A38468] text-[#130E0C] shadow-md'
              : 'text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#1F1714]'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Hero Headlines</span>
        </button>

        <button
          onClick={() => setCmsSubTab('contact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            cmsSubTab === 'contact'
              ? 'bg-[#A38468] text-[#130E0C] shadow-md'
              : 'text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#1F1714]'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Contact & Studio Info</span>
        </button>
      </div>

      {/* Status banner */}
      {saveMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* SUBTAB CONTENT */}
      <div className="p-6 rounded-3xl border border-[#2D231E] bg-[#1A1412] shadow-xl">
        {cmsSubTab === 'services' && <ServicesManager />}
        {cmsSubTab === 'gallery' && <GalleryManager />}
        {cmsSubTab === 'testimonials' && <TestimonialsManager />}
        {cmsSubTab === 'diagnostic' && <DiagnosticManager />}

        {/* HERO COPY EDITOR */}
        {cmsSubTab === 'hero' && (
          <div className="space-y-6">
            <div className="border-b border-[#251D18] pb-4">
              <h4 className="text-base sm:text-lg font-heading font-medium text-[#FAF8F5]">
                Hero Banner Headlines & Ticker
              </h4>
              <p className="text-xs text-[#8E7158]">
                Changes save directly to Firestore and reflect live on the website.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Line 1 Main Text
                </label>
                <input
                  type="text"
                  value={heroTitle1}
                  onChange={(e) => setHeroTitle1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Line 1 Serif Italic
                </label>
                <input
                  type="text"
                  value={heroItalic1}
                  onChange={(e) => setHeroItalic1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Line 2 Main Text
                </label>
                <input
                  type="text"
                  value={heroTitle2}
                  onChange={(e) => setHeroTitle2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Line 2 Serif Italic
                </label>
                <input
                  type="text"
                  value={heroItalic2}
                  onChange={(e) => setHeroItalic2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Hero Paragraph Description
              </label>
              <textarea
                rows={3}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Marquee Ticker Items (One item per line)
              </label>
              <textarea
                rows={4}
                value={tickerItemsStr}
                onChange={(e) => setTickerItemsStr(e.target.value)}
                placeholder="Social Media Management&#10;Content Strategy Roadmap&#10;On-Location iPhone 4K Shoots"
                className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#251D18]">
              <button
                onClick={handleSaveHero}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-lg"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Publishing...' : 'Save Hero Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {/* CONTACT & STUDIO INFO */}
        {cmsSubTab === 'contact' && (
          <div className="space-y-6">
            <div className="border-b border-[#251D18] pb-4">
              <h4 className="text-base sm:text-lg font-heading font-medium text-[#FAF8F5]">
                Contact Info & Studio Details
              </h4>
              <p className="text-xs text-[#8E7158]">
                Update direct contact email, location, and founder details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Studio Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Location / Base
                </label>
                <input
                  type="text"
                  value={contactLocation}
                  onChange={(e) => setContactLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                  Availability Status Pill
                </label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#8E7158]">
                Founder Quote (Contact Section)
              </label>
              <textarea
                rows={2}
                value={founderQuote}
                onChange={(e) => setFounderQuote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#251D18]">
              <button
                onClick={resetToDefault}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#3A2E28] text-xs text-[#8E7158] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Defaults</span>
              </button>

              <button
                onClick={handleSaveContact}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-lg"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Publishing...' : 'Save Contact Details'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
