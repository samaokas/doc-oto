import { useState } from 'react';
import { X, Github, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleGitHubLogin = () => {
    setLoading(true);
    setError('');
    
    // In production, this would redirect to GitHub OAuth
    // For demo, we simulate the flow
    setTimeout(() => {
      // Replace with your actual GitHub OAuth URL:
      // window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=user:email`;
      
      setSuccess('GitHub OAuth configured! Replace the demo URL with your real Client ID.');
      setLoading(false);
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setSuccess(mode === 'signin' ? 'Signed in successfully!' : 'Account created! Check your email.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://image.qwenlm.ai/generated-images/5dd18a8a-5139-4320-b175-d560d9ddd7d0/_result.png" 
              alt="Doc-OTO" 
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-white">
                {mode === 'signin' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-sm text-slate-400">
                {mode === 'signin' 
                  ? 'Sign in to access your dashboard' 
                  : 'Get started with Doc-OTO'}
              </p>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-400">{success}</span>
            </div>
          )}

          {/* GitHub Login Button */}
          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-white font-medium transition-all disabled:opacity-50"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700/50" />
            <span className="text-xs text-slate-500 uppercase">or</span>
            <div className="flex-1 h-px bg-slate-700/50" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-800/30 border-t border-slate-700/50">
          <p className="text-center text-sm text-slate-400">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess(''); }}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
