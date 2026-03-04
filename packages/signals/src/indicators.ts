// indicators.ts — Low-level technical indicator computations (SMA, RSI, ATR)
// All functions are pure (no side effects, no I/O).

import type { OHLCVBar } from './types.js';

/**
 * Simple moving average of close prices over the last `period` bars.
 * Returns NaN if there are fewer bars than the period.
 */
export function sma(bars: OHLCVBar[], period: number): number {
  if (bars.length < period) return NaN;
  const slice = bars.slice(bars.length - period);
  const sum = slice.reduce((acc, b) => acc + b.close, 0);
  return sum / period;
}

/**
 * Wilder RSI over `period` bars (requires period+1 bars minimum).
 * Uses Wilder smoothing (RMA) for avg gains and losses.
 */
export function rsi(bars: OHLCVBar[], period: number): number {
  if (bars.length < period + 1) return NaN;

  const relevant = bars.slice(Math.max(0, bars.length - (period * 3 + 1)));
  if (relevant.length < period + 1) return NaN;

  const changes: number[] = [];
  for (let i = 1; i < relevant.length; i++) {
    changes.push(relevant[i].close - relevant[i - 1].close);
  }

  let avgGain = 0;
  let avgLoss = 0;
  for (let i = 0; i < period; i++) {
    const c = changes[i];
    if (c > 0) avgGain += c;
    else avgLoss += Math.abs(c);
  }
  avgGain /= period;
  avgLoss /= period;

  for (let i = period; i < changes.length; i++) {
    const c = changes[i];
    const gain = c > 0 ? c : 0;
    const loss = c < 0 ? Math.abs(c) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

/**
 * Average True Range using Wilder smoothing over `period` bars.
 * Requires at least period+1 bars (to compute true ranges).
 */
export function atr(bars: OHLCVBar[], period: number): number {
  if (bars.length < period + 1) return NaN;

  const relevant = bars.slice(Math.max(0, bars.length - (period * 3 + 1)));
  if (relevant.length < period + 1) return NaN;

  const trs: number[] = [];
  for (let i = 1; i < relevant.length; i++) {
    const cur = relevant[i];
    const prev = relevant[i - 1];
    const tr = Math.max(
      cur.high - cur.low,
      Math.abs(cur.high - prev.close),
      Math.abs(cur.low - prev.close)
    );
    trs.push(tr);
  }

  let atrVal = trs.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < trs.length; i++) {
    atrVal = (atrVal * (period - 1) + trs[i]) / period;
  }

  return atrVal;
}
