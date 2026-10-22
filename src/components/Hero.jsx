import { useRef } from 'react';
import { prefersReducedMotion, useScrollFrame } from '../lib/hooks.js';
import Btn from './Btn.jsx';

export default function Hero() {
  const imgRef = useRef(null);

  useScrollFrame(() => {
    if (prefersReducedMotion()) return;
    const y = scrollY;
    imgRef.current.style.transform = `translateY(${y * .3}px) scale(${1 + y * .0003})`;
  });

  return (
    <section className="hero" aria-label="Robinsons Land 46 years, Proven Stability">
      <div className="hero-media">
        <picture>
          <source media="(max-width:700px)" srcSet="assets/hero-46-portrait.jpg" />
          <img ref={imgRef} src="assets/hero-46-wide.jpg" alt="Robinsons Land 46 Years, Proven Stability, over the Metro Manila skyline with the logos of all Robinsons brands" />
        </picture>
      </div>
      <div className="hero-inner">
        <div />
        <div className="hero-bottom fade-in" style={{ transitionDelay: '1.2s' }}>
          <div className="scroll-hint"><span className="track" />Scroll to explore</div>
          <Btn href="#about" ghost>Explore portfolio</Btn>
        </div>
      </div>
    </section>
  );
}
