import { useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown, BookOpen, Check, Package, RotateCcw, ArrowLeft, Leaf } from 'lucide-react';
import { recipes, AISLE_ORDER } from '../data/recipes';
import { useGrocery } from '../context/GroceryContext';

const aisleIcons = {
  'Hortifruti':        Leaf,
  'Proteínas':         Package,
  'Laticínios & Ovos': Package,
  'Grãos & Farinhas':  Package,
  'Óleos & Molhos':    Package,
  'Ervas & Temperos':  Leaf,
  'Outros':            Package,
};

const aisleColors = {
  'Hortifruti':        { bg: 'bg-mint-100',      icon: 'text-mint-500',      badge: 'bg-mint-200 text-mint-700' },
  'Proteínas':         { bg: 'bg-peach-100',     icon: 'text-peach-500',     badge: 'bg-peach-200 text-peach-700' },
  'Laticínios & Ovos': { bg: 'bg-lavender-100',  icon: 'text-lavender-500',  badge: 'bg-lavender-200 text-lavender-700' },
  'Grãos & Farinhas':  { bg: 'bg-petal-100',     icon: 'text-petal-500',     badge: 'bg-petal-200 text-petal-700' },
  'Óleos & Molhos':    { bg: 'bg-peach-100',     icon: 'text-peach-500',     badge: 'bg-peach-200 text-peach-700' },
  'Ervas & Temperos':  { bg: 'bg-mint-100',      icon: 'text-mint-500',      badge: 'bg-mint-200 text-mint-700' },
  'Outros':            { bg: 'bg-warm-gray-100', icon: 'text-warm-gray-400', badge: 'bg-warm-gray-200 text-warm-gray-600' },
};

export default function GroceryList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { lists, initList, toggleChecked, toggleHaveIt, resetList } = useGrocery();

  const recipeId = Number(searchParams.get('recipe'));
  const recipe = recipes.find(r => r.id === recipeId);

  useEffect(() => {
    if (recipe) initList(recipe.id, recipe.ingredients);
  }, [recipe, initList]);

  const list = recipe ? lists[recipe.id] : null;

  const grouped = useMemo(() => {
    if (!list) return {};
    const groups = {};
    Object.values(list).forEach(item => {
      if (!groups[item.aisle]) groups[item.aisle] = [];
      groups[item.aisle].push(item);
    });
    return groups;
  }, [list]);

  const sortedAisles = AISLE_ORDER.filter(a => grouped[a]);

  const totals = useMemo(() => {
    if (!list) return { total: 0, haveIt: 0, done: 0 };
    const items = Object.values(list);
    return {
      total: items.length,
      haveIt: items.filter(i => i.haveIt).length,
      done: items.filter(i => i.checked && !i.haveIt).length,
    };
  }, [list]);

  const needToBuy = totals.total - totals.haveIt;
  const progress = needToBuy === 0 ? 100 : Math.round((totals.done / needToBuy) * 100);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-8">
        <div className="pt-4 md:pt-0 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-warm-gray-800">Lista de Compras</h1>
          <p className="text-sm text-warm-gray-400 mt-1">Escolha uma receita para gerar a lista.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recipes.map(r => (
            <button
              key={r.id}
              onClick={() => { initList(r.id, r.ingredients); navigate(`/grocery?recipe=${r.id}`); }}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card hover:shadow-soft transition-all text-left active:scale-98"
            >
              <div className="w-10 h-10 bg-lavender-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-lavender-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-warm-gray-800 truncate">{r.name}</p>
                <p className="text-xs text-warm-gray-400 mt-0.5">{r.ingredients.length} ingredientes</p>
              </div>
              <ChevronDown size={16} className="text-warm-gray-400 -rotate-90 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8">

      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          className="flex items-center gap-2 text-warm-gray-400 hover:text-warm-gray-700 text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar para a receita
        </button>

        <div className="bg-[#e3cbec] rounded-3xl px-6 py-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-warm-gray-800 leading-snug">{recipe.name}</h1>
              <p className="text-xs text-warm-gray-600 mt-0.5">
                {needToBuy} {needToBuy === 1 ? 'item' : 'itens'} para comprar
                {totals.haveIt > 0 ? ` · ${totals.haveIt} já tenho` : ''}
              </p>
            </div>
            <button
              onClick={() => resetList(recipe.id)}
              className="w-8 h-8 bg-white/40 rounded-xl flex items-center justify-center hover:bg-white/60 transition-colors"
              title="Reiniciar lista"
            >
              <RotateCcw size={15} className="text-warm-gray-700" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-warm-gray-600">{totals.done} de {needToBuy} pegos</span>
            <span className="text-warm-gray-700 font-semibold text-xs">{progress}%</span>
          </div>
          <div className="h-2 bg-white/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-5 text-xs text-warm-gray-400 mb-5">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md border-2 border-lavender-400 bg-lavender-100 flex items-center justify-center">
            <Check size={9} className="text-lavender-500" />
          </div>
          <span>Peguei no mercado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-[#e3cbec] flex items-center justify-center">
            <Package size={9} className="text-lavender-500" />
          </div>
          <span>Já tenho em casa</span>
        </div>
      </div>

      {/* Grouped items */}
      <div className="flex flex-col gap-5">
        {sortedAisles.map(aisle => {
          const items = grouped[aisle];
          const AisleIcon = aisleIcons[aisle] ?? Package;
          const colors = aisleColors[aisle] ?? aisleColors['Outros'];
          const aisleChecked = items.filter(i => i.checked || i.haveIt).length;

          return (
            <div key={aisle}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <AisleIcon size={13} className={colors.icon} />
                </div>
                <span className="text-xs font-bold text-warm-gray-600 uppercase tracking-wide">{aisle}</span>
                <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
                  {aisleChecked}/{items.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {items.map(item => {
                  const isDone = item.checked || item.haveIt;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-card transition-all ${isDone ? 'opacity-60' : ''}`}
                    >
                      <button
                        onClick={() => !item.haveIt && toggleChecked(recipe.id, item.id)}
                        disabled={item.haveIt}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          item.checked && !item.haveIt
                            ? 'bg-lavender-400 border-lavender-400'
                            : item.haveIt
                            ? 'bg-warm-gray-100 border-warm-gray-200'
                            : 'border-warm-gray-300 hover:border-lavender-400'
                        }`}
                      >
                        {(item.checked || item.haveIt) && (
                          <Check size={12} className={item.haveIt ? 'text-warm-gray-400' : 'text-white'} />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-tight ${isDone ? 'line-through text-warm-gray-400' : 'text-warm-gray-800'}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-warm-gray-400 mt-0.5">{item.amount}</p>
                      </div>

                      <button
                        onClick={() => toggleHaveIt(recipe.id, item.id)}
                        className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all flex-shrink-0 ${
                          item.haveIt
                            ? 'bg-[#e3cbec] text-lavender-700'
                            : 'bg-warm-gray-100 text-warm-gray-400 hover:bg-[#e3cbec] hover:text-lavender-600'
                        }`}
                      >
                        <Package size={10} />
                        {item.haveIt ? 'Tenho' : 'Tenho?'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {progress === 100 && needToBuy > 0 && (
        <div className="mt-5 bg-lavender-100 border border-lavender-300 rounded-2xl px-4 py-3 flex items-center gap-3">
          <ShoppingCart size={18} className="text-lavender-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-lavender-700">Tudo pego — hora de cozinhar!</p>
        </div>
      )}

      <button
        onClick={() => navigate('/grocery')}
        className="w-full mt-5 bg-warm-gray-100 rounded-2xl py-3 text-xs font-semibold text-warm-gray-600 hover:bg-warm-gray-200 transition-colors"
      >
        Escolher outra receita
      </button>
    </div>
  );
}
