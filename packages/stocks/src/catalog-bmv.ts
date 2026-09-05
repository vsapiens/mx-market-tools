import type { BMVStock } from './types.js';

/**
 * BMV (Bolsa Mexicana de Valores) domestic stock catalog.
 * ~145 actively traded Mexican equities.
 */
export const BMV_STOCKS: BMVStock[] = [
  // ── Telecom ───────────────────────────────────────────────────────────────────
  { symbol: 'AMXL',       yahooSymbol: 'AMXB.MX',       name: 'América Móvil',                                exchange: 'BMV', sector: 'Telecom' },
  { symbol: 'MEGACPO',    yahooSymbol: 'MEGACPO.MX',    name: 'Megacable Holdings',                           exchange: 'BMV', sector: 'Telecom' },
  { symbol: 'SITESB-1',   yahooSymbol: 'SITESB-1.MX',   name: 'Sitios Latinoamérica',                         exchange: 'BMV', sector: 'Telecom' },
  { symbol: 'AXTELCPO',   yahooSymbol: 'AXTELCPO.MX',   name: 'Axtel',                                        exchange: 'BMV', sector: 'Telecom' },
  { symbol: 'TOTALPL',    yahooSymbol: 'TOTALPL.MX',    name: 'Total Play Telecomunicaciones',                exchange: 'BMV', sector: 'Telecom' },

  // ── Consumer / Beverages ──────────────────────────────────────────────────────
  { symbol: 'FEMSAUBD',   yahooSymbol: 'FEMSAUBD.MX',   name: 'Fomento Económico Mexicano (FEMSA)',           exchange: 'BMV', sector: 'Consumer' },
  { symbol: 'KOFUBL',     yahooSymbol: 'KOFUBL.MX',     name: 'Coca-Cola FEMSA',                              exchange: 'BMV', sector: 'Beverages' },
  { symbol: 'AC*',        yahooSymbol: 'AC.MX',         name: 'Arca Continental',                             exchange: 'BMV', sector: 'Beverages' },
  { symbol: 'CUERVO*',    yahooSymbol: 'CUERVO.MX',     name: 'Becle (José Cuervo)',                          exchange: 'BMV', sector: 'Beverages' },
  { symbol: 'CULTIBAB',   yahooSymbol: 'CULTIBAB.MX',   name: 'Cultivar',                                     exchange: 'BMV', sector: 'Beverages' },

  // ── Food ──────────────────────────────────────────────────────────────────────
  { symbol: 'BIMBOA',     yahooSymbol: 'BIMBOA.MX',     name: 'Grupo Bimbo',                                  exchange: 'BMV', sector: 'Food' },
  { symbol: 'GRUMAB',     yahooSymbol: 'GRUMAB.MX',     name: 'Gruma',                                        exchange: 'BMV', sector: 'Food' },
  { symbol: 'BACHOCOB',   yahooSymbol: 'BACHOCOB.MX',   name: 'Industrias Bachoco',                           exchange: 'BMV', sector: 'Food' },
  { symbol: 'HERDEZ*',    yahooSymbol: 'HERDEZ.MX',     name: 'Grupo Herdez',                                 exchange: 'BMV', sector: 'Food' },
  { symbol: 'LALAB',      yahooSymbol: 'LALAB.MX',      name: 'Grupo Lala',                                   exchange: 'BMV', sector: 'Food' },
  { symbol: 'MINSA*',     yahooSymbol: 'MINSAB.MX',     name: 'Grupo Minsa',                                  exchange: 'BMV', sector: 'Food' },

  // ── Consumer Products ─────────────────────────────────────────────────────────
  { symbol: 'KIMBERA',    yahooSymbol: 'KIMBERA.MX',    name: 'Kimberly-Clark de México',                     exchange: 'BMV', sector: 'Consumer Products' },
  { symbol: 'ALSEA*',     yahooSymbol: 'ALSEA.MX',      name: 'Alsea',                                        exchange: 'BMV', sector: 'Consumer Products' },

  // ── Retail ────────────────────────────────────────────────────────────────────
  { symbol: 'WALMEX*',    yahooSymbol: 'WALMEX.MX',     name: 'Walmart de México',                            exchange: 'BMV', sector: 'Retail' },
  { symbol: 'CHDRAUIB',   yahooSymbol: 'CHDRAUIB.MX',   name: 'Grupo Chedraui',                               exchange: 'BMV', sector: 'Retail' },
  { symbol: 'SORIANAB',   yahooSymbol: 'SORIANAB.MX',   name: 'Organización Soriana',                         exchange: 'BMV', sector: 'Retail' },
  { symbol: 'LIVEPOLC-1', yahooSymbol: 'LIVEPOLC-1.MX', name: 'El Puerto de Liverpool',                       exchange: 'BMV', sector: 'Retail' },
  { symbol: 'LACOMERUBC', yahooSymbol: 'LACOMERUBC.MX', name: 'La Comer',                                     exchange: 'BMV', sector: 'Retail' },
  { symbol: 'ELEKTRA*',   yahooSymbol: 'ELEKTRA.MX',    name: 'Grupo Elektra',                                exchange: 'BMV', sector: 'Retail' },
  { symbol: 'GCARSOA1',   yahooSymbol: 'GCARSOA1.MX',   name: 'Grupo Carso',                                  exchange: 'BMV', sector: 'Retail' },
  { symbol: 'COPPEL',     yahooSymbol: 'COPPEL.MX',     name: 'Coppel',                                       exchange: 'BMV', sector: 'Retail' },

  // ── Financial ─────────────────────────────────────────────────────────────────
  { symbol: 'GFINBURO',   yahooSymbol: 'GFINBURO.MX',   name: 'Grupo Financiero Inbursa',                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'GFNORTEO',   yahooSymbol: 'GFNORTEO.MX',   name: 'Grupo Financiero Banorte',                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'BSMXB',      yahooSymbol: 'BSMXB.MX',      name: 'Banco Santander México',                       exchange: 'BMV', sector: 'Financial' },
  { symbol: 'GENTERA',    yahooSymbol: 'GENTERA.MX',    name: 'Gentera',                                      exchange: 'BMV', sector: 'Financial' },
  { symbol: 'BOLSAA',     yahooSymbol: 'BOLSAA.MX',     name: 'Bolsa Mexicana de Valores',                    exchange: 'BMV', sector: 'Financial' },
  { symbol: 'GFREGIOO',   yahooSymbol: 'GFREGIOO.MX',   name: 'Banregio Grupo Financiero',                    exchange: 'BMV', sector: 'Financial' },
  { symbol: 'CREAL*',     yahooSymbol: 'CREAL.MX',      name: 'Crédito Real',                                 exchange: 'BMV', sector: 'Financial' },
  { symbol: 'FINDEP*',    yahooSymbol: 'FINDEP.MX',     name: 'Financiera Independencia',                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'UNIFINA',    yahooSymbol: 'UNIFINA.MX',    name: 'Unifin Financiera',                            exchange: 'BMV', sector: 'Financial' },
  { symbol: 'BBAJIOO',    yahooSymbol: 'BBAJIOO.MX',    name: 'BanBajío',                                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'MONEXB',     yahooSymbol: 'MONEXB.MX',     name: 'Monex Grupo Financiero',                       exchange: 'BMV', sector: 'Financial' },
  { symbol: 'GFMULTIO',   yahooSymbol: 'GFMULTIO.MX',   name: 'Grupo Financiero Multiva',                     exchange: 'BMV', sector: 'Financial' },
  { symbol: 'CIBANCOB',   yahooSymbol: 'CIBANCOB.MX',   name: 'CIBanco',                                      exchange: 'BMV', sector: 'Financial' },
  { symbol: 'ACTINVRB',   yahooSymbol: 'ACTINVRB.MX',   name: 'Corporación Actinver',                         exchange: 'BMV', sector: 'Financial' },
  { symbol: 'VALUEGFO',   yahooSymbol: 'VALUEGFO.MX',   name: 'Value Grupo Financiero',                       exchange: 'BMV', sector: 'Financial' },
  { symbol: 'RA*',        yahooSymbol: 'RA.MX',         name: 'Regional SAB',                                 exchange: 'BMV', sector: 'Financial' },

  // ── Insurance ─────────────────────────────────────────────────────────────────
  { symbol: 'Q*',         yahooSymbol: 'Q.MX',          name: 'Quálitas Controladora',                        exchange: 'BMV', sector: 'Insurance' },

  // ── Mining ────────────────────────────────────────────────────────────────────
  { symbol: 'GMEXICOB',   yahooSymbol: 'GMEXICOB.MX',   name: 'Grupo México',                                 exchange: 'BMV', sector: 'Mining' },
  { symbol: 'PENOLES*',   yahooSymbol: 'PENOLES.MX',    name: 'Industrias Peñoles',                           exchange: 'BMV', sector: 'Mining' },
  { symbol: 'MFRISCOA-1', yahooSymbol: 'MFRISCOA-1.MX', name: 'Minera Frisco',                                exchange: 'BMV', sector: 'Mining' },
  { symbol: 'AUTLANB',    yahooSymbol: 'AUTLANB.MX',    name: 'Compañía Minera Autlán',                       exchange: 'BMV', sector: 'Mining' },

  // ── Materials / Chemicals ─────────────────────────────────────────────────────
  { symbol: 'CEMEXCPO',   yahooSymbol: 'CEMEXCPO.MX',   name: 'CEMEX',                                        exchange: 'BMV', sector: 'Materials' },
  { symbol: 'ALPEKA',     yahooSymbol: 'ALPEKA.MX',     name: 'Alpek',                                        exchange: 'BMV', sector: 'Materials' },
  { symbol: 'ORBIA*',     yahooSymbol: 'ORBIA.MX',      name: 'Orbia',                                        exchange: 'BMV', sector: 'Materials' },
  { symbol: 'CYDSASAA',   yahooSymbol: 'CYDSASAA.MX',   name: 'Cydsa',                                        exchange: 'BMV', sector: 'Chemicals' },
  { symbol: 'MEXCHEM*',   yahooSymbol: 'MEXCHEM.MX',    name: 'Mexichem',                                     exchange: 'BMV', sector: 'Chemicals' },

  // ── Conglomerates ─────────────────────────────────────────────────────────────
  { symbol: 'ALFAA',      yahooSymbol: 'ALFAA.MX',      name: 'Alfa',                                         exchange: 'BMV', sector: 'Conglomerate' },
  { symbol: 'NEMAKA',     yahooSymbol: 'NEMAKA.MX',     name: 'Nemak',                                        exchange: 'BMV', sector: 'Conglomerate' },
  { symbol: 'GISSAA',     yahooSymbol: 'GISSAA.MX',     name: 'GIS (Grupo Industrial Saltillo)',              exchange: 'BMV', sector: 'Conglomerate' },
  { symbol: 'VITROA',     yahooSymbol: 'VITROA.MX',     name: 'Vitro',                                        exchange: 'BMV', sector: 'Conglomerate' },

  // ── Media / Entertainment ─────────────────────────────────────────────────────
  { symbol: 'TLEVICPO',   yahooSymbol: 'TLEVICPO.MX',   name: 'Televisa (Grupo Televisa)',                    exchange: 'BMV', sector: 'Media' },
  { symbol: 'TVAZTCPO',   yahooSymbol: 'TVAZTCPO.MX',   name: 'TV Azteca',                                    exchange: 'BMV', sector: 'Media' },
  { symbol: 'CMOCTEZ*',   yahooSymbol: 'CMOCTEZ.MX',    name: 'Corporación Moctezuma',                        exchange: 'BMV', sector: 'Media' },
  { symbol: 'CIDMEGA',    yahooSymbol: 'CIDMEGA.MX',    name: 'CIE (Corporación Interamericana)',             exchange: 'BMV', sector: 'Entertainment' },

  // ── Aviation / Transport ──────────────────────────────────────────────────────
  { symbol: 'GAPB',       yahooSymbol: 'GAPB.MX',       name: 'Aeropuertos del Pacífico (GAP)',               exchange: 'BMV', sector: 'Aviation' },
  { symbol: 'ASURB',      yahooSymbol: 'ASURB.MX',      name: 'Aeropuertos del Sureste (ASUR)',               exchange: 'BMV', sector: 'Aviation' },
  { symbol: 'OMAB',       yahooSymbol: 'OMAB.MX',       name: 'Grupo Aeroportuario Centro Norte (OMA)',       exchange: 'BMV', sector: 'Aviation' },
  { symbol: 'VOLARA',     yahooSymbol: 'VOLARA.MX',     name: 'Volaris (Controladora Vuela)',                 exchange: 'BMV', sector: 'Aviation' },

  // ── Infrastructure / Construction ─────────────────────────────────────────────
  { symbol: 'PINFRA*',    yahooSymbol: 'PINFRA.MX',     name: 'Promotora y Operadora de Infraestructura',     exchange: 'BMV', sector: 'Infrastructure' },
  { symbol: 'IDEALB-1',   yahooSymbol: 'IDEALB-1.MX',   name: 'Impulsora del Desarrollo y el Empleo (IDEAL)', exchange: 'BMV', sector: 'Infrastructure' },
  { symbol: 'AGUA*',      yahooSymbol: 'AGUA.MX',       name: 'Grupo Rotoplas',                               exchange: 'BMV', sector: 'Infrastructure' },
  { symbol: 'OHLMEX*',    yahooSymbol: 'OHLMEX.MX',     name: 'OHL México',                                   exchange: 'BMV', sector: 'Infrastructure' },

  // ── Real Estate / REITs ───────────────────────────────────────────────────────
  { symbol: 'FUNO11',     yahooSymbol: 'FUNO11.MX',     name: 'Fibra Uno',                                    exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FIBRAPL14',  yahooSymbol: 'FIBRAPL14.MX',  name: 'Fibra Prologis',                               exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FMTY14',     yahooSymbol: 'FMTY14.MX',     name: 'Fibra Monterrey',                              exchange: 'BMV', sector: 'REIT' },
  { symbol: 'TERRA13',    yahooSymbol: 'TERRA13.MX',    name: 'Fibra Terrafina',                              exchange: 'BMV', sector: 'REIT' },
  { symbol: 'DANHOS13',   yahooSymbol: 'DANHOS13.MX',   name: 'Fibra Danhos',                                 exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FIBRAMQ12',  yahooSymbol: 'FIBRAMQ12.MX',  name: 'Fibra Macquarie',                              exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FSHOP13',    yahooSymbol: 'FSHOP13.MX',    name: 'Fibra Shop',                                   exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FIBRHDP15',  yahooSymbol: 'FIBRHDP15.MX',  name: 'Fibra HD',                                     exchange: 'BMV', sector: 'REIT' },
  { symbol: 'FNOVA17',    yahooSymbol: 'FNOVA17.MX',    name: 'Fibra Nova',                                   exchange: 'BMV', sector: 'REIT' },
  { symbol: 'VESTA*',     yahooSymbol: 'VESTA.MX',      name: 'Corporación Inmobiliaria Vesta',               exchange: 'BMV', sector: 'Real Estate' },
  { symbol: 'CADUA',      yahooSymbol: 'CADUA.MX',      name: 'Corpovael (CADU Inmobiliaria)',                exchange: 'BMV', sector: 'Real Estate' },
  { symbol: 'ARA*',       yahooSymbol: 'ARA.MX',        name: 'Consorcio ARA',                                exchange: 'BMV', sector: 'Real Estate' },
  { symbol: 'HOMEX*',     yahooSymbol: 'HOMEX.MX',      name: 'Desarrolladora Homex',                         exchange: 'BMV', sector: 'Real Estate' },

  // ── Healthcare ────────────────────────────────────────────────────────────────
  { symbol: 'LABB',       yahooSymbol: 'LABB.MX',       name: 'Genomma Lab Internacional',                    exchange: 'BMV', sector: 'Healthcare' },
  { symbol: 'MEDICA*',    yahooSymbol: 'MEDICA.MX',     name: 'Médica Sur',                                   exchange: 'BMV', sector: 'Healthcare' },

  // ── Energy ────────────────────────────────────────────────────────────────────
  { symbol: 'IENOVA*',    yahooSymbol: 'IENOVA.MX',     name: 'Infraestructura Energética Nova',              exchange: 'BMV', sector: 'Energy' },
  { symbol: 'RASSINIA',   yahooSymbol: 'RASSINIA.MX',   name: 'Rassini',                                      exchange: 'BMV', sector: 'Energy' },
  { symbol: 'TRAXIONA',   yahooSymbol: 'TRAXIONA.MX',   name: 'Traxión',                                      exchange: 'BMV', sector: 'Energy' },

  // ── Industrial / Auto ─────────────────────────────────────────────────────────
  { symbol: 'CERAMICB',   yahooSymbol: 'CERAMICB.MX',   name: 'Internacional de Cerámica',                    exchange: 'BMV', sector: 'Industrial' },
  { symbol: 'POCHTECB',   yahooSymbol: 'POCHTECB.MX',   name: 'Grupo Pochteca',                               exchange: 'BMV', sector: 'Industrial' },
  { symbol: 'ABORAB',     yahooSymbol: 'ABORAB.MX',     name: 'Abastecedora de Insumos (ABORA)',              exchange: 'BMV', sector: 'Industrial' },
  { symbol: 'BEVIDESB',   yahooSymbol: 'BEVIDESB.MX',   name: 'Farmacias Benavides',                          exchange: 'BMV', sector: 'Industrial' },
  { symbol: 'SIMECB',     yahooSymbol: 'SIMECB.MX',     name: 'Grupo Simec',                                  exchange: 'BMV', sector: 'Industrial' },
  { symbol: 'ICH*',       yahooSymbol: 'ICHB.MX',       name: 'Industrias CH',                                exchange: 'BMV', sector: 'Industrial' },
  { symbol: 'LAMOSA*',    yahooSymbol: 'LAMOSA.MX',     name: 'Grupo Lamosa',                                 exchange: 'BMV', sector: 'Industrial' },

  // ── Education ─────────────────────────────────────────────────────────────────
  { symbol: 'CONVERA',    yahooSymbol: 'CONVERA.MX',    name: 'Convertidora Industrial',                      exchange: 'BMV', sector: 'Education' },

  // ── Services ──────────────────────────────────────────────────────────────────
  { symbol: 'SABORB',     yahooSymbol: 'SABORB.MX',     name: 'Grupo Herdez (Sabores)',                       exchange: 'BMV', sector: 'Services' },
  { symbol: 'SPORTS',     yahooSymbol: 'SPORTS.MX',     name: 'Grupo Sports World',                           exchange: 'BMV', sector: 'Services' },
  { symbol: 'HOTEL*',     yahooSymbol: 'HOTEL.MX',      name: 'Grupo Hotelero Santa Fe',                      exchange: 'BMV', sector: 'Services' },
  { symbol: 'DINEB',      yahooSymbol: 'DINEB.MX',      name: 'Dine',                                         exchange: 'BMV', sector: 'Services' },

  // ── Technology ────────────────────────────────────────────────────────────────
  { symbol: 'MAXCOMCPO',  yahooSymbol: 'MAXCOMCPO.MX',  name: 'Maxcom Telecomunicaciones',                    exchange: 'BMV', sector: 'Technology' },

  // ── Packaging ─────────────────────────────────────────────────────────────────
  { symbol: 'PAPPEL*',    yahooSymbol: 'PAPPEL.MX',     name: 'Bio Pappel',                                   exchange: 'BMV', sector: 'Packaging' },

  // ── CKDs / Trusts ─────────────────────────────────────────────────────────────
  { symbol: 'TEAK*',      yahooSymbol: 'TEAK.MX',       name: 'Proteak Uno',                                  exchange: 'BMV', sector: 'Forestry' },
];
