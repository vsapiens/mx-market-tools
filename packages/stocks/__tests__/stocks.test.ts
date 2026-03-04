import { describe, it, expect } from 'vitest';
import { AVAILABLE_STOCKS, searchStocks, findStock, toYahooSymbol } from '../src/index.js';

describe('AVAILABLE_STOCKS', () => {
  it('has 36 stocks', () => {
    expect(AVAILABLE_STOCKS.length).toBe(36);
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
    const results = searchStocks('Financial');
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.sector).toBe('Financial');
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
});
