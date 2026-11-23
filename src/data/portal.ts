export const portalRoles = [
  { id: "student", href: "/student/login" },
  { id: "teacher", href: "/teacher/login" },
  { id: "accreditation", href: "/accreditation/login" },
  { id: "admin", href: "/admin/login" },
] as const;

export const portalLocale = (locale: string) => locale === "uz" || locale === "en" ? locale : "ru";

export const portalUI = {
  ru: {
    account: "Кабинет", title: "Вход в личный кабинет", description: "Выберите, для чего вы хотите войти. Используйте данные своего кабинета.",
    about: "Об отделе", enter: "Войти", publicTitle: "Сервисы без входа", survey: "Пройти опрос", appeal: "Подать обращение", monitoring: "Мониторинг опросов",
    student: ["Студент", "Обращения, уведомления и назначенные опросы."],
    teacher: ["Преподаватель", "Вход для преподавателей, в том числе для тестирования HEMIS."],
    accreditation: ["Аккредитация и руководство", "Индикаторы, задачи и отчёты. Вход для руководителей и ответственных."],
    admin: ["Администратор сайта", "Публикации, документы и управление сервисами."],
  },
  uz: {
    account: "Kabinet", title: "Şaxsiy kabinetga kiriş", description: "Kiriş maqsadini tanlang. Kabinetingizga tegişli kiriş ma’lumotlaridan foydalaning.",
    about: "Bölim haqida", enter: "Kiriş", publicTitle: "Kiriş talab qilinmaydigan xizmatlar", survey: "Sörovda qatnaşiş", appeal: "Murojaat yuboriş", monitoring: "Sörovnomalar monitoringi",
    student: ["Talaba", "Murojaatlar, bildirişnomalar va tayinlangan sörovlar."],
    teacher: ["Öqituvçi", "Öqituvçilar uçun kiriş, jumladan HEMIS testidan ötiş."],
    accreditation: ["Akkreditatsiya va rahbariyat", "Indikatorlar, vazifalar va hisobotlar. Rahbarlar va mas’ul xodimlar uçun kiriş."],
    admin: ["Sayt administratori", "Naşrlar, hujjatlar va xizmatlarni boşqariş."],
  },
  en: {
    account: "Account", title: "Sign in to your account", description: "Choose what you need to access. Use your existing sign-in details.",
    about: "About the department", enter: "Sign in", publicTitle: "Services available without signing in", survey: "Take a survey", appeal: "Submit an appeal", monitoring: "Survey monitoring",
    student: ["Student", "Appeals, notifications and assigned surveys."],
    teacher: ["Teacher", "Staff sign-in, including access to HEMIS testing."],
    accreditation: ["Accreditation and leadership", "Indicators, tasks and reports. Sign-in for leadership and staff responsible for accreditation."],
    admin: ["Site administrator", "Manage publications, documents and services."],
  },
} as const;
