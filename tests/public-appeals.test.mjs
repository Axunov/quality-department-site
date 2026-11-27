import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readAppealContact } from "../src/lib/appealContact.ts";
import { appealHelp, appealReplyTemplates, allowsAppealTemplates } from "../src/lib/appealHelp.ts";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("public appeals replace the Telegram intake link", () => {
  const page = read("src/app/[locale]/appeals/page.tsx");
  const form = read("src/components/student/PublicAppealForm.tsx");
  assert.match(page, /PublicAppealForm/);
  assert.doesNotMatch(page, /t\.me|murojaatbot/);
  assert.match(form, /Код отслеживания/);
  assert.match(form, /Отправить анонимно/);
});

test("public appeal API is server validated and abuse protected", () => {
  const api = read("src/app/api/public-appeals/route.ts");
  assert.match(api, /verifyTurnstile/);
  assert.match(api, /rate_limited/);
  assert.match(api, /tracking_hash/);
  assert.match(api, /createAdminClient/);
  assert.match(api, /Cache-Control.*no-store/s);
});

test("appeal monitoring requires administrator MFA", () => {
  const api = read("src/app/api/admin/appeal-notifications/route.ts");
  const layout = read("src/app/[locale]/admin/layout.tsx");
  assert.match(api, /requireAdminMfa/);
  assert.match(api, /admin_seen_at/);
  assert.match(layout, /appeal-notifications/);
});

test("public appeal tables stay private and notifications are optional", () => {
  const sql = read("supabase/20260929_PUBLIC_STUDENT_APPEALS.sql");
  const notices = read("src/lib/adminAppealNotifications.ts");
  assert.match(sql, /revoke all on public\.student_appeals.*from anon/s);
  assert.match(sql, /access_code_id drop not null/);
  assert.match(notices, /RESEND_API_KEY/);
  assert.doesNotMatch(notices, /api\.telegram\.org|appeal\.(?:subject|name|group|number)|trackingCode/);
  assert.match(read("src/app/api/public-appeals/route.ts"), /await notifyAdminAboutAppeal\(\)/);
});

test("an anonymous submission cannot inject contact data into dedicated fields", () => {
  const payload = new FormData();
  const fields = {name:"Test Person",group:"Test group",contactType:"email",contactValue:"test@example.test"};
  Object.entries(fields).forEach(([key, value]) => payload.set(key, value));
  payload.set("anonymous", "false");
  assert.deepEqual(readAppealContact(payload), {anonymous:false,...fields});
  payload.set("anonymous", "true");
  assert.deepEqual(readAppealContact(payload), {anonymous:true,name:"",group:"",contactType:"",contactValue:""});
});

test("the pilot offers drafts only on routine, open appeals", () => {
  for (const item of appealReplyTemplates) {
    assert.equal(allowsAppealTemplates(item.id, "in_review"), true);
    assert.equal(allowsAppealTemplates(item.id, "completed"), false);
  }
  for (const topic of ["integrity", "teacher", "assessment", "other", undefined]) {
    assert.equal(allowsAppealTemplates(topic, "in_review"), false);
  }
});

test("the same published guidance is available in each pilot language", () => {
  assert.equal(new Set(appealHelp.map((item) => item.id)).size, appealHelp.length);
  assert.ok(appealHelp.length >= 15);
  for (const language of ["ru", "uz", "en"]) {
    assert.ok(appealHelp.every((item) => item.question[language] && item.answer[language]));
    assert.ok(appealReplyTemplates.every((item) => item.title[language] && item.body[language]));
  }
});
