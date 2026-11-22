import { learningQualityCopy } from "@/data/learningQualityCopy";

export const audiences = ["students", "employers", "graduates", "doctoral", "teachers"] as const;
export const reports = ["teacher", "students", "employers", "graduates", "doctoral"] as const;
export type ReportKey = typeof reports[number];
export const catalogCopy = {
  ru: {
    title:"Опросы и анкеты", lead:"Выберите, к какой группе вы относитесь, и откройте нужную анкету.", all:"Все", filter:"Кому предназначен опрос", open:"Открыть", catalog:"Все опросы", monitoring:"Результаты опросов", appeal:"Обращения", public:"Без личного кабинета", account:"Требуется вход", active:"Приём ответов открыт", closed:"Приём ответов сейчас недоступен", unknown:"Проверяем доступность", statusError:"Не удалось проверить доступность. Её можно уточнить на странице анкеты.", retry:"Повторить", until:"Приём до", extra:"Другие опубликованные анкеты", noResults:"Для этой аудитории пока нет других открытых анкет.",
    students:"Студентам", employers:"Работодателям", graduates:"Выпускникам", doctoral:"Докторантам", teachers:"Преподавателям",
    teacherTitle:"Преподаватель глазами студента", teacherText:"Выберите учебную группу и оцените преподавателей.", learningText:"Оцените качество преподавания и условия обучения в 2026/2027 учебном году.", employerTitle:"Опрос работодателей", employerText:"Поделитесь мнением о подготовке выпускников и возможностях сотрудничества.", graduateTitle:"Опрос выпускников", graduateText:"Расскажите, как обучение помогло вам в работе и профессиональном развитии.", doctoralTitle:"Опрос докторантов", doctoralText:"Оцените условия обучения, исследований и научной поддержки.", hemisTitle:"Тест HEMIS", hemisText:"Отдельный тест для преподавателей. Войдите в кабинет преподавателя.",
  },
  uz: {
    title:"So‘rovlar va anketalar", lead:"O‘zingizga mos guruhni tanlang va kerakli anketani oching.", all:"Barchasi", filter:"So‘rov kimlar uchun", open:"Ochish", catalog:"Barcha so‘rovlar", monitoring:"So‘rov natijalari", appeal:"Murojaatlar", public:"Kabinetga kirish shart emas", account:"Kirish talab etiladi", active:"Javoblar qabul qilinmoqda", closed:"Hozir javoblar qabul qilinmayapti", unknown:"Mavjudligi tekshirilmoqda", statusError:"Mavjudligini tekshirib bo‘lmadi. Buni so‘rov sahifasida aniqlash mumkin.", retry:"Qayta urinish", until:"Qabul qilish muddati", extra:"Boshqa e’lon qilingan anketalar", noResults:"Ushbu guruh uchun boshqa ochiq anketalar yo‘q.",
    students:"Talabalar uchun", employers:"Ish beruvchilar uchun", graduates:"Bitiruvchilar uchun", doctoral:"Doktorantlar uchun", teachers:"O‘qituvchilar uchun",
    teacherTitle:"O‘qituvchi talaba nigohida", teacherText:"O‘quv guruhingizni tanlang va o‘qituvchilaringizni baholang.", learningText:"2026/2027-o‘quv yilidagi o‘qitish sifati va ta’lim sharoitlarini baholang.", employerTitle:"Ish beruvchilar so‘rovi", employerText:"Bitiruvchilar tayyorgarligi va hamkorlik imkoniyatlari haqida fikr bildiring.", graduateTitle:"Bitiruvchilar so‘rovi", graduateText:"Ta’lim ish va kasbiy rivojlanishingizga qanday yordam berganini ayting.", doctoralTitle:"Doktorantlar so‘rovi", doctoralText:"Ta’lim, ilmiy tadqiqot va ilmiy yordam sharoitlarini baholang.", hemisTitle:"HEMIS testi", hemisText:"O‘qituvchilar uchun alohida test. O‘qituvchi kabinetiga kiring.",
  },
  en: {
    title:"Surveys and questionnaires", lead:"Choose the audience that applies to you and open the relevant form.", all:"All", filter:"Survey audience", open:"Open", catalog:"All surveys", monitoring:"Survey results", appeal:"Appeals", public:"No sign-in required", account:"Sign-in required", active:"Accepting responses", closed:"Not currently accepting responses", unknown:"Checking availability", statusError:"Availability could not be checked. You can check on the survey page.", retry:"Retry", until:"Accepting responses until", extra:"Other published questionnaires", noResults:"There are no other open questionnaires for this audience.",
    students:"Students", employers:"Employers", graduates:"Graduates", doctoral:"Doctoral students", teachers:"Teachers",
    teacherTitle:"Teacher Through the Eyes of a Student", teacherText:"Choose your study group and evaluate your teachers.", learningText:"Evaluate teaching quality and learning conditions in the 2026/2027 academic year.", employerTitle:"Employer survey", employerText:"Share your views on graduate preparation and opportunities to work with the Institute.", graduateTitle:"Graduate survey", graduateText:"Tell us how your education helped with your work and professional development.", doctoralTitle:"Doctoral survey", doctoralText:"Evaluate learning, research and academic support.", hemisTitle:"HEMIS test", hemisText:"A separate test for teaching staff. Sign in with a teacher account.",
  },
} as const;

export function fixedSurveys(locale: keyof typeof catalogCopy) {
  const t = catalogCopy[locale];
  return [
    { key:"teacher", audience:"students", href:"/surveys/teacher", title:t.teacherTitle, description:t.teacherText },
    { key:"students", audience:"students", href:"/surveys/learning-quality", title:learningQualityCopy[locale].menu, description:t.learningText },
    { key:"employers", audience:"employers", href:"/surveys/employers", title:t.employerTitle, description:t.employerText },
    { key:"graduates", audience:"graduates", href:"/surveys/graduates", title:t.graduateTitle, description:t.graduateText },
    { key:"doctoral", audience:"doctoral", href:"/surveys/doctoral", title:t.doctoralTitle, description:t.doctoralText },
    { key:"hemis", audience:"teachers", href:"/teacher/login", title:t.hemisTitle, description:t.hemisText },
  ] as const;
}
