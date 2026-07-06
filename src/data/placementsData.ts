// Auto-generated placement dataset — 11 seasons (2016–2026).
// Trajectory figures (2016–2026) are illustrative/historical; 2025 & 2026 topRecruiters
// and domainSplit are the club's real aggregate IT+CE data (verifiedSource: true).

export type Domain =
  | 'Software & Product'
  | 'Quant & Finance'
  | 'Consulting & Analytics'
  | 'Core & Semiconductor'
  | 'IT Services';

export interface Recruiter {
  name: string;
  offers: number;
  packageLPA: number;
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
  classLabel: string;
  totalEligible: number;
  totalStudentsPlaced: number;
  branchSplit: { CE: number; IT: number };
  highestPackageLPA: number;
  averagePackageLPA: number;
  medianPackageLPA: number;
  recruitingCompaniesCount: number;
  verifiedSource: boolean;
  topRecruiters: Recruiter[];
  domainSplit: DomainCount[];
  monthlyDrives: MonthlyDrive[];
}

export const DOMAIN_ORDER: Domain[] = [
  'Software & Product',
  'Quant & Finance',
  'Consulting & Analytics',
  'Core & Semiconductor',
  'IT Services',
];

export const placementsData: PlacementYear[] = [
  {
    "year": 2016,
    "classLabel": "Class of 2016",
    "totalEligible": 212,
    "totalStudentsPlaced": 166,
    "branchSplit": {
      "CE": 91,
      "IT": 75
    },
    "highestPackageLPA": 17.3,
    "averagePackageLPA": 5.3,
    "medianPackageLPA": 4.7,
    "recruitingCompaniesCount": 59,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Amazon",
        "offers": 12,
        "packageLPA": 7.2,
        "domain": "Software & Product"
      },
      {
        "name": "Uber",
        "offers": 12,
        "packageLPA": 15,
        "domain": "Software & Product"
      },
      {
        "name": "Atlassian",
        "offers": 11,
        "packageLPA": 5.3,
        "domain": "Software & Product"
      },
      {
        "name": "JP Morgan",
        "offers": 9,
        "packageLPA": 4.9,
        "domain": "Quant & Finance"
      },
      {
        "name": "Mahindra Finance",
        "offers": 9,
        "packageLPA": 4.7,
        "domain": "IT Services"
      },
      {
        "name": "Microsoft",
        "offers": 8,
        "packageLPA": 7.2,
        "domain": "Software & Product"
      },
      {
        "name": "Zomato",
        "offers": 8,
        "packageLPA": 5,
        "domain": "Software & Product"
      },
      {
        "name": "Citi",
        "offers": 8,
        "packageLPA": 11.4,
        "domain": "Quant & Finance"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 49
      },
      {
        "domain": "Quant & Finance",
        "count": 29
      },
      {
        "domain": "Consulting & Analytics",
        "count": 16
      },
      {
        "domain": "Core & Semiconductor",
        "count": 33
      },
      {
        "domain": "IT Services",
        "count": 39
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 16
      },
      {
        "month": "Aug",
        "offers": 24
      },
      {
        "month": "Sep",
        "offers": 22
      },
      {
        "month": "Oct",
        "offers": 27
      },
      {
        "month": "Nov",
        "offers": 18
      },
      {
        "month": "Dec",
        "offers": 11
      },
      {
        "month": "Jan",
        "offers": 9
      },
      {
        "month": "Feb",
        "offers": 7
      },
      {
        "month": "Mar",
        "offers": 9
      },
      {
        "month": "Apr",
        "offers": 23
      }
    ]
  },
  {
    "year": 2017,
    "classLabel": "Class of 2017",
    "totalEligible": 231,
    "totalStudentsPlaced": 184,
    "branchSplit": {
      "CE": 102,
      "IT": 82
    },
    "highestPackageLPA": 22.5,
    "averagePackageLPA": 6.7,
    "medianPackageLPA": 5.9,
    "recruitingCompaniesCount": 64,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Uber",
        "offers": 12,
        "packageLPA": 19.3,
        "domain": "Software & Product"
      },
      {
        "name": "Infosys",
        "offers": 11,
        "packageLPA": 8.4,
        "domain": "IT Services"
      },
      {
        "name": "HSBC",
        "offers": 10,
        "packageLPA": 11.3,
        "domain": "Quant & Finance"
      },
      {
        "name": "Atlassian",
        "offers": 9,
        "packageLPA": 9.2,
        "domain": "Software & Product"
      },
      {
        "name": "Bank of America",
        "offers": 8,
        "packageLPA": 18.8,
        "domain": "Quant & Finance"
      },
      {
        "name": "Qualcomm",
        "offers": 8,
        "packageLPA": 8.2,
        "domain": "Core & Semiconductor"
      },
      {
        "name": "Citi",
        "offers": 6,
        "packageLPA": 19.9,
        "domain": "Quant & Finance"
      },
      {
        "name": "Morgan Stanley",
        "offers": 3,
        "packageLPA": 8.5,
        "domain": "Quant & Finance"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 57
      },
      {
        "domain": "Quant & Finance",
        "count": 33
      },
      {
        "domain": "Consulting & Analytics",
        "count": 18
      },
      {
        "domain": "Core & Semiconductor",
        "count": 35
      },
      {
        "domain": "IT Services",
        "count": 41
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 18
      },
      {
        "month": "Aug",
        "offers": 23
      },
      {
        "month": "Sep",
        "offers": 27
      },
      {
        "month": "Oct",
        "offers": 33
      },
      {
        "month": "Nov",
        "offers": 20
      },
      {
        "month": "Dec",
        "offers": 15
      },
      {
        "month": "Jan",
        "offers": 12
      },
      {
        "month": "Feb",
        "offers": 8
      },
      {
        "month": "Mar",
        "offers": 10
      },
      {
        "month": "Apr",
        "offers": 18
      }
    ]
  },
  {
    "year": 2018,
    "classLabel": "Class of 2018",
    "totalEligible": 209,
    "totalStudentsPlaced": 172,
    "branchSplit": {
      "CE": 94,
      "IT": 78
    },
    "highestPackageLPA": 26.6,
    "averagePackageLPA": 7.3,
    "medianPackageLPA": 6.1,
    "recruitingCompaniesCount": 56,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Google",
        "offers": 12,
        "packageLPA": 11.6,
        "domain": "Software & Product"
      },
      {
        "name": "Qualcomm",
        "offers": 11,
        "packageLPA": 17.4,
        "domain": "Core & Semiconductor"
      },
      {
        "name": "Mahindra Finance",
        "offers": 11,
        "packageLPA": 23.6,
        "domain": "IT Services"
      },
      {
        "name": "Adobe",
        "offers": 8,
        "packageLPA": 22.8,
        "domain": "Software & Product"
      },
      {
        "name": "Amazon",
        "offers": 7,
        "packageLPA": 24.7,
        "domain": "Software & Product"
      },
      {
        "name": "Flipkart",
        "offers": 7,
        "packageLPA": 22.1,
        "domain": "Software & Product"
      },
      {
        "name": "Atlassian",
        "offers": 7,
        "packageLPA": 9.9,
        "domain": "Software & Product"
      },
      {
        "name": "Infosys",
        "offers": 5,
        "packageLPA": 14.3,
        "domain": "IT Services"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 55
      },
      {
        "domain": "Quant & Finance",
        "count": 32
      },
      {
        "domain": "Consulting & Analytics",
        "count": 18
      },
      {
        "domain": "Core & Semiconductor",
        "count": 31
      },
      {
        "domain": "IT Services",
        "count": 36
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 19
      },
      {
        "month": "Aug",
        "offers": 27
      },
      {
        "month": "Sep",
        "offers": 24
      },
      {
        "month": "Oct",
        "offers": 30
      },
      {
        "month": "Nov",
        "offers": 17
      },
      {
        "month": "Dec",
        "offers": 14
      },
      {
        "month": "Jan",
        "offers": 11
      },
      {
        "month": "Feb",
        "offers": 7
      },
      {
        "month": "Mar",
        "offers": 10
      },
      {
        "month": "Apr",
        "offers": 13
      }
    ]
  },
  {
    "year": 2019,
    "classLabel": "Class of 2019",
    "totalEligible": 214,
    "totalStudentsPlaced": 176,
    "branchSplit": {
      "CE": 95,
      "IT": 81
    },
    "highestPackageLPA": 33.8,
    "averagePackageLPA": 8.7,
    "medianPackageLPA": 7.3,
    "recruitingCompaniesCount": 50,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Qualcomm",
        "offers": 12,
        "packageLPA": 21.1,
        "domain": "Core & Semiconductor"
      },
      {
        "name": "TCS",
        "offers": 10,
        "packageLPA": 28.6,
        "domain": "IT Services"
      },
      {
        "name": "Infosys",
        "offers": 9,
        "packageLPA": 11,
        "domain": "IT Services"
      },
      {
        "name": "Citi",
        "offers": 8,
        "packageLPA": 17.1,
        "domain": "Quant & Finance"
      },
      {
        "name": "Bank of America",
        "offers": 7,
        "packageLPA": 23.5,
        "domain": "Quant & Finance"
      },
      {
        "name": "JP Morgan",
        "offers": 6,
        "packageLPA": 21.4,
        "domain": "Quant & Finance"
      },
      {
        "name": "ICICI Group",
        "offers": 6,
        "packageLPA": 20.1,
        "domain": "Quant & Finance"
      },
      {
        "name": "Nvidia",
        "offers": 6,
        "packageLPA": 26.5,
        "domain": "Core & Semiconductor"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 59
      },
      {
        "domain": "Quant & Finance",
        "count": 33
      },
      {
        "domain": "Consulting & Analytics",
        "count": 19
      },
      {
        "domain": "Core & Semiconductor",
        "count": 30
      },
      {
        "domain": "IT Services",
        "count": 35
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 18
      },
      {
        "month": "Aug",
        "offers": 28
      },
      {
        "month": "Sep",
        "offers": 24
      },
      {
        "month": "Oct",
        "offers": 30
      },
      {
        "month": "Nov",
        "offers": 20
      },
      {
        "month": "Dec",
        "offers": 15
      },
      {
        "month": "Jan",
        "offers": 9
      },
      {
        "month": "Feb",
        "offers": 7
      },
      {
        "month": "Mar",
        "offers": 10
      },
      {
        "month": "Apr",
        "offers": 15
      }
    ]
  },
  {
    "year": 2020,
    "classLabel": "Class of 2020",
    "totalEligible": 236,
    "totalStudentsPlaced": 196,
    "branchSplit": {
      "CE": 110,
      "IT": 86
    },
    "highestPackageLPA": 37.5,
    "averagePackageLPA": 10.2,
    "medianPackageLPA": 8.4,
    "recruitingCompaniesCount": 50,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Texas Instruments",
        "offers": 12,
        "packageLPA": 20.7,
        "domain": "Core & Semiconductor"
      },
      {
        "name": "Mahindra Finance",
        "offers": 11,
        "packageLPA": 26,
        "domain": "IT Services"
      },
      {
        "name": "Morgan Stanley",
        "offers": 11,
        "packageLPA": 8.9,
        "domain": "Quant & Finance"
      },
      {
        "name": "TCS",
        "offers": 11,
        "packageLPA": 11.6,
        "domain": "IT Services"
      },
      {
        "name": "JP Morgan",
        "offers": 11,
        "packageLPA": 9.4,
        "domain": "Quant & Finance"
      },
      {
        "name": "Bank of America",
        "offers": 10,
        "packageLPA": 15.3,
        "domain": "Quant & Finance"
      },
      {
        "name": "Google",
        "offers": 10,
        "packageLPA": 11.5,
        "domain": "Software & Product"
      },
      {
        "name": "Microsoft",
        "offers": 9,
        "packageLPA": 14.7,
        "domain": "Software & Product"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 68
      },
      {
        "domain": "Quant & Finance",
        "count": 38
      },
      {
        "domain": "Consulting & Analytics",
        "count": 21
      },
      {
        "domain": "Core & Semiconductor",
        "count": 32
      },
      {
        "domain": "IT Services",
        "count": 37
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 20
      },
      {
        "month": "Aug",
        "offers": 25
      },
      {
        "month": "Sep",
        "offers": 27
      },
      {
        "month": "Oct",
        "offers": 39
      },
      {
        "month": "Nov",
        "offers": 21
      },
      {
        "month": "Dec",
        "offers": 16
      },
      {
        "month": "Jan",
        "offers": 12
      },
      {
        "month": "Feb",
        "offers": 9
      },
      {
        "month": "Mar",
        "offers": 12
      },
      {
        "month": "Apr",
        "offers": 15
      }
    ]
  },
  {
    "year": 2021,
    "classLabel": "Class of 2021",
    "totalEligible": 220,
    "totalStudentsPlaced": 191,
    "branchSplit": {
      "CE": 101,
      "IT": 90
    },
    "highestPackageLPA": 41.6,
    "averagePackageLPA": 11.1,
    "medianPackageLPA": 9.3,
    "recruitingCompaniesCount": 50,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Atlassian",
        "offers": 12,
        "packageLPA": 14.5,
        "domain": "Software & Product"
      },
      {
        "name": "Amazon",
        "offers": 11,
        "packageLPA": 8,
        "domain": "Software & Product"
      },
      {
        "name": "Google",
        "offers": 11,
        "packageLPA": 17.3,
        "domain": "Software & Product"
      },
      {
        "name": "Qualcomm",
        "offers": 10,
        "packageLPA": 34.2,
        "domain": "Core & Semiconductor"
      },
      {
        "name": "EY",
        "offers": 8,
        "packageLPA": 16.8,
        "domain": "Consulting & Analytics"
      },
      {
        "name": "JP Morgan",
        "offers": 8,
        "packageLPA": 14.2,
        "domain": "Quant & Finance"
      },
      {
        "name": "BCG",
        "offers": 7,
        "packageLPA": 27.2,
        "domain": "Consulting & Analytics"
      },
      {
        "name": "Deloitte",
        "offers": 7,
        "packageLPA": 23.8,
        "domain": "Consulting & Analytics"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 68
      },
      {
        "domain": "Quant & Finance",
        "count": 38
      },
      {
        "domain": "Consulting & Analytics",
        "count": 21
      },
      {
        "domain": "Core & Semiconductor",
        "count": 30
      },
      {
        "domain": "IT Services",
        "count": 34
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 16
      },
      {
        "month": "Aug",
        "offers": 26
      },
      {
        "month": "Sep",
        "offers": 28
      },
      {
        "month": "Oct",
        "offers": 29
      },
      {
        "month": "Nov",
        "offers": 24
      },
      {
        "month": "Dec",
        "offers": 15
      },
      {
        "month": "Jan",
        "offers": 10
      },
      {
        "month": "Feb",
        "offers": 10
      },
      {
        "month": "Mar",
        "offers": 11
      },
      {
        "month": "Apr",
        "offers": 22
      }
    ]
  },
  {
    "year": 2022,
    "classLabel": "Class of 2022",
    "totalEligible": 233,
    "totalStudentsPlaced": 201,
    "branchSplit": {
      "CE": 102,
      "IT": 99
    },
    "highestPackageLPA": 46.2,
    "averagePackageLPA": 12.4,
    "medianPackageLPA": 10.9,
    "recruitingCompaniesCount": 54,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "Mahindra Finance",
        "offers": 11,
        "packageLPA": 39.8,
        "domain": "IT Services"
      },
      {
        "name": "Goldman Sachs",
        "offers": 9,
        "packageLPA": 43,
        "domain": "Quant & Finance"
      },
      {
        "name": "ICICI Group",
        "offers": 6,
        "packageLPA": 32.7,
        "domain": "Quant & Finance"
      },
      {
        "name": "Atlassian",
        "offers": 6,
        "packageLPA": 39.1,
        "domain": "Software & Product"
      },
      {
        "name": "Mastercard",
        "offers": 5,
        "packageLPA": 41.3,
        "domain": "Quant & Finance"
      },
      {
        "name": "Microsoft",
        "offers": 5,
        "packageLPA": 39.7,
        "domain": "Software & Product"
      },
      {
        "name": "TCS",
        "offers": 4,
        "packageLPA": 21.1,
        "domain": "IT Services"
      },
      {
        "name": "Flipkart",
        "offers": 3,
        "packageLPA": 40.3,
        "domain": "Software & Product"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 74
      },
      {
        "domain": "Quant & Finance",
        "count": 41
      },
      {
        "domain": "Consulting & Analytics",
        "count": 23
      },
      {
        "domain": "Core & Semiconductor",
        "count": 30
      },
      {
        "domain": "IT Services",
        "count": 33
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 21
      },
      {
        "month": "Aug",
        "offers": 27
      },
      {
        "month": "Sep",
        "offers": 33
      },
      {
        "month": "Oct",
        "offers": 38
      },
      {
        "month": "Nov",
        "offers": 22
      },
      {
        "month": "Dec",
        "offers": 14
      },
      {
        "month": "Jan",
        "offers": 12
      },
      {
        "month": "Feb",
        "offers": 9
      },
      {
        "month": "Mar",
        "offers": 10
      },
      {
        "month": "Apr",
        "offers": 15
      }
    ]
  },
  {
    "year": 2023,
    "classLabel": "Class of 2023",
    "totalEligible": 239,
    "totalStudentsPlaced": 206,
    "branchSplit": {
      "CE": 116,
      "IT": 90
    },
    "highestPackageLPA": 53.2,
    "averagePackageLPA": 13.1,
    "medianPackageLPA": 11.1,
    "recruitingCompaniesCount": 45,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "BCG",
        "offers": 12,
        "packageLPA": 27.1,
        "domain": "Consulting & Analytics"
      },
      {
        "name": "Uber",
        "offers": 12,
        "packageLPA": 17,
        "domain": "Software & Product"
      },
      {
        "name": "Google",
        "offers": 11,
        "packageLPA": 22.9,
        "domain": "Software & Product"
      },
      {
        "name": "Amazon",
        "offers": 11,
        "packageLPA": 14,
        "domain": "Software & Product"
      },
      {
        "name": "Citi",
        "offers": 9,
        "packageLPA": 37.3,
        "domain": "Quant & Finance"
      },
      {
        "name": "Deloitte",
        "offers": 8,
        "packageLPA": 27.2,
        "domain": "Consulting & Analytics"
      },
      {
        "name": "JP Morgan",
        "offers": 7,
        "packageLPA": 16.6,
        "domain": "Quant & Finance"
      },
      {
        "name": "HSBC",
        "offers": 7,
        "packageLPA": 10.8,
        "domain": "Quant & Finance"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 79
      },
      {
        "domain": "Quant & Finance",
        "count": 42
      },
      {
        "domain": "Consulting & Analytics",
        "count": 24
      },
      {
        "domain": "Core & Semiconductor",
        "count": 29
      },
      {
        "domain": "IT Services",
        "count": 32
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 20
      },
      {
        "month": "Aug",
        "offers": 31
      },
      {
        "month": "Sep",
        "offers": 34
      },
      {
        "month": "Oct",
        "offers": 41
      },
      {
        "month": "Nov",
        "offers": 26
      },
      {
        "month": "Dec",
        "offers": 14
      },
      {
        "month": "Jan",
        "offers": 12
      },
      {
        "month": "Feb",
        "offers": 11
      },
      {
        "month": "Mar",
        "offers": 13
      },
      {
        "month": "Apr",
        "offers": 4
      }
    ]
  },
  {
    "year": 2024,
    "classLabel": "Class of 2024",
    "totalEligible": 224,
    "totalStudentsPlaced": 199,
    "branchSplit": {
      "CE": 110,
      "IT": 89
    },
    "highestPackageLPA": 56.1,
    "averagePackageLPA": 14.5,
    "medianPackageLPA": 12.5,
    "recruitingCompaniesCount": 50,
    "verifiedSource": false,
    "topRecruiters": [
      {
        "name": "EY",
        "offers": 12,
        "packageLPA": 36.3,
        "domain": "Consulting & Analytics"
      },
      {
        "name": "Morgan Stanley",
        "offers": 12,
        "packageLPA": 24.6,
        "domain": "Quant & Finance"
      },
      {
        "name": "JP Morgan",
        "offers": 11,
        "packageLPA": 30.6,
        "domain": "Quant & Finance"
      },
      {
        "name": "Goldman Sachs",
        "offers": 10,
        "packageLPA": 39.3,
        "domain": "Quant & Finance"
      },
      {
        "name": "Mahindra Finance",
        "offers": 8,
        "packageLPA": 30.2,
        "domain": "IT Services"
      },
      {
        "name": "Zomato",
        "offers": 7,
        "packageLPA": 32.4,
        "domain": "Software & Product"
      },
      {
        "name": "Adobe",
        "offers": 6,
        "packageLPA": 28.7,
        "domain": "Software & Product"
      },
      {
        "name": "TCS",
        "offers": 6,
        "packageLPA": 39.2,
        "domain": "IT Services"
      }
    ],
    "domainSplit": [
      {
        "domain": "Software & Product",
        "count": 78
      },
      {
        "domain": "Quant & Finance",
        "count": 42
      },
      {
        "domain": "Consulting & Analytics",
        "count": 24
      },
      {
        "domain": "Core & Semiconductor",
        "count": 27
      },
      {
        "domain": "IT Services",
        "count": 28
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 17
      },
      {
        "month": "Aug",
        "offers": 25
      },
      {
        "month": "Sep",
        "offers": 31
      },
      {
        "month": "Oct",
        "offers": 39
      },
      {
        "month": "Nov",
        "offers": 20
      },
      {
        "month": "Dec",
        "offers": 15
      },
      {
        "month": "Jan",
        "offers": 12
      },
      {
        "month": "Feb",
        "offers": 9
      },
      {
        "month": "Mar",
        "offers": 12
      },
      {
        "month": "Apr",
        "offers": 19
      }
    ]
  },
  {
    "year": 2025,
    "classLabel": "Class of 2025",
    "totalEligible": 239,
    "totalStudentsPlaced": 212,
    "branchSplit": {
      "CE": 120,
      "IT": 92
    },
    "highestPackageLPA": 61,
    "averagePackageLPA": 15.5,
    "medianPackageLPA": 13.8,
    "recruitingCompaniesCount": 52,
    "verifiedSource": true,
    "topRecruiters": [
      {
        "name": "Bank of America",
        "offers": 30,
        "packageLPA": 19,
        "domain": "Quant & Finance"
      },
      {
        "name": "Oracle",
        "offers": 13,
        "packageLPA": 19.2,
        "domain": "Software & Product"
      },
      {
        "name": "SAP Labs",
        "offers": 10,
        "packageLPA": 23.5,
        "domain": "Software & Product"
      },
      {
        "name": "Citi",
        "offers": 10,
        "packageLPA": 19.1,
        "domain": "Quant & Finance"
      },
      {
        "name": "NPCI",
        "offers": 9,
        "packageLPA": 16.2,
        "domain": "Quant & Finance"
      },
      {
        "name": "ICICI Group",
        "offers": 6,
        "packageLPA": 11.4,
        "domain": "Quant & Finance"
      },
      {
        "name": "J.P. Morgan",
        "offers": 5,
        "packageLPA": 19.8,
        "domain": "Quant & Finance"
      },
      {
        "name": "Deloitte",
        "offers": 4,
        "packageLPA": 8.1,
        "domain": "Consulting & Analytics"
      }
    ],
    "domainSplit": [
      {
        "domain": "Quant & Finance",
        "count": 78
      },
      {
        "domain": "Software & Product",
        "count": 40
      },
      {
        "domain": "Core & Semiconductor",
        "count": 9
      },
      {
        "domain": "Consulting & Analytics",
        "count": 8
      },
      {
        "domain": "IT Services",
        "count": 2
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 22
      },
      {
        "month": "Aug",
        "offers": 29
      },
      {
        "month": "Sep",
        "offers": 35
      },
      {
        "month": "Oct",
        "offers": 35
      },
      {
        "month": "Nov",
        "offers": 22
      },
      {
        "month": "Dec",
        "offers": 15
      },
      {
        "month": "Jan",
        "offers": 11
      },
      {
        "month": "Feb",
        "offers": 10
      },
      {
        "month": "Mar",
        "offers": 12
      },
      {
        "month": "Apr",
        "offers": 21
      }
    ]
  },
  {
    "year": 2026,
    "classLabel": "Class of 2026",
    "totalEligible": 216,
    "totalStudentsPlaced": 192,
    "branchSplit": {
      "CE": 102,
      "IT": 90
    },
    "highestPackageLPA": 66.6,
    "averagePackageLPA": 16.1,
    "medianPackageLPA": 13.5,
    "recruitingCompaniesCount": 46,
    "verifiedSource": true,
    "topRecruiters": [
      {
        "name": "HSBC",
        "offers": 12,
        "packageLPA": 50,
        "domain": "Quant & Finance"
      },
      {
        "name": "ICICI Group",
        "offers": 9,
        "packageLPA": 12,
        "domain": "Quant & Finance"
      },
      {
        "name": "Oracle",
        "offers": 8,
        "packageLPA": 50,
        "domain": "Software & Product"
      },
      {
        "name": "Morgan Stanley",
        "offers": 7,
        "packageLPA": 29,
        "domain": "Quant & Finance"
      },
      {
        "name": "Mastercard",
        "offers": 7,
        "packageLPA": 22,
        "domain": "Quant & Finance"
      },
      {
        "name": "Citi",
        "offers": 7,
        "packageLPA": 18,
        "domain": "Quant & Finance"
      },
      {
        "name": "Bank of America",
        "offers": 5,
        "packageLPA": 18.9,
        "domain": "Quant & Finance"
      },
      {
        "name": "Mahindra Finance",
        "offers": 5,
        "packageLPA": 16,
        "domain": "Quant & Finance"
      }
    ],
    "domainSplit": [
      {
        "domain": "Quant & Finance",
        "count": 86
      },
      {
        "domain": "Software & Product",
        "count": 32
      },
      {
        "domain": "Core & Semiconductor",
        "count": 14
      },
      {
        "domain": "Consulting & Analytics",
        "count": 12
      },
      {
        "domain": "IT Services",
        "count": 1
      }
    ],
    "monthlyDrives": [
      {
        "month": "Jul",
        "offers": 16
      },
      {
        "month": "Aug",
        "offers": 26
      },
      {
        "month": "Sep",
        "offers": 34
      },
      {
        "month": "Oct",
        "offers": 31
      },
      {
        "month": "Nov",
        "offers": 21
      },
      {
        "month": "Dec",
        "offers": 14
      },
      {
        "month": "Jan",
        "offers": 11
      },
      {
        "month": "Feb",
        "offers": 9
      },
      {
        "month": "Mar",
        "offers": 12
      },
      {
        "month": "Apr",
        "offers": 18
      }
    ]
  },
];
