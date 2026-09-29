import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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
  assert.match(notices, /ADMIN_TELEGRAM_BOT_TOKEN/);
  assert.match(notices, /RESEND_API_KEY/);
  assert.match(notices, /Promise\.allSettled/);
});
