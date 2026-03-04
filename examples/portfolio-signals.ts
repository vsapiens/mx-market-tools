// Ejemplo: Calcular señales para un portafolio personalizado
// Ejecutar: npx tsx examples/portfolio-signals.ts

import { findStock } from '@mx-market/stocks';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
} from '@mx-market/signals';

// Define tu portafolio
const miPortafolio = ['WALMEX*', 'FEMSAUBD', 'GFNORTEO', 'CEMEXCPO', 'GAPB'];

console.log('\n💼 Señales de mi portafolio\n');

for (const ticker of miPortafolio) {
  const stock = findStock(ticker);
  if (!stock) {
    console.log(`⚠️  ${ticker}: no encontrado`);
    continue;
  }

  const bars = generateMockOHLCV(stock.symbol, 250);
  const sma = computeSMARegime(bars);
  const rsi = computeRSI(bars);
  const atr = computeATR(bars);
  const vol = computeVolumeRatio(bars);

  // Resumen rápido
  const signals = [sma.signal, rsi.signal, atr.signal, vol.signal];
  const positives = signals.filter((s) => ['bullish', 'oversold', 'low', 'high'].includes(s)).length;

  console.log(`${stock.symbol.padEnd(14)} ${stock.name}`);
  console.log(`  SMA: ${sma.signal} | RSI: ${rsi.rsi14.toFixed(1)} (${rsi.signal}) | ATR: ${atr.atr20Pct.toFixed(2)}% | Vol: ${vol.volumeRatio.toFixed(2)}x`);
  console.log(`  Señales positivas: ${positives}/4`);
  console.log('');
}

// CTA
console.log('🤖 Para análisis con IA, narrativas y recomendaciones → mx-stock-analyzer.com');
