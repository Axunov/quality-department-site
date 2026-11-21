import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = fs.readFileSync(new URL("../src/app/api/admin/translate/route.ts", import.meta.url), "utf8");
const javascript = ts.transpileModule(source, { compilerOptions: {
  target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true,
} }).outputText;

function route({ admin = true, key, fetcher = async () => { throw new Error("unexpected fetch"); } } = {}) {
  const exports = {};
  const localRequire = name => {
    if (name === "next/server") return { NextResponse: { json: (body, init) => ({ body, ...init }) } };
    if (name === "@/lib/adminSecurity") return { requireAdminMfa: async () => admin };
    return require(name);
  };
  new Function("require", "exports", "process", "fetch", javascript)(localRequire, exports, { env: { GOOGLE_CLOUD_TRANSLATION_API_KEY: key } }, fetcher);
  return (body, origin = "https://site.example") => exports.POST({
    headers: new Headers({ origin }), nextUrl: new URL("https://site.example/api/admin/translate"),
    text: async () => JSON.stringify(body),
  });
}

test("translation requires admin MFA and same origin; no key leaves manual entry available", async () => {
  const body = { source: "uz", title: "Sarlavha", content: "Matn", format: "text" };
  assert.equal((await route({admin:false})(body)).status, 403);
  assert.equal((await route()(body, "https://other.example")).status, 403);
  assert.equal((await route()(body)).body.error, "unconfigured");
});

test("translation sends only editorial text to two targets and sanitizes HTML", async () => {
  const calls = [];
  const post = route({ key: "example", fetcher: async (url, request) => {
    calls.push([url, JSON.parse(request.body)]);
    const value = JSON.parse(request.body);
    return { ok: true, json: async () => ({data:{ translations:[{translatedText: value.format === "html" ? "<p><strong>Translated</strong><script>unsafe()</script></p>" : value.target}] }}) };
  }});
  const result = await post({source:"uz",title:"Sarlavha",content:"<p>Matn<script>unsafe()</script></p>",format:"html",file:"private.pdf"});
  assert.equal(result.status, 200);
  assert.deepEqual(Object.keys(result.body.translations), ["ru", "en"]);
  assert.equal(result.body.translations.ru.content, "<p><strong>Translated</strong></p>");
  assert.equal(calls.length, 4);
  assert.ok(calls.every(([url, value]) => url === "https://translation.googleapis.com/language/translate/v2" && value.source === "uz"));
  assert.doesNotMatch(JSON.stringify(calls), /private\.pdf|unsafe\(\)/);
});
