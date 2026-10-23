import { formatDate, storyHref, storyImg } from '../lib/stories.js';
import { hideOnError } from '../lib/hooks.js';

/* Image card linking to a story page; the title beside it describes the image, so it carries no alt text */
export default function StoryCard({ story, summary = false, className = '' }) {
  return (
    <a href={storyHref(story.slug)} className={`card ${className}`.trim()} data-cursor="Read">
      <div className="card-img img-fallback">
        <img src={storyImg(story.img, 'large')} alt="" loading="lazy" onError={hideOnError} />
        <time className="date" dateTime={story.date}>{formatDate(story.date)}</time>
      </div>
      <h3>{story.title}</h3>
      {summary && story.summary && <p className="card-sum">{story.summary}</p>}
      <span className="more">Read story</span>
    </a>
  );
}
