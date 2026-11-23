import test from "node:test";
import assert from "node:assert/strict";
import { uzbekAlphabet, normalizeUzbekSearch } from "../src/lib/uzbekAlphabet.ts";
import { compareSnapshots } from "../src/lib/institute/snapshotComparison.ts";

test("new Uzbek Latin changes only the four letters and retains identifiers",()=>{
  assert.equal(uzbekAlphabet("O‘quv, Gʻoya, Shahar, Chiroq, ma’lumot"),"Öquv, Ğoya, Şahar, Çiroq, ma’lumot");
  const mixed="Ish uchun https://example.uz/shahar share@institute.uz hisobot.xlsx SharePoint Is’hoq";
  assert.equal(uzbekAlphabet(mixed),"Iş uçun https://example.uz/shahar share@institute.uz hisobot.xlsx SharePoint Is’hoq");
  assert.equal(uzbekAlphabet("O‘ZBEKISTON, SHAHAR, CHIROQ"),"ÖZBEKISTON, ŞAHAR, ÇIROQ");
  assert.equal(normalizeUzbekSearch("Oʻqituvchi"),normalizeUzbekSearch("Öqituvçi"));
  assert.equal(uzbekAlphabet(uzbekAlphabet(mixed)),uzbekAlphabet(mixed));
});

test("HEMIS headcount comparison rejects mismatched populations and same-date corrections",()=>{
  const current={kind:"students",asOf:"2026-11-22",year:"2026-2027",total:3420};
  const earlier={...current,asOf:"2026-10-01",total:3400};
  assert.equal(compareSnapshots(current,earlier).change,20);
  for(const value of [null,current,{...earlier,year:"2025-2026"},{...earlier,kind:"staff"},{...earlier,total:7}]){
    assert.equal(compareSnapshots(current,value),null);
  }
});
