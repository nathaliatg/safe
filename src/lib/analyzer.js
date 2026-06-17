import { foods } from './search';

// Tokenise text into candidate ingredient terms
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s\-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

// Build lookup maps once
const nameMap = new Map();
const idMap   = new Map();

for (const food of foods) {
  idMap.set(food.id, food);
  nameMap.set(food.name.toLowerCase(), food);
  // also map each word in the name
  for (const word of tokenize(food.name)) {
    if (!nameMap.has(word)) nameMap.set(word, food);
  }
  // map alternative names back to this food
  for (const alt of food.alternative_names ?? []) {
    nameMap.set(alt.toLowerCase(), food);
  }
}

// Exact and partial match lookup
function matchFood(token) {
  if (nameMap.has(token)) return nameMap.get(token);
  // partial: token appears in a food id
  for (const food of foods) {
    if (food.id.includes(token) || food.name.toLowerCase().includes(token)) {
      return food;
    }
  }
  return null;
}

// Split raw text into individual ingredient lines
export function extractIngredientLines(text) {
  return text
    .split(/\n|,|;/)
    .map(l => l.replace(/^[\s\-\*\d\.]+/, '').trim())  // strip bullets/numbers
    .filter(l => l.length > 2);
}

// Analyse a list of raw ingredient strings
export function analyzeIngredients(rawLines) {
  const results = [];
  const seen = new Set();

  for (const line of rawLines) {
    const tokens = tokenize(line);
    let matched = null;

    // Try progressively longer n-grams first for more specific matches
    for (let len = Math.min(tokens.length, 3); len >= 1; len--) {
      for (let i = 0; i <= tokens.length - len; i++) {
        const phrase = tokens.slice(i, i + len).join(' ');
        const food = matchFood(phrase);
        if (food && !seen.has(food.id)) {
          matched = food;
          break;
        }
      }
      if (matched) break;
    }

    if (matched) {
      seen.add(matched.id);
      results.push({ raw: line, food: matched, matched: true });
    } else {
      results.push({ raw: line, food: null, matched: false });
    }
  }

  return results;
}

export function summarizeResults(analyzed) {
  const high     = analyzed.filter(r => r.food?.status === 'high');
  const moderate = analyzed.filter(r => r.food?.status === 'moderate');
  const safe     = analyzed.filter(r => r.food?.status === 'safe');
  const unknown  = analyzed.filter(r => !r.matched);
  return { high, moderate, safe, unknown };
}
