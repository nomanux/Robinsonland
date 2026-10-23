import { useEffect } from 'react';
import { PRINCIPLES } from '../data.js';
import { hideOnError } from '../lib/hooks.js';
import AboutMore from './AboutMore.jsx';

const pad = n => String(n).padStart(2, '0');

/* Vision, mission and core values: hero banner, vision and mission side by side, value cards, "building dreams" Q&A */
export default function Principles() {
  const { vision, mission, values, dreams } = PRINCIPLES;
  useEffect(() => { document.title = 'Vision, Mission and Core Values | Robinsons Land'; }, []);

  return (
    <article className="profile" aria-labelledby="principles-title">
      <section className="wrap profile-hero">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="#top">Home</a><span aria-hidden="true">/</span><a href="#about">About</a><span aria-hidden="true">/</span><span aria-current="page">Vision, Mission and Values</span>
        </nav>
        <div className="profile-hero-grid principles-head">
          <div>
            <span className="eyebrow rv">About Robinsons Land</span>
            <h1 id="principles-title" className="rv rv-d1">Vision, mission <em className="serif">and values.</em></h1>
          </div>
          <p className="profile-intro rv rv-d2">{PRINCIPLES.intro}</p>
        </div>
        <figure className="principles-banner img-fallback rv">
          <img src={PRINCIPLES.heroImg} alt={PRINCIPLES.heroAlt} onError={hideOnError} />
        </figure>
      </section>

      <section className="wrap vm-grid" aria-label="Vision and mission">
        <div className="vm-card is-vision rv">
          <span className="vm-label">Our vision</span>
          <p>{vision}</p>
        </div>
        <div className="vm-card rv rv-d1">
          <span className="vm-label">Our mission</span>
          <p>{mission}</p>
        </div>
      </section>

      <section className="wrap values-block" aria-labelledby="values-title">
        <div className="block-head">
          <span className="eyebrow rv">Core values</span>
          <h2 id="values-title" className="rv rv-d1">What we <em className="serif">live by.</em></h2>
        </div>
        <ol className="value-cards">
          {values.map((v, i) => (
            <li key={v.name} className={`rv${i ? ` rv-d${i}` : ''}`}>
              <span className="value-art img-fallback"><img src={v.img} alt={`${v.motto} illustration`} loading="lazy" onError={hideOnError} /></span>
              <div className="value-copy">
                <small>{pad(i + 1)} · {v.motto}</small>
                <h3>{v.name}</h3>
                <p>{v.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap dreams-block" aria-labelledby="dreams-title">
        <div className="block-head">
          <span className="eyebrow rv">Our people</span>
          <h2 id="dreams-title" className="rv rv-d1">{dreams.title}</h2>
        </div>
        <ul className="dream-cards">
          {dreams.items.map(([q, a, img], i) => (
            <li key={q} className={`rv${i ? ` rv-d${Math.min(i, 3)}` : ''}`}>
              <span className="dream-img img-fallback"><img src={img} alt="" loading="lazy" onError={hideOnError} /></span>
              <h3>{q}</h3>
              <p>{a}</p>
            </li>
          ))}
        </ul>
      </section>

      <AboutMore current="#/about/principles" />
    </article>
  );
}
