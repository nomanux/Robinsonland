import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks.js';

const fmt = (v, d) => v.toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });

/* Counts up to `value` the first time it is half visible. `money` renders as ₱…B */
export default function Counter({ value, dec = 0, money = false }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = prefersReducedMotion() ? 1 : 1800;
      const step = t => {
        const p = Math.min(1, (t - t0) / dur);
        setV(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: .5 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <div className="num" ref={ref}>
      {money && '₱'}{fmt(v, dec)}{money && <small>B</small>}
    </div>
  );
}
