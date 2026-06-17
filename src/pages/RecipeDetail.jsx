import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, ShoppingCart, Lightbulb } from 'lucide-react';
import { recipes } from '../data/recipes';
import CategoryBadge from '../components/CategoryBadge';
import { useGrocery } from '../context/GroceryContext';

const gradients = {
  mint:     'from-mint-300 to-mint-100',
  peach:    'from-peach-300 to-peach-100',
  lavender: 'from-lavender-300 to-lavender-100',
  petal:    'from-petal-300 to-petal-100',
};

const difficultyColor = {
  'Fácil':   'text-mint-500 bg-mint-100',
  'Médio':   'text-peach-500 bg-peach-100',
  'Difícil': 'text-petal-500 bg-petal-100',
};

const colorClass = {
  mint:     { c1: 'fill-mint-300', c2: 'fill-mint-400', c3: 'fill-mint-500' },
  peach:    { c1: 'fill-peach-300', c2: 'fill-peach-400', c3: 'fill-peach-500' },
  lavender: { c1: 'fill-lavender-300', c2: 'fill-lavender-400', c3: 'fill-lavender-500' },
  petal:    { c1: 'fill-petal-300', c2: 'fill-petal-400', c3: 'fill-petal-500' },
};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { initList } = useGrocery();

  const recipe = recipes.find(r => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-warm-gray-600">Receita não encontrada.</p>
        <button onClick={() => navigate('/recipes')} className="text-lavender-500 font-semibold">
          Voltar para receitas
        </button>
      </div>
    );
  }

  const gradient = gradients[recipe.color] ?? gradients.mint;
  const cc = colorClass[recipe.color] ?? colorClass.mint;

  const handleGenerateGrocery = () => {
    initList(recipe.id, recipe.ingredients);
    navigate(`/grocery?recipe=${recipe.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 pb-24 md:pb-12">

      {/* Back + Hero */}
      <div className="pt-6 md:pt-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-warm-gray-400 hover:text-warm-gray-700 text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className={`w-full h-48 md:h-56 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center`}>
          <svg viewBox="0 0 120 120" className="w-28 h-28 opacity-80" fill="none">
            <circle cx="60" cy="60" r="45" className={cc.c1} opacity="0.5" />
            <circle cx="44" cy="50" r="14" className={cc.c2} opacity="0.75" />
            <circle cx="72" cy="44" r="10" className={cc.c3} opacity="0.7" />
            <circle cx="64" cy="72" r="16" className={cc.c2} opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-3xl shadow-soft p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={recipe.category} />
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColor[recipe.difficulty] ?? 'text-warm-gray-500 bg-warm-gray-100'}`}>
            {recipe.difficulty}
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-warm-gray-800 leading-snug">{recipe.name}</h1>
        <p className="text-sm text-warm-gray-400 mt-2 leading-relaxed">{recipe.description}</p>

        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-warm-gray-100">
          <div className="flex flex-col items-center gap-0.5">
            <Clock size={16} className="text-lavender-400" />
            <span className="text-xs font-semibold text-warm-gray-800">{recipe.time} min</span>
            <span className="text-[10px] text-warm-gray-400">Tempo</span>
          </div>
          <div className="w-px h-8 bg-warm-gray-100" />
          <div className="flex flex-col items-center gap-0.5">
            <Users size={16} className="text-lavender-400" />
            <span className="text-xs font-semibold text-warm-gray-800">{recipe.servings}</span>
            <span className="text-[10px] text-warm-gray-400">{recipe.servings === 1 ? 'Porção' : 'Porções'}</span>
          </div>
          <div className="w-px h-8 bg-warm-gray-100" />
          <div className="flex flex-col items-center gap-0.5">
            <ChefHat size={16} className="text-lavender-400" />
            <span className="text-xs font-semibold text-warm-gray-800">{recipe.ingredients.length}</span>
            <span className="text-[10px] text-warm-gray-400">Ingredientes</span>
          </div>
        </div>
      </div>

      {/* Dica */}
      {recipe.tips && (
        <div className="bg-peach-50 border border-peach-200 rounded-2xl px-4 py-3 flex items-start gap-3 mb-6">
          <Lightbulb size={16} className="text-peach-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warm-gray-600 leading-relaxed">{recipe.tips}</p>
        </div>
      )}

      {/* Desktop: two-column ingredients + steps */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Ingredientes */}
        <div className="md:w-2/5">
          <h2 className="text-base font-bold text-warm-gray-800 mb-3">Ingredientes</h2>
          <div className="flex flex-col gap-2">
            {recipe.ingredients.map((ing, i) => (
              <div key={ing.id} className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-lavender-100 flex items-center justify-center text-[10px] font-bold text-lavender-600 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-warm-gray-800">{ing.name}</span>
                </div>
                <span className="text-xs font-semibold text-warm-gray-400 text-right ml-2">{ing.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modo de preparo */}
        <div className="flex-1">
          <h2 className="text-base font-bold text-warm-gray-800 mb-3">Modo de preparo</h2>
          <div className="flex flex-col gap-3">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-2xl p-4 shadow-card">
                <div className="w-7 h-7 rounded-xl bg-[#e3cbec] flex items-center justify-center text-lavender-700 text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-warm-gray-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate grocery button */}
      <div className="mt-8">
        <button
          onClick={handleGenerateGrocery}
          className="w-full flex items-center justify-center gap-2 bg-[#e3cbec] hover:bg-lavender-300 text-warm-gray-800 font-semibold text-sm py-4 rounded-2xl shadow-soft transition-all active:scale-95"
        >
          <ShoppingCart size={18} />
          Gerar lista de compras
        </button>
      </div>
    </div>
  );
}
