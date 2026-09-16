import { Menu, X } from 'lucide-react';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onSignInClick: () => void;
}

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen, onSignInClick }: NavbarProps) {
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Roles', href: '#roles' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Specs', href: '#specs' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="https://image.qwenlm.ai/generated-images/5dd18a8a-5139-4320-b175-d560d9ddd7d0/_result.png" 
              alt="Doc-OTO Logo" 
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold text-white">
              Doc-OTO
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={onSignInClick}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onSignInClick}
              className="px-4 py-2 text-sm bg-blue-600 rounded-lg font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 text-white"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-slate-400 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex gap-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); onSignInClick(); }}
                className="flex-1 px-4 py-2 text-sm text-slate-400 border border-slate-700 rounded-lg hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onSignInClick(); }}
                className="flex-1 px-4 py-2 text-sm bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
