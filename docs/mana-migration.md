# Mana migration audit — 2026-09-16

## Findings and changes

| Previous behavior | Replacement |
| --- | --- |
| External booking/shop URLs spread across components and translations | Central studio-specific Mana links; all historical booking-provider URLs removed from published source and assets |
| Hardcoded weekly timetable | Live class occurrences plus actual course sessions, sorted by time, displayed in Europe/Stockholm, with class filtering and deep links |
| Manually maintained membership and credit prices | Native cards from public Mana endpoints, with separate detail and checkout actions |
| Fixed introductory offer and discount promise | Live trial offers with offer-specific checkout or schedule links |
| Static membership freeze, refund, and cancellation claims | Public Mana FAQ plus links to Mana's current terms |
| Old dated announcements and unsupported catalogue entries | Removed; live class and course catalogues supply current offerings |
| Missing account navigation | Persistent My account entry on desktop and mobile; booking-management link beside schedule |
| Fixed opening times in footer | Link to current live schedule |
| Empty client-only HTML | Pre-rendered routes, page metadata, canonical URLs, sitemap, and client-side live refresh |

API requests are public, read-only, and credential-free. The site does not create accounts, book classes, or take payments. Checkout completion is handled by Mana.

## Validation

- Automated tests cover public request headers, pagination, class/course session aggregation and date filtering, currency minor units, detail/checkout URLs, live refresh and failure fallback, unavailable trial offers, mobile navigation and language switching, trusted iframe readiness, timezone display, class filtering, and full-class behavior.
- Production build pre-renders home, classes, membership, about, and contact successfully.
- Browser layout sweep: all five routes at 320, 390, 768, and 1440 pixels, in English and Swedish. No horizontal overflow; exactly one main heading per page; no old booking-provider links.
- A Swedish hydration mismatch found during the sweep was fixed by restoring the language preference after the pre-rendered content hydrates. The final sweep has no page errors.
- Browser checks include persistent language choice, keyboard Escape, mobile menus, course filtering, no-JavaScript prices/schedule, and API/iframe failure paths.
- Membership checkout was opened as an anonymous visitor and showed the correct Bonobo Gold item and current price. No account or payment was submitted.
- During local outage simulation, the upstream iframe could remain on its own loading screen. After 15 seconds the website collapses it and retains a clear direct-Mana link; no stale website prices remain.
- Axe accessibility checks (WCAG 2 A/AA and 2.1 AA tags) report zero detected violations on all five routes after fixing footer and testimonial contrast.
- Updated React Router to a patched release; the production dependency audit reports zero known vulnerabilities.
- Visual evidence is saved locally under `output/playwright/` (excluded from Git).

## Upstream content observations

Mana remains authoritative. Do not override its data with website translations:

- The 10-visit credit bundle description says three months, while Mana's hosted bundle summary says one month. Confirm the intended validity in Mana Admin.
- The public booking FAQ says a 10-hour cancellation cutoff; the studio's hosted terms page says 12 hours. Resolve this within Mana.
- Some studio-authored catalogue descriptions are currently English in both locales. Translate them in Mana if desired.

## Operational limits

Public API schemas are early access. If an endpoint fails, visitors retain direct access to Mana; schedule and pricing also have official iframe fallbacks. Browser reads refresh each minute, so availability must always be confirmed in Mana at booking time.

Pre-rendered content is a build-time snapshot. Live browser data is refreshed immediately. For JavaScript-free visits, the page links directly to Mana for current data. PT service prices are not duplicated because Mana currently has no public session-pack endpoint.
