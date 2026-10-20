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
    { company: 'DE Shaw', stipend: '₹1.5L/mo', members: 1, ppos: 1 },
    { company: 'Bank of America', stipend: '₹1.41L/mo', members: 1, ppos: 1 },
    { company: 'Google', stipend: '₹1.23L/mo', members: 5, ppos: 5 },
    { company: 'Goldman Sachs', stipend: '₹1.0L/mo', members: 6, ppos: 4 },
    { company: 'Wells Fargo', stipend: '₹90k/mo', members: 5, ppos: 5 },
    { company: 'Morgan Stanley', stipend: '₹87k/mo', members: 7, ppos: 7 },
    { company: 'Hilti', stipend: '₹80k/mo', members: 5, ppos: 4 },
    { company: 'Citi Bank', stipend: '₹75k/mo', members: 7, ppos: 7 },
    { company: 'BNY Mellon', stipend: '₹75k/mo', members: 7, ppos: 2 },
    { company: 'JPMC', stipend: '₹75k/mo', members: 4, ppos: 3 },
    { company: 'Russell Investments', stipend: '₹60k/mo', members: 1, ppos: 1 },
    { company: 'UPL', stipend: '₹40k/mo', members: 3, ppos: 2 },
    { company: 'Mastercard', stipend: '₹40k/mo', members: 2, ppos: 2 },
    { company: 'NPCI', stipend: '₹30k/mo', members: 6, ppos: 4 },
    { company: 'Deloitte', stipend: '₹25k/mo', members: 1, ppos: '-' },
    { company: 'Robin Home AI', stipend: '₹25k/mo', members: 1, ppos: '-' },
    { company: 'Merkle', stipend: '₹20k/mo', members: 3, ppos: 1 },
    { company: 'BIS', stipend: '₹20k/mo', members: 2, ppos: '-' },
    { company: 'Dream11', stipend: '₹20k/mo', members: 8, ppos: '-' }
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

const YOY_YEARS = Object.keys(RAW_PLACEMENTS).sort((a, b) => Number(a) - Number(b));

export const YEAR_ON_YEAR_DATA: YearGrowthItem[] = YOY_YEARS.map((year) => {
  const internData = INTERNSHIPS_DATA[year];
  const placeData = PLACEMENTS_DATA[year];

  let calculatedAvg = '-';
  if (placeData && placeData.items.length > 0) {
    const totalMembers = placeData.offersCount;
    const totalCtcSum = placeData.items.reduce((sum, item) => {
      const amount = parseAmount(item.ctc);
      return sum + (amount * item.members);
    }, 0);
    if (totalMembers > 0) {
      const avgInLakhs = (totalCtcSum / totalMembers / 100000).toFixed(1);
      calculatedAvg = `₹${avgInLakhs}L`;
    }
  }

  return {
    year,
    internships: internData?.membersCount ?? 0,
    placements: placeData?.offersCount ?? 0,
    avgCtc: calculatedAvg,
    highestCtc: placeData?.items?.[0]?.ctc || '-'
  };
});

const currentYearYoy = YEAR_ON_YEAR_DATA.find((item) => item.year === CURRENT_YEAR);

export const OVERVIEW_STATS: PlacementStat[] = [
  { id: 'internships', label: 'INTERNSHIPS THIS YEAR', value: String(currentYearYoy?.internships ?? 0), subtitle: `members · ${CURRENT_YEAR}` },
  { id: 'placements', label: `PLACEMENTS (${CURRENT_YEAR})`, value: String(currentYearYoy?.placements ?? 0), subtitle: 'FTE offers accepted' },
  { id: 'ppos', label: 'PPOS RECEIVED', value: String(PPOS_DATA[CURRENT_YEAR]?.totalPpos ?? 0), subtitle: 'Accepted by members' },
  { id: 'highest_ctc', label: 'HIGHEST CTC', value: currentYearYoy?.highestCtc ?? '-', subtitle: PLACEMENTS_DATA[CURRENT_YEAR]?.items?.[0]?.company || 'DE Shaw' },
  { id: 'avg_ctc', label: `AVG CTC (${CURRENT_YEAR})`, value: currentYearYoy?.avgCtc ?? '-', subtitle: 'across all roles' }
];
