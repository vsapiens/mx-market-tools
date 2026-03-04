import { findStock } from '@mx-market/stocks';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
} from '@mx-market/signals';
import { printAnalysis, printCTA, type AnalysisJSON } from '../format.js';

export async function analyzeCommand(ticker: string, options: { live: boolean; json: boolean }): Promise<void> {
  const stock = findStock(ticker);
  if (!stock) {
    console.error(`Error: Ticker "${ticker}" no encontrado. Usa "mx-market list" para ver las opciones.`);
    process.exit(1);
  }

  let bars;
  let fundamentals;

  if (options.live) {
    try {
      const { fetchMarketData } = await import('@mx-market/data');
      const result = await fetchMarketData(stock.yahooSymbol);
      if (result.error || result.bars.length === 0) {
        console.error(`Error al obtener datos: ${result.error ?? 'Sin datos'}`);
        process.exit(1);
      }
      bars = result.bars;
      fundamentals = result.fundamentals;
    } catch (err) {
      console.error('Error: yahoo-finance2 es necesario para --live. Instálalo con: npm i yahoo-finance2');
      process.exit(1);
    }
  } else {
    bars = generateMockOHLCV(stock.symbol, 250);
    fundamentals = undefined;
  }

  const sma = computeSMARegime(bars);
  const rsiResult = computeRSI(bars);
  const atrResult = computeATR(bars);
  const volume = computeVolumeRatio(bars);
  const pe = computePEValuation(fundamentals);
  const asofDate = bars.length > 0 ? bars[bars.length - 1].date : new Date().toISOString().slice(0, 10);

  if (options.json) {
    const output: AnalysisJSON = {
      symbol: stock.symbol,
      name: stock.name,
      asofDate,
      isLive: options.live,
      signals: { sma, rsi: rsiResult, atr: atrResult, volume, pe },
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  printAnalysis({
    symbol: stock.symbol,
    name: stock.name,
    sma,
    rsi: rsiResult,
    atr: atrResult,
    volume,
    pe,
    asofDate,
    isLive: options.live,
  });

  printCTA();
}
