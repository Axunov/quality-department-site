import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
const read=(path)=>readFile(new URL(`../${path}`,import.meta.url),"utf8");
test("admin pages and APIs require Supabase AAL2 MFA",async()=>{const[proxy,helper,mfa,events]=await Promise.all([read("src/lib/supabase/proxy.ts"),read("src/lib/adminSecurity.ts"),read("src/components/admin/AdminMfa.tsx"),read("src/app/api/admin/security-events/route.ts")]);assert.match(proxy,/currentLevel === "aal2"/);assert.match(proxy,/mfaPath = `\$\{adminPrefix\}\/mfa`/);assert.match(helper,/assurance\?\.currentLevel !== "aal2"/);assert.match(mfa,/mfa\.enroll/);assert.match(mfa,/mfa\.challenge/);assert.match(mfa,/mfa\.verify/);assert.match(mfa,/setRetryKey\(value => value \+ 1\)/);assert.match(mfa,/role="alert"/);assert.match(events,/requireAdminMfa/);assert.match(events,/ip_hash: `\$\{row\.ip_hash\.slice\(0, 10\)\}…`/);});
