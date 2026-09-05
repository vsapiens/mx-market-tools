import type { BMVStock } from './types.js';
import { AVAILABLE_STOCKS } from './catalog.js';

/**
 * Converts an app symbol to a Yahoo Finance symbol.
 * Strips `*`, appends `.MX`.
 */
export function toYahooSymbol(appSymbol: string): string {
  return appSymbol.replace(/\*/g, '') + '.MX';
}

/**
 * Search the stock list by symbol, company name, or sector (case-insensitive).
 * Returns up to `limit` matches, ranked by relevance:
 *   1. Exact symbol match
 *   2. Symbol prefix match (BMV before SIC)
 *   3. Yahoo symbol match (e.g., "AAPL" matches AAPL.MX)
 *   4. Name substring match (BMV before SIC)
 *   5. Sector match (BMV before SIC)
 */
export function searchStocks(query: string, limit = 8): BMVStock[] {
  if (!query.trim()) return AVAILABLE_STOCKS.slice(0, limit);
  const q = query.toUpperCase().trim();

  // Single-pass bucketing
  let exact: BMVStock | undefined;
  const prefixBmv: BMVStock[] = [];
  const prefixSic: BMVStock[] = [];
  const yahooBmv: BMVStock[] = [];
  const yahooSic: BMVStock[] = [];
  const nameBmv: BMVStock[] = [];
  const nameSic: BMVStock[] = [];
  const sectorBmv: BMVStock[] = [];
  const sectorSic: BMVStock[] = [];

  for (const stock of AVAILABLE_STOCKS) {
    const sym = stock.symbol.toUpperCase();
    const isBmv = stock.exchange === 'BMV';

    if (sym === q) {
      exact = stock;
    } else if (sym.startsWith(q)) {
      (isBmv ? prefixBmv : prefixSic).push(stock);
    } else if (stock.yahooSymbol.toUpperCase().startsWith(q + '.') || stock.yahooSymbol.toUpperCase() === q) {
      (isBmv ? yahooBmv : yahooSic).push(stock);
    } else if (stock.name.toUpperCase().includes(q)) {
      (isBmv ? nameBmv : nameSic).push(stock);
    } else if (stock.sector.toUpperCase().includes(q)) {
      (isBmv ? sectorBmv : sectorSic).push(stock);
    }
  }

  // Merge buckets in priority order
  const results: BMVStock[] = [];
  const buckets = [
    exact ? [exact] : [],
    prefixBmv, prefixSic,
    yahooBmv, yahooSic,
    nameBmv, nameSic,
    sectorBmv, sectorSic,
  ];

  for (const bucket of buckets) {
    for (const stock of bucket) {
      if (results.length >= limit) return results;
      results.push(stock);
    }
  }

  return results;
}

/**
 * Look up a stock by exact symbol (case-insensitive).
 */
export function findStock(symbol: string): BMVStock | undefined {
  const up = symbol.toUpperCase();
  return AVAILABLE_STOCKS.find((s) => s.symbol.toUpperCase() === up);
}
