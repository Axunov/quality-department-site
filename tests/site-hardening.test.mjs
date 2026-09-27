import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("production browser output and privileged routes are hardened", async () => {
  const [config, proxy, adminSecurity, adminClient] = await Promise.all([
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/supabase/proxy.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/adminSecurity.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/supabase/admin.ts", import.meta.url), "utf8"),
  ]);

  assert.match(config, /productionBrowserSourceMaps:\s*false/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /X-Frame-Options", value: "DENY/);
  assert.match(config, /source: "\/api\/admin\/:path\*"/);
  assert.match(config, /private, no-store/);
  assert.match(proxy, /currentLevel === "aal2"/);
  assert.match(proxy, /app_metadata\?\.role === "admin"/);
  assert.match(adminSecurity, /currentLevel !== "aal2"/);
  assert.match(adminClient, /import "server-only"/);
  assert.doesNotMatch(adminClient, /NEXT_PUBLIC_SUPABASE_SERVICE/);
});
