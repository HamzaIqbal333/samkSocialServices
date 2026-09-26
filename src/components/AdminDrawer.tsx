import { useState, useEffect } from 'react';
import {
  X,
  Inbox,
  Edit3,
  Shield,
  CheckCircle,
  Clock,
  Mail,
  Trash2,
  RefreshCw,
  PlusCircle,
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  UserCheck
} from 'lucide-react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
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

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDrawer({ isOpen, onClose }: AdminDrawerProps) {
  const { user, isAdmin, signInWithGoogle, logout, authError } = useAuth();
  const { content, updateField, resetToDefault, isSaving, saveMessage } = useContent();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'editor' | 'auth'>('inquiries');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  // Live content edit form state
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

  // Real-time listener on inquiries collection
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

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
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  const handleSeedSampleInquiry = async () => {
    const id = `inq_demo_${Date.now()}`;
    try {
      await setDoc(doc(db, 'inquiries', id), {
        name: 'Camilla Laurent',
        studio: 'Atelier Laurent',
        email: 'camilla@atelierlaurent.com',
        handle: '@atelier.laurent',
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

  const handleSaveContentEdits = async () => {
    await updateField('hero.titleLine1', heroTitle1);
    await updateField('hero.titleItalic1', heroItalic1);
    await updateField('hero.titleLine2', heroTitle2);
    await updateField('hero.titleItalic2', heroItalic2);
    await updateField('hero.description', heroDesc);
    await updateField('contact.founderQuote', founderQuote);
    await updateField('contact.email', contactEmail);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#140F0D] border-l border-[#2D231E] shadow-2xl flex flex-col h-full animate-slideIn">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#251D18] flex items-center justify-between bg-[#191310]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1F1714] border border-[#A38468] flex items-center justify-center text-[#FAF8F5] font-serif italic text-sm">
              SK
            </div>
            <div>
              <h2 className="text-base font-heading font-medium text-[#FAF8F5]">
                Sam K. Studio Portal
              </h2>
              <p className="text-[11px] text-[#A38468] uppercase tracking-wider">
                Firebase Firestore Connected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#C4B29E] hover:text-[#FAF8F5] hover:bg-[#251D18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#251D18] bg-[#17110F] px-6 text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-[#A38468] text-[#FAF8F5]'
                : 'border-transparent text-[#8E7158] hover:text-[#C4B29E]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Inquiries</span>
            {inquiries.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#A38468] text-[#130E0C] text-[10px] font-bold">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'border-[#A38468] text-[#FAF8F5]'
                : 'border-transparent text-[#8E7158] hover:text-[#C4B29E]'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Live CMS Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('auth')}
            className={`py-3.5 px-4 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'auth'
                ? 'border-[#A38468] text-[#FAF8F5]'
                : 'border-transparent text-[#8E7158] hover:text-[#C4B29E]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Studio Access</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CLIENT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                  Client Submissions ({inquiries.length})
                </p>
                <button
                  onClick={handleSeedSampleInquiry}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#3A2E28] bg-[#1E1714] text-[11px] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#A38468]" />
                  <span>Seed Test Inquiry</span>
                </button>
              </div>

              {loadingInquiries ? (
                <div className="py-12 text-center text-xs text-[#8E7158]">
                  Connecting to Firestore database...
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border border-[#2D231E] bg-[#181210] space-y-3">
                  <Inbox className="w-8 h-8 text-[#A38468]/50 mx-auto" />
                  <p className="text-sm font-heading text-[#FAF8F5]">No inquiries received yet</p>
                  <p className="text-xs text-[#8E7158] max-w-xs mx-auto">
                    Client consultation submissions through the contact form appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl border border-[#2D231E] bg-[#1A1412] space-y-4 hover:border-[#3E3029] transition-all"
                    >
                      {/* Header with Name & Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-heading font-medium text-[#FAF8F5]">
                              {inq.name}
                            </h4>
                            <span className="text-xs text-[#A38468] font-light">
                              • {inq.studio}
                            </span>
                          </div>
                          <p className="text-xs text-[#8E7158] mt-0.5">
                            {inq.email} {inq.handle && `| ${inq.handle}`}
                          </p>
                        </div>

                        {/* Status Select Badge */}
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateStatus(inq.id, e.target.value as InquiryRecord['status'])
                          }
                          className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            inq.status === 'new'
                              ? 'border-amber-600/50 bg-amber-950/30 text-amber-300'
                              : inq.status === 'reviewed'
                              ? 'border-sky-600/50 bg-sky-950/30 text-sky-300'
                              : inq.status === 'contacted'
                              ? 'border-emerald-600/50 bg-emerald-950/30 text-emerald-300'
                              : 'border-zinc-600/50 bg-zinc-900/40 text-zinc-400'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      {/* Service Tag */}
                      <div className="inline-block px-2.5 py-1 rounded bg-[#130E0C] border border-[#2D231E] text-[11px] text-[#D4C3B3]">
                        Service: <span className="text-[#FAF8F5] font-medium">{inq.service}</span>
                      </div>

                      {/* Message */}
                      <p className="text-xs text-[#C4B29E] bg-[#140F0D] p-3 rounded-xl border border-[#231A15] leading-relaxed">
                        "{inq.message}"
                      </p>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#231A15] text-xs">
                        <a
                          href={`mailto:${inq.email}?subject=Sam K. Socials — Discovery & Next Steps for ${encodeURIComponent(
                            inq.studio
                          )}`}
                          className="flex items-center gap-1.5 text-[#A38468] hover:text-[#FAF8F5] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Direct Reply</span>
                        </a>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="flex items-center gap-1 text-red-400/70 hover:text-red-300 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE CMS EDITOR */}
          {activeTab === 'editor' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-[#A38468]/30 bg-[#1E1714]/60 text-xs text-[#C4B29E] space-y-1">
                <p className="text-[#FAF8F5] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A38468]" />
                  Live Firestore Synchronization
                </p>
                <p className="text-[11px] text-[#8E7158]">
                  Edits made here are saved directly to Firestore and will immediately update the live
                  website for all visitors.
                </p>
              </div>

              {saveMessage && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{saveMessage}</span>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                  Hero Section Headlines
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                      Line 1 Text
                    </label>
                    <input
                      type="text"
                      value={heroTitle1}
                      onChange={(e) => setHeroTitle1(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                      Line 1 Serif Italic
                    </label>
                    <input
                      type="text"
                      value={heroItalic1}
                      onChange={(e) => setHeroItalic1(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                      Line 2 Text
                    </label>
                    <input
                      type="text"
                      value={heroTitle2}
                      onChange={(e) => setHeroTitle2(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                      Line 2 Serif Italic
                    </label>
                    <input
                      type="text"
                      value={heroItalic2}
                      onChange={(e) => setHeroItalic2(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                    Hero Description
                  </label>
                  <textarea
                    rows={3}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#231A15]">
                <h4 className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                  Studio Contact Details
                </h4>

                <div>
                  <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                    Direct Email Address
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase text-[#8E7158] mb-1">
                    Founder Quote
                  </label>
                  <input
                    type="text"
                    value={founderQuote}
                    onChange={(e) => setFounderQuote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#2D231E] bg-[#120D0B] text-[#FAF8F5] focus:outline-none focus:border-[#A38468]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleSaveContentEdits}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-medium uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Publishing...' : 'Publish to Firestore'}</span>
                </button>

                <button
                  onClick={resetToDefault}
                  disabled={isSaving}
                  className="p-3 rounded-full border border-[#3A2E28] text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all cursor-pointer"
                  title="Reset to default content"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: AUTH & ACCESS */}
          {activeTab === 'auth' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl border border-[#2D231E] bg-[#1A1412] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#130E0C] border border-[#A38468] flex items-center justify-center text-[#A38468]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-medium text-[#FAF8F5]">
                      Firebase Authentication
                    </h4>
                    <p className="text-xs text-[#8E7158]">
                      Secured with Firebase Auth & Rules
                    </p>
                  </div>
                </div>

                {user ? (
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#130E0C] border border-[#231A15] space-y-1">
                      <p className="text-[11px] uppercase tracking-wider text-[#A38468] font-medium">
                        Signed In As
                      </p>
                      <p className="text-xs text-[#FAF8F5] font-mono">{user.email}</p>
                      <p className="text-[10px] text-[#8E7158]">UID: {user.uid}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <UserCheck className="w-4 h-4" />
                      <span>Studio Admin Access Active</span>
                    </div>

                    <button
                      onClick={logout}
                      className="w-full py-2.5 rounded-full border border-[#3A2E28] text-xs text-[#C4B29E] hover:text-white hover:border-red-500 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-[#C4B29E] leading-relaxed">
                      Sign in with Google to access privileged studio management and live content editing.
                    </p>

                    {authError && (
                      <p className="text-xs text-red-400 bg-red-950/30 p-2.5 rounded-lg border border-red-900/50">
                        {authError}
                      </p>
                    )}

                    <button
                      onClick={signInWithGoogle}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-medium uppercase tracking-wider hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer"
                    >
                      Sign In with Google
                    </button>
                  </div>
                )}
              </div>

              {/* Database Status Details */}
              <div className="p-5 rounded-2xl border border-[#2D231E] bg-[#1A1412] space-y-3 text-xs">
                <p className="text-xs uppercase tracking-widest text-[#A38468] font-medium">
                  Database Configuration
                </p>
                <div className="space-y-1 text-[#8E7158]">
                  <p>
                    <span className="text-[#FAF8F5]">Engine:</span> Google Cloud Firestore (Enterprise)
                  </p>
                  <p>
                    <span className="text-[#FAF8F5]">Database ID:</span> ai-studio-d43a5825-c878-4c9a-8739-2944b8d4813a
                  </p>
                  <p>
                    <span className="text-[#FAF8F5]">Real-time Status:</span> Active & Syncing
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
