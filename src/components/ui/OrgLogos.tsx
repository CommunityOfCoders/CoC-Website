import React from 'react';

import apacheImg from '../../assets/Apache_logo.svg';
import blenderImg from '../../assets/Blender_logo.svg';
import cncfImg from '../../assets/CNCF_logo.svg';
import debianImg from '../../assets/Debian_logo.png';
import fedoraImg from '../../assets/Fedora_logo.svg';
import gsocImg from '../../assets/GSoC_logo.svg';
import octaveImg from '../../assets/Gnu-octave-logo.svg';
import googleImg from '../../assets/Google__G__logo.svg';
import hacktoberfestImg from '../../assets/Hacktoberfest_logo.png';
import incfImg from '../../assets/INCF_logo.png';
import intelImg from '../../assets/Intel_logo.svg';
import juliaImg from '../../assets/Julia_logo.svg';
import k8sImg from '../../assets/Kubernetes_logo.svg';
import opencvImg from '../../assets/OpenCV_Logo_with_text_svg_version.svg';
import postgresImg from '../../assets/PostgreSQL_logo.svg';
import prometheusImg from '../../assets/Prometheus_software_logo.svg';
import pythonImg from '../../assets/Python_logo.svg';
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

/* Hacktoberfest — from src/assets/Hacktoberfest_logo.png */
export const HacktoberfestLogo: React.FC<P> = (props) => (
  <ImageLogo src={hacktoberfestImg} alt="Hacktoberfest" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* CNCF (Cloud Native Computing Foundation) — from src/assets/CNCF_logo.svg */
export const CNCFLogo: React.FC<P> = (props) => (
  <ImageLogo src={cncfImg} alt="CNCF" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* INCF (International Neuroinformatics Coordinating Facility) — from src/assets/INCF_logo.png */
export const INCFLogo: React.FC<P> = (props) => (
  <ImageLogo src={incfImg} alt="INCF" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Intel — from src/assets/Intel_logo.svg */
export const IntelLogo: React.FC<P> = (props) => (
  <ImageLogo src={intelImg} alt="Intel" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Julia Language — from src/assets/Julia_logo.svg */
export const JuliaLogo: React.FC<P> = (props) => (
  <ImageLogo src={juliaImg} alt="Julia Language" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Python Software Foundation — from src/assets/Python_logo.svg */
export const PythonLogo: React.FC<P> = (props) => (
  <ImageLogo src={pythonImg} alt="Python" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* PostgreSQL — from src/assets/PostgreSQL_logo.svg */
export const PostgreSQLLogo: React.FC<P> = (props) => (
  <ImageLogo src={postgresImg} alt="PostgreSQL" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Blender Foundation — from src/assets/Blender_logo.svg */
export const BlenderLogo: React.FC<P> = (props) => (
  <ImageLogo src={blenderImg} alt="Blender" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Apache Software Foundation — from src/assets/Apache_logo.svg */
export const ApacheLogo: React.FC<P> = (props) => (
  <ImageLogo src={apacheImg} alt="Apache" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Kubernetes — from src/assets/Kubernetes_logo.svg */
export const KubernetesLogo: React.FC<P> = (props) => (
  <ImageLogo src={k8sImg} alt="Kubernetes" width={props.width} height={props.height} className={props.className} style={props.style} />
);

/* Community of Coders — from src/assets/coc.png */
export const CoCLogo: React.FC<P> = (props) => (
  <ImageLogo src={cocImg} alt="Community of Coders" width={props.width} height={props.height} className={props.className} style={props.style} />
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

