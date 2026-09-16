import { readFile, writeFile } from 'node:fs/promises';
import { render, fetchManaResource } from '../.ssr/entry-server.mjs';

const template = await readFile('dist/index.html', 'utf8');
const translations = JSON.parse(await readFile('public/locales/en/translation.json', 'utf8'));
const resources = ['memberships', 'credits', 'trials', 'schedule', 'classes', 'faq', 'courses'];
const initialData = { en: {} };
await Promise.all(resources.map(async resource => {
  try {
    initialData.en[resource] = { data: await fetchManaResource(resource, 'en'), fetchedAt: Date.now() };
  } catch (error) {
    // Build the marketing page with direct Mana links even during an upstream outage.
    console.warn(`Mana ${resource} unavailable during prerender: ${error.message}`);
  }
}));
const routes = [['/', 'home'], ['/classes', 'classes'], ['/membership', 'membership'], ['/about', 'about'], ['/contact', 'contact']];
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
for (const [url, key] of routes) {
  const html = await render(url, translations, initialData);
  const { title, description } = translations.seo[key];
  const bootstrap = JSON.stringify({ initialData, translations }).replaceAll('<', '\\u003c');
  const output = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>\n<script id="site-bootstrap" type="application/json">${bootstrap}</script>`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${escapeHtml(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escapeHtml(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escapeHtml(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1https://www.bonobogym.com${url}`)
    .replace('</head>', `<link rel="canonical" href="https://www.bonobogym.com${url}" /></head>`);
  await writeFile(`dist/${key === 'home' ? 'index' : key}.html`, output);
  console.log(`Prerendered ${url}`);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(([url]) => `<url><loc>https://www.bonobogym.com${url}</loc></url>`).join('')}</urlset>`);
