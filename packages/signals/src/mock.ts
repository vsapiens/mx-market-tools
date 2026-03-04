// mock.ts — Deterministic OHLCV generator seeded by symbol string

import type { OHLCVBar } from './types.js';

/**
 * Generate a deterministic sequence of OHLCV bars for a given symbol.
 * The price walk is seeded from the symbol string so the same ticker always
 * produces the same data — useful for tests and demos.
 *
 * Prices start around 50 MXN with realistic daily moves (+/-2%).
 * Volume is roughly 1 million shares/day with +/-40% noise.
 */
export function generateMockOHLCV(symbol: string, days: number = 250): OHLCVBar[] {
  let seed = 0;
  for (let i = 0; i < symbol.length; i++) {
    seed = (seed * 31 + symbol.charCodeAt(i)) >>> 0;
  }

  function nextRand(): number {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  function randn(): number {
    const u1 = Math.max(nextRand(), 1e-10);
    const u2 = nextRand();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  const bars: OHLCVBar[] = [];
  let close = 50 + nextRand() * 50;
  const baseVolume = 500_000 + nextRand() * 1_500_000;

  const today = new Date();
  const dates: string[] = [];
  const cursor = new Date(today);
  while (dates.length < days) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      dates.unshift(cursor.toISOString().slice(0, 10));
    }
    cursor.setDate(cursor.getDate() - 1);
  }

  for (const date of dates) {
    const dailyReturn = 0.0002 + randn() * 0.012;
    const open = close * (1 + randn() * 0.005);
    close = open * (1 + dailyReturn);

    const highFactor = 1 + Math.abs(randn()) * 0.015;
    const lowFactor = 1 - Math.abs(randn()) * 0.015;
    const high = Math.max(open, close) * highFactor;
    const low = Math.min(open, close) * lowFactor;

    const volume = Math.round(baseVolume * (0.6 + nextRand() * 0.8));

    bars.push({
      date,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume,
    });
  }

  return bars;
}
