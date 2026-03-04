import { AVAILABLE_STOCKS } from '@mx-market/stocks';
import { printStockList, printCTA } from '../format.js';

export function listCommand(options: { json: boolean }): void {
  if (options.json) {
    console.log(JSON.stringify(AVAILABLE_STOCKS, null, 2));
    return;
  }

  printStockList(AVAILABLE_STOCKS);
  printCTA();
}
