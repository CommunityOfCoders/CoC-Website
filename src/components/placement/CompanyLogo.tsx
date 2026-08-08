import React from 'react';

interface CompanyLogoProps {
  name: string;
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ name, className = "w-7 h-7" }) => {
  const normName = name.toLowerCase().trim();

  if (normName.includes('tower')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#121316" />
          <path d="M10 11H22V14H17.5V22H14.5V14H10V11Z" fill="#FFFFFF" />
          <rect x="14.5" y="18" width="3" height="3" fill="#00E676" />
        </svg>
      </div>
    );
  }

  if (normName.includes('goldman')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#FFFFFF" />
          <rect x="2" y="2" width="28" height="28" rx="6" fill="#7399C6" />
          <text x="16" y="21" fontFamily="serif" fontWeight="bold" fontSize="13" fill="#FFFFFF" textAnchor="middle">GS</text>
        </svg>
      </div>
    );
  }

  if (normName.includes('atlassian')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#FFFFFF" />
          <path d="M12.5 22C12.3 22 12.1 21.9 12 21.7L8.1 14.5C7.9 14.1 8.1 13.6 8.5 13.4C8.7 13.3 8.9 13.3 9.1 13.4L15.3 17.5L13.1 21.7C13 21.9 12.8 22 12.5 22Z" fill="#0052CC" />
          <path d="M15.4 12.2C15.5 12 15.7 11.9 16 11.9C16.2 11.9 16.5 12 16.6 12.2L23.9 21.7C24.2 22.1 24.1 22.6 23.7 22.9C23.5 23 23.3 23 23.1 23H13.6L15.4 12.2Z" fill="#0052CC" />
        </svg>
      </div>
    );
  }

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

  if (normName.includes('uber')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#000000" />
          <text x="16" y="20.5" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#FFFFFF" textAnchor="middle" letterSpacing="-0.5">Uber</text>
        </svg>
      </div>
    );
  }

  if (normName.includes('razorpay')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#0C2340" />
          <path d="M19.5 8L10 24H14.5L22 11.5L19.5 8Z" fill="#0284C7" />
          <path d="M14.5 12L10 20H13.5L17.5 13L14.5 12Z" fill="#38BDF8" />
        </svg>
      </div>
    );
  }

  if (normName.includes('phonepe')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#5F259F" />
          <path d="M12 9V23H15.5V17H18.5C21 17 22.5 15.5 22.5 13C22.5 10.5 21 9 18.5 9H12ZM15.5 11.8H18C19.2 11.8 20 12.3 20 13C20 13.7 19.2 14.2 18 14.2H15.5V11.8Z" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (normName.includes('groww')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#00D09C" />
          <path d="M10 21C10 21 13 14 16 17C19 20 22 11 22 11" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (normName.includes('zepto')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#8000FF" />
          <path d="M10 11H22L12 21H22" stroke="#FF007A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (normName.includes('amazon')) {
    return (
      <div className={`company-logo-container ${className}`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="company-logo-svg">
          <rect width="32" height="32" rx="8" fill="#141920" />
          <path d="M10 18.5C13 20.5 17 20.5 21 17.5M20 16L22.5 17.5L21.5 15" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
          <text x="16" y="14" fontFamily="sans-serif" fontWeight="bold" fontSize="9" fill="#FFFFFF" textAnchor="middle">a</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`company-logo-container ${className}`}>
      <div className="w-full h-full rounded-lg bg-zinc-800 flex items-center justify-center text-white font-bold text-xs border border-zinc-700">
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};
