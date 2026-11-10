export interface Achievement {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  src: string;
  alt: string;
}

interface MetaItem {
  title: string;
  tag: string;
  description: string;
  highlights: string[];
}

const METADATA_MAP: Record<string, MetaItem> = {
  achievement_01: {
    title: "Smart India Hackathon 2022 Grand Finale - Team KADAMM",
    tag: "SIH 2022 FINALES",
    description: "Team KADAMM represented VJTI at the SIH 2022 Senior Software Edition Grand Finale (Ministry of Social Justice).",
    highlights: ["Kushal Shah", "Mann Doshi", "Dhruvi Doshi", "Aayush Shah", "Meet Parekh", "Abhishek Joshi"],
  },
  achievement_02: {
    title: "Smart India Hackathon 2022 Grand Finale - Team CODERS.PY",
    tag: "SIH 2022 FINALES",
    description: "Team CODERS.PY represented VJTI at the SIH 2022 Senior Software Edition Grand Finale (AICTE).",
    highlights: ["Vriddhi Gupta", "Abhay Ubhale", "Sarah Tisekar", "Jaivanti Dhokey", "Vedika Mamidwar", "Krishna Asher"],
  },
  achievement_03: {
    title: "Smart India Hackathon 2022 Grand Finale - Team TechnoSrats",
    tag: "SIH 2022 FINALES",
    description: "Team TechnoSrats represented VJTI at the SIH 2022 Senior Software Edition Grand Finale (Ministry of Social Justice).",
    highlights: ["Sarvagnya Purohit", "Harsh Nag", "Smit Sekhadia", "Devansh Joshi", "Ketaki Deshmukh", "Anuraag Jajoo"],
  },
  achievement_04: {
    title: "Smart India Hackathon 2022 Grand Finale - Team SPD Coders",
    tag: "SIH 2022 FINALES",
    description: "Team SPD Coders represented VJTI at the Smart India Hackathon 2022 Senior Software Edition Grand Finale at Sri Eshwar College of Engineering, Coimbatore.",
    highlights: ["SIH 2022", "Coimbatore Finale", "Team SPD Coders"],
  },
  achievement_05: {
    title: "ICPC Asia Amritapuri Regional Contest 2022",
    tag: "ICPC REGIONALS",
    description: "Team Paneer Tikoo Masala represented VJTI at the world's most coveted collegiate programming challenge at Amrita School of Computing, Bengaluru.",
    highlights: ["Team Paneer Tikoo Masala", "Utsav Khatu", "Ravi Maurya", "Saksham Tikoo"],
  },
  achievement_06: {
    title: "Student Travel Grant for Quantum Tech Conference at CERN",
    tag: "CERN RESEARCH GRANT",
    description: "Amey Bhatuse selected for the prestigious Student Travel Grant for the Conference on Quantum Technologies at CERN, Geneva, Switzerland.",
    highlights: ["Amey Bhatuse", "CERN Switzerland", "Quantum Technologies"],
  },
  achievement_07: {
    title: "1st Position in HACK 'E' LTH 2022 - Powered by GE HealthCare",
    tag: "GE HEALTHCARE WINNERS",
    description: "Team C-SUS secured the 1st position in HACK 'E' LTH 2022, a remote project competition powered by GE HealthCare.",
    highlights: ["Team C-SUS", "1st Position", "GE HealthCare"],
  },
  achievement_08: {
    title: "ETHIndia 2022 - Team 51_Percent",
    tag: "ETHINDIA 2022",
    description: "Team 51_Percent represented CoC VJTI at Asia's Biggest Ethereum Hackathon in Whitefield, Bangalore.",
    highlights: ["Ankit Jaiswal", "Ravi Maurya", "Nikheel Indanoor", "Tanish Sawant", "Atharva Patil"],
  },
  achievement_09: {
    title: "ETHforAll Track Winners - Arcana & Superfluid Bounties",
    tag: "ETHFORALL WINNERS",
    description: "Team 51_Percent won major sponsor track prizes in Arcana & Superfluid at the ETHforAll Web3 Hackathon.",
    highlights: ["Arcana Bounty", "Superfluid Bounty", "Team 51_Percent"],
  },
  achievement_10: {
    title: "ETHGlobal Scaling Ethereum 2023 - Team SofToken",
    tag: "ETHGLOBAL WINNERS",
    description: "Team SofToken won multiple sponsor track prizes in Scroll, Push (EPNS), and Polybase at Scaling Ethereum 2023.",
    highlights: ["Ananya Bangera", "Chaitya Vora", "Harsh Nag", "Sarvagnya Purohit", "Smit Sekhadia"],
  },
  achievement_11: {
    title: "ICPC Mathura Regionals 2022 - Team NBA",
    tag: "ICPC REGIONALS",
    description: "Team NBA (Naman, Bhavik & Abhishek) represented VJTI at the ICPC Mathura Regionals hosted by GLA University (Kanpur Site).",
    highlights: ["Naman", "Bhavik", "Abhishek", "GLA University"],
  },
  achievement_12: {
    title: "Kavach 2023 Cyber Security Hackathon - Team SPARKED.",
    tag: "KAVACH 2023 FINALES",
    description: "Team SPARKED. reached the Grand Finale of Kavach 2023 National Cyber Security Hackathon (An initiative by MHA and MoE).",
    highlights: ["Sahil Kedare", "Prerna Jagesia", "Anupam Laddha", "Reshmika Nambiar", "Kushal Shah", "Dhruvi Doshi"],
  },
  achievement_13: {
    title: "Kavach 2023 Cyber Security Hackathon - Team K-TRAPS",
    tag: "KAVACH 2023 FINALES",
    description: "Team K-TRAPS built an Advanced Fake News Detection System for the Kavach 2023 National Cyber Security Hackathon Grand Finale.",
    highlights: ["Pranav Janjani", "Adwait Mandge", "Kunal Goudani", "Siddheshtanway Tanwar", "Rohan Fatehchandka"],
  },
  achievement_14: {
    title: "Kavach 2023 Cyber Security Hackathon Grand Finalists",
    tag: "KAVACH 2023 FINALES",
    description: "VJTI Cyber Security Finalists at Kavach 2023, an initiative by the Ministry of Home Affairs (MHA) & Ministry of Education (MoE).",
    highlights: ["MHA & MoE Initiative", "Cybersecurity", "Grand Finalists"],
  },
  achievement_15: {
    title: "National Winners of Flipkart GRiD 5.0 - 1st Among 4.5 Lakh Participants",
    tag: "FLIPKART GRID 5.0 WINNERS",
    description: "National Winners of Flipkart GRiD 5.0 Health+ Track, taking 1st place among 4.5 Lakh participants and winning INR 1,50,000.",
    highlights: ["Siddhant Baheti", "Kedar Dhamankar", "Raunak Singh Kalsi", "INR 1,50,000 Prize"],
  },
  achievement_16: {
    title: "Winner of IDFC Data Rangers Competition - INR 5,00,000 Prize",
    tag: "IDFC DATA RANGERS WINNER",
    description: "Vaibhav Patel crowned National Winner of IDFC Data Rangers Competition powered by IDFC FIRST Bank, winning a cash prize of INR 5 Lakhs.",
    highlights: ["Vaibhav Patel", "INR 5,00,000 Prize", "IDFC FIRST Bank"],
  },
  achievement_17: {
    title: "ETHIndia 2023 - Team IndieNews & CouponStack",
    tag: "ETHINDIA 2023",
    description: "Team IndieNews & CouponStack represented CoC VJTI at ETHIndia 2023, the World's Biggest Ethereum Hackathon in Bangalore.",
    highlights: ["Ankit", "Nikheel", "Sahil", "Anupam", "Atharva", "Ravi", "Tanish"],
  },
  achievement_18: {
    title: "ETHIndia 2023 - 7 VJTI CoC Hackers at ETHIndia '23",
    tag: "ETHINDIA 2023 DELEGATION",
    description: "7 VJTI CoC Hackers represented VJTI at ETHIndia '23 hosted by ETHGlobal & Devfolio in Bangalore.",
    highlights: ["VJTI -> BLR", "7 Passengers", "Devfolio", "ETHGlobal"],
  },
  achievement_19: {
    title: "Smart India Hackathon Finals 2023 - Team BHARAT",
    tag: "SIH FINALS 2023",
    description: "Team BHARAT represented VJTI at the Smart India Hackathon Finals 2023 software edition.",
    highlights: ["Prathama Sankhe (Lead)", "Naman Kothari", "Apurv Sonawane", "Sahil Shah", "Yash Agarwal", "Chaitya Vora"],
  },
  achievement_20: {
    title: "ICPC Chennai Regional 2023-24 - Team SKS",
    tag: "ICPC CHENNAI REGIONAL",
    description: "Team SKS represented VJTI at the 2023 ICPC Chennai Regional Contest hosted by IIITDM Kancheepuram.",
    highlights: ["Kavan Gandhi", "Shreyas Patil", "Shardul Khade", "IIITDM Kancheepuram"],
  },
  achievement_21: {
    title: "ICPC Amritapuri Regional 2023-24 - Team TRIANGLE",
    tag: "ICPC AMRITAPURI REGIONAL",
    description: "Team TRIANGLE represented VJTI at the ICPC Asia Amritapuri Doublesite Regional Contest at Amrita Vishwa Vidyapeetham, Coimbatore.",
    highlights: ["Sarvagyna Purohit", "Ananya Bangera", "Vaibhav Patel"],
  },
  achievement_22: {
    title: "National Runner-Up at ACM Women's Lady Ada Programming Contest",
    tag: "ACM-W LADY ADA CONTEST",
    description: "Ananya Bangera awarded National Runner-Up at the prestigious ACM Women's (ACM-W) Lady Ada Programming Contest.",
    highlights: ["Ananya Bangera", "ACM-W", "National Runner-Up"],
  },
  achievement_23: {
    title: "ETHMumbai - Trip Companion & ProductSure Sponsor Track Winners",
    tag: "ETHMUMBAI WINNERS",
    description: "Trip Companion & ProductSure won major sponsor track prizes in The Graph & Ecosystem Support Program at ETHMumbai.",
    highlights: ["Atharva Patil", "Ankit Jaiswal", "Sahil Kedare", "Anupam Laddha", "Nikheel Indanoor", "Ravi Maurya"],
  },
  achievement_24: {
    title: "Scaling Ethereum 2024 - Team ZKnockXI Track Winners",
    tag: "ETHGLOBAL SCALING ETHEREUM 2024",
    description: "Team ZKnockXI won sponsor track prizes in Witness, Filecoin, and Arbitrum at ETHGlobal Scaling Ethereum 2024.",
    highlights: ["Ananya Bangera", "Sarvagnya Purohit", "Harsh Nag", "Witness", "Filecoin", "Arbitrum"],
  },
  achievement_25: {
    title: "Google Summer of Code (GSoC) 2025 Scholars",
    tag: "GSOC 2025",
    description: "CoC VJTI students selected for Google Summer of Code (GSoC) 2025, contributing to top global open-source organizations including Intel, CERN-HSF, SymPy, and OREL.",
    highlights: ["Vidhi Rohira", "Kevin Shah", "Aarya Pandey", "Prasanna Kasar", "Sourish Phate", "Rushabh Mehta", "Swayam Shah"],
  },
  achievement_26: {
    title: "Google Summer of Code (GSoC) 2026 Scholars",
    tag: "GSOC 2026",
    description: "VJTI developers selected for Google Summer of Code (GSoC) 2026, contributing to core scientific open-source ecosystems including GNU Octave and ML4SCI.",
    highlights: ["Anushree Upasham", "Avanish Salunke", "GNU Octave", "ML4SCI", "Google Summer of Code"],
  },
  achievement_27: {
    title: "Hacktoberfest 2026 Winners at KJSCE & S.P.I.T.",
    tag: "HACKTOBERFEST 2026 WINNERS",
    description: "Community of Coders VJTI teams dominated Hacktoberfest competitions, securing victories at KJSCE (HackDay x ISTE), Paytm AI x FAIR, and top honors at S.P.I.T. Mumbai.",
    highlights: ["KJSCE Winners", "S.P.I.T. Finalists", "Paytm AI Winners", "Team Heckers", "Team DataChef", "Team Gravity Falls", "Team Git Guardians"],
  },
};

// Use Vite's import.meta.glob to dynamically load images from the local src/assets/achievements folder.
const imageModules = import.meta.glob<string>('../assets/achievements/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function parseAchievements(): Achievement[] {
  const keys = Object.keys(imageModules);

  if (keys.length > 0) {
    const list: Achievement[] = keys.map((key) => {
      const fileName = key.split('/').pop() || '';
      const rawName = fileName.replace(/\.[^/.]+$/, '');
      const numMatch = rawName.match(/\d+/);
      const indexStr = numMatch ? numMatch[0].padStart(2, '0') : '00';

      const url = typeof imageModules[key] === 'string'
        ? imageModules[key]
        : key;

      const meta = METADATA_MAP[rawName] || {
        title: rawName.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        tag: "VICTORY MILESTONE",
        description: "Celebrating institutional excellence and team achievements at Community of Coders VJTI.",
        highlights: ["VJTI CoC", "Milestone", "Excellence"],
      };

      return {
        id: rawName,
        number: indexStr,
        title: meta.title,
        tag: meta.tag,
        description: meta.description,
        highlights: meta.highlights,
        src: url,
        alt: meta.title,
      };
    });

    return list.sort((a, b) => {
      const numA = parseInt(a.number, 10);
      const numB = parseInt(b.number, 10);
      if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
        return numB - numA;
      }
      return b.id.localeCompare(a.id);
    });
  }

  // Fallback if glob yields empty array
  return Array.from({ length: 27 }, (_, i) => {
    const num = 27 - i;
    const numStr = String(num).padStart(2, '0');
    const idKey = `achievement_${numStr}`;
    const meta = METADATA_MAP[idKey] || {
      title: `Milestone ${numStr}`,
      tag: "VICTORY MILESTONE",
      description: "Celebrating institutional excellence and team achievements at Community of Coders VJTI.",
      highlights: ["VJTI CoC", "Milestone", "Excellence"],
    };

    return {
      id: idKey,
      number: numStr,
      title: meta.title,
      tag: meta.tag,
      description: meta.description,
      highlights: meta.highlights,
      src: `/achievements/achievement_${numStr}.png`,
      alt: meta.title,
    };
  });
}

export const ACHIEVEMENTS: Achievement[] = parseAchievements();
