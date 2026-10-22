import { useEffect, useRef, useState } from 'react';

/* Trailing dot that grows and shows a label over any element with data-cursor */
export default function Cursor() {
  const ref = useRef(null);
  const [label, setLabel] = useState(null);

  useEffect(() => {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy, raf;
    const move = e => { tx = e.clientX; ty = e.clientY; };
    const over = e => {
      const el = e.target.closest?.('[data-cursor]');
      setLabel(el ? el.dataset.cursor : null);
    };
    const loop = () => {
      cx += (tx - cx) * .2; cy += (ty - cy) * .2;
      ref.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    loop();
    return () => {
      removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={`cursor${label ? ' big' : ''}`} data-label={label || 'View'} />;
}
