#!/usr/bin/env node

import { Command } from 'commander';
import { analyzeCommand } from './commands/analyze.js';
import { scanCommand } from './commands/scan.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('mx-market')
  .description('Herramientas de análisis técnico para acciones de la BMV')
  .version('0.1.0');

program
  .command('analyze <ticker>')
  .description('Calcula 5 indicadores técnicos para una acción')
  .option('--live', 'Usar datos reales de Yahoo Finance (requiere yahoo-finance2)', false)
  .option('--json', 'Salida en formato JSON', false)
  .action(analyzeCommand);

program
  .command('scan')
  .description('Escanea las 39 acciones y muestra indicadores')
  .option('--live', 'Usar datos reales de Yahoo Finance (requiere yahoo-finance2)', false)
  .option('--json', 'Salida en formato JSON', false)
  .action(scanCommand);

program
  .command('list')
  .description('Muestra el catálogo de acciones por sector')
  .option('--json', 'Salida en formato JSON', false)
  .action(listCommand);

program.parse();
