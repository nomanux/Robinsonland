import { useEffect, useRef, useState } from 'react';
import { ESTATES } from '../data.js';
import { hideOnError } from '../lib/hooks.js';

/* Estate list with a preview image that trails the cursor while a row is hovered */
export default function Estates() {
  const floatRef = useRef(null);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let x = 0, y = 0, tx = 0, ty = 0, raf;
    const move = e => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * .12; y += (ty - y) * .12;
      floatRef.current.style.left = `${x}px`;
      floatRef.current.style.top = `${y}px`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('mousemove', move);
    loop();
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <section className="estates wrap" id="estates">
        <div className="sec-head">
          <h2 className="rv">Destination<br /><em className="serif">Estates.</em></h2>
          <p className="rv rv-d1">Master-planned communities where homes, offices, malls and open spaces sit side by side. Hover a name to preview.</p>
        </div>
        <div className="estate-list">
          {ESTATES.map((e, i) => (
            <div key={e.name} className="estate rv" onMouseEnter={() => { setActive(i); setShow(true); }} onMouseLeave={() => setShow(false)}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <h3>{e.name}</h3>
              <span className="loc">{e.loc}</span>
              <span className="size">{e.region}</span>
              <span className="go">↗</span>
            </div>
          ))}
        </div>
      </section>
      <div ref={floatRef} className={`float-img img-fallback${show ? ' show' : ''}`} aria-hidden="true">
        {ESTATES.map((e, i) => <img key={e.name} src={e.img} alt="" className={i === active ? 'on' : ''} onError={hideOnError} />)}
      </div>
    </>
  );
}
