export const teacherSurveyQuestions = [
  "Преподаватель хорошо владеет содержанием преподаваемой дисциплины.",
  "Преподаватель объясняет учебный материал понятно, последовательно и доступно.",
  "Преподаватель связывает изучаемый материал с практическими задачами и будущей профессиональной деятельностью студентов.",
  "Занятия преподавателя организованы и проводятся в соответствии с утверждённым расписанием.",
  "Преподаватель использует методы и учебные материалы, которые помогают лучше усвоить дисциплину.",
  "Требования к выполнению заданий и критерии оценивания заранее понятны студентам.",
  "Преподаватель объективно и справедливо оценивает знания и выполненные работы студентов.",
  "Преподаватель уважительно относится к студентам, соблюдает нормы педагогической этики и поддерживает рабочую атмосферу на занятиях.",
] as const;

export const violationOptions = [
  "Нет, не сталкивался",
  "Необъективное оценивание",
  "Неуважительное отношение / давление",
  "Неправомерные требования",
  "Деньги, подарок или иная выгода",
  "Предпочитаю не отвечать",
] as const;

export const localizedTeacherSurvey = {
  ru: {
    questions: teacherSurveyQuestions,
    violations: violationOptions,
    ratingLabels: ["Не могу оценить", "Совершенно не согласен", "Скорее не согласен", "Частично согласен", "Скорее согласен", "Полностью согласен"],
  },
  uz: {
    questions: [
      "O‘qituvchi o‘zi o‘qitadigan fan mazmunini yaxshi biladi.",
      "O‘qituvchi o‘quv materialini tushunarli, izchil va sodda bayon qiladi.",
      "O‘qituvchi o‘rganilayotgan materialni amaliy vazifalar va talabalarning kelajakdagi kasbiy faoliyati bilan bog‘laydi.",
      "O‘qituvchining mashg‘ulotlari tasdiqlangan jadvalga muvofiq tashkil etiladi va o‘tkaziladi.",
      "O‘qituvchi fanni yaxshiroq o‘zlashtirishga yordam beradigan usullar va o‘quv materiallaridan foydalanadi.",
      "Topshiriqlarni bajarish talablari va baholash mezonlari talabalarga oldindan tushunarli.",
      "O‘qituvchi talabalar bilimini va bajarilgan ishlarni xolis hamda adolatli baholaydi.",
      "O‘qituvchi talabalarga hurmat bilan munosabatda bo‘ladi, pedagogik odob me’yorlariga rioya qiladi va mashg‘ulotlarda ishchan muhitni ta’minlaydi.",
    ],
    violations: [
      "Yo‘q, duch kelmaganman",
      "Xolis bo‘lmagan baholash",
      "Hurmatsiz munosabat / bosim",
      "Noqonuniy talablar",
      "Pul, sovg‘a yoki boshqa manfaat",
      "Javob bermaslikni afzal ko‘raman",
    ],
    ratingLabels: ["Baholay olmayman", "Mutlaqo qo‘shilmayman", "Ko‘proq qo‘shilmayman", "Qisman qo‘shilaman", "Ko‘proq qo‘shilaman", "To‘liq qo‘shilaman"],
  },
  en: {
    questions: [
      "The teacher has a strong command of the subject being taught.",
      "The teacher explains the learning material clearly, consistently and accessibly.",
      "The teacher connects the material with practical tasks and students’ future professional activity.",
      "Classes are organised and conducted according to the approved timetable.",
      "The teacher uses methods and learning materials that help students understand the subject.",
      "Assignment requirements and assessment criteria are clear to students in advance.",
      "The teacher assesses students’ knowledge and completed work objectively and fairly.",
      "The teacher treats students respectfully, follows professional ethics and maintains a productive classroom environment.",
    ],
    violations: [
      "No, I did not encounter any",
      "Biased assessment",
      "Disrespectful treatment / pressure",
      "Improper demands",
      "Money, a gift or another benefit",
      "Prefer not to answer",
    ],
    ratingLabels: ["Unable to assess", "Strongly disagree", "Rather disagree", "Partly agree", "Rather agree", "Strongly agree"],
  },
} as const;

export const ratingOptions = [
  { value: 5, label: "Полностью согласен" },
  { value: 4, label: "Скорее согласен" },
  { value: 3, label: "Частично согласен" },
  { value: 2, label: "Скорее не согласен" },
  { value: 1, label: "Совершенно не согласен" },
  { value: 0, label: "Не могу оценить" },
] as const;
