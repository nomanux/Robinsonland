import { useEffect, useState } from 'react';
import { SUSTAIN } from '../data.js';
import { hideOnError, prefersReducedMotion } from '../lib/hooks.js';

const u = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const TABS = [
  {
    key: 'climate', label: 'Climate action', fig: '15', unit: 'office buildings',
    img: u('photo-1509391366360-2e959784a276'), alt: 'Solar panels under a clear sky',
    text: 'Robinsons Offices towers in Metro Manila run on 100% renewable energy. Geothermal power from First Gen also supplies key malls in the Visayas and Mindanao.',
    link: 'https://robinsonsland.com/sustainability',
  },
  {
    key: 'rlove', label: 'RLove', fig: '6', unit: 'focus areas',
    img: u('photo-1559027615-cd4628902d4a'), alt: 'Volunteers working together on a community project',
    text: 'RLove is the Robinsons Land Foundation, our non-stock, non-profit arm. It works in disaster response, community development, health, nutrition, child welfare and education.',
    link: 'https://robinsonsland.com/rlfi-redirect',
  },
  {
    key: 'gift', label: 'The Gift of Change', fig: '6', unit: 'programmes',
    img: u('photo-1488521787991-ed7bbaae773c'), alt: 'Children smiling at a community outreach event',
    text: "Our coin bank campaign at Robinsons Malls. Shoppers' spare change funds The Gift of Sight, The Gift of HeART, Bike for Change, relief operations and Pailaw sa Barangay.",
    link: 'https://robinsonsland.com/gift-of-change',
  },
];
const DURATION = 7000;

/* Tabbed programmes: tabs on the left auto-advance; the panel crossfades image and copy */
export default function Sustainability() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const report = SUSTAIN.reports[0];

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setTimeout(() => setActive(a => (a + 1) % TABS.length), DURATION);
    return () => clearTimeout(t);
  }, [active, paused]);

  const tab = TABS[active];
  return (
    <section className="sustain" id="sustainability" aria-labelledby="sus-title"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="wrap sus-tabs">
        <div className="sus-side">
          <span className="eyebrow rv">Sustainability</span>
          <h2 id="sus-title" className="rv rv-d1">Growth that gives <em className="serif">back.</em></h2>
          <p className="rv rv-d2">Responsible growth, reaching underserved markets and reshaping communities.</p>

          <div className="tablist rv rv-d2" role="tablist" aria-label="Sustainability programmes">
            {TABS.map((t, i) => (
              <button key={t.key} role="tab" id={`tab-${t.key}`} aria-selected={i === active} aria-controls="sus-panel"
                className={`tab${i === active ? ' on' : ''}${paused ? ' paused' : ''}`} onClick={() => setActive(i)}>
                <span className="tab-no">0{i + 1}</span>{t.label}
                <i className="tab-bar" style={{ animationDuration: `${DURATION}ms` }} key={i === active ? active : 'x'} />
              </button>
            ))}
          </div>

          <a className="sus-report rv" href={report[1]} target="_blank" rel="noopener">Sustainability Report {report[0]} <span aria-hidden="true">↗</span></a>
        </div>

        <div className="sus-panel rv rv-d1" id="sus-panel" role="tabpanel" aria-labelledby={`tab-${tab.key}`}>
          <div className="sus-media img-fallback">
            {TABS.map((t, i) => <img key={t.key} src={t.img} alt={i === active ? t.alt : ''} className={i === active ? 'on' : ''} loading="lazy" onError={hideOnError} />)}
          </div>
          <div className="sus-copy" key={tab.key}>
            <div className="sus-fig">{tab.fig}<small>{tab.unit}</small></div>
            <p>{tab.text}</p>
            <a className="sus-more" href={tab.link} target="_blank" rel="noopener">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
