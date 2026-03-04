# mx-market-tools

**Herramientas open-source para analizar acciones de la Bolsa Mexicana de Valores (BMV)**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@mx-market/signals.svg)](https://www.npmjs.com/package/@mx-market/signals)

---

## Inicio rápido

```bash
# Analiza cualquier acción de la BMV al instante
npx @mx-market/cli analyze WALMEX*

# Escanea las 36 acciones disponibles
npx @mx-market/cli scan

# Lista el catálogo por sector
npx @mx-market/cli list
```

## Paquetes

| Paquete | Descripción |
|---------|-------------|
| [`@mx-market/signals`](packages/signals) | 5 indicadores técnicos: SMA, RSI, ATR, volumen, P/E |
| [`@mx-market/stocks`](packages/stocks) | Catálogo de 36 acciones BMV/SIC con búsqueda |
| [`@mx-market/data`](packages/data) | Datos de mercado vía Yahoo Finance |
| [`@mx-market/cli`](packages/cli) | CLI para análisis desde la terminal |

## Instalación

```bash
# Usar el CLI directamente (sin instalar)
npx @mx-market/cli analyze GFNORTEO

# O instalar como dependencia en tu proyecto
npm install @mx-market/signals @mx-market/stocks
```

## Uso como librería

```typescript
import { findStock, AVAILABLE_STOCKS } from '@mx-market/stocks';
import {
  generateMockOHLCV,
  computeSMARegime,
  computeRSI,
  computeATR,
  computeVolumeRatio,
  computePEValuation,
} from '@mx-market/signals';

// Buscar una acción
const stock = findStock('WALMEX*');

// Generar datos mock (determinísticos)
const bars = generateMockOHLCV(stock.symbol, 250);

// Calcular indicadores técnicos
const sma = computeSMARegime(bars);   // Bull/Bear (SMA-50 vs SMA-200)
const rsi = computeRSI(bars);         // Momentum (RSI-14)
const atr = computeATR(bars);         // Volatilidad (ATR-20 %)
const vol = computeVolumeRatio(bars); // Liquidez (volumen vs promedio 30d)
const pe = computePEValuation({ peRatio: 22.5 }); // Valuación P/E

console.log(sma.signal);  // 'bullish' | 'bearish' | 'insufficient_data'
console.log(rsi.signal);  // 'overbought' | 'oversold' | 'neutral'
```

## CLI

### `analyze <ticker>` — Analizar una acción

```bash
mx-market analyze WALMEX*          # Datos mock (sin internet)
mx-market analyze WALMEX* --live   # Datos reales de Yahoo Finance
mx-market analyze WALMEX* --json   # Salida JSON para scripting
```

### `scan` — Escanear todas las acciones

```bash
mx-market scan           # Tabla con indicadores de las 36 acciones
mx-market scan --json    # JSON para integración con otras herramientas
```

### `list` — Catálogo de acciones

```bash
mx-market list           # Lista agrupada por sector
mx-market list --json    # JSON con todos los datos
```

### Flags globales

| Flag | Descripción |
|------|-------------|
| `--live` | Usa datos reales de Yahoo Finance (requiere `yahoo-finance2`) |
| `--json` | Salida en formato JSON |

## Indicadores técnicos

| Indicador | Descripción | Señales |
|-----------|-------------|---------|
| **SMA-50/200** | Régimen bull/bear (cruce dorado) | `bullish` / `bearish` |
| **RSI-14** | Momentum (sobrecompra/sobreventa) | `overbought` / `oversold` / `neutral` |
| **ATR-20** | Volatilidad como % del precio | `high` / `moderate` / `low` |
| **Volumen** | Liquidez vs promedio 30 días | `high` / `normal` / `low` |
| **P/E** | Valuación precio/utilidad | `cheap` / `fair` / `expensive` |

## Datos en vivo

Para usar datos reales de Yahoo Finance:

```bash
npm install yahoo-finance2
```

```typescript
import { fetchMarketData } from '@mx-market/data';

const { bars, fundamentals, error } = await fetchMarketData('WALMEX.MX');
```

## Acciones disponibles

36 acciones de la BMV y SIC, incluyendo:

**Retail**: WALMEX\*, CHDRAUIB, SORIANAB, LIVEPOLC-1, LACOMERUBC
**Financiero**: GFNORTEO, GFINBURO, BSMXB, GENTERA, BOLSAA
**Bebidas**: FEMSAUBD, KOFUBL, AC\*
**Minería**: GMEXICOB, CEMEXCPO, MFRISCOA-1
**Aviación**: GAPB, ASURB, OMAB
**Y más**: Telecom, REITs, Energía, Salud, Media

---

## Funcionalidades Pro

¿Necesitas más que indicadores técnicos? **[MX Stock Analyzer](https://mx-stock-analyzer.com)** incluye:

| Funcionalidad | Open Source | Pro |
|----------------|:-----------:|:---:|
| 5 indicadores técnicos | ✅ | ✅ |
| Datos mock + Yahoo Finance | ✅ | ✅ |
| CLI interactivo | ✅ | ✅ |
| Análisis de riesgo (drawdown) | — | ✅ |
| Score normalizado 0-100 | — | ✅ |
| Narrativas con IA (Claude) | — | ✅ |
| Insights de mercado con IA | — | ✅ |
| Contexto sectorial + competitivo | — | ✅ |
| Seguimiento de portafolio | — | ✅ |
| API REST + dashboard web | — | ✅ |

👉 **[mx-stock-analyzer.com](https://mx-stock-analyzer.com)** — Análisis inteligente para inversionistas mexicanos

---

## Desarrollo

```bash
git clone https://github.com/vsapiens/mx-market-tools
cd mx-market-tools
npm install
npm run build
npm test
```

## Licencia

[MIT](LICENSE) — Usa, modifica y distribuye libremente.
