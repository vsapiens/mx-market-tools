import type { BMVStock } from './types.js';

export const AVAILABLE_STOCKS: BMVStock[] = [
  // Telecom
  { symbol: 'AMXL',       yahooSymbol: 'AMXB.MX',       name: 'América Móvil',                                exchange: 'BMV', sector: 'Telecom' },
  { symbol: 'MEGACPO',    yahooSymbol: 'MEGACPO.MX',    name: 'Megacable Holdings',                           exchange: 'BMV', sector: 'Telecom' },
  { symbol: 'SITESB-1',   yahooSymbol: 'SITESB-1.MX',   name: 'Sitios Latinoamérica',                         exchange: 'BMV', sector: 'Telecom' },

  // Consumer / Beverages
  { symbol: 'FEMSAUBD',   yahooSymbol: 'FEMSAUBD.MX',   name: 'Fomento Económico Mexicano (FEMSA)',           exchange: 'BMV', sector: 'Consumer' },
  { symbol: 'KOFUBL',     yahooSymbol: 'KOFUBL.MX',     name: 'Coca-Cola FEMSA',                              exchange: 'BMV', sector: 'Beverages' },
  { symbol: 'AC*',        yahooSymbol: 'AC.MX',         name: 'Arca Continental',                             exchange: 'BMV', sector: 'Beverages' },
  { symbol: 'BIMBOA',     yahooSymbol: 'BIMBOA.MX',     name: 'Grupo Bimbo',                                  exchange: 'BMV', sector: 'Consumer' },
  { symbol: 'GRUMAB',     yahooSymbol: 'GRUMAB.MX',     name: 'Gruma',                                        exchange: 'BMV', sector: 'Food' },
  { symbol: 'BACHOCOB',   yahooSymbol: 'BACHOCOB.MX',   name: 'Industrias Bachoco',                           exchange: 'BMV', sector: 'Food' },

  // Retail
  { symbol: 'WALMEX*',    yahooSymbol: 'WALMEX.MX',     name: 'Walmart de México',                            exchange: 'BMV', sector: 'Retail' },
  { symbol: 'CHDRAUIB',   yahooSymbol: 'CHDRAUIB.MX',   name: 'Grupo Chedraui',                               exchange: 'BMV', sector: 'Retail' },
  { symbol: 'SORIANAB',   yahooSymbol: 'SORIANAB.MX',   name: 'Organización Soriana',                         exchange: 'BMV', sector: 'Retail' },
  { symbol: 'LIVEPOLC-1', yahooSymbol: 'LIVEPOLC-1.MX', name: 'El Puerto de Liverpool',                       exchange: 'BMV', sector: 'Retail' },
  { symbol: 'LACOMERUBC', yahooSymbol: 'LACOMERUBC.MX', name: 'La Comer',                                     exchange: 'BMV', sector: 'Retail' },

  // Financial
  { symbol: 'GFINBURO',   yahooSymbol: 'GFINBURO.MX',   name: 'Grupo Financiero Inbursa',                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'GFNORTEO',   yahooSymbol: 'GFNORTEO.MX',   name: 'Grupo Financiero Banorte',                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'BSMXB',      yahooSymbol: 'BSMXB.MX',      name: 'Banco Santander México',                       exchange: 'BMV', sector: 'Financial' },
  { symbol: 'GENTERA',    yahooSymbol: 'GENTERA.MX',    name: 'Gentera',                                      exchange: 'BMV', sector: 'Financial' },
  { symbol: 'BOLSAA',     yahooSymbol: 'BOLSAA.MX',     name: 'Bolsa Mexicana de Valores',                    exchange: 'BMV', sector: 'Financial' },
  { symbol: 'Q*',         yahooSymbol: 'Q.MX',          name: 'Quálitas Controladora',                        exchange: 'BMV', sector: 'Insurance' },

  // Mining / Materials
  { symbol: 'GMEXICOB',   yahooSymbol: 'GMEXICOB.MX',   name: 'Grupo México',                                 exchange: 'BMV', sector: 'Mining' },
  { symbol: 'CEMEXCPO',   yahooSymbol: 'CEMEXCPO.MX',   name: 'CEMEX',                                        exchange: 'BMV', sector: 'Materials' },
  { symbol: 'ALPEKA',     yahooSymbol: 'ALPEKA.MX',     name: 'Alpek',                                        exchange: 'BMV', sector: 'Chemicals' },
  { symbol: 'ORBIA*',     yahooSymbol: 'ORBIA.MX',      name: 'Orbia',                                        exchange: 'BMV', sector: 'Materials' },
  { symbol: 'MFRISCOA-1', yahooSymbol: 'MFRISCOA-1.MX', name: 'Minera Frisco',                                exchange: 'BMV', sector: 'Mining' },

  // Media
  { symbol: 'TLEVICPO',   yahooSymbol: 'TLEVICPO.MX',   name: 'Televisa (Grupo Televisa)',                    exchange: 'BMV', sector: 'Media' },

  // Aviation / Infrastructure
  { symbol: 'GAPB',       yahooSymbol: 'GAPB.MX',       name: 'Aeropuertos del Pacífico (GAP)',               exchange: 'BMV', sector: 'Aviation' },
  { symbol: 'ASURB',      yahooSymbol: 'ASURB.MX',      name: 'Aeropuertos del Sureste (ASUR)',               exchange: 'BMV', sector: 'Aviation' },
  { symbol: 'OMAB',       yahooSymbol: 'OMAB.MX',       name: 'Grupo Aeroportuario Centro Norte (OMA)',       exchange: 'BMV', sector: 'Aviation' },
  { symbol: 'PINFRA*',    yahooSymbol: 'PINFRA.MX',     name: 'Promotora y Operadora de Infraestructura',     exchange: 'BMV', sector: 'Infrastructure' },

  // Real Estate / REITs
  { symbol: 'FUNO11',     yahooSymbol: 'FUNO11.MX',     name: 'Fibra Uno',                                    exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FIBRAPL14',  yahooSymbol: 'FIBRAPL14.MX',  name: 'Fibra Prologis',                               exchange: 'BMV', sector: 'REIT' },
  { symbol: 'VESTA*',     yahooSymbol: 'VESTA.MX',      name: 'Corporación Inmobiliaria Vesta',               exchange: 'BMV', sector: 'Real Estate' },
  { symbol: 'FMTY14',     yahooSymbol: 'FMTY14.MX',     name: 'Fibra Monterrey',                              exchange: 'BMV', sector: 'REIT' },

  // Healthcare
  { symbol: 'LABB',       yahooSymbol: 'LABB.MX',       name: 'Genomma Lab Internacional',                    exchange: 'BMV', sector: 'Healthcare' },

  // Energy
  { symbol: 'IENOVA*',    yahooSymbol: 'IENOVA.MX',     name: 'Infraestructura Energética Nova',              exchange: 'BMV', sector: 'Energy' },
];
