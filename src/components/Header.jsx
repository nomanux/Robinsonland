import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, MOBILE_LINKS } from '../data.js';
import { useScrollFrame } from '../lib/hooks.js';
import Btn from './Btn.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);
  const openRef = useRef(open);
  openRef.current = open;

  useScrollFrame(() => {
    const y = scrollY;
    const hero = document.querySelector('.hero');
    setHidden(y > lastY.current && y > 200 && !openRef.current);
    setSolid(hero ? y > hero.offsetHeight - 80 : true);
    lastY.current = y;
  });

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const navCls = ['nav', hidden && 'hide', solid && 'light'].filter(Boolean).join(' ');

  return (
    <>
      <header className={navCls}>
        <a href="#top" className="logo" aria-label="Robinsons Land home"><img className="logo-full" src="assets/rlc-header-logo.png" alt="Robinsons Land" /></a>
        <ul className="nav-links">
          {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <Btn href="#contact">Get in touch</Btn>
        <button className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><i /><i /></button>
      </header>

      <nav className={`mobile-menu${open ? ' open' : ''}`} aria-label="Mobile">
        <div>
          {MOBILE_LINKS.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        </div>
        <p style={{ opacity: .6, fontSize: 14 }}>+632 8397 1888 · Robinsons Galleria, Quezon City</p>
      </nav>
    </>
  );
}
