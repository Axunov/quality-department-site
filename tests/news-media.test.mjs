import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
function load(path, deps = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, { exports: module.exports, module, URL, crypto: webcrypto, require: name => { if (!(name in deps)) throw new Error(name); return deps[name]; } });
  return module.exports;
}
const media = load('src/lib/newsMedia.ts');
const origin = 'https://example.supabase.co';
const url = `${origin}/storage/v1/object/public/news/media/a.mp4`;
const photo = `${origin}/storage/v1/object/public/news/old.jpg`;
test('legacy image galleries survive and explicit empty media does not resurrect removed images', () => {
  assert.equal(media.getNewsMedia({ gallery_urls: [photo] })[0].url, photo);
  assert.equal(media.getNewsMedia({ image_url: photo })[0].type, 'image');
  assert.equal(media.getNewsMedia({ media_items: [], image_url: photo }).length, 0);
  const mixed = [{ type: 'video', url }, { type: 'image', url: photo }];
  assert.equal(media.getNewsMedia({ media_items: mixed })[0].type, 'video');
  assert.equal(media.mediaCover(mixed), '');
  assert.equal(media.mediaCover([{ type: 'video', url, poster: photo }]), photo);
});
test('rejects unsupported uploads and enforces separate photo/video size limits', () => {
  assert.equal(media.mediaFileError({ type: 'video/mp4', size: 50 * 1024 * 1024 }), null);
  assert.equal(media.mediaFileError({ type: 'video/webm', size: 50 * 1024 * 1024 + 1 }), 'size');
  assert.equal(media.mediaFileError({ type: 'image/jpeg', size: 10 * 1024 * 1024 + 1 }), 'size');
  for (const type of ['image/svg+xml', 'text/html', 'video/quicktime', 'application/javascript', 'toString', '__proto__']) assert.equal(media.mediaFileError({ type, size: 100 }), 'format');
  assert.equal(media.mediaFileError({ type: 'video/mp4', size: 0 }), 'size');
});
test('only media in this project news bucket is accepted; rejects scripts, credentials and other buckets', () => {
  assert.equal(media.validNewsMedia([{ type: 'video', url, poster: photo }, { type: 'image', url: photo }], origin), true);
  for (const bad of ['javascript:alert(1)', url.replace('example.', 'evil.'), url.replace('/news/', '/student-appeals/'), url+'?secret=1', url+'#a', url.replace('https://', 'https://user:password@')]) assert.equal(media.validNewsMedia([{ type: 'video', url: bad }], origin), false);
  for (const bad of [null, {}, [{type:'iframe',url}], Array(21).fill({type:'video',url})]) assert.equal(media.validNewsMedia(bad,origin),false);
});
function routes(authorized) {
  const saved = []; const refreshed = [];
  const admin = { storage: { from: () => ({getPublicUrl: () => ({data:{publicUrl:photo}})}) }, from: () => ({
    insert: value => { saved.push(value); return {select:()=>({single:async()=>({data:{id:'id',slug:value.slug},error:null})})}; },
    update: value => { saved.push(value); return {eq:()=>({select:()=>({single:async()=>({data:{id:'id',slug:'existing-slug'},error:null})})})}; },
  })};
  const api=load('src/app/api/admin/news/route.ts', {
    'next/server': {NextResponse:{json:(body,opts={})=>({body,status:opts.status||200})}},
    'next/cache': {revalidatePath:path=>refreshed.push(path)},
    '@/lib/adminSecurity': {requireAdminMfa:async()=>authorized?{}:null},
    '@/lib/supabase/admin': {createAdminClient:()=>admin}, '@/lib/newsMedia':media,
  });
  return {api,saved,refreshed};
}
const payload={title_ru:'Новость',title_uz:'',title_en:'',text_ru:'<p>Текст</p>',text_uz:'',text_en:'',category:'Новости',media_items:[{type:'video',url,poster:photo},{type:'image',url:photo}]};
function request(body, requestOrigin='https://qualitydepartment.netlify.app') {return {text:async()=>JSON.stringify(body),headers:{get:name=>name==='origin'?requestOrigin:null},nextUrl:{origin:'https://qualitydepartment.netlify.app'}};}
test('all news mutation methods require MFA and do not touch database on denied requests',async()=>{
 const r=routes(false);
 for(const method of ['POST','PATCH','DELETE']) assert.equal((await r.api[method](request(payload))).status,403);
 assert.equal(r.saved.length,0);
});
test('server rejects cross-origin requests, missing titles and untrusted media',async()=>{
 const r=routes(true);
 assert.equal((await r.api.POST(request(payload,'https://evil.example'))).status,403);
 assert.equal((await r.api.POST(request({...payload,title_ru:''}))).status,400);
 assert.equal((await r.api.POST(request({...payload,media_items:[{type:'video',url:'javascript:alert(1)'}]}))).status,400);
 assert.equal(r.saved.length,0);
});
test('mixed news preserves order, stores an image cover, mirrors text, and refreshes all languages',async()=>{
 const r=routes(true);assert.equal((await r.api.POST(request(payload))).status,200);
 assert.equal(r.saved[0].media_items[0].type,'video');assert.equal(r.saved[0].image_url,photo);assert.equal(r.saved[0].gallery_urls.length,1);assert.equal(r.saved[0].content_ru,payload.text_ru);
 for(const lang of ['ru','uz','en']) assert.ok(r.refreshed.includes(`/${lang}/news`));
});
test('editing supports removing all media without changing slug or publishing status',async()=>{
 const r=routes(true);assert.equal((await r.api.PATCH(request({...payload,id:'00000000-0000-4000-8000-000000000001',media_items:[]}))).status,200);
 assert.equal(r.saved[0].image_url,'');assert.equal(r.saved[0].gallery_urls.length,0);assert.equal(r.saved[0].published,undefined);assert.equal(r.saved[0].slug,undefined);
});
