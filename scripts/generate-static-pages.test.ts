import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { generateStaticPages, renderStaticPage, staticPagePath } from "./generate-static-pages";
import { seoRoutes } from "./seo-routes";

const template = readFileSync(resolve("index.html"), "utf8");

test("кожна публічна сторінка отримує власний HTML-файл", () => {
  assert.deepEqual(seoRoutes.map((route) => route.path), [
    "/",
    "/about",
    "/premium",
    "/faq",
    "/documentation",
    "/embed",
    "/privacy",
    "/terms",
  ]);
  assert.equal(staticPagePath("/site", "/about"), resolve("/site/about/index.html"));
});

test("сторінка «Про бота» прямо пов’язує Lanicat із kingvlad", () => {
  const about = seoRoutes.find((route) => route.path === "/about");
  assert.ok(about);
  const html = renderStaticPage(template, about);

  assert.match(html, /<title[^>]*>Про Lanicat — Український Discord-бот від kingvlad<\/title>/);
  assert.match(html, /content="[^"]*створеного розробником kingvlad[^"]*"/);
  assert.match(html, /rel="canonical" href="https:\/\/lanicat\.pp\.ua\/about"/);
  assert.match(html, /"@type":"AboutPage"/);
  assert.match(html, /"mainEntity":\{"@id":"https:\/\/lanicat\.pp\.ua\/#software"\}/);
});

test("генератор створює HTML-файли для всіх восьми публічних адрес", () => {
  const distDir = mkdtempSync(join(tmpdir(), "lanicat-static-"));
  writeFileSync(join(distDir, "index.html"), template);

  generateStaticPages(distDir);

  for (const route of seoRoutes) {
    const html = readFileSync(staticPagePath(distDir, route.path), "utf8");
    assert.match(html, new RegExp(`rel="canonical" href="https://lanicat\\.pp\\.ua${route.path === "/" ? "/" : route.path}"`));
  }
});
