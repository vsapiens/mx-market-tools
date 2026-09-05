import type { BMVStock } from './types.js';
import { BMV_STOCKS } from './catalog-bmv.js';
import { SIC_STOCKS } from './catalog-sic.js';

/**
 * Combined catalog: BMV domestic stocks first, then SIC international stocks.
 * BMV-first ordering gives domestic stocks priority in findStock() lookups.
 */
export const AVAILABLE_STOCKS: BMVStock[] = [...BMV_STOCKS, ...SIC_STOCKS];
