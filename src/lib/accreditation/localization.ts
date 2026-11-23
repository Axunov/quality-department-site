import {accreditationPositions,positionLabel,type AccreditationLocale} from "./positions";

const projects={
  complex:{ru:"Комплексная государственная аккредитация",uz:"Kompleks davlat akkreditatsiyasi",en:"Comprehensive state accreditation"},
  "special-software-engineering":{ru:"Специальная аккредитация — Программная инженерия",uz:"Maxsus akkreditatsiya — Dasturiy ta’minot muhandisligi",en:"Special accreditation — Software Engineering"},
  "special-biomedical-instrumentation":{ru:"Специальная аккредитация — Приборостроение (биомедицинская инженерия)",uz:"Maxsus akkreditatsiya — Asbobsozlik (biotibbiyot muhandisligi)",en:"Special accreditation — Instrumentation (Biomedical Engineering)"},
} as const;
const statuses={ru:{draft:"Не начато",in_progress:"В работе",review:"На проверке",revision:"На доработке",approved:"Принято"},uz:{draft:"Boşlanmagan",in_progress:"Jarayonda",review:"Tekşiruvda",revision:"Qayta işlaşda",approved:"Qabul qilindi"},en:{draft:"Not started",in_progress:"In progress",review:"Under review",revision:"For revision",approved:"Approved"}};
const priorities={ru:{low:"Низкий",normal:"Обычный",high:"Высокий",critical:"Критический"},uz:{low:"Past",normal:"Oddiy",high:"Yuqori",critical:"Kritik"},en:{low:"Low",normal:"Normal",high:"High",critical:"Critical"}};
export const projectLabel=(code:string,l:AccreditationLocale)=>projects[code as keyof typeof projects]?.[l]||code;
export const statusLabel=(value:string,l:AccreditationLocale)=>statuses[l][value as keyof typeof statuses.ru]||value;
export const priorityLabel=(value:string,l:AccreditationLocale)=>priorities[l][value as keyof typeof priorities.ru]||value;
export const positionKeyLabel=(key:string|null|undefined,fallback:string|null|undefined,l:AccreditationLocale)=>positionLabel(accreditationPositions.find(x=>x.key===key)||accreditationPositions.find(x=>x.aliases.some(a=>a.toLowerCase()===String(fallback||"").toLowerCase()))||{key:"",ru:fallback||"—",uz:fallback||"—",en:fallback||"—",aliases:[]},l);

type ResponsibleTranslation={ru:string;uz:string;en:string;aliases?:string[]};

// The database deliberately stores a stable Uzbek source label. UI language must
// never depend on that storage language, so every label used by both accreditation
// types is resolved here before it reaches the admin or director dashboards.
const responsibleTranslations:ResponsibleTranslation[]=[
  {ru:"Директор информационно-ресурсного центра",uz:"Axborot-resurs markazi direktori",en:"Director of the Information Resource Center"},
  {ru:"Главный бухгалтер",uz:"Boş hisobçi",en:"Chief Accountant"},
  {ru:"Заместитель директора по научной работе и инновациям",uz:"Ilmiy işlar va innovatsiyalar böyiça direktor örinbosari",en:"Deputy Director for Research and Innovation",aliases:["Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari","Ijrochi direktorning ilmiy ishlar va innovatsiyalar bo‘yicha o‘rinbosari"]},
  {ru:"Начальник управления делами",uz:"Işlar boşqarmasi boşliği",en:"Head of Administrative Affairs"},
  {ru:"Секретарь Совета",uz:"Kengaş kotibi",en:"Council Secretary"},
  {ru:"Начальник финансово-экономического отдела",uz:"Moliya-iqtisod bölimi boşliği",en:"Head of Finance and Economics Department",aliases:["Reja-moliya bo‘limi boshlig‘i"]},
  {ru:"Заместитель директора по учебной работе",uz:"Öquv işlari böyiça direktor örinbosari",en:"Deputy Director for Academic Affairs",aliases:["Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari"]},
  {ru:"Начальник отдела цифровых образовательных технологий",uz:"Raqamli ta’lim texnologiyalari bölimi boşliği",en:"Head of Digital Educational Technologies Department"},
  {ru:"Начальник офиса регистратора",uz:"Registrator ofisi boşliği",en:"Head of Registrar Office"},
  {ru:"Начальник отдела контроля качества образования",uz:"Ta’lim sifatini nazorat qiliş bölimi boşliği",en:"Head of Education Quality Control Department"},
  {ru:"Начальник отдела кадров",uz:"Xodimlar bölimi boşliği",en:"Head of Human Resources Department"},
  {ru:"Первый заместитель директора по вопросам молодёжи, духовности и просвещения",uz:"Yoşlar masalalari va ma’naviy-ma’rifiy işlar böyiça direktor örinbosari",en:"First Deputy Director for Youth, Spirituality and Enlightenment",aliases:["Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari","Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari"]},
  {ru:"Психолог",uz:"Psixolog",en:"Psychologist"},

  {ru:"Апелляционная комиссия",uz:"Apellyatsiya komissiyasi",en:"Appeals Commission"},
  {ru:"Информационно-ресурсный центр (библиотека)",uz:"Axborot-resurs markazi (kutubxona)",en:"Information Resource Center (Library)"},
  {ru:"Деканаты",uz:"Dekanatlar",en:"Dean's Offices"},
  {ru:"Отдел комплаенс-контроля",uz:"Komplayens-nazorat bölimi",en:"Compliance Control Department"},
  {ru:"Отдел маркетинга и практики студентов",uz:"Marketing va talabalar amaliyoti bölimi",en:"Marketing and Student Internship Department"},
  {ru:"Учебно-методический отдел",uz:"Öquv-uslubiy bölim",en:"Academic and Methodological Department"},
  {ru:"Приёмная комиссия",uz:"Qabul komissiyasi",en:"Admissions Committee"},
  {ru:"Отдел цифровых и информационных технологий",uz:"Raqamli va axborot texnologiyalari bölimi",en:"Digital and Information Technologies Department"},
  {ru:"Офис регистратора",uz:"Registrator ofisi",en:"Registrar Office"},
  {ru:"Отдел контроля качества образования",uz:"Ta’lim sifatini nazorat qiliş bölimi",en:"Education Quality Control Department"},
  {ru:"Заведующий соответствующей кафедрой",uz:"Tegişli kafedra mudiri",en:"Head of the Relevant Department"},
  {ru:"Отдел международного сотрудничества",uz:"Xalqaro hamkorlik bölimi",en:"International Cooperation Department"},
  {ru:"Отдел кадров",uz:"Xodimlar bölimi",en:"Human Resources Department"},
];

const normalizeResponsible=(value:string)=>value
  .normalize("NFKC")
  .replace(/[ʼʻ‘’`']/g,"'")
  .replace(/\s+/g," ")
  .trim()
  .toLocaleLowerCase("uz");

const responsibleLookup=new Map<string,ResponsibleTranslation>();
for(const item of responsibleTranslations){
  for(const label of [item.ru,item.uz,item.en,...(item.aliases||[])])responsibleLookup.set(normalizeResponsible(label),item);
}
for(const position of accreditationPositions){
  const item:ResponsibleTranslation={ru:position.ru,uz:position.uz,en:position.en};
  for(const label of [position.ru,position.uz,position.en,...position.aliases]){
    const key=normalizeResponsible(label);
    if(!responsibleLookup.has(key))responsibleLookup.set(key,item);
  }
}

export function responsibleLabel(value:string|null|undefined,l:AccreditationLocale){
  if(!value)return "—";
  return value.split(/\s*;\s*/).map(part=>responsibleLookup.get(normalizeResponsible(part))?.[l]||part.trim()).join("; ");
}
export const internalEmail=(username:string)=>`${username.trim().toLowerCase()}@users.qualitydepartment.uz`;
export const normalizeUsername=(value:string)=>value.trim().toLowerCase().replace(/[^a-z0-9._-]/g,"");
