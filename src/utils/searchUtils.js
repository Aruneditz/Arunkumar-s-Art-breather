/**
 * Search Utilities for ART BREATHER
 * 
 * Provides intelligent multi-field relevance scoring for catalog products:
 * 1. Exact product name match (highest priority)
 * 2. Product name prefix / substring match
 * 3. Category match & aliases (e.g., "pencil art" -> Pencil Drawing)
 * 4. Material match & aliases (e.g., "colour pencil", "acrylic", "crayon")
 * 5. Relevant description and semantic metadata (e.g., "boy", "tree", "flower", "floral")
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
  }
  // Title starts with query
  else if (title.startsWith(q)) {
    score += 500;
  }
  // Title contains exact phrase
  else if (title.includes(q)) {
    score += 300;
  }

  // 2. Category match or category alias
  const isPencilArtQuery = q === 'pencil art' || q === 'pencil';
  const isColourPencilQuery = q === 'colour pencil' || q === 'color pencil';

  if (category === q) {
    score += 260;
  } else if (category.includes(q)) {
    score += 200;
  } else if (isPencilArtQuery && (category.includes('pencil') || material.includes('pencil'))) {
    score += 220;
  }

  // 3. Material match or material alias
  if (material === q) {
    score += 180;
  } else if (material.includes(q)) {
    score += 150;
  } else if (isColourPencilQuery && (material.includes('pencil') || desc.includes('pencil') || desc.includes('colour') || desc.includes('color'))) {
    score += 160;
  }

  // 4. Word-level matches in title
  const words = q.split(/\s+/).filter(Boolean);
  let allWordsInTitle = words.length > 0;
  for (const w of words) {
    if (title.includes(w)) {
      score += 60;
    } else {
      allWordsInTitle = false;
    }
  }
  if (words.length > 1 && allWordsInTitle) {
    score += 120;
  }

  // 5. Semantic / synonym helpers
  const isFlowerQuery = ['flower', 'flowers', 'floral', 'bloom'].some(k => q.includes(k)) || q === 'fl';
  if (isFlowerQuery) {
    if (title.includes('bloom') || title.includes('rose') || title.includes('dais') || title.includes('hibiscus')) {
      score += 100;
    }
    if (desc.includes('flower') || desc.includes('floral') || desc.includes('bloom') || desc.includes('dais') || desc.includes('rose') || desc.includes('wildflower')) {
      score += 60;
    }
  }

  const isTreeQuery = q.includes('tree') || q.includes('forest') || q.includes('bonsai');
  if (isTreeQuery) {
    if (title.includes('tree') || title.includes('bonsai') || title.includes('forest')) {
      score += 100;
    }
    if (desc.includes('tree') || desc.includes('bonsai') || desc.includes('forest')) {
      score += 60;
    }
  }

  // 6. Description / metadata match
  if (desc.includes(q)) {
    score += 80;
  } else {
    for (const w of words) {
      if (w.length >= 3 && desc.includes(w)) {
        score += 25;
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
