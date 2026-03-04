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
 * Returns up to `limit` matches.
 */
export function searchStocks(query: string, limit = 8): BMVStock[] {
  if (!query.trim()) return AVAILABLE_STOCKS.slice(0, limit);
  const q = query.toUpperCase().trim();
  const results: BMVStock[] = [];
  for (const stock of AVAILABLE_STOCKS) {
    if (results.length >= limit) break;
    if (
      stock.symbol.toUpperCase().startsWith(q) ||
      stock.name.toUpperCase().includes(q) ||
      stock.sector.toUpperCase().includes(q)
    ) {
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
