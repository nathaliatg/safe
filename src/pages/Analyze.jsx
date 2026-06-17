import { useState, useRef } from 'react';
import { Upload, FlaskConical, CheckCircle2, AlertCircle, XCircle, FileText, X, ArrowRight, RotateCcw } from 'lucide-react';
import { extractIngredientLines, analyzeIngredients, summarizeResults } from '../lib/analyzer';
import { extractTextFromPDF } from '../lib/pdfParser';
import { useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
  safe:     { icon: CheckCircle2, iconColor: 'text-safe-border',     bg: 'bg-safe-bg',     border: 'border-safe-border',     text: 'text-safe-text',     label: 'Safe',        badgeBg: 'bg-safe-border' },
  moderate: { icon: AlertCircle,  iconColor: 'text-moderate-border', bg: 'bg-moderate-bg', border: 'border-moderate-border', text: 'text-moderate-text', label: 'Moderate',    badgeBg: 'bg-moderate-border' },
  high:     { icon: XCircle,      iconColor: 'text-high-border',     bg: 'bg-high-bg',     border: 'border-high-border',     text: 'text-high-text',     label: 'High FODMAP', badgeBg: 'bg-high-border' },
};

export default function Analyze() {
  const [tab, setTab] = useState('text');
  const [text, setText] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfStatus, setPdfStatus] = useState('idle'); // idle | loading | done | error
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  async function handleAnalyze() {
    const lines = extractIngredientLines(text);
    if (!lines.length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // small delay for UX
    const analyzed = analyzeIngredients(lines);
    setResults(analyzed);
    setLoading(false);
  }

  async function handlePDFFile(file) {
    if (!file || file.type !== 'application/pdf') return;
    setPdfFile(file);
    setPdfStatus('loading');
    try {
      const extracted = await extractTextFromPDF(file);
      setText(extracted);
      setPdfStatus('done');
      setTab('text');
    } catch {
      setPdfStatus('error');
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handlePDFFile(file);
  }

  function reset() {
    setResults(null);
    setText('');
    setPdfFile(null);
    setPdfStatus('idle');
  }

  if (results) {
    return <AnalysisResults results={results} onReset={reset} />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-neutral-900 mb-2">Recipe Analyzer</h1>
        <p className="text-neutral-500">
          Paste an ingredient list or upload a recipe PDF. We'll check every ingredient for FODMAP compatibility.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-xl mb-6 w-fit">
        {[
          { id: 'text', label: 'Paste text', icon: FlaskConical },
          { id: 'pdf',  label: 'Upload PDF', icon: Upload },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === id
                ? 'bg-white text-brand-600 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Text tab */}
      {tab === 'text' && (
        <div className="flex flex-col gap-4">
          {pdfFile && pdfStatus === 'done' && (
            <div className="flex items-center gap-2 text-sm text-safe-text bg-safe-bg border border-safe-border rounded-xl px-4 py-2">
              <FileText className="w-4 h-4 text-safe-border flex-shrink-0" />
              <span className="flex-1 truncate">Extracted from: {pdfFile.name}</span>
              <button onClick={reset} className="hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={12}
            placeholder={`Paste your recipe or ingredient list here...\n\nExamples:\n- 2 cloves garlic\n- 1 onion, diced\n- 1 cup milk\n- 200g chicken breast\n- 2 tbsp olive oil`}
            className="w-full px-4 py-4 rounded-2xl border-2 border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-400 focus:shadow-focus transition-all text-sm leading-relaxed resize-none"
          />
          <p className="text-xs text-neutral-400">
            You can paste a full recipe with instructions; we&apos;ll automatically find the ingredients.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-action hover:bg-action-hover disabled:opacity-40 disabled:cursor-not-allowed text-action-text font-semibold rounded-3xl transition-all active:scale-95"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Analyzing...
              </>
            ) : (
              <>
                <FlaskConical className="w-5 h-5" />
                Analyze Recipe
              </>
            )}
          </button>
        </div>
      )}

      {/* PDF tab */}
      {tab === 'pdf' && (
        <div className="flex flex-col gap-4">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-brand-400 bg-brand-50'
                : 'border-neutral-300 bg-white hover:border-brand-300 hover:bg-brand-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={e => handlePDFFile(e.target.files?.[0])}
            />
            {pdfStatus === 'loading' ? (
              <div className="flex flex-col items-center gap-3">
                <span className="animate-spin inline-block w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full" />
                <p className="text-sm font-medium text-brand-600">Extracting text from PDF...</p>
              </div>
            ) : pdfStatus === 'error' ? (
              <div className="flex flex-col items-center gap-3">
                <XCircle className="w-10 h-10 text-high-border" />
                <p className="font-semibold text-neutral-900">Couldn&apos;t read that PDF</p>
                <p className="text-sm text-neutral-500">Make sure the file contains readable text (not just scanned images).</p>
                <button
                  onClick={e => { e.stopPropagation(); setPdfStatus('idle'); setPdfFile(null); }}
                  className="text-sm text-brand-600 font-medium underline"
                >
                  Try another file
                </button>
              </div>
            ) : pdfFile && pdfStatus === 'done' ? (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-safe-border" />
                <p className="font-semibold text-neutral-900">{pdfFile.name}</p>
                <p className="text-sm text-safe-text">Text extracted. Switching to paste view to analyze.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center">
                  <Upload className="w-7 h-7 text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 mb-1">Drop a PDF here, or click to browse</p>
                  <p className="text-sm text-neutral-500">PDF files only · Max 20MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-600">
            <strong>Privacy note:</strong> Your PDF is processed entirely in your browser. Nothing is uploaded to any server.
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisResults({ results, onReset }) {
  const navigate = useNavigate();
  const { high, moderate, safe, unknown } = summarizeResults(results);
  const matched = results.filter(r => r.matched);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-neutral-900">Analysis Results</h1>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New analysis
        </button>
      </div>

      {/* Summary banner */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 mb-6 shadow-sm">
        <p className="text-sm font-semibold text-neutral-500 mb-3">Summary</p>
        <div className="flex flex-wrap gap-3">
          {high.length > 0 && (
            <SummaryPill icon={XCircle} iconClass="text-high-border" bg="bg-high-bg" text="text-high-text" count={high.length} label="High FODMAP" />
          )}
          {moderate.length > 0 && (
            <SummaryPill icon={AlertCircle} iconClass="text-moderate-border" bg="bg-moderate-bg" text="text-moderate-text" count={moderate.length} label="Moderate" />
          )}
          {safe.length > 0 && (
            <SummaryPill icon={CheckCircle2} iconClass="text-safe-border" bg="bg-safe-bg" text="text-safe-text" count={safe.length} label="Safe" />
          )}
          {unknown.length > 0 && (
            <SummaryPill icon={AlertCircle} iconClass="text-neutral-400" bg="bg-neutral-100" text="text-neutral-500" count={unknown.length} label="Not found" />
          )}
        </div>
        {matched.length === 0 && (
          <p className="text-sm text-neutral-500 mt-2">No recognizable ingredients found. Try pasting just the ingredient list.</p>
        )}
      </div>

      {/* Ingredient breakdown */}
      <div className="flex flex-col gap-2">
        {/* High FODMAP first */}
        {[...high, ...moderate, ...safe].map(({ raw, food }) => {
          const cfg = STATUS_CONFIG[food.status];
          const Icon = cfg.icon;
          return (
            <IngredientRow
              key={food.id}
              raw={raw}
              food={food}
              cfg={cfg}
              Icon={Icon}
              onSearch={() => navigate(`/search?q=${encodeURIComponent(food.id)}`)}
            />
          );
        })}
        {/* Unknown lines */}
        {unknown.map(({ raw }) => (
          <div key={raw} className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
            <span className="w-2 h-2 rounded-full bg-neutral-300 flex-shrink-0" />
            <span className="text-sm text-neutral-500 flex-1">{raw}</span>
            <span className="text-xs text-neutral-400 whitespace-nowrap">Not in database</span>
          </div>
        ))}
      </div>

      {high.length > 0 && (
        <div className="mt-6 bg-high-bg border border-high-border rounded-2xl p-5">
          <p className="font-semibold text-high-text mb-2">
            ⚠️ {high.length} high FODMAP ingredient{high.length !== 1 ? 's' : ''} found
          </p>
          <p className="text-sm text-high-text">
            Click any ingredient to see detailed substitution suggestions.
          </p>
        </div>
      )}

      {matched.length > 0 && high.length === 0 && moderate.length === 0 && (
        <div className="mt-6 bg-safe-bg border border-safe-border rounded-2xl p-5">
          <p className="font-semibold text-safe-text">
            ✅ All recognized ingredients are Low FODMAP!
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryPill({ icon: Icon, iconClass, bg, text, count, label }) {
  return (
    <span className={`flex items-center gap-1.5 ${bg} ${text} px-3 py-1.5 rounded-full text-sm font-semibold`}>
      <Icon className={`w-4 h-4 ${iconClass}`} />
      {count} {label}
    </span>
  );
}

function IngredientRow({ raw, food, cfg, Icon, onSearch }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${cfg.bg} border ${cfg.border} rounded-xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:opacity-90 transition-opacity"
      >
        <span className="text-xl flex-shrink-0">{food.emoji}</span>
        <span className="flex-1 text-sm text-neutral-800 font-medium">{raw}</span>
        <span className={`flex items-center gap-1 text-xs font-semibold ${cfg.text} whitespace-nowrap`}>
          <Icon className={`w-3.5 h-3.5 ${cfg.iconColor}`} />
          {cfg.label}
        </span>
      </button>

      {open && (
        <div className={`border-t ${cfg.border} px-4 py-3 flex flex-col gap-2`}>
          <p className="text-xs text-neutral-700">{food.explanation}</p>
          {food.serving_note && (
            <p className={`text-xs ${cfg.text} font-medium`}>{food.serving_note}</p>
          )}
          {food.alternative_names?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="text-xs text-neutral-500">Replace with:</span>
              {food.alternative_names.map(alt => (
                <span key={alt} className="text-xs bg-white border border-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full">{alt}</span>
              ))}
            </div>
          )}
          <button
            onClick={onSearch}
            className={`self-start flex items-center gap-1 text-xs ${cfg.text} font-semibold mt-1 hover:underline`}
          >
            Full details <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
