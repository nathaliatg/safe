import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChevronRight } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

const gradients = {
  mint:     'from-mint-200 to-mint-100',
  peach:    'from-peach-200 to-peach-100',
  lavender: 'from-lavender-200 to-lavender-100',
  petal:    'from-petal-200 to-petal-100',
};

const FoodIcon = ({ color }) => {
  const fill1 = color === 'mint' ? 'fill-mint-300' : color === 'peach' ? 'fill-peach-300' : color === 'lavender' ? 'fill-lavender-300' : 'fill-petal-300';
  const fill2 = color === 'mint' ? 'fill-mint-400' : color === 'peach' ? 'fill-peach-400' : color === 'lavender' ? 'fill-lavender-400' : 'fill-petal-400';
  const fill3 = color === 'mint' ? 'fill-mint-500' : color === 'peach' ? 'fill-peach-500' : color === 'lavender' ? 'fill-lavender-500' : 'fill-petal-500';
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
      <circle cx="40" cy="40" r="28" className={`${fill1} opacity-60`} />
      <circle cx="30" cy="34" r="8"  className={`${fill2} opacity-80`} />
      <circle cx="48" cy="30" r="6"  className={`${fill3} opacity-70`} />
      <circle cx="42" cy="48" r="10" className={`${fill2} opacity-60`} />
    </svg>
  );
};

export default function RecipeCard({ recipe, compact = false }) {
  const navigate = useNavigate();
  const gradient = gradients[recipe.color] ?? gradients.mint;

  if (compact) {
    return (
      <button
        onClick={() => navigate(`/recipes/${recipe.id}`)}
        className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 shadow-card hover:shadow-soft transition-all active:scale-98 text-left"
      >
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0 flex items-center justify-center overflow-hidden`}>
          <div className="w-10 h-10"><FoodIcon color={recipe.color} /></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-warm-gray-800 text-sm truncate">{recipe.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <CategoryBadge category={recipe.category} />
            <span className="text-xs text-warm-gray-400 flex items-center gap-0.5">
              <Clock size={11} /> {recipe.time} min
            </span>
          </div>
        </div>
        <ChevronRight size={16} className="text-warm-gray-400 flex-shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="w-full flex flex-col bg-white rounded-3xl shadow-card hover:shadow-soft transition-all active:scale-98 overflow-hidden text-left"
    >
      <div className={`w-full h-36 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
        <div className="w-24 h-24 opacity-90">
          <FoodIcon color={recipe.color} />
        </div>
        <div className="absolute top-3 left-3">
          <CategoryBadge category={recipe.category} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-warm-gray-800 text-sm leading-snug">{recipe.name}</h3>
        <p className="text-xs text-warm-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="flex items-center gap-1 text-xs text-warm-gray-400">
            <Clock size={12} className="text-mint-400" /> {recipe.time} min
          </span>
          <span className="flex items-center gap-1 text-xs text-warm-gray-400">
            <Users size={12} className="text-mint-400" /> {recipe.servings} {recipe.servings === 1 ? 'porção' : 'porções'}
          </span>
        </div>
      </div>
    </button>
  );
}
