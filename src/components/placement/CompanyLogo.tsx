import React from 'react';

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
  if (normName.includes('texas') || normName.includes('ti')) {
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

  // ICICI (Bank / Securities / Prudential / Home)
  if (normName.includes('icici')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#B02A30" />
          <path d="M10 10H14V22H10V10Z" fill="#F37023" />
          <path d="M18 10H22V22H18V10Z" fill="#FFFFFF" />
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
  if (normName.includes('ey')) {
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

  // Default clean styled initial badge
  return (
    <div className={`company-logo-container ${className}`}>
      <div className="w-full h-full rounded-lg bg-zinc-800 flex items-center justify-center text-white font-bold text-xs border border-zinc-700">
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};
