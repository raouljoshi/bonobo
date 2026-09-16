# Bonobo Gym

React, Vite, Tailwind, React Router, and i18next website for Bonobo Gym on Kvarnholmen. English and Swedish UI. Vercel serves pre-rendered marketing pages; React adds navigation and live Mana data.

## Development

Use a supported Node LTS release (Node 22.13+ or 24+).

```sh
npm ci
npm start
npm test
npm run build
npm run preview
```

Development: http://127.0.0.1:5173. Production preview: http://127.0.0.1:4173.

## Mana is the source of truth

Studio: `bonobogym` (`6f9f4080-7fd2-48bb-8eea-c8b0500006f6`).

- `src/data/mana.js` reads only anonymous public v1 endpoints. No credentials, API key, or Authorization header is needed or permitted.
- `src/data/ManaProvider.jsx` refreshes visible resources on mount, language changes, window focus, and every 60 seconds while visible. Failed requests discard stale prices and availability.
- Memberships, credit bundles, trials, classes, course sessions, courses, and booking FAQs come from Mana. Keep price amounts in minor units until formatting.
- Classes use occurrence ids in `schedule?class=…`. Courses use course ids, with actual sessions fetched from `course-events`. Dates use the studio timezone.
- `src/utils/booking.js` centralizes account, booking, detail, and checkout links. Mana handles every account, booking, and payment action.
- PT session packs have no public API. The direct PT checkout link was verified from the studio integration guide on 2026-09-16. PT prices are deliberately shown only in Mana; recheck the guide when the service catalogue changes.
- API failures fall back to the official schedule/membership/credit iframes. The official resize script loads once in `index.html`. Direct links remain available if the API, iframe, or script is blocked.
- Studio-authored names and descriptions are displayed as returned by Mana, which may use English even when the website UI is Swedish.

## Rendering and deployment

`npm run build` builds the browser bundle, builds an isolated server rendering bundle in `.ssr/`, reads the current public Mana data, and pre-renders all five routes to `dist/*.html`. It also generates a sitemap and page-specific metadata. No server rendering code or secrets are included in `dist`.

Pre-rendered HTML contains a build-time snapshot for search engines and visitors without JavaScript. Interactive visitors refresh from Mana immediately; snapshots older than two minutes are removed while refreshing. A Mana outage does not block the marketing-page build: direct Mana links remain available. JavaScript-free visitors are directed to Mana for current prices and bookings.

Vercel's Git integration deploys branch previews and production from `master`. `vercel.json` maps existing routes to their pre-rendered files. Validate the branch preview before merging to production.

## References

- [Studio integration instructions](https://www.getmana.app/s/bonobogym/agents/integration.md)
- [Public OpenAPI specification](https://www.getmana.app/api/v1/openapi)
- [Embed and button guidance](https://help.getmana.app/en/articles/15343609-put-mana-on-your-website-embeds-and-buttons)
- [Reference schedule](https://crossfitsodermalm.se/schema) and [prices](https://crossfitsodermalm.se/priser)
- [Migration audit and validation](docs/mana-migration.md)
