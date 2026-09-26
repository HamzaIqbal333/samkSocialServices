import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { SiteContent, ServiceItem } from '../types';
import { defaultContent } from '../data/defaultContent';
import { useAuth } from './AuthContext';

interface ContentContextType {
  content: SiteContent;
  isCustomized: boolean;
  hasFirestoreDoc: boolean | null;
  selectedService: string;
  setSelectedService: (serviceName: string) => void;
  updateSection: (sectionKey: keyof SiteContent, data: any) => Promise<void>;
  updateField: (path: string, value: any) => Promise<void>;
  resetToDefault: () => Promise<void>;
  syncAllToFirestore: () => Promise<boolean>;
  isSaving: boolean;
  saveMessage: string | null;
  saveError: string | null;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isCustomized, setIsCustomized] = useState(false);
  const [hasFirestoreDoc, setHasFirestoreDoc] = useState<boolean | null>(null);
  const [selectedService, setSelectedService] = useState<string>('Social Media Management');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'content', 'main'),
      (snapshot) => {
        if (snapshot.exists()) {
          setHasFirestoreDoc(true);
          const remoteData = snapshot.data();
          setContent({
            ...defaultContent,
            ...remoteData,
            nav: { ...defaultContent.nav, ...(remoteData.nav || {}) },
            hero: { ...defaultContent.hero, ...(remoteData.hero || {}) },
            mission: { ...defaultContent.mission, ...(remoteData.mission || {}) },
            philosophy: { ...defaultContent.philosophy, ...(remoteData.philosophy || {}) },
            checklist: { ...defaultContent.checklist, ...(remoteData.checklist || {}) },
            gallery: { ...defaultContent.gallery, ...(remoteData.gallery || {}) },
            servicesHeader: { ...defaultContent.servicesHeader, ...(remoteData.servicesHeader || {}) },
            services: remoteData.services || defaultContent.services,
            testimonials: remoteData.testimonials || defaultContent.testimonials,
            contact: {
              ...defaultContent.contact,
              ...(remoteData.contact || {}),
              formLabels: {
                ...defaultContent.contact.formLabels,
                ...(remoteData.contact?.formLabels || {})
              }
            },
            footer: {
              ...defaultContent.footer,
              ...(remoteData.footer || {}),
              links: remoteData.footer?.links || defaultContent.footer.links
            }
          });
          setIsCustomized(true);
        } else {
          setHasFirestoreDoc(false);
          setIsCustomized(false);
        }
      },
      (error) => {
        console.warn('Real-time content listener fallback to default:', error.message);
        setHasFirestoreDoc(false);
      }
    );

    return () => unsub();
  }, []);

  const updateSection = async (sectionKey: keyof SiteContent, data: any) => {
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      const updated = {
        ...content,
        [sectionKey]: {
          ...(typeof content[sectionKey] === 'object' && !Array.isArray(content[sectionKey]) ? (content[sectionKey] as any) : {}),
          ...data
        },
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || user?.email || 'admin'
      };

      await setDoc(doc(db, 'content', 'main'), updated, { merge: true });
      setContent((prev) => ({
        ...prev,
        [sectionKey]: Array.isArray(data) ? data : { ...(prev[sectionKey] as any), ...data }
      }));
      setHasFirestoreDoc(true);
      setSaveMessage('Changes published live to Firestore!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.error('Error in updateSection:', err);
      setSaveError(err?.message || 'Failed to update section. Please check permissions.');
      try {
        handleFirestoreError(err, OperationType.WRITE, 'content/main');
      } catch {
        // Logged
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = async (path: string, value: any) => {
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      const parts = path.split('.');
      const clone = JSON.parse(JSON.stringify(content));
      let current = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;

      await setDoc(doc(db, 'content', 'main'), {
        ...clone,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || user?.email || 'admin'
      });
      setContent(clone);
      setHasFirestoreDoc(true);
      setSaveMessage('Field updated successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.error('Error in updateField:', err);
      setSaveError(err?.message || 'Failed to update field. Please check permissions.');
      try {
        handleFirestoreError(err, OperationType.WRITE, 'content/main');
      } catch {
        // Logged
      }
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefault = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      await setDoc(doc(db, 'content', 'main'), {
        ...defaultContent,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || user?.email || 'admin'
      });
      setContent(defaultContent);
      setHasFirestoreDoc(true);
      setIsCustomized(false);
      setSaveMessage('Reset to studio editorial defaults!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.error('Error in resetToDefault:', err);
      setSaveError(err?.message || 'Failed to reset. Please check permissions.');
      try {
        handleFirestoreError(err, OperationType.WRITE, 'content/main');
      } catch {
        // Logged
      }
    } finally {
      setIsSaving(false);
    }
  };

  const syncAllToFirestore = async (): Promise<boolean> => {
    setIsSaving(true);
    setSaveMessage(null);
    setSaveError(null);
    try {
      await setDoc(doc(db, 'content', 'main'), {
        ...content,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || user?.email || 'admin'
      });
      setHasFirestoreDoc(true);
      setSaveMessage('All content successfully synchronized to Firestore (default) database /content/main!');
      setTimeout(() => setSaveMessage(null), 5000);
      return true;
    } catch (err: any) {
      console.error('Failed to sync to Firestore:', err);
      setSaveError(err?.message || 'Failed to push to Firestore. Please check Firebase rules.');
      try {
        handleFirestoreError(err, OperationType.WRITE, 'content/main');
      } catch {
        // Logged
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isCustomized,
        hasFirestoreDoc,
        selectedService,
        setSelectedService,
        updateSection,
        updateField,
        resetToDefault,
        syncAllToFirestore,
        isSaving,
        saveMessage,
        saveError
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
