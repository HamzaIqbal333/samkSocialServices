import { useState } from 'react';
import { ArrowLeft, ArrowRight, Shield, ShieldCheck, AlertCircle, KeyRound, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onNavigateToSite: () => void;
  onLoginSuccess: () => void;
}

export function AdminLogin({ onNavigateToSite, onLoginSuccess }: AdminLoginProps) {
  const { loginWithFirebaseEmail, registerWithFirebaseEmail, signInWithGoogle, authError } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('admin@samksocials.com');
  const [password, setPassword] = useState('admin123456');
  const [localError, setLocalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      if (isRegisterMode) {
        const res = await registerWithFirebaseEmail(email, password);
        if (res.success) {
          onLoginSuccess();
        } else {
          setLocalError(res.error || 'Failed to create account.');
        }
      } else {
        const res = await loginWithFirebaseEmail(email, password);
        if (res.success) {
          onLoginSuccess();
        } else {
          // If login fails because user doesn't exist yet in the brand new Firebase project, hint to register
          setLocalError(res.error || 'Authentication failed.');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    setSubmitting(true);
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        onLoginSuccess();
      } else {
        setLocalError(res.error || 'Google sign in failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const displayedError = localError || authError;

  return (
    <div className="min-h-screen bg-[#140F0D] text-[#FAF8F5] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A38468]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between relative z-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToSite();
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-[#A38468]/50 flex items-center justify-center bg-[#1F1714] text-[#FAF8F5] text-xs font-serif italic group-hover:border-[#A38468] transition-colors">
            SK
          </div>
          <div>
            <span className="font-heading text-sm uppercase tracking-widest text-[#FAF8F5]">
              Sam K. Socials
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-[#A38468] ml-2">
              Studio Admin
            </span>
          </div>
        </a>

        <button
          onClick={onNavigateToSite}
          className="inline-flex items-center gap-2 text-xs font-heading tracking-widest uppercase text-[#C4B29E] hover:text-[#FFFFFF] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Website</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10 py-8">
        <div className="bg-[#1A1412] border border-[#2D231E] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-left space-y-2 border-b border-[#251D18] pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#A38468]/40 bg-[#1E1714] text-[10px] tracking-widest uppercase text-[#C4B29E]">
              <Shield className="w-3 h-3 text-[#A38468]" />
              <span>Firebase Auth • samksocials-d6da5</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl text-[#FAF8F5] font-normal leading-tight pt-1">
              Studio <span className="font-serif italic text-[#C4B29E]">Admin Panel</span>
            </h1>

            <p className="text-xs text-[#8E7158] font-light leading-relaxed">
              {isRegisterMode
                ? 'Create a new admin account to manage client inquiries and site content.'
                : 'Sign in with your email and password to access the inquiries dashboard.'}
            </p>
          </div>

          {displayedError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-950/40 border border-red-900/60 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-snug">{displayedError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-heading tracking-widest uppercase font-medium text-[#A38468]">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@samksocials.com"
                className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] placeholder-[#5A463B] focus:outline-none focus:border-[#A38468] transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-heading tracking-widest uppercase font-medium text-[#A38468]">
                Password (min. 6 characters)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#2D231E] bg-[#120D0B] text-sm text-[#FAF8F5] placeholder-[#5A463B] focus:outline-none focus:border-[#A38468] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FAF8F5] text-[#130E0C] text-xs font-heading font-medium tracking-wider uppercase hover:bg-[#A38468] hover:text-[#FAF8F5] transition-all transform active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg shadow-black/40"
              >
                {submitting ? (
                  <span>Authenticating with Firebase...</span>
                ) : isRegisterMode ? (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Admin Account</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={submitting}
                className="w-full py-3 px-6 rounded-full border border-[#3A2E28] bg-[#140F0D] text-xs font-heading tracking-wider uppercase text-[#C4B29E] hover:text-[#FAF8F5] hover:border-[#A38468] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 text-[#A38468]" />
                <span>Sign In with Google</span>
              </button>
            </div>
          </form>

          {/* Toggle between Login and Register Mode */}
          <div className="pt-3 border-t border-[#251D18] flex items-center justify-between text-xs text-[#8E7158]">
            <span>
              {isRegisterMode ? 'Already have an admin account?' : 'First time setting up admin?'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setLocalError(null);
              }}
                className="text-[#A38468] hover:text-[#FAF8F5] underline underline-offset-4 cursor-pointer font-medium"
            >
              {isRegisterMode ? 'Sign In instead' : 'Create Admin Account'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-5xl mx-auto text-center relative z-10 text-[10px] uppercase tracking-widest text-[#8E7158]">
        <p>© {new Date().getFullYear()} Sam K. Socials • Firebase Backend Connected</p>
      </div>
    </div>
  );
}
