// signals.ts — 5 public technical signals for BMV stocks
// Excludes: drawdown risk, score aggregation, normalization, confidence, decision labels

import type {
  OHLCVBar,
  Fundamentals,
  SMARegimeResult,
  RSIResult,
  ATRResult,
  VolumeRatioResult,
  PEValuationResult,
} from './types.js';
import { sma, rsi, atr } from './indicators.js';

/**
 * Bull/Bear Regime — SMA-50 vs SMA-200 crossover.
 * Bullish when SMA-50 > SMA-200 (golden cross territory).
 */
export function computeSMARegime(bars: OHLCVBar[]): SMARegimeResult {
  const n = bars.length;

  if (n < 200) {
    return {
      sma50: n >= 50 ? sma(bars, 50) : (n > 0 ? sma(bars, n) : 0),
      sma200: 0,
      signal: 'insufficient_data',
    };
  }

  const s50 = sma(bars, 50);
  const s200 = sma(bars, 200);

  return {
    sma50: isNaN(s50) ? 0 : s50,
    sma200: isNaN(s200) ? 0 : s200,
    signal: s50 > s200 ? 'bullish' : 'bearish',
  };
}

/**
 * Momentum — RSI-14 (Relative Strength Index).
 * Overbought > 70, Oversold < 30.
 */
export function computeRSI(bars: OHLCVBar[]): RSIResult {
  const rsi14 = rsi(bars, 14);

  if (isNaN(rsi14)) {
    return { rsi14: 50, signal: 'neutral' };
  }

  let signal: RSIResult['signal'];
  if (rsi14 > 70) signal = 'overbought';
  else if (rsi14 < 30) signal = 'oversold';
  else signal = 'neutral';

  return { rsi14, signal };
}

/**
 * Volatility — ATR-20 as percentage of close price.
 * High > 3%, Moderate 1-3%, Low < 1%.
 */
export function computeATR(bars: OHLCVBar[]): ATRResult {
  const n = bars.length;
  const lastClose = n > 0 ? bars[n - 1].close : 1;
  const atr20 = atr(bars, 20);
  const atr20Pct = isNaN(atr20) ? 0 : (atr20 / lastClose) * 100;

  let signal: ATRResult['signal'];
  if (atr20Pct > 3) signal = 'high';
  else if (atr20Pct >= 1) signal = 'moderate';
  else signal = 'low';

  return { atr20Pct, signal };
}

/**
 * Liquidity Proxy — today's volume vs 30-day average volume.
 * High > 1.5x, Low < 0.5x.
 */
export function computeVolumeRatio(bars: OHLCVBar[]): VolumeRatioResult {
  const n = bars.length;
  const todayVolume = n > 0 ? bars[n - 1].volume : 0;
  const volWindow = bars.slice(Math.max(0, n - 31), n - 1);
  const avgVol30d =
    volWindow.length > 0
      ? volWindow.reduce((a, b) => a + b.volume, 0) / volWindow.length
      : 1;
  const volumeRatio = avgVol30d > 0 ? todayVolume / avgVol30d : 1;

  let signal: VolumeRatioResult['signal'];
  if (volumeRatio > 1.5) signal = 'high';
  else if (volumeRatio < 0.5) signal = 'low';
  else signal = 'normal';

  return { volumeRatio, signal };
}

/**
 * P/E Valuation — Price-to-Earnings ratio assessment.
 * Cheap < 15, Fair 15-25, Expensive > 25.
 */
export function computePEValuation(fundamentals?: Fundamentals): PEValuationResult | null {
  if (!fundamentals?.peRatio) return null;

  const pe = fundamentals.peRatio;
  let signal: PEValuationResult['signal'];
  if (pe < 15) signal = 'cheap';
  else if (pe <= 25) signal = 'fair';
  else signal = 'expensive';

  return { peRatio: pe, signal };
}
