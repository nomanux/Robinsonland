import STORIES from '../stories.json';

/* Stories mirrored from robinsonsland.com by scripts/sync-stories.mjs (`npm run stories`), newest first */
export { STORIES };

const FILES = 'https://robinsonsland.com/sites/default/files/';

/* Site image URL; `size` picks a Drupal image style (medium ≈ 440px, large ≈ 1150px). Inline article images have no styles. */
export const storyImg = (path, size) => {
  if (!path || /^https?:/.test(path)) return path;
  return FILES + (size && !path.startsWith('inline-images/') ? `styles/${size}/public/` : '') + path;
};

export const storyHref = slug => `#/stories/${slug}`;
export const storyOriginal = slug => `https://robinsonsland.com/stories/${slug}`;

export const formatDate = iso => new Date(iso + 'T12:00:00Z')
  .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/* Only show the site's tidy category names; many stories carry none or raw keyword tags */
export const storyTag = tag => (/^[A-Z][A-Za-z ]+$/.test(tag) ? tag : '');
