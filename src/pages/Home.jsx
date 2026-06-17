import { useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingCart, Info, ArrowRight, Clock, Users } from 'lucide-react';
import { recipes, CATEGORIES } from '../data/recipes';
import logo from '../assets/hero/4.png';
import heroPhoto from '../assets/hero/5.png';
import CategoryBadge from '../components/CategoryBadge';

const CATEGORY_COLORS = {
  'Café da manhã': { bg: 'bg-peach-100 hover:bg-peach-200',   icon: 'text-peach-500',    border: 'border-peach-200' },
  'Almoço':        { bg: 'bg-lavender-100 hover:bg-lavender-200', icon: 'text-lavender-500', border: 'border-lavender-200' },
  'Jantar':        { bg: 'bg-mint-100 hover:bg-mint-200',     icon: 'text-mint-600',     border: 'border-mint-200' },
  'Padaria':       { bg: 'bg-petal-100 hover:bg-petal-200',   icon: 'text-petal-500',    border: 'border-petal-200' },
};

const gradients = {
  mint:     'from-mint-200 to-mint-100',
  peach:    'from-peach-200 to-peach-100',
  lavender: 'from-lavender-200 to-lavender-100',
  petal:    'from-petal-200 to-petal-100',
};

const FoodIcon = ({ color }) => {
  const f1 = color === 'mint' ? 'fill-mint-300' : color === 'peach' ? 'fill-peach-300' : color === 'lavender' ? 'fill-lavender-300' : 'fill-petal-300';
  const f2 = color === 'mint' ? 'fill-mint-400' : color === 'peach' ? 'fill-peach-400' : color === 'lavender' ? 'fill-lavender-400' : 'fill-petal-400';
  const f3 = color === 'mint' ? 'fill-mint-500' : color === 'peach' ? 'fill-peach-500' : color === 'lavender' ? 'fill-lavender-500' : 'fill-petal-500';
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full" fill="none">
      <circle cx="30" cy="30" r="20" className={`${f1} opacity-60`} />
      <circle cx="22" cy="25" r="7"  className={`${f2} opacity-80`} />
      <circle cx="36" cy="22" r="5"  className={`${f3} opacity-70`} />
      <circle cx="32" cy="36" r="8"  className={`${f2} opacity-60`} />
    </svg>
  );
};

const featured = recipes.slice(0, 3);
const categories = CATEGORIES.filter(c => c !== 'Todas');

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">

      {/* ── HERO BLOCK ─ white ─────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-8 py-12 md:py-0 md:min-h-[380px]">

          {/* Left: logo + tagline + CTA */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <img
              src={logo}
              alt="safe."
              className="w-56 md:w-64 lg:w-72 h-auto"
            />
            <p className="text-warm-gray-400 text-sm font-medium tracking-[0.18em] uppercase">
              receitas low fodmap
            </p>
            <button
              onClick={() => navigate('/recipes')}
              className="mt-2 inline-flex items-center gap-2 bg-[#e3cbec] text-warm-gray-700 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-lavender-300 transition-colors active:scale-95"
            >
              <BookOpen size={15} />
              Explorar receitas
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right: hero photo */}
          <div className="flex-shrink-0 flex items-end justify-center md:justify-end w-full md:w-auto">
            <img
              src={heroPhoto}
              alt="Comida low FODMAP"
              className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* ── LILAC BLOCK ────────────────────────────────────── */}
      <section className="bg-[#e3cbec]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-warm-gray-800 leading-snug">
                Coma bem,<br className="hidden md:block" /> sinta-se bem.
              </h2>
              <p className="text-sm text-warm-gray-600 mt-2 max-w-sm leading-relaxed">
                Receitas pensadas para quem segue a dieta low FODMAP — sem abrir mão do sabor do dia a dia.
              </p>
            </div>
            <button
              onClick={() => navigate('/guide')}
              className="inline-flex items-center gap-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm text-warm-gray-700 font-semibold text-xs px-4 py-2 rounded-full transition-colors self-start md:self-auto"
            >
              <Info size={13} />
              O que são FODMAPs?
            </button>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map(cat => {
              const c = CATEGORY_COLORS[cat] ?? { bg: 'bg-white hover:bg-warm-gray-100', icon: 'text-warm-gray-500', border: 'border-warm-gray-200' };
              const count = recipes.filter(r => r.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => navigate(`/recipes?cat=${encodeURIComponent(cat)}`)}
                  className={`${c.bg} ${c.border} border rounded-2xl p-4 text-left transition-all active:scale-95 group`}
                >
                  <p className="font-semibold text-warm-gray-800 text-sm">{cat}</p>
                  <p className="text-xs text-warm-gray-500 mt-0.5">
                    {count} {count === 1 ? 'receita' : 'receitas'}
                  </p>
                  <ArrowRight size={14} className={`mt-3 ${c.icon} group-hover:translate-x-1 transition-transform`} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED RECIPES ───────────────────────────────── */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-warm-gray-800">Em destaque</h2>
            <button
              onClick={() => navigate('/recipes')}
              className="text-xs font-semibold text-lavender-500 hover:text-lavender-600 flex items-center gap-1"
            >
              Ver todas <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map(recipe => {
              const gradient = gradients[recipe.color] ?? gradients.mint;
              return (
                <button
                  key={recipe.id}
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  className="group flex flex-col bg-white rounded-3xl shadow-card hover:shadow-soft transition-all active:scale-98 overflow-hidden text-left"
                >
                  <div className={`w-full h-40 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                    <div className="w-20 h-20 opacity-90">
                      <FoodIcon color={recipe.color} />
                    </div>
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={recipe.category} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-warm-gray-800 text-sm leading-snug">{recipe.name}</h3>
                    <p className="text-xs text-warm-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-xs text-warm-gray-400">
                        <Clock size={11} className="text-mint-400" /> {recipe.time} min
                      </span>
                      <span className="flex items-center gap-1 text-xs text-warm-gray-400">
                        <Users size={11} className="text-mint-400" /> {recipe.servings} {recipe.servings === 1 ? 'porção' : 'porções'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ──────────────────────────────────── */}
      <section className="bg-cream border-t border-warm-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button
              onClick={() => navigate('/grocery')}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-soft transition-all active:scale-98 text-left"
            >
              <div className="w-11 h-11 bg-peach-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={20} className="text-peach-500" />
              </div>
              <div>
                <p className="font-semibold text-warm-gray-800 text-sm">Lista de compras</p>
                <p className="text-xs text-warm-gray-400 mt-0.5">Gere uma lista a partir de qualquer receita</p>
              </div>
              <ArrowRight size={16} className="text-warm-gray-300 ml-auto flex-shrink-0" />
            </button>

            <button
              onClick={() => navigate('/guide')}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-soft transition-all active:scale-98 text-left"
            >
              <div className="w-11 h-11 bg-lavender-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info size={20} className="text-lavender-500" />
              </div>
              <div>
                <p className="font-semibold text-warm-gray-800 text-sm">Guia FODMAP</p>
                <p className="text-xs text-warm-gray-400 mt-0.5">Alimentos, sintomas e aviso médico</p>
              </div>
              <ArrowRight size={16} className="text-warm-gray-300 ml-auto flex-shrink-0" />
            </button>

          </div>
        </div>
      </section>

    </div>
  );
}
