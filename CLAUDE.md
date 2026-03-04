# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is a TypeScript monorepo using npm workspaces.

```bash
npm install         # Install all dependencies
npm run build       # Build all packages (tsc per workspace)
npm test            # Run tests (vitest)
npm run test:watch  # Watch mode
npm run lint        # Type-check (tsc --noEmit)
```

## Package Architecture

| Package | Purpose | Exports |
|---------|---------|---------|
| `@mx-market/signals` | 5 technical indicators (SMA, RSI, ATR, Volume, P/E) + mock OHLCV generator | `sma`, `rsi`, `atr`, `computeSMARegime`, `computeRSI`, `computeATR`, `computeVolumeRatio`, `computePEValuation`, `generateMockOHLCV` |
| `@mx-market/stocks` | 39-stock BMV/SIC catalog with search | `AVAILABLE_STOCKS`, `searchStocks`, `findStock`, `toYahooSymbol`, `BMVStock` |
| `@mx-market/data` | Yahoo Finance fetcher (OHLCV + P/E) | `fetchMarketData`, `MarketDataResult` |
| `@mx-market/cli` | CLI tool (`mx-market analyze/scan/list`) | Binary entry point |

### Key Design Decisions
- All indicator functions are **pure** (no side effects, no I/O)
- `yahoo-finance2` is an **optional peer dependency** — graceful fallback to mock data
- Mock OHLCV is **deterministic** (symbol-seeded PRNG) for reproducible tests/demos
- Each package builds independently via `tsc` with shared `tsconfig.base.json`
- ESM-only (`"type": "module"`) with `.js` import extensions

## Security Boundary — What NEVER Goes Here

This is a **public, open-source** repository. The following are proprietary to [mx-stock-analyzer](https://github.com/vsapiens/mx-stock-analyzer) and must NEVER appear in this repo:

- **Scoring/normalization**: `computeSignals()`, `normalizedScore`, `maxDrawdown()`, `drawdown_risk`, score aggregation
- **LLM integration**: `buildPrompt()`, Claude API calls, narrative generation, `PortfolioDecision`
- **Tier system**: `getTierFeatures()`, `TIER_FEATURES`, tier-gated logic
- **Infrastructure**: API keys, Supabase schemas, Redis caching, Stripe billing, rate limiting
- **Auth/session**: JWT handling, subscription validation, quota management

**Rule of thumb**: If it computes a score, generates text, or touches a paid service, it belongs in the private repo.

## Relationship to mx-stock-analyzer

This repo is the **open-source foundation** consumed by the private `mx-stock-analyzer` SaaS:

```
mx-market-tools (public, MIT)          mx-stock-analyzer (private)
├── @mx-market/signals  ─────────────> src/lib/signals.ts (adapter)
├── @mx-market/stocks   ─────────────> src/lib/stocks.ts (re-export)
├── @mx-market/data     ─────────────> src/lib/market-data.ts (adapter)
└── @mx-market/cli                     └── + proprietary scoring, LLM, tiers, auth, billing
```

The private repo adds: drawdown risk, normalized scoring (0-100), AI narratives via Claude, tier-gated features, portfolio tracking, Supabase persistence, Redis caching, Stripe payments, and a Next.js web dashboard.
