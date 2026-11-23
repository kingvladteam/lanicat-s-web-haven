import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { BASE_URL, seoRoutes } from "./seo-routes";

function generateSitemap() {
  const urls = seoRoutes.map((route) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${route.path}</loc>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      "  </url>",
    ].join("\n"),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap());
console.log(`sitemap.xml written (${seoRoutes.length} entries)`);
