// Mirrors robinsonsland.com/news-and-stories into this site.
//   src/stories.json            every story's listing data (title, date, summary, thumbnail, category)
//   public/stories/<slug>.json  each article's body as clean blocks, loaded when a story is opened
// Only articles without a body file are fetched; pass --all to refetch every article.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LIST_FILE = join(ROOT, 'src/stories.json');
const BODY_DIR = join(ROOT, 'public/stories');
const BASE = 'https://robinsonsland.com';
const FILES = `${BASE}/sites/default/files/`;
const refetchAll = process.argv.includes('--all');

const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
  .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
  .replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/\s+/g, ' ').trim();
const textOf = html => decode(html.replace(/<[^>]+>/g, ''));
const absUrl = u => (/^https?:/.test(u) ? u : BASE + (u.startsWith('/') ? '' : '/') + u).replace(/^https?:\/\/(www\.)?robinsonsland\.com/, BASE);
// Store site images as their path under /sites/default/files/, without the Drupal style segment or token
const filePath = src => {
  const u = absUrl(src).replace(/\?itok=.*$/, '').replace(/\/styles\/[^/]+\/public\//, '/');
  return u.startsWith(FILES) ? u.slice(FILES.length) : u;
};
const isoDate = d => { const t = new Date(d + ' 12:00 UTC'); return isNaN(t) ? d : t.toISOString().slice(0, 10); };

async function get(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (attempt === 3) throw new Error(`${url}: ${e.message}`);
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

/* Listing pages: 10 stories each, newest first */
async function fetchList() {
  const stories = [];
  const seen = new Set();
  for (let page = 0; page < 500; page++) {
    const html = await get(`${BASE}/news-and-stories${page ? `?page=${page}` : ''}`);
    let added = 0;
    for (const row of html.split('<div class="views-row').slice(1)) {
      const href = row.match(/href="\/stories\/([^"]+)"/)?.[1];
      if (!href || seen.has(href)) continue;
      seen.add(href);
      stories.push({
        slug: href,
        date: isoDate(textOf(row.match(/<small class="text-secondary">([\s\S]*?)<\/small>/)?.[1] ?? '')),
        title: textOf(row.match(/field--name-title[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? ''),
        summary: textOf(row.match(/field--name-field-summary1[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? ''),
        img: filePath(row.match(/<img[^>]*src="([^"]+)"/)?.[1] ?? ''),
      });
      added++;
    }
    process.stdout.write(`\rlisting page ${page + 1}, ${stories.length} stories`);
    if (!added || !html.includes(`page=${page + 1}`)) break;
  }
  process.stdout.write('\n');
  return stories;
}

/* Keeps strong, em, a[href] and br; unwraps every other tag */
const inline = html => html
  .replace(/<img[^>]*>/gi, '')
  .replace(/<(\/?)b(\s[^>]*)?>/gi, '<$1strong>')
  .replace(/<(\/?)i(\s[^>]*)?>/gi, '<$1em>')
  .replace(/<a\s[^>]*href="([^"]*)"[^>]*>/gi, (_, h) => `<a href="${absUrl(h.replace(/&amp;/g, '&')).replace(/"/g, '%22')}">`)
  .replace(/<br\s*\/?>/gi, '<br>')
  .replace(/<(?!\/?(strong|em|a|br)[\s>])[^>]+>/gi, '')
  .replace(/<(strong|em)\s[^>]*>/gi, '<$1>')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .replace(/<(strong|em)>\s*<\/\1>/g, '')
  .replace(/^(<br>\s*)+|(\s*<br>)+$/g, '')
  .trim();

const images = html => [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)]
  .map(m => ({ src: filePath(m[1]), alt: decode(m[0].match(/alt="([^"]*)"/)?.[1] ?? '') }));

function toBlocks(body) {
  const out = [];
  const re = /<figure[\s\S]*?<\/figure>|<p[\s>][\s\S]*?<\/p>|<h([1-6])[\s>][\s\S]*?<\/h\1>|<(ul|ol)[\s>][\s\S]*?<\/\2>|<blockquote[\s\S]*?<\/blockquote>|<img[^>]*>|<iframe[^>]*>/gi;
  for (const [m, h, list] of body.matchAll(re)) {
    if (/^<figure/i.test(m)) {
      const cap = textOf(m.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] ?? '');
      images(m).forEach(i => out.push({ t: 'img', ...i, cap }));
    } else if (/^<iframe/i.test(m)) {
      const src = m.match(/src="([^"]+)"/)?.[1];
      if (src && /youtube|vimeo/.test(src)) out.push({ t: 'video', src: src.startsWith('//') ? 'https:' + src : src });
    } else if (/^<img/i.test(m)) {
      images(m).forEach(i => out.push({ t: 'img', ...i, cap: '' }));
    } else if (list) {
      const items = [...m.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(x => inline(x[1])).filter(Boolean);
      if (items.length) out.push({ t: list, items });
    } else {
      images(m).forEach(i => out.push({ t: 'img', ...i, cap: '' }));
      const html = inline(m);
      if (textOf(html)) out.push({ t: h ? 'h' : /^<blockquote/i.test(m) ? 'quote' : 'p', html });
    }
  }
  return out;
}

async function fetchArticle(slug) {
  const html = await get(`${BASE}/stories/${slug}`);
  const start = html.indexOf('field--name-body');
  const open = html.indexOf('>', html.indexOf('field__item', start)) + 1;
  const end = html.indexOf('<hr/>', open);
  const body = start < 0 ? '' : html.slice(open, end < 0 ? undefined : end);
  const hero = html.match(/article-image">[\s\S]*?<img[^>]*src="([^"]+)"/)?.[1];
  return {
    tag: textOf(html.match(/article-tags">([\s\S]*?)<\/div>/)?.[1] ?? ''),
    hero: hero ? filePath(hero) : '',
    blocks: toBlocks(body),
  };
}

const old = existsSync(LIST_FILE) ? JSON.parse(readFileSync(LIST_FILE, 'utf8')) : [];
const oldTags = new Map(old.map(s => [s.slug, s.tag]));
const stories = await fetchList();
mkdirSync(BODY_DIR, { recursive: true });

const todo = stories.filter(s => refetchAll || !existsSync(join(BODY_DIR, `${s.slug}.json`)) || !oldTags.has(s.slug));
let next = 0, done = 0;
const failed = [];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < todo.length) {
    const s = todo[next++];
    try {
      const { tag, hero, blocks } = await fetchArticle(s.slug);
      oldTags.set(s.slug, tag);
      writeFileSync(join(BODY_DIR, `${s.slug}.json`), JSON.stringify(hero && hero !== s.img ? { hero, blocks } : { blocks }));
    } catch (e) {
      failed.push(e.message);
    }
    process.stdout.write(`\rarticles ${++done}/${todo.length}`);
  }
}));
if (todo.length) process.stdout.write('\n');

stories.forEach(s => { s.tag = oldTags.get(s.slug) || ''; });
writeFileSync(LIST_FILE, JSON.stringify(stories, null, 1) + '\n');
console.log(`${stories.length} stories, ${todo.length - failed.length} articles fetched`);
if (failed.length) console.log('failed:\n' + failed.join('\n'));
