import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks.js';

export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => { setDone(true); document.body.classList.add('loaded'); };
    if (prefersReducedMotion()) { finish(); return; }
    let n = 0, timer;
    const tick = () => {
      n = Math.min(100, n + Math.max(1, Math.round((100 - n) * 0.08)));
      setCount(n);
      timer = n < 100 ? setTimeout(tick, 28) : setTimeout(finish, 250);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div className="loader-top"><img src="assets/rlc-header-logo.png" alt="" style={{ height: 30, width: 'auto' }} /><span>46 Years · Proven Stability</span></div>
      <div>
        <div className="loader-count">{count}</div>
        <div className="loader-bar"><i style={{ transform: `scaleX(${count / 100})` }} /></div>
      </div>
    </div>
  );
}
