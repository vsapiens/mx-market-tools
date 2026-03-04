import chalk from 'chalk';
import type { SMARegimeResult, RSIResult, ATRResult, VolumeRatioResult, PEValuationResult } from '@mx-market/signals';

const CTA = chalk.dim('  🤖 ¿Quieres análisis con IA y narrativas del mercado? → mx-stock-analyzer.com');

export function printCTA(): void {
  console.log('');
  console.log(CTA);
  console.log('');
}

function signalColor(signal: string): string {
  switch (signal) {
    case 'bullish':
    case 'oversold':
    case 'low':
    case 'cheap':
    case 'high':
      return chalk.green(signal);
    case 'bearish':
    case 'overbought':
    case 'expensive':
      return chalk.red(signal);
    case 'insufficient_data':
      return chalk.gray(signal);
    default:
      return chalk.yellow(signal);
  }
}

export interface AnalysisOutput {
  symbol: string;
  name: string;
  sma: SMARegimeResult;
  rsi: RSIResult;
  atr: ATRResult;
  volume: VolumeRatioResult;
  pe: PEValuationResult | null;
  asofDate: string;
  isLive: boolean;
}

export function printAnalysis(data: AnalysisOutput): void {
  const mode = data.isLive ? chalk.green('LIVE') : chalk.yellow('MOCK');
  console.log('');
  console.log(chalk.bold(`  📊 ${data.symbol}`) + chalk.dim(` — ${data.name}`) + `  [${mode}]`);
  console.log(chalk.dim(`  Fecha: ${data.asofDate}`));
  console.log('');
  console.log(`  ${'Señal'.padEnd(22)} ${'Valor'.padEnd(14)} ${'Estado'}`);
  console.log(chalk.dim(`  ${'─'.repeat(50)}`));

  // SMA Regime
  const smaVal = data.sma.signal === 'insufficient_data'
    ? 'N/A'
    : `${data.sma.sma50.toFixed(2)} / ${data.sma.sma200.toFixed(2)}`;
  console.log(`  ${'SMA-50/200'.padEnd(22)} ${smaVal.padEnd(14)} ${signalColor(data.sma.signal)}`);

  // RSI
  console.log(`  ${'RSI-14'.padEnd(22)} ${data.rsi.rsi14.toFixed(2).padEnd(14)} ${signalColor(data.rsi.signal)}`);

  // ATR
  console.log(`  ${'ATR-20 (%)'.padEnd(22)} ${(data.atr.atr20Pct.toFixed(2) + '%').padEnd(14)} ${signalColor(data.atr.signal)}`);

  // Volume
  console.log(`  ${'Volumen (ratio)'.padEnd(22)} ${data.volume.volumeRatio.toFixed(2).padEnd(14)} ${signalColor(data.volume.signal)}`);

  // P/E
  if (data.pe) {
    console.log(`  ${'P/E'.padEnd(22)} ${data.pe.peRatio.toFixed(2).padEnd(14)} ${signalColor(data.pe.signal)}`);
  } else {
    console.log(`  ${'P/E'.padEnd(22)} ${'—'.padEnd(14)} ${chalk.gray('unavailable')}`);
  }

  console.log('');
}

export interface ScanRow {
  symbol: string;
  name: string;
  smaSignal: string;
  rsi14: number;
  atr20Pct: number;
  volumeRatio: number;
  peRatio: number | null;
}

export function printScanTable(rows: ScanRow[], isLive: boolean): void {
  const mode = isLive ? chalk.green('LIVE') : chalk.yellow('MOCK');
  console.log('');
  console.log(chalk.bold(`  📈 Scan de ${rows.length} acciones BMV/SIC`) + `  [${mode}]`);
  console.log('');

  const header = `  ${'Ticker'.padEnd(14)} ${'SMA'.padEnd(10)} ${'RSI'.padEnd(8)} ${'ATR%'.padEnd(8)} ${'Vol'.padEnd(8)} ${'P/E'.padEnd(8)}`;
  console.log(chalk.dim(header));
  console.log(chalk.dim(`  ${'─'.repeat(56)}`));

  for (const row of rows) {
    const sma = signalColor(row.smaSignal).padEnd(10 + 10); // extra for ANSI escape chars
    const rsiStr = row.rsi14.toFixed(1).padEnd(8);
    const atrStr = row.atr20Pct.toFixed(2).padEnd(8);
    const volStr = row.volumeRatio.toFixed(2).padEnd(8);
    const peStr = row.peRatio != null ? row.peRatio.toFixed(1).padEnd(8) : '—'.padEnd(8);
    console.log(`  ${row.symbol.padEnd(14)} ${sma}${rsiStr}${atrStr}${volStr}${peStr}`);
  }

  console.log('');
}

export function printStockList(stocks: Array<{ symbol: string; name: string; sector: string; exchange: string }>): void {
  // Group by sector
  const bySector = new Map<string, typeof stocks>();
  for (const s of stocks) {
    const group = bySector.get(s.sector) ?? [];
    group.push(s);
    bySector.set(s.sector, group);
  }

  console.log('');
  console.log(chalk.bold('  📋 Catálogo de acciones BMV/SIC'));
  console.log(chalk.dim(`  ${stocks.length} acciones disponibles`));
  console.log('');

  for (const [sector, group] of bySector) {
    console.log(chalk.bold.underline(`  ${sector}`));
    for (const s of group) {
      console.log(`    ${chalk.cyan(s.symbol.padEnd(14))} ${s.name}  ${chalk.dim(`[${s.exchange}]`)}`);
    }
    console.log('');
  }
}

export interface AnalysisJSON {
  symbol: string;
  name: string;
  asofDate: string;
  isLive: boolean;
  signals: {
    sma: SMARegimeResult;
    rsi: RSIResult;
    atr: ATRResult;
    volume: VolumeRatioResult;
    pe: PEValuationResult | null;
  };
}
