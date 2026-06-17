const colorMap = {
  'Café da manhã': 'bg-peach-100 text-peach-500',
  'Almoço':        'bg-lavender-100 text-lavender-500',
  'Jantar':        'bg-mint-100 text-mint-600',
  'Padaria':       'bg-petal-100 text-petal-500',
  'Lanche':        'bg-warm-gray-100 text-warm-gray-600',
};

export default function CategoryBadge({ category, className = '' }) {
  const colors = colorMap[category] ?? 'bg-warm-gray-100 text-warm-gray-600';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors} ${className}`}>
      {category}
    </span>
  );
}
