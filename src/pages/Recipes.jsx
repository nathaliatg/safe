import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { recipes, CATEGORIES } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

const filterActiveColors = {
  'Todas':         'bg-warm-gray-800 text-white',
  'Café da manhã': 'bg-peach-400 text-white',
  'Almoço':        'bg-lavender-400 text-white',
  'Jantar':        'bg-mint-400 text-white',
  'Padaria':       'bg-petal-400 text-white',
};

const filterInactiveColors = {
  'Todas':         'bg-warm-gray-100 text-warm-gray-600',
  'Café da manhã': 'bg-peach-100 text-peach-500',
  'Almoço':        'bg-lavender-100 text-lavender-500',
  'Jantar':        'bg-mint-100 text-mint-600',
  'Padaria':       'bg-petal-100 text-petal-500',
};

export default function Recipes() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') ?? 'Todas';

  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(initialCat) ? initialCat : 'Todas'
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = recipes.filter(r => {
    const matchCat = activeCategory === 'Todas' || r.category === activeCategory;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col gap-6 py-8">
      {/* Header */}
      <div className="pt-6 md:pt-2">
        <h1 className="text-2xl md:text-3xl font-bold text-warm-gray-800">Receitas</h1>
        <p className="text-sm text-warm-gray-400 mt-1">Tudo low FODMAP, sem complicação.</p>
      </div>

      {/* Busca + filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray-400" />
          <input
            type="text"
            placeholder="Buscar receitas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl pl-9 pr-9 py-3 text-sm text-warm-gray-800 placeholder-warm-gray-400 shadow-card outline-none focus:ring-2 focus:ring-lavender-300 transition"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600">
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {CATEGORIES.map(cat => {
            const isActive = cat === activeCategory;
            const colors = isActive ? filterActiveColors[cat] : filterInactiveColors[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${colors}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contagem */}
      <p className="text-xs text-warm-gray-400 -mt-2">
        {filtered.length} {filtered.length === 1 ? 'receita' : 'receitas'}
        {activeCategory !== 'Todas' ? ` em ${activeCategory}` : ''}
        {search ? ` para "${search}"` : ''}
      </p>

      {/* Grade */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <div className="w-16 h-16 bg-warm-gray-100 rounded-2xl flex items-center justify-center">
            <Search size={24} className="text-warm-gray-400" />
          </div>
          <p className="text-warm-gray-600 font-medium text-sm">Nenhuma receita encontrada</p>
          <p className="text-warm-gray-400 text-xs">Tente ajustar a busca ou o filtro</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
