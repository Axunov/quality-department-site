export type SurveyLocale = "ru" | "uz" | "en";

export const employerSurveyText = {
  ru: {
    eyebrow: "Обратная связь работодателей",
    title: "Оценка качества подготовки выпускников",
    intro: "Отдел контроля качества образования приглашает работодателей оценить подготовку выпускников, практико-ориентированность образовательных программ и перспективы сотрудничества с институтом. Ответы анализируются в обобщённом виде.",
    time: "Время заполнения: 7–10 минут",
    privacy: "Контактные данные указываются добровольно и не публикуются.",
    steps: ["Организация", "Взаимодействие", "Оценка подготовки", "Предложения", "Контакты"],
    next: "Далее", back: "Назад", submit: "Отправить анкету", required: "Заполните обязательные поля текущего раздела.", sending: "Отправляем…",
    success: "Спасибо! Анкета успешно отправлена.", successText: "Ваши ответы будут использованы для совершенствования образовательных программ и взаимодействия с работодателями.", again: "Заполнить новую анкету",
    error: "Не удалось отправить анкету. Проверьте соединение и попробуйте ещё раз.",
    yes: "Да", no: "Нет", unsure: "Затрудняюсь ответить", other: "Другое",
  },
  uz: {
    eyebrow: "Ish beruvchilar fikri",
    title: "Bitiruvchilar tayyorgarligi sifatini baholash",
    intro: "Ta’lim sifatini nazorat qilish bo‘limi ish beruvchilarni bitiruvchilar tayyorgarligi, ta’lim dasturlarining amaliy yo‘naltirilganligi va institut bilan hamkorlik istiqbollarini baholashga taklif etadi. Javoblar umumlashtirilgan holda tahlil qilinadi.",
    time: "To‘ldirish vaqti: 7–10 daqiqa",
    privacy: "Aloqa ma’lumotlarini ko‘rsatish ixtiyoriy va ular e’lon qilinmaydi.",
    steps: ["Tashkilot", "Hamkorlik", "Tayyorgarlik bahosi", "Takliflar", "Aloqa"],
    next: "Keyingi", back: "Orqaga", submit: "So‘rovnomani yuborish", required: "Joriy bo‘limdagi majburiy maydonlarni to‘ldiring.", sending: "Yuborilmoqda…",
    success: "Rahmat! So‘rovnoma muvaffaqiyatli yuborildi.", successText: "Javoblaringiz ta’lim dasturlarini va ish beruvchilar bilan hamkorlikni takomillashtirish uchun ishlatiladi.", again: "Yangi so‘rovnomani to‘ldirish",
    error: "So‘rovnomani yuborib bo‘lmadi. Internet aloqasini tekshirib, qayta urinib ko‘ring.",
    yes: "Ha", no: "Yo‘q", unsure: "Javob berishga qiynalaman", other: "Boshqa",
  },
  en: {
    eyebrow: "Employer feedback",
    title: "Graduate Preparation Quality Survey",
    intro: "The Education Quality Control Department invites employers to assess graduate preparation, the practical relevance of educational programmes and opportunities for cooperation with the institute. Responses are analysed in aggregate.",
    time: "Completion time: 7–10 minutes",
    privacy: "Contact details are optional and are not published.",
    steps: ["Organisation", "Cooperation", "Preparation", "Suggestions", "Contacts"],
    next: "Next", back: "Back", submit: "Submit survey", required: "Complete the required fields in this section.", sending: "Submitting…",
    success: "Thank you! The survey was submitted.", successText: "Your responses will support improvements to educational programmes and employer engagement.", again: "Submit another response",
    error: "The survey could not be submitted. Check your connection and try again.",
    yes: "Yes", no: "No", unsure: "Not sure", other: "Other",
  },
} as const;

export const programmeOptions = [
  "Автоматизация технологических процессов и производств (Компьютерная мехатроника) — бакалавриат",
  "Биомедицинская инженерия — бакалавриат",
  "Автоматизация — магистратура",
  "Технология машиностроения, металлорежущие станки и инструменты — бакалавриат",
  "Оборудование и технология сварочного производства — бакалавриат",
  "Инженерно-педагогическая деятельность — магистратура",
  "Инновационные технологии в машиностроении — магистратура",
  "Автомобили, тракторы, мобильные и технологические комплексы — бакалавриат",
  "Организация дорожного движения и транспортное планирование — бакалавриат",
  "Транспорт — магистратура",
  "Метрология, стандартизация и контроль качества — бакалавриат",
  "Теплогазоснабжение и вентиляция зданий и сооружений — бакалавриат",
  "Строительство — магистратура",
  "Обеспечение качества — магистратура",
  "Экономика и управление — бакалавриат",
  "Транспортная логистика (международная логистика) — бакалавриат",
  "Управление инновационными проектами промышленных предприятий (менеджмент) — бакалавриат",
  "Инженерный бизнес — магистратура",
];

export const graduateQualities = [
  "Умение своевременно выполнять поставленные задачи",
  "Достаточный уровень теоретических знаний",
  "Практические умения и навыки",
  "Ответственность и производственная дисциплина",
  "Умение работать в команде",
  "Коммуникативные навыки",
  "Способность самостоятельно принимать решения",
  "Способность адаптироваться к новым условиям",
  "Владение цифровыми инструментами",
  "Знание требований охраны труда и техники безопасности",
];

export const cooperationOptions = [
  "Организация практики студентов",
  "Участие в разработке образовательных программ",
  "Участие в государственных аттестационных комиссиях",
  "Проведение мастер-классов и гостевых лекций",
  "Стажировки студентов и преподавателей",
  "Трудоустройство выпускников",
  "Совместные научные и практические проекты",
  "Целевая подготовка специалистов",
];

export const improvementOptions = [
  "Теоретические знания",
  "Практические навыки",
  "Работа с современным оборудованием",
  "Цифровые компетенции",
  "Иностранные языки",
  "Деловое общение",
  "Самостоятельное принятие решений",
  "Производственная дисциплина",
  "Содержание и продолжительность практики",
  "Существенных изменений не требуется",
];

export const ratingItems = [
  "Профессиональные компетенции",
  "Теоретические знания",
  "Практические умения и навыки",
  "Применение знаний на практике",
  "Владение современными технологиями и оборудованием",
  "Цифровые компетенции",
  "Самостоятельность при выполнении задач",
  "Ответственность и дисциплина",
  "Коммуникативные навыки и работа в команде",
  "Адаптация к изменениям в профессиональной деятельности",
];
