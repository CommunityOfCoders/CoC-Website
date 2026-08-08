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
  return match ? parseFloat(match[0]) : 0;
};

type RawInternshipInput = { company: string; stipend: string; members: number; ppos: number | string };
type RawPlacementInput = { company: string; ctc: string; members: number; ppos: number | string };

const RAW_INTERNSHIPS: Record<string, RawInternshipInput[]> = {
  '2026': [
    { company: 'Tower Research', stipend: '₹3.2L/mo', members: 2, ppos: 2 },
    { company: 'DE Shaw', stipend: '₹3.0L/mo', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', stipend: '₹2.8L/mo', members: 3, ppos: 2 },
    { company: 'Atlassian', stipend: '₹2.5L/mo', members: 2, ppos: 1 },
    { company: 'Google', stipend: '₹2.2L/mo', members: 3, ppos: 3 },
    { company: 'Microsoft', stipend: '₹2.0L/mo', members: 4, ppos: 2 },
    { company: 'Uber', stipend: '₹1.8L/mo', members: 3, ppos: 2 },
    { company: 'Razorpay', stipend: '₹1.5L/mo', members: 5, ppos: 3 },
    { company: 'PhonePe', stipend: '₹1.4L/mo', members: 3, ppos: 1 }
  ],
  '2025': [
    { company: 'Tower Research', stipend: '₹3L/mo', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', stipend: '₹2.5L/mo', members: 2, ppos: 2 },
    { company: 'Atlassian', stipend: '₹2.2L/mo', members: 2, ppos: '—' },
    { company: 'Google', stipend: '₹2L/mo', members: 2, ppos: 2 },
    { company: 'Microsoft', stipend: '₹1.8L/mo', members: 3, ppos: 1 },
    { company: 'Uber', stipend: '₹1.5L/mo', members: 2, ppos: 1 },
    { company: 'Razorpay', stipend: '₹1.2L/mo', members: 4, ppos: 2 }
  ],
  '2024': [
    { company: 'Tower Research', stipend: '₹2.8L/mo', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', stipend: '₹2.2L/mo', members: 2, ppos: '—' },
    { company: 'Atlassian', stipend: '₹2.0L/mo', members: 2, ppos: '—' },
    { company: 'Google', stipend: '₹1.8L/mo', members: 2, ppos: '—' },
    { company: 'Microsoft', stipend: '₹1.6L/mo', members: 3, ppos: '—' },
    { company: 'Uber', stipend: '₹1.4L/mo', members: 2, ppos: 2 },
    { company: 'Razorpay', stipend: '₹1.2L/mo', members: 4, ppos: 2 },
    { company: 'PhonePe', stipend: '₹1.2L/mo', members: 3, ppos: 1 },
    { company: 'Groww', stipend: '₹1.0L/mo', members: 2, ppos: 1 },
    { company: 'Zepto', stipend: '₹1.0L/mo', members: 2, ppos: 1 }
  ],
  '2023': [
    { company: 'Tower Research', stipend: '₹2.5L/mo', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', stipend: '₹2.0L/mo', members: 1, ppos: 1 },
    { company: 'Google', stipend: '₹1.6L/mo', members: 2, ppos: '—' },
    { company: 'Microsoft', stipend: '₹1.5L/mo', members: 2, ppos: '—' },
    { company: 'Uber', stipend: '₹1.4L/mo', members: 1, ppos: 1 },
    { company: 'Razorpay', stipend: '₹1.0L/mo', members: 2, ppos: 2 },
    { company: 'Amazon', stipend: '₹1.0L/mo', members: 4, ppos: '—' }
  ],
  '2022': [
    { company: 'Google', stipend: '₹1.5L/mo', members: 2, ppos: 1 },
    { company: 'Microsoft', stipend: '₹1.4L/mo', members: 3, ppos: 1 },
    { company: 'Amazon', stipend: '₹1.0L/mo', members: 5, ppos: 2 }
  ]
};

const RAW_PLACEMENTS: Record<string, RawPlacementInput[]> = {
  '2026': [
    { company: 'Tower Research', ctc: '₹58L', members: 2, ppos: 2 },
    { company: 'Google', ctc: '₹55L', members: 3, ppos: 3 },
    { company: 'DE Shaw', ctc: '₹52L', members: 1, ppos: 1 },
    { company: 'Microsoft', ctc: '₹45L', members: 4, ppos: 2 },
    { company: 'Atlassian', ctc: '₹42L', members: 2, ppos: 1 },
    { company: 'Goldman Sachs', ctc: '₹40L', members: 3, ppos: 2 },
    { company: 'Uber', ctc: '₹38L', members: 3, ppos: 2 },
    { company: 'Razorpay', ctc: '₹30L', members: 5, ppos: 3 },
    { company: 'PhonePe', ctc: '₹28L', members: 3, ppos: 1 }
  ],
  '2025': [
    { company: 'Tower Research', ctc: '₹52L', members: 1, ppos: 1 },
    { company: 'Google', ctc: '₹52L', members: 2, ppos: 2 },
    { company: 'Microsoft', ctc: '₹42L', members: 3, ppos: 1 },
    { company: 'Atlassian', ctc: '₹40L', members: 2, ppos: '—' },
    { company: 'Goldman Sachs', ctc: '₹38L', members: 2, ppos: 2 },
    { company: 'Uber', ctc: '₹35L', members: 2, ppos: 1 },
    { company: 'Razorpay', ctc: '₹28L', members: 4, ppos: 2 }
  ],
  '2024': [
    { company: 'Tower Research', ctc: '₹52L', members: 1, ppos: 1 },
    { company: 'Google', ctc: '₹52L', members: 2, ppos: '—' },
    { company: 'Microsoft', ctc: '₹42L', members: 3, ppos: '—' },
    { company: 'Atlassian', ctc: '₹40L', members: 2, ppos: '—' },
    { company: 'Goldman Sachs', ctc: '₹38L', members: 2, ppos: '—' },
    { company: 'Uber', ctc: '₹35L', members: 2, ppos: 2 },
    { company: 'Razorpay', ctc: '₹28L', members: 5, ppos: 2 },
    { company: 'PhonePe', ctc: '₹22L', members: 3, ppos: 1 },
    { company: 'Groww', ctc: '₹20L', members: 2, ppos: 1 },
    { company: 'Zepto', ctc: '₹18L', members: 2, ppos: 1 }
  ],
  '2023': [
    { company: 'Tower Research', ctc: '₹45L', members: 1, ppos: 1 },
    { company: 'Microsoft', ctc: '₹38L', members: 2, ppos: '—' },
    { company: 'Google', ctc: '₹38L', members: 2, ppos: '—' },
    { company: 'Atlassian', ctc: '₹36L', members: 2, ppos: '—' },
    { company: 'Uber', ctc: '₹35L', members: 1, ppos: 1 },
    { company: 'Goldman Sachs', ctc: '₹28L', members: 1, ppos: 1 },
    { company: 'Amazon', ctc: '₹28L', members: 4, ppos: '—' },
    { company: 'Razorpay', ctc: '₹24L', members: 2, ppos: 2 }
  ],
  '2022': [
    { company: 'Google', ctc: '₹32L', members: 2, ppos: 1 },
    { company: 'Microsoft', ctc: '₹30L', members: 3, ppos: 1 },
    { company: 'Amazon', ctc: '₹25L', members: 5, ppos: 2 }
  ]
};

export const INTERNSHIPS_DATA: Record<string, { membersCount: number; companiesCount: number; items: InternshipItem[] }> = Object.keys(RAW_INTERNSHIPS).reduce((acc, year) => {
  const sortedItems = [...RAW_INTERNSHIPS[year]]
    .sort((a, b) => parseAmount(b.stipend) - parseAmount(a.stipend))
    .map((item, idx) => ({
      id: idx + 1,
      company: item.company,
      stipend: item.stipend,
      members: item.members,
      ppos: item.ppos,
      isPpoReceived: item.ppos !== '—' && Number(item.ppos) > 0
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
    .filter((item) => item.ppos !== '—' && Number(item.ppos) > 0)
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

const YOY_YEARS = ['2022', '2023', '2024', '2025', '2026'];
const AVG_CTC_MAP: Record<string, string> = {
  '2022': '₹11.4L',
  '2023': '₹13.8L',
  '2024': '₹16.2L',
  '2025': '₹18.4L',
  '2026': '₹20.4L'
};

export const YEAR_ON_YEAR_DATA: YearGrowthItem[] = YOY_YEARS.map((year) => {
  const internData = INTERNSHIPS_DATA[year];
  const placeData = PLACEMENTS_DATA[year];

  return {
    year,
    internships: internData?.membersCount ?? 0,
    placements: placeData?.offersCount ?? 0,
    avgCtc: AVG_CTC_MAP[year] || '—',
    highestCtc: placeData?.items?.[0]?.ctc || '—'
  };
});

const currentYear = '2026';
const currentYearYoy = YEAR_ON_YEAR_DATA.find((item) => item.year === currentYear);

export const OVERVIEW_STATS: PlacementStat[] = [
  { id: 'internships', label: 'INTERNSHIPS THIS YEAR', value: String(currentYearYoy?.internships ?? 0), subtitle: `COC members · ${currentYear}` },
  { id: 'placements', label: `PLACEMENTS (${currentYear})`, value: String(currentYearYoy?.placements ?? 0), subtitle: 'FTE offers accepted' },
  { id: 'ppos', label: 'PPOS RECEIVED', value: String(PPOS_DATA[currentYear]?.totalPpos ?? 0), subtitle: 'Accepted by members' },
  { id: 'highest_ctc', label: 'HIGHEST CTC', value: currentYearYoy?.highestCtc ?? '—', subtitle: 'Tower Research' },
  { id: 'avg_ctc', label: `AVG CTC (${currentYear})`, value: currentYearYoy?.avgCtc ?? '—', subtitle: 'across all roles' }
];
