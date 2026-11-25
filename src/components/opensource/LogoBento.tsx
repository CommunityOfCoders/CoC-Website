import React from 'react';
import { JuliaLogo } from '../ui/OrgLogos';
import githubLogoImg from '../../assets/github.png';
import gsocLogoImg from '../../assets/GSoC_logo.svg';
import lfxLogoImg from '../../assets/lfx-seeklogo.png';
import hacktoberfestLogoImg from '../../assets/Hacktoberfest_logo.png';
import './LogoBento.css';

/* Open-source hero visual: the programs our members contribute through,
   as four equal tiles, with CoC's own GitHub as a wide tile underneath.
   Still, structured, every tile laid out the same way. */

type Tile = {
  key: string;
  name: string;
  line: string;
  href: string;
  img?: string;
  invert?: boolean;
  Logo?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const PROGRAM_TILES: Tile[] = [
  { key: 'gsoc', name: 'Google Summer of Code', line: 'Paid, mentored summers on real open-source orgs.', href: 'https://summerofcode.withgoogle.com/', img: gsocLogoImg },
  { key: 'lfx', name: 'LFX Mentorship', line: 'Linux Foundation projects, mentored by maintainers.', href: 'https://lfx.linuxfoundation.org/tools/mentorship/', img: lfxLogoImg },
  { key: 'julia', name: 'Julia Season of Contributions', line: 'Scientific computing in the Julia ecosystem.', href: 'https://julialang.org/jsoc/', Logo: JuliaLogo },
  { key: 'hacktoberfest', name: 'Hacktoberfest', line: 'A month of merged pull requests, every October.', href: 'https://hacktoberfest.com/', img: hacktoberfestLogoImg },
];

const GITHUB: Tile = {
  key: 'github',
  name: 'Community of Coders on GitHub',
  line: 'github.com/CommunityOfCoders',
  href: 'https://github.com/CommunityOfCoders',
  img: githubLogoImg,
  invert: true,
};

const TileCard: React.FC<{ t: Tile; wide?: boolean }> = ({ t, wide }) => (
  <a
    href={t.href}
    target="_blank"
    rel="noreferrer"
    className={`lbento__tile lbento__tile--${t.key}${wide ? ' is-wide' : ''}`}
    aria-label={`${t.name}: ${t.line}`}
  >
    <span className="lbento__logo" aria-hidden="true">
      {t.img ? <img src={t.img} alt="" className={t.invert ? 'is-inverted' : undefined} draggable={false} /> : t.Logo ? <t.Logo /> : null}
    </span>
    <span className="lbento__text" aria-hidden="true">
      <span className="lbento__name">{t.name}</span>
      <span className="lbento__line">{t.line}</span>
    </span>
  </a>
);

const LogoBento: React.FC = () => (
  <div className="lbento">
    <span className="lbento__label">Where our members contribute</span>
    <div className="lbento__grid">
      {PROGRAM_TILES.map((t) => (
        <TileCard key={t.key} t={t} />
      ))}
      <TileCard t={GITHUB} wide />
    </div>
  </div>
);

export default LogoBento;
