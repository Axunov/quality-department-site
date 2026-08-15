export type AccreditationLocale = "ru" | "uz" | "en";

export type PositionOption = {
  key: string;
  ru: string;
  uz: string;
  en: string;
  aliases: string[];
};

export const accreditationPositions: PositionOption[] = [
  {key:"director",ru:"Исполнительный директор",uz:"Ijrochi direktor",en:"Executive Director",aliases:["Исполнительный директор","Ijrochi direktor","Executive Director"]},
  {key:"legal_counsel",ru:"Юрисконсульт",uz:"Yuriskonsult",en:"Legal Counsel",aliases:["Юрисконсульт","Yuriskonsult"]},
  {key:"council_secretary",ru:"Секретарь Совета",uz:"Kengash kotibi",en:"Council Secretary",aliases:["Секретарь Совета","Заведующий канцелярией (секретарь Совета)","Kengash kotibi"]},
  {key:"deputy_academic",ru:"Заместитель директора по учебной работе",uz:"Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",en:"Deputy Director for Academic Affairs",aliases:["Заместитель директора по учебной работе","Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari","O‘quv ishlari bo‘yicha o‘rinbosari"]},
  {key:"chief_accountant",ru:"Главный бухгалтер",uz:"Bosh hisobchi",en:"Chief Accountant",aliases:["Главный бухгалтер","Bosh hisobchi"]},
  {key:"head_quality",ru:"Начальник отдела контроля качества образования",uz:"Ta’lim sifatini nazorat qilish bo‘limi boshlig‘i",en:"Head of Education Quality Control Department",aliases:["Начальник отдела контроля качества образования","Ta’lim sifatini nazorat qilish bo‘limi"]},
  {key:"head_affairs",ru:"Начальник управления делами",uz:"Ishlar boshqarmasi boshlig‘i",en:"Head of Administrative Affairs",aliases:["Начальник управления делами","Ishlar boshqarmasi boshlig‘i","Ishlar boshqarmasi"]},
  {key:"head_hr",ru:"Начальник отдела кадров",uz:"Xodimlar bo‘limi boshlig‘i",en:"Head of Human Resources",aliases:["Начальник отдела кадров","Xodimlar bo‘limi"]},
  {key:"head_international",ru:"Начальник отдела международного сотрудничества",uz:"Xalqaro hamkorlik bo‘limi boshlig‘i",en:"Head of International Cooperation Department",aliases:["Начальник отдела международного сотрудничества","Xalqaro hamkorlik bo‘limi"]},
  {key:"head_methodological",ru:"Начальник учебно-методического отдела",uz:"O‘quv-uslubiy bo‘lim boshlig‘i",en:"Head of Academic and Methodological Department",aliases:["Начальник учебно-методического отдела","O‘quv-uslubiy bo‘lim"]},
  {key:"head_registrar",ru:"Начальник офиса регистратора",uz:"Registrator ofisi boshlig‘i",en:"Head of Registrar Office",aliases:["Начальник офиса регистратора","Registrator ofisi"]},
  {key:"head_science",ru:"Начальник отдела научных исследований, инноваций и подготовки научно-педагогических кадров",uz:"Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash bo‘limi boshlig‘i",en:"Head of Research, Innovation and Academic Staff Development",aliases:["Начальник отдела научных исследований, инноваций и подготовки научно-педагогических кадров","Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi","Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash bo‘limi"]},
  {key:"deputy_science",ru:"Заместитель директора по научной работе и инновациям",uz:"Ijrochi direktorning ilmiy ishlar va innovatsiyalar bo‘yicha o‘rinbosari",en:"Deputy Director for Research and Innovation",aliases:["Заместитель директора по научной работе","Заместитель директора по научной работе и инновациям","Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari"]},
  {key:"deputy_youth",ru:"Первый заместитель директора по вопросам молодежи, духовности и просвещения",uz:"Ijrochi direktorning yoshlar masalalari, ma’naviyat va ma’rifat bo‘yicha birinchi o‘rinbosari",en:"First Deputy Director for Youth, Spirituality and Enlightenment",aliases:["Первый заместитель директора по вопросам молодежи, духовности и просвещения","Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari"]},
  {key:"head_finance",ru:"Начальник финансово-экономического отдела",uz:"Reja-moliya bo‘limi boshlig‘i",en:"Head of Finance and Economics Department",aliases:["Начальник финансово-экономического отдела","Reja-moliya bo‘limi"]},
  {key:"head_marketing",ru:"Начальник отдела маркетинга и практики студентов",uz:"Marketing va talabalar amaliyoti bo‘limi boshlig‘i",en:"Head of Marketing and Student Internship Department",aliases:["Начальник отдела маркетинга и практики студентов","Marketing va talabalar amaliyoti bo‘limi"]},
  {key:"head_digital",ru:"Начальник отдела цифровых образовательных технологий",uz:"Raqamli ta’lim texnologiyalari bo‘limi boshlig‘i",en:"Head of Digital Educational Technologies Department",aliases:["Начальник отдела цифровых образовательных технологий","начальник центра цифровых образовательных технологий","Raqamli va axborot texnologiyalari bo‘limi"]},
  {key:"department_head_manufacturing",ru:"Заведующий кафедрой «Технология машиностроения»",uz:"«Mashinasozlik texnologiyasi» kafedrasi mudiri",en:"Head of the Department of Manufacturing Engineering",aliases:["Заведующий кафедрой Технология машиностроения"]},
  {key:"department_head_metrology",ru:"Заведующий кафедрой «Метрология, стандартизация и сертификация»",uz:"«Metrologiya, standartlashtirish va sertifikatlashtirish» kafedrasi mudiri",en:"Head of the Department of Metrology, Standardization and Certification",aliases:["Заведующий кафедрой Метрология стандартизация и сертификация"]},
  {key:"department_head_economics",ru:"Заведующий кафедрой «Экономика и логистика»",uz:"«Iqtisodiyot va logistika» kafedrasi mudiri",en:"Head of the Department of Economics and Logistics",aliases:["Заведующий кафедрой Экономика и логистика"]},
  {key:"department_head_materials",ru:"Заведующий кафедрой «Материаловедение и современные инновационные технологии»",uz:"«Materialshunoslik va zamonaviy innovatsion texnologiyalar» kafedrasi mudiri",en:"Head of the Department of Materials Science and Modern Innovative Technologies",aliases:["Заведующий кафедрой Материаловедение и современные инновационные технологии"]},
  {key:"department_head_sciences",ru:"Заведующий кафедрой «Точные, естественные науки и физическая культура»",uz:"«Aniq va tabiiy fanlar hamda jismoniy madaniyat» kafedrasi mudiri",en:"Head of the Department of Exact and Natural Sciences and Physical Education",aliases:["Заведующий кафедрой Точные, естественные науки и физическая культура"]},
  {key:"department_head_intelligent",ru:"Заведующий кафедрой «Интеллектуальные системы»",uz:"«Intellektual tizimlar» kafedrasi mudiri",en:"Head of the Department of Intelligent Systems",aliases:["Заведующий кафедрой Интеллектуальные системы"]},
  {key:"dean",ru:"Декан факультета",uz:"Fakultet dekani",en:"Faculty Dean",aliases:["Деканы факультетов","Dekanatlar","tegishli fakultet dekanatlari"]},
  {key:"admissions_secretary",ru:"Ответственный секретарь приемной комиссии",uz:"Qabul komissiyasining mas’ul kotibi",en:"Executive Secretary of the Admissions Committee",aliases:["Ответственный секретарь приемной комиссии","Qabul komissiyasi"]},
  {key:"appeal_secretary",ru:"Секретарь апелляционной комиссии",uz:"Apellyatsiya komissiyasi kotibi",en:"Appeals Commission Secretary",aliases:["Секретарь апелляционной комиссии","Apellyatsiya komissiyasi"]},
  {key:"compliance",ru:"Начальник отдела комплаенс-контроля",uz:"Komplayens-nazorat bo‘limi boshlig‘i",en:"Head of Compliance Control Department",aliases:["Комплаенс-контроль","Komplayens-nazorat bo‘limi"]},
  {key:"library",ru:"Директор информационно-ресурсного центра",uz:"Axborot-resurs markazi direktori",en:"Director of Information Resource Center",aliases:["Директор информационно-ресурсного центра","Axborot-resurs markazi (kutubxona)"]},
  {key:"press_secretary",ru:"Пресс-секретарь",uz:"Matbuot kotibi",en:"Press Secretary",aliases:["Пресс-секретарь","Matbuot kotibi"]},
  {key:"civil_protection",ru:"Начальник отдела гражданской защиты и охраны труда",uz:"Fuqaro muhofazasi va mehnatni muhofaza qilish bo‘limi boshlig‘i",en:"Head of Civil Protection and Occupational Safety",aliases:["Начальник отдела гражданской защиты и охраны труда","Mehnatni muhofaza qilish va texnika xavfsizligi bo‘yicha mas’ul"]},
  {key:"psychologist",ru:"Психолог",uz:"Psixolog",en:"Psychologist",aliases:["Психолог","Psixolog"]},
  {key:"kpi_chair",ru:"Председатель рабочей группы по KPI",uz:"KPI bo‘yicha ishchi guruh raisi",en:"Chair of the KPI Working Group",aliases:["Председатель рабочей группы по KPI","KPI ishchi guruhi raisi"]},
];

export function positionLabel(position: PositionOption, locale: AccreditationLocale) {
  return position[locale];
}
