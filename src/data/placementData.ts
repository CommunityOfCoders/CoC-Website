//To add new year data, you only need to add 2027 data on RAW_INTERNSHIPS and RAW_PLACEMENTS variable,rest everything will be handled automatically
export interface PlacementStat {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  subDetail?: string;
}

export interface InternshipItem {
  id: number;
  company: string;
  stipend: string;
  members: number;
  ppos: number | string;
  isPpoReceived: boolean;
}

export interface PlacementItem {
  id: number;
  company: string;
  ctc: string;
  members: number;
  ppos: number | string;
}

export interface PPOItem {
  id: number;
  company: string;
  members: number;
  ctc: string;
}

export interface YearGrowthItem {
  year: string;
  internships: number;
  placements: number;
  avgCtc: string;
  highestCtc: string;
}

const parseAmount = (val: string): number => {
  const match = val.match(/[\d.]+/);
  const num = match ? parseFloat(match[0]) : 0;
  if (val.includes('L') || val.includes('l')) return num * 100000;
  if (val.includes('k') || val.includes('K')) return num * 1000;
  return num;
};

type RawInternshipInput = { company: string; stipend: string; members: number; ppos: number | string };
type RawPlacementInput = { company: string; ctc: string; members: number; ppos: number | string };

const RAW_INTERNSHIPS: Record<string, RawInternshipInput[]> = {
  '2026': [
    { company: 'Bank of America', stipend: '₹1.4L/mo', members: 3, ppos: '-' },
    { company: 'Hilti', stipend: '₹80k/mo', members: 5, ppos: '-' },
    { company: 'BNY Mellon', stipend: '₹75k/mo', members: 13, ppos: '-' },
    { company: 'Barclays', stipend: '₹75k/mo', members: 1, ppos: '-' },
    { company: 'Russell Investments', stipend: '₹60k/mo', members: 3, ppos: '-' },
    { company: 'HSBC', stipend: '₹50k/mo', members: 2, ppos: '-' },
    { company: 'IBM', stipend: '₹30k/mo', members: 1, ppos: '-' },
    { company: 'Axis Bank', stipend: '₹30k/mo', members: 9, ppos: '-' }
  ],
  '2025': [
    { company: 'DE Shaw', stipend: '₹1.5L/mo', members: 1, ppos: '-' },
    { company: 'Bank of America', stipend: '₹1.4L/mo', members: 1, ppos: '-' },
    { company: 'Google', stipend: '₹1.2L/mo', members: 2, ppos: '-' },
    { company: 'Goldman Sachs', stipend: '₹1.0L/mo', members: 5, ppos: '-' },
    { company: 'Morgan Stanley', stipend: '₹87k/mo', members: 4, ppos: '-' },
    { company: 'Hilti', stipend: '₹80k/mo', members: 5, ppos: '-' },
    { company: 'Citi Bank', stipend: '₹75k/mo', members: 13, ppos: '-' },
    { company: 'BNY Mellon', stipend: '₹75k/mo', members: 7, ppos: '-' },
    { company: 'JPMC', stipend: '₹75k/mo', members: 2, ppos: '-' },
    { company: 'HSBC', stipend: '₹60k/mo', members: 4, ppos: '-' },
    { company: 'Russell Investments', stipend: '₹60k/mo', members: 3, ppos: '-' },
    { company: 'Visa', stipend: '₹50k/mo', members: 3, ppos: '-' },
    { company: 'Mahindra', stipend: '₹40k/mo', members: 4, ppos: '-' },
    { company: 'Pattern', stipend: '₹35k/mo', members: 4, ppos: '-' },
    { company: 'NPCI', stipend: '₹30k/mo', members: 3, ppos: '-' }
  ],
  '2024': [
    { company: 'DE Shaw', stipend: '₹1.5L/mo', members: 1, ppos: '-' },
    { company: 'Goldman Sachs', stipend: '₹1.0L/mo', members: 4, ppos: '-' },
    { company: 'Wells Fargo', stipend: '₹90k/mo', members: 2, ppos: '-' },
    { company: 'Morgan Stanley', stipend: '₹87k/mo', members: 3, ppos: '-' },
    { company: 'Hilti', stipend: '₹80k/mo', members: 5, ppos: '-' },
    { company: 'BNY Mellon', stipend: '₹75k/mo', members: 3, ppos: '-' },
    { company: 'Citi Bank', stipend: '₹75k/mo', members: 10, ppos: '-' },
    { company: 'JPMC', stipend: '₹75k/mo', members: 2, ppos: '-' },
    { company: 'Texas Instruments', stipend: '₹60k/mo', members: 2, ppos: '-' },
    { company: 'Oracle', stipend: '₹50k/mo', members: 2, ppos: '-' },
    { company: 'Mastercard', stipend: '₹40k/mo', members: 1, ppos: '-' }
  ],
  '2023': [
    { company: 'Morgan Stanley', stipend: '₹87k/mo', members: 3, ppos: 2 },
    { company: 'Microsoft', stipend: '₹80k/mo', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', stipend: '₹75k/mo', members: 6, ppos: 5 },
    { company: 'Barclays', stipend: '₹67k/mo', members: 14, ppos: 11 },
    { company: 'JPMC', stipend: '₹50k/mo', members: 11, ppos: 9 },
    { company: 'Samsung', stipend: '₹50k/mo', members: 21, ppos: '-' },
    { company: 'Deutsche Bank', stipend: '₹50k/mo', members: 4, ppos: 3 }
  ]
};

const RAW_PLACEMENTS: Record<string, RawPlacementInput[]> = {
  '2026': [
    { company: 'DE Shaw', ctc: '₹67L', members: 1, ppos: 1 },
    { company: 'Google', ctc: '₹50L', members: 4, ppos: 4 },
    { company: 'Goldman Sachs', ctc: '₹30L', members: 4, ppos: 4 },
    { company: 'Morgan Stanley', ctc: '₹29L', members: 7, ppos: 7 },
    { company: 'Wells Fargo', ctc: '₹24L', members: 4, ppos: 4 },
    { company: 'BNY Mellon', ctc: '₹22L', members: 7, ppos: 3 },
    { company: 'BrowserStack', ctc: '₹22L', members: 2, ppos: '-' },
    { company: 'Oracle', ctc: '₹21.34L', members: 6, ppos: '-' },
    { company: 'JPMC', ctc: '₹19L', members: 4, ppos: 3 },
    { company: 'Bank of America', ctc: '₹18.9L', members: 5, ppos: 1 },
    { company: 'Citi Bank', ctc: '₹18L', members: 7, ppos: 7 },
    { company: 'Hilti', ctc: '₹18L', members: 4, ppos: 4 },
    { company: 'Futures First', ctc: '₹17L', members: 1, ppos: '-' },
    { company: 'NPCI', ctc: '₹16L', members: 4, ppos: 4 },
    { company: 'Mahindra Finance', ctc: '₹16L', members: 5, ppos: '-' },
    { company: 'Applied Materials', ctc: '₹16L', members: 1, ppos: '-' },
    { company: 'Russell Investments', ctc: '₹15.4L', members: 1, ppos: 1 },
    { company: 'HSBC', ctc: '₹15.1L', members: 11, ppos: '-' },
    { company: 'Media.net', ctc: '₹14.5L', members: 3, ppos: '-' },
    { company: 'Dolat Capital', ctc: '₹14L', members: 4, ppos: '-' },
    { company: 'CleverTap', ctc: '₹14L', members: 3, ppos: '-' },
    { company: 'Aditya Birla Capital', ctc: '₹13.5L', members: 1, ppos: '-' },
    { company: 'Mastercard', ctc: '₹13.4L', members: 6, ppos: 1 },
    { company: 'ICICI Securities', ctc: '₹12L', members: 5, ppos: '-' },
    { company: 'ICICI Bank', ctc: '₹12L', members: 3, ppos: '-' },
    { company: 'FYNDNA', ctc: '₹12L', members: 1, ppos: '-' },
    { company: 'ICICI Home Finance', ctc: '₹11.5L', members: 1, ppos: '-' },
    { company: 'UPL', ctc: '₹11L', members: 2, ppos: 2 },
    { company: 'Tata AIG', ctc: '₹11L', members: 1, ppos: '-' },
    { company: 'Thermax', ctc: '₹10L', members: 2, ppos: '-' },
    { company: 'KPMG', ctc: '₹10L', members: 5, ppos: '-' },
    { company: 'Sciative Solutions', ctc: '₹10L', members: 1, ppos: '-' },
    { company: 'Affinity Global', ctc: '₹9.75L', members: 5, ppos: '-' },
    { company: 'Fractal', ctc: '₹9.5L', members: 2, ppos: '-' },
    { company: 'EY', ctc: '₹9.2L', members: 2, ppos: '-' },
    { company: 'GEP', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'CarWale', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'CogNext', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'Deloitte USI', ctc: '₹8.1L', members: 2, ppos: '-' },
    { company: 'Think360', ctc: '₹8.1L', members: 2, ppos: '-' },
    { company: 'IDfy', ctc: '₹8L', members: 1, ppos: '-' },
    { company: 'Axis Bank', ctc: '₹8L', members: 1, ppos: '-' },
    { company: 'Alepo', ctc: '₹8L', members: 1, ppos: '-' },
    { company: 'Factwise', ctc: '₹8L', members: 1, ppos: '-' },
    { company: 'Unity Small Finance Bank', ctc: '₹8L', members: 5, ppos: '-' },
    { company: 'Ayaan Automation', ctc: '₹8L', members: 2, ppos: '-' },
    { company: 'Godrej', ctc: '₹7L', members: 1, ppos: '-' },
    { company: 'NCS', ctc: '₹6.94L', members: 1, ppos: '-' }
  ],
  '2025': [
    { company: 'Google', ctc: '₹54L', members: 1, ppos: 1 },
    { company: 'Microsoft', ctc: '₹51L', members: 1, ppos: 1 },
    { company: 'IMC Trading', ctc: '₹40L', members: 1, ppos: '-' },
    { company: 'Goldman Sachs', ctc: '₹30L', members: 3, ppos: 3 },
    { company: 'Morgan Stanley', ctc: '₹29.48L', members: 3, ppos: 3 },
    { company: 'SAP Labs', ctc: '₹23.5L', members: 9, ppos: 4 },
    { company: 'Hilti', ctc: '₹23L', members: 3, ppos: 3 },
    { company: 'JPMC', ctc: '₹19.75L', members: 5, ppos: 5 },
    { company: 'Oracle', ctc: '₹19.18L', members: 12, ppos: '-' },
    { company: 'Bank of America', ctc: '₹19L', members: 28, ppos: 5 },
    { company: 'Citi Bank', ctc: '₹18L', members: 10, ppos: 10 },
    { company: 'NPCI', ctc: '₹16.15L', members: 9, ppos: 9 },
    { company: 'Dream11', ctc: '₹16L', members: 1, ppos: '-' },
    { company: 'Gupshup', ctc: '₹16L', members: 1, ppos: '-' },
    { company: 'Mondelēz International', ctc: '₹15.35L', members: 1, ppos: 1 },
    { company: 'Aditya Birla Capital', ctc: '₹13.5L', members: 2, ppos: '-' },
    { company: 'Mastercard', ctc: '₹13.4L', members: 1, ppos: '-' },
    { company: 'Broadridge', ctc: '₹12.5L', members: 1, ppos: '-' },
    { company: 'UBS', ctc: '₹12.5L', members: 2, ppos: 2 },
    { company: 'Ideaforge', ctc: '₹12L', members: 2, ppos: '-' },
    { company: 'Tata AIG', ctc: '₹11.7L', members: 1, ppos: '-' },
    { company: 'ICICI Bank', ctc: '₹11.4L', members: 3, ppos: '-' },
    { company: 'ICICI Prudential', ctc: '₹11.2L', members: 2, ppos: '-' },
    { company: 'ProcDNA', ctc: '₹11.1L', members: 1, ppos: '-' },
    { company: 'Wissen Technologies', ctc: '₹11L', members: 2, ppos: '-' },
    { company: 'ICICI Home Finance', ctc: '₹10.9L', members: 1, ppos: '-' },
    { company: 'IDfy', ctc: '₹10L', members: 2, ppos: '-' },
    { company: 'Thermax', ctc: '₹10L', members: 1, ppos: 1 },
    { company: 'Affinity Global', ctc: '₹9.75L', members: 3, ppos: '-' },
    { company: 'Fractal Analytics', ctc: '₹9.5L', members: 2, ppos: '-' },
    { company: 'Aptivaa', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'CogNext', ctc: '₹9L', members: 2, ppos: '-' },
    { company: 'P&G', ctc: '₹8.85L', members: 1, ppos: 1 },
    { company: 'EY', ctc: '₹8.6L', members: 2, ppos: '-' },
    { company: 'Deloitte', ctc: '₹8.1L', members: 4, ppos: '-' },
    { company: 'CleanMax', ctc: '₹8L', members: 2, ppos: '-' },
    { company: 'Axis Bank', ctc: '₹8L', members: 1, ppos: '-' },
    { company: 'TCS', ctc: '₹7L', members: 1, ppos: '-' },
    { company: 'AurionPro', ctc: '₹7L', members: 1, ppos: '-' },
    { company: 'Infosys', ctc: '₹3.6L', members: 1, ppos: '-' }
  ],
  '2024': [
    { company: 'US based software company', ctc: '₹62L', members: 1, ppos: '-' },
    { company: 'DE Shaw', ctc: '₹45L', members: 2, ppos: 2 },
    { company: 'Amazon', ctc: '₹44.14L', members: 1, ppos: '-' },
    { company: 'LinkedIn', ctc: '₹30.4L', members: 1, ppos: '-' },
    { company: 'Texas Instruments', ctc: '₹29.63L', members: 1, ppos: '-' },
    { company: 'Morgan Stanley', ctc: '₹29.48L', members: 13, ppos: 3 },
    { company: 'Visa', ctc: '₹28.5L', members: 4, ppos: 3 },
    { company: 'Myntra', ctc: '₹27L', members: 1, ppos: '-' },
    { company: 'SAP Labs', ctc: '₹24.5L', members: 13, ppos: 5 },
    { company: 'Goldman Sachs', ctc: '₹24L', members: 5, ppos: 4 },
    { company: 'Wells Fargo', ctc: '₹24L', members: 15, ppos: 2 },
    { company: 'Citi Bank', ctc: '₹18L', members: 8, ppos: 8 },
    { company: 'Hilti', ctc: '₹16L', members: 4, ppos: 4 },
    { company: 'BNY Mellon', ctc: '₹16L', members: 4, ppos: 4 },
    { company: 'Deutsche Bank', ctc: '₹14L', members: 2, ppos: 2 },
    { company: 'UBS', ctc: '₹14L', members: 4, ppos: 4 },
    { company: 'JPMC', ctc: '₹14L', members: 2, ppos: 2 },
    { company: 'Fractal', ctc: '₹9.5L', members: 1, ppos: '-' },
    { company: 'Mondelez International', ctc: '₹8L', members: 1, ppos: 1 }
  ],
  '2023': [
    { company: 'Microsoft', ctc: '₹42L', members: 1, ppos: 1 },
    { company: 'WorkIndia', ctc: '₹35L', members: 1, ppos: '-' },
    { company: 'Rakuten', ctc: '₹35L', members: 1, ppos: '-' },
    { company: 'Morgan Stanley', ctc: '₹25.3L', members: 4, ppos: 2 },
    { company: 'Goldman Sachs', ctc: '₹23L', members: 6, ppos: 5 },
    { company: 'Samsung', ctc: '₹22L', members: 1, ppos: '-' },
    { company: 'SAP Labs', ctc: '₹20.5L', members: 6, ppos: '-' },
    { company: 'Deutsche Bank', ctc: '₹19.63L', members: 14, ppos: 3 },
    { company: 'Barclays', ctc: '₹15L', members: 14, ppos: 11 },
    { company: 'JPMC', ctc: '₹14L', members: 9, ppos: 9 },
    { company: 'BNY Mellon', ctc: '₹12L', members: 4, ppos: '-' },
    { company: 'MSCI', ctc: '₹12L', members: 3, ppos: '-' },
    { company: 'Oracle', ctc: '₹18L', members: 3, ppos: 2 },
    { company: 'Wells Fargo', ctc: '₹20L', members: 3, ppos: 1 },
    { company: 'Fiserv', ctc: '₹10L', members: 5, ppos: '-' },
    { company: 'Citi Bank', ctc: '₹18L', members: 2, ppos: '-' },
    { company: 'Astra', ctc: '₹10L', members: 2, ppos: '-' },
    { company: 'PwC', ctc: '₹9L', members: 2, ppos: '-' },
    { company: 'UBS', ctc: '₹12.5L', members: 1, ppos: '-' }
  ]
};

export const AVAILABLE_YEARS: string[] = Object.keys(RAW_PLACEMENTS).sort((a, b) => Number(b) - Number(a));
export const CURRENT_YEAR: string = AVAILABLE_YEARS[0] || '2026';

export const INTERNSHIPS_DATA: Record<string, { membersCount: number; companiesCount: number; items: InternshipItem[] }> = Object.keys(RAW_INTERNSHIPS).reduce((acc, year) => {
  const sortedItems = [...RAW_INTERNSHIPS[year]]
    .sort((a, b) => parseAmount(b.stipend) - parseAmount(a.stipend))
    .map((item, idx) => ({
      id: idx + 1,
      company: item.company,
      stipend: item.stipend,
      members: item.members,
      ppos: item.ppos,
      isPpoReceived: item.ppos !== '-' && Number(item.ppos) > 0
    }));

  acc[year] = {
    membersCount: sortedItems.reduce((sum, item) => sum + item.members, 0),
    companiesCount: new Set(sortedItems.map((item) => item.company)).size,
    items: sortedItems
  };
  return acc;
}, {} as Record<string, { membersCount: number; companiesCount: number; items: InternshipItem[] }>);

export const PLACEMENTS_DATA: Record<string, { offersCount: number; companiesCount: number; items: PlacementItem[] }> = Object.keys(RAW_PLACEMENTS).reduce((acc, year) => {
  const sortedItems = [...RAW_PLACEMENTS[year]]
    .sort((a, b) => parseAmount(b.ctc) - parseAmount(a.ctc))
    .map((item, idx) => ({
      id: idx + 1,
      company: item.company,
      ctc: item.ctc,
      members: item.members,
      ppos: item.ppos
    }));

  acc[year] = {
    offersCount: sortedItems.reduce((sum, item) => sum + item.members, 0),
    companiesCount: new Set(sortedItems.map((item) => item.company)).size,
    items: sortedItems
  };
  return acc;
}, {} as Record<string, { offersCount: number; companiesCount: number; items: PlacementItem[] }>);

export const PPOS_DATA: Record<string, { totalPpos: number; companiesCount: number; season: string; items: PPOItem[] }> = Object.keys(PLACEMENTS_DATA).reduce((acc, year) => {
  const ppoItems = PLACEMENTS_DATA[year].items
    .filter((item) => item.ppos !== '-' && Number(item.ppos) > 0)
    .map((item, idx) => ({
      id: idx + 1,
      company: item.company,
      members: Number(item.ppos),
      ctc: item.ctc
    }));

  acc[year] = {
    totalPpos: ppoItems.reduce((sum, item) => sum + item.members, 0),
    companiesCount: ppoItems.length,
    season: `${year} season`,
    items: ppoItems
  };

  return acc;
}, {} as Record<string, { totalPpos: number; companiesCount: number; season: string; items: PPOItem[] }>);

export const YEAR_ON_YEAR_DATA: YearGrowthItem[] = [
  { year: '2026', internships: 37, placements: 39, avgCtc: '₹19.2L', highestCtc: '₹67.0L' },
  { year: '2025', internships: 61, placements: 118, avgCtc: '₹18.0L', highestCtc: '₹54.0L' },
  { year: '2024', internships: 35, placements: 82, avgCtc: '₹19.7L', highestCtc: '₹57.0L' },
  { year: '2023', internships: 60, placements: 82, avgCtc: '₹18.19L', highestCtc: '₹44.0L' },
  { year: '2022', internships: 33, placements: 74, avgCtc: '₹16.48L', highestCtc: '₹64.0L' },
  { year: '2021', internships: 29, placements: 76, avgCtc: '₹10.16L', highestCtc: '₹58.0L' },
  { year: '2020', internships: 30, placements: 71, avgCtc: '₹12.7L', highestCtc: '₹39.0L' },
  { year: '2019', internships: 28, placements: 78, avgCtc: '₹11.28L', highestCtc: '₹36.0L' },
  { year: '2018', internships: 26, placements: 74, avgCtc: '₹10.33L', highestCtc: '₹22.4L' },
  { year: '2017', internships: 24, placements: 75, avgCtc: '₹9.5L', highestCtc: '₹20.5L' },
  { year: '2016', internships: 20, placements: 73, avgCtc: '₹8.2L', highestCtc: '₹18.0L' },
];

const currentYearYoy = YEAR_ON_YEAR_DATA.find((item) => item.year === CURRENT_YEAR);

export const OVERVIEW_STATS: PlacementStat[] = [
  { id: 'internships', label: 'INTERNSHIPS THIS YEAR', value: String(currentYearYoy?.internships ?? 0), subtitle: `members · ${CURRENT_YEAR}` },
  { id: 'placements', label: `PLACEMENTS (${CURRENT_YEAR})`, value: String(currentYearYoy?.placements ?? 0), subtitle: 'FTE offers accepted' },
  { id: 'ppos', label: 'PPOS RECEIVED', value: String(PPOS_DATA[CURRENT_YEAR]?.totalPpos ?? 0), subtitle: 'Accepted by members' },
  { id: 'highest_ctc', label: 'HIGHEST CTC', value: currentYearYoy?.highestCtc ?? '-', subtitle: PLACEMENTS_DATA[CURRENT_YEAR]?.items?.[0]?.company || 'DE Shaw' },
  { id: 'avg_ctc', label: `AVG CTC (${CURRENT_YEAR})`, value: currentYearYoy?.avgCtc ?? '-', subtitle: 'across all roles' }
];
