import { useEffect, useRef, useState } from 'react';
import { SUSTAIN } from '../data.js';
import { hideOnError, prefersReducedMotion } from '../lib/hooks.js';

const u = (id, w = 2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const TABS = [
  {
    key: 'climate', label: 'Climate action', fig: 15, unit: 'office buildings on renewables',
    img: 'photo-1509391366360-2e959784a276', alt: 'Solar panels under a clear sky',
    text: 'Robinsons Offices towers in Metro Manila run on 100% renewable energy. Geothermal power from First Gen also supplies key malls in the Visayas and Mindanao.',
    chips: ['100% renewable energy', 'Geothermal power', 'Visayas malls', 'Mindanao malls'],
    link: 'https://robinsonsland.com/sustainability',
  },
  {
    key: 'rlove', label: 'RLove', fig: 6, unit: 'focus areas',
    img: 'photo-1559027615-cd4628902d4a', alt: 'Volunteers working together on a community project',
    text: 'RLove is the Robinsons Land Foundation, our non-stock, non-profit arm. It works in disaster response, community development, health, nutrition, child welfare and education.',
    chips: SUSTAIN.focus,
    link: 'https://robinsonsland.com/rlfi-redirect',
  },
  {
    key: 'gift', label: 'The Gift of Change', fig: 6, unit: 'programmes',
    img: 'photo-1488521787991-ed7bbaae773c', alt: 'Children smiling at a community outreach event',
    text: "Our coin bank campaign at Robinsons Malls. Shoppers' spare change funds The Gift of Sight, The Gift of HeART, Bike for Change, relief operations and Pailaw sa Barangay.",
    chips: SUSTAIN.gift,
    link: 'https://robinsonsland.com/gift-of-change',
  },
];
const DURATION = 8000;
const pad = n => String(n).padStart(2, '0');

/* Eases a number up from zero each time `trigger` changes */
function useCountUp(target, trigger, run) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) { setV(target); return; }
    let raf;
    const t0 = performance.now(), dur = 1200;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, run]);
  return v;
}

/* Cinematic stage: full-bleed image per programme, oversized figure, story-style tabs.
   The tab progress bar drives auto-advance, so pausing the bar pauses the slideshow. */
export default function Sustainability() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [stopped, setStopped] = useState(() => prefersReducedMotion());
  const [inView, setInView] = useState(false);
  const stageRef = useRef(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: .35 });
    io.observe(stageRef.current);
    return () => io.disconnect();
  }, []);

  const tab = TABS[active];
  const n = useCountUp(tab.fig, active, inView);
  const paused = hold || stopped || !inView;
  const next = () => setActive(a => (a + 1) % TABS.length);

  const onKey = e => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let i = null;
    if (e.key in keys) i = (active + keys[e.key] + TABS.length) % TABS.length;
    if (e.key === 'Home') i = 0;
    if (e.key === 'End') i = TABS.length - 1;
    if (i === null) return;
    e.preventDefault();
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  return (
    <section className="sustain" id="sustainability" aria-labelledby="sus-title">
      <div className="wrap">
        <header className="sus-head">
          <div>
            <span className="eyebrow rv">Sustainability</span>
            <h2 id="sus-title" className="rv rv-d1">Growth that<br />gives <em className="serif">back.</em></h2>
          </div>
          <div className="rv rv-d2">
            <span className="sus-pillars-label">Our three commitments</span>
            <ol className="sus-pillars">
              {SUSTAIN.pillars.map((p, i) => <li key={p}><small>{pad(i + 1)}</small>{p}</li>)}
            </ol>
          </div>
        </header>

        <div ref={stageRef} className={`sus-stage${paused ? ' is-paused' : ''}`}
          onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHold(false); }}>

          <div className="sus-bg img-fallback">
            {TABS.map((t, i) => (
              <img key={t.key} src={u(t.img)} alt={i === active ? t.alt : ''} aria-hidden={i !== active}
                className={i === active ? 'on' : ''} loading="lazy" onError={hideOnError} />
            ))}
          </div>
          <div className="sus-shade" aria-hidden="true" />

          <div className="sus-top">
            <span className="sus-count" aria-hidden="true"><b>{pad(active + 1)}</b> / {pad(TABS.length)}</span>
            <button type="button" className="sus-play" onClick={() => setStopped(s => !s)}
              aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}>
              {stopped
                ? <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" fill="currentColor" /></svg>
                : <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1.5h2.6v11H3zM8.4 1.5H11v11H8.4z" fill="currentColor" /></svg>}
            </button>
          </div>

          <div className="sus-panel" id="sus-panel" role="tabpanel" aria-labelledby={`sus-tab-${tab.key}`} key={tab.key}>
            <span className="sus-kicker">{tab.label}</span>
            <div className="sus-fig"><span>{n}</span><small>{tab.unit}</small></div>
            <p>{tab.text}</p>
            <ul className="sus-chips" aria-label={`${tab.label} highlights`}>
              {tab.chips.map((c, i) => <li key={c} style={{ '--i': i }}>{c}</li>)}
            </ul>
            <a className="btn ghost" href={tab.link} target="_blank" rel="noopener">
              <span>Learn more</span><span className="arr" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="sus-tabs" role="tablist" aria-label="Sustainability programmes" onKeyDown={onKey}>
            {TABS.map((t, i) => (
              <button key={t.key} ref={el => (tabRefs.current[i] = el)} type="button" role="tab"
                id={`sus-tab-${t.key}`} aria-selected={i === active} aria-controls="sus-panel"
                tabIndex={i === active ? 0 : -1}
                className={`sus-tab${i === active ? ' on' : ''}`} onClick={() => setActive(i)}>
                <i className="sus-bar" aria-hidden="true">
                  {i === active && <i key={active} style={{ animationDuration: `${DURATION}ms` }} onAnimationEnd={next} />}
                </i>
                <span className="sus-thumb img-fallback" aria-hidden="true">
                  <img src={u(t.img, 200)} alt="" loading="lazy" onError={hideOnError} />
                </span>
                <span className="sus-tab-label">{t.label}</span>
                <span className="sus-tab-meta">{t.fig} {t.unit}</span>
                <span className="sus-tab-no" aria-hidden="true">{pad(i + 1)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sus-reports rv">
          <div className="sus-reports-label">Sustainability reports<small>PDF archive, opens in a new tab</small></div>
          <ul>
            {SUSTAIN.reports.map(([year, href], i) => (
              <li key={year}>
                <a className={i === 0 ? 'latest' : ''} href={href} target="_blank" rel="noopener">
                  {year}{i === 0 && <em>Latest</em>}<span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
