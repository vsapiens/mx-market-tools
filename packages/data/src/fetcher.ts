// fetcher.ts — Yahoo Finance wrapper for Mexican stocks (OHLCV + P/E)
// Graceful degradation: errors never propagate; returns empty data + error message.
// No caching — bring your own.

import type { OHLCVBar, Fundamentals, MarketDataResult } from './types.js';

/**
 * Fetch ~250 trading days of OHLCV data + P/E ratio for a BMV/SIC ticker
 * via yahoo-finance2.
 *
 * @param yahooSymbol - Yahoo Finance symbol (e.g. "WALMEX.MX")
 */
export async function fetchMarketData(
  yahooSymbol: string,
): Promise<MarketDataResult> {
  try {
    // Dynamic import — yahoo-finance2 is a peer dependency
    // @ts-ignore — peer dependency may not be installed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const YahooFinance = (await import('yahoo-finance2')).default as any;
    const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

    // Fetch OHLCV via chart()
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 400); // ~250 trading days

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartResult: any = await yf.chart(yahooSymbol, {
      period1: startDate.toISOString().slice(0, 10),
      period2: endDate.toISOString().slice(0, 10),
      interval: '1d',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quotes: any[] | undefined = chartResult?.quotes;
    if (!quotes || quotes.length === 0) {
      return { bars: [], fundamentals: {}, error: `No chart data returned for ${yahooSymbol}` };
    }

    const bars: OHLCVBar[] = quotes
      .filter((q) => q.date && q.open != null && q.high != null && q.low != null && q.close != null && q.volume != null)
      .map((q) => ({
        date: new Date(q.date).toISOString().slice(0, 10),
        open: Math.round(q.open * 100) / 100,
        high: Math.round(q.high * 100) / 100,
        low: Math.round(q.low * 100) / 100,
        close: Math.round(q.close * 100) / 100,
        volume: Math.round(q.volume),
      }));

    // Fetch P/E ratio via quoteSummary()
    let fundamentals: Fundamentals = {};
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const summary: any = await yf.quoteSummary(yahooSymbol, {
        modules: ['summaryDetail'],
      });
      const pe = summary?.summaryDetail?.trailingPE;
      if (typeof pe === 'number' && isFinite(pe)) {
        fundamentals = { peRatio: Math.round(pe * 100) / 100 };
      }
    } catch {
      // Non-fatal: P/E not available for all tickers
    }

    return { bars, fundamentals };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { bars: [], fundamentals: {}, error: message };
  }
}
