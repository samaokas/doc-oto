import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, CreditCard, Car, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  onSignOut: () => void;
}

export default function UserMenu({ onSignOut }: UserMenuProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    onSignOut();
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
      >
        {user.avatar_url ? (
          <img 
            src={user.avatar_url} 
            alt={user.full_name}
            className="w-8 h-8 rounded-full border border-slate-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-400">
              {getInitials(user.full_name)}
            </span>
          </div>
        )}
        <span className="hidden md:block text-sm text-slate-300 font-medium">
          {user.full_name.split(' ')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              {user.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.full_name}
                  className="w-12 h-12 rounded-full border border-slate-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-400">
                    {getInitials(user.full_name)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.full_name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 px-2 py-1 rounded-md bg-blue-600/10 border border-blue-500/20 inline-block">
              <span className="text-xs text-blue-400 font-medium">
                {user.role === 'admin' && 'Administrateur'}
                {user.role === 'particular_owner' && 'Particulier'}
                {user.role === 'company_fleet' && 'Flotte Entreprise'}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-left">
              <Car className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">Mes Véhicules</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-left">
              <Settings className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">Paramètres</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors text-left">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">Abonnement</span>
            </button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-slate-700/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
