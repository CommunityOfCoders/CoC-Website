import React from 'react';

import debianImg from '../../assets/Debian_logo.png';
import fedoraImg from '../../assets/Fedora_logo.svg';
import gsocImg from '../../assets/GSoC_logo.svg';
import octaveImg from '../../assets/Gnu-octave-logo.svg';
import googleImg from '../../assets/Google__G__logo.svg';
import opencvImg from '../../assets/OpenCV_Logo_with_text_svg_version.svg';
import prometheusImg from '../../assets/Prometheus_software_logo.svg';
import sageImg from '../../assets/Sage-logo-2018.svg';
import sympyImg from '../../assets/Sympy_logo.svg';
import cocImg from '../../assets/coc.png';

/* Open-source org / program marks used on the OpenSource page.
   Image logos are imported directly from src/assets. */

type P = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
};

function ImageLogo({
  src,
  alt,
  width,
  height,
  className,
  style,
}: {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const w = width ? (typeof width === 'number' ? `${width}px` : width) : '30px';
  const h = height ? (typeof height === 'number' ? `${height}px` : height) : '30px';

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: w,
        height: h,
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      className={className}
    />
  );
}

/* Google — from src/assets/Google__G__logo.svg */
export const GoogleLogo: React.FC<P> = (props) => (
  <ImageLogo src={googleImg} alt="Google" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* GSoC — from src/assets/GSoC_logo.svg */
export const GSoCLogo: React.FC<P> = (props) => (
  <ImageLogo src={gsocImg} alt="Google Summer of Code" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* OpenCV — from src/assets/OpenCV_Logo_with_text_svg_version.svg */
export const OpenCVLogo: React.FC<P> = (props) => (
  <ImageLogo src={opencvImg} alt="OpenCV" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Prometheus — from src/assets/Prometheus_software_logo.svg */
export const PrometheusLogo: React.FC<P> = (props) => (
  <ImageLogo src={prometheusImg} alt="Prometheus" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* GNU Octave — from src/assets/Gnu-octave-logo.svg */
export const OctaveLogo: React.FC<P> = (props) => (
  <ImageLogo src={octaveImg} alt="GNU Octave" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* SymPy — from src/assets/Sympy_logo.svg */
export const SymPyLogo: React.FC<P> = (props) => (
  <ImageLogo src={sympyImg} alt="SymPy" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Debian — from src/assets/Debian_logo.png */
export const DebianLogo: React.FC<P> = (props) => (
  <ImageLogo src={debianImg} alt="Debian" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Fedora — from src/assets/Fedora_logo.svg */
export const FedoraLogo: React.FC<P> = (props) => (
  <ImageLogo src={fedoraImg} alt="Fedora" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* SageMath — from src/assets/Sage-logo-2018.svg */
export const SageLogo: React.FC<P> = (props) => (
  <ImageLogo src={sageImg} alt="SageMath" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Community of Coders — from src/assets/coc.png */
export const CoCLogo: React.FC<P> = (props) => (
  <ImageLogo src={cocImg} alt="Community of Coders" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Julia — the three-dot mark. */
export const JuliaLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <circle cx="12" cy="27" r="6.4" fill="#389826" />
    <circle cx="27" cy="27" r="6.4" fill="#CB3C33" />
    <circle cx="19.5" cy="13" r="6.4" fill="#9558B2" />
  </svg>
);

/* CERN-HSF mark. */
export const CERNLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <circle cx="20" cy="20" r="15" fill="none" stroke="#0033A0" strokeWidth="2.6" />
    <circle cx="20" cy="20" r="8.4" fill="none" stroke="#0033A0" strokeWidth="2" opacity="0.55" />
    <circle cx="20" cy="5" r="2.6" fill="#0033A0" />
    <circle cx="32.5" cy="27" r="2" fill="#0033A0" opacity="0.85" />
  </svg>
);

/* ML4Sci mark. */
export const ML4SciLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <line x1="12" y1="28" x2="20" y2="12" stroke="#7C4DFF" strokeWidth="2" opacity="0.7" />
    <line x1="28" y1="28" x2="20" y2="12" stroke="#7C4DFF" strokeWidth="2" opacity="0.7" />
    <line x1="12" y1="28" x2="28" y2="28" stroke="#7C4DFF" strokeWidth="2" opacity="0.7" />
    <circle cx="20" cy="12" r="4.2" fill="#7C4DFF" />
    <circle cx="12" cy="28" r="4.2" fill="#B388FF" />
    <circle cx="28" cy="28" r="4.2" fill="#651FFF" />
  </svg>
);

/* LFX (Linux Foundation) mark. */
export const LFXLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 24 24" fill="#0093D9" aria-hidden {...props}>
    <path d="M4.8 19.2h9.6V24H0V9.6h4.8v9.6zM0 0v7.2h4.8V4.822h14.4V19.2h-2.4V24H24V0H0z" />
  </svg>
);

/* Hacktoberfest mark. */
export const HacktoberfestLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <path
      d="M20 8c5 0 9 4.5 9 11s-4 11-9 11-9-4.5-9-11 4-11 9-11z"
      fill="#BA3925"
    />
    <path d="M20 8V4" stroke="#3E7A3E" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M13 17c1.5-1 3-1 4 0M27 17c-1.5-1-3-1-4 0M15 25c2 2 8 2 10 0" fill="none" stroke="#0A0A23" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

