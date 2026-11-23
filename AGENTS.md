# Architecture rules

- Generate one static HTML document per public route after `vite build`, so direct route requests return 200 and crawlers receive route-specific metadata on static hosting.
- Keep sitemap entries and static-route metadata synchronized through the shared route definitions in `scripts/seo-routes.ts`.
