import { describe, it, expect } from 'vitest';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
  sma,
  rsi,
  atr,
} from '../src/index.js';

describe('generateMockOHLCV', () => {
  it('generates deterministic bars for same symbol', () => {
    const bars1 = generateMockOHLCV('WALMEX*', 50);
    const bars2 = generateMockOHLCV('WALMEX*', 50);
    expect(bars1).toEqual(bars2);
  });

  it('generates different bars for different symbols', () => {
    const bars1 = generateMockOHLCV('WALMEX*', 50);
    const bars2 = generateMockOHLCV('CEMEXCPO', 50);
    expect(bars1[0].close).not.toEqual(bars2[0].close);
  });

  it('generates correct number of bars', () => {
    const bars = generateMockOHLCV('AMXL', 100);
    expect(bars.length).toBe(100);
  });

  it('bars have valid OHLCV structure', () => {
    const bars = generateMockOHLCV('TEST', 10);
    for (const bar of bars) {
      expect(bar.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(bar.open).toBeGreaterThan(0);
      expect(bar.high).toBeGreaterThanOrEqual(Math.min(bar.open, bar.close));
      expect(bar.low).toBeLessThanOrEqual(Math.max(bar.open, bar.close));
      expect(bar.close).toBeGreaterThan(0);
      expect(bar.volume).toBeGreaterThan(0);
    }
  });
});

describe('indicator helpers', () => {
  const bars = generateMockOHLCV('WALMEX*', 250);

  it('sma returns NaN for insufficient data', () => {
    expect(sma(bars.slice(0, 5), 50)).toBeNaN();
  });

  it('sma computes correct average', () => {
    const simple = [
      { date: '2024-01-01', open: 10, high: 10, low: 10, close: 10, volume: 100 },
      { date: '2024-01-02', open: 20, high: 20, low: 20, close: 20, volume: 100 },
      { date: '2024-01-03', open: 30, high: 30, low: 30, close: 30, volume: 100 },
    ];
    expect(sma(simple, 3)).toBe(20);
  });

  it('rsi returns NaN for insufficient data', () => {
    expect(rsi(bars.slice(0, 5), 14)).toBeNaN();
  });

  it('rsi returns value between 0 and 100', () => {
    const val = rsi(bars, 14);
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThanOrEqual(100);
  });

  it('atr returns NaN for insufficient data', () => {
    expect(atr(bars.slice(0, 5), 20)).toBeNaN();
  });

  it('atr returns positive value', () => {
    const val = atr(bars, 20);
    expect(val).toBeGreaterThan(0);
  });
});

describe('computeSMARegime', () => {
  it('returns insufficient_data with < 200 bars', () => {
    const bars = generateMockOHLCV('TEST', 100);
    const result = computeSMARegime(bars);
    expect(result.signal).toBe('insufficient_data');
  });

  it('returns bullish or bearish with 250 bars', () => {
    const bars = generateMockOHLCV('WALMEX*', 250);
    const result = computeSMARegime(bars);
    expect(['bullish', 'bearish']).toContain(result.signal);
    expect(result.sma50).toBeGreaterThan(0);
    expect(result.sma200).toBeGreaterThan(0);
  });
});

describe('computeRSI', () => {
  it('returns neutral for very short data', () => {
    const bars = generateMockOHLCV('TEST', 5);
    const result = computeRSI(bars);
    expect(result.signal).toBe('neutral');
    expect(result.rsi14).toBe(50);
  });

  it('returns valid signal with 250 bars', () => {
    const bars = generateMockOHLCV('WALMEX*', 250);
    const result = computeRSI(bars);
    expect(['overbought', 'oversold', 'neutral']).toContain(result.signal);
    expect(result.rsi14).toBeGreaterThanOrEqual(0);
    expect(result.rsi14).toBeLessThanOrEqual(100);
  });
});

describe('computeATR', () => {
  it('returns valid signal with 250 bars', () => {
    const bars = generateMockOHLCV('WALMEX*', 250);
    const result = computeATR(bars);
    expect(['high', 'moderate', 'low']).toContain(result.signal);
    expect(result.atr20Pct).toBeGreaterThanOrEqual(0);
  });
});

describe('computeVolumeRatio', () => {
  it('returns valid signal with 250 bars', () => {
    const bars = generateMockOHLCV('WALMEX*', 250);
    const result = computeVolumeRatio(bars);
    expect(['high', 'normal', 'low']).toContain(result.signal);
    expect(result.volumeRatio).toBeGreaterThan(0);
  });
});

describe('computePEValuation', () => {
  it('returns null without fundamentals', () => {
    expect(computePEValuation()).toBeNull();
    expect(computePEValuation({})).toBeNull();
  });

  it('returns cheap for PE < 15', () => {
    const result = computePEValuation({ peRatio: 10 });
    expect(result?.signal).toBe('cheap');
  });

  it('returns fair for PE 15-25', () => {
    const result = computePEValuation({ peRatio: 20 });
    expect(result?.signal).toBe('fair');
  });

  it('returns expensive for PE > 25', () => {
    const result = computePEValuation({ peRatio: 30 });
    expect(result?.signal).toBe('expensive');
  });
});
