import { useEffect, useRef } from 'react';
import { UNITS } from '../data.js';
import { hideOnError, isMobile, useScrollFrame } from '../lib/hooks.js';
import Btn from './Btn.jsx';

/* Vertical scroll drives a horizontal card track while the section is pinned */
export default function Units() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    const pin = pinRef.current, track = trackRef.current;
    const size = () => {
      if (isMobile()) {
        pin.style.setProperty('--pin-h', 'auto');
        track.style.cssText = 'overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:20px';
        return;
      }
      track.style.cssText = '';
      pin.style.setProperty('--pin-h', `${innerHeight + track.scrollWidth - innerWidth}px`);
    };
    size();
    addEventListener('resize', size);
    addEventListener('load', size);
    return () => { removeEventListener('resize', size); removeEventListener('load', size); };
  }, []);

  useScrollFrame(() => {
    if (isMobile()) return;
    const pin = pinRef.current, track = trackRef.current;
    const r = pin.getBoundingClientRect();
    const dist = track.scrollWidth - innerWidth;
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    track.style.transform = `translateX(${-dist * p}px)`;
    progRef.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section className="units" id="units">
      <div className="units-pin" ref={pinRef}>
        <div className="units-sticky">
          <div className="units-head wrap" style={{ width: '100%' }}>
            <div>
              <span className="eyebrow">Business units</span>
              <h2 style={{ marginTop: 18 }}>Six ways we<br />shape <em className="serif">everyday life.</em></h2>
            </div>
            <div className="units-progress"><i ref={progRef} /></div>
          </div>
          <div className="units-track" ref={trackRef}>
            {UNITS.map((u, i) => (
              <article key={u.name} className="unit img-fallback" data-cursor={u.cursor}>
                <span className="unit-logo"><img src={u.logo} alt={u.logoAlt} /></span>
                <img src={u.img} alt={u.imgAlt} loading="lazy" onError={hideOnError} />
                <div className="unit-body">
                  <div className="unit-top"><span>{String(i + 1).padStart(2, '0')}</span><span className="pill">{u.pill}</span></div>
                  <div><h3>{u.name}</h3><p>{u.text}</p></div>
                </div>
              </article>
            ))}
            <div className="units-end">
              <p>Looking for space to lease, buy or build on?</p>
              <Btn href="#contact">Talk to our team</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
