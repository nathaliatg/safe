import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero/marble.svg';
import { Search, ArrowRight, CheckCircle2, AlertCircle, XCircle, FlaskConical, BookOpen, Upload } from 'lucide-react';
import Reveal from '../components/Reveal';

const QUICK_SEARCHES = ['Garlic', 'Onion', 'Apple', 'Oats', 'Milk', 'Avocado', 'Wheat', 'Broccoli'];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Search,
    title: 'Search any food',
    desc: 'Type any ingredient, food item, or common meal component and get an instant answer.',
  },
  {
    step: '02',
    icon: CheckCircle2,
    title: 'Get a clear result',
    desc: 'See a color-coded FODMAP status (Safe, Moderate, or High) with a plain-language explanation.',
  },
  {
    step: '03',
    icon: ArrowRight,
    title: 'Eat with confidence',
    desc: 'Use the suggested alternatives and portion guidance to plan meals without the guesswork.',
  },
];

const FEATURES = [
  {
    icon: FlaskConical,
    title: 'Recipe Analyzer',
    desc: 'Paste your ingredient list or full recipe. We\'ll flag every problematic ingredient and suggest Low FODMAP swaps.',
    color: 'text-brand-600',
    bg: 'bg-brand-100',
    link: '/analyze',
    linkLabel: 'Try the analyzer',
  },
  {
    icon: Upload,
    title: 'PDF Upload',
    desc: 'Have a recipe saved as a PDF? Upload it and we\'ll extract the ingredients and run the full analysis automatically.',
    color: 'text-sage-500',
    bg: 'bg-sage-100',
    link: '/analyze',
    linkLabel: 'Upload a recipe',
  },
  {
    icon: BookOpen,
    title: 'Food Library',
    desc: 'Browse 100+ foods organized by category. Every food includes its FODMAP status, safe portion size, and alternatives.',
    color: 'text-moderate-text',
    bg: 'bg-moderate-bg',
    link: '/library',
    linkLabel: 'Browse the library',
  },
];

const STATUS_EXAMPLES = [
  {
    food: 'Carrot',
    emoji: '🥕',
    status: 'safe',
    label: 'Safe',
    note: 'Enjoy freely',
  },
  {
    food: 'Avocado',
    emoji: '🥑',
    status: 'moderate',
    label: 'Moderate',
    note: 'Up to 30g (⅛ fruit)',
  },
  {
    food: 'Garlic',
    emoji: '🧄',
    status: 'high',
    label: 'High FODMAP',
    note: 'Avoid; use garlic-infused oil',
  },
];

const statusStyles = {
  safe:     { bg: 'bg-safe-bg',     border: 'border-safe-border',     text: 'text-safe-text',     icon: CheckCircle2, iconColor: 'text-safe-border' },
  moderate: { bg: 'bg-moderate-bg', border: 'border-moderate-border', text: 'text-moderate-text', icon: AlertCircle,  iconColor: 'text-moderate-border' },
  high:     { bg: 'bg-high-bg',     border: 'border-high-border',     text: 'text-high-text',     icon: XCircle,      iconColor: 'text-high-border' },
};

export default function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleQuick(term) {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div>
      {/* ── Hero image ── */}
      <section className="w-full bg-white flex justify-center" style={{ height: '450px' }}>
        <img
          src={heroImage}
          alt="safe"
          className="h-full w-auto block"
        />
      </section>

      {/* ── Hero copy + search ── */}
      <section className="bg-white pb-20 pt-4 px-4 border-b border-neutral-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="inline-block text-xs font-semibold tracking-widest text-action-text uppercase mb-4 px-3 py-1 rounded-full">
            Low FODMAP checker
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4">
            know what's safe to eat {' '}
            <span className="text-action">(before you take a bite).</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-10 max-w-xl mx-auto">
            Wondering if it's safe to eat? Search any food, ingredient, or recipe and get instant Low FODMAP guidance.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Try 'garlic', 'oats', or 'avocado'..."
                className="w-full pl-12 pr-4 py-4 rounded-3xl border-2 border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-400 focus:shadow-focus transition-all text-base"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-action-text hover:bg-action-text/90 text-white font-semibold rounded-3xl transition-all active:scale-95 whitespace-nowrap"
            >
              Check it
            </button>
          </form>

          {/* Quick searches */}
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_SEARCHES.map(term => (
              <button
                key={term}
                onClick={() => handleQuick(term)}
                className="text-sm text-brand-600 bg-brand-100 hover:bg-brand-200 px-3 py-1.5 rounded-full transition-colors font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Status preview ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-center text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-8">
              Three simple answers
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATUS_EXAMPLES.map(({ food, emoji, status, label, note }, i) => {
              const s = statusStyles[status];
              const Icon = s.icon;
              return (
                <Reveal key={food} delay={i * 80}>
                  <div
                    className={`${s.bg} border-2 ${s.border} rounded-2xl p-5 flex flex-col gap-2 hover:-translate-y-1 transition-transform`}
                  >
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <p className="font-sans font-semibold text-neutral-900 text-lg">{food}</p>
                      <div className={`flex items-center gap-1 ${s.text} text-sm font-semibold mt-1`}>
                        <Icon className={`w-4 h-4 ${s.iconColor}`} />
                        {label}
                      </div>
                    </div>
                    <p className={`text-xs ${s.text} opacity-80`}>{note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What are FODMAPs ── */}
      <section className="py-14 px-4 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Quick explainer</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              What are FODMAPs?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 text-sm text-neutral-600 leading-relaxed">
            <p>
              FODMAPs are certain carbohydrates that are difficult to digest for some people, particularly those with IBS. They're found in a wide variety of everyday foods: fruits, vegetables, grains, dairy, legumes and many packaged products, which makes navigating the diet surprisingly tricky.
            </p>
            <p>
              They're not inherently "bad" foods. But for sensitive individuals they can trigger bloating, abdominal pain, and digestive discomfort. <strong className="text-neutral-800 font-semibold">safe</strong> helps you quickly identify which ingredients may be problematic and find suitable alternatives — without the guesswork.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-4 bg-brand-50">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-12">
              How it works
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }, i) => (
              <Reveal key={step} delay={i * 100}>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-6xl font-bold text-brand-300 leading-none">{step}</span>
                    <div className="w-10 h-10 rounded-2xl bg-brand-200 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-neutral-900 text-lg">{title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-4">
            More than a food lookup
          </h2>
          <p className="text-center text-neutral-500 mb-12 max-w-xl mx-auto">
            <strong className="text-neutral-800 font-semibold">safe</strong> handles full recipes too: paste a list, upload a PDF, or browse the food library.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg, link, linkLabel }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-neutral-900 mb-2">{title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
                  </div>
                  <a href={link} className={`text-sm font-semibold ${color} flex items-center gap-1 mt-auto group`}>
                    {linkLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pt-4 pb-20 px-4 bg-white">
        <div className="relative max-w-4xl mx-auto">
          {/* Lavender card */}
          <div className="bg-brand-200 rounded-3xl px-10 py-10 text-center w-full overflow-hidden">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-900 mb-3">
              Start eating without the guesswork.
            </h2>
            <p className="text-brand-600 text-sm mb-7">
              No account needed. Just search and eat with confidence.
            </p>
            <div className="flex flex-row justify-center gap-3">
              <a
                href="/search"
                className="px-6 py-3 bg-action-text hover:bg-action-text/90 text-white font-semibold rounded-3xl transition-all text-sm"
              >
                Search a food
              </a>
              <a
                href="/library"
                className="px-6 py-3 bg-white/50 hover:bg-white text-brand-700 font-semibold rounded-3xl border border-brand-300 transition-all text-sm"
              >
                Browse library
              </a>
            </div>
          </div>
          {/* Bite ellipses — white, top-right corner, overlapping so no gap */}
          <div className="absolute -top-6 right-2 w-14 h-14 rounded-full bg-white z-10" />
          <div className="absolute top-2 -right-6 w-14 h-14 rounded-full bg-white z-10" />
        </div>
      </section>
    </div>
  );
}
