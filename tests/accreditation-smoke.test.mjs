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
