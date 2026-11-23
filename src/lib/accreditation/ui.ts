import type { Locale } from './specialData';

export const accreditationUi = {
  ru: {
    label:'Аккредитация', title:'Единая система управления аккредитацией',
    description:'Онлайн-мониторинг комплексной и специальной государственной аккредитации, доказательной базы, замечаний и исполнения по ответственным подразделениям.',
    complex:'Комплексная государственная аккредитация', special:'Специальная государственная аккредитация', open:'Открыть раздел',
    readiness:'Фактическая готовность', total:'Всего индикаторов', review:'На проверке', revision:'На доработке', approved:'Принято', notStarted:'Не начато', inProgress:'В работе',
    indicators:'Индикаторы качества', selfAssessment:'Самооценка', documents:'Нормативные документы', groups:'Рабочие группы', institutional:'Комплексная аккредитация',
    criterion:'Критерий', indicator:'Индикатор', responsible:'Основной ответственный', co:'Соисполнители', evidence:'Основная доказательная база', status:'Статус', progress:'Готовность',
    programs:'Образовательные программы', sourceNote:'Мониторинг начинается с 0% и увеличивается только по фактически загруженным и проверенным материалам.',
    cabinet:'Личный кабинет руководителя', director:'Кабинет директора', admin:'Администрирование аккредитации', login:'Войти в систему',
  },
  uz: {
    label:'Akkreditatsiya', title:"Akkreditatsiyani boşqarişning yagona tizimi",
    description:"Kompleks va maxsus davlat akkreditatsiyasi, dalillar bazasi, izohlar hamda mas’ul bölinmalar ijrosining onlayn monitoringi.",
    complex:'Kompleks davlat akkreditatsiyasi', special:'Maxsus davlat akkreditatsiyasi', open:"Bölimni oçiş",
    readiness:'Amaldagi tayyorgarlik', total:'Jami indikatorlar', review:"Tekşiruvda", revision:"Qayta işlaşda", approved:'Qabul qilindi', notStarted:"Boşlanmagan", inProgress:'Jarayonda',
    indicators:'Sifat indikatorlari', selfAssessment:"Özini özi baholaş", documents:'Me’yoriy hujjatlar', groups:"Işçi guruhlar", institutional:'Kompleks akkreditatsiya',
    criterion:'Mezon', indicator:'Indikator', responsible:'Asosiy mas’ul', co:"Hamijroçilar", evidence:'Asosiy dalillar bazasi', status:'Holat', progress:'Tayyorlik',
    programs:'Ta’lim dasturlari', sourceNote:"Monitoring 0% dan boşlanadi va faqat amalda yuklangan hamda tekşirilgan materiallar böyiça oşadi.",
    cabinet:"Bölinma rahbari kabineti", director:'Direktor kabineti', admin:'Akkreditatsiya administratsiyasi', login:"Tizimga kiriş",
  },
  en: {
    label:'Accreditation', title:'Unified accreditation management system',
    description:'Online monitoring of institutional and programme state accreditation, evidence, review comments and performance by responsible units.',
    complex:'Institutional state accreditation', special:'Programme state accreditation', open:'Open section',
    readiness:'Actual readiness', total:'Total indicators', review:'Under review', revision:'Revision required', approved:'Approved', notStarted:'Not started', inProgress:'In progress',
    indicators:'Quality indicators', selfAssessment:'Self-assessment', documents:'Regulatory documents', groups:'Working groups', institutional:'Institutional accreditation',
    criterion:'Criterion', indicator:'Indicator', responsible:'Primary owner', co:'Co-executors', evidence:'Core evidence base', status:'Status', progress:'Readiness',
    programs:'Educational programmes', sourceNote:'Monitoring starts at 0% and increases only as materials are actually uploaded and reviewed.',
    cabinet:'Department head workspace', director:'Director dashboard', admin:'Accreditation administration', login:'Sign in',
  }
} as const;

export function localeOf(value:string): Locale { return value === 'uz' || value === 'en' ? value : 'ru'; }

export const complexSections = [
  {slug:'indicators', icon:'📊', key:'indicators'},
  {slug:'self-assessment', icon:'📝', key:'selfAssessment'},
  {slug:'documents', icon:'📚', key:'documents'},
  {slug:'working-groups', icon:'👥', key:'groups'},
] as const;
