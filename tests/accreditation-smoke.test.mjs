import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read=(path)=>readFile(new URL(`../${path}`,import.meta.url),"utf8");

test("registration supports employee and director roles",async()=>{
  const [positions,admin]=await Promise.all([read("src/lib/accreditation/positions.ts"),read("src/components/accreditation/AdminAccreditation.tsx")]);
  assert.match(positions,/director/);assert.match(positions,/department_head/);assert.match(admin,/positionKey/);
});
test("login and protected role routing are present",async()=>{
  const [login,director]=await Promise.all([read("src/components/accreditation/AccreditationLogin.tsx"),read("src/components/accreditation/DirectorDashboard.tsx")]);
  assert.match(login,/signInWithPassword/);assert.match(director,/p\.role!=="director"/);
});
test("document upload is private and versioned",async()=>{
  const monitor=await read("src/components/accreditation/ComplexIndicatorMonitor.tsx");
  assert.match(monitor,/accreditation-v3-evidence/);assert.match(monitor,/version/);assert.match(monitor,/createSignedUrl/);
});
test("V6 provides operations requested by accreditation workflow",async()=>{
  const sql=await read("supabase/ACCREDITATION_V6_OPERATIONS_AND_RISK.sql");
  for(const name of ["notifications","audit_log","bulk_assign","set_deadlines","risk","create_snapshot","health"])assert.match(sql,new RegExp(`accreditation_v6_${name}`));
});
