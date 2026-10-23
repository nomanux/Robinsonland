import { useEffect, useState } from 'react';

/* Hash routes, so pages also work when dist/index.html is opened from disk:
   #/stories        all stories
   #/stories/<slug> one story
   #/about/company-profile, #/about/principles, #/about/board
   anything else    the home page, where #section anchors scroll as usual */
function parse() {
  const hash = decodeURIComponent(location.hash);
  const m = hash.match(/^#\/stories(?:\/([^/?#]+))?\/?$/);
  if (m) return m[1] ? { page: 'story', slug: m[1], key: `story:${m[1]}` } : { page: 'stories', key: 'stories' };
  if (/^#\/about\/company-profile\/?$/.test(hash)) return { page: 'profile', key: 'profile' };
  if (/^#\/about\/principles\/?$/.test(hash)) return { page: 'principles', key: 'principles' };
  if (/^#\/about\/board\/?$/.test(hash)) return { page: 'board', key: 'board' };
  return { page: 'home', anchor: hash.startsWith('#/') ? '' : hash.slice(1), key: 'home' };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    addEventListener('hashchange', onChange);
    return () => removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
