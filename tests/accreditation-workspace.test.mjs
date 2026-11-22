import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import test from "node:test";

function compile(file, resolve = () => { throw new Error("Unexpected import"); }) {
  const { outputText } = ts.transpileModule(readFileSync(file,"utf8"), { compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022} });
  const mod = {exports:{}};
  new Function("require","module","exports",outputText)(resolve,mod,mod.exports);
  return mod.exports;
}

const programmes = compile("src/lib/accreditation/specialData.ts");
const { indicatorHref, registryHref, registryQuery, deadlineFilter, statusFilter, deadlineMatches } = compile("src/lib/accreditation/workspace.ts", name => {
  assert.equal(name,"./specialData");
  return programmes;
});

test("accreditation links retain project and indicator scope without exposing assignees", () => {
  assert.equal(indicatorHref("complex","1.1.1"),"/accreditation/complex?indicator=1.1.1#indicator-registry");
  assert.equal(indicatorHref("special-biomedical-instrumentation","1.1.1"),"/accreditation/special?program=biomedical-instrumentation&indicator=1.1.1#indicator-registry");
  assert.equal(registryHref("special-software-engineering",{ status:"revision",deadline:"overdue" }),"/accreditation/special?program=software-engineering&status=revision&deadline=overdue#indicator-registry");
  assert.equal(indicatorHref("unrecognized","1.1.1"),null);
  assert.equal(indicatorHref("complex"," "),null);
  assert.equal(registryQuery(["1.1.1","2.2.2"]),"");
  assert.equal(statusFilter("revision"),"revision");
  assert.equal(statusFilter(["revision"]),"all");
  assert.equal(deadlineFilter("garbage"),"all");
});

test("deadline filters use the Tashkent date and exclude approved indicators from pending work", () => {
  const now = new Date("2026-11-22T19:30:00Z"); // November 23 in Tashkent.
  const task = (date,status="revision")=>({status,due_date:date});
  assert.ok(deadlineMatches("overdue",task("2026-11-22"),now));
  assert.ok(!deadlineMatches("overdue",task("2026-11-23"),now));
  assert.ok(deadlineMatches("soon",task("2026-11-23"),now));
  assert.ok(deadlineMatches("soon",task("2026-11-30"),now));
  assert.ok(!deadlineMatches("soon",task("2026-12-01"),now));
  assert.ok(!deadlineMatches("overdue",task("2026-11-20","approved"),now));
  assert.ok(deadlineMatches("none",task(null),now));
  assert.ok(!deadlineMatches("none",task(null,"approved"),now));
  assert.ok(!deadlineMatches("none",undefined,now));
});
