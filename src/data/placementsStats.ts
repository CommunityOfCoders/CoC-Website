import {
  placementsData,
  DOMAIN_ORDER,
  type Domain,
  type PlacementYear,
  type Recruiter,
} from './placementsData';

export const YEARS = placementsData.map((y) => y.year);
export const FIRST_YEAR = placementsData[0];
export const LATEST_YEAR = placementsData[placementsData.length - 1];

export function getYear(year: number): PlacementYear {
  const found = placementsData.find((y) => y.year === year);
  if (!found) throw new Error(`No placement data for ${year}`);
  return found;
}

export function placementRate(y: PlacementYear): number {
  return (y.totalStudentsPlaced / y.totalEligible) * 100;
}

export function growthPct(current: number, previous: number): number {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}

export interface AllTime {
  highestPackageLPA: number;
  highestPackageYear: number;
  totalStudentsPlaced: number;
  averagePackageLPA: number;
  distinctRecruiters: number;
  topRecruiterAllTime: { name: string; totalOffers: number; appearances: number };
  seasons: number;
  packageGrowthPct: number; // first -> latest avg package
}

export function getAllTime(): AllTime {
  let highestPackageLPA = 0;
  let highestPackageYear = FIRST_YEAR.year;
  let totalStudentsPlaced = 0;
  let weightedPkgSum = 0;
  const names = new Set<string>();
  const recruiterTally = new Map<string, { offers: number; appearances: number }>();

  for (const y of placementsData) {
    if (y.highestPackageLPA > highestPackageLPA) {
      highestPackageLPA = y.highestPackageLPA;
      highestPackageYear = y.year;
    }
    totalStudentsPlaced += y.totalStudentsPlaced;
    weightedPkgSum += y.averagePackageLPA * y.totalStudentsPlaced;
    for (const r of y.topRecruiters) {
      names.add(r.name);
      const t = recruiterTally.get(r.name) ?? { offers: 0, appearances: 0 };
      t.offers += r.offers;
      t.appearances += 1;
      recruiterTally.set(r.name, t);
    }
  }

  let topRecruiterAllTime = { name: '', totalOffers: 0, appearances: 0 };
  for (const [name, t] of recruiterTally) {
    if (
      t.appearances > topRecruiterAllTime.appearances ||
      (t.appearances === topRecruiterAllTime.appearances && t.offers > topRecruiterAllTime.totalOffers)
    ) {
      topRecruiterAllTime = { name, totalOffers: t.offers, appearances: t.appearances };
    }
  }

  return {
    highestPackageLPA,
    highestPackageYear,
    totalStudentsPlaced,
    averagePackageLPA: weightedPkgSum / totalStudentsPlaced,
    distinctRecruiters: names.size,
    topRecruiterAllTime,
    seasons: placementsData.length,
    packageGrowthPct: growthPct(LATEST_YEAR.averagePackageLPA, FIRST_YEAR.averagePackageLPA),
  };
}

export type TrendMetric = 'placed' | 'avg' | 'highest';

export interface MetricConfig {
  key: TrendMetric;
  label: string;
  shortLabel: string;
  get: (y: PlacementYear) => number;
  format: (n: number) => string;
  suffix: string;
}

export const METRICS: Record<TrendMetric, MetricConfig> = {
  highest: {
    key: 'highest',
    label: 'Highest Package',
    shortLabel: 'Highest',
    get: (y) => y.highestPackageLPA,
    format: (n) => n.toFixed(1),
    suffix: ' LPA',
  },
  avg: {
    key: 'avg',
    label: 'Average Package',
    shortLabel: 'Average',
    get: (y) => y.averagePackageLPA,
    format: (n) => n.toFixed(1),
    suffix: ' LPA',
  },
  placed: {
    key: 'placed',
    label: 'Students Placed',
    shortLabel: 'Placed',
    get: (y) => y.totalStudentsPlaced,
    format: (n) => Math.round(n).toString(),
    suffix: '',
  },
};

export function topRecruiters(year: number, limit = 8): Recruiter[] {
  return [...getYear(year).topRecruiters]
    .sort((a, b) => b.offers - a.offers || b.packageLPA - a.packageLPA)
    .slice(0, limit);
}

export const DOMAIN_COLORS: Record<Domain, string> = {
  'Software & Product': 'var(--pl-green)',
  'Quant & Finance': 'var(--pl-clay)',
  'Consulting & Analytics': 'var(--pl-slate)',
  'Core & Semiconductor': 'var(--pl-sand)',
  'IT Services': 'var(--pl-grey)',
};

export function orderedDomainSplit(year: number) {
  const split = getYear(year).domainSplit;
  return [...split].sort(
    (a, b) => DOMAIN_ORDER.indexOf(a.domain) - DOMAIN_ORDER.indexOf(b.domain)
  );
}
