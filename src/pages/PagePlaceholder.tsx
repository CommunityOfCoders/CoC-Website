import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './PagePlaceholder.css';

interface PagePlaceholderProps {
  index: string;   // e.g. "02"
  title: string;
  blurb: string;
}

/**
 * On-brand empty shell for routes that aren't designed yet.
 * Deliberately minimal — the Home page is the only built surface for now.
 */
const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ index, title, blurb }) => (
  <section className="ph">
    <div className="container ph__inner">
      <span className="ph__index">{index}</span>
      <span className="eyebrow">Community of Coders</span>
      <h1 className="ph__title">{title}</h1>
      <p className="ph__status"><span className="ph__dot" />In the works</p>
      <p className="ph__blurb">{blurb}</p>
      <a href="#" className="btn btn--ghost ph__back"><ArrowLeft /> Back home</a>
    </div>
  </section>
);

export default PagePlaceholder;
