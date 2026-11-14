import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Github, Linkedin, Instagram } from "../components/ui/BrandIcons";
import cocLogo from "../assets/coc.png";
import FluxLines from "../components/ui/FluxLines";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
  route: string;
}

const NAV = [
  { label: "Home", hash: "" },
  { label: "Events", hash: "#events" },
  { label: "Projects", hash: "#projects" },
  { label: "Opensource", hash: "#opensource" },
  { label: "Competitive Programming", hash: "#cp", external: "https://vjti-competitive-programming-club-s.vercel.app/" },
  { label: "Achievements", hash: "#achievements" },
  { label: "Team", hash: "#team" },
  { label: "Placements", hash: "#placements" },
  { label: "Contact", hash: "#contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/CommunityOfCoders",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/community-of-coders-vjti/",
    Icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/coc_vjti",
    Icon: Instagram,
  },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children, route }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const isActive = (hash: string) =>
    hash === "" ? route === "" : route === hash;

  return (
    <div className="shell">
      {/* Global Background Layer: FluxLines on black canvas */}
      <div className="site-flux-bg" aria-hidden="true">
        <FluxLines dpr={window.matchMedia("(max-width: 768px)").matches ? 1 : undefined} />
      </div>

      <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="container nav__inner">
          <a href="#" className="brand" aria-label="Community of Coders - home">
            <img
              src={cocLogo}
              alt="CoC Logo"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                objectFit: "contain",
              }}
            />
            <span className="brand__meta">
              Community of Coders<em>VJTI · Mumbai</em>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.external ?? (item.hash || "#")}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`nav__link${item.hash === "#cp" ? " nav__link--stack" : ""}${isActive(item.hash) ? " is-active" : ""}`}
                aria-current={isActive(item.hash) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="https://instagram.com/coc_vjti"
            target="_blank"
            rel="noreferrer"
            className="btn nav__cta ig-btn"
            aria-label="Instagram, @coc_vjti"
          >
            <span className="ig-btn__fill" aria-hidden="true" />
            <Instagram className="ig-btn__icon" />
            <span className="ig-btn__roll" aria-hidden="true">
              <span>Instagram</span>
              <span>@coc_vjti</span>
            </span>
            <span className="ig-btn__arrow" aria-hidden="true">
              <ArrowUpRight />
              <ArrowUpRight />
            </span>
          </a>

          <button
            className="nav__burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* mobile drawer */}
        <div className={`nav__drawer${menuOpen ? " is-open" : ""}`}>
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.external ?? (item.hash || "#")}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`nav__drawer-link${isActive(item.hash) ? " is-active" : ""}`}
            >
              {item.label}
              <ArrowUpRight />
            </a>
          ))}
          <a
            href="https://instagram.com/coc_vjti"
            target="_blank"
            rel="noreferrer"
            className="nav__drawer-link"
            style={{ color: "var(--accent)" }}
          >
            <span>Instagram</span>
            <ArrowUpRight />
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="footer__wordmark">
                Community
                <br />
                of Coders<span className="footer__dot">.</span>
              </span>
              <p className="footer__tag">
                VJTI's student-run engineering community. Code. Create. Connect.
              </p>
            </div>

            <div className="footer__cols">
              <div className="footer__col">
                <span className="footer__col-title">Explore</span>
                {NAV.slice(1, 6).map((i) => (
                  <a key={i.label} href={i.external ?? i.hash} {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="footer__link">
                    {i.label}
                  </a>
                ))}
              </div>
              <div className="footer__col">
                <span className="footer__col-title">Connect</span>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer__link"
                  >
                    {s.label}
                  </a>
                ))}
                <a href="#contact" className="footer__link">
                  Contact
                </a>
              </div>
              <div className="footer__col footer__col--identity">
                <span className="footer__col-title">Built at VJTI</span>
                <p className="footer__identity-stat">
                  <span className="footer__identity-num">Since '16</span>{" "}
                  Student-run, every year.
                </p>
                <p className="footer__identity-stat">
                  <span className="footer__identity-num">Mumbai</span> Matunga,
                  Maharashtra.
                </p>
                <p className="footer__identity-motto">Code. Create. Connect.</p>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Community of Coders, VJTI.</span>
            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="footer__social"
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
