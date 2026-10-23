import { STORIES } from '../lib/stories.js';
import Btn from './Btn.jsx';
import StoryCard from './StoryCard.jsx';

/* Home teaser: the three newest stories and a link to the full stories page */
export default function News() {
  return (
    <section className="news wrap" id="news">
      <div className="sec-head">
        <h2 className="rv">Latest <em className="serif">stories.</em></h2>
        <div className="sec-side rv rv-d1">
          <p>News from our developments and the communities around them.</p>
          <Btn href="#/stories">See all stories</Btn>
        </div>
      </div>
      <div className="news-grid">
        {STORIES.slice(0, 3).map((s, i) => <StoryCard key={s.slug} story={s} className={`rv${i ? ` rv-d${i}` : ''}`} />)}
      </div>
    </section>
  );
}
