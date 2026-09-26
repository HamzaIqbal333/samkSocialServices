/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Philosophy } from './components/Philosophy';
import { Diagnostic } from './components/Diagnostic';
import { Gallery } from './components/Gallery';
import { ClientMarquee } from './components/ClientMarquee';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanelPage } from './components/AdminPanelPage';
import { testConnection } from './firebase/testConnection';
import { Shield, ArrowUpRight } from 'lucide-react';

function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();

  // Check if current URL matches /admin, #admin, or ?admin=true
  const checkAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    return (
      path.includes('/admin') ||
      hash.includes('admin') ||
      params.get('admin') === 'true' ||
      params.get('page') === 'admin'
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkAdminRoute);

  useEffect(() => {
    testConnection();

    const handleLocationChange = () => {
      setIsAdminRoute(checkAdminRoute());
    };

    // Secret shortcut for Admin: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        navigateToAdmin();
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateToAdmin = () => {
    try {
      window.history.pushState({}, '', '/admin');
    } catch {
      window.location.hash = '#admin';
    }
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const exitAdmin = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('admin');
      url.searchParams.delete('page');
      if (url.pathname.includes('/admin')) {
        url.pathname = url.pathname.replace(/\/admin\/?$/, '/') || '/';
      }
      if (url.hash.toLowerCase().includes('admin')) {
        url.hash = '';
      }
      window.history.pushState({}, '', url.pathname + url.search + url.hash);
    } catch {
      window.history.pushState({}, '', '/');
    }
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLoginSuccess = () => {
    setIsAdminRoute(true);
  };

  // Case 1: Route is /admin and admin is NOT logged in -> Dedicated Firebase Login Screen
  if (isAdminRoute && !isAuthenticated) {
    return (
      <AdminLogin
        onNavigateToSite={exitAdmin}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Case 2: Route is /admin and admin IS logged in -> Full Dedicated Admin Panel Dashboard with Inquiries
  if (isAdminRoute && isAuthenticated) {
    return <AdminPanelPage onNavigateToSite={exitAdmin} />;
  }

  // Case 3: Public Website View
  return (
    <div className="min-h-screen bg-[#130E0C] text-[#FAF8F5] selection:bg-[#A38468] selection:text-white flex flex-col font-sans">
      {/* Top Banner if Admin is logged in */}
      {isAuthenticated && (
        <div className="bg-[#1A1412] border-b border-[#2D231E] py-2 px-5 text-xs flex items-center justify-between z-50 sticky top-0 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#C4B29E]">
              Signed in as Studio Admin: <strong className="text-[#FAF8F5]">{user?.email}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={navigateToAdmin}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#130E0C] text-[11px] font-semibold hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all cursor-pointer"
            >
              <Shield className="w-3 h-3" />
              <span>Open Inquiries Dashboard (/admin)</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <button
              onClick={logout}
              className="text-[#8E7158] hover:text-red-400 text-[11px] transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Mission />
        <Philosophy />
        <Diagnostic />
        <Gallery />
        <ClientMarquee />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <MainLayout />
      </ContentProvider>
    </AuthProvider>
  );
}
