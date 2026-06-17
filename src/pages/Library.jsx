import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { foods, CATEGORIES } from '../lib/search';
import StatusCard from '../components/StatusCard';

const STATUS_CONFIG = {
  safe:     { icon: CheckCircle2, iconColor: 'text-safe-border',     bg: 'bg-safe-bg',     border: 'border-safe-border',     text: 'text-safe-text',     badgeBg: 'bg-safe-border',     label: 'Safe' },
  moderate: { icon: AlertCircle,  iconColor: 'text-moderate-border', bg: 'bg-moderate-bg', border: 'border-moderate-border', text: 'text-moderate-text', badgeBg: 'bg-moderate-border', label: 'Moderate' },
  high:     { icon: XCircle,      iconColor: 'text-high-border',     bg: 'bg-high-bg',     border: 'border-high-border',     text: 'text-high-text',     badgeBg: 'bg-high-border',     label: 'High FODMAP' },
};

export default function Library() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  const filtered = useMemo(() => {
    return foods.filter(food => {
      const matchCat    = activeCategory === 'all' || food.category === activeCategory;
      const matchStatus = activeStatus === 'all'   || food.status === activeStatus;
      const matchQuery  = !query.trim() || food.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchStatus && matchQuery;
    });
  }, [activeCategory, activeStatus, query]);

  if (selectedFood) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <button
          onClick={() => setSelectedFood(null)}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors"
        >
          ← Back to library
        </button>
        <StatusCard food={selectedFood} expanded />
        {selectedFood.alternative_names?.length === 0 && (
          <p className="mt-4 text-sm text-neutral-400 text-center">No alternatives listed for this food.</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-neutral-900 mb-2">Food Library</h1>
        <p className="text-neutral-500">Browse {foods.length}+ foods and their FODMAP status.</p>
      </div>

      {/* Search within library */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter by name..."
          className="w-full max-w-sm pl-10 pr-4 py-2.5 rounded-2xl border-2 border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-400 transition-all text-sm"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Row 1: All Foods */}
        <div>
          {CATEGORIES.slice(0, 1).map(({ id, label, emoji }) => (
            <button
              key={id}
              onClick={() => { setActiveCategory(id); navigate('/library', { replace: true }); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === id
                  ? 'bg-brand-200 text-brand-600'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
        {/* Row 2: Food categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.slice(1).map(({ id, label, emoji }) => (
            <button
              key={id}
              onClick={() => { setActiveCategory(id); navigate(`/library/${id}`, { replace: true }); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === id
                  ? 'bg-brand-200 text-brand-600'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-8">
        {[
          { id: 'all',      label: 'All statuses' },
          { id: 'safe',     label: '🟢 Safe' },
          { id: 'moderate', label: '🟡 Moderate' },
          { id: 'high',     label: '🔴 High FODMAP' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveStatus(id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeStatus === id
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-400 mb-4">
        {filtered.length} food{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
      </p>

      {/* Food grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map(food => (
            <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🌿</div>
          <p className="font-display font-bold text-neutral-800 mb-1">No foods found</p>
          <p className="text-sm text-neutral-400">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}

function FoodCard({ food, onClick }) {
  const cfg = STATUS_CONFIG[food.status];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <button
      onClick={onClick}
      className="bg-white border border-neutral-200 hover:border-brand-300 hover:shadow-md rounded-2xl p-4 text-left flex flex-col gap-3 transition-all group active:scale-98"
    >
      <span className="text-3xl">{food.emoji}</span>
      <div className="flex-1">
        <p className="font-semibold text-neutral-900 text-sm leading-tight mb-1.5 group-hover:text-brand-600 transition-colors">
          {food.name}
        </p>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold text-white ${cfg.badgeBg} px-2 py-0.5 rounded-full`}>
          <Icon className="w-3 h-3" />
          {cfg.label}
        </span>
      </div>
      {food.serving_note && food.status !== 'high' && (
        <p className="text-xs text-neutral-400 leading-tight line-clamp-2">{food.serving_note}</p>
      )}
    </button>
  );
}
