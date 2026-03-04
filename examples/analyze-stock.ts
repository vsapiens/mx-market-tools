// Ejemplo: Analizar una acción individual con datos mock
// Ejecutar: npx tsx examples/analyze-stock.ts

import { findStock } from '@mx-market/stocks';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
} from '@mx-market/signals';

// Buscar WALMEX* en el catálogo
const stock = findStock('WALMEX*');
if (!stock) throw new Error('No encontrado');

// Generar datos mock (determinísticos por símbolo)
const bars = generateMockOHLCV(stock.symbol, 250);

// Calcular los 5 indicadores técnicos
const sma = computeSMARegime(bars);
const rsi = computeRSI(bars);
const atr = computeATR(bars);
const volume = computeVolumeRatio(bars);
const pe = computePEValuation({ peRatio: 22.5 }); // P/E manual para demo

console.log(`\n📊 Análisis de ${stock.name} (${stock.symbol})\n`);
console.log('SMA Régimen:', sma.signal, `(SMA50: ${sma.sma50.toFixed(2)}, SMA200: ${sma.sma200.toFixed(2)})`);
console.log('RSI-14:', rsi.rsi14.toFixed(2), `(${rsi.signal})`);
console.log('ATR-20:', atr.atr20Pct.toFixed(2) + '%', `(${atr.signal})`);
console.log('Volumen:', volume.volumeRatio.toFixed(2) + 'x', `(${volume.signal})`);
if (pe) console.log('P/E:', pe.peRatio.toFixed(2), `(${pe.signal})`);
