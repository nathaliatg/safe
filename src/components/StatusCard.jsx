import { CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
  safe: {
    label:       'Safe: Low FODMAP',
    shortLabel:  'Safe',
    icon:        CheckCircle2,
    bg:          'bg-safe-bg',
    border:      'border-safe-border',
    text:        'text-safe-text',
    iconColor:   'text-safe-border',
    badgeBg:     'bg-safe-border',
  },
  moderate: {
    label:       'Moderate: Portion Sensitive',
    shortLabel:  'Moderate',
    icon:        AlertCircle,
    bg:          'bg-moderate-bg',
    border:      'border-moderate-border',
    text:        'text-moderate-text',
    iconColor:   'text-moderate-border',
    badgeBg:     'bg-moderate-border',
  },
  high: {
    label:       'High FODMAP: Avoid',
    shortLabel:  'High FODMAP',
    icon:        XCircle,
    bg:          'bg-high-bg',
    border:      'border-high-border',
    text:        'text-high-text',
    iconColor:   'text-high-border',
    badgeBg:     'bg-high-border',
  },
};

export function StatusBadge({ status, size = 'md' }) {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return null;
  const Icon = cfg.icon;
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5';
  return (
    <span className={`inline-flex items-center font-semibold rounded-full text-white ${cfg.badgeBg} ${sizeClass}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {size === 'sm' ? cfg.shortLabel : cfg.label}
    </span>
  );
}

export default function StatusCard({ food, expanded: defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[food.status];
  if (!cfg) return null;
  const Icon = cfg.icon;

  return (
    <div className={`${cfg.bg} border-2 ${cfg.border} rounded-2xl overflow-hidden`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-4xl flex-shrink-0" role="img" aria-label={food.name}>
              {food.emoji}
            </span>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-2xl text-neutral-900 leading-tight">
                {food.name}
              </h2>
              <div className={`flex items-center gap-1.5 ${cfg.text} font-semibold text-sm mt-1`}>
                <Icon className={`w-4 h-4 ${cfg.iconColor} flex-shrink-0`} />
                {cfg.label}
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 p-2 rounded-xl hover:bg-black/5 transition-colors"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="w-5 h-5 text-neutral-500" /> : <ChevronDown className="w-5 h-5 text-neutral-500" />}
          </button>
        </div>

        {/* FODMAP types */}
        {food.fodmap_types?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {food.fodmap_types.map(type => (
              <span key={type} className={`text-xs font-medium ${cfg.text} bg-black/5 px-2.5 py-1 rounded-full`}>
                {type}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable body */}
      {expanded && (
        <div className="border-t-2 border-black/5 px-6 pb-6 pt-4 flex flex-col gap-5">
          {/* Explanation */}
          <p className="text-neutral-700 leading-relaxed">{food.explanation}</p>

          {/* Serving note */}
          {food.serving_note && (
            <div className={`flex items-start gap-3 ${cfg.bg} border ${cfg.border} rounded-xl p-4`}>
              <Icon className={`w-5 h-5 ${cfg.iconColor} flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`text-sm font-semibold ${cfg.text} mb-0.5`}>Serving guidance</p>
                <p className={`text-sm ${cfg.text}`}>{food.serving_note}</p>
              </div>
            </div>
          )}

          {/* Alternatives */}
          {food.alternative_names?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-neutral-700 mb-3">
                {food.status === 'high' ? '✅ Safe alternatives' : '💡 Lower FODMAP options'}
              </p>
              <div className="flex flex-wrap gap-2">
                {food.alternative_names.map((alt, i) => {
                  const altId = food.alternatives?.[i];
                  return (
                    <button
                      key={alt}
                      onClick={() => altId && navigate(`/search?q=${encodeURIComponent(altId)}`)}
                      className="text-sm bg-white border border-neutral-200 hover:border-brand-300 hover:bg-brand-50 px-3 py-1.5 rounded-xl transition-colors font-medium text-neutral-700"
                    >
                      {alt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
