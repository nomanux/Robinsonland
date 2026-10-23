import { useEffect, useRef, useState } from 'react';
import BOARD from '../board.json';
import { hideOnError } from '../lib/hooks.js';
import AboutMore from './AboutMore.jsx';

const { directors, officers } = BOARD;
const isIndependent = d => /independent/i.test(d.role);
const FACTS = [
  [directors.length, 'directors on the board'],
  [directors.filter(isIndependent).length, 'independent directors'],
  [officers.length, 'executive officers'],
];

/* Board of Directors & Officers: director cards that open a full profile dialog, then the officers list */
export default function Board() {
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);
  const lastTrigger = useRef(null);

  useEffect(() => { document.title = 'Board of Directors & Officers | Robinsons Land'; }, []);

  // Keep the native modal in step with state; focus returns to the card that opened it
  useEffect(() => {
    const dlg = dialogRef.current;
    if (open !== null && !dlg.open) dlg.showModal();
    if (open === null && dlg.open) dlg.close();
    if (open !== null) dlg.querySelector('.bio-body')?.scrollTo(0, 0);
    // The page behind stays put while a profile is open
    document.documentElement.style.overflow = open !== null ? 'hidden' : '';
  }, [open]);
  useEffect(() => () => { document.documentElement.style.overflow = ''; }, []);

  const show = (i, e) => { lastTrigger.current = e.currentTarget; setOpen(i); };
  const step = d => setOpen(i => (i + d + directors.length) % directors.length);
  const person = open !== null ? directors[open] : null;

  return (
    <article className="profile" aria-labelledby="board-title">
      <section className="wrap profile-hero">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="#top">Home</a><span aria-hidden="true">/</span><a href="#about">About</a><span aria-hidden="true">/</span><span aria-current="page">Board of Directors & Officers</span>
        </nav>
        <div className="profile-hero-grid principles-head">
          <div>
            <span className="eyebrow rv">Leadership</span>
            <h1 id="board-title" className="rv rv-d1">Board of directors <em className="serif">& officers.</em></h1>
          </div>
          <div className="rv rv-d2">
            <p className="profile-intro">The people who set Robinsons Land’s direction, oversee its governance and lead the business day to day.</p>
            <dl className="profile-facts">
              {FACTS.map(([n, label]) => <div key={label}><dt>{label}</dt><dd>{n}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap board-block" aria-labelledby="directors-title">
        <div className="block-head">
          <h2 id="directors-title" className="rv">Board of <em className="serif">directors.</em></h2>
        </div>
        <ul className="director-grid">
          {directors.map((d, i) => (
            <li key={d.name} className={`rv${i % 5 ? ` rv-d${Math.min(i % 5, 3)}` : ''}`}>
              <button type="button" className="director-card" onClick={e => show(i, e)} aria-haspopup="dialog">
                <span className="director-photo img-fallback">
                  <img src={d.img} alt="" loading="lazy" onError={hideOnError} />
                  {isIndependent(d) && <span className="director-tag">Independent</span>}
                </span>
                <span className="director-name">{d.name}</span>
                <span className="director-role">{d.role}</span>
                <span className="director-more">View profile <span aria-hidden="true">+</span></span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap board-block" aria-labelledby="officers-title">
        <div className="block-head">
          <h2 id="officers-title" className="rv">Executive <em className="serif">officers.</em></h2>
        </div>
        <ol className="officer-list rv">
          {officers.map(([name, title]) => (
            <li key={name}><strong>{name}</strong><span>{title}</span></li>
          ))}
        </ol>
      </section>

      <AboutMore current="#/about/board" />

      <dialog ref={dialogRef} className="bio-dialog" aria-labelledby="bio-name"
        onClose={() => { setOpen(null); lastTrigger.current?.focus(); }}
        onClick={e => { if (e.target === e.currentTarget) setOpen(null); }}>
        {person && (
          <div className="bio-inner">
            <div className="bio-side">
              <span className="bio-photo img-fallback"><img src={person.img} alt={person.name} onError={hideOnError} /></span>
              <div className="bio-nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous director">←</button>
                <span>{open + 1} / {directors.length}</span>
                <button type="button" onClick={() => step(1)} aria-label="Next director">→</button>
              </div>
            </div>
            <div className="bio-body">
              <span className="bio-role">{person.role}</span>
              <h2 id="bio-name">{person.name}</h2>
              {person.bio.map(p => <p key={p.slice(0, 32)}>{p}</p>)}
            </div>
            <button type="button" className="bio-close" onClick={() => setOpen(null)} aria-label="Close profile">×</button>
          </div>
        )}
      </dialog>
    </article>
  );
}
