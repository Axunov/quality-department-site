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
test("V6.1 closes anonymous administration and schedules reminders",async()=>{
  const sql=await read("supabase/ACCREDITATION_V6_1_SECURITY_REMINDERS.sql");
  assert.match(sql,/revoke execute[\s\S]+from public, anon/i);
  assert.match(sql,/accreditation_v61_deadline_reminders/);
  assert.match(sql,/accreditation-v61-deadline-reminders/);
  assert.match(sql,/enable row level security/);
});
test("employee, director and admin convenience surfaces are present",async()=>{
  const [head,director,admin,notifications]=await Promise.all([
    read("src/components/accreditation/HeadCabinet.tsx"),read("src/components/accreditation/DirectorOperations.tsx"),read("src/components/accreditation/AdminAccreditation.tsx"),read("src/components/accreditation/NotificationCenter.tsx")
  ]);
  assert.match(head,/Мои индикаторы/);assert.match(head,/Просрочено/);
  assert.match(director,/Зона риска/);assert.match(director,/Резервные снимки/);
  assert.match(admin,/setTab/);assert.match(admin,/BulkAssignment/);
  assert.match(notifications,/Открыть индикатор/);
});
test("new control matrix, priority queue and saved response checklist are wired",async()=>{
  const [matrix,queue,assistant,admin,director,head,complex,special]=await Promise.all([
    read("src/components/accreditation/AccreditationControlCenter.tsx"),read("src/components/accreditation/MyPriorityQueue.tsx"),read("src/components/accreditation/EmployeeEvidenceAssistant.tsx"),read("src/components/accreditation/AdminAccreditation.tsx"),read("src/components/accreditation/DirectorDashboard.tsx"),read("src/components/accreditation/HeadCabinet.tsx"),read("src/components/accreditation/ComplexIndicatorMonitor.tsx"),read("src/components/accreditation/SpecialIndicatorMonitor.tsx")
  ]);
  assert.match(matrix,/accreditation_v6_risk/);assert.match(matrix,/Прогноз готовности/);
  assert.match(queue,/Что сделать в первую очередь/);assert.match(queue,/scope=mine/);
  assert.match(assistant,/localStorage/);assert.match(assistant,/Проверка готовности ответа/);
  assert.match(admin,/AccreditationControlCenter/);assert.match(director,/AccreditationControlCenter/);
  assert.match(head,/MyPriorityQueue/);assert.match(complex,/EmployeeEvidenceAssistant/);assert.match(special,/EmployeeEvidenceAssistant/);
});
test("V7 collaboration, safe file deletion, Excel control and director trends are wired",async()=>{
  const [sql,bulk,collab,director,complex,special]=await Promise.all([
    read("supabase/ACCREDITATION_V7_COLLABORATION_AND_FILES.sql"),read("src/components/accreditation/BulkAssignment.tsx"),read("src/components/accreditation/IndicatorCollaboration.tsx"),read("src/components/accreditation/DirectorV7Insights.tsx"),read("src/components/accreditation/ComplexIndicatorMonitor.tsx"),read("src/components/accreditation/SpecialIndicatorMonitor.tsx")
  ]);
  assert.match(sql,/enable row level security/g);assert.match(sql,/revoke all[\s\S]+from anon/i);assert.match(sql,/v7 delete own draft document/);
  assert.match(bulk,/sheet_to_json/);assert.match(bulk,/Предварительная проверка/);assert.match(bulk,/unknownCode/);
  assert.match(collab,/accreditation_v7_comments/);assert.match(collab,/accreditation_v7_tasks/);assert.match(collab,/complete_task/);
  assert.match(director,/Режим презентации/);assert.match(director,/previousProgress/);
  assert.match(complex,/multiple accept/);assert.match(special,/multiple accept/);assert.match(complex,/removeDoc/);
});
test("V7.1 provides localized username access without weakening anonymous security",async()=>{
  const [sql,login,route,gate,accounts,labels]=await Promise.all([
    read("supabase/ACCREDITATION_V7_1_USERNAME_ACCESS.sql"),read("src/components/accreditation/AccreditationLogin.tsx"),read("src/app/api/admin/accreditation/users/route.ts"),read("src/components/accreditation/PasswordChangeGate.tsx"),read("src/components/accreditation/EmployeeAccountImport.tsx"),read("src/lib/accreditation/localization.ts")
  ]);
  assert.match(sql,/username text/);assert.match(sql,/must_change_password/);assert.match(sql,/revoke all[\s\S]+from public,anon/i);
  assert.match(login,/internalEmail/);assert.match(login,/Логин или электронная почта/);assert.match(login,/accreditation_v71_mark_login/);
  assert.match(route,/normalizeUsername/);assert.match(route,/must_change_password:\s*true/);assert.match(route,/internalEmail/);
  assert.match(gate,/updateUser/);assert.match(gate,/accreditation_v71_mark_password_changed/);
  assert.match(accounts,/sheet_to_json/);assert.match(accounts,/temporary_password/);assert.match(accounts,/Предварительная проверка/);
  for(const helper of ["projectLabel","statusLabel","priorityLabel","responsibleLabel","positionKeyLabel"])assert.match(labels,new RegExp(helper));
});
test("V7.2 self-registration requires approval and excludes director role",async()=>{
  const [login,route,sql]=await Promise.all([read("src/components/accreditation/AccreditationLogin.tsx"),read("src/app/api/accreditation/register/route.ts"),read("supabase/ACCREDITATION_V7_2_REGISTRATION_AND_PROJECT_ACCESS.sql")]);
  assert.match(login,/\/api\/accreditation\/register/);assert.match(login,/x\.key!=="director"/);assert.match(login,/approval_status/);assert.match(login,/Повторите пароль/);
  assert.match(route,/filter\(x=>x\.key!=="director"\)/);assert.match(route,/approval_status:"pending"/);assert.match(route,/rate_limited/);assert.match(route,/email_confirm:true/);
  assert.match(sql,/enable row level security/);assert.match(sql,/revoke all[\s\S]+from public,anon,authenticated/i);assert.match(sql,/user_project_access/);assert.match(sql,/join public\.accreditation_v3_indicators i on i\.responsible_user_id=p\.user_id/);
});
test("V7.2 keeps accreditation projects isolated in dashboards and storage",async()=>{
  const [admin,director,control,operations,bulk,complex,special]=await Promise.all([read("src/components/accreditation/AdminAccreditation.tsx"),read("src/components/accreditation/DirectorDashboard.tsx"),read("src/components/accreditation/AccreditationControlCenter.tsx"),read("src/components/accreditation/DirectorOperations.tsx"),read("src/components/accreditation/BulkAssignment.tsx"),read("src/components/accreditation/ComplexIndicatorMonitor.tsx"),read("src/components/accreditation/SpecialIndicatorMonitor.tsx")]);
  for(const source of [admin,director,control,operations,bulk])assert.match(source,/projectCode|scope/);
  assert.match(complex,/\$\{userId\}\/complex\/\$\{st\.id\}/);assert.match(special,/\$\{userId\}\/\$\{projectCode\}\/\$\{st\.id\}/);
});
test("all 272 complex indicators have matching RU UZ and EN records",async()=>{
  const files=await Promise.all([read("src/lib/accreditation/complexData.ts"),read("src/lib/accreditation/complexDataUz.ts"),read("src/lib/accreditation/complexDataEn.ts")]);
  const codes=files.map(source=>[...source.matchAll(/"code":\s*"([^"]+)"/g)].map(x=>x[1]));
  assert.equal(codes[0].length,272);assert.deepEqual(codes[1],codes[0]);assert.deepEqual(codes[2],codes[0]);
  for(const source of files)for(const field of ["chapter","criterion","indicator","evidence","responsible"])assert.equal((source.match(new RegExp(`"${field}":`,"g"))||[]).length,272);
});
