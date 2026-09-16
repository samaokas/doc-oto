import { useState } from 'react';
import { X, Github, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

type AuthMode = 'signin' | 'signup';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleGitHubLogin = () => {
    setGithubLoading(true);
    setError('');
    
    // Configuration GitHub OAuth
    // En production, remplacez par votre vrai Client ID
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'YOUR_GITHUB_CLIENT_ID';
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const scope = 'user:email';
    
    // Pour la démo, simuler le flux OAuth
    setTimeout(() => {
      // Simuler une connexion GitHub réussie
      const mockGithubUser = {
        id: 'github_' + Date.now(),
        email: 'user@github.com',
        full_name: 'GitHub User',
        avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        role: 'particular_owner' as const,
        github_id: 'github_user_123',
      };
      
      login(mockGithubUser);
      setSuccess('Connexion réussie avec GitHub!');
      setGithubLoading(false);
      
      // Fermer le modal après 1 seconde
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    }, 1500);
    
    /*
    // En production, utilisez ce code pour rediriger vers GitHub:
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
    */
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validation basique
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }
    
    if (mode === 'signup' && !fullName) {
      setError('Veuillez entrer votre nom complet');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }
    
    // Simuler une requête API
    setTimeout(() => {
      // En production, appelez votre API d'authentification ici
      // Exemple avec Supabase:
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      const mockUser = {
        id: 'user_' + Date.now(),
        email: email,
        full_name: mode === 'signup' ? fullName : email.split('@')[0],
        role: 'particular_owner' as const,
      };
      
      login(mockUser);
      setSuccess(mode === 'signin' ? 'Connexion réussie!' : 'Compte créé avec succès!');
      setLoading(false);
      
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    }, 1000);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Fermer"
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
                {mode === 'signin' ? 'Bon retour!' : 'Créer un compte'}
              </h2>
              <p className="text-sm text-slate-400">
                {mode === 'signin' 
                  ? 'Connectez-vous à votre tableau de bord' 
                  : 'Commencez avec Doc-OTO'}
              </p>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2 animate-in slide-in-from-top-2 duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-2 animate-in slide-in-from-top-2 duration-200">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-400">{success}</span>
            </div>
          )}

          {/* GitHub Login Button */}
          <button
            onClick={handleGitHubLogin}
            disabled={githubLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {githubLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <Github className="w-5 h-5" />
                <span>Continuer avec GitHub</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700/50" />
            <span className="text-xs text-slate-500 uppercase">ou</span>
            <div className="flex-1 h-px bg-slate-700/50" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="block text-sm text-slate-400 mb-1.5">Nom complet</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Mohamed Benali"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Mot de passe oublié?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || githubLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <span>{mode === 'signin' ? 'Se connecter' : 'Créer un compte'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-800/30 border-t border-slate-700/50">
          <p className="text-center text-sm text-slate-400">
            {mode === 'signin' ? "Vous n'avez pas de compte? " : 'Vous avez déjà un compte? '}
            <button
              onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {mode === 'signin' ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
