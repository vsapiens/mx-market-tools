// @mx-market/signals — Indicadores técnicos para acciones de la BMV

export type {
  OHLCVBar,
  Fundamentals,
  SMARegimeResult,
  RSIResult,
  ATRResult,
  VolumeRatioResult,
  PEValuationResult,
} from './types.js';

export {
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
} from './signals.js';

export { sma, rsi, atr } from './indicators.js';

export { generateMockOHLCV } from './mock.js';
