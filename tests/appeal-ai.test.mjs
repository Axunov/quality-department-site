import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, deps = {}, globals = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  vm.runInNewContext(source, { exports, require: name => deps[name], AbortSignal, TextEncoder, ...globals });
  return exports;
}

const origin = "https://qualitydepartment.netlify.app";
const appealId = "9f7bd2f3-32e4-4f70-9f3a-4fa80b17f0da";
const help = load("src/lib/appealHelp.ts");
const draft = load("src/lib/appealDraft.ts", { "./appealHelp": help });
const response = (text) => ({ status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(text) }] }] });
function setup(options = {}) {
  const calls = [];
  const reservations = [];
  const admin = { from: () => ({
    select: () => ({ eq: () => ({ eq: () => ({ gte: async () => ({ count: options.count ?? 0 }) }) }) }),
    insert: async (rows) => { reservations.push(...rows); return { error: options.ledgerError }; },
  }) };
  const db = { from: () => ({ select: (cols) => {
    assert.equal(cols, "category,status");
    return { eq: () => ({ maybeSingle: async () => ({ data: { category: options.category ?? "technical", status: options.status ?? "submitted", body: "private case text" } }) }) };
  } }) };
  const route = load("src/app/api/admin/appeal-draft/route.ts", {
    "next/server": { NextResponse: { json: (body, opt) => ({ body, ...opt }) } },
    "@/lib/adminSecurity": { requireAdminMfa: async () => options.denied ? null : { user: { id: "private-admin-id" }, supabase: db } },
    "@/lib/supabase/admin": { createAdminClient: () => admin },
    "@/lib/appealHelp": help, "@/lib/appealDraft": draft,
    "@/lib/studentSecurity": { hashClientIp: () => "a".repeat(64) },
  }, { process: { env: { APPEALS_OPENAI_API_KEY: options.noKey ? undefined : "test-only" } },
    fetch: async (url, args) => { calls.push([url, args]); return { ok: !options.providerFailure, json: async () => options.providerBody ?? response({ draft: "Please clarify which screen showed the problem.", source_ids: ["technical"] }) }; },
  });
  return { calls, reservations, run: (fields = { appealId, locale: "en" }, requestOrigin = origin) => {
    const raw = JSON.stringify(fields);
    return route.POST({ nextUrl: { origin }, text: async () => raw, headers: new Headers({ origin: requestOrigin, "content-length": String(Buffer.byteLength(raw)) }) });
  } };
}

test("only the static FAQ and template reach the provider", async () => {
  const app = setup();
  const result = await app.run();
  assert.equal(result.status, 200);
  assert.equal(result.headers["Cache-Control"], "private, no-store");
  assert.equal(app.calls.length, 1);
  assert.equal(app.reservations.length, 2);
  const [url, request] = app.calls[0];
  assert.equal(url, "https://api.openai.com/v1/responses");
  assert.doesNotMatch(request.body, new RegExp(appealId + "|private case text|private-admin-id"));
  const { store, input, max_output_tokens: cap } = JSON.parse(request.body);
  assert.equal(store, false);
  assert.equal(cap, 450);
  const context = JSON.parse(input);
  assert.deepEqual(Object.keys(context), ["topic", "language", "template", "sources"]);
  assert.equal(context.language, "English");
  assert.equal(context.topic, "technical");
});

test("unauthorized, malformed, closed and sensitive cases never call the provider", async () => {
  for (const [options, fields, requestOrigin, expected] of [
    [{ denied: true }, undefined, origin, 403],
    [{}, undefined, "https://other.example", 403],
    [{}, { appealId, locale: "ru", text: "private" }, origin, 400],
    [{ category: "integrity" }, undefined, origin, 422],
    [{ status: "completed" }, undefined, origin, 422],
    [{ noKey: true }, undefined, origin, 503],
    [{ count: 1000 }, undefined, origin, 429],
    [{ ledgerError: true }, undefined, origin, 503],
  ]) {
    const app = setup(options);
    assert.equal((await app.run(fields, requestOrigin)).status, expected);
    assert.equal(app.calls.length, 0);
  }
});

test("refusal, unrelated sources, links and provider errors cannot produce an editable draft", async () => {
  for (const body of [
    { status: "completed", output: [{ type: "message", content: [{ type: "refusal" }] }] },
    response({ draft: "Use an unrelated support source here.", source_ids: ["contacts"] }),
    response({ draft: "Visit https://untrusted.example now.", source_ids: ["technical"] }),
  ]) {
    const result = await setup({ providerBody: body }).run();
    assert.equal(result.status, 422);
    assert.equal(result.body.draft, undefined);
  }
  assert.equal((await setup({ providerFailure: true }).run()).status, 502);
});
