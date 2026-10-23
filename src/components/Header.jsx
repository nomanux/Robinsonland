import { useEffect, useRef, useState } from 'react';
import { MENU } from '../data.js';
import { useScrollFrame } from '../lib/hooks.js';
import { STORIES, formatDate, storyHref, storyImg } from '../lib/stories.js';
import Btn from './Btn.jsx';

const OPEN_DELAY = 90;
const CLOSE_DELAY = 180;
const isExternal = href => /^https?:/.test(href);
const linkProps = href => (isExternal(href) ? { href, target: '_blank', rel: 'noopener' } : { href });

function MenuLink({ label, href, onClick }) {
  return (
    <a {...linkProps(href)} onClick={onClick}>
      <span>{label}</span>
      {isExternal(href) && <span className="ext" aria-hidden="true">↗</span>}
    </a>
  );
}

/* Right-hand card: the newest story for About, otherwise a highlighted destination */
function Feature({ feature, onClick }) {
  if (feature.type === 'story') {
    const s = STORIES[0];
    return (
      <a className="mega-feature is-story" href={storyHref(s.slug)} onClick={onClick}>
        <span className="mega-feature-img img-fallback"><img src={storyImg(s.img, 'medium')} alt="" loading="lazy" /></span>
        <small>Latest story · {formatDate(s.date)}</small>
        <strong>{s.title}</strong>
      </a>
    );
  }
  return (
    <a className="mega-feature" {...linkProps(feature.href)} onClick={onClick}>
      <small>{feature.kicker}</small>
      <strong>{feature.title}</strong>
      <span className="mega-feature-cta">{feature.cta} <span aria-hidden="true">→</span></span>
    </a>
  );
}

/* Floating nav. Desktop: each item opens a mega menu on hover, click or keyboard.
   Mobile: full-screen menu with one expandable section per item. `plain` pages have no hero, so the bar is solid from the top. */
export default function Header({ plain = false }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);
  const menuY = useRef(0);
  const timer = useRef(0);
  const headerRef = useRef(null);
  const triggers = useRef([]);
  const openRef = useRef(open);
  const menuRef = useRef(menu);
  openRef.current = open;
  menuRef.current = menu;

  useScrollFrame(() => {
    const y = scrollY;
    const hero = document.querySelector('.hero');
    setHidden(y > lastY.current && y > 200 && !openRef.current && menuRef.current === null);
    setSolid(hero ? y > hero.offsetHeight - 80 : true);
    if (menuRef.current !== null && Math.abs(y - menuY.current) > 60) setMenu(null);
    lastY.current = y;
  });

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const show = i => { clearTimeout(timer.current); menuY.current = scrollY; setMenu(i); };
  const hoverOpen = i => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => show(i), menuRef.current === null ? OPEN_DELAY : 0);
  };
  const hoverClose = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMenu(null), CLOSE_DELAY); };
  const close = () => { clearTimeout(timer.current); setMenu(null); };

  // Escape returns focus to the open item; a click or focus outside the bar closes the panel
  useEffect(() => {
    if (menu === null) return;
    const onKey = e => { if (e.key === 'Escape') { triggers.current[menu]?.focus(); close(); } };
    const onOutside = e => { if (!headerRef.current?.contains(e.target)) close(); };
    addEventListener('keydown', onKey);
    addEventListener('pointerdown', onOutside);
    addEventListener('focusin', onOutside);
    return () => {
      removeEventListener('keydown', onKey);
      removeEventListener('pointerdown', onOutside);
      removeEventListener('focusin', onOutside);
    };
  }, [menu]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const navCls = ['nav', hidden && 'hide', (solid || plain || menu !== null) && 'light', menu !== null && 'menu-open'].filter(Boolean).join(' ');
  const closeMobile = () => setOpen(false);

  return (
    <>
      <header className={navCls} ref={headerRef} onMouseLeave={hoverClose}>
        <a href="#top" className="logo" aria-label="Robinsons Land home" onClick={close}><img className="logo-full" src="assets/rlc-header-logo.png" alt="Robinsons Land" /></a>
        <ul className="nav-links">
          {MENU.map((m, i) => (
            <li key={m.id} onMouseEnter={() => hoverOpen(i)}>
              <button type="button" ref={el => (triggers.current[i] = el)} className={`nav-trigger${menu === i ? ' on' : ''}`}
                aria-expanded={menu === i} aria-controls={`mega-${m.id}`} onClick={() => (menu === i ? close() : show(i))}>
                {m.label}
                <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5l3-3" /></svg>
              </button>
            </li>
          ))}
        </ul>
        <Btn href="#contact" onClick={close}>Get in touch</Btn>
        <button className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><i /><i /></button>

        <div className={`mega${menu !== null ? ' open' : ''}`} onMouseEnter={() => clearTimeout(timer.current)}>
          {MENU.map((m, i) => (
            <div key={m.id} id={`mega-${m.id}`} className={`mega-panel${m.feature ? ' has-feature' : ''}`} hidden={menu !== i}>
              <div className="mega-intro">
                <span className="mega-label">{m.label}</span>
                <p>{m.intro}</p>
                <MenuLink label={`${m.overview[0]} →`} href={m.overview[1]} onClick={close} />
              </div>
              <div className="mega-groups">
                {m.groups.map(g => (
                  <div key={g.title} className={`mega-group${g.wide ? ' wide' : ''}`}>
                    <h3>{g.title}</h3>
                    <ul>{g.links.map(([label, href]) => <li key={label}><MenuLink label={label} href={href} onClick={close} /></li>)}</ul>
                  </div>
                ))}
              </div>
              {m.feature && <Feature feature={m.feature} onClick={close} />}
            </div>
          ))}
        </div>
      </header>

      <nav className={`mobile-menu${open ? ' open' : ''}`} aria-label="Mobile">
        <div className="mobile-sections">
          {MENU.map(m => (
            <details key={m.id}>
              <summary>{m.label}</summary>
              <div className="mobile-sub">
                <MenuLink label={m.overview[0]} href={m.overview[1]} onClick={closeMobile} />
                {m.groups.map(g => (
                  <div key={g.title}>
                    <h3>{g.title}</h3>
                    {g.links.map(([label, href]) => <MenuLink key={label} label={label} href={href} onClick={closeMobile} />)}
                  </div>
                ))}
              </div>
            </details>
          ))}
          <a className="mobile-top" href="#/stories" onClick={closeMobile}>Stories</a>
          <a className="mobile-top" href="#contact" onClick={closeMobile}>Contact</a>
        </div>
        <p style={{ opacity: .6, fontSize: 14 }}>+632 8397 1888 · Robinsons Galleria, Quezon City</p>
      </nav>
    </>
  );
}
