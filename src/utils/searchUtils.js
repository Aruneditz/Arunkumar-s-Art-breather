/**
 * Search Utilities for ART BREATHER
 * 
 * Provides intelligent multi-field relevance scoring for catalog products:
 * 1. Exact product name match (highest priority: +1000)
 * 2. Product name prefix / substring match (+400..+600)
 * 3. Category match & aliases (e.g., "pencil drawing", "pencil art", "painting", "bookmark": +250..+300)
 * 4. Material match & aliases (e.g., "pencil", "acrylic", "colour pencil", "mixed media": +160..+200)
 * 5. Description and semantic metadata (+40..+120 for synonyms like flower/bloom, tree/forest; +15..+50 for words)
 * 
 * Strict constraint: Suggestions are exclusively derived from the ART BREATHER 34-product catalog.
 * Never generates internet-style or generic phrases.
 */

/**
 * Calculates a relevance score for a product against a search query.
 * Returns 0 if there is no meaningful match.
 *
 * @param {Object} product - Product from catalog
 * @param {string} query - Raw search query string
 * @returns {number} Score >= 0
 */
export function getRelevanceScore(product, query) {
  if (!query || !product) return 0;
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const title = (product.title || '').toLowerCase();
  const category = (product.category || '').toLowerCase();
  const material = (product.material || '').toLowerCase();
  const desc = (product.description || '').toLowerCase();

  let score = 0;

  // 1. Exact title match
  if (title === q) {
    score += 1000;
  } else if (title.startsWith(q)) {
    score += 600;
  } else if (title.includes(q)) {
    score += 400;
  }

  // Word-level matches in title
  const words = q.split(/\s+/).filter(Boolean);
  let matchedTitleWords = 0;
  for (const w of words) {
    if (title.includes(w)) {
      matchedTitleWords++;
      score += 100;
    }
  }
  if (words.length > 1 && matchedTitleWords === words.length) {
    score += 150;
  }

  // 2. Category match & aliases
  const isPencilArtQuery = q === 'pencil art' || q === 'pencil' || q === 'pencil drawing' || q.includes('pencil');
  const isColourPencilQuery = q === 'colour pencil' || q === 'color pencil';

  if (category === q) {
    score += 300;
  } else if (category.includes(q)) {
    score += 250;
  } else if (isPencilArtQuery && category.includes('pencil')) {
    score += 260;
  }

  // 3. Material match & aliases
  if (material === q) {
    score += 200;
  } else if (material.includes(q)) {
    score += 160;
  } else if (isPencilArtQuery && material.includes('pencil')) {
    score += 180;
  } else if (isColourPencilQuery && (material.includes('pencil') || material.includes('mixed'))) {
    score += 180;
  }

  // 4. Semantic / synonym helpers
  const isFlowerQuery = ['flower', 'flowers', 'floral', 'bloom'].some(k => q.includes(k)) || q === 'fl';
  if (isFlowerQuery) {
    if (title.includes('bloom') || title.includes('rose') || title.includes('dais') || title.includes('hibiscus')) {
      score += 120;
    }
    if (desc.includes('flower') || desc.includes('floral') || desc.includes('bloom') || desc.includes('dais') || desc.includes('rose') || desc.includes('wildflower')) {
      score += 40;
    }
  }

  const isTreeQuery = q.includes('tree') || q.includes('forest') || q.includes('bonsai');
  if (isTreeQuery) {
    if (title.includes('tree') || title.includes('bonsai') || title.includes('forest')) {
      score += 120;
    }
    if (desc.includes('tree') || desc.includes('bonsai') || desc.includes('forest')) {
      score += 40;
    }
  }

  // 5. Description / metadata match (lowest priority)
  if (desc.includes(q)) {
    score += 50;
  } else {
    for (const w of words) {
      if (w.length >= 3 && desc.includes(w)) {
        score += 15;
      }
    }
  }

  return score;
}

/**
 * Searches the catalog and returns the top matching products sorted by relevance.
 *
 * @param {Array} products - List of all products
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results to return (default: 5)
 * @returns {Array} List of matching products
 */
export function searchProducts(products, query, maxResults = 5) {
  if (!query || !query.trim() || !Array.isArray(products)) {
    return [];
  }

  return products
    .map(product => ({
      product,
      score: getRelevanceScore(product, query)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.product.id - b.product.id)
    .slice(0, maxResults)
    .map(item => item.product);
}
