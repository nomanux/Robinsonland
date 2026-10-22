import { useRef } from 'react';
import { ABOUT } from '../data.js';
import { prefersReducedMotion, useScrollFrame } from '../lib/hooks.js';

/* Bold blue About band: tilting R logo over a blueprint grid, About copy, then headline figures */
export default function About() {
  const stage = useRef(null);
  const tile = useRef(null);
  const big = useRef(null);

  // Scroll parallax on the giant "46" and the logo tile
  useScrollFrame(() => {
    if (!stage.current || prefersReducedMotion()) return;
    const r = stage.current.getBoundingClientRect();
    const p = (innerHeight - r.top) / (innerHeight + r.height) - .5; // -0.5 .. 0.5
    big.current.style.transform = `translate3d(0, ${p * -120}px, 0)`;
    tile.current.style.setProperty('--sy', `${p * 60}px`);
  });

  // Mouse tilt on the logo tile
  const onMove = e => {
    if (prefersReducedMotion()) return;
    const r = stage.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    tile.current.style.setProperty('--rx', `${-y * 18}deg`);
    tile.current.style.setProperty('--ry', `${x * 22}deg`);
  };
  const onLeave = () => { tile.current.style.setProperty('--rx', '8deg'); tile.current.style.setProperty('--ry', '-14deg'); };

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-grid-bg" aria-hidden="true" />
      <div className="wrap about-top">
        <div className="about-stage" ref={stage} onMouseMove={onMove} onMouseLeave={onLeave} aria-hidden="true">
          <div className="about-46" ref={big}>46</div>
          <div className="blueprint"><i /><i /><i /></div>
          <div className="about-tile" ref={tile}>
            <img src="/assets/rlc-logo.png" alt="" />
            <span className="tile-glow" />
          </div>
          <div className="about-badge"><b>46</b><span>Years of<br />proven stability</span></div>
        </div>

        <div className="about-copy">
          <span className="eyebrow light rv">{ABOUT.eyebrow}</span>
          <h2 id="about-title" className="rv rv-d1">{ABOUT.title[0]}<br /><em className="serif">{ABOUT.title[1]}</em></h2>
          <p className="about-lead rv rv-d2"><b>Robinsons Land Corporation (“RLC”)</b>{ABOUT.lead}</p>
          {ABOUT.paras.map((t, i) => <p key={i} className={`rv rv-d${(i % 3) + 1}`}>{t}</p>)}
          <a className="btn rv" href={ABOUT.link}><span>Learn more</span><span className="arr">→</span></a>
        </div>
      </div>

    </section>
  );
}
