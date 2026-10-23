import { useRef } from 'react';
import { IR, REPORT } from '../data.js';
import { prefersReducedMotion } from '../lib/hooks.js';
import Btn from './Btn.jsx';
import Counter from './Counter.jsx';

const STATS = [['Gross revenue', REPORT.revenue], ['Total assets', REPORT.assets], ['Net income', REPORT.netIncome]];

/* IR intro, then Annual Report: 3D report cover beside summary, key figures and actions; IR quick links */
export default function Investors() {
  const book = useRef(null);

  const tilt = e => {
    if (prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    book.current.style.setProperty('--ry', `${-22 + x * 20}deg`);
    book.current.style.setProperty('--rx', `${4 - y * 10}deg`);
  };
  const reset = () => { book.current.style.removeProperty('--ry'); book.current.style.removeProperty('--rx'); };

  return (
    <section className="report wrap" id="investors" aria-labelledby="ir-title">
      <header className="ir-head">
        <div>
          <span className="eyebrow rv">Investor Relations</span>
          <h2 id="ir-title" className="rv rv-d1">Clear lines to<br />our <em className="serif">investors.</em></h2>
        </div>
        <div className="ir-intro rv rv-d2">
          <p>{IR.lead}</p>
          <ol className="ir-principles">
            {IR.principles.map(([title, text], i) => (
              <li key={title}><small>{String(i + 1).padStart(2, '0')}</small><div><b>{title}</b>{text}</div></li>
            ))}
          </ol>
          <a className="ir-more" href={IR.link} target="_blank" rel="noopener">Learn more about Investor Relations<span aria-hidden="true">→</span></a>
        </div>
      </header>

      <div className="report-panel rv">
        <div className="report-cover" onMouseMove={tilt} onMouseLeave={reset}>
          <a className="book" ref={book} href={REPORT.pdf} target="_blank" rel="noopener" aria-label="Open the 2024 Annual Report (PDF)">
            <span className="book-face">
              <img src="/assets/rlc-header-logo.png" alt="" className="book-logo" />
              <span className="book-year">2024</span>
              <span className="book-title">Annual Report</span>
              <span className="book-lines" aria-hidden="true"><i /><i /><i /></span>
              <span className="book-tag">46 Years · Proven Stability</span>
            </span>
            <span className="book-pages" aria-hidden="true" />
          </a>
          <span className="cover-hint">PDF · Click to open</span>
        </div>

        <div className="report-body">
          <span className="eyebrow">Annual Report 2024</span>
          <h3 id="report-title">Built on <em className="serif">transparent</em> growth.</h3>
          <p>{REPORT.summary}</p>
          <dl className="report-stats">
            {STATS.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd><Counter value={value} dec={2} money /></dd></div>
            ))}
          </dl>
          <div className="report-actions">
            <Btn href={REPORT.pdf} target="_blank" rel="noopener" arrow="↗">Read the 2024 report</Btn>
            <a className="report-link" href={REPORT.all} target="_blank" rel="noopener">All reports</a>
            <a className="report-link" href={REPORT.dis} target="_blank" rel="noopener">DIS 2024 (PDF)</a>
          </div>
        </div>
      </div>

      <div className="ir-strip">
        <div className="ir-trust rv">
          <span className="ir-dot" />
          <p>A <b>JG Summit</b> company. Listed on the <b>Philippine Stock Exchange</b> (PSE: RLC).</p>
        </div>
        <nav className="ir-links rv rv-d1" aria-label="Investor relations">
          {REPORT.links.map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener">{label}<span aria-hidden="true">↗</span></a>
          ))}
        </nav>
      </div>
    </section>
  );
}
