export type Domain =
  | 'Software & Product'
  | 'Quant & Finance'
  | 'Consulting & Analytics'
  | 'Core & Semiconductor'
  | 'IT Services';

export interface CompanyOffer {
  name: string;
  offers: number;
  packageLPA: number | null;
  domain: Domain;
}

export interface DomainCount {
  domain: Domain;
  count: number;
}

export interface MonthlyDrive {
  month: string;
  offers: number;
}

export interface PlacementYear {
  year: number;
  totalStudentsPlaced: number;
  highestPackageLPA: number;
  averagePackageLPA: number;
  medianPackageLPA: number;
  companies: CompanyOffer[];
  domainSplit: DomainCount[];
  monthlyDrives: MonthlyDrive[] | null;
}

export const placementsData: PlacementYear[] = [
  {
    year: 2025,
    totalStudentsPlaced: 137,
    highestPackageLPA: 54,
    averagePackageLPA: 15.57,
    medianPackageLPA: 13,
    companies: [
      { name: 'Bank of America', offers: 30, packageLPA: 19, domain: 'Quant & Finance' },
      { name: 'Oracle', offers: 13, packageLPA: 19.2, domain: 'Software & Product' },
      { name: 'SAP Labs', offers: 10, packageLPA: 23.5, domain: 'Software & Product' },
      { name: 'Citi', offers: 10, packageLPA: 19.1, domain: 'Quant & Finance' },
      { name: 'NPCI', offers: 9, packageLPA: 16.2, domain: 'Quant & Finance' },
      { name: 'ICICI Group', offers: 6, packageLPA: 11.4, domain: 'Quant & Finance' },
      { name: 'J.P. Morgan', offers: 5, packageLPA: 19.8, domain: 'Quant & Finance' },
      { name: 'Deloitte', offers: 4, packageLPA: 8.1, domain: 'Consulting & Analytics' },
      { name: 'Goldman Sachs', offers: 3, packageLPA: 30, domain: 'Quant & Finance' },
      { name: 'Morgan Stanley', offers: 3, packageLPA: 29.5, domain: 'Quant & Finance' },
      { name: 'Hilti', offers: 3, packageLPA: 23, domain: 'Core & Semiconductor' },
      { name: 'Affinity Global', offers: 3, packageLPA: 9.8, domain: 'Software & Product' },
      { name: 'Texas Instruments', offers: 2, packageLPA: 38.5, domain: 'Core & Semiconductor' },
      { name: 'Aditya Birla Capital', offers: 2, packageLPA: 13.5, domain: 'Quant & Finance' },
      { name: 'UBS', offers: 2, packageLPA: 12.5, domain: 'Quant & Finance' },
      { name: 'ideaForge', offers: 2, packageLPA: 12, domain: 'Core & Semiconductor' },
      { name: 'Wissen Technology', offers: 2, packageLPA: 11, domain: 'Software & Product' },
      { name: 'IDfy', offers: 2, packageLPA: 10, domain: 'Software & Product' },
      { name: 'Fractal Analytics', offers: 2, packageLPA: 9.5, domain: 'Consulting & Analytics' },
      { name: 'Cognext', offers: 2, packageLPA: 9, domain: 'Software & Product' },
      { name: 'EY', offers: 2, packageLPA: 8.6, domain: 'Consulting & Analytics' },
      { name: 'IndusInd Bank', offers: 2, packageLPA: 5, domain: 'Quant & Finance' },
      { name: 'Google', offers: 1, packageLPA: 54, domain: 'Software & Product' },
      { name: 'Microsoft', offers: 1, packageLPA: 51, domain: 'Software & Product' },
      { name: 'IMC Trading', offers: 1, packageLPA: 40, domain: 'Quant & Finance' },
      { name: 'Dream11', offers: 1, packageLPA: 16, domain: 'Software & Product' },
      { name: 'Gupshup', offers: 1, packageLPA: 16, domain: 'Software & Product' },
      { name: 'Mondelez International', offers: 1, packageLPA: 15.4, domain: 'Quant & Finance' },
      { name: 'Mastercard', offers: 1, packageLPA: 13.4, domain: 'Quant & Finance' },
      { name: 'Broadridge Financial Solutions', offers: 1, packageLPA: 12.5, domain: 'Quant & Finance' },
      { name: 'Tata AIG', offers: 1, packageLPA: 11.7, domain: 'Quant & Finance' },
      { name: 'ProcDNA', offers: 1, packageLPA: 11.1, domain: 'Software & Product' },
      { name: 'Thermax', offers: 1, packageLPA: 10, domain: 'Core & Semiconductor' },
      { name: 'Aptivaa', offers: 1, packageLPA: 9, domain: 'Software & Product' },
      { name: 'Axis Bank', offers: 1, packageLPA: 8, domain: 'Quant & Finance' },
      { name: 'CleanMax', offers: 1, packageLPA: 8, domain: 'Core & Semiconductor' },
      { name: 'AurionPro', offers: 1, packageLPA: 7, domain: 'Software & Product' },
      { name: 'TCS', offers: 1, packageLPA: 7, domain: 'IT Services' },
      { name: 'Infosys', offers: 1, packageLPA: 3.6, domain: 'IT Services' },
      { name: 'P&G', offers: 1, packageLPA: null, domain: 'Software & Product' },
    ],
    domainSplit: [
      { domain: 'Quant & Finance', count: 78 },
      { domain: 'Software & Product', count: 40 },
      { domain: 'Core & Semiconductor', count: 9 },
      { domain: 'Consulting & Analytics', count: 8 },
      { domain: 'IT Services', count: 2 },
    ],
    monthlyDrives: null,
  },
  {
    year: 2026,
    totalStudentsPlaced: 145,
    highestPackageLPA: 67,
    averagePackageLPA: 17.16,
    medianPackageLPA: 15,
    companies: [
      { name: 'HSBC', offers: 12, packageLPA: 50, domain: 'Quant & Finance' },
      { name: 'ICICI Group', offers: 9, packageLPA: 12, domain: 'Quant & Finance' },
      { name: 'Oracle', offers: 8, packageLPA: 50, domain: 'Software & Product' },
      { name: 'Morgan Stanley', offers: 7, packageLPA: 29, domain: 'Quant & Finance' },
      { name: 'Mastercard', offers: 7, packageLPA: 22, domain: 'Quant & Finance' },
      { name: 'Citi', offers: 7, packageLPA: 18, domain: 'Quant & Finance' },
      { name: 'Bank of America', offers: 5, packageLPA: 18.9, domain: 'Quant & Finance' },
      { name: 'Mahindra Finance', offers: 5, packageLPA: 16, domain: 'Quant & Finance' },
      { name: 'KPMG', offers: 5, packageLPA: 10, domain: 'Consulting & Analytics' },
      { name: 'Affinity Global', offers: 5, packageLPA: 9.8, domain: 'Software & Product' },
      { name: 'Goldman Sachs', offers: 4, packageLPA: 30, domain: 'Quant & Finance' },
      { name: 'Wells Fargo', offers: 4, packageLPA: 24, domain: 'Quant & Finance' },
      { name: 'J.P. Morgan', offers: 4, packageLPA: 19, domain: 'Quant & Finance' },
      { name: 'Hilti', offers: 4, packageLPA: 18, domain: 'Core & Semiconductor' },
      { name: 'NPCI', offers: 4, packageLPA: 16.2, domain: 'Quant & Finance' },
      { name: 'Unity Small Finance Bank', offers: 4, packageLPA: 16, domain: 'Quant & Finance' },
      { name: 'Dolat Capital', offers: 4, packageLPA: 14, domain: 'Quant & Finance' },
      { name: 'BNY Mellon', offers: 3, packageLPA: 22, domain: 'Quant & Finance' },
      { name: 'UPL', offers: 3, packageLPA: 22, domain: 'Core & Semiconductor' },
      { name: 'Media.net', offers: 3, packageLPA: 14.5, domain: 'Software & Product' },
      { name: 'CleverTap', offers: 3, packageLPA: 14, domain: 'Software & Product' },
      { name: 'Deloitte', offers: 3, packageLPA: 8.1, domain: 'Consulting & Analytics' },
      { name: 'Google', offers: 2, packageLPA: 50, domain: 'Software & Product' },
      { name: 'Texas Instruments', offers: 2, packageLPA: 40, domain: 'Core & Semiconductor' },
      { name: 'Tata AIG', offers: 2, packageLPA: 22, domain: 'Quant & Finance' },
      { name: 'BrowserStack', offers: 2, packageLPA: 18, domain: 'Software & Product' },
      { name: 'Thermax', offers: 2, packageLPA: 10, domain: 'Core & Semiconductor' },
      { name: 'Fractal Analytics', offers: 2, packageLPA: 9.5, domain: 'Consulting & Analytics' },
      { name: 'EY', offers: 2, packageLPA: 9.2, domain: 'Consulting & Analytics' },
      { name: 'Think360', offers: 2, packageLPA: 8.1, domain: 'Software & Product' },
      { name: 'Ayaan Automation', offers: 2, packageLPA: 8, domain: 'Core & Semiconductor' },
      { name: 'DE Shaw', offers: 1, packageLPA: 67, domain: 'Quant & Finance' },
      { name: 'Futures First', offers: 1, packageLPA: 17, domain: 'Quant & Finance' },
      { name: 'Russell Investments', offers: 1, packageLPA: 15.4, domain: 'Quant & Finance' },
      { name: 'Aditya Birla Capital', offers: 1, packageLPA: 13.5, domain: 'Quant & Finance' },
      { name: 'FYNDNA', offers: 1, packageLPA: 12, domain: 'Software & Product' },
      { name: 'Sciative Solutions', offers: 1, packageLPA: 10, domain: 'Software & Product' },
      { name: 'CogNext', offers: 1, packageLPA: 9, domain: 'Software & Product' },
      { name: 'GEP', offers: 1, packageLPA: 9, domain: 'Software & Product' },
      { name: 'CarWale', offers: 1, packageLPA: 9, domain: 'Software & Product' },
      { name: 'Axis Bank', offers: 1, packageLPA: 8, domain: 'Quant & Finance' },
      { name: 'Alepo', offers: 1, packageLPA: 8, domain: 'Software & Product' },
      { name: 'Factwise', offers: 1, packageLPA: 8, domain: 'Software & Product' },
      { name: 'Godrej', offers: 1, packageLPA: 7, domain: 'Core & Semiconductor' },
      { name: 'NCS', offers: 1, packageLPA: 6.9, domain: 'IT Services' },
    ],
    domainSplit: [
      { domain: 'Quant & Finance', count: 86 },
      { domain: 'Software & Product', count: 32 },
      { domain: 'Core & Semiconductor', count: 14 },
      { domain: 'Consulting & Analytics', count: 12 },
      { domain: 'IT Services', count: 1 },
    ],
    monthlyDrives: [
      { month: 'Jul', offers: 12 },
      { month: 'Aug', offers: 19 },
      { month: 'Sep', offers: 7 },
      { month: 'Oct', offers: 19 },
      { month: 'Nov', offers: 0 },
      { month: 'Dec', offers: 1 },
      { month: 'Jan', offers: 0 },
      { month: 'Feb', offers: 0 },
      { month: 'Mar', offers: 0 },
      { month: 'Apr', offers: 3 },
      { month: 'May', offers: 9 },
      { month: 'Jun', offers: 8 },
    ],
  },
];

export const DOMAIN_ORDER: Domain[] = [
  'Software & Product',
  'Quant & Finance',
  'Consulting & Analytics',
  'Core & Semiconductor',
  'IT Services',
];
