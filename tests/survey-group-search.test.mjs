import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import test from "node:test";

const { outputText } = ts.transpileModule(readFileSync("src/lib/surveyGroupSearch.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { studyMode, matchesSurveyGroup } = await import("data:text/javascript," + encodeURIComponent(outputText));

test("group search handles Cyrillic names, mixed scripts, and the official study mode abbreviations", () => {
  for (const name of ["1-22 ТМ (з)", "БТМ-22 (заочное)", "IPM-22 (sirtqi)"]) assert.equal(studyMode(name), "part");
  assert.equal(studyMode("2-25 АВТ (очное)"), "full");
  assert.equal(studyMode("25 ТМ (дистанционно)"), "distance");
  assert.equal(studyMode("1-25 ТМ"), "other");
  assert.ok(matchesSurveyGroup("1–22 ТМ (заочное)", "1-22 tm"));
  assert.ok(matchesSurveyGroup("15-25 IP (очное)", "15-25 ИП"));
  assert.ok(!matchesSurveyGroup("1–22 ТМ", "2-22"));
});
