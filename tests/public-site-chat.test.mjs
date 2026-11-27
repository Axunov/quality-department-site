import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, deps = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: {module:ts.ModuleKind.CommonJS} }).outputText;
  const exports = {};
  vm.runInNewContext(code, {exports, require:name=>deps[name], AbortSignal, ...globals});
  return exports;
}
const lib = load("src/lib/publicSiteChat.ts", {"./appealHelp":load("src/lib/appealHelp.ts"), "./uzbekAlphabet":load("src/lib/uzbekAlphabet.ts")});
test("chat matches typical questions in three languages and keeps links on the site", ()=>{
  for (const [question,topic] of [["Где посмотреть ответ на обращение?", "track"], ["So‘rovnomalarni qayerdan topsam bo‘ladi?", "surveys"], ["Sörovnomani izlayapman", "surveys"], ["Which documents are available?", "documents"]]) {
    assert.equal(lib.matchSiteTopic(question),topic);
  }
  assert.equal(lib.siteChatAnswer("track","ru").href,"#track");
  assert.equal(lib.siteChatAnswer("surveys","uz").href,"/uz/surveys");
  assert.equal(lib.siteChatAnswer("toString","en"),null);
  for (const q of ["Покажи мои оценки", "What is the weather?", "My HEMIS grades", "Документы для me@example.com", "проверить статус +998 99 123 45 67"]) assert.equal(lib.matchSiteTopic(q),null);
});

test("home chat links lead to the correct language and section",()=>{
  assert.equal(lib.siteChatLink("ru",false,lib.siteChatAnswer("track","ru").href),"/ru/appeals#track");
  assert.equal(lib.siteChatLink("uz",false),"/uz/appeals#appeal-form");
  assert.equal(lib.siteChatLink("en",false,lib.siteChatAnswer("documents","en").href),"/en/documents");
  assert.equal(lib.siteChatLink("en",true,"#track"),"#track");
});

function handler({key, count=0}={}) {
  const calls=[];
  const db={from:()=>({select:()=>({eq:()=>({eq:()=>({gte:async()=>({count})})})}),insert:async()=>({})})};
  const api=load("src/app/api/public/site-chat/route.ts", {
    "next/server":{NextResponse:{json:(data,opts)=>({data,...opts})}},
    "@/lib/publicSiteChat":lib,
    "@/lib/supabase/admin":{createAdminClient:()=>db},
    "@/lib/studentSecurity":{getClientIp:()=>"local-test",hashClientIp:x=>x},
  },{process:{env:{SITE_CHAT_OPENAI_API_KEY:key}},fetch:async(url,args)=>{
    calls.push([url,JSON.parse(args.body)]);
    return {ok:true,json:async()=>({status:"completed",output:[{type:"message",content:[{type:"output_text",text:JSON.stringify({text:"Open the Surveys section and choose your survey."})}]}]})};
  }});
  const origin="https://example.test";
  return {calls,run:(data,from=origin)=>{
    const raw=JSON.stringify(data);
    return api.POST({nextUrl:{origin},headers:new Headers({origin:from,"content-length":String(raw.length)}),text:async()=>raw});
  }};
}
test("only a known topic and curated text can reach OpenAI",async()=>{
  const h=handler({key:"test-only"});
  assert.equal((await h.run({topic:"surveys",locale:"en",question:"private raw text"})).status,400);
  assert.equal((await h.run({topic:"surveys",locale:"en"},"https://other.test")).status,403);
  assert.equal((await h.run({topic:"private raw text",locale:"en"})).status,404);
  assert.equal(h.calls.length,0);
  const result=await h.run({topic:"surveys",locale:"en"});
  assert.equal(result.data.generated,true);
  assert.equal(result.data.href,"/en/surveys");
  assert.equal(h.calls.length,1);
  const [url,payload]=h.calls[0];
  assert.equal(url,"https://api.openai.com/v1/responses");
  assert.equal(payload.store,false);
  const context=JSON.parse(payload.input);
  assert.deepEqual(Object.keys(context),["language","topic","guidance"]);
  assert.equal(context.guidance,lib.siteChatAnswer("surveys","en").text);
});
test("without a key and after the quota the approved answer remains available",async()=>{
  for(const h of [handler(),handler({key:"test-only",count:120})]){
    const result=await h.run({topic:"track",locale:"ru"});
    assert.equal(result.data.generated,false);
    assert.equal(result.data.text,lib.siteChatAnswer("track","ru").text);
    assert.equal(h.calls.length,0);
  }
});
