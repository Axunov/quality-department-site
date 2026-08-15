"use client";
import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { localeOf } from "@/lib/accreditation/ui";
import { accreditationPositions as POSITIONS, positionLabel } from "@/lib/accreditation/positions";
/* legacy list retained below is removed in this release */
const LEGACY_POSITIONS = [
 {key:"legal_counsel",ru:"Юрисконсульт",uz:"Yuriskonsult",en:"Legal Counsel",aliases:["Юрисконсульт","Yuriskonsult"]},
 {key:"council_secretary",ru:"Секретарь Совета",uz:"Kengash kotibi",en:"Council Secretary",aliases:["Секретарь Совета","Заведующий канцелярией (секретарь Совета)","Kengash kotibi"]},
 {key:"deputy_academic",ru:"Заместитель директора по учебной работе",uz:"Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",en:"Deputy Director for Academic Affairs",aliases:["Заместитель директора по учебной работе","Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari","O‘quv ishlari bo‘yicha o‘rinbosari"]},
 {key:"chief_accountant",ru:"Главный бухгалтер",uz:"Bosh hisobchi",en:"Chief Accountant",aliases:["Главный бухгалтер","Bosh hisobchi"]},
 {key:"head_quality",ru:"Начальник отдела контроля качества образования",uz:"Ta’lim sifatini nazorat qilish bo‘limi",en:"Head of Education Quality Control Department",aliases:["Начальник отдела контроля качества образования","Ta’lim sifatini nazorat qilish bo‘limi"]},
 {key:"head_affairs",ru:"Начальник управления делами",uz:"Ishlar boshqarmasi boshlig‘i",en:"Head of Administrative Affairs",aliases:["Начальник управления делами","Ishlar boshqarmasi boshlig‘i","Ishlar boshqarmasi"]},
 {key:"head_hr",ru:"Начальник отдела кадров",uz:"Xodimlar bo‘limi",en:"Head of Human Resources",aliases:["Начальник отдела кадров","Xodimlar bo‘limi"]},
 {key:"head_international",ru:"Начальник отдела международного сотрудничества",uz:"Xalqaro hamkorlik bo‘limi",en:"Head of International Cooperation Department",aliases:["Начальник отдела международного сотрудничества","Xalqaro hamkorlik bo‘limi"]},
 {key:"head_methodological",ru:"Начальник учебно-методического отдела",uz:"O‘quv-uslubiy bo‘lim",en:"Head of Academic and Methodological Department",aliases:["Начальник учебно-методического отдела","O‘quv-uslubiy bo‘lim"]},
 {key:"head_registrar",ru:"Начальник офиса регистратора",uz:"Registrator ofisi",en:"Head of Registrar Office",aliases:["Начальник офиса регистратора","Registrator ofisi"]},
 {key:"head_science",ru:"Начальник отдела научных исследований, инноваций и подготовки научно-педагогических кадров",uz:"Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi",en:"Head of Research, Innovation and Academic Staff Development",aliases:["Начальник отдела научных исследований, инноваций и подготовки научно-педагогических кадров","Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi","Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash bo‘limi"]},
 {key:"deputy_science",ru:"Заместитель директора по научной работе и инновациям",uz:"Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari",en:"Deputy Director for Research and Innovation",aliases:["Заместитель директора по научной работе","Заместитель директора по научной работе и инновациям","Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari","Ilmiy ishlar bo‘yicha direktor o‘rinbosari"]},
 {key:"deputy_youth",ru:"Первый заместитель директора по вопросам молодежи, духовности и просвещения",uz:"Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari",en:"First Deputy Director for Youth Affairs",aliases:["Первый заместитель директора по вопросам молодежи, духовности и просвещения","Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari"]},
 {key:"head_finance",ru:"Начальник финансово-экономического отдела",uz:"Reja-moliya bo‘limi",en:"Head of Finance and Economics Department",aliases:["Начальник финансово-экономического отдела","Reja-moliya bo‘limi"]},
 {key:"head_marketing",ru:"Начальник отдела маркетинга и практики студентов",uz:"Marketing va talabalar amaliyoti bo‘limi",en:"Head of Marketing and Student Internship Department",aliases:["Начальник отдела маркетинга и практики студентов","Marketing va talabalar amaliyoti bo‘limi"]},
 {key:"head_digital",ru:"Начальник отдела цифровых образовательных технологий",uz:"Raqamli va axborot texnologiyalari bo‘limi",en:"Head of Digital and Information Technologies",aliases:["Начальник отдела цифровых образовательных технологий","начальник центра цифровых образовательных технологий","Raqamli va axborot texnologiyalari bo‘limi"]},
 {key:"department_head",ru:"Заведующий кафедрой",uz:"Tegishli kafedra mudiri",en:"Head of Department",aliases:["Заведующие кафедрами","заведующий кафедрой","Tegishli kafedra mudiri"]},
 {key:"dean",ru:"Декан факультета",uz:"Dekanatlar",en:"Faculty Dean",aliases:["Деканы факультетов","Dekanatlar","tegishli fakultet dekanatlari","tegishli fakultet dekanati"]},
 {key:"admissions_secretary",ru:"Ответственный секретарь приемной комиссии",uz:"Qabul komissiyasi",en:"Executive Secretary of the Admissions Committee",aliases:["Ответственный секретарь приемной комиссии","Qabul komissiyasi"]},
 {key:"appeal_secretary",ru:"Секретарь апелляционной комиссии",uz:"Apellyatsiya komissiyasi",en:"Appeals Commission Secretary",aliases:["Секретарь апелляционной комиссии","Apellyatsiya komissiyasi"]},
 {key:"compliance",ru:"Начальник отдела комплаенс-контроля",uz:"Komplayens-nazorat bo‘limi",en:"Head of Compliance Control Department",aliases:["Комplayens-контроль","Komplayens-nazorat bo‘limi","Комplayens-nazorat bo‘limi"]},
 {key:"library",ru:"Директор информационно-ресурсного центра",uz:"Axborot-resurs markazi (kutubxona)",en:"Director of Information Resource Center",aliases:["Директор информационно-ресурсного центра","Axborot-resurs markazi (kutubxona)"]},
 {key:"press_secretary",ru:"Пресс-секретарь",uz:"Matbuot kotibi",en:"Press Secretary",aliases:["Пресс-секретарь","Matbuot kotibi"]},
 {key:"civil_protection",ru:"Начальник отдела гражданской защиты и охраны труда",uz:"Mehnatni muhofaza qilish va texnika xavfsizligi bo‘yicha mas’ul",en:"Head of Civil Protection and Occupational Safety",aliases:["Начальник отдела гражданской защиты и охраны труда","Mehnatni muhofaza qilish va texnika xavfsizligi bo‘yicha mas’ul"]},
 {key:"psychologist",ru:"Психолог",uz:"Psixolog",en:"Psychologist",aliases:["Психолог","Psixolog"]},
 {key:"kpi_chair",ru:"Председатель рабочей группы по KPI",uz:"KPI ishchi guruhi raisi",en:"Chair of the KPI Working Group",aliases:["Председатель рабочей группы по KPI","KPI ishchi guruhi raisi"]}
]; void LEGACY_POSITIONS;

export default function AccreditationLogin(){
 const l=localeOf(useLocale()); const router=useRouter(); const supabase=useMemo(()=>createClient(),[]);
 const[mode,setMode]=useState<"login"|"register">("login"); const[email,setEmail]=useState(""); const[password,setPassword]=useState(""); const[fullName,setFullName]=useState(""); const[positionKey,setPositionKey]=useState(""); const[msg,setMsg]=useState(""); const[busy,setBusy]=useState(false);
 const tx={
  ru:{title:"Система аккредитации",sub:"Личный кабинет для ответственных руководителей",login:"Вход",register:"Регистрация",email:"Электронная почта",pass:"Пароль",name:"Ф.И.О.",job:"Должность",responsible:"Ответственное подразделение / должность по распределению индикаторов",type:"Тип кабинета",head:"Руководитель подразделения",director:"Директор института",go:"Войти",create:"Зарегистрироваться",pending:"Регистрация завершена. Если подтверждение e-mail включено, перейдите по ссылке из письма. После входа администратор должен подтвердить Ваш профиль.",noProfile:"Профиль аккредитации ещё не создан. Зарегистрируйтесь или обратитесь к администратору."},
  uz:{title:"Akkreditatsiya tizimi",sub:"Mas’ul rahbarlar uchun shaxsiy kabinet",login:"Kirish",register:"Ro‘yxatdan o‘tish",email:"Elektron pochta",pass:"Parol",name:"F.I.Sh.",job:"Lavozim",responsible:"Indikatorlar taqsimotidagi mas’ul bo‘linma / lavozim",type:"Kabinet turi",head:"Bo‘linma rahbari",director:"Institut direktori",go:"Kirish",create:"Ro‘yxatdan o‘tish",pending:"Ro‘yxatdan o‘tish yakunlandi. E-mail tasdiqlash yoqilgan bo‘lsa, xatdagi havolaga o‘ting. Kirgandan so‘ng administrator profilingizni tasdiqlashi kerak.",noProfile:"Akkreditatsiya profili hali yaratilmagan. Ro‘yxatdan o‘ting yoki administratorga murojaat qiling."},
  en:{title:"Accreditation system",sub:"Personal workspace for responsible managers",login:"Sign in",register:"Register",email:"Email",pass:"Password",name:"Full name",job:"Job title",responsible:"Responsible unit / position in the indicator allocation",type:"Workspace type",head:"Department head",director:"Institute Director",go:"Sign in",create:"Register",pending:"Registration is complete. If email confirmation is enabled, follow the link in the email. After sign-in, an administrator must approve your profile.",noProfile:"Your accreditation profile has not been created yet. Register or contact the administrator."}
 }[l];
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMsg('');
  if(mode==='register'){
   const pos=POSITIONS.find(p=>p.key===positionKey); const selectedJob=pos?positionLabel(pos,l):'';
   const requestedRole=positionKey==='director'?'director':'department_head';
   const {data,error}=await supabase.auth.signUp({email,password,options:{data:{accreditation_signup:'true',full_name:fullName,job_title:selectedJob,position_key:positionKey,requested_role:requestedRole}}});
   if(error){setMsg(error.message);setBusy(false);return} setMsg(tx.pending); setBusy(false); if(data.session){router.replace(`/${l}/accreditation/cabinet`);router.refresh()} return;
  }
  const{data,error}=await supabase.auth.signInWithPassword({email,password}); if(error){setMsg(error.message);setBusy(false);return}
  const{data:p}=await supabase.from('accreditation_v3_profiles').select('role').eq('user_id',data.user.id).maybeSingle(); if(!p){setMsg(tx.noProfile);setBusy(false);return}
  router.replace(`/${l}/accreditation/${p.role==='director'?'director':'cabinet'}`);router.refresh();
 }
 return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-6"><form onSubmit={submit} className="w-full max-w-xl rounded-[30px] border border-blue-100 bg-white p-8 shadow-[0_25px_70px_rgba(15,95,168,.14)]">
  <div className="text-4xl">🔐</div><h1 className="mt-4 text-3xl font-black text-slate-900">{tx.title}</h1><p className="mt-2 text-slate-500">{tx.sub}</p>
  <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button type="button" onClick={()=>{setMode('login');setMsg('')}} className={`rounded-lg px-4 py-2.5 text-sm font-bold ${mode==='login'?'bg-white text-blue-800 shadow-sm':'text-slate-500'}`}>{tx.login}</button><button type="button" onClick={()=>{setMode('register');setMsg('')}} className={`rounded-lg px-4 py-2.5 text-sm font-bold ${mode==='register'?'bg-white text-blue-800 shadow-sm':'text-slate-500'}`}>{tx.register}</button></div>
  {mode==='register'&&<div className="mt-6 grid gap-4 sm:grid-cols-2"><label><span className="text-sm font-bold text-slate-700">{tx.name}</span><input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" required value={fullName} onChange={e=>setFullName(e.target.value)}/></label><label><span className="text-sm font-bold text-slate-700">{tx.job}</span><select required value={positionKey} onChange={e=>setPositionKey(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"><option value="">—</option>{POSITIONS.map(p=><option key={p.key} value={p.key}>{positionLabel(p,l)}</option>)}</select></label></div>}
  <label className="mt-5 block"><span className="text-sm font-bold text-slate-700">{tx.email}</span><input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="mt-4 block"><span className="text-sm font-bold text-slate-700">{tx.pass}</span><input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label>
  <button disabled={busy} className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-3 font-bold text-white disabled:opacity-50">{busy?'...':mode==='login'?tx.go:tx.create}</button>{msg&&<p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">{msg}</p>}
 </form></main>
}
