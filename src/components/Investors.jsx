import { useRef } from 'react';
import { REPORT } from '../data.js';
import { prefersReducedMotion } from '../lib/hooks.js';
import Btn from './Btn.jsx';
import Counter from './Counter.jsx';

const R = 42, C = 2 * Math.PI * R;

/* Annual Report: 3D report cover, summary with actions, key figures with net-margin ring, IR quick links */
export default function Investors() {
  const book = useRef(null);
  const margin = REPORT.netIncome / REPORT.revenue; // 0.278

  const tilt = e => {
    if (prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    book.current.style.setProperty('--ry', `${-22 + x * 20}deg`);
    book.current.style.setProperty('--rx', `${4 - y * 10}deg`);
  };
  const reset = () => { book.current.style.removeProperty('--ry'); book.current.style.removeProperty('--rx'); };

  return (
    <section className="report wrap" id="investors" aria-labelledby="report-title">
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
          <h2 id="report-title">Built on <em className="serif">transparent</em> growth.</h2>
          <p>{REPORT.summary}</p>
          <div className="report-actions">
            <Btn href={REPORT.pdf} target="_blank" rel="noopener" arrow="↗">View the 2024 Annual Report</Btn>
            <a className="btn-outline" href={REPORT.all} target="_blank" rel="noopener">View all reports</a>
          </div>
          <a className="file-link" href={REPORT.dis} target="_blank" rel="noopener">
            <span className="file-ico" aria-hidden="true">PDF</span>
            <span><b>Download DIS 2024</b><small>Definitive Information Statement, SEC Form 20-IS</small></span>
          </a>
        </div>

        <aside className="report-kpis" aria-label="Key figures 2024">
          <div className="kpi">
            <span className="kpi-label">Gross revenue</span>
            <Counter value={REPORT.revenue} dec={2} money />
          </div>
          <div className="kpi">
            <span className="kpi-label">Total assets</span>
            <Counter value={REPORT.assets} dec={2} money />
          </div>
          <div className="kpi">
            <span className="kpi-label">Net income</span>
            <Counter value={REPORT.netIncome} dec={2} money />
          </div>
          <div className="kpi-ring">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r={R} className="track" />
              <circle cx="50" cy="50" r={R} className="prog" style={{ strokeDasharray: C, '--off': C * (1 - margin), '--c': C }} />
            </svg>
            <div><b>{(margin * 100).toFixed(1)}%</b><span>Net income margin</span></div>
          </div>
        </aside>
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
