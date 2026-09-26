import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, Mail, MapPin, Instagram } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { useContent } from '../context/ContentContext';

export function Contact() {
  const { content, selectedService, setSelectedService } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    studio: '',
    email: '',
    handle: '',
    service: selectedService || 'Social Media Management',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync formData service if selectedService changes
  if (selectedService && formData.service !== selectedService) {
    setFormData((prev) => ({ ...prev, service: selectedService }));
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!formData.name.trim() || !formData.studio.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      await setDoc(doc(db, 'inquiries', inquiryId), {
        name: formData.name.trim(),
        studio: formData.studio.trim(),
        email: formData.email.trim(),
        handle: formData.handle.trim() || '',
        service: formData.service,
        message: formData.message.trim() || 'No message provided',
        status: 'new',
        createdAt: serverTimestamp()
      });

      setSubmitted(true);
      setFormData({
        name: '',
        studio: '',
        email: '',
        handle: '',
        service: selectedService || 'Social Media Management',
        message: ''
      });
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, `inquiries/${inquiryId}`);
      } catch {
        // Fallback error UI display
      }
      setErrorMessage(
        'Unable to submit inquiry at this moment. Please email directly at ' +
          content.contact.email
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#130E0C] border-b border-[#2A201A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Founder Note */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs tracking-widest uppercase font-medium text-[#A38468]">
                {content.contact.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium tracking-tight text-[#FAF8F5] leading-tight">
                {content.contact.heading}{' '}
                <span className="font-serif italic font-normal text-[#A38468]">
                  {content.contact.headingItalic}
                </span>
              </h2>
              <p className="text-[#C4B29E] text-sm sm:text-base font-light leading-relaxed">
                {content.contact.description}
              </p>
            </div>

            {/* Founder Note Card */}
            <div className="p-6 rounded-2xl border border-[#2D231E] bg-[#1A1412] space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={content.contact.founderImage}
                  alt="Founder"
                  className="w-14 h-14 rounded-full object-cover border border-[#A38468]/50"
                  loading="lazy"
                />
                <div>
                  <p className="text-xs uppercase tracking-widest font-medium text-[#FAF8F5]">
                    {content.contact.founderRole}
                  </p>
                  <p className="text-xs font-serif italic text-[#A38468]">
                    "{content.contact.founderQuote}"
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{content.contact.availability}</span>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#2D231E] bg-[#1A1412]/60">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#A38468]" />
                  <span className="text-xs sm:text-sm text-[#FAF8F5] font-light">
                    {content.contact.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-[#A38468] hover:text-[#FAF8F5] flex items-center gap-1 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#2D231E] bg-[#1A1412]/60">
                <MapPin className="w-4 h-4 text-[#A38468]" />
                <span className="text-xs sm:text-sm text-[#C4B29E] font-light">
                  {content.contact.location}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#2D231E] bg-[#1A1412]/60">
                <Instagram className="w-4 h-4 text-[#A38468]" />
                <span className="text-xs sm:text-sm text-[#C4B29E] font-light">
                  {content.contact.instagramHandle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-[#2D231E] bg-[#1A1412] shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#1E1714] border border-[#A38468] flex items-center justify-center mx-auto text-[#A38468]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#FAF8F5]">
                    Enquiry Received
                  </h3>
                  <p className="text-sm sm:text-base text-[#C4B29E] max-w-md mx-auto leading-relaxed">
                    Thank you. Your project enquiry has been logged directly into our studio database.
                    Samrah will personally review your brand and reply within 24–48 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-[#3A2E28] text-xs uppercase tracking-wider text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-red-900/50 bg-red-950/20 text-red-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Your Name */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-[#C4B29E] font-medium">
                        {content.contact.formLabels.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Chen"
                        className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#130E0C] text-[#FAF8F5] placeholder-[#5A463B] text-sm focus:outline-none focus:border-[#A38468] transition-colors"
                      />
                    </div>

                    {/* Brand / Studio Name */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-[#C4B29E] font-medium">
                        {content.contact.formLabels.studio}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studio}
                        onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                        placeholder="e.g. Maison Solène"
                        className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#130E0C] text-[#FAF8F5] placeholder-[#5A463B] text-sm focus:outline-none focus:border-[#A38468] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-[#C4B29E] font-medium">
                        {content.contact.formLabels.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@maisonsolene.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#130E0C] text-[#FAF8F5] placeholder-[#5A463B] text-sm focus:outline-none focus:border-[#A38468] transition-colors"
                      />
                    </div>

                    {/* Instagram / Website */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-[#C4B29E] font-medium">
                        {content.contact.formLabels.handle}
                      </label>
                      <input
                        type="text"
                        value={formData.handle}
                        onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                        placeholder="@maison.solene or URL"
                        className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#130E0C] text-[#FAF8F5] placeholder-[#5A463B] text-sm focus:outline-none focus:border-[#A38468] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Primary Service Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-[#C4B29E] font-medium">
                      {content.contact.formLabels.service}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        setSelectedService(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#130E0C] text-[#FAF8F5] text-sm focus:outline-none focus:border-[#A38468] transition-colors cursor-pointer [&>option]:bg-[#1A1412] [&>option]:text-[#FAF8F5]"
                    >
                      {content.services.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.num} — {srv.name} ({srv.scopeLabel})
                        </option>
                      ))}
                      <option value="Custom Hybrid Retainer">Custom Hybrid Retainer</option>
                      <option value="General Studio Inquiry">General Studio Inquiry</option>
                    </select>
                  </div>

                  {/* Message & Scope Details */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-[#C4B29E] font-medium">
                      {content.contact.formLabels.message}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand vision, target timeline, and what you're hoping to achieve..."
                      className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#130E0C] text-[#FAF8F5] placeholder-[#5A463B] text-sm focus:outline-none focus:border-[#A38468] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Assurance */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all transform active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg shadow-black/40"
                    >
                      {submitting ? (
                        <span>Logging Enquiry to Firestore...</span>
                      ) : (
                        <>
                          <span>{content.contact.formLabels.submitButton}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-[#746150] tracking-wide">
                      {content.contact.formLabels.assurance}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
