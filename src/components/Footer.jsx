import { FOOTER_GROUPS, SOCIALS } from '../data.js';
import Btn from './Btn.jsx';
import { Icon } from './Icons.jsx';

const WORDMARK = [...'Robinsons Land'];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-panel">
          <div className="foot-grid">
            <div className="foot-news">
              <img src="/assets/rlc-header-logo.png" alt="Robinsons Land" style={{ height: 40, width: 'auto', marginBottom: 26 }} />
              <p>Stay close to what we're building next.</p>
              <Btn href="#contact">Subscribe to updates</Btn>
              <div className="socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                    <Icon name={s.label} />
                  </a>
                ))}
              </div>
            </div>
            {FOOTER_GROUPS.map(g => (
              <div key={g.title}>
                <h4>{g.title}</h4>
                <ul>{g.links.map(([href, label]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
              </div>
            ))}
            <div className="foot-privacy">
              <a className="npc-seal" href="https://robinsonsland.com/privacy-notice" target="_blank" rel="noopener" aria-label="National Privacy Commission DPO/DPS registration seal">
                <img src="/assets/npc-seal.png" alt="National Privacy Commission DPO/DPS Registered seal" loading="lazy" />
              </a>
              <div className="trust-copy">
                <h4>Your data is protected</h4>
                <p>Registered with the <b>National Privacy Commission</b>.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="wordmark" aria-label="Robinsons Land">
          {WORDMARK.map((c, i) => <span key={i} aria-hidden="true" style={{ transitionDelay: `${i * .035}s` }}>{c === ' ' ? ' ' : c}</span>)}
        </div>
        <div className="foot-bottom"><span>© 2026 Robinsons Land Corporation. All rights reserved.</span><span>Terms of Use · Disclaimer · Privacy Notice</span></div>
      </div>
    </footer>
  );
}
