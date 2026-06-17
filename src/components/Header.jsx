import { NavLink } from 'react-router-dom';
import logo from '../assets/hero/4.png';

const links = [
  { to: '/',        label: 'Início' },
  { to: '/recipes', label: 'Receitas' },
  { to: '/grocery', label: 'Lista de compras' },
  { to: '/guide',   label: 'Guia FODMAP' },
];

export default function Header() {
  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-gray-200 h-16 items-center px-8">
      <NavLink to="/" className="flex-shrink-0 mr-12">
        <img src={logo} alt="safe." className="h-7 w-auto" />
      </NavLink>
      <nav className="flex items-center gap-8 flex-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors pb-0.5 border-b-2 ${
                isActive
                  ? 'text-warm-gray-800 border-lavender-400'
                  : 'text-warm-gray-400 border-transparent hover:text-warm-gray-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
