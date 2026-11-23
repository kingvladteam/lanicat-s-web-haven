import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { BASE_URL, seoRoutes, type SeoRoute } from "./seo-routes";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceRequired(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) {
    throw new Error(`Не знайдено ${label} у dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

export function renderStaticPage(template: string, route: SeoRoute) {
  const url = `${BASE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let html = replaceRequired(template, /<title(?:\s[^>]*)?>[\s\S]*?<\/title>/i, `<title data-rh="true">${title}</title>`, "title");
  html = replaceRequired(html, /<meta\b[^>]*\bname="description"[^>]*>/i, `<meta data-rh="true" name="description" content="${description}" />`, "description");
  html = replaceRequired(html, /<meta\b[^>]*\bproperty="og:title"[^>]*>/i, `<meta data-rh="true" property="og:title" content="${title}" />`, "og:title");
  html = replaceRequired(html, /<meta\b[^>]*\bproperty="og:description"[^>]*>/i, `<meta data-rh="true" property="og:description" content="${description}" />`, "og:description");
  html = replaceRequired(html, /<meta\b[^>]*\bname="twitter:title"[^>]*>/i, `<meta data-rh="true" name="twitter:title" content="${title}" />`, "twitter:title");
  html = replaceRequired(html, /<meta\b[^>]*\bname="twitter:description"[^>]*>/i, `<meta data-rh="true" name="twitter:description" content="${description}" />`, "twitter:description");

  html = html
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\b[^>]*\bproperty="og:url"[^>]*>\s*/gi, "");

  const routeTags = [
    `<link data-rh="true" rel="canonical" href="${url}" />`,
    `<meta data-rh="true" property="og:url" content="${url}" />`,
  ];

  if (route.structuredData) {
    const json = JSON.stringify(route.structuredData).replaceAll("<", "\\u003c");
    routeTags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return html.replace("</head>", `    ${routeTags.join("\n    ")}\n  </head>`);
}

export function staticPagePath(distDir: string, path: string) {
  return path === "/" ? resolve(distDir, "index.html") : resolve(distDir, path.slice(1), "index.html");
}

export function generateStaticPages(distDir = resolve("dist")) {
  const template = readFileSync(resolve(distDir, "index.html"), "utf8");

  for (const route of seoRoutes) {
    const outputPath = staticPagePath(distDir, route.path);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, renderStaticPage(template, route));
  }

  console.log(`Статичні HTML-сторінки створено: ${seoRoutes.length}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  generateStaticPages();
}
