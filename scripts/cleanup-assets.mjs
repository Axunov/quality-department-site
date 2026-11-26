import { readFileSync, readdirSync, existsSync, statSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const replacements = JSON.parse(readFileSync(new URL("asset-replacements.json",import.meta.url),"utf8"));
const placeholders = ["file.svg","globe.svg","next.svg","vercel.svg","window.svg"].map(name=>"/"+name);
const toRemove = [...Object.keys(replacements),...placeholders];
const resolvePublic = path => new URL("public"+path,root);
const walk = url => readdirSync(url,{withFileTypes:true}).flatMap(entry=>{
  const path = new URL(entry.name+(entry.isDirectory()?"/":""),url);
  return entry.isDirectory()?walk(path):[path];
});
for(const next of Object.values(replacements)){
  const path=resolvePublic(next);
  if(!existsSync(path)||!statSync(path).isFile()||statSync(path).size===0)throw new Error("Missing replacement: "+next);
}
const refs=walk(new URL("src/",root)).filter(url=>/\.(tsx?|jsx?|css|json)$/.test(url.pathname));
for(const file of refs){
  const code=readFileSync(file,"utf8");
  for(const asset of toRemove)if(code.includes(asset))throw new Error(fileURLToPath(file)+" still references "+asset);
}
let files=0,bytes=0;
for(const asset of toRemove){
  const path=resolvePublic(asset);
  if(!existsSync(path))continue;
  bytes+=statSync(path).size;
  unlinkSync(path);files++;
}
console.log(`Removed ${files} obsolete assets (${bytes} bytes).`);
