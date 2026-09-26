import { useState, useEffect } from 'react';
import {
  Inbox,
  Edit3,
  Shield,
  Search,
  PlusCircle,
  Mail,
  Instagram,
  Trash2,
  ExternalLink,
  LogOut,
  Save,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Building2,
  UserCheck
} from 'lucide-react';
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { InquiryRecord } from '../types';

interface AdminPanelPageProps {
  onNavigateToSite: () => void;
}

export function AdminPanelPage({ onNavigateToSite }: AdminPanelPageProps) {
  const { user, logout } = useAuth();
  const { content, updateField, resetToDefault, isSaving, saveMessage } = useContent();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'cms' | 'config'>('inquiries');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed' | 'contacted' | 'archived'>('all');

  // CMS Editor form states
  const [heroTitle1, setHeroTitle1] = useState(content.hero.titleLine1);
  const [heroItalic1, setHeroItalic1] = useState(content.hero.titleItalic1);
  const [heroTitle2, setHeroTitle2] = useState(content.hero.titleLine2);
  const [heroItalic2, setHeroItalic2] = useState(content.hero.titleItalic2);
  const [heroDesc, setHeroDesc] = useState(content.hero.description);
  const [founderQuote, setFounderQuote] = useState(content.contact.founderQuote);
  const [contactEmail, setContactEmail] = useState(content.contact.email);

  useEffect(() => {
    setHeroTitle1(content.hero.titleLine1);
    setHeroItalic1(content.hero.titleItalic1);
    setHeroTitle2(content.hero.titleLine2);
    setHeroItalic2(content.hero.titleItalic2);
    setHeroDesc(content.hero.description);
    setFounderQuote(content.contact.founderQuote);
    setContactEmail(content.contact.email);
  }, [content]);

  // Real-time listener for Firestore collection "inquiries"
  useEffect(() => {
    setLoadingInquiries(true);
    const q = query(collection(db, 'inquiries'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: InquiryRecord[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...(d.data() as any) });
        });
        // Sort newest first
        list.sort((a, b) => {
          const tA = a.createdAt?.seconds || 0;
          const tB = b.createdAt?.seconds || 0;
          return tB - tA;
        });
        setInquiries(list);
        setLoadingInquiries(false);
      },
      (err) => {
        console.warn('Inquiries snapshot listener error:', err);
        setLoadingInquiries(false);
      }
    );

    return () => unsub();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: InquiryRecord['status']) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `inquiries/${id}`);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this client inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  const handleSeedSample = async () => {
    const id = `inq_${Date.now()}`;
    try {
      await setDoc(doc(db, 'inquiries', id), {
        name: 'Camilla Laurent',
        studio: 'Maison Laurent Interior Design',
        email: 'camilla@maisonlaurent.com',
        handle: '@maison.laurent',
        service: 'Content Sessions',
        message:
          'Seeking on-location editorial iPhone 4K capture for our upcoming Autumn furniture showcase in Sydney.',
        status: 'new',
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `inquiries/${id}`);
    }
  };

  const handleSaveCMS = async () => {
    await updateField('hero.titleLine1', heroTitle1);
    await updateField('hero.titleItalic1', heroItalic1);
    await updateField('hero.titleLine2', heroTitle2);
    await updateField('hero.titleItalic2', heroItalic2);
    await updateField('hero.description', heroDesc);
    await updateField('contact.founderQuote', founderQuote);
    await updateField('contact.email', contactEmail);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const queryLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      inq.name?.toLowerCase().includes(queryLower) ||
      inq.studio?.toLowerCase().includes(queryLower) ||
      inq.email?.toLowerCase().includes(queryLower) ||
      inq.service?.toLowerCase().includes(queryLower) ||
      inq.message?.toLowerCase().includes(queryLower);

    return matchesStatus && matchesSearch;
  });

  const countNew = inquiries.filter((i) => i.status === 'new').length;
  const countReviewed = inquiries.filter((i) => i.status === 'reviewed').length;
  const countContacted = inquiries.filter((i) => i.status === 'contacted').length;

  return (
    <div className="min-h-screen bg-[#130E0C] text-[#FAF8F5] flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1A1412]/95 backdrop-blur-md border-b border-[#2D231E] px-5 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#A38468]/50 flex items-center justify-center bg-[#1F1714] text-[#FAF8F5] text-xs font-serif italic">
              SK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-base font-medium tracking-tight text-[#FAF8F5]">
                  Sam K. Socials
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A38468] px-2 py-0.5 rounded-full border border-[#3A2E28] bg-[#140F0D]">
                  Admin Panel
                </span>
              </div>
              <p className="text-[10px] text-[#8E7158] hidden sm:block">
                Firebase Project: <span className="text-[#C4B29E]">samksocials-d6da5</span>
              </p>
            </div>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-1 sm:gap-2 bg-[#120D0B] p-1 rounded-full border border-[#2D231E] text-xs">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#A38468] text-[#130E0C] font-semibold shadow-md'
                  : 'text-[#C4B29E] hover:text-[#FAF8F5]'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries</span>
              {countNew > 0 && (
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeTab === 'inquiries'
                      ? 'bg-[#130E0C] text-[#FAF8F5]'
                      : 'bg-amber-500 text-[#130E0C]'
                  }`}
                >
                  {countNew}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'cms'
                  ? 'bg-[#A38468] text-[#130E0C] font-semibold shadow-md'
                  : 'text-[#C4B29E] hover:text-[#FAF8F5]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Site CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'config'
                  ? 'bg-[#A38468] text-[#130E0C] font-semibold shadow-md'
                  : 'text-[#C4B29E] hover:text-[#FAF8F5]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Firebase</span>
            </button>
          </div>

          {/* Right Profile & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#C4B29E] bg-[#140F0D] px-3 py-1.5 rounded-full border border-[#2D231E]">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">{user?.email}</span>
            </div>

            <button
              onClick={onNavigateToSite}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#3A2E28] bg-[#1F1714] text-xs text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">View Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-full border border-[#3A2E28] text-[#C4B29E] hover:text-red-300 hover:border-red-900 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* ================= TAB 1: INQUIRIES DASHBOARD ================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-[#2D231E] bg-[#1A1412] space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-[#8E7158] font-medium">
                  Total Inquiries
                </p>
                <p className="text-2xl sm:text-3xl font-heading font-medium text-[#FAF8F5]">
                  {inquiries.length}
                </p>
                <p className="text-[10px] text-[#A38468]">Recorded in Firestore</p>
              </div>

              <div className="p-5 rounded-2xl border border-amber-900/40 bg-amber-950/20 space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-amber-300 font-medium">
                  New Unread
                </p>
                <p className="text-2xl sm:text-3xl font-heading font-medium text-amber-200">
                  {countNew}
                </p>
                <p className="text-[10px] text-amber-400/80">Pending founder review</p>
              </div>

              <div className="p-5 rounded-2xl border border-sky-900/40 bg-sky-950/20 space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-sky-300 font-medium">
                  Under Review
                </p>
                <p className="text-2xl sm:text-3xl font-heading font-medium text-sky-200">
                  {countReviewed}
                </p>
                <p className="text-[10px] text-sky-400/80">Scope being evaluated</p>
              </div>

              <div className="p-5 rounded-2xl border border-emerald-900/40 bg-emerald-950/20 space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium">
                  Contacted
                </p>
                <p className="text-2xl sm:text-3xl font-heading font-medium text-emerald-200">
                  {countContacted}
                </p>
                <p className="text-[10px] text-emerald-400/80">Discovery call sent</p>
              </div>
            </div>

            {/* Filter & Action Toolbar */}
            <div className="p-4 rounded-2xl border border-[#2D231E] bg-[#1A1412] flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#8E7158] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, studio, email, service..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#2D231E] bg-[#120D0B] text-xs text-[#FAF8F5] placeholder-[#5A463B] focus:outline-none focus:border-[#A38468]"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                <span className="text-[10px] uppercase tracking-wider text-[#8E7158] mr-1 hidden sm:inline">
                  Status:
                </span>
                {(['all', 'new', 'reviewed', 'contacted', 'archived'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-[11px] capitalize transition-colors cursor-pointer ${
                      statusFilter === status
                        ? 'bg-[#FAF8F5] text-[#130E0C] font-semibold'
                        : 'border border-[#2D231E] text-[#8E7158] hover:text-[#FAF8F5]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Seed Test Button */}
              <button
                onClick={handleSeedSample}
                className="w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#3A2E28] bg-[#1E1714] text-xs text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#A38468]" />
                <span>Seed Test Inquiry</span>
              </button>
            </div>

            {/* Inquiries List View */}
            {loadingInquiries ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-6 h-6 text-[#A38468] animate-spin mx-auto" />
                <p className="text-xs text-[#8E7158]">Connecting to Firestore inquiries collection...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="py-16 text-center rounded-3xl border border-[#2D231E] bg-[#181210] p-8 space-y-4">
                <Inbox className="w-10 h-10 text-[#A38468]/40 mx-auto" />
                <h3 className="text-lg font-heading font-medium text-[#FAF8F5]">
                  No matching inquiries found
                </h3>
                <p className="text-xs text-[#8E7158] max-w-sm mx-auto">
                  Client submissions from the website contact form will appear here automatically in
                  real time.
                </p>
                <button
                  onClick={handleSeedSample}
                  className="px-5 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer"
                >
                  Create Sample Inquiry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-6 rounded-3xl border border-[#2D231E] bg-[#1A1412] hover:border-[#3D3029] transition-all duration-300 shadow-xl space-y-5"
                  >
                    {/* Top Row: Client Name, Studio, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#251D18] pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg font-heading font-medium text-[#FAF8F5]">
                            {inq.name}
                          </h3>
                          <span className="text-xs text-[#A38468] font-light flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {inq.studio}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E7158]">
                          <span>{inq.email}</span>
                          {inq.handle && (
                            <>
                              <span>•</span>
                              <span className="text-[#C4B29E] flex items-center gap-1">
                                <Instagram className="w-3 h-3 text-[#A38468]" />
                                {inq.handle}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Status Selector & Timestamp */}
                      <div className="flex items-center gap-3">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateStatus(inq.id, e.target.value as InquiryRecord['status'])
                          }
                          className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none transition-all ${
                            inq.status === 'new'
                              ? 'border-amber-600/60 bg-amber-950/40 text-amber-300'
                              : inq.status === 'reviewed'
                              ? 'border-sky-600/60 bg-sky-950/40 text-sky-300'
                              : inq.status === 'contacted'
                              ? 'border-emerald-600/60 bg-emerald-950/40 text-emerald-300'
                              : 'border-zinc-600/60 bg-zinc-900/50 text-zinc-400'
                          }`}
                        >
                          <option value="new">Status: New</option>
                          <option value="reviewed">Status: Reviewed</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="archived">Status: Archived</option>
                        </select>
                      </div>
                    </div>

                    {/* Middle Row: Service Tag & Message */}
                    <div className="space-y-3">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#120D0B] border border-[#2D231E] text-xs text-[#C4B29E]">
                        Interested in: <strong className="text-[#FAF8F5]">{inq.service}</strong>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#140F0D] border border-[#231A15] text-xs sm:text-sm text-[#FAF8F5]/90 font-light leading-relaxed">
                        "{inq.message}"
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#231A15] text-xs">
                      <a
                        href={`mailto:${inq.email}?subject=Sam K. Socials — Discovery & Next Steps for ${encodeURIComponent(
                          inq.studio
                        )}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#130E0C] font-semibold uppercase tracking-wider text-[11px] hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="flex items-center gap-1.5 text-[#8E7158] hover:text-red-400 transition-colors p-2 cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: LIVE CONTENT CMS ================= */}
        {activeTab === 'cms' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="p-6 rounded-3xl border border-[#2D231E] bg-[#1A1412] space-y-6">
              <div className="border-b border-[#251D18] pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-medium text-[#FAF8F5]">
                    Live Website Copy CMS
                  </h3>
                  <p className="text-xs text-[#8E7158]">
                    Updates persist directly to Firestore and sync instantly for all visitors.
                  </p>
                </div>
                {saveMessage && (
                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{saveMessage}</span>
                  </div>
                )}
              </div>

              {/* Hero Section Headlines */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#A38468] font-semibold">
                  Hero Headlines
                </h4>

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
              </div>

              {/* Contact Details */}
              <div className="space-y-4 pt-4 border-t border-[#251D18]">
                <h4 className="text-xs uppercase tracking-widest text-[#A38468] font-semibold">
                  Founder Quote & Direct Email
                </h4>

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
                      Founder Quote
                    </label>
                    <input
                      type="text"
                      value={founderQuote}
                      onChange={(e) => setFounderQuote(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                    />
                  </div>
                </div>
              </div>

              {/* Save Controls */}
              <div className="pt-4 flex items-center justify-between border-t border-[#251D18]">
                <button
                  onClick={resetToDefault}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#3A2E28] text-xs text-[#8E7158] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  onClick={handleSaveCMS}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer shadow-lg"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Publishing...' : 'Publish to Firestore'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FIREBASE CONFIG ================= */}
        {activeTab === 'config' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="p-6 rounded-3xl border border-[#2D231E] bg-[#1A1412] space-y-5">
              <div className="flex items-center gap-3 border-b border-[#251D18] pb-4">
                <div className="w-10 h-10 rounded-full bg-[#140F0D] border border-[#A38468] flex items-center justify-center text-[#A38468]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-medium text-[#FAF8F5]">
                    Firebase Infrastructure Status
                  </h3>
                  <p className="text-xs text-[#8E7158]">Active connection details</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#120D0B] border border-[#231A15]">
                  <span className="text-[#8E7158]">Firebase Project ID:</span>
                  <span className="font-mono text-[#FAF8F5]">samksocials-d6da5</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#120D0B] border border-[#231A15]">
                  <span className="text-[#8E7158]">Authentication Mode:</span>
                  <span className="text-emerald-400 font-medium">Email / Password & Google OAuth</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#120D0B] border border-[#231A15]">
                  <span className="text-[#8E7158]">Inquiries Collection:</span>
                  <span className="font-mono text-[#FAF8F5]">/inquiries (Real-time onSnapshot)</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#120D0B] border border-[#231A15]">
                  <span className="text-[#8E7158]">Site Content Collection:</span>
                  <span className="font-mono text-[#FAF8F5]">/content/main (Live CMS)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
