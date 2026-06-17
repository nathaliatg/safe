# safe. 🌿

![Low FODMAP](https://img.shields.io/badge/Low%20FODMAP-Checker-B882C8?style=flat-square)
![Foods](https://img.shields.io/badge/100%2B-Foods%20Indexed-5BAA7E?style=flat-square)
![Built with React](https://img.shields.io/badge/React-Vite-CFA8DC?style=flat-square)
![No account needed](https://img.shields.io/badge/No%20account-needed-1F4229?style=flat-square)

**Know what's safe to eat (before you take a bite).**

---

## The problem

Living with IBS means every meal comes with a question mark.

The Low FODMAP diet is one of the most evidence-based tools for managing IBS symptoms, but it's genuinely hard to follow. Foods that seem healthy (apples, garlic, honey, onion, dates, oat milk) can quietly wreck your day. Hidden ingredients like garlic powder and onion powder turn up in everything from store-bought pesto to BBQ sauce to spice blends. And most online resources are either locked behind apps that require subscriptions, buried in clinical PDFs, or written for dietitians rather than patients.

The result: people either eat the same five safe meals forever, or they spend 20 minutes Googling every ingredient before they can cook.

**safe** was built to fix that. A fast, free, no-friction reference tool: search any food and get a clear answer in seconds.

---

## Features

- **Food search** instant FODMAP status for 100+ foods, with plain-language explanations and portion guidance
- **Recipe analyzer** paste an ingredient list or full recipe and get every FODMAP flagged with swap suggestions
- **PDF upload** upload a recipe PDF and let safe extract and analyze the ingredients automatically
- **Food library** browse by category (fruits, vegetables, dairy, grains, condiments, drinks, and more)
- **Grocery list** generate a shopping list from any recipe
- **FODMAP guide** a plain-English explainer of what FODMAPs are and how the elimination diet works

---

## Why it's different

Most FODMAP tools show you a green / red label and nothing else. **safe** tells you *why* a food is a problem, *how much* is actually safe, and *what to use instead*; because understanding the diet is what makes it sustainable.

Particular attention to the tricky ones: garlic powder, onion powder, dates, hibiscus tea, pesto, soft cheeses, balsamic vinegar: the ingredients that catch people off guard.

---

## Tech

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Fuse.js](https://fusejs.io/) for fuzzy food search
- [PDF.js](https://mozilla.github.io/pdf.js/) for recipe PDF parsing
- Fraunces + Inter (Google Fonts)

---

## Running locally

```bash
npm install
npm run dev
```

---

## About
Made with love by Nathalia Gonçalves.
Inspired by my fiancée Bárbara, and the everyday challenges of Low FODMAP living
