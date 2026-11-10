import React from 'react';
import myntraLogo from '../../assets/Myntra_logo.png';
import adityaBirlaLogo from '../../assets/Aditya_Birla_logo.svg';
import godrejLogo from '../../assets/Godrej_logo.svg';

interface CompanyLogoProps {
  name: string;
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ name, className = "w-7 h-7" }) => {
  const normName = name.toLowerCase().trim();

  // DE Shaw
  if (normName.includes('shaw')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#00204A" />
          <text x="16" y="21" fontFamily="serif" fontWeight="900" fontSize="11" fill="#C5A059" textAnchor="middle" letterSpacing="0.5">DES</text>
        </svg>
      </div>
    );
  }

  // Goldman Sachs
  if (normName.includes('goldman')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#7399C6" />
          <text x="16" y="21" fontFamily="serif" fontWeight="bold" fontSize="13" fill="#FFFFFF" textAnchor="middle">GS</text>
        </svg>
      </div>
    );
  }

  // Google
  if (normName.includes('google')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#FFFFFF" />
          <path d="M22.5 16.2c0-.5-.04-1-.12-1.48H16v2.8h3.65c-.16.85-.64 1.57-1.36 2.05v1.7h2.2c1.29-1.19 2.01-2.94 2.01-5.07z" fill="#4285F4" />
          <path d="M16 22.8c1.84 0 3.38-.61 4.51-1.65l-2.2-1.7c-.61.41-1.39.65-2.31.65-1.78 0-3.29-1.2-3.83-2.82H9.86v1.76C11 21.36 13.33 22.8 16 22.8z" fill="#34A853" />
          <path d="M12.17 17.28c-.14-.41-.22-.85-.22-1.28s.08-.87.22-1.28V12.96H9.86C9.31 14.05 9 15 9 16s.31 1.95.86 3.04l2.31-1.76z" fill="#FBBC05" />
          <path d="M16 11.2c1 0 1.9.34 2.61 1.02l1.96-1.96C19.38 9.17 17.84 8.5 16 8.5c-2.67 0-5 1.44-6.14 3.74l2.31 1.76c.54-1.62 2.05-2.8 3.83-2.8z" fill="#EA4335" />
        </svg>
      </div>
    );
  }

  // Microsoft
  if (normName.includes('microsoft')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#FFFFFF" />
          <rect x="9" y="9" width="6.5" height="6.5" fill="#F25022" />
          <rect x="16.5" y="9" width="6.5" height="6.5" fill="#7FBA00" />
          <rect x="9" y="16.5" width="6.5" height="6.5" fill="#00A4EF" />
          <rect x="16.5" y="16.5" width="6.5" height="6.5" fill="#FFB900" />
        </svg>
      </div>
    );
  }

  // Bank of America
  if (normName.includes('bank of america') || normName.includes('bofa')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#012169" />
          <rect x="8" y="10" width="7" height="12" fill="#E31837" rx="1" />
          <rect x="17" y="10" width="7" height="12" fill="#FFFFFF" rx="1" />
          <rect x="19" y="12" width="3" height="8" fill="#012169" />
        </svg>
      </div>
    );
  }

  // Wells Fargo
  if (normName.includes('wells fargo')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#D71E28" />
          <text x="16" y="20.5" fontFamily="sans-serif" fontWeight="900" fontSize="9" fill="#F7B600" textAnchor="middle">WELLS</text>
        </svg>
      </div>
    );
  }

  // Morgan Stanley
  if (normName.includes('morgan stanley')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#002C6C" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="12" fill="#FFFFFF" textAnchor="middle">MS</text>
        </svg>
      </div>
    );
  }

  // Hilti
  if (normName.includes('hilti')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#D32F2F" />
          <text x="16" y="20.5" fontFamily="sans-serif" fontWeight="900" fontSize="8.5" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.5">HILTI</text>
        </svg>
      </div>
    );
  }

  // Citi Bank / Citicorp
  if (normName.includes('citi')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#003B70" />
          <path d="M10 11C14 8.5 18 8.5 22 11" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" />
          <text x="16" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#FFFFFF" textAnchor="middle">citi</text>
        </svg>
      </div>
    );
  }

  // BNY Mellon
  if (normName.includes('bny')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#1D252D" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#D4AF37" textAnchor="middle" letterSpacing="0.5">BNY</text>
        </svg>
      </div>
    );
  }

  // JPMC / JP Morgan
  if (normName.includes('jpmc') || normName.includes('jordan') || normName.includes('jpmorgan') || normName.includes('jp morgan')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0A2540" />
          <text x="16" y="21" fontFamily="serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle">JPMC</text>
        </svg>
      </div>
    );
  }

  // Texas Instruments
  if (normName.includes('texas') || normName === 'ti') {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#CC0000" />
          <path d="M10 11H22V14H17.5V22H14.5V14H10V11Z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Mastercard
  if (normName.includes('mastercard')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#111111" />
          <circle cx="12.5" cy="16" r="6" fill="#EB001B" />
          <circle cx="19.5" cy="16" r="6" fill="#F79E1B" fillOpacity="0.9" />
        </svg>
      </div>
    );
  }

  // NPCI
  if (normName.includes('npci')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#003087" />
          <path d="M9 16L14 11L19 16L14 21Z" fill="#FF9933" />
          <path d="M14 16L19 11L24 16L19 21Z" fill="#138808" />
        </svg>
      </div>
    );
  }

  // Deloitte
  if (normName.includes('deloitte')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#000000" />
          <text x="14" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="12" fill="#FFFFFF" textAnchor="middle">D</text>
          <circle cx="21" cy="19" r="1.8" fill="#86BC25" />
        </svg>
      </div>
    );
  }

  // Dream11
  if (normName.includes('dream11') || normName.includes('dream 11')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#E21B23" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" textAnchor="middle">D11</text>
        </svg>
      </div>
    );
  }

  // Oracle / OFSS
  if (normName.includes('oracle') || normName.includes('ofss')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#C74634" />
          <rect x="9" y="12" width="14" height="8" rx="4" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        </svg>
      </div>
    );
  }

  // BrowserStack
  if (normName.includes('browserstack')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#1A1D20" />
          <rect x="8" y="10" width="16" height="4" rx="1" fill="#FF7A00" />
          <rect x="8" y="16" width="16" height="4" rx="1" fill="#00A3FF" />
        </svg>
      </div>
    );
  }

  // HSBC
  if (normName.includes('hsbc')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#DB0011" />
          <path d="M8 8H24V24H8V8Z" fill="#FFFFFF" />
          <path d="M8 8L16 16L8 24V8Z" fill="#DB0011" />
          <path d="M24 8L16 16L24 24V8Z" fill="#DB0011" />
        </svg>
      </div>
    );
  }

  // ICICI Bank & ICICI Prudential (Securities / Home Finance)
  if (normName.includes('icici') || normName.includes('prudential')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#FFFFFF" />
          <g transform="translate(4, 4)">
            <path d="M7.19128 5.21314C12.6716 -0.226914 19.3201 -1.63879 21.9808 2.06915C24.6414 5.77709 22.303 13.2715 16.8227 18.7116C11.3423 24.1919 4.69382 25.6018 1.99293 21.8535C-0.625388 18.1073 1.71297 10.6512 7.19128 5.21314Z" fill="#F06321"/>
            <path d="M10.8187 2.31081C10.2145 2.75391 9.61024 3.27757 9.00602 3.84353C4.21047 8.59678 2.19435 15.1244 4.573 18.3893C7.03018 21.6521 12.9133 20.4437 17.8297 15.6481C20.4903 13.0701 22.2627 10.0872 22.9878 7.30777C23.1892 5.2534 22.9073 3.4387 21.9808 2.06912C19.8861 -0.831168 15.3726 -0.591493 10.8187 2.31081Z" fill="#AE282E"/>
            <path d="M17.7491 2.91502V3.03587C17.7089 3.72066 17.306 4.56657 16.5809 5.29165C15.4933 6.33897 14.0432 6.74179 13.4369 6.13958C12.7521 5.49507 13.157 4.0832 14.2446 2.95531C15.3725 1.8677 16.8226 1.50516 17.4268 2.14967C17.6282 2.35108 17.7491 2.59277 17.7491 2.91502ZM13.5598 21.4104C10.9797 23.3439 8.32113 24.3127 5.74109 23.9099C6.8287 23.9502 7.7169 22.7397 8.44197 21.1284C9.16705 19.4769 9.56986 17.9462 9.93239 16.494C10.4561 14.198 10.4964 12.5867 10.2144 12.2241C9.77127 11.6582 8.8045 11.781 7.6746 12.4256C7.11066 12.7478 6.38559 12.5464 7.23352 11.4991C8.11972 10.4517 11.5437 7.95226 12.7521 7.54944C14.1237 7.1869 15.6544 7.71057 15.1308 9.201C14.7662 10.2886 10.013 22.6994 13.5598 21.4104Z" fill="white"/>
          </g>
        </svg>
      </div>
    );
  }

  // Tata AIG / TCS
  if (normName.includes('tata') || normName.includes('tcs')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#003399" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle">TATA</text>
        </svg>
      </div>
    );
  }

  // KPMG
  if (normName.includes('kpmg')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#00338D" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="9" fill="#FFFFFF" textAnchor="middle">KPMG</text>
        </svg>
      </div>
    );
  }

  // EY
  if (normName === 'ey' || normName.includes('ernst') || normName.startsWith('ey ') || normName.endsWith(' ey')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#2E2E38" />
          <path d="M8 8L24 14V16L8 10V8Z" fill="#FFE600" />
          <text x="16" y="23" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" textAnchor="middle">EY</text>
        </svg>
      </div>
    );
  }

  // Axis Bank
  if (normName.includes('axis')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#97144D" />
          <path d="M16 9L23 22H18L16 18L14 22H9L16 9Z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // SAP / SAP Labs
  if (normName.includes('sap')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#008FD3" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" textAnchor="middle">SAP</text>
        </svg>
      </div>
    );
  }

  // UBS
  if (normName.includes('ubs')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#000000" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#FFFFFF" textAnchor="middle">UBS</text>
        </svg>
      </div>
    );
  }

  // Infosys
  if (normName.includes('infosys')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#007CC3" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#FFFFFF" textAnchor="middle">Infy</text>
        </svg>
      </div>
    );
  }

  // Barclays
  if (normName.includes('barclays')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#00AEEF" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="9" fill="#FFFFFF" textAnchor="middle">BARCLAYS</text>
        </svg>
      </div>
    );
  }

  // Amazon
  if (normName.includes('amazon')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#131921" />
          <text x="16" y="19" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="#FFFFFF" textAnchor="middle">amazon</text>
          <path d="M10 22C13 24 19 24 22 22" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // IBM
  if (normName.includes('ibm')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0530AD" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">IBM</text>
        </svg>
      </div>
    );
  }

  // Samsung
  if (normName.includes('samsung')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#1428A0" />
          <text x="16" y="20.5" fontFamily="sans-serif" fontWeight="bold" fontSize="7.5" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.5">SAMSUNG</text>
        </svg>
      </div>
    );
  }

  // Deutsche Bank
  if (normName.includes('deutsch') || normName.includes('deutche')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0018A8" />
          <rect x="9" y="9" width="14" height="14" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <line x1="12" y1="20" x2="20" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // LinkedIn
  if (normName.includes('linkin') || normName.includes('linkedin')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0A66C2" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="13" fill="#FFFFFF" textAnchor="middle">in</text>
        </svg>
      </div>
    );
  }

  // Visa
  if (normName.includes('visa')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#1A1F71" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="10.5" fill="#F7B600" textAnchor="middle" letterSpacing="0.5">VISA</text>
        </svg>
      </div>
    );
  }

  // Russell Investments
  if (normName.includes('russell')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#002244" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#00A3E0" textAnchor="middle">R</text>
        </svg>
      </div>
    );
  }

  // Procter & Gamble / P&G
  if (normName.includes('proct') || normName.includes('p&g')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#003CAE" />
          <text x="16" y="21" fontFamily="serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.5">P&amp;G</text>
        </svg>
      </div>
    );
  }

  // Fractal
  if (normName.includes('fractal')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0B132B" />
          <path d="M11 11H21V14H15V17H20V20H15V23H11V11Z" fill="#00EB88" />
        </svg>
      </div>
    );
  }

  // HDFC
  if (normName.includes('hdfc')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#004C8F" />
          <rect x="9" y="9" width="14" height="14" fill="#ED1C24" rx="2" />
          <text x="16" y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="6.5" fill="#FFFFFF" textAnchor="middle">HDFC</text>
        </svg>
      </div>
    );
  }

  // Kotak
  if (normName.includes('kotak')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#ED1C24" />
          <text x="16" y="20.5" fontFamily="sans-serif" fontWeight="900" fontSize="7.5" fill="#FFFFFF" textAnchor="middle">KOTAK</text>
        </svg>
      </div>
    );
  }

  // PwC
  if (normName.includes('pwc')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#D04A02" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle">pwc</text>
        </svg>
      </div>
    );
  }

  // Fiserv
  if (normName.includes('fiserv')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#FF6600" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="8.5" fill="#FFFFFF" textAnchor="middle">fiserv.</text>
        </svg>
      </div>
    );
  }

  // Rakuten
  if (normName.includes('rakuten')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#BF0000" />
          <text x="16" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle">R</text>
          <line x1="10" y1="23" x2="22" y2="23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // WorkIndia
  if (normName.includes('workindia')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#008080" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle">WI</text>
        </svg>
      </div>
    );
  }

  // MSCI
  if (normName.includes('msci')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#002D62" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="8.5" fill="#FFFFFF" textAnchor="middle">MSCI</text>
        </svg>
      </div>
    );
  }

  // Axxela
  if (normName.includes('axxela')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#18181B" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="8.5" fill="#E4E4E7" textAnchor="middle" letterSpacing="0.5">AXX</text>
        </svg>
      </div>
    );
  }

  // Tracelink
  if (normName.includes('tracelink')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#005A9C" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle">TL</text>
        </svg>
      </div>
    );
  }

  // Mahindra
  if (normName.includes('mahindra')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#D1262B" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#FFFFFF" textAnchor="middle">M</text>
        </svg>
      </div>
    );
  }

  // Pattern
  if (normName.includes('pattern')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#1E293B" />
          <circle cx="16" cy="16" r="6" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
        </svg>
      </div>
    );
  }

  // Astra
  if (normName.includes('astra')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#205493" />
          <text x="16" y="20.5" fontFamily="sans-serif" fontWeight="900" fontSize="7" fill="#FFFFFF" textAnchor="middle">ASTRA</text>
        </svg>
      </div>
    );
  }

  // Apple
  if (normName.includes('apple')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#18181B" />
          <path d="M16 8C17 6.5 19 6 19 6C19 7.2 18.2 8.3 17.5 9C16.8 9.7 15.8 10.2 15.8 10.2C15.8 9 16.5 8 16 8ZM21.5 16.5C21.5 13.5 23.5 12 23.5 12C22 10.2 19.8 10.2 19 10.2C17.2 10.2 16.2 11.2 15.2 11.2C14.2 11.2 13 10.2 11.8 10.2C9.5 10.2 7.2 12.2 7.2 16C7.2 18.5 8.2 21.2 9.5 23C10.5 24.5 11.5 26 13 26C14.5 26 15 25 16.2 25C17.5 25 18 26 19.5 26C21 26 22 24.5 23 23C22 22 21.5 20.5 21.5 19C21.5 17.5 22.2 16.8 21.5 16.5Z" fill="#F4F4F5" />
        </svg>
      </div>
    );
  }

  // ZS Associates
  if (normName.includes('zs')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#002D62" />
          <text x="16" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#00A3E0" textAnchor="middle">ZS</text>
        </svg>
      </div>
    );
  }

  // Capgemini
  if (normName.includes('capgemini')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0070AD" />
          <path d="M16 8C13 12 10 14 10 17C10 20 12.5 22 16 22C19.5 22 22 20 22 17C22 14 19 12 16 8Z" fill="#FFFFFF" />
          <path d="M15 21H17V24H15V21Z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Myntra
  if (normName.includes('myntra')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm border border-zinc-700/50">
          <img src={myntraLogo} alt="Myntra" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  }

  // Aditya Birla Group / Aditya Birla Capital
  if (normName.includes('birla') || normName.includes('aditya')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-0.5 overflow-hidden shadow-sm border border-zinc-700/50">
          <img src={adityaBirlaLogo} alt="Aditya Birla" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  }

  // Godrej
  if (normName.includes('godrej') || normName.includes('goidrej')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm border border-zinc-700/50">
          <img src={godrejLogo} alt="Godrej" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  }

  // Default clean styled initial badge
  return (
    <div className={`company-logo-container ${className}`}>
      <div className="w-full h-full rounded-lg bg-zinc-800 flex items-center justify-center text-white font-bold text-xs border border-zinc-700">
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};
