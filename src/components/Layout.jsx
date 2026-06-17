import { Link, useLocation } from 'react-router-dom';
import { Search, FlaskConical, BookOpen, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';
import footerLogo from '../assets/hero/footer.svg';

const navLinks = [
  { to: '/',        label: 'Home',    icon: Home,         exact: true },
  { to: '/search',  label: 'Search',  icon: Search },
  { to: '/analyze', label: 'Analyze', icon: FlaskConical },
  { to: '/library', label: 'Library', icon: BookOpen },
];

function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="w-full px-4 h-14 flex items-center justify-between">
        {/* Nav links — left aligned */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-xl text-sm font-sans font-semibold transition-all ${
                  active
                    ? 'bg-action-light text-action-text'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-semibold transition-all ${
                    active
                      ? 'bg-action-light text-action-text'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto bg-action-text text-white/70 text-sm overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Three-column row */}
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Col 1: Brand image */}
          <div className="flex-shrink-0 overflow-hidden py-6 flex justify-center md:justify-start">
            <img
              src={footerLogo}
              alt="safe"
              className="block w-auto"
              style={{ height: '220px' }}
            />
          </div>

          {/* Col 2: Tagline */}
          <div className="flex-1 px-6 md:px-10 py-4 md:py-8 flex flex-col justify-center items-center text-center gap-3">
            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              Evidence-based FODMAP information to help you eat confidently without the guesswork.
            </p>
            <div className="text-white/30 text-xs leading-relaxed">
              <p>Made with love by Nathalia Gonçalves</p>
              <p>Inspired by my fiancée, Bárbara, </p>
              <p>and the everyday challenges of Low FODMAP living.</p>
            </div>
          </div>

          {/* Col 3: Nav links */}
          <div className="flex-shrink-0 px-6 md:px-8 py-4 md:py-8 flex flex-col justify-center items-center md:items-start">
            <nav className="flex flex-row md:flex-col gap-5 md:gap-2 text-white/80">
              <Link to="/"        className="hover:text-white transition-colors">Home</Link>
              <Link to="/search"  className="hover:text-white transition-colors">Search</Link>
              <Link to="/analyze" className="hover:text-white transition-colors">Analyze</Link>
              <Link to="/library" className="hover:text-white transition-colors">Library</Link>
            </nav>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-white/50 border-t border-white/10 px-8 py-4 leading-relaxed">
          <strong className="font-semibold text-white/70">Medical disclaimer:</strong> The Low FODMAP diet is a structured elimination protocol with multiple phases and should only be followed under the guidance of a registered dietitian or doctor. The information on  <strong className="font-semibold">safe</strong> is for general reference only and is not a substitute for professional medical advice. Always consult a healthcare provider before making significant dietary changes.
        </p>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
