import { placementsData, type CompanyOffer, type PlacementYear } from './placementsData';

export function getYear(year: number): PlacementYear {
  const found = placementsData.find((y) => y.year === year);
  if (!found) throw new Error(`No placement data for year ${year}`);
  return found;
}

export function getLatestYear(): PlacementYear {
  return placementsData[placementsData.length - 1];
}

export function growthPct(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export interface AllTimeStats {
  totalStudentsPlaced: number;
  highestPackageLPA: number;
  averagePackageLPA: number;
  companiesCount: number;
}

export function getAllTimeStats(): AllTimeStats {
  let totalStudentsPlaced = 0;
  let highestPackageLPA = 0;
  let weightedSum = 0;
  const companyNames = new Set<string>();

  for (const y of placementsData) {
    totalStudentsPlaced += y.totalStudentsPlaced;
    highestPackageLPA = Math.max(highestPackageLPA, y.highestPackageLPA);
    weightedSum += y.averagePackageLPA * y.totalStudentsPlaced;
    for (const c of y.companies) companyNames.add(c.name);
  }

  return {
    totalStudentsPlaced,
    highestPackageLPA,
    averagePackageLPA: weightedSum / totalStudentsPlaced,
    companiesCount: companyNames.size,
  };
}

export function topCompaniesForYear(year: number, limit = 8): CompanyOffer[] {
  return [...getYear(year).companies]
    .sort((a, b) => b.offers - a.offers || (b.packageLPA ?? 0) - (a.packageLPA ?? 0))
    .slice(0, limit);
}
