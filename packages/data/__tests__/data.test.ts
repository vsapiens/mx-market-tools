import { describe, it, expect } from 'vitest';
import type { MarketDataResult, OHLCVBar, Fundamentals } from '../src/index.js';

describe('@mx-market/data types', () => {
  it('MarketDataResult has correct shape', () => {
    const result: MarketDataResult = {
      bars: [{ date: '2024-01-01', open: 10, high: 11, low: 9, close: 10.5, volume: 1000 }],
      fundamentals: { peRatio: 20 },
    };
    expect(result.bars.length).toBe(1);
    expect(result.fundamentals.peRatio).toBe(20);
    expect(result.error).toBeUndefined();
  });

  it('MarketDataResult can include error', () => {
    const result: MarketDataResult = {
      bars: [],
      fundamentals: {},
      error: 'Network error',
    };
    expect(result.error).toBe('Network error');
    expect(result.bars.length).toBe(0);
  });
});
