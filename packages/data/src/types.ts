export interface OHLCVBar {
  date: string;
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

export interface MarketDataResult {
  bars: OHLCVBar[];
  fundamentals: Fundamentals;
  error?: string;
}
