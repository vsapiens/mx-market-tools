# mx-market-tools

**Herramientas open-source para analizar acciones de la Bolsa Mexicana de Valores (BMV)**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@mx-market/signals.svg)](https://www.npmjs.com/package/@mx-market/signals)

## Overview

mx-market-tools is an open-source TypeScript monorepo that provides technical analysis tools for Mexican stock market (BMV) equities. It ships a CLI for instant terminal-based analysis and a set of npm packages you can use as libraries in your own projects. All indicators work offline with deterministic mock data, and optionally connect to Yahoo Finance for live market data.

## Features

- **5 technical indicators** — SMA regime (50/200 golden cross), RSI-14 momentum, ATR-20 volatility, volume ratio liquidity, and P/E valuation
- **36-stock catalog** — Curated BMV/SIC equities across 14 sectors with Yahoo Finance symbol mapping
- **CLI with three commands** — `analyze`, `scan`, and `list` with colored terminal output and JSON export
- **Offline-first** — Deterministic mock OHLCV data seeded by ticker symbol; no internet required
- **Live data** — Optional Yahoo Finance integration for real OHLCV prices and P/E ratios
- **Fuzzy search** — Look up stocks by symbol, company name, or sector

## Tech Stack

- **Language:** TypeScript (ES2020, strict mode)
- **Runtime:** Node.js >= 18
- **Monorepo:** npm workspaces
- **CLI:** [Commander.js](https://github.com/tj/commander.js) + [Chalk](https://github.com/chalk/chalk)
- **Market data:** [yahoo-finance2](https://github.com/gadicc/node-yahoo-finance2) (optional peer dependency)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** TypeScript `--noEmit` type checking
- **Git hooks:** [Husky](https://typicode.github.io/husky/)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 7+ (for workspace support)

### Installation

```bash
# Use the CLI directly without installing
npx @mx-market/cli analyze GFNORTEO

# Or install packages as dependencies in your project
npm install @mx-market/signals @mx-market/stocks
```

### Development Setup

```bash
git clone https://github.com/vsapiens/mx-market-tools
cd mx-market-tools
npm install
npm run build
npm test
```

## CLI

### `analyze <ticker>` — Analizar una accion

```bash
mx-market analyze WALMEX*          # Datos mock (sin internet)
mx-market analyze WALMEX* --live   # Datos reales de Yahoo Finance
mx-market analyze WALMEX* --json   # Salida JSON para scripting
```

### `scan` — Escanear todas las acciones

```bash
mx-market scan           # Tabla con indicadores de las 36 acciones
mx-market scan --json    # JSON para integracion con otras herramientas
```

### `list` — Catalogo de acciones

```bash
mx-market list           # Lista agrupada por sector
mx-market list --json    # JSON con todos los datos
```

### Global Flags

| Flag | Description |
|------|-------------|
| `--live` | Use real-time data from Yahoo Finance (requires `yahoo-finance2`) |
| `--json` | Output in JSON format |

## Library Usage

```typescript
import { findStock, searchStocks, AVAILABLE_STOCKS } from '@mx-market/stocks';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
} from '@mx-market/signals';

// Look up a stock
const stock = findStock('WALMEX*');

// Generate deterministic mock data (seeded by symbol)
const bars = generateMockOHLCV(stock.symbol, 250);

// Compute technical indicators
const sma = computeSMARegime(bars);   // Bull/Bear (SMA-50 vs SMA-200)
const rsi = computeRSI(bars);         // Momentum (RSI-14)
const atr = computeATR(bars);         // Volatility (ATR-20 %)
const vol = computeVolumeRatio(bars); // Liquidity (volume vs 30d avg)
const pe = computePEValuation({ peRatio: 22.5 }); // P/E valuation

console.log(sma.signal);  // 'bullish' | 'bearish' | 'insufficient_data'
console.log(rsi.signal);  // 'overbought' | 'oversold' | 'neutral'
```

### Live Market Data

```bash
npm install yahoo-finance2
```

```typescript
import { fetchMarketData } from '@mx-market/data';

const { bars, fundamentals, error } = await fetchMarketData('WALMEX.MX');
```

## Technical Indicators

| Indicator | Description | Signals |
|-----------|-------------|---------|
| **SMA-50/200** | Bull/bear regime (golden cross) | `bullish` / `bearish` |
| **RSI-14** | Momentum (overbought/oversold) | `overbought` / `oversold` / `neutral` |
| **ATR-20** | Volatility as % of price | `high` / `moderate` / `low` |
| **Volume** | Liquidity vs 30-day average | `high` / `normal` / `low` |
| **P/E** | Price-to-earnings valuation | `cheap` / `fair` / `expensive` |

## Available Stocks

36 BMV and SIC equities across 14 sectors:

**Retail:** WALMEX\*, CHDRAUIB, SORIANAB, LIVEPOLC-1, LACOMERUBC
**Financial:** GFNORTEO, GFINBURO, BSMXB, GENTERA, BOLSAA, Q\*
**Beverages / Consumer:** FEMSAUBD, KOFUBL, AC\*, BIMBOA, GRUMAB, BACHOCOB
**Mining / Materials:** GMEXICOB, CEMEXCPO, ALPEKA, ORBIA\*, MFRISCOA-1
**Aviation / Infrastructure:** GAPB, ASURB, OMAB, PINFRA\*
**REITs / Real Estate:** FUNO11, FIBRAPL14, VESTA\*, FMTY14
**Telecom:** AMXL, MEGACPO, SITESB-1
**Other:** TLEVICPO (Media), LABB (Healthcare), IENOVA\* (Energy)

## Packages

| Package | Description |
|---------|-------------|
| [`@mx-market/signals`](packages/signals) | 5 technical indicators: SMA, RSI, ATR, volume, P/E |
| [`@mx-market/stocks`](packages/stocks) | Catalog of 36 BMV/SIC stocks with search |
| [`@mx-market/data`](packages/data) | Market data via Yahoo Finance |
| [`@mx-market/cli`](packages/cli) | CLI for terminal-based analysis |

## Project Structure

```
mx-market-tools/
├── packages/
│   ├── cli/           # CLI app (Commander.js + Chalk)
│   ├── data/          # Yahoo Finance fetcher
│   ├── signals/       # Technical indicators + mock OHLCV generator
│   └── stocks/        # BMV stock catalog + search
├── examples/          # Usage examples (analyze, scan, portfolio)
├── scripts/           # Utility scripts
├── tsconfig.base.json # Shared TypeScript config
└── vitest.config.ts   # Test configuration
```

---

## Pro Features

Need more than technical indicators? **[MX Stock Analyzer](https://mx-stock-analyzer.com)** includes:

| Feature | Open Source | Pro |
|---------|:-----------:|:---:|
| 5 technical indicators | Yes | Yes |
| Mock data + Yahoo Finance | Yes | Yes |
| Interactive CLI | Yes | Yes |
| Risk analysis (drawdown) | -- | Yes |
| Normalized score 0-100 | -- | Yes |
| AI narratives (Claude) | -- | Yes |
| AI market insights | -- | Yes |
| Sector + competitive context | -- | Yes |
| Portfolio tracking | -- | Yes |
| REST API + web dashboard | -- | Yes |

**[mx-stock-analyzer.com](https://mx-stock-analyzer.com)** — Intelligent analysis for Mexican investors

---

## License

[MIT](LICENSE) — Use, modify, and distribute freely.
