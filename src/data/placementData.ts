// Placement, Internship & PPO Data
// To add new year data, add entries to RAW_INTERNSHIPS and RAW_PLACEMENTS; PPOS_DATA is generated automatically.
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
  members: number | string;
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
  members: number | string;
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
  if (!val || val === '-' || val === 'TBD' || val === 'TBA') return 0;
  const match = val.match(/[\d.]+/);
  const num = match ? parseFloat(match[0]) : 0;
  if (val.includes('L') || val.includes('l') || val.includes('lakh') || val.includes('LPA')) return num * 100000;
  if (val.includes('k') || val.includes('K')) return num * 1000;
  if (num > 0 && num < 200) return num * 100000;
  return num;
};

type RawInternshipInput = { company: string; stipend: string; members: number | string; ppos: number | string };
type RawPlacementInput = { company: string; ctc: string; members: number; ppos: number | string };
export type RawPPOInput = { company: string; ctc: string; members: number | string; ppos?: number | string };

const RAW_INTERNSHIPS: Record<string, RawInternshipInput[]> = {
  '2026': [
    // { company: 'Bank of America', stipend: '₹1.4L/mo', members: 3, ppos: '-' },
    { company: 'Hilti', stipend: '₹80k/mo', members: 5, ppos: '-' },
    { company: 'BNY Mellon', stipend: '₹75k/mo', members: 12, ppos: '-' },
    { company: 'Barclays', stipend: '₹75k/mo', members: 1, ppos: '-' },
    { company: 'Russell Investments', stipend: '₹60k/mo', members: 3, ppos: '-' },
    { company: 'HSBC', stipend: '₹50k/mo', members: 2, ppos: '-' },
    { company: 'IBM', stipend: '₹30k/mo', members: 1, ppos: '-' },
    { company: 'Axis AMC', stipend: '₹30k/mo', members: 4, ppos: '-' }
  ]
};

const RAW_PLACEMENTS: Record<string, RawPlacementInput[]> = {
  '2026': [
    { company: 'DE Shaw', ctc: '₹67L', members: 2, ppos: 2 },
    { company: 'Google', ctc: '₹50L', members: 2, ppos: 1 },
    { company: 'Goldman Sachs', ctc: '₹30L', members: 4, ppos: 1 },
    { company: 'Morgan Stanley', ctc: '₹29L', members: 3, ppos: 2 },
    { company: 'Wells Fargo', ctc: '₹24L', members: 4, ppos: 4 },
    { company: 'BNY Mellon', ctc: '₹22L', members: 7, ppos: 6 },
    { company: 'BrowserStack', ctc: '₹22L', members: 2, ppos: '-' },
    { company: 'Oracle', ctc: '₹21.34L', members: 6, ppos: '-' },
    { company: 'JPMC', ctc: '₹19L', members: 4, ppos: 3 },
    { company: 'Bank of America', ctc: '₹18.9L', members: 5, ppos: 1 },
    { company: 'Citi Bank', ctc: '₹18L', members: 7, ppos: 7 },
    { company: 'Hilti', ctc: '₹18L', members: 4, ppos: 3 },
    { company: 'Futures First', ctc: '₹17L', members: 1, ppos: '-' },
    { company: 'NPCI', ctc: '₹16L', members: 4, ppos: 4 },
    { company: 'Mahindra Finance', ctc: '₹16L', members: 5, ppos: '-' },
    { company: 'Applied Materials', ctc: '₹16L', members: 1, ppos: '-' },
    { company: 'Russell Investments', ctc: '₹15.4L', members: 1, ppos: 1 },
    { company: 'HSBC', ctc: '₹15.1L', members: 4, ppos: 1 },
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

  const totalMembers = sortedItems.reduce((sum, item) => {
    const num = typeof item.members === 'number' ? item.members : (parseInt(String(item.members), 10) || 0);
    return sum + num;
  }, 0);

  acc[year] = {
    membersCount: totalMembers,
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
    .sort((a, b) => {
      const amtDiff = parseAmount(b.ctc) - parseAmount(a.ctc);
      if (amtDiff !== 0) return amtDiff;
      const memA = Number(a.ppos);
      const memB = Number(b.ppos);
      if (memB !== memA) return memB - memA;
      return a.company.localeCompare(b.company);
    })
    .map((item, idx) => ({
      id: idx + 1,
      company: item.company,
      members: Number(item.ppos),
      ctc: item.ctc
    }));

  acc[year] = {
    totalPpos: ppoItems.reduce((sum, item) => {
      const num = typeof item.members === 'number' ? item.members : (parseInt(String(item.members), 10) || 0);
      return sum + num;
    }, 0),
    companiesCount: new Set(ppoItems.map((item) => item.company)).size,
    season: `${year} season`,
    items: ppoItems
  };

  return acc;
}, {} as Record<string, { totalPpos: number; companiesCount: number; season: string; items: PPOItem[] }>);

export const AVAILABLE_PPO_YEARS: string[] = Object.keys(PPOS_DATA).sort((a, b) => Number(b) - Number(a));

export const RAW_PPOS: Record<string, RawPPOInput[]> = Object.keys(PPOS_DATA).reduce((acc, year) => {
  acc[year] = PPOS_DATA[year].items.map((item) => ({
    company: item.company,
    ctc: item.ctc,
    members: item.members
  }));
  return acc;
}, {} as Record<string, RawPPOInput[]>);

export const YEAR_ON_YEAR_DATA: YearGrowthItem[] = [
  { year: '2026', internships: 37, placements: 39, avgCtc: '₹19.2L', highestCtc: '₹67.0L' },
];

const currentYearYoy = YEAR_ON_YEAR_DATA.find((item) => item.year === CURRENT_YEAR);

export const OVERVIEW_STATS: PlacementStat[] = [
  { id: 'internships', label: 'INTERNSHIPS THIS YEAR', value: String(INTERNSHIPS_DATA[CURRENT_YEAR]?.membersCount ?? currentYearYoy?.internships ?? 0), subtitle: `members · ${CURRENT_YEAR}` },
  { id: 'placements', label: `PLACEMENTS (${CURRENT_YEAR})`, value: String(PLACEMENTS_DATA[CURRENT_YEAR]?.offersCount ?? currentYearYoy?.placements ?? 0), subtitle: 'FTE offers accepted' },
  { id: 'ppos', label: 'PPOS RECEIVED', value: String(PPOS_DATA[CURRENT_YEAR]?.totalPpos ?? 0), subtitle: 'Accepted by members' },
  { id: 'highest_ctc', label: 'HIGHEST CTC', value: currentYearYoy?.highestCtc ?? '-', subtitle: PLACEMENTS_DATA[CURRENT_YEAR]?.items?.[0]?.company || 'DE Shaw' },
  { id: 'avg_ctc', label: `AVG CTC (${CURRENT_YEAR})`, value: currentYearYoy?.avgCtc ?? '-', subtitle: 'across all roles' }
];
