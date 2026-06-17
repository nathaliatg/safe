import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Info } from 'lucide-react';

const links = [
  { to: '/',        label: 'Início',   icon: Home },
  { to: '/recipes', label: 'Receitas', icon: BookOpen },
  { to: '/grocery', label: 'Compras',  icon: ShoppingCart },
  { to: '/guide',   label: 'Guia',     icon: Info },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-warm-gray-200 safe-bottom">
      <div className="flex">
        {links.map(({ to, label, icon: Icon }) => {
          const active = to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? 'text-lavender-500' : 'text-warm-gray-400'}
              />
              <span className={`text-[10px] font-medium ${active ? 'text-lavender-500' : 'text-warm-gray-400'}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
