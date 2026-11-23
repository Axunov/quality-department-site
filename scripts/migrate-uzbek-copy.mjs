// Converts only the Uzbek branch of localized source. Never rewrites route,
// API or database identifiers, import column mappings, or stored content.
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import { uzbekAlphabet } from "../src/lib/uzbekAlphabet.ts";

const safeLabel = (s) => !/^[\s]*[\/#@]|^(?:https?:|mailto:|tel:)|[<>{}]/.test(s);
const copyKey = /^(?:uz|title_uz|name_uz|label_uz|description_uz|body_uz|text_uz)$/;
const internalKey = /^(?:id|key|code|slug|href|url|path|image|src|className|locale|lang|value|type|download|target|role|rel|crossOrigin)$/;
const extraFiles = new Set(["src/lib/accreditation/complexDataUz.ts"]);
const roots = ["src/app", "src/components", "src/data", "src/lib/accreditation", "src/lib/institute/copy.ts", "src/lib/institute/programmeNames.json", "src/lib/studentAppealI18n.ts", "src/lib/surveyI18n.ts", "src/lib/surveyMonitoring.ts", "src/lib/newsMediaCopy.ts", "messages/uz.json"];
function walk(dir) {
  const s = fs.statSync(dir);
  return s.isDirectory() ? fs.readdirSync(dir).flatMap(f => walk(path.join(dir,f))) : [dir];
}
const nameOf = (node) => node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : "";
const localeOperand = (node) => ts.isIdentifier(node) && /^(locale|l|lang|current|language|currentLocale)$/.test(node.text);
for (const file of roots.flatMap(walk)) {
  if (file.startsWith("src/app/api/") || !/\.(tsx?|json)$/.test(file)) continue;
  const raw = fs.readFileSync(file, "utf8");
  const input = ts.createSourceFile(file, raw, ts.ScriptTarget.Latest, true);
  const edits = [];
  const add = (s,e,old,render) => {
    const next = safeLabel(old) ? uzbekAlphabet(old) : old;
    if (old !== next) edits.push([s,e,render(next)]);
  };
  function visit(node, active = false) {
    if (ts.isPropertyAssignment(node)) {
      const name = nameOf(node.name);
      visit(node.initializer, copyKey.test(name) || (active && !internalKey.test(name)));
      return;
    }
    if (ts.isJsxAttribute(node)) {
      if (node.initializer && !internalKey.test(nameOf(node.name)) && !nameOf(node.name).startsWith("data-")) visit(node.initializer, active);
      return;
    }
    if (ts.isConditionalExpression(node)) {
      const c = node.condition;
      const condition = ts.isBinaryExpression(c) &&
        ((localeOperand(c.left) && ts.isStringLiteral(c.right) && c.right.text === "uz") ||
         (localeOperand(c.right) && ts.isStringLiteral(c.left) && c.left.text === "uz"));
      if (condition && [ts.SyntaxKind.EqualsEqualsEqualsToken,ts.SyntaxKind.EqualsEqualsToken].includes(c.operatorToken.kind)) {
        visit(node.whenTrue,true); visit(node.whenFalse,active); return;
      }
      ts.forEachChild(node,n=>visit(n,active));
      return;
    }
    if (active && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) {
      const quote=raw[node.getStart(input)];
      if (quote !== "`") add(node.getStart(input),node.end,node.text,s=>JSON.stringify(s));
      else add(node.getStart(input)+1,node.end-1,raw.slice(node.getStart(input)+1,node.end-1),s=>s);
      return;
    }
    if (ts.isTemplateExpression(node)) {
      if (active) {
        for (const fragment of [node.head,...node.templateSpans.map(x=>x.literal)]) {
          const s=fragment.getStart(input)+1,e=fragment.end-(fragment.kind===ts.SyntaxKind.TemplateTail?1:2);
          add(s,e,raw.slice(s,e),v=>v);
        }
      }
      for (const span of node.templateSpans) visit(span.expression,false);
      return;
    }
    if (active && ts.isJsxText(node)) {add(node.pos,node.end,node.getFullText(input),s=>s);return;}
    if (ts.isCallExpression(node) || ts.isBinaryExpression(node)) active=false;
    ts.forEachChild(node, child => visit(child,active));
  }
  if (file === "messages/uz.json") {
    const map = (v) => typeof v === "string" ? (safeLabel(v) ? uzbekAlphabet(v) : v)
      : Array.isArray(v) ? v.map(map)
      : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k,item])=>[k,map(item)]))
      : v;
    const next = JSON.stringify(map(JSON.parse(raw)),null,2) + "\n";
    if (raw !== next) fs.writeFileSync(file,next);
    continue;
  }
  visit(input,extraFiles.has(file));
  let next=raw;
  for (const [s,e,v] of edits.sort((a,b)=>b[0]-a[0])) next=next.slice(0,s)+v+next.slice(e);
  if (next!==raw) fs.writeFileSync(file,next);
}
