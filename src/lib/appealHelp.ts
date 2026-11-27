export type AppealLocale = "ru" | "uz" | "en";
type Localized = Record<AppealLocale, string>;
type Entry = { id: string; question: Localized; answer: Localized; target?: "form" | "track" | "contacts" | "documents" };

const copy = (ru: string, uz: string, en: string): Localized => ({ ru, uz, en });

export const appealHelp: readonly Entry[] = [
  { id: "submit", target: "form",
    question: copy("Как подать обращение?", "Murojaatni qanday yuboraman?", "How do I submit an appeal?"),
    answer: copy("Выберите категорию, укажите тему, опишите вопрос и отправьте форму. Сохраните номер обращения и код отслеживания.", "Toifani tanlang, mavzuni kiriting, savolingizni yozing va shaklni yuboring. Murojaat raqami va kuzatuv kodini saqlang.", "Choose a category, enter a subject, describe your question and submit the form. Save the reference number and tracking code.") },
  { id: "track", target: "track",
    question: copy("Как проверить статус и прочитать ответ?", "Holatni qanday tekshiraman va javobni qayerda o‘qiyman?", "How do I check the status and read a reply?"),
    answer: copy("В разделе «Проверить статус» введите номер обращения и код отслеживания. Там же отобразится ответ, когда сотрудник его отправит.", "«Holatni tekshirish» bo‘limiga murojaat raqami va kuzatuv kodini kiriting. Xodim yuborgan javob ham shu yerda ko‘rinadi.", "Enter your appeal number and tracking code in the status section. Any reply the office sends will appear there too.") },
  { id: "anonymous", target: "form",
    question: copy("Можно ли обратиться анонимно?", "Anonim murojaat yuborsam bo‘ladimi?", "Can I submit anonymously?"),
    answer: copy("Включите «Отправить анонимно». Ф.И.О., группа и контакты не сохраняются в отдельных полях. Если хотите сохранить анонимность, не указывайте эти сведения в тексте или файлах. Для просмотра ответа сохраните номер и код.", "«Anonim yuborish»ni belgilang. F.I.Sh., guruh va aloqa ma’lumotlari alohida maydonlarda saqlanmaydi. Anonimlikni saqlash uchun bu ma’lumotlarni matn yoki fayllarga kiritmang. Javobni ko‘rish uchun raqam va kodni saqlang.", "Select the anonymous option. Your name, group and contact details are not saved in dedicated fields. Leave them out of your text and attachments if you wish to stay anonymous. Save the number and code to read any reply.") },
  { id: "files",
    question: copy("Какие файлы можно приложить?", "Qanday fayllarni biriktirish mumkin?", "Which files can I attach?"),
    answer: copy("До трёх файлов, не более 5 МБ каждый: PDF, DOC, DOCX, JPG, JPEG или PNG. Приложения необязательны.", "PDF, DOC, DOCX, JPG, JPEG yoki PNG formatida uchtagacha fayl biriktirish mumkin. Har biri 5 MB dan oshmasligi kerak. Biriktirish majburiy emas.", "You can attach up to three files, each up to 5 MB: PDF, DOC, DOCX, JPG, JPEG or PNG. Attachments are optional.") },
  { id: "schedule", target: "form",
    question: copy("Куда сообщить об ошибке в расписании?", "Dars jadvalidagi xato haqida qayerga yozaman?", "Where do I report a timetable error?"),
    answer: copy("Выберите категорию «Расписание» и опишите, какая дата, пара или аудитория указана неверно. Если обращаетесь анонимно, не указывайте сведения, по которым вас можно узнать.", "«Dars jadvali» toifasini tanlang va qaysi sana, dars yoki auditoriya noto‘g‘ri ko‘rsatilganini yozing. Anonim murojaatda sizni tanib olishga yordam beradigan ma’lumotlarni kiritmang.", "Choose the schedule category and describe the incorrect date, class period or room. If submitting anonymously, leave out details that could identify you.") },
  { id: "contacts", target: "contacts",
    question: copy("Где найти контакты отдела?", "Bo‘limning aloqa ma’lumotlari qayerda?", "Where can I find the office’s contact details?"),
    answer: copy("Телефоны и электронную почту ищите в разделе «Контакты» на портале.", "Telefon raqamlari va elektron pochta manzillari portalning «Kontaktlar» bo‘limida berilgan.", "See the portal’s Contacts page for telephone numbers and email addresses.") },
  { id: "documents", target: "documents",
    question: copy("Где найти опубликованные документы?", "E’lon qilingan hujjatlarni qayerdan topaman?", "Where can I find published documents?"),
    answer: copy("Откройте раздел «Документы». Для вопроса о конкретном документе укажите в форме его название.", "«Hujjatlar» bo‘limini oching. Muayyan hujjat bo‘yicha savolingiz bo‘lsa, shaklda uning nomini ko‘rsating.", "Open the Documents section. If your question concerns a specific document, include its title in the form.") },
  { id: "code", target: "track",
    question: copy("Как найти номер и код отслеживания?", "Raqam va kuzatuv kodini qayerdan olaman?", "Where do I find my number and tracking code?"),
    answer: copy("Оба значения показывает портал после успешной отправки формы. Обычная проверка статуса требует и номер, и код.", "Shakl muvaffaqiyatli yuborilgach, portal ikkala qiymatni ham ko‘rsatadi. Holatni tekshirish uchun raqam ham, kod ham kerak.", "The portal shows both values after a successful submission. You need both to check the status.") },
  { id: "technical", target: "form",
    question: copy("Что указать при технической проблеме?", "Texnik muammo yuz bersa, nimalarni yozaman?", "What should I include in a technical report?"),
    answer: copy("Укажите, на какой странице произошла ошибка, что вы делали перед ней и какой текст ошибки увидели. Не прикладывайте пароли, коды или снимки экрана с личными данными.", "Xato qaysi sahifada yuz berganini, undan oldin nima qilganingizni va xato matnini yozing. Parol, kod yoki shaxsiy ma’lumotlar ko‘rinadigan suratlarni biriktirmang.", "Tell us which page you used, what you did before the error and what it said. Do not include passwords, codes or screenshots showing personal information.") },
  { id: "suggestion", target: "form",
    question: copy("Как предложить улучшение?", "Taklifni qanday yuboraman?", "How can I suggest an improvement?"),
    answer: copy("Выберите категорию «Предложение». Опишите, что стоит изменить и кому это поможет.", "«Taklif» toifasini tanlang. Nimani o‘zgartirish kerakligini va bu kimga yordam berishini yozing.", "Choose the suggestion category. Explain what should change and who would benefit.") },
  { id: "updates",
    question: copy("Обязательно ли оставлять контакты?", "Aloqa ma’lumotlarini qoldirish shartmi?", "Do I have to leave contact details?"),
    answer: copy("Способ связи заполняется по желанию. Статус и ответ можно проверить по номеру и коду, которые портал выдаёт при отправке.", "Aloqa usulini ko‘rsatish ixtiyoriy. Holat va javobni portal yuborish vaqtida bergan raqam va kod bilan tekshirish mumkin.", "Contact details are optional. You can check the status and read replies using the number and code shown after submission.") },
  { id: "preview",
    question: copy("Быстрая справка регистрирует обращение?", "Tezkor yordam murojaatni ro‘yxatga oladimi?", "Does Quick Help register my appeal?"),
    answer: copy("Справка показывает общие инструкции. Чтобы зарегистрировать обращение и получить номер и код, отправьте форму на этой странице.", "Tezkor yordam umumiy yo‘riqnomalarni ko‘rsatadi. Murojaatni ro‘yxatga olish, raqam va kodni olish uchun shu sahifadagi shaklni yuboring.", "Quick Help shows general guidance. Submit the form on this page to register an appeal and get a number and code.") },
  { id: "notfound", target: "track",
    question: copy("Почему обращение не находится?", "Nega murojaat topilmayapti?", "Why can’t I find my appeal?"),
    answer: copy("Сверьте номер и код с подтверждением отправки. Убедитесь, что вставили их в соответствующие поля. Не сообщайте код другим людям.", "Raqam va kodni yuborish tasdig‘idagi qiymatlar bilan solishtiring. Ularni tegishli maydonlarga kiriting. Kodni boshqa odamlarga bermang.", "Check the number and code against your submission confirmation. Make sure each is in the right field. Keep your tracking code private.") },
  { id: "category", target: "form",
    question: copy("Что делать, если не подходит ни одна категория?", "Hech bir toifa mos kelmasa, nima qilaman?", "What if none of the categories fit?"),
    answer: copy("Выберите «Другое». Укажите в теме главный вопрос, а подробности опишите в тексте обращения.", "«Boshqa» toifasini tanlang. Asosiy savolni mavzuda, tafsilotlarni murojaat matnida yozing.", "Choose Other. Put the main question in the subject and explain the details in the body.") },
  { id: "privacy",
    question: copy("Какие данные не стоит указывать?", "Qaysi ma’lumotlarni yozmaslik kerak?", "What information should I leave out?"),
    answer: copy("Не отправляйте пароли, банковские реквизиты и коды подтверждения. Вкладывайте только материалы, необходимые для рассмотрения вопроса.", "Parollar, bank rekvizitlari va tasdiqlash kodlarini yubormang. Savolni ko‘rib chiqish uchun zarur materiallarnigina biriktiring.", "Do not send passwords, banking details or verification codes. Attach only the material necessary to review your question.") },
];

const standardCategories = new Set(["schedule", "technical", "suggestion"]);
export const allowsAppealTemplates = (category: unknown, status: unknown) =>
  typeof category === "string" && standardCategories.has(category) &&
  typeof status === "string" && ["submitted", "registered", "assigned", "in_review", "clarification"].includes(status);

export const appealReplyTemplates = [
  { id: "schedule", title: copy("Уточнить расписание", "Jadvalni aniqlashtirish", "Clarify a timetable issue"),
    body: copy("Спасибо за обращение. Чтобы проверить расписание, уточните дату, время и дисциплину, по которым возник вопрос.", "Murojaatingiz uchun rahmat. Jadvalni tekshirish uchun savol tug‘ilgan sana, vaqt va fan nomini aniqlashtirishingizni so‘raymiz.", "Thank you for getting in touch. To check the timetable, please clarify the date, time and subject involved.") },
  { id: "technical", title: copy("Уточнить техническую проблему", "Texnik muammoni aniqlashtirish", "Clarify a technical issue"),
    body: copy("Спасибо за сообщение. Уточните, на какой странице возникла проблема и что вы увидели на экране. Пожалуйста, не отправляйте пароли, коды и снимки экрана с личными данными.", "Xabaringiz uchun rahmat. Muammo qaysi sahifada yuz berganini va ekranda nima ko‘ringanini yozing. Parollar, kodlar va shaxsiy ma’lumotlar ko‘rinadigan suratlarni yubormang.", "Thank you for reporting this. Please tell us which page you were on and what you saw on screen. Do not send passwords, codes or screenshots containing personal information.") },
  { id: "suggestion", title: copy("Подтвердить получение предложения", "Taklif olinganini tasdiqlash", "Acknowledge a suggestion"),
    body: copy("Спасибо за предложение. Мы его получили. Это сообщение подтверждает получение и не означает, что решение о предложенном изменении принято.", "Taklifingiz uchun rahmat. Biz uni oldik. Ushbu xabar taklif olinganini tasdiqlaydi; taklif etilgan o‘zgarish bo‘yicha qaror qabul qilinganini anglatmaydi.", "Thank you for your suggestion. We have received it. This message confirms receipt; it does not indicate that a decision has been made on the proposed change.") },
] as const;
