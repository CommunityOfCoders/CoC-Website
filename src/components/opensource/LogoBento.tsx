import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { JuliaLogo } from '../ui/OrgLogos';
import githubLogoImg from '../../assets/github.png';
import gsocLogoImg from '../../assets/GSoC_logo.svg';
import lfxLogoImg from '../../assets/lfx-seeklogo.png';
import hacktoberfestLogoImg from '../../assets/Hacktoberfest_logo.png';
import mediumLogoImg from '../../assets/Medium-Icon-Black.svg';
import './LogoBento.css';

/* Open-source hero visual: a still bento of the programs and places we
   contribute through. Nothing floats or spins - hover a tile and it lifts,
   picks up a green rim and says what it is. */

type Tile = {
  key: string;
  name: string;
  kind: string;
  line: string;
  href: string;
  img?: string;
  invert?: boolean;
  Logo?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const TILES: Tile[] = [
  { key: 'gsoc', name: 'Google Summer of Code', kind: 'Program', line: 'Paid, mentored summers on real open-source orgs. Where most of our contributors start.', href: 'https://summerofcode.withgoogle.com/', img: gsocLogoImg },
  { key: 'lfx', name: 'LFX Mentorship', kind: 'Program', line: 'Linux Foundation projects, mentored by maintainers.', href: 'https://lfx.linuxfoundation.org/tools/mentorship/', img: lfxLogoImg },
  { key: 'julia', name: 'Julia', kind: 'Program', line: 'Julia Season of Contributions: scientific computing.', href: 'https://julialang.org/jsoc/', Logo: JuliaLogo },
  { key: 'hacktoberfest', name: 'Hacktoberfest', kind: 'Program', line: 'A month of merged pull requests, every October.', href: 'https://hacktoberfest.com/', img: hacktoberfestLogoImg },
  { key: 'github', name: 'GitHub', kind: 'Our org', line: "CoC's own repos, open to every member.", href: 'https://github.com/CommunityOfCoders', img: githubLogoImg, invert: true },
  { key: 'medium', name: 'Medium', kind: 'Our blog', line: 'Write-ups from members who shipped.', href: 'https://medium.com/@swayams', img: mediumLogoImg, invert: true },
];

const LogoBento: React.FC = () => (
  <ul className="lbento" aria-label="Programs and places we contribute through">
    {TILES.map((t, i) => (
      <li key={t.key} className={`lbento__tile lbento__tile--${t.key}${i === 0 ? ' is-big' : ''}`}>
        <a href={t.href} target="_blank" rel="noreferrer" className="lbento__link" aria-label={`${t.name}: ${t.line}`}>
          {i === 0 && <span className="lbento__wm" aria-hidden="true">GSoC</span>}
          <span className="lbento__top" aria-hidden="true">
            <span className="lbento__kind">{t.kind}</span>
            <span className="lbento__go"><ArrowUpRight /></span>
          </span>
          <span className="lbento__logo" aria-hidden="true">
            {t.img ? <img src={t.img} alt="" className={t.invert ? 'is-inverted' : undefined} draggable={false} /> : t.Logo ? <t.Logo /> : null}
          </span>
          <span className="lbento__text" aria-hidden="true">
            <span className="lbento__name">{t.name}</span>
            <span className="lbento__line">{t.line}</span>
          </span>
        </a>
      </li>
    ))}
  </ul>
);

export default LogoBento;
