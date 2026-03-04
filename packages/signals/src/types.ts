export interface OHLCVBar {
  date: string; // ISO date e.g. "2024-01-15"
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Fundamentals {
  peRatio?: number;
  pbRatio?: number;
  marketCapMxn?: number;
}

export interface SMARegimeResult {
  sma50: number;
  sma200: number;
  signal: 'bullish' | 'bearish' | 'insufficient_data';
}

export interface RSIResult {
  rsi14: number;
  signal: 'overbought' | 'oversold' | 'neutral';
}

export interface ATRResult {
  atr20Pct: number; // ATR-20 as % of close price
  signal: 'high' | 'moderate' | 'low';
}

export interface VolumeRatioResult {
  volumeRatio: number; // today's volume / 30d avg volume
  signal: 'high' | 'normal' | 'low';
}

export interface PEValuationResult {
  peRatio: number;
  signal: 'cheap' | 'fair' | 'expensive' | 'unavailable';
}
