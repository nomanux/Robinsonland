import { STORIES } from '../data.js';
import { hideOnError } from '../lib/hooks.js';

export default function News() {
  return (
    <section className="news wrap" id="news">
      <div className="sec-head">
        <h2 className="rv">Latest <em className="serif">stories.</em></h2>
        <p className="rv rv-d1">News from our developments and the communities around them.</p>
      </div>
      <div className="news-grid">
        {STORIES.map((s, i) => (
          <article key={s.title} className={`card rv${i ? ` rv-d${i}` : ''}`} data-cursor="Read">
            <div className="card-img img-fallback">
              <img src={s.img} alt={s.alt} loading="lazy" onError={hideOnError} />
              <span className="date">{s.date}</span>
            </div>
            <h3>{s.title}</h3>
            <span className="more">Read story</span>
          </article>
        ))}
      </div>
    </section>
  );
}
