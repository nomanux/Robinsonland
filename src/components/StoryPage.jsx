import { useEffect, useRef, useState } from 'react';
import { STORIES, formatDate, storyHref, storyImg, storyOriginal, storyTag } from '../lib/stories.js';
import { hideOnError, useScrollFrame } from '../lib/hooks.js';
import { Icon } from './Icons.jsx';
import StoryCard from './StoryCard.jsx';

/* Body HTML is reduced to strong, em, a and br by the sync script; links open in a new tab */
const html = s => ({ __html: s.replace(/<a /g, '<a target="_blank" rel="noopener" ') });
// The source CMS fills alt with file names like "8"; a caption describes the photo better
const altFor = b => b.cap || (/^[\w\s()-]{0,4}$/.test(b.alt) ? '' : b.alt);

/* Minutes at about 220 words a minute */
const readMinutes = blocks => {
  const text = blocks.map(b => b.html || (b.items || []).join(' ')).join(' ').replace(/<[^>]+>/g, ' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
};

function Block({ b }) {
  switch (b.t) {
    case 'h': return <h2 dangerouslySetInnerHTML={html(b.html)} />;
    case 'quote': return <blockquote dangerouslySetInnerHTML={html(b.html)} />;
    case 'ul': case 'ol': {
      const List = b.t;
      return <List>{b.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={html(item)} />)}</List>;
    }
    case 'img': return (
      <figure>
        <img src={storyImg(b.src)} alt={altFor(b)} loading="lazy" onError={hideOnError} />
        {b.cap && <figcaption>{b.cap}</figcaption>}
      </figure>
    );
    case 'video': return <div className="story-video"><iframe src={b.src} title="Story video" loading="lazy" allowFullScreen /></div>;
    default: return <p dangerouslySetInnerHTML={html(b.html)} />;
  }
}

/* One story: hero, meta, body loaded from public/stories/<slug>.json, share links, recent and related stories */
export default function StoryPage({ slug }) {
  const index = STORIES.findIndex(s => s.slug === slug);
  const story = STORIES[index];
  const [article, setArticle] = useState(null);
  const [failed, setFailed] = useState(false);
  const mainRef = useRef(null);
  const barRef = useRef(null);

  // Reading progress: how far the bottom of the screen has travelled through the article column
  useScrollFrame(() => {
    const main = mainRef.current, bar = barRef.current;
    if (!main || !bar) return;
    const r = main.getBoundingClientRect();
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, (innerHeight - r.top) / r.height))})`;
  });

  useEffect(() => {
    setArticle(null);
    setFailed(false);
    if (!story) return;
    let live = true;
    fetch(`stories/${slug}.json`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => live && setArticle(d))
      .catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [slug]);

  useEffect(() => {
    document.title = `${story ? story.title : 'Story not found'} | Robinsons Land`;
  }, [story]);

  if (!story) {
    return (
      <section className="stories-page wrap story-missing">
        <h1>Story not found.</h1>
        <p>It may have moved or been removed.</p>
        <a className="btn" href="#/stories"><span>See all stories</span><span className="arr" aria-hidden="true">→</span></a>
      </section>
    );
  }

  const original = storyOriginal(slug);
  const share = encodeURIComponent(original);
  const tag = storyTag(story.tag);
  const recent = STORIES.filter(s => s.slug !== slug).slice(0, 5);
  // The stories published just before this one, topped up with the ones just after
  const related = [...STORIES.slice(index + 1), ...STORIES.slice(0, index).reverse()].slice(0, 3);

  return (
    <article className="stories-page wrap story" aria-labelledby="story-title">
      <div className="read-progress" aria-hidden="true"><i ref={barRef} /></div>
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="#top">Home</a><span aria-hidden="true">/</span><a href="#/stories">Stories</a>
      </nav>

      <div className="story-grid">
        <div className="story-main" ref={mainRef}>
          <header className="story-head">
            <div className="story-meta">
              {tag && <span>{tag}</span>}
              <time dateTime={story.date}>{formatDate(story.date)}</time>
              {article && <span className="story-read">{readMinutes(article.blocks)} min read</span>}
            </div>
            <h1 id="story-title">{story.title}</h1>
            {story.summary && <p className="story-dek">{story.summary}</p>}
          </header>
          <figure className="story-hero img-fallback">
            <img src={storyImg(article?.hero || story.img, 'large')} alt="" onError={hideOnError} />
          </figure>

          <div className="story-body" aria-busy={!article && !failed}>
            {article && article.blocks.map((b, i) => <Block key={i} b={b} />)}
            {!article && !failed && <div className="story-skeleton" aria-hidden="true"><i /><i /><i /><i /></div>}
            {failed && (
              <>
                <p><a href={original} target="_blank" rel="noopener">Read the full story on robinsonsland.com</a></p>
              </>
            )}
          </div>

          <div className="story-share">
            <span>Share this story</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${share}`} target="_blank" rel="noopener" aria-label="Share on Facebook"><Icon name="Facebook" /></a>
            <a href={`https://twitter.com/intent/tweet?url=${share}&text=${encodeURIComponent(story.title)}`} target="_blank" rel="noopener" aria-label="Share on X"><Icon name="X" /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn"><Icon name="LinkedIn" /></a>
          </div>
        </div>

        <aside className="story-side" aria-labelledby="recent-title">
          <h2 id="recent-title">Recent stories</h2>
          <ol>
            {recent.map(s => (
              <li key={s.slug}>
                <a href={storyHref(s.slug)}>
                  <span className="side-thumb img-fallback"><img src={storyImg(s.img, 'medium')} alt="" loading="lazy" onError={hideOnError} /></span>
                  <time dateTime={s.date}>{formatDate(s.date)}</time>
                  <span className="side-title">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
          <a className="text-link" href="#/stories">View all stories <span aria-hidden="true">→</span></a>
        </aside>
      </div>

      <section className="story-related" aria-labelledby="related-title">
        <h2 id="related-title">Related <em className="serif">stories.</em></h2>
        <div className="news-grid">
          {related.map(s => <StoryCard key={s.slug} story={s} summary />)}
        </div>
      </section>
    </article>
  );
}
