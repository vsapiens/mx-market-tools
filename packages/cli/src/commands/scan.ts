import { AVAILABLE_STOCKS } from '@mx-market/stocks';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
} from '@mx-market/signals';
import { printScanTable, printCTA, type ScanRow } from '../format.js';

export async function scanCommand(options: { live: boolean; json: boolean }): Promise<void> {
  const rows: ScanRow[] = [];

  for (const stock of AVAILABLE_STOCKS) {
    let bars;
    let fundamentals;

    if (options.live) {
      try {
        const { fetchMarketData } = await import('@mx-market/data');
        const result = await fetchMarketData(stock.yahooSymbol);
        if (result.error || result.bars.length === 0) continue;
        bars = result.bars;
        fundamentals = result.fundamentals;
      } catch {
        continue;
      }
    } else {
      bars = generateMockOHLCV(stock.symbol, 250);
    }

    const sma = computeSMARegime(bars);
    const rsiResult = computeRSI(bars);
    const atrResult = computeATR(bars);
    const volume = computeVolumeRatio(bars);
    const pe = computePEValuation(fundamentals);

    rows.push({
      symbol: stock.symbol,
      name: stock.name,
      smaSignal: sma.signal,
      rsi14: rsiResult.rsi14,
      atr20Pct: atrResult.atr20Pct,
      volumeRatio: volume.volumeRatio,
      peRatio: pe?.peRatio ?? null,
    });
  }

  if (options.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  printScanTable(rows, options.live);
  printCTA();
}
