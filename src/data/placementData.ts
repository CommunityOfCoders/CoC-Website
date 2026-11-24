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

const RAW_SIX_MONTH: Record<string, RawInternshipInput[]> = {
  '2026': [
    { company: 'DE Shaw', stipend: '₹2.5L/mo', members: 2, ppos: '-' },
    { company: 'Rubrik', stipend: '₹1.75L/mo', members: 1, ppos: '-' },
    { company: 'Visa', stipend: '₹90k/mo', members: 1, ppos: '-' },
    { company: 'Hilti', stipend: '₹80k/mo', members: 3, ppos: '-' },
    { company: 'Snabbit', stipend: '₹75k/mo', members: 2, ppos: '-' },
    { company: 'Applied Materials', stipend: '₹55k/mo', members: 2, ppos: '-' },
    { company: 'Persistent Systems', stipend: '₹55k/mo', members: 1, ppos: '-' },
    { company: 'BNP Paribas', stipend: '₹50k/mo', members: 2, ppos: '-' },
    { company: 'Baker Hughes', stipend: '₹50k/mo', members: 1, ppos: '-' },
    { company: 'Pfizer', stipend: '₹50k/mo', members: 3, ppos: '-' },
    { company: 'Zycus', stipend: '₹50k/mo', members: 1, ppos: '-' },
    { company: 'Crucibl', stipend: '₹40k/mo', members: 1, ppos: '-' },
    { company: 'Mahindra Finance', stipend: '₹40k/mo', members: 1, ppos: '-' },
    { company: 'Mobisy Technologies', stipend: '₹40k/mo', members: 1, ppos: '-' },
    { company: 'Sun Pharma', stipend: '₹40k/mo', members: 1, ppos: '-' },
    { company: 'Cognext', stipend: '₹30k/mo', members: 2, ppos: '-' },
    { company: 'NCDEX', stipend: '₹30k/mo', members: 6, ppos: '-' },
    { company: 'Colgate', stipend: '₹25k/mo', members: 3, ppos: '-' },
    { company: 'Dolat Capital', stipend: '₹25k/mo', members: 2, ppos: '-' },
    { company: 'IDfy', stipend: '₹25k/mo', members: 1, ppos: '-' },
    { company: 'IRIS RegTech', stipend: '₹25k/mo', members: 1, ppos: '-' },
    { company: 'Revvity', stipend: '₹25k/mo', members: 3, ppos: '-' },
    { company: 'SIAA', stipend: '₹25k/mo', members: 1, ppos: '-' },
    { company: 'Deloitte', stipend: '₹5k/mo', members: 2, ppos: '-' },
  ]
};

const RAW_PLACEMENTS: Record<string, RawPlacementInput[]> = {
  '2026': [
    { company: 'DE Shaw', ctc: '₹68L', members: 2, ppos: 2 },
    { company: 'Google', ctc: '₹55L', members: 1, ppos: 1 },
    { company: 'Visa', ctc: '₹35.5L', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', ctc: '₹30L', members: 1, ppos: 1 },
    { company: 'Morgan Stanley', ctc: '₹29.11L', members: 4, ppos: 4 },
    { company: 'Hilti', ctc: '₹23L', members: 3, ppos: 3 },
    { company: 'BNY', ctc: '₹22L', members: 2, ppos: 2 },
    { company: 'Bank of America', ctc: '₹18.9L', members: 1, ppos: 1 },
    { company: 'Citi', ctc: '₹18L', members: 8, ppos: 8 },
    { company: 'Cognizant', ctc: '₹18L', members: 1, ppos: '-' },
    { company: 'HSBC', ctc: '₹16.34L', members: 10, ppos: 4 },
    { company: 'Mahindra Finance', ctc: '₹16L', members: 1, ppos: 1 },
    { company: 'Dolat Capital', ctc: '₹16L', members: 2, ppos: '-' },
    { company: 'LPL Financial', ctc: '₹16L', members: 2, ppos: '-' },
    { company: 'Russell Investments', ctc: '₹15.4L', members: 1, ppos: 1 },
    { company: 'Cognext', ctc: '₹13L', members: 2, ppos: '-' },
    { company: 'Crucibl', ctc: '₹12L', members: 1, ppos: 1 },
    { company: 'Zycus', ctc: '₹12L', members: 1, ppos: '-' },
    { company: 'Cognizant', ctc: '₹12L', members: 1, ppos: '-' },
    { company: 'ICICI Securities', ctc: '₹12L', members: 2, ppos: '-' },
    { company: 'ICICI Home Finance', ctc: '₹12L', members: 4, ppos: '-' },
    { company: 'ICICI Bank', ctc: '₹11.65L', members: 8, ppos: '-' },
    { company: 'Mobisy Technologies', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'GEP Worldwide', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'IRIS RegTech', ctc: '₹9L', members: 1, ppos: '-' },
    { company: 'PwC India', ctc: '₹8.99L', members: 4, ppos: '-' },
    { company: 'Deloitte', ctc: '₹8.1L', members: 2, ppos: '-' },
    { company: 'Axis Bank', ctc: '₹7.5L', members: 1, ppos: 1 }
  ]
};

export const AVAILABLE_YEARS: string[] = Object.keys(RAW_PLACEMENTS).sort((a, b) => Number(b) - Number(a));
export const CURRENT_YEAR: string = AVAILABLE_YEARS[0] || '2026';

type InternshipBlock = { membersCount: number; companiesCount: number; items: InternshipItem[] };
const buildInternships = (raw: Record<string, RawInternshipInput[]>): Record<string, InternshipBlock> => Object.keys(raw).reduce((acc, year) => {
  const sortedItems = [...raw[year]]
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
}, {} as Record<string, InternshipBlock>);

export const INTERNSHIPS_DATA = buildInternships(RAW_INTERNSHIPS);
export const SIX_MONTH_DATA = buildInternships(RAW_SIX_MONTH);

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
  { year: '2026', internships: 37, placements: 69, avgCtc: '₹17.9L', highestCtc: '₹68.0L' },
];

const currentYearYoy = YEAR_ON_YEAR_DATA.find((item) => item.year === CURRENT_YEAR);

export const OVERVIEW_STATS: PlacementStat[] = [
  { id: 'internships', label: 'INTERNSHIPS THIS YEAR', value: String(INTERNSHIPS_DATA[CURRENT_YEAR]?.membersCount ?? currentYearYoy?.internships ?? 0), subtitle: `members · ${CURRENT_YEAR}` },
  { id: 'placements', label: `PLACEMENTS (${CURRENT_YEAR})`, value: String(PLACEMENTS_DATA[CURRENT_YEAR]?.offersCount ?? currentYearYoy?.placements ?? 0), subtitle: 'FTE offers accepted' },
  { id: 'ppos', label: 'PPOS RECEIVED', value: String(PPOS_DATA[CURRENT_YEAR]?.totalPpos ?? 0), subtitle: 'Accepted by members' },
  { id: 'highest_ctc', label: 'HIGHEST CTC', value: currentYearYoy?.highestCtc ?? '-', subtitle: PLACEMENTS_DATA[CURRENT_YEAR]?.items?.[0]?.company || 'DE Shaw' },
  { id: 'avg_ctc', label: `AVG CTC (${CURRENT_YEAR})`, value: currentYearYoy?.avgCtc ?? '-', subtitle: 'across all roles' }
];
