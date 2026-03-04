// Ejemplo: Escanear todas las acciones y ordenar por RSI
// Ejecutar: npx tsx examples/scan-all.ts

import { AVAILABLE_STOCKS } from '@mx-market/stocks';
import { generateMockOHLCV, computeRSI } from '@mx-market/signals';

// Calcular RSI para cada acción
const results = AVAILABLE_STOCKS.map((stock) => {
  const bars = generateMockOHLCV(stock.symbol, 250);
  const rsi = computeRSI(bars);
  return { symbol: stock.symbol, name: stock.name, rsi14: rsi.rsi14, signal: rsi.signal };
});

// Ordenar por RSI (acciones más sobrevendidas primero)
results.sort((a, b) => a.rsi14 - b.rsi14);

console.log('\n📈 Ranking por RSI-14 (más sobrevendidas arriba)\n');
console.log(`${'Ticker'.padEnd(14)} ${'RSI'.padEnd(8)} Estado`);
console.log('─'.repeat(36));

for (const r of results) {
  const emoji = r.signal === 'oversold' ? '🟢' : r.signal === 'overbought' ? '🔴' : '🟡';
  console.log(`${r.symbol.padEnd(14)} ${r.rsi14.toFixed(1).padEnd(8)} ${emoji} ${r.signal}`);
}
