import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { searchFoods } from '../lib/search';
import StatusCard from '../components/StatusCard';

const SUGGESTIONS = ['Garlic', 'Onion', 'Apple', 'Oats', 'Milk', 'Avocado', 'Broccoli', 'Wheat', 'Yogurt', 'Mushrooms'];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [input, setInput] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      const hits = searchFoods(initialQuery);
      setResults(hits);
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
      inputRef.current?.focus();
    }
  }, [initialQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleSuggestion(term) {
    setInput(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Header — hidden once a search is active */}
      {!initialQuery && (
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Search any food
          </h1>
          <p className="text-neutral-500 text-base max-w-sm mx-auto">
            Type an ingredient or food item and get an instant Low FODMAP status.
          </p>
        </div>
      )}

      {/* Back link (only when there's a query) */}
      {initialQuery && (
        <button
          onClick={() => navigate('/search')}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          New search
        </button>
      )}

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search a food or ingredient..."
            className="w-full pl-12 pr-4 py-4 rounded-3xl border-2 border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-400 focus:shadow-focus transition-all text-base"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-4 bg-action hover:bg-action-hover text-action-text font-semibold rounded-3xl transition-all active:scale-95"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {searched && (
        <>
          {results.length > 0 ? (
            <div className="flex flex-col gap-4">
              {results.length > 1 && (
                <p className="text-sm text-neutral-500">
                  {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{initialQuery}&rdquo;
                </p>
              )}
              {results.map(food => (
                <StatusCard key={food.id} food={food} expanded={results.length === 1} />
              ))}
            </div>
          ) : (
            <NotFound query={initialQuery} onSuggestion={handleSuggestion} />
          )}
        </>
      )}

      {/* Empty state — no search yet */}
      {!searched && (
        <div>
          <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-4">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(term => (
              <button
                key={term}
                onClick={() => handleSuggestion(term)}
                className="text-sm text-action-text bg-action-light hover:bg-action px-4 py-2 rounded-full transition-colors font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NotFound({ query, onSuggestion }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">🌿</div>
      <h3 className="font-display font-bold text-xl text-neutral-800 mb-2">
        No results for &ldquo;{query}&rdquo;
      </h3>
      <p className="text-neutral-500 text-sm mb-6 max-w-xs mx-auto">
        Try searching for the main ingredient name, or browse the food library.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {['Garlic', 'Onion', 'Milk', 'Apple', 'Wheat'].map(t => (
          <button
            key={t}
            onClick={() => onSuggestion(t)}
            className="text-sm text-action-text bg-action-light hover:bg-action px-3 py-1.5 rounded-full transition-colors font-medium"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
