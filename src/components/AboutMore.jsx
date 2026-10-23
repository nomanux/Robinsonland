import { ABOUT_PAGES } from '../data.js';

/* Footer strip on About pages linking to the other About pages; `current` is this page's href */
export default function AboutMore({ current }) {
  return (
    <section className="wrap profile-more" aria-labelledby="more-title">
      <h2 id="more-title">More about <em className="serif">RLC.</em></h2>
      <ul>
        {ABOUT_PAGES.filter(([, href]) => href !== current).map(([label, href]) => {
          const external = /^https?:/.test(href);
          return (
            <li key={label}>
              <a href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                {label}<span aria-hidden="true">{external ? '↗' : '→'}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
