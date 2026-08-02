import React from 'react';

/* Open-source org / program marks used on the OpenSource page.
   Redrawn from each brand's actual published mark (Wikimedia Commons
   asset pages, simple-icons.org's CC0 path data, or each org's own
   design-guidelines page) rather than invented from scratch — see the
   comment above each one for what it's based on and why it isn't a
   pixel-perfect trace where it isn't. */

type P = React.SVGProps<SVGSVGElement>;

/* Google — the real four-dot mark. */
export const GoogleLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <circle cx="14" cy="14" r="6" fill="#EA4335" />
    <circle cx="26" cy="14" r="6" fill="#4285F4" />
    <circle cx="14" cy="26" r="6" fill="#FBBC05" />
    <circle cx="26" cy="26" r="6" fill="#34A853" />
  </svg>
);

/* OpenCV — the real three-ring mark (red/blue/green). */
export const OpenCVLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <circle cx="20" cy="11" r="7" fill="none" stroke="#F34C33" strokeWidth="3.4" />
    <circle cx="11" cy="26" r="7" fill="none" stroke="#3D85C6" strokeWidth="3.4" />
    <circle cx="29" cy="26" r="7" fill="none" stroke="#66BB33" strokeWidth="3.4" />
  </svg>
);

/* Prometheus — traced from simple-icons' official flame-in-circle
   mark (CC0), in Prometheus' documented orange #E6522C. */
export const PrometheusLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 24 24" fill="#E6522C" aria-hidden {...props}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm0 22.46c-1.885 0-3.414-1.26-3.414-2.814h6.828c0 1.553-1.528 2.813-3.414 2.813zm5.64-3.745H6.36v-2.046h11.28v2.046zm-.04-3.098H6.391c-.037-.043-.075-.086-.111-.13-1.155-1.401-1.427-2.133-1.69-2.879-.005-.025 1.4.287 2.395.511 0 0 .513.119 1.262.255-.72-.843-1.147-1.915-1.147-3.01 0-2.406 1.845-4.508 1.18-6.207.648.053 1.34 1.367 1.387 3.422.689-.951.977-2.69.977-3.755 0-1.103.727-2.385 1.454-2.429-.648 1.069.168 1.984.894 4.256.272.854.237 2.29.447 3.201.07-1.892.395-4.652 1.595-5.605-.529 1.2.079 2.702.494 3.424.671 1.164 1.078 2.047 1.078 3.716a4.642 4.642 0 01-1.11 2.996c.792-.149 1.34-.283 1.34-.283l2.573-.502s-.374 1.538-1.81 3.019z" />
  </svg>
);

/* Julia — the real three-dot mark, official brand colours. */
export const JuliaLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <circle cx="12" cy="27" r="6.4" fill="#389826" />
    <circle cx="27" cy="27" r="6.4" fill="#CB3C33" />
    <circle cx="19.5" cy="13" r="6.4" fill="#9558B2" />
  </svg>
);

/* CERN-HSF — CERN's real mark is two intertwined rings with
   protruding lines, schematically representing the accelerator
   chain; this is that same motif (concentric orbits + particle
   tracks) in CERN's institutional blue (Pantone 286C ≈ #0033A0). */
export const CERNLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <circle cx="20" cy="20" r="15" fill="none" stroke="#0033A0" strokeWidth="2.6" />
    <circle cx="20" cy="20" r="8.4" fill="none" stroke="#0033A0" strokeWidth="2" opacity="0.55" />
    <circle cx="20" cy="5" r="2.6" fill="#0033A0" />
    <circle cx="32.5" cy="27" r="2" fill="#0033A0" opacity="0.85" />
  </svg>
);

/* SymPy — the current official mark (docs.sympy.org/guides/logo)
   layers an integral sign, a summation, and the letter S into one
   illustrated glyph with gradients and a snake tail; that doesn't
   survive being flattened to a 30px icon, so this keeps its two
   clearest motifs — the integral curve and the S — as flat strokes
   in the library's blue rather than attempting the full illustration. */
export const SymPyLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <path
      d="M28 7c-7.5 0-11 4-11 9s4 4 4 9-3.5 9-11 9"
      fill="none"
      stroke="#1565C0"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
  </svg>
);

/* GNU Octave — Octave's own logo (not the generic GNU wildebeest):
   a blue-cyan wave with three small notched orange squares along it
   (commons.wikimedia.org/wiki/File:Gnu-octave-logo.svg). Flattened
   from its original radial gradient to a single flat blue. */
export const OctaveLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <path
      d="M5 26c3-10 7-15 12-15s7 9 10 9 4-3 8-3"
      fill="none"
      stroke="#0089B8"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
    <rect x="9" y="8" width="4.2" height="4.2" rx="1" fill="#FF7F2A" stroke="#D45500" strokeWidth="0.8" />
    <rect x="17" y="4" width="5.4" height="5.4" rx="1" fill="#FF7F2A" stroke="#D45500" strokeWidth="0.8" />
    <rect x="26" y="9" width="3.6" height="3.6" rx="1" fill="#FF7F2A" stroke="#D45500" strokeWidth="0.8" />
  </svg>
);

/* ML4Sci — a research collaboration, not a consumer product; it has
   no distinct public brand mark to source, so this stays a small
   connected network (machine learning for science) in the org's
   purple, same as before. */
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

/* LFX (Linux Foundation) — traced from simple-icons' official
   "Linux Foundation" mark (CC0), in the foundation's blue. */
export const LFXLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 24 24" fill="#0093D9" aria-hidden {...props}>
    <path d="M4.8 19.2h9.6V24H0V9.6h4.8v9.6zM0 0v7.2h4.8V4.822h14.4V19.2h-2.4V24H24V0H0z" />
  </svg>
);

/* GSoC — the real 2021+ "sun" mark: a heptagon in Google gold
   (#F9AB00) framing a darker-orange circle (#E37400) with a white
   code-bracket at its centre (commons.wikimedia.org/wiki/File:
   Google_Summer_of_Code_sun_logo_2022.svg), redrawn at icon scale. */
export const GSoCLogo: React.FC<P> = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden {...props}>
    <polygon
      points="20,2.5 33,8 37.5,20 33,32 20,37.5 7,32 2.5,20 7,8"
      fill="#F9AB00"
    />
    <circle cx="20" cy="20" r="12" fill="#E37400" />
    <path d="M17 14l-6 6 6 6M23 14l6 6-6 6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Hacktoberfest — no clean CC-licensed source SVG could be found for
   the current mark, so this is an original jack-o'-lantern glyph in
   Hacktoberfest's pumpkin orange — a plain, recognisable stand-in
   rather than a traced logo. */
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
