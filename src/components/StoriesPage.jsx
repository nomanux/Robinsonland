import { useEffect, useMemo, useState } from 'react';
import { STORIES, formatDate, storyHref, storyImg, storyTag } from '../lib/stories.js';
import { hideOnError } from '../lib/hooks.js';
import { Icon } from './Icons.jsx';
import StoryCard from './StoryCard.jsx';

const PAGE = 12;
const YEARS = [...new Set(STORIES.map(s => s.date.slice(0, 4)))];
const FIRST_YEAR = YEARS[YEARS.length - 1];

/* All stories: newest as a feature, then search, year filter and a grid that grows by PAGE */
export default function StoriesPage() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [shown, setShown] = useState(PAGE);

  const filtering = Boolean(query.trim() || year);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STORIES.filter(s => (!year || s.date.startsWith(year))
      && (!q || s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)));
  }, [query, year]);

  useEffect(() => setShown(PAGE), [query, year]);
  useEffect(() => { document.title = 'News and Stories | Robinsons Land'; }, []);

  const [lead, ...rest] = STORIES;
  const grid = filtering ? results : rest;
  const clear = () => { setQuery(''); setYear(''); };

  return (
    <section className="stories-page wrap" aria-labelledby="stories-title">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="#top">Home</a><span aria-hidden="true">/</span><span aria-current="page">Stories</span></nav>
      <header className="stories-head">
        <div>
          <span className="eyebrow">Newsroom</span>
          <h1 id="stories-title">News and <em className="serif">stories.</em></h1>
        </div>
        <p>Updates from our developments, our people and the communities around them. {STORIES.length} stories since {FIRST_YEAR}.</p>
      </header>

      {!filtering && (
        <a className="story-feature" href={storyHref(lead.slug)} data-cursor="Read">
          <div className="story-feature-img img-fallback">
            <img src={storyImg(lead.img, 'large')} alt="" onError={hideOnError} />
          </div>
          <div className="story-feature-copy">
            <span className="story-meta"><span className="story-new">Latest</span><time dateTime={lead.date}>{formatDate(lead.date)}</time>{storyTag(lead.tag) && <span>{storyTag(lead.tag)}</span>}</span>
            <h2>{lead.title}</h2>
            {lead.summary && <p>{lead.summary}</p>}
            <span className="more">Read story</span>
          </div>
        </a>
      )}

      <div className="stories-tools">
        <label className="stories-search">
          <Icon name="Search" />
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search stories" aria-label="Search stories" />
        </label>
        <div className="year-chips" role="group" aria-label="Filter by year">
          <button type="button" aria-pressed={!year} onClick={() => setYear('')}>All years</button>
          {YEARS.map(y => <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>)}
        </div>
      </div>

      <p className="stories-count" aria-live="polite">
        {filtering ? `${results.length} ${results.length === 1 ? 'story' : 'stories'} found` : 'More stories'}
      </p>

      {grid.length ? (
        <div className="news-grid stories-grid">
          {grid.slice(0, shown).map(s => <StoryCard key={s.slug} story={s} summary />)}
        </div>
      ) : (
        <div className="stories-empty">
          <p>No stories match your search.</p>
          <button type="button" className="text-link" onClick={clear}>Clear filters</button>
        </div>
      )}

      {shown < grid.length && (
        <div className="stories-more">
          <span>Showing {Math.min(shown, grid.length)} of {grid.length}</span>
          <button type="button" className="btn" onClick={() => setShown(n => n + PAGE)}><span>Load more stories</span></button>
        </div>
      )}
    </section>
  );
}
