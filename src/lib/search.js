import Fuse from 'fuse.js';
import foods from '../data/fodmap-foods.json';

const fuse = new Fuse(foods, {
  keys: ['name', 'fodmap_types'],
  threshold: 0.35,
  includeScore: true,
});

export function searchFoods(query) {
  if (!query || !query.trim()) return [];
  const results = fuse.search(query.trim());
  const seen = new Set();
  return results
    .map(r => r.item)
    .filter(item => seen.has(item.id) ? false : seen.add(item.id));
}

export function getFoodById(id) {
  return foods.find(f => f.id === id) ?? null;
}

export function getFoodsByCategory(category) {
  if (!category || category === 'all') return foods;
  return foods.filter(f => f.category === category);
}

export function getFoodsByStatus(status) {
  return foods.filter(f => f.status === status);
}

export const CATEGORIES = [
  { id: 'all',        label: 'All Foods',   emoji: '🍽️' },
  { id: 'fruits',     label: 'Fruits',      emoji: '🍓' },
  { id: 'vegetables', label: 'Vegetables',  emoji: '🥦' },
  { id: 'dairy',      label: 'Dairy',       emoji: '🥛' },
  { id: 'grains',     label: 'Grains',      emoji: '🌾' },
  { id: 'legumes',    label: 'Legumes',     emoji: '🫘' },
  { id: 'proteins',   label: 'Proteins',    emoji: '🍗' },
  { id: 'drinks',     label: 'Drinks',      emoji: '☕' },
  { id: 'condiments', label: 'Condiments',  emoji: '🫙' },
];

export { foods };
