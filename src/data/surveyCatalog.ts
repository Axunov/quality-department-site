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
    title:"Sörovlar va anketalar", lead:"Özingizga mos guruhni tanlang va kerakli anketani oçing.", all:"Barçasi", filter:"Sörov kimlar uçun", open:"Oçiş", catalog:"Barça sörovlar", monitoring:"Sörov natijalari", appeal:"Murojaatlar", public:"Kabinetga kiriş şart emas", account:"Kiriş talab etiladi", active:"Javoblar qabul qilinmoqda", closed:"Hozir javoblar qabul qilinmayapti", unknown:"Mavjudligi tekşirilmoqda", statusError:"Mavjudligini tekşirib bölmadi. Buni sörov sahifasida aniqlaş mumkin.", retry:"Qayta uriniş", until:"Qabul qiliş muddati", extra:"Boşqa e’lon qilingan anketalar", noResults:"Uşbu guruh uçun boşqa oçiq anketalar yöq.",
    students:"Talabalar uçun", employers:"Iş beruvçilar uçun", graduates:"Bitiruvçilar uçun", doctoral:"Doktorantlar uçun", teachers:"Öqituvçilar uçun",
    teacherTitle:"Öqituvçi talaba nigohida", teacherText:"Öquv guruhingizni tanlang va öqituvçilaringizni baholang.", learningText:"2026/2027-öquv yilidagi öqitiş sifati va ta’lim şaroitlarini baholang.", employerTitle:"Iş beruvçilar sörovi", employerText:"Bitiruvçilar tayyorgarligi va hamkorlik imkoniyatlari haqida fikr bildiring.", graduateTitle:"Bitiruvçilar sörovi", graduateText:"Ta’lim iş va kasbiy rivojlanişingizga qanday yordam berganini ayting.", doctoralTitle:"Doktorantlar sörovi", doctoralText:"Ta’lim, ilmiy tadqiqot va ilmiy yordam şaroitlarini baholang.", hemisTitle:"HEMIS testi", hemisText:"Öqituvçilar uçun alohida test. Öqituvçi kabinetiga kiring.",
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
