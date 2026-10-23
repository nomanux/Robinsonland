import { useEffect } from 'react';
import { PROFILE } from '../data.js';
import { hideOnError } from '../lib/hooks.js';
import AboutMore from './AboutMore.jsx';

const pad = n => String(n).padStart(2, '0');

/* Company Profile: hero with figures, founding statement, what RLC leads in, the "courage" band, values, and links onward */
export default function CompanyProfile() {
  const { better, courage, values } = PROFILE;
  useEffect(() => { document.title = 'Company Profile | Robinsons Land'; }, []);

  return (
    <article className="profile" aria-labelledby="profile-title">
      <section className="wrap profile-hero">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="#top">Home</a><span aria-hidden="true">/</span><a href="#about">About</a><span aria-hidden="true">/</span><span aria-current="page">Company Profile</span>
        </nav>
        <div className="profile-hero-grid">
          <div>
            <span className="eyebrow rv">About Robinsons Land</span>
            <h1 id="profile-title" className="rv rv-d1">Company <em className="serif">profile.</em></h1>
            <p className="profile-intro rv rv-d2">{PROFILE.intro}</p>
            <dl className="profile-facts rv rv-d2">
              {PROFILE.facts.map(([n, label]) => <div key={label}><dt>{label}</dt><dd>{n}</dd></div>)}
            </dl>
          </div>
          <figure className="profile-hero-img img-fallback rv rv-d1">
            <img src={PROFILE.heroImg} alt={PROFILE.heroAlt} onError={hideOnError} />
          </figure>
        </div>
      </section>

      <section className="wrap profile-statement" aria-label="Our founding belief">
        <blockquote className="rv">
          <p>{PROFILE.statement}</p>
          <cite>Robinsons Land Corporation, a JG Summit company</cite>
        </blockquote>
      </section>

      <section className="wrap profile-better" aria-labelledby="better-title">
        <div className="rv">
          <span className="eyebrow">Who we are</span>
          <h2 id="better-title">{better.title}</h2>
          {better.paras.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <ul className="profile-leads rv rv-d1" aria-label="Where RLC leads">
          {better.highlights.map(([tag, text]) => (
            <li key={tag}>
              <span className="profile-lead-tag">{tag}</span>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="profile-courage" aria-labelledby="courage-title">
        <img className="profile-courage-bg" src={courage.img} alt="" loading="lazy" onError={hideOnError} />
        <div className="wrap profile-courage-inner">
          <h2 id="courage-title" className="rv">{courage.title}</h2>
          <div className="profile-courage-cols rv rv-d1">
            {courage.paras.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="wrap profile-values" aria-labelledby="values-title">
        <div className="profile-values-copy">
          <span className="eyebrow rv">Our values</span>
          <h2 id="values-title" className="rv rv-d1">What we <em className="serif">stand for.</em></h2>
          <ol className="profile-value-list rv rv-d2">
            {values.names.map((v, i) => <li key={v}><small>{pad(i + 1)}</small>{v}</li>)}
          </ol>
          <p className="rv rv-d2">{values.text}</p>
        </div>
        <figure className="profile-values-img img-fallback rv rv-d1">
          <img src={values.img} alt={values.imgAlt} loading="lazy" onError={hideOnError} />
        </figure>
      </section>

      <AboutMore current="#/about/company-profile" />
    </article>
  );
}
