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

export const OVERVIEW_STATS: PlacementStat[] = [
  { id: 'internships', label: 'INTERNSHIPS THIS YEAR', value: '84', subtitle: 'COC members · 2024–25' },
  { id: 'placements', label: 'PLACEMENTS (2024)', value: '142', subtitle: 'FTE offers accepted' },
  { id: 'ppos', label: 'PPOS RECEIVED', value: '7', subtitle: 'Accepted by members' },
  { id: 'highest_ctc', label: 'HIGHEST CTC', value: '₹52L', subtitle: 'Tower Research' },
  { id: 'avg_ctc', label: 'AVG CTC (2024)', value: '₹18.4L', subtitle: 'across all roles' }
];

export const INTERNSHIPS_DATA: Record<string, { membersCount: number; companiesCount: number; items: InternshipItem[] }> = {
  '2025': {
    membersCount: 32,
    companiesCount: 12,
    items: [
      { id: 1, company: 'Tower Research', stipend: '₹3L/mo', members: 1, ppos: 1, isPpoReceived: true },
      { id: 2, company: 'Goldman Sachs', stipend: '₹2.5L/mo', members: 2, ppos: 2, isPpoReceived: true },
      { id: 3, company: 'Atlassian', stipend: '₹2.2L/mo', members: 2, ppos: '—', isPpoReceived: false },
      { id: 4, company: 'Google', stipend: '₹2L/mo', members: 2, ppos: 2, isPpoReceived: true },
      { id: 5, company: 'Microsoft', stipend: '₹1.8L/mo', members: 3, ppos: 1, isPpoReceived: true },
      { id: 6, company: 'Uber', stipend: '₹1.5L/mo', members: 2, ppos: 1, isPpoReceived: true },
      { id: 7, company: 'Razorpay', stipend: '₹1.2L/mo', members: 4, ppos: 2, isPpoReceived: true }
    ]
  },
  '2024': {
    membersCount: 28,
    companiesCount: 10,
    items: [
      { id: 1, company: 'Tower Research', stipend: '₹2.8L/mo', members: 1, ppos: 1, isPpoReceived: true },
      { id: 2, company: 'Uber', stipend: '₹1.4L/mo', members: 2, ppos: 2, isPpoReceived: true },
      { id: 3, company: 'Razorpay', stipend: '₹1.2L/mo', members: 4, ppos: 2, isPpoReceived: true },
      { id: 4, company: 'PhonePe', stipend: '₹1.2L/mo', members: 3, ppos: 1, isPpoReceived: true },
      { id: 5, company: 'Groww', stipend: '₹1.0L/mo', members: 2, ppos: 1, isPpoReceived: true },
      { id: 6, company: 'Zepto', stipend: '₹1.0L/mo', members: 2, ppos: 1, isPpoReceived: true },
      { id: 7, company: 'Google', stipend: '₹1.8L/mo', members: 2, ppos: '—', isPpoReceived: false },
      { id: 8, company: 'Microsoft', stipend: '₹1.6L/mo', members: 3, ppos: '—', isPpoReceived: false },
      { id: 9, company: 'Atlassian', stipend: '₹2.0L/mo', members: 2, ppos: '—', isPpoReceived: false },
      { id: 10, company: 'Goldman Sachs', stipend: '₹2.2L/mo', members: 2, ppos: '—', isPpoReceived: false }
    ]
  },
  '2023': {
    membersCount: 24,
    companiesCount: 8,
    items: [
      { id: 1, company: 'Tower Research', stipend: '₹2.5L/mo', members: 1, ppos: 1, isPpoReceived: true },
      { id: 2, company: 'Uber', stipend: '₹1.4L/mo', members: 1, ppos: 1, isPpoReceived: true },
      { id: 3, company: 'Goldman Sachs', stipend: '₹2.0L/mo', members: 1, ppos: 1, isPpoReceived: true },
      { id: 4, company: 'Razorpay', stipend: '₹1.0L/mo', members: 2, ppos: 2, isPpoReceived: true },
      { id: 5, company: 'Google', stipend: '₹1.6L/mo', members: 2, ppos: '—', isPpoReceived: false },
      { id: 6, company: 'Microsoft', stipend: '₹1.5L/mo', members: 2, ppos: '—', isPpoReceived: false },
      { id: 7, company: 'Amazon', stipend: '₹1.0L/mo', members: 4, ppos: '—', isPpoReceived: false }
    ]
  },
  '2022': {
    membersCount: 20,
    companiesCount: 6,
    items: [
      { id: 1, company: 'Google', stipend: '₹1.5L/mo', members: 2, ppos: 1, isPpoReceived: true },
      { id: 2, company: 'Microsoft', stipend: '₹1.4L/mo', members: 3, ppos: 1, isPpoReceived: true },
      { id: 3, company: 'Amazon', stipend: '₹1.0L/mo', members: 5, ppos: 2, isPpoReceived: true }
    ]
  }
};

export const PLACEMENTS_DATA: Record<string, { offersCount: number; companiesCount: number; items: PlacementItem[] }> = {
  '2025': {
    offersCount: 48,
    companiesCount: 14,
    items: [
      { id: 1, company: 'Tower Research', ctc: '₹52L', members: 1, ppos: 1 },
      { id: 2, company: 'Goldman Sachs', ctc: '₹38L', members: 2, ppos: 2 },
      { id: 3, company: 'Google', ctc: '₹52L', members: 2, ppos: 2 },
      { id: 4, company: 'Microsoft', ctc: '₹42L', members: 3, ppos: 1 },
      { id: 5, company: 'Uber', ctc: '₹35L', members: 2, ppos: 1 },
      { id: 6, company: 'Razorpay', ctc: '₹28L', members: 4, ppos: 2 },
      { id: 7, company: 'Atlassian', ctc: '₹40L', members: 2, ppos: '—' }
    ]
  },
  '2024': {
    offersCount: 44,
    companiesCount: 12,
    items: [
      { id: 1, company: 'Tower Research', ctc: '₹52L', members: 1, ppos: 1 },
      { id: 2, company: 'Uber', ctc: '₹35L', members: 2, ppos: 2 },
      { id: 3, company: 'Razorpay', ctc: '₹28L', members: 5, ppos: 2 },
      { id: 4, company: 'PhonePe', ctc: '₹22L', members: 3, ppos: 1 },
      { id: 5, company: 'Groww', ctc: '₹20L', members: 2, ppos: 1 },
      { id: 6, company: 'Zepto', ctc: '₹18L', members: 2, ppos: 1 },
      { id: 7, company: 'Google', ctc: '₹52L', members: 2, ppos: '—' },
      { id: 8, company: 'Microsoft', ctc: '₹42L', members: 3, ppos: '—' },
      { id: 9, company: 'Atlassian', ctc: '₹40L', members: 2, ppos: '—' },
      { id: 10, company: 'Goldman Sachs', ctc: '₹38L', members: 2, ppos: '—' }
    ]
  },
  '2023': {
    offersCount: 38,
    companiesCount: 10,
    items: [
      { id: 1, company: 'Tower Research', ctc: '₹45L', members: 1, ppos: 1 },
      { id: 2, company: 'Uber', ctc: '₹35L', members: 1, ppos: 1 },
      { id: 3, company: 'Goldman Sachs', ctc: '₹28L', members: 1, ppos: 1 },
      { id: 4, company: 'Razorpay', ctc: '₹24L', members: 2, ppos: 2 },
      { id: 5, company: 'Microsoft', ctc: '₹38L', members: 2, ppos: '—' },
      { id: 6, company: 'Google', ctc: '₹38L', members: 2, ppos: '—' },
      { id: 7, company: 'Atlassian', ctc: '₹36L', members: 2, ppos: '—' },
      { id: 8, company: 'Amazon', ctc: '₹28L', members: 4, ppos: '—' }
    ]
  },
  '2022': {
    offersCount: 32,
    companiesCount: 8,
    items: [
      { id: 1, company: 'Google', ctc: '₹32L', members: 2, ppos: 1 },
      { id: 2, company: 'Microsoft', ctc: '₹30L', members: 3, ppos: 1 },
      { id: 3, company: 'Amazon', ctc: '₹25L', members: 5, ppos: 2 }
    ]
  }
};

export const PPOS_DATA: Record<string, { totalPpos: number; companiesCount: number; season: string; items: PPOItem[] }> = {
  '2025': {
    totalPpos: 9,
    companiesCount: 6,
    season: '2025 season',
    items: [
      { id: 1, company: 'Tower Research', members: 1, ctc: '₹52L' },
      { id: 2, company: 'Goldman Sachs', members: 2, ctc: '₹38L' },
      { id: 3, company: 'Google', members: 2, ctc: '₹52L' },
      { id: 4, company: 'Razorpay', members: 2, ctc: '₹28L' },
      { id: 5, company: 'Microsoft', members: 1, ctc: '₹42L' },
      { id: 6, company: 'Uber', members: 1, ctc: '₹35L' }
    ]
  },
  '2024': {
    totalPpos: 7,
    companiesCount: 6,
    season: '2024 season',
    items: [
      { id: 1, company: 'Tower Research', members: 1, ctc: '₹52L' },
      { id: 2, company: 'Uber', members: 2, ctc: '₹35L' },
      { id: 3, company: 'Razorpay', members: 2, ctc: '₹28L' },
      { id: 4, company: 'PhonePe', members: 1, ctc: '₹22L' },
      { id: 5, company: 'Groww', members: 1, ctc: '₹20L' },
      { id: 6, company: 'Zepto', members: 1, ctc: '₹18L' }
    ]
  },
  '2023': {
    totalPpos: 5,
    companiesCount: 4,
    season: '2023 season',
    items: [
      { id: 1, company: 'Tower Research', members: 1, ctc: '₹45L' },
      { id: 2, company: 'Uber', members: 1, ctc: '₹35L' },
      { id: 3, company: 'Goldman Sachs', members: 1, ctc: '₹28L' },
      { id: 4, company: 'Razorpay', members: 2, ctc: '₹24L' }
    ]
  },
  '2022': {
    totalPpos: 4,
    companiesCount: 3,
    season: '2022 season',
    items: [
      { id: 1, company: 'Google', members: 1, ctc: '₹32L' },
      { id: 2, company: 'Microsoft', members: 1, ctc: '₹30L' },
      { id: 3, company: 'Amazon', members: 2, ctc: '₹25L' }
    ]
  }
};

export const YEAR_ON_YEAR_DATA: YearGrowthItem[] = [
  { year: '2021', internships: 28, placements: 62, avgCtc: '₹9.2L', highestCtc: '₹22L' },
  { year: '2022', internships: 41, placements: 88, avgCtc: '₹11.4L', highestCtc: '₹32L' },
  { year: '2023', internships: 56, placements: 104, avgCtc: '₹13.8L', highestCtc: '₹45L' },
  { year: '2024', internships: 68, placements: 128, avgCtc: '₹16.2L', highestCtc: '₹52L' },
  { year: '2025', internships: 84, placements: 142, avgCtc: '₹18.4L', highestCtc: '₹52L' }
];
