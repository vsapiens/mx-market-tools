import { describe, it, expect } from 'vitest';
import { AVAILABLE_STOCKS, searchStocks, findStock, toYahooSymbol } from '../src/index.js';
import { BMV_STOCKS } from '../src/catalog-bmv.js';
import { SIC_STOCKS } from '../src/catalog-sic.js';

describe('AVAILABLE_STOCKS', () => {
  it('has BMV + SIC stocks combined', () => {
    expect(AVAILABLE_STOCKS.length).toBe(BMV_STOCKS.length + SIC_STOCKS.length);
    expect(AVAILABLE_STOCKS.length).toBeGreaterThan(400);
  });

  it('BMV stocks come first', () => {
    const firstSicIndex = AVAILABLE_STOCKS.findIndex((s) => s.exchange === 'SIC');
    const lastBmvIndex = AVAILABLE_STOCKS.findLastIndex((s) => s.exchange === 'BMV');
    expect(lastBmvIndex).toBeLessThan(firstSicIndex);
  });

  it('all stocks have required fields', () => {
    for (const stock of AVAILABLE_STOCKS) {
      expect(stock.symbol).toBeTruthy();
      expect(stock.yahooSymbol).toBeTruthy();
      expect(stock.name).toBeTruthy();
      expect(['BMV', 'SIC']).toContain(stock.exchange);
      expect(stock.sector).toBeTruthy();
    }
  });

  it('all yahoo symbols end with .MX', () => {
    for (const stock of AVAILABLE_STOCKS) {
      expect(stock.yahooSymbol).toMatch(/\.MX$/);
    }
  });

  it('has no duplicate symbols', () => {
    const symbols = AVAILABLE_STOCKS.map((s) => s.symbol.toUpperCase());
    const unique = new Set(symbols);
    expect(unique.size).toBe(symbols.length);
  });
});

describe('toYahooSymbol', () => {
  it('strips * and appends .MX', () => {
    expect(toYahooSymbol('WALMEX*')).toBe('WALMEX.MX');
    expect(toYahooSymbol('AC*')).toBe('AC.MX');
  });

  it('works for symbols without *', () => {
    expect(toYahooSymbol('CEMEXCPO')).toBe('CEMEXCPO.MX');
  });
});

describe('searchStocks', () => {
  it('returns results for partial symbol match', () => {
    const results = searchStocks('WAL');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].symbol).toBe('WALMEX*');
  });

  it('matches by company name', () => {
    const results = searchStocks('CEMEX');
    expect(results.some((s) => s.symbol === 'CEMEXCPO')).toBe(true);
  });

  it('matches by sector', () => {
    const results = searchStocks('Aviation', 8);
    expect(results.length).toBeGreaterThan(0);
    // All results should have sector "Aviation" (no stock names contain "Aviation")
    for (const r of results) {
      expect(r.sector).toBe('Aviation');
    }
  });

  it('returns default list for empty query', () => {
    const results = searchStocks('');
    expect(results.length).toBeGreaterThan(0);
  });

  it('respects limit', () => {
    const results = searchStocks('', 3);
    expect(results.length).toBe(3);
  });

  it('finds SIC stocks by symbol', () => {
    const results = searchStocks('AAPL');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].symbol).toBe('AAPL');
    expect(results[0].exchange).toBe('SIC');
  });

  it('ranks BMV before SIC for same-tier matches', () => {
    // "Mining" only matches by sector (no stock names contain "Mining")
    // BMV mining stocks should appear before SIC mining stocks
    const results = searchStocks('Mining', 20);
    const firstSicIdx = results.findIndex((s) => s.exchange === 'SIC');
    const lastBmvIdx = results.findLastIndex((s) => s.exchange === 'BMV');
    expect(firstSicIdx).toBeGreaterThan(-1);
    expect(lastBmvIdx).toBeGreaterThan(-1);
    expect(lastBmvIdx).toBeLessThan(firstSicIdx);
  });

  it('exact symbol match ranks first', () => {
    const results = searchStocks('AMXL');
    expect(results[0].symbol).toBe('AMXL');
  });

  it('matches SIC stocks by yahoo symbol prefix', () => {
    // Typing "MSFT" should find the SIC entry with yahooSymbol MSFT.MX
    const results = searchStocks('MSFT');
    expect(results.some((s) => s.symbol === 'MSFT')).toBe(true);
  });
});

describe('findStock', () => {
  it('finds stock by exact symbol', () => {
    const stock = findStock('WALMEX*');
    expect(stock?.name).toBe('Walmart de México');
  });

  it('is case-insensitive', () => {
    const stock = findStock('walmex*');
    expect(stock?.symbol).toBe('WALMEX*');
  });

  it('returns undefined for unknown symbol', () => {
    expect(findStock('NONEXISTENT')).toBeUndefined();
  });

  it('finds SIC stock by symbol', () => {
    const stock = findStock('AAPL');
    expect(stock?.name).toBe('Apple Inc.');
    expect(stock?.exchange).toBe('SIC');
  });

  it('BMV takes priority over SIC for same symbol', () => {
    // findStock iterates AVAILABLE_STOCKS which has BMV first
    const stock = findStock('AMXL');
    expect(stock?.exchange).toBe('BMV');
  });
});
