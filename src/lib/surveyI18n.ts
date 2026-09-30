// Translate displayed labels while preserving canonical stored answers.
const translations: Record<string, { uz: string; en: string }> = {
  "Общая информация": {
    "uz": "Umumiy ma’lumotlar",
    "en": "General information"
  },
  "Качество обучения": {
    "uz": "Ta’lim sifati",
    "en": "Education quality"
  },
  "Трудоустройство": {
    "uz": "Ishga joylashish",
    "en": "Employment"
  },
  "Проверка": {
    "uz": "Tekshirish",
    "en": "Review"
  },
  "Общие сведения": {
    "uz": "Umumiy ma’lumotlar",
    "en": "General information"
  },
  "Обучение и наука": {
    "uz": "Ta’lim va ilmiy faoliyat",
    "en": "Education and research"
  },
  "Предложения": {
    "uz": "Takliflar",
    "en": "Suggestions"
  },
  "Не удалось отправить анкету. Попробуйте ещё раз.": {
    "uz": "So‘rovnomani yuborib bo‘lmadi. Qayta urinib ko‘ring.",
    "en": "The survey could not be submitted. Please try again."
  },
  "Ответ сохранён анонимно и уже учтён в мониторинге отдела качества.": {
    "uz": "Javobingiz anonim saqlandi va sifat bo‘limi monitoringida hisobga olindi.",
    "en": "Your response was saved anonymously and included in the quality department’s monitoring."
  },
  "Опрос выпускников Института": {
    "uz": "Institut bitiruvchilari so‘rovnomasi",
    "en": "Institute graduate survey"
  },
  "Опрос докторантов об условиях обучения и научной деятельности": {
    "uz": "Doktorantlarning ta’lim va ilmiy faoliyat sharoitlari bo‘yicha so‘rovnoma",
    "en": "Doctoral survey on education and research conditions"
  },
  "Система качества": {
    "uz": "Sifat tizimi",
    "en": "Quality system"
  },
  "Ваши ответы помогут оценить качество образовательных программ, условия обучения и востребованность полученных знаний и навыков на рынке труда.": {
    "uz": "Javoblaringiz ta’lim dasturlari sifatini, o‘qish sharoitlarini hamda olingan bilim va ko‘nikmalarning mehnat bozoridagi talabga mosligini baholashga yordam beradi.",
    "en": "Your responses will help assess programme quality, learning conditions and the relevance of acquired knowledge and skills to the labour market."
  },
  "Ответы помогут улучшить условия обучения, научно-исследовательской работы и поддержки докторантов Института.": {
    "uz": "Javoblaringiz institut doktorantlarining ta’lim, ilmiy tadqiqot va qo‘llab-quvvatlash sharoitlarini yaxshilashga yordam beradi.",
    "en": "Your responses will help improve education, research and support for the institute’s doctoral students."
  },
  "5–7 минут": {
    "uz": "5–7 daqiqa",
    "en": "5–7 minutes"
  },
  "Год окончания Института": {
    "uz": "Institutni tamomlagan yil",
    "en": "Year of graduation from the institute"
  },
  "Факультет": {
    "uz": "Fakultet",
    "en": "Faculty"
  },
  "Инженерные системы": {
    "uz": "Muhandislik tizimlari",
    "en": "Engineering systems"
  },
  "Прикладные технические квалификации": {
    "uz": "Amaliy texnik malakalar",
    "en": "Applied technical qualifications"
  },
  "Направление подготовки / специальность": {
    "uz": "Ta’lim yo‘nalishi / mutaxassislik",
    "en": "Programme / specialty"
  },
  "Ваша текущая занятость": {
    "uz": "Hozirgi bandlik holatingiz",
    "en": "Current employment status"
  },
  "Работаю по полученной специальности": {
    "uz": "O‘z mutaxassisligim bo‘yicha ishlayman",
    "en": "Employed in my field of study"
  },
  "Работаю не по специальности": {
    "uz": "Boshqa sohada ishlayman",
    "en": "Employed outside my field of study"
  },
  "Продолжаю обучение": {
    "uz": "O‘qishni davom ettiryapman",
    "en": "Continuing my education"
  },
  "Временно не работаю, ищу работу": {
    "uz": "Vaqtincha ishlamayman, ish qidiryapman",
    "en": "Currently unemployed and looking for work"
  },
  "Временно не работаю и не ищу работу": {
    "uz": "Vaqtincha ishlamayman va ish qidirmayapman",
    "en": "Currently not working or looking for work"
  },
  "Нахожусь в декретном отпуске / по уходу за ребёнком": {
    "uz": "Homiladorlik yoki bola parvarishi ta’tilidaman",
    "en": "On maternity / parental leave"
  },
  "Другое": {
    "uz": "Boshqa",
    "en": "Other"
  },
  "Если Вы работаете, укажите название организации и должность (необязательно)": {
    "uz": "Agar ishlayotgan bo‘lsangiz, tashkilot nomi va lavozimingizni ko‘rsating (ixtiyoriy)",
    "en": "If employed, state your organisation and position (optional)"
  },
  "Направление подготовки (специальность) *": {
    "uz": "Ta’lim yo‘nalishi (mutaxassislik) *",
    "en": "Programme (specialty) *"
  },
  "Курс обучения": {
    "uz": "O‘qish bosqichi",
    "en": "Year of study"
  },
  "1-й курс": {
    "uz": "1-bosqich",
    "en": "Year 1"
  },
  "2-й курс": {
    "uz": "2-bosqich",
    "en": "Year 2"
  },
  "3-й курс": {
    "uz": "3-bosqich",
    "en": "Year 3"
  },
  "Форма докторантуры": {
    "uz": "Doktorantura shakli",
    "en": "Doctoral study mode"
  },
  "Базовая докторантура (PhD)": {
    "uz": "Tayanch doktorantura (PhD)",
    "en": "Basic doctoral studies (PhD)"
  },
  "Докторантура (DSc)": {
    "uz": "Doktorantura (DSc)",
    "en": "Doctoral studies (DSc)"
  },
  "Самостоятельный соискатель": {
    "uz": "Mustaqil izlanuvchi",
    "en": "Independent researcher"
  },
  ". 3 — затрудняюсь ответить / удовлетворён(а) частично.": {
    "uz": ". 3 — javob berishga qiynalaman / qisman qoniqaman.",
    "en": ". 3 — unsure / partly satisfied."
  },
  "Через какой период после окончания Института Вы нашли первую работу?": {
    "uz": "Institutni tugatgandan keyin qancha vaqtda birinchi ishni topdingiz?",
    "en": "How soon after graduation did you find your first job?"
  },
  "До окончания обучения": {
    "uz": "O‘qishni tugatishdan oldin",
    "en": "Before graduation"
  },
  "В течение 3 месяцев": {
    "uz": "3 oy ichida",
    "en": "Within 3 months"
  },
  "От 3 до 6 месяцев": {
    "uz": "3 oydan 6 oygacha",
    "en": "Within 3–6 months"
  },
  "Более 6 месяцев": {
    "uz": "6 oydan keyin",
    "en": "After more than 6 months"
  },
  "Пока не трудоустроился(ась)": {
    "uz": "Hali ishga joylashmadim",
    "en": "Not yet employed"
  },
  "Какие компетенции следует усилить? (можно выбрать несколько)": {
    "uz": "Qaysi kompetensiyalarni kuchaytirish kerak? (bir nechta tanlash mumkin)",
    "en": "Which competencies need strengthening? (select all that apply)"
  },
  "Практические профессиональные навыки": {
    "uz": "Amaliy kasbiy ko‘nikmalar",
    "en": "Practical professional skills"
  },
  "Работа с современным оборудованием": {
    "uz": "Zamonaviy uskunalar bilan ishlash",
    "en": "Working with modern equipment"
  },
  "Цифровые технологии и программное обеспечение": {
    "uz": "Raqamli texnologiyalar va dasturiy ta’minot",
    "en": "Digital technologies and software"
  },
  "Иностранные языки": {
    "uz": "Xorijiy tillar",
    "en": "Foreign languages"
  },
  "Коммуникативные навыки и работа в команде": {
    "uz": "Muloqot ko‘nikmalari va jamoada ishlash",
    "en": "Communication and teamwork"
  },
  "Предпринимательские навыки": {
    "uz": "Tadbirkorlik ko‘nikmalari",
    "en": "Entrepreneurial skills"
  },
  "Какие дисциплины, темы или практические занятия необходимо добавить или расширить?": {
    "uz": "Qaysi fanlar, mavzular yoki amaliy mashg‘ulotlarni qo‘shish yoki kengaytirish kerak?",
    "en": "Which subjects, topics or practical classes should be added or expanded?"
  },
  "Что необходимо улучшить в деятельности Института?": {
    "uz": "Institut faoliyatida nimalarni yaxshilash kerak?",
    "en": "What should be improved at the institute?"
  },
  "Рекомендовали бы Вы обучение в Институте своим знакомым?": {
    "uz": "Tanishlaringizga institutda o‘qishni tavsiya qilasizmi?",
    "en": "Would you recommend studying at the institute to others?"
  },
  "Да": {
    "uz": "Ha",
    "en": "Yes"
  },
  "Скорее да": {
    "uz": "Ko‘proq ha",
    "en": "Probably yes"
  },
  "Скорее нет": {
    "uz": "Ko‘proq yo‘q",
    "en": "Probably no"
  },
  "Нет": {
    "uz": "Yo‘q",
    "en": "No"
  },
  "Дополнительные предложения и пожелания": {
    "uz": "Qo‘shimcha taklif va istaklar",
    "en": "Additional suggestions and wishes"
  },
  "Какие трудности Вы испытываете в процессе обучения и выполнения диссертационного исследования?": {
    "uz": "Ta’lim va dissertatsiya tadqiqoti jarayonida qanday qiyinchiliklarga duch kelyapsiz?",
    "en": "What difficulties do you face in your studies and dissertation research?"
  },
  "Какие условия или виды поддержки необходимо улучшить в первую очередь?": {
    "uz": "Qaysi sharoitlar yoki yordam turlarini birinchi navbatda yaxshilash kerak?",
    "en": "Which conditions or types of support should be improved first?"
  },
  "Ваши предложения по повышению качества подготовки докторантов": {
    "uz": "Doktorantlar tayyorgarligi sifatini oshirish bo‘yicha takliflaringiz",
    "en": "Your suggestions for improving doctoral education"
  },
  "Анкета готова к отправке.": {
    "uz": "So‘rovnoma yuborishga tayyor.",
    "en": "Your survey is ready to submit."
  },
  "Ответы сохраняются без имени, Student ID, телефона и электронной почты. В админ-панели отображается только обобщённая аналитика и анонимные комментарии.": {
    "uz": "Javoblar ism, Student ID, telefon va elektron pochta manzilisiz saqlanadi. Admin panelda faqat umumlashtirilgan tahlil va anonim izohlar ko‘rsatiladi.",
    "en": "Responses are stored without names, Student IDs, phone numbers or email addresses. The admin panel shows aggregate analytics and anonymous comments only."
  },
  "Выберите вариант": {
    "uz": "Variantni tanlang",
    "en": "Choose an option"
  },
  "Наименование организации": {
    "uz": "Tashkilot nomi",
    "en": "Organisation name"
  },
  "Сфера деятельности организации": {
    "uz": "Tashkilot faoliyat sohasi",
    "en": "Organisation’s field of activity"
  },
  "Ваша должность": {
    "uz": "Lavozimingiz",
    "en": "Your position"
  },
  "Количество выпускников института в организации": {
    "uz": "Tashkilotdagi institut bitiruvchilari soni",
    "en": "Number of institute graduates in your organisation"
  },
  "Более 10": {
    "uz": "10 nafardan ortiq",
    "en": "More than 10"
  },
  "В настоящее время не работают": {
    "uz": "Hozirda ishlamaydi",
    "en": "None currently employed"
  },
  "Выпускники каких направлений работают в организации?": {
    "uz": "Tashkilotda qaysi yo‘nalish bitiruvchilari ishlaydi?",
    "en": "Graduates of which programmes work in your organisation?"
  },
  "Другое направление": {
    "uz": "Boshqa yo‘nalish",
    "en": "Other programme"
  },
  "Участвуете ли Вы в разработке образовательных программ?": {
    "uz": "Ta’lim dasturlarini ishlab chiqishda ishtirok etasizmi?",
    "en": "Do you participate in developing educational programmes?"
  },
  "Участвуете ли Вы в работе аттестационных комиссий?": {
    "uz": "Attestatsiya komissiyalari ishida ishtirok etasizmi?",
    "en": "Do you participate in examination boards?"
  },
  "Пока нет, но заинтересованы": {
    "uz": "Hozircha yo‘q, lekin qiziqamiz",
    "en": "Not yet, but interested"
  },
  "Как Ваша организация участвует в практической подготовке?": {
    "uz": "Tashkilotingiz amaliy tayyorgarlikda qanday ishtirok etadi?",
    "en": "How does your organisation support practical training?"
  },
  "Принимает студентов на практику": {
    "uz": "Talabalarni amaliyotga qabul qiladi",
    "en": "Hosts student placements"
  },
  "Участвует в практических занятиях": {
    "uz": "Amaliy mashg‘ulotlarda ishtirok etadi",
    "en": "Participates in practical classes"
  },
  "Проводит мастер-классы и консультации": {
    "uz": "Mahorat darslari va maslahatlar o‘tkazadi",
    "en": "Provides masterclasses and consultations"
  },
  "Пока не участвует": {
    "uz": "Hozircha ishtirok etmaydi",
    "en": "Not currently involved"
  },
  "Заинтересована в сотрудничестве": {
    "uz": "Hamkorlikka qiziqadi",
    "en": "Interested in cooperation"
  },
  "Какими качествами обладают выпускники?": {
    "uz": "Bitiruvchilar qanday sifatlarga ega?",
    "en": "Which qualities do graduates possess?"
  },
  "Оцените уровень подготовки выпускников по шкале от 1 до 10": {
    "uz": "Bitiruvchilar tayyorgarligini 1 dan 10 gacha baholang",
    "en": "Rate graduate preparation on a scale of 1 to 10"
  },
  "Общая оценка подготовки студентов, проходивших практику": {
    "uz": "Amaliyot o‘tagan talabalar tayyorgarligining umumiy bahosi",
    "en": "Overall preparation of students on placements"
  },
  "Не могу оценить": {
    "uz": "Baholay olmayman",
    "en": "Unable to assess"
  },
  "Соответствие образовательных программ требованиям рынка труда": {
    "uz": "Ta’lim dasturlarining mehnat bozori talablariga mosligi",
    "en": "Alignment of programmes with labour market requirements"
  },
  "Полностью соответствует": {
    "uz": "To‘liq mos keladi",
    "en": "Fully aligned"
  },
  "В основном соответствует": {
    "uz": "Asosan mos keladi",
    "en": "Mostly aligned"
  },
  "Частично соответствует": {
    "uz": "Qisman mos keladi",
    "en": "Partly aligned"
  },
  "Не соответствует": {
    "uz": "Mos kelmaydi",
    "en": "Not aligned"
  },
  "Готовы ли Вы принимать выпускников института на работу?": {
    "uz": "Institut bitiruvchilarini ishga qabul qilishga tayyormisiz?",
    "en": "Are you willing to hire institute graduates?"
  },
  "В зависимости от вакансий": {
    "uz": "Bo‘sh ish o‘rinlariga qarab",
    "en": "Depending on vacancies"
  },
  "Насколько готовы рекомендовать выпускников? (0–10)": {
    "uz": "Bitiruvchilarni tavsiya qilishga qanchalik tayyorsiz? (0–10)",
    "en": "How likely are you to recommend graduates? (0–10)"
  },
  "Перспективные направления сотрудничества": {
    "uz": "Istiqbolli hamkorlik yo‘nalishlari",
    "en": "Promising areas of cooperation"
  },
  "Что следует улучшить в подготовке выпускников?": {
    "uz": "Bitiruvchilar tayyorgarligida nimalarni yaxshilash kerak?",
    "en": "What should be improved in graduate preparation?"
  },
  "Наиболее востребованные знания и компетенции": {
    "uz": "Eng talabgir bilim va kompetensiyalar",
    "en": "Most in-demand knowledge and competencies"
  },
  "Дополнительные предложения": {
    "uz": "Qo‘shimcha takliflar",
    "en": "Additional suggestions"
  },
  "Готовы ли Вы к дальнейшему сотрудничеству?": {
    "uz": "Kelgusida hamkorlik qilishga tayyormisiz?",
    "en": "Are you willing to cooperate in the future?"
  },
  "При наличии конкретных предложений": {
    "uz": "Aniq takliflar bo‘lsa",
    "en": "If there are specific proposals"
  },
  "Контактные данные заполняются добровольно.": {
    "uz": "Aloqa ma’lumotlari ixtiyoriy ko‘rsatiladi.",
    "en": "Contact details are optional."
  },
  "Они могут использоваться только для связи по вопросам сотрудничества.": {
    "uz": "Ular faqat hamkorlik masalalari bo‘yicha bog‘lanish uchun ishlatilishi mumkin.",
    "en": "They may only be used to contact you about cooperation."
  },
  "Ф.И.О. представителя": {
    "uz": "Vakilning F.I.Sh.",
    "en": "Representative’s full name"
  },
  "Телефон": {
    "uz": "Telefon",
    "en": "Phone"
  },
  "Подтверждаю достоверность информации и согласен(на) на обработку предоставленных данных для анализа качества подготовки специалистов и организации взаимодействия с работодателями.": {
    "uz": "Ma’lumotlarning to‘g‘riligini tasdiqlayman va mutaxassislar tayyorgarligi sifatini tahlil qilish hamda ish beruvchilar bilan hamkorlikni tashkil etish uchun taqdim etilgan ma’lumotlarni qayta ishlashga roziman.",
    "en": "I confirm the information is accurate and consent to its processing to analyse professional training quality and organise employer cooperation."
  },
  "Подтвердите, что вы не робот.": {
    "uz": "Robot emasligingizni tasdiqlang.",
    "en": "Please confirm you are not a robot."
  },
  "Слишком много обращений. Попробуйте через час.": {
    "uz": "Murojaatlar soni ko‘p. Bir soatdan keyin qayta urinib ko‘ring.",
    "en": "Too many appeals. Please try again in an hour."
  },
  "Не удалось отправить обращение. Проверьте поля и попробуйте снова.": {
    "uz": "Murojaatni yuborib bo‘lmadi. Maydonlarni tekshirib, qayta urinib ko‘ring.",
    "en": "The appeal could not be submitted. Check the fields and try again."
  },
  "Обращение или код отслеживания не найдены.": {
    "uz": "Murojaat yoki kuzatish kodi topilmadi.",
    "en": "The appeal or tracking code was not found."
  },
  "Обращение принято": {
    "uz": "Murojaat qabul qilindi",
    "en": "Appeal received"
  },
  "Сохраните номер и код. Они нужны для проверки статуса и ответа администрации.": {
    "uz": "Raqam va kodni saqlang. Ular murojaat holati va ma’muriyat javobini tekshirish uchun kerak.",
    "en": "Save the number and code. You need them to check the status and the administration’s response."
  },
  "Номер:": {
    "uz": "Raqam:",
    "en": "Number:"
  },
  "Код отслеживания:": {
    "uz": "Kuzatish kodi:",
    "en": "Tracking code:"
  },
  "Отправить другое обращение": {
    "uz": "Boshqa murojaat yuborish",
    "en": "Submit another appeal"
  },
  "Направить обращение": {
    "uz": "Murojaat yuborish",
    "en": "Submit an appeal"
  },
  "Все поля передаются по защищённому соединению.": {
    "uz": "Barcha ma’lumotlar himoyalangan ulanish orqali yuboriladi.",
    "en": "All information is sent over a secure connection."
  },
  "Категория *": {
    "uz": "Toifa *",
    "en": "Category *"
  },
  "Выберите категорию": {
    "uz": "Toifani tanlang",
    "en": "Choose a category"
  },
  "Тема *": {
    "uz": "Mavzu *",
    "en": "Subject *"
  },
  "Опишите вопрос или предложение *": {
    "uz": "Savol yoki taklifingizni bayon qiling *",
    "en": "Describe your concern or suggestion *"
  },
  "Отправить анонимно": {
    "uz": "Anonim yuborish",
    "en": "Submit anonymously"
  },
  "Имя и контакты не будут запрашиваться. Ответ можно проверить по коду.": {
    "uz": "Ism va aloqa ma’lumotlari so‘ralmaydi. Javobni kod orqali tekshirish mumkin.",
    "en": "No name or contact details will be requested. You can check the response using your code."
  },
  "Ф.И.О. *": {
    "uz": "F.I.Sh. *",
    "en": "Full name *"
  },
  "Учебная группа": {
    "uz": "O‘quv guruhi",
    "en": "Study group"
  },
  "Способ связи": {
    "uz": "Aloqa usuli",
    "en": "Contact method"
  },
  "Без обратной связи": {
    "uz": "Qayta aloqasiz",
    "en": "No follow-up contact"
  },
  "Электронная почта": {
    "uz": "Elektron pochta",
    "en": "Email"
  },
  "Номер, @username или e-mail": {
    "uz": "Raqam, @username yoki e-mail",
    "en": "Phone number, @username or email"
  },
  "Приложения": {
    "uz": "Ilovalar",
    "en": "Attachments"
  },
  "До 3 файлов, каждый не более 5 МБ.": {
    "uz": "3 tagacha fayl, har biri 5 MB dan oshmasligi kerak.",
    "en": "Up to 3 files, no more than 5 MB each."
  },
  "Отправляем…": {
    "uz": "Yuborilmoqda…",
    "en": "Submitting…"
  },
  "Отправить обращение": {
    "uz": "Murojaatni yuborish",
    "en": "Submit appeal"
  },
  "Конфиденциальность": {
    "uz": "Maxfiylik",
    "en": "Confidentiality"
  },
  "Обращения видит только администратор сайта с двухфакторной защитой. Пароли, банковские данные и коды подтверждения указывать не нужно.": {
    "uz": "Murojaatlarni faqat ikki bosqichli himoyaga ega sayt administratori ko‘radi. Parollar, bank ma’lumotlari va tasdiqlash kodlarini kiritmang.",
    "en": "Only the site administrator protected by two-factor authentication can view appeals. Do not include passwords, banking details or verification codes."
  },
  "Проверить статус": {
    "uz": "Holatni tekshirish",
    "en": "Check status"
  },
  "Номер обращения": {
    "uz": "Murojaat raqami",
    "en": "Appeal number"
  },
  "Код отслеживания": {
    "uz": "Kuzatish kodi",
    "en": "Tracking code"
  },
  "Проверить": {
    "uz": "Tekshirish",
    "en": "Check"
  },
  "Статус:": {
    "uz": "Holat:",
    "en": "Status:"
  },
  "Тема:": {
    "uz": "Mavzu:",
    "en": "Subject:"
  },
  "Ответ администрации:": {
    "uz": "Ma’muriyat javobi:",
    "en": "Administration’s response:"
  },
  "Опрос выпускников": {
    "uz": "Bitiruvchilar so‘rovnomasi",
    "en": "Graduate survey"
  },
  "Опрос докторантов": {
    "uz": "Doktorantlar so‘rovnomasi",
    "en": "Doctoral survey"
  },
  "Мониторинг обновляется сразу после поступления новой анкеты": {
    "uz": "Yangi so‘rovnoma kelganda monitoring yangilanadi",
    "en": "Monitoring is updated when new responses arrive"
  },
  "Экспорт CSV": {
    "uz": "CSV eksporti",
    "en": "Export CSV"
  },
  "Всего анкет": {
    "uz": "Jami so‘rovnomalar",
    "en": "Total responses"
  },
  "За 7 дней": {
    "uz": "7 kun ichida",
    "en": "Last 7 days"
  },
  "Средняя общая оценка": {
    "uz": "O‘rtacha umumiy baho",
    "en": "Average overall rating"
  },
  "Рекомендуют Институт": {
    "uz": "Institutni tavsiya qiladi",
    "en": "Recommend the institute"
  },
  "Рекомендуют докторантуру": {
    "uz": "Doktoranturani tavsiya qiladi",
    "en": "Recommend doctoral studies"
  },
  "Все направления": {
    "uz": "Barcha yo‘nalishlar",
    "en": "All programmes"
  },
  "Все формы докторантуры": {
    "uz": "Doktoranturaning barcha shakllari",
    "en": "All doctoral study modes"
  },
  "Дата от": {
    "uz": "Boshlanish sanasi",
    "en": "From date"
  },
  "Дата до": {
    "uz": "Tugash sanasi",
    "en": "To date"
  },
  "Средние оценки": {
    "uz": "O‘rtacha baholar",
    "en": "Average ratings"
  },
  "Количество по категориям": {
    "uz": "Toifalar bo‘yicha soni",
    "en": "Response counts by category"
  },
  "Пока нет данных": {
    "uz": "Hozircha ma’lumot yo‘q",
    "en": "No data yet"
  },
  "Анонимные ответы и комментарии": {
    "uz": "Anonim javoblar va izohlar",
    "en": "Anonymous responses and comments"
  },
  "Загрузка…": {
    "uz": "Yuklanmoqda…",
    "en": "Loading…"
  },
  "Выбранные компетенции:": {
    "uz": "Tanlangan kompetensiyalar:",
    "en": "Selected competencies:"
  },
  "Анкеты пока не поступили": {
    "uz": "Hozircha so‘rovnomalar kelmagan",
    "en": "No responses received yet"
  },
  "Автоматизация технологических процессов и производств (Компьютерная мехатроника)": {
    "uz": "Texnologik jarayonlar va ishlab chiqarishni avtomatlashtirish (kompyuter mexatronikasi)",
    "en": "Automation of technological processes and production (computer mechatronics)"
  },
  "Биомедицинская инженерия": {
    "uz": "Biotibbiyot muhandisligi",
    "en": "Biomedical engineering"
  },
  "Технология машиностроения, металлорежущие станки и инструменты": {
    "uz": "Mashinasozlik texnologiyasi, metall kesish dastgohlari va asboblari",
    "en": "Mechanical engineering technology, metal-cutting machines and tools"
  },
  "Оборудование и технология сварочного производства": {
    "uz": "Payvandlash ishlab chiqarish uskunalari va texnologiyasi",
    "en": "Welding equipment and technology"
  },
  "Автомобили, тракторы, мобильные и технологические комплексы": {
    "uz": "Avtomobillar, traktorlar, mobil va texnologik majmualar",
    "en": "Automobiles, tractors, mobile and technological systems"
  },
  "Организация дорожного движения и транспортное планирование": {
    "uz": "Yo‘l harakatini tashkil etish va transportni rejalashtirish",
    "en": "Traffic management and transport planning"
  },
  "Метрология, стандартизация и контроль качества": {
    "uz": "Metrologiya, standartlashtirish va sifat nazorati",
    "en": "Metrology, standardisation and quality control"
  },
  "Теплогазоснабжение и вентиляция зданий и сооружений": {
    "uz": "Bino va inshootlarning issiqlik va gaz ta’minoti hamda ventilyatsiyasi",
    "en": "Heat and gas supply and ventilation of buildings and structures"
  },
  "Управление инновационными проектами промышленных предприятий (менеджмент)": {
    "uz": "Sanoat korxonalarining innovatsion loyihalarini boshqarish (menejment)",
    "en": "Management of innovative projects in industrial enterprises"
  },
  "Экономика и управление": {
    "uz": "Iqtisodiyot va boshqaruv",
    "en": "Economics and management"
  },
  "Транспортная логистика (международная логистика)": {
    "uz": "Transport logistikasi (xalqaro logistika)",
    "en": "Transport logistics (international logistics)"
  },
  "Инженерный бизнес": {
    "uz": "Muhandislik biznesi",
    "en": "Engineering business"
  },
  "Строительство": {
    "uz": "Qurilish",
    "en": "Construction"
  },
  "Обеспечение качества": {
    "uz": "Sifatni ta’minlash",
    "en": "Quality assurance"
  },
  "Транспорт": {
    "uz": "Transport",
    "en": "Transport"
  },
  "Инновационные технологии в машиностроении": {
    "uz": "Mashinasozlikdagi innovatsion texnologiyalar",
    "en": "Innovative technologies in mechanical engineering"
  },
  "Инженерно-педагогическая деятельность": {
    "uz": "Muhandislik-pedagogik faoliyat",
    "en": "Engineering and teaching"
  },
  "Автоматизация": {
    "uz": "Avtomatlashtirish",
    "en": "Automation"
  },
  "Обучение в Институте дало мне знания, необходимые для профессиональной деятельности.": {
    "uz": "Institutdagi ta’lim kasbiy faoliyatim uchun zarur bilimlarni berdi.",
    "en": "Studying at the institute gave me the knowledge needed for my professional work."
  },
  "Полученные практические навыки помогают мне в работе или дальнейшем обучении.": {
    "uz": "Olgan amaliy ko‘nikmalarim ishda yoki keyingi ta’limda yordam beradi.",
    "en": "The practical skills I acquired help me at work or in further study."
  },
  "Учебные дисциплины соответствовали современным требованиям профессии и работодателей.": {
    "uz": "O‘quv fanlari kasb va ish beruvchilarning zamonaviy talablariga mos edi.",
    "en": "The subjects met current professional and employer requirements."
  },
  "Преподаватели доступно и качественно объясняли учебный материал.": {
    "uz": "O‘qituvchilar o‘quv materialini tushunarli va sifatli tushuntirishdi.",
    "en": "Teachers explained the material clearly and effectively."
  },
  "В процессе обучения использовались современные технологии, оборудование и программные средства.": {
    "uz": "Ta’lim jarayonida zamonaviy texnologiyalar, uskunalar va dasturiy vositalardan foydalanildi.",
    "en": "Modern technologies, equipment and software were used in teaching."
  },
  "Производственная практика была полезной для моего профессионального развития.": {
    "uz": "Ishlab chiqarish amaliyoti kasbiy rivojlanishim uchun foydali bo‘ldi.",
    "en": "Work placements were useful for my professional development."
  },
  "В Институте были созданы условия для развития самостоятельности, ответственности и профессиональных компетенций.": {
    "uz": "Institutda mustaqillik, mas’uliyat va kasbiy kompetensiyalarni rivojlantirish uchun sharoitlar yaratildi.",
    "en": "The institute provided conditions for developing independence, responsibility and professional competencies."
  },
  "Я получил(а) достаточные навыки работы в команде, делового общения и решения практических задач.": {
    "uz": "Jamoada ishlash, ishbilarmonlik muloqoti va amaliy masalalarni hal qilish bo‘yicha yetarli ko‘nikmalar oldim.",
    "en": "I acquired sufficient teamwork, business communication and practical problem-solving skills."
  },
  "В целом я удовлетворён(а) качеством полученного образования.": {
    "uz": "Umuman olganda, olgan ta’limim sifatidan qoniqaman.",
    "en": "Overall, I am satisfied with the quality of my education."
  },
  "Насколько понятны Вам цели, задачи и требования образовательной программы докторантуры?": {
    "uz": "Doktorantura dasturining maqsadlari, vazifalari va talablari sizga qanchalik tushunarli?",
    "en": "How clear are the objectives, tasks and requirements of the doctoral programme?"
  },
  "Насколько своевременно Вы получаете информацию о документах, сроках, аттестации и мероприятиях для докторантов?": {
    "uz": "Hujjatlar, muddatlar, attestatsiya va doktorantlar tadbirlari haqida ma’lumotni qanchalik o‘z vaqtida olasiz?",
    "en": "How promptly do you receive information about documents, deadlines, assessments and doctoral events?"
  },
  "Насколько содержание учебных занятий и научных семинаров соответствует Вашему направлению исследования?": {
    "uz": "Darslar va ilmiy seminarlar mazmuni tadqiqot yo‘nalishingizga qanchalik mos?",
    "en": "How well do classes and research seminars match your research area?"
  },
  "Насколько учебные дисциплины помогают Вам в подготовке диссертационного исследования?": {
    "uz": "O‘quv fanlari dissertatsiya tadqiqotingizni tayyorlashda qanchalik yordam beradi?",
    "en": "How useful are the subjects for your dissertation research?"
  },
  "Насколько удобно составлено расписание занятий, консультаций и научных мероприятий?": {
    "uz": "Darslar, maslahatlar va ilmiy tadbirlar jadvali qanchalik qulay?",
    "en": "How convenient is the schedule of classes, consultations and research events?"
  },
  "Насколько Вы удовлетворены работой научного руководителя (научного консультанта)?": {
    "uz": "Ilmiy rahbar (ilmiy maslahatchi) faoliyatidan qanchalik qoniqasiz?",
    "en": "How satisfied are you with your research supervisor or adviser?"
  },
  "Насколько регулярно Вы получаете консультации и рекомендации по диссертационному исследованию?": {
    "uz": "Dissertatsiya tadqiqoti bo‘yicha maslahat va tavsiyalarni qanchalik muntazam olasiz?",
    "en": "How regularly do you receive advice and recommendations on your dissertation?"
  },
  "Насколько доступен научный руководитель для обсуждения текущих вопросов?": {
    "uz": "Joriy masalalarni muhokama qilish uchun ilmiy rahbar bilan bog‘lanish qanchalik oson?",
    "en": "How accessible is your supervisor for discussing current issues?"
  },
  "Насколько Вам оказывается помощь в выборе темы, уточнении плана и методологии исследования?": {
    "uz": "Mavzu tanlash, tadqiqot rejasi va metodologiyasini aniqlashtirishda sizga qanchalik yordam beriladi?",
    "en": "How much support do you receive in choosing a topic and refining your research plan and methodology?"
  },
  "Насколько доступны библиотечные фонды, электронные ресурсы и научные базы данных?": {
    "uz": "Kutubxona fondlari, elektron resurslar va ilmiy ma’lumotlar bazalaridan foydalanish qanchalik qulay?",
    "en": "How accessible are library collections, electronic resources and research databases?"
  },
  "Насколько условия Института позволяют пользоваться компьютерами, интернетом, лабораториями и необходимым оборудованием?": {
    "uz": "Institut sharoitlari kompyuter, internet, laboratoriya va zarur uskunalardan foydalanishga qanchalik imkon beradi?",
    "en": "How well do institute facilities support access to computers, internet, laboratories and necessary equipment?"
  },
  "Насколько Вы удовлетворены организацией научных конференций, семинаров, круглых столов и других научных мероприятий?": {
    "uz": "Ilmiy konferensiyalar, seminarlar, davra suhbatlari va boshqa ilmiy tadbirlar tashkil etilishidan qanchalik qoniqasiz?",
    "en": "How satisfied are you with the organisation of conferences, seminars, round tables and other research events?"
  },
  "Насколько Вам оказывается поддержка при подготовке научных статей, тезисов, патентов и иных результатов исследования?": {
    "uz": "Ilmiy maqolalar, tezislar, patentlar va boshqa tadqiqot natijalarini tayyorlashda sizga qanchalik yordam beriladi?",
    "en": "How much support do you receive in preparing papers, abstracts, patents and other research outputs?"
  },
  "Насколько понятен порядок публикации научных работ и предъявляемые к ним требования?": {
    "uz": "Ilmiy ishlarni nashr etish tartibi va ularga qo‘yiladigan talablar qanchalik tushunarli?",
    "en": "How clear are the publication procedures and requirements for research papers?"
  },
  "Насколько эффективно организованы процедуры промежуточной и итоговой аттестации докторантов?": {
    "uz": "Doktorantlarning oraliq va yakuniy attestatsiyasi qanchalik samarali tashkil etilgan?",
    "en": "How effectively are interim and final doctoral assessments organised?"
  },
  "Насколько объективно и прозрачно оцениваются результаты Вашей учебной и научной деятельности?": {
    "uz": "Ta’lim va ilmiy faoliyatingiz natijalari qanchalik xolis va shaffof baholanadi?",
    "en": "How fairly and transparently are your education and research outcomes assessed?"
  },
  "Насколько сотрудники Института оперативно помогают в решении организационных и учебных вопросов?": {
    "uz": "Institut xodimlari tashkiliy va o‘quv masalalarini hal qilishda qanchalik tez yordam beradi?",
    "en": "How promptly do institute staff help with administrative and academic issues?"
  },
  "Насколько Вы удовлетворены общей образовательной и научной средой Института?": {
    "uz": "Institutning umumiy ta’lim va ilmiy muhitidan qanchalik qoniqasiz?",
    "en": "How satisfied are you with the institute’s overall education and research environment?"
  },
  "Насколько вероятно, что Вы порекомендуете обучение в докторантуре Института своим коллегам?": {
    "uz": "Hamkasblaringizga institut doktoranturasida o‘qishni tavsiya qilish ehtimolingiz qanchalik yuqori?",
    "en": "How likely are you to recommend the institute’s doctoral studies to colleagues?"
  },
  "Затрудняюсь ответить": {
    "uz": "Javob berishga qiynalaman",
    "en": "Not sure"
  },
  "Умение своевременно выполнять поставленные задачи": {
    "uz": "Vazifalarni o‘z vaqtida bajarish",
    "en": "Completing tasks on time"
  },
  "Достаточный уровень теоретических знаний": {
    "uz": "Yetarli nazariy bilim",
    "en": "Sufficient theoretical knowledge"
  },
  "Практические умения и навыки": {
    "uz": "Amaliy bilim va ko‘nikmalar",
    "en": "Practical skills"
  },
  "Ответственность и производственная дисциплина": {
    "uz": "Mas’uliyat va ishlab chiqarish intizomi",
    "en": "Responsibility and workplace discipline"
  },
  "Умение работать в команде": {
    "uz": "Jamoada ishlash",
    "en": "Teamwork"
  },
  "Коммуникативные навыки": {
    "uz": "Muloqot ko‘nikmalari",
    "en": "Communication skills"
  },
  "Способность самостоятельно принимать решения": {
    "uz": "Mustaqil qaror qabul qilish qobiliyati",
    "en": "Independent decision-making"
  },
  "Способность адаптироваться к новым условиям": {
    "uz": "Yangi sharoitlarga moslashish qobiliyati",
    "en": "Adapting to new conditions"
  },
  "Владение цифровыми инструментами": {
    "uz": "Raqamli vositalardan foydalanish",
    "en": "Using digital tools"
  },
  "Знание требований охраны труда и техники безопасности": {
    "uz": "Mehnat muhofazasi va xavfsizlik talablarini bilish",
    "en": "Knowledge of occupational health and safety requirements"
  },
  "Организация практики студентов": {
    "uz": "Talabalar amaliyotini tashkil etish",
    "en": "Organising student placements"
  },
  "Участие в разработке образовательных программ": {
    "uz": "Ta’lim dasturlarini ishlab chiqishda ishtirok etish",
    "en": "Developing educational programmes"
  },
  "Участие в государственных аттестационных комиссиях": {
    "uz": "Davlat attestatsiya komissiyalarida ishtirok etish",
    "en": "Participating in state examination boards"
  },
  "Проведение мастер-классов и гостевых лекций": {
    "uz": "Mahorat darslari va mehmon ma’ruzalarini o‘tkazish",
    "en": "Providing masterclasses and guest lectures"
  },
  "Стажировки студентов и преподавателей": {
    "uz": "Talabalar va o‘qituvchilar stajirovkasi",
    "en": "Student and teacher internships"
  },
  "Трудоустройство выпускников": {
    "uz": "Bitiruvchilarni ishga joylashtirish",
    "en": "Graduate employment"
  },
  "Совместные научные и практические проекты": {
    "uz": "Qo‘shma ilmiy va amaliy loyihalar",
    "en": "Joint research and practical projects"
  },
  "Целевая подготовка специалистов": {
    "uz": "Mutaxassislarni maqsadli tayyorlash",
    "en": "Targeted specialist training"
  },
  "Теоретические знания": {
    "uz": "Nazariy bilimlar",
    "en": "Theoretical knowledge"
  },
  "Практические навыки": {
    "uz": "Amaliy ko‘nikmalar",
    "en": "Practical skills"
  },
  "Цифровые компетенции": {
    "uz": "Raqamli kompetensiyalar",
    "en": "Digital competencies"
  },
  "Деловое общение": {
    "uz": "Ishbilarmonlik muloqoti",
    "en": "Business communication"
  },
  "Самостоятельное принятие решений": {
    "uz": "Mustaqil qaror qabul qilish",
    "en": "Independent decision-making"
  },
  "Производственная дисциплина": {
    "uz": "Ishlab chiqarish intizomi",
    "en": "Workplace discipline"
  },
  "Содержание и продолжительность практики": {
    "uz": "Amaliyot mazmuni va davomiyligi",
    "en": "Placement content and duration"
  },
  "Существенных изменений не требуется": {
    "uz": "Jiddiy o‘zgarishlar talab qilinmaydi",
    "en": "No major changes needed"
  },
  "Профессиональные компетенции": {
    "uz": "Kasbiy kompetensiyalar",
    "en": "Professional competencies"
  },
  "Применение знаний на практике": {
    "uz": "Bilimlarni amalda qo‘llash",
    "en": "Applying knowledge in practice"
  },
  "Владение современными технологиями и оборудованием": {
    "uz": "Zamonaviy texnologiya va uskunalardan foydalanish",
    "en": "Using modern technologies and equipment"
  },
  "Самостоятельность при выполнении задач": {
    "uz": "Vazifalarni mustaqil bajarish",
    "en": "Independence in completing tasks"
  },
  "Ответственность и дисциплина": {
    "uz": "Mas’uliyat va intizom",
    "en": "Responsibility and discipline"
  },
  "Адаптация к изменениям в профессиональной деятельности": {
    "uz": "Kasbiy faoliyatdagi o‘zgarishlarga moslashish",
    "en": "Adapting to professional changes"
  },
  "Анонимно": {
    "uz": "Anonim",
    "en": "Anonymous"
  },
  "Анонимное обращение": {
    "uz": "Anonim murojaat",
    "en": "Anonymous appeal"
  },
  "Новое": {
    "uz": "Yangi",
    "en": "New"
  },
  "Администратор": {
    "uz": "Administrator",
    "en": "Administrator"
  },
  "Студент": {
    "uz": "Talaba",
    "en": "Student"
  },
  "Выбрать файлы": {
    "uz": "Fayllarni tanlash",
    "en": "Choose files"
  },
  "Файлы не выбраны": {
    "uz": "Fayllar tanlanmagan",
    "en": "No files selected"
  },
  "Не удалось проверить статус. Попробуйте ещё раз.": {
    "uz": "Holatni tekshirib bo‘lmadi. Qayta urinib ko‘ring.",
    "en": "Unable to check the status. Please try again."
  },
  "Логотип института": {
    "uz": "Institut logotipi",
    "en": "Institute logo"
  },
  "Главная": {
    "uz": "Bosh sahifa",
    "en": "Home"
  },
  "Русский": {
    "uz": "Rus tili",
    "en": "Russian"
  },
  "Узбекский": {
    "uz": "O‘zbek tili",
    "en": "Uzbek"
  },
  "Английский": {
    "uz": "Ingliz tili",
    "en": "English"
  },
  "Открыть →": {
    "uz": "Ochish →",
    "en": "Open →"
  },
  "Подробнее →": {
    "uz": "Batafsil →",
    "en": "Learn more →"
  },
  "Документы": {
    "uz": "Hujjatlar",
    "en": "Documents"
  },
  "Все документы →": {
    "uz": "Barcha hujjatlar →",
    "en": "All documents →"
  },
  "Новости": {
    "uz": "Yangiliklar",
    "en": "News"
  },
  "Последние новости": {
    "uz": "So‘nggi yangiliklar",
    "en": "Latest news"
  },
  "Все новости →": {
    "uz": "Barcha yangiliklar →",
    "en": "All news →"
  },
  "Читать подробнее →": {
    "uz": "Batafsil o‘qish →",
    "en": "Read more →"
  },
  "Мониторинг": {
    "uz": "Monitoring",
    "en": "Monitoring"
  },
  "Аналитика": {
    "uz": "Tahlil",
    "en": "Analytics"
  },
  "Посещаемость, успеваемость и качество занятий.": {
    "uz": "Davomat, o‘zlashtirish va darslar sifati.",
    "en": "Attendance, academic performance and teaching quality."
  },
  "Сводные показатели и аналитические материалы.": {
    "uz": "Umumlashtirilgan ko‘rsatkichlar va tahliliy materiallar.",
    "en": "Summary indicators and analytical materials."
  },
  "Ответы на часто задаваемые вопросы.": {
    "uz": "Ko‘p beriladigan savollarga javoblar.",
    "en": "Answers to frequently asked questions."
  },
  "Обращения": {
    "uz": "Murojaatlar",
    "en": "Appeals"
  },
  "Предложения, замечания и вопросы по качеству образования.": {
    "uz": "Ta’lim sifati bo‘yicha takliflar, mulohazalar va savollar.",
    "en": "Suggestions, concerns and questions about education quality."
  },
  "Админ-панель": {
    "uz": "Admin panel",
    "en": "Admin panel"
  },
  "Управление новостями, документами и сотрудниками.": {
    "uz": "Yangiliklar, hujjatlar va xodimlarni boshqarish.",
    "en": "Manage news, documents and employees."
  },
  "Сервисы": {
    "uz": "Xizmatlar",
    "en": "Services"
  },
  "Быстрые сервисы отдела": {
    "uz": "Bo‘limning tezkor xizmatlari",
    "en": "Quick department services"
  },
  "CAPTCHA ещё не настроена администратором.": {
    "uz": "Administrator CAPTCHA ni hali sozlamagan.",
    "en": "CAPTCHA has not yet been configured by the administrator."
  },
  "Ошибка загрузки сотрудника": {
    "uz": "Xodim ma’lumotlarini yuklashda xatolik",
    "en": "Unable to load employee"
  },
  "Сотрудник не найден": {
    "uz": "Xodim topilmadi",
    "en": "Employee not found"
  },
  "Запись с идентификатором": {
    "uz": "Quyidagi identifikatorli yozuv",
    "en": "The record with ID"
  },
  "недоступна или была удалена.": {
    "uz": "mavjud emas yoki o‘chirilgan.",
    "en": "is unavailable or has been deleted."
  },
  "Редактирование сотрудника": {
    "uz": "Xodim ma’lumotlarini tahrirlash",
    "en": "Edit employee"
  },
  "Редактировать новость": {
    "uz": "Yangilikni tahrirlash",
    "en": "Edit news"
  },
  "Добавить новость": {
    "uz": "Yangilik qo‘shish",
    "en": "Add news"
  },
  "Управление новостями сайта": {
    "uz": "Sayt yangiliklarini boshqarish",
    "en": "Manage site news"
  },
  "+ Новая новость": {
    "uz": "+ Yangi yangilik",
    "en": "+ New article"
  },
  "Аналитические показатели деятельности отдела.": {
    "uz": "Bo‘lim faoliyatining tahliliy ko‘rsatkichlari.",
    "en": "Analytical indicators of department activity."
  },
  "Мониторинги": {
    "uz": "Monitoringlar",
    "en": "Monitoring activities"
  },
  "Отчёты": {
    "uz": "Hisobotlar",
    "en": "Reports"
  },
  "Проведение мониторинга качества образования и размещение результатов.": {
    "uz": "Ta’lim sifati monitoringini o‘tkazish va natijalarni joylashtirish.",
    "en": "Monitor education quality and publish results."
  },
  "Здесь будут формы мониторинга, результаты проверок и публикация материалов.": {
    "uz": "Bu yerda monitoring shakllari, tekshiruv natijalari va materiallar joylashtiriladi.",
    "en": "Monitoring forms, review results and materials will be published here."
  },
  "Контроль прохождения": {
    "uz": "O‘tish holati nazorati",
    "en": "Completion tracking"
  },
  "Тест по HEMIS": {
    "uz": "HEMIS bo‘yicha test",
    "en": "HEMIS test"
  },
  "Отображаются преподаватели, которые самостоятельно зарегистрировались.": {
    "uz": "Mustaqil ro‘yxatdan o‘tgan o‘qituvchilar ko‘rsatiladi.",
    "en": "Shows teachers who registered themselves."
  },
  "Скачать Excel/CSV": {
    "uz": "Excel/CSV yuklab olish",
    "en": "Download Excel/CSV"
  },
  "Зарегистрировано": {
    "uz": "Ro‘yxatdan o‘tgan",
    "en": "Registered"
  },
  "Успешно прошли": {
    "uz": "Muvaffaqiyatli o‘tgan",
    "en": "Passed"
  },
  "Не начали": {
    "uz": "Boshlamagan",
    "en": "Not started"
  },
  "Не набрали 80%": {
    "uz": "80% to‘plamagan",
    "en": "Below 80%"
  },
  "Поиск по Ф.И.О., кафедре или почте": {
    "uz": "F.I.Sh., kafedra yoki pochta bo‘yicha qidirish",
    "en": "Search by name, department or email"
  },
  "Все статусы": {
    "uz": "Barcha holatlar",
    "en": "All statuses"
  },
  "Регистрация:": {
    "uz": "Ro‘yxatdan o‘tish:",
    "en": "Registered:"
  },
  "Попыток:": {
    "uz": "Urinishlar:",
    "en": "Attempts:"
  },
  "Записи не найдены.": {
    "uz": "Yozuvlar topilmadi.",
    "en": "No records found."
  },
  "Загрузка реестра…": {
    "uz": "Ro‘yxat yuklanmoqda…",
    "en": "Loading register…"
  },
  "Не удалось загрузить реестр. Сначала выполните SQL-файл установки модуля в Supabase.": {
    "uz": "Ro‘yxatni yuklab bo‘lmadi. Avval Supabase da modulni o‘rnatish SQL faylini bajaring.",
    "en": "Unable to load the register. Run the module setup SQL file in Supabase first."
  },
  "Не начал": {
    "uz": "Boshlamagan",
    "en": "Not started"
  },
  "Пройден": {
    "uz": "O‘tgan",
    "en": "Passed"
  },
  "Не набран проходной балл": {
    "uz": "O‘tish bali to‘planmagan",
    "en": "Pass mark not reached"
  },
  "Ф.И.О.": {
    "uz": "F.I.Sh.",
    "en": "Full name"
  },
  "Кафедра и должность": {
    "uz": "Kafedra va lavozim",
    "en": "Department and position"
  },
  "Контакты": {
    "uz": "Aloqa ma’lumotlari",
    "en": "Contacts"
  },
  "Результат": {
    "uz": "Natija",
    "en": "Result"
  },
  "Статус": {
    "uz": "Holat",
    "en": "Status"
  },
  "Удалить": {
    "uz": "O‘chirish",
    "en": "Delete"
  },
  "Удалить эту новость?": {
    "uz": "Ushbu yangilik o‘chirilsinmi?",
    "en": "Delete this article?"
  },
  "Ошибка удаления:": {
    "uz": "O‘chirishda xatolik:",
    "en": "Deletion error:"
  },
  "Заголовок RU": {
    "uz": "Sarlavha RU",
    "en": "Title RU"
  },
  "Заголовок UZ": {
    "uz": "Sarlavha UZ",
    "en": "Title UZ"
  },
  "Заголовок EN": {
    "uz": "Sarlavha EN",
    "en": "Title EN"
  },
  "Текст RU": {
    "uz": "Matn RU",
    "en": "Text RU"
  },
  "Текст UZ": {
    "uz": "Matn UZ",
    "en": "Text UZ"
  },
  "Текст EN": {
    "uz": "Matn EN",
    "en": "Text EN"
  },
  "Категория": {
    "uz": "Toifa",
    "en": "Category"
  },
  "Ошибка сохранения:": {
    "uz": "Saqlashda xatolik:",
    "en": "Save error:"
  },
  "Новость обновлена!": {
    "uz": "Yangilik yangilandi!",
    "en": "Article updated!"
  },
  "Сохраняется...": {
    "uz": "Saqlanmoqda...",
    "en": "Saving..."
  },
  "Сохранить изменения": {
    "uz": "O‘zgarishlarni saqlash",
    "en": "Save changes"
  },
  "Ошибка загрузки фото:": {
    "uz": "Rasmni yuklashda xatolik:",
    "en": "Photo upload error:"
  },
  "Новость успешно опубликована!": {
    "uz": "Yangilik muvaffaqiyatli e’lon qilindi!",
    "en": "Article published successfully!"
  },
  "Новая новость": {
    "uz": "Yangi yangilik",
    "en": "New article"
  },
  "Текст новости RU": {
    "uz": "Yangilik matni RU",
    "en": "Article text RU"
  },
  "Текст новости UZ": {
    "uz": "Yangilik matni UZ",
    "en": "Article text UZ"
  },
  "Текст новости EN": {
    "uz": "Yangilik matni EN",
    "en": "Article text EN"
  },
  "Категория, например: Новости": {
    "uz": "Toifa, masalan: Yangiliklar",
    "en": "Category, e.g. News"
  },
  "Публикация...": {
    "uz": "E’lon qilinmoqda...",
    "en": "Publishing..."
  },
  "Опубликовать новость": {
    "uz": "Yangilikni e’lon qilish",
    "en": "Publish article"
  },
  "• Список": {
    "uz": "• Ro‘yxat",
    "en": "• List"
  },
  "Список": {
    "uz": "Ro‘yxat",
    "en": "List"
  },
  "Текст": {
    "uz": "Matn",
    "en": "Text"
  },
  "Заголовок": {
    "uz": "Sarlavha",
    "en": "Heading"
  },
  "Вход для преподавателя": {
    "uz": "O‘qituvchi uchun kirish",
    "en": "Teacher sign-in"
  },
  "Войдите, чтобы пройти тест по работе с HEMIS": {
    "uz": "HEMIS bo‘yicha testni topshirish uchun tizimga kiring",
    "en": "Sign in to take the HEMIS test"
  },
  "Пароль": {
    "uz": "Parol",
    "en": "Password"
  },
  "Нет учётной записи?": {
    "uz": "Hisobingiz yo‘qmi?",
    "en": "Don’t have an account?"
  },
  "Зарегистрироваться": {
    "uz": "Ro‘yxatdan o‘tish",
    "en": "Register"
  },
  "Регистрация преподавателя": {
    "uz": "O‘qituvchini ro‘yxatdan o‘tkazish",
    "en": "Teacher registration"
  },
  "Заполните данные самостоятельно. Они будут доступны администратору системы качества.": {
    "uz": "Ma’lumotlarni o‘zingiz kiriting. Ular sifat tizimi administratoriga ko‘rinadi.",
    "en": "Enter your details. They will be visible to the quality system administrator."
  },
  "Ф.И.О. полностью *": {
    "uz": "To‘liq F.I.Sh. *",
    "en": "Full name *"
  },
  "Кафедра / подразделение *": {
    "uz": "Kafedra / bo‘linma *",
    "en": "Department / unit *"
  },
  "Должность *": {
    "uz": "Lavozim *",
    "en": "Position *"
  },
  "Номер телефона": {
    "uz": "Telefon raqami",
    "en": "Phone number"
  },
  "Электронная почта *": {
    "uz": "Elektron pochta *",
    "en": "Email *"
  },
  "Пароль (не менее 8 символов) *": {
    "uz": "Parol (kamida 8 ta belgi) *",
    "en": "Password (at least 8 characters) *"
  },
  "Повторите пароль *": {
    "uz": "Parolni takrorlang *",
    "en": "Confirm password *"
  },
  "Подтверждаю достоверность указанных сведений и даю согласие на их обработку для организации тестирования.": {
    "uz": "Kiritilgan ma’lumotlarning to‘g‘riligini tasdiqlayman va testni tashkil etish uchun ularni qayta ishlashga roziman.",
    "en": "I confirm these details are accurate and consent to their processing to organise testing."
  },
  "Уже зарегистрированы?": {
    "uz": "Ro‘yxatdan o‘tganmisiz?",
    "en": "Already registered?"
  },
  "Войти": {
    "uz": "Kirish",
    "en": "Sign in"
  },
  "Неверная электронная почта или пароль.": {
    "uz": "Elektron pochta yoki parol noto‘g‘ri.",
    "en": "Incorrect email or password."
  },
  "Выполняется вход…": {
    "uz": "Kirilmoqda…",
    "en": "Signing in…"
  },
  "Пароли не совпадают.": {
    "uz": "Parollar mos kelmaydi.",
    "en": "Passwords do not match."
  },
  "Необходимо подтвердить согласие на обработку данных.": {
    "uz": "Ma’lumotlarni qayta ishlashga rozilikni tasdiqlang.",
    "en": "Please confirm your consent to data processing."
  },
  "Ошибка регистрации.": {
    "uz": "Ro‘yxatdan o‘tishda xatolik.",
    "en": "Registration failed."
  },
  "Создаём учётную запись…": {
    "uz": "Hisob yaratilmoqda…",
    "en": "Creating account…"
  },
  "Зарегистрироваться и перейти к тесту": {
    "uz": "Ro‘yxatdan o‘tish va testga o‘tish",
    "en": "Register and start the test"
  },
  "Загружаем тест…": {
    "uz": "Test yuklanmoqda…",
    "en": "Loading test…"
  },
  "Проверка цифровых компетенций": {
    "uz": "Raqamli kompetensiyalarni tekshirish",
    "en": "Digital competency assessment"
  },
  "Знание функций HEMIS": {
    "uz": "HEMIS funksiyalarini bilish",
    "en": "Knowledge of HEMIS features"
  },
  "Выйти": {
    "uz": "Chiqish",
    "en": "Sign out"
  },
  "Вопросов": {
    "uz": "Savollar",
    "en": "Questions"
  },
  "Проходной балл": {
    "uz": "O‘tish bali",
    "en": "Pass mark"
  },
  "Лучший результат": {
    "uz": "Eng yaxshi natija",
    "en": "Best result"
  },
  "из": {
    "uz": "/",
    "en": "of"
  },
  "Пройти ещё раз": {
    "uz": "Qayta topshirish",
    "en": "Take again"
  },
  "Вопрос": {
    "uz": "Savol",
    "en": "Question"
  },
  "Отвечено:": {
    "uz": "Javob berildi:",
    "en": "Answered:"
  },
  "Ответьте на все вопросы перед отправкой.": {
    "uz": "Yuborishdan oldin barcha savollarga javob bering.",
    "en": "Answer all questions before submitting."
  },
  "Не удалось проверить тест.": {
    "uz": "Testni tekshirib bo‘lmadi.",
    "en": "Unable to grade the test."
  },
  "Тест успешно пройден": {
    "uz": "Test muvaffaqiyatli topshirildi",
    "en": "Test passed"
  },
  "Рекомендуется пройти тест повторно": {
    "uz": "Testni qayta topshirish tavsiya etiladi",
    "en": "Please retake the test"
  },
  "Проверяем…": {
    "uz": "Tekshirilmoqda…",
    "en": "Checking…"
  },
  "Завершить и узнать результат": {
    "uz": "Yakunlash va natijani ko‘rish",
    "en": "Finish and view result"
  },
  "В каком разделе HEMIS преподаватель формирует содержание дисциплины по отдельным темам?": {
    "uz": "HEMIS ning qaysi bo‘limida o‘qituvchi fan mazmunini alohida mavzular bo‘yicha shakllantiradi?",
    "en": "In which HEMIS section does a teacher organise subject content by topic?"
  },
  "Учебные занятия → Расписание": {
    "uz": "O‘quv mashg‘ulotlari → Dars jadvali",
    "en": "Classes → Schedule"
  },
  "База предметов → Темы предметов": {
    "uz": "Fanlar bazasi → Fan mavzulari",
    "en": "Subject database → Subject topics"
  },
  "Научный процесс → Научная активность": {
    "uz": "Ilmiy jarayon → Ilmiy faollik",
    "en": "Research process → Research activity"
  },
  "Сотрудники → Индивидуальный план": {
    "uz": "Xodimlar → Shaxsiy reja",
    "en": "Employees → Individual plan"
  },
  "Темы закреплённой дисциплины находятся в разделе «База предметов → Темы предметов».": {
    "uz": "Biriktirilgan fan mavzulari «Fanlar bazasi → Fan mavzulari» bo‘limida joylashgan.",
    "en": "Assigned subject topics are in “Subject database → Subject topics”."
  },
  "Какой подраздел предназначен для размещения электронных учебных материалов по дисциплине?": {
    "uz": "Fan bo‘yicha elektron o‘quv materiallari qaysi kichik bo‘limga joylashtiriladi?",
    "en": "Which subsection is used to upload electronic learning materials for a subject?"
  },
  "Ресурсы предмета": {
    "uz": "Fan resurslari",
    "en": "Subject resources"
  },
  "Задачи предмета": {
    "uz": "Fan topshiriqlari",
    "en": "Subject tasks"
  },
  "Журнал оценок": {
    "uz": "Baholash jurnali",
    "en": "Grade book"
  },
  "Календарный план": {
    "uz": "Taqvimiy reja",
    "en": "Calendar plan"
  },
  "Файлы и учебные материалы размещаются в подразделе «Ресурсы предмета».": {
    "uz": "Fayllar va o‘quv materiallari «Fan resurslari» kichik bo‘limiga joylashtiriladi.",
    "en": "Files and learning materials are uploaded to “Subject resources”."
  },
  "В каком подразделе преподаватель создаёт задания, относящиеся к конкретной дисциплине?": {
    "uz": "O‘qituvchi muayyan fanga oid topshiriqlarni qaysi kichik bo‘limda yaratadi?",
    "en": "Where does a teacher create tasks for a specific subject?"
  },
  "Информация предмета": {
    "uz": "Fan haqida ma’lumot",
    "en": "Subject information"
  },
  "Расписание": {
    "uz": "Dars jadvali",
    "en": "Schedule"
  },
  "Методические публикации": {
    "uz": "Uslubiy nashrlar",
    "en": "Teaching publications"
  },
  "Для создания задач по дисциплине используется подраздел «Задачи предмета».": {
    "uz": "Fan topshiriqlarini yaratish uchun «Fan topshiriqlari» kichik bo‘limidan foydalaniladi.",
    "en": "Subject tasks are created in “Subject tasks”."
  },
  "Какой подраздел используется для работы с заданиями, выдаваемыми студентам в рамках курса?": {
    "uz": "Kurs doirasida talabalarga beriladigan topshiriqlar bilan qaysi kichik bo‘limda ishlanadi?",
    "en": "Which subsection is used to manage assignments given to students within a course?"
  },
  "Задания курса": {
    "uz": "Kurs topshiriqlari",
    "en": "Course assignments"
  },
  "Проведение урока": {
    "uz": "Darsni o‘tkazish",
    "en": "Conduct lesson"
  },
  "Индивидуальный план": {
    "uz": "Shaxsiy reja",
    "en": "Individual plan"
  },
  "Работа с заданиями курса выполняется в одноимённом подразделе «Задания курса».": {
    "uz": "Kurs topshiriqlari bilan «Kurs topshiriqlari» kichik bo‘limida ishlanadi.",
    "en": "Course assignments are managed in “Course assignments”."
  },
  "Где формируется календарная последовательность изучения учебного материала?": {
    "uz": "O‘quv materialini o‘rganishning taqvimiy ketma-ketligi qayerda tuziladi?",
    "en": "Where is the calendar sequence for studying learning material prepared?"
  },
  "Журнал посещаемости": {
    "uz": "Davomat jurnali",
    "en": "Attendance register"
  },
  "Темы предметов": {
    "uz": "Fan mavzulari",
    "en": "Subject topics"
  },
  "Научная активность": {
    "uz": "Ilmiy faollik",
    "en": "Research activity"
  },
  "Последовательность тем и занятий отражается в «Календарном плане».": {
    "uz": "Mavzular va mashg‘ulotlar ketma-ketligi «Taqvimiy reja»da aks ettiriladi.",
    "en": "The sequence of topics and classes is shown in the “Calendar plan”."
  },
  "Какой подраздел содержит основные сведения о закреплённой дисциплине?": {
    "uz": "Biriktirilgan fan haqidagi asosiy ma’lumotlar qaysi kichik bo‘limda joylashgan?",
    "en": "Which subsection contains key information about an assigned subject?"
  },
  "Список уроков": {
    "uz": "Darslar ro‘yxati",
    "en": "Lesson list"
  },
  "Итоговый контроль": {
    "uz": "Yakuniy nazorat",
    "en": "Final assessment"
  },
  "Основные сведения доступны в подразделе «Информация предмета».": {
    "uz": "Asosiy ma’lumotlar «Fan haqida ma’lumot» kichik bo‘limida mavjud.",
    "en": "Key details are available in “Subject information”."
  },
  "Где преподаватель просматривает своё расписание занятий?": {
    "uz": "O‘qituvchi o‘z dars jadvalini qayerda ko‘radi?",
    "en": "Where can a teacher view their class schedule?"
  },
  "База предметов → Ресурсы предмета": {
    "uz": "Fanlar bazasi → Fan resurslari",
    "en": "Subject database → Subject resources"
  },
  "Расписание находится в разделе «Учебные занятия → Расписание».": {
    "uz": "Dars jadvali «O‘quv mashg‘ulotlari → Dars jadvali» bo‘limida joylashgan.",
    "en": "The schedule is in “Classes → Schedule”."
  },
  "Какая функция используется для регистрации факта проведения занятия?": {
    "uz": "Dars o‘tkazilganini qayd etish uchun qaysi funksiyadan foydalaniladi?",
    "en": "Which function records that a class has been held?"
  },
  "Научные публикации": {
    "uz": "Ilmiy nashrlar",
    "en": "Research publications"
  },
  "Факт проведения занятия фиксируется через функцию «Проведение урока».": {
    "uz": "Dars o‘tkazilgani «Darsni o‘tkazish» funksiyasi orqali qayd etiladi.",
    "en": "A completed class is recorded using “Conduct lesson”."
  },
  "В каком подразделе отмечается присутствие или отсутствие студентов?": {
    "uz": "Talabalarning borligi yoki yo‘qligi qaysi kichik bo‘limda belgilanadi?",
    "en": "Where is student attendance or absence recorded?"
  },
  "Посещаемость фиксируется в «Журнале посещаемости».": {
    "uz": "Davomat «Davomat jurnali»da qayd etiladi.",
    "en": "Attendance is recorded in the “Attendance register”."
  },
  "Где преподаватель работает с оценками студентов?": {
    "uz": "O‘qituvchi talabalar baholari bilan qayerda ishlaydi?",
    "en": "Where does a teacher manage student grades?"
  },
  "Результаты учебной деятельности вносятся в «Журнал оценок».": {
    "uz": "O‘quv faoliyati natijalari «Baholash jurnali»ga kiritiladi.",
    "en": "Academic results are entered in the “Grade book”."
  },
  "В каком разделе преподаватель работает со своим индивидуальным планом?": {
    "uz": "O‘qituvchi shaxsiy rejasi bilan qaysi bo‘limda ishlaydi?",
    "en": "In which section does a teacher manage their individual plan?"
  },
  "База предметов → Календарный план": {
    "uz": "Fanlar bazasi → Taqvimiy reja",
    "en": "Subject database → Calendar plan"
  },
  "Индивидуальный план расположен в разделе «Сотрудники».": {
    "uz": "Shaxsiy reja «Xodimlar» bo‘limida joylashgan.",
    "en": "The individual plan is in the “Employees” section."
  },
  "Где отражаются сведения о подготовленных учебно-методических работах?": {
    "uz": "Tayyorlangan o‘quv-uslubiy ishlar haqidagi ma’lumotlar qayerda aks ettiriladi?",
    "en": "Where are completed teaching and methodological works recorded?"
  },
  "Учебно-методические работы вносятся в «Методические публикации».": {
    "uz": "O‘quv-uslubiy ishlar «Uslubiy nashrlar»ga kiritiladi.",
    "en": "Teaching and methodological works are entered in “Teaching publications”."
  },
  "Какой подраздел предназначен для внесения сведений о научных статьях преподавателя?": {
    "uz": "O‘qituvchining ilmiy maqolalari haqidagi ma’lumotlar qaysi kichik bo‘limga kiritiladi?",
    "en": "Which subsection records a teacher’s research articles?"
  },
  "Интеллектуальная собственность": {
    "uz": "Intellektual mulk",
    "en": "Intellectual property"
  },
  "Статьи и иные научные публикации вносятся в «Научные публикации».": {
    "uz": "Maqolalar va boshqa ilmiy nashrlar «Ilmiy nashrlar»ga kiritiladi.",
    "en": "Articles and other research publications are entered in “Research publications”."
  },
  "Где отражаются сведения об объектах интеллектуальной собственности?": {
    "uz": "Intellektual mulk obyektlari haqidagi ma’lumotlar qayerda aks ettiriladi?",
    "en": "Where are intellectual property assets recorded?"
  },
  "Для этого предусмотрен подраздел «Интеллектуальная собственность».": {
    "uz": "Buning uchun «Intellektual mulk» kichik bo‘limi mavjud.",
    "en": "The “Intellectual property” subsection is used for this."
  },
  "Где отражаются сведения об участии преподавателя в научных мероприятиях?": {
    "uz": "O‘qituvchining ilmiy tadbirlardagi ishtiroki haqidagi ma’lumotlar qayerda aks ettiriladi?",
    "en": "Where is a teacher’s participation in research events recorded?"
  },
  "Участие в мероприятиях и другие виды научной деятельности отражаются в «Научной активности».": {
    "uz": "Tadbirlardagi ishtirok va boshqa ilmiy faoliyat turlari «Ilmiy faollik»da aks ettiriladi.",
    "en": "Event participation and other research activities are recorded in “Research activity”."
  },
  "Публикуется...": {
    "uz": "E’lon qilinmoqda...",
    "en": "Publishing..."
  },
  "Опубликовать": {
    "uz": "E’lon qilish",
    "en": "Publish"
  },
  "Преподаватель глазами студента": {
    "uz": "Talaba nigohida o‘qituvchi",
    "en": "Teachers through students’ eyes"
  },
  "Анонимная оценка качества преподавания студентами института": {
    "uz": "Institut talabalari tomonidan ta’lim sifatini anonim baholash",
    "en": "Anonymous student assessment of teaching quality"
  },
  "Опрос работодателей": {
    "uz": "Ish beruvchilar so‘rovnomasi",
    "en": "Employer survey"
  },
  "Оценка качества подготовки выпускников и взаимодействия института с работодателями": {
    "uz": "Bitiruvchilar tayyorgarligi sifati va institutning ish beruvchilar bilan hamkorligini baholash",
    "en": "Assessing graduate preparation and institute cooperation with employers"
  },
  "Анонимная оценка качества обучения выпускниками Института": {
    "uz": "Institut bitiruvchilari tomonidan ta’lim sifatini anonim baholash",
    "en": "Anonymous graduate assessment of education quality"
  },
  "Анонимная оценка условий обучения и научной деятельности": {
    "uz": "Ta’lim va ilmiy faoliyat sharoitlarini anonim baholash",
    "en": "Anonymous assessment of education and research conditions"
  },
  "Тест по функциям HEMIS": {
    "uz": "HEMIS funksiyalari bo‘yicha test",
    "en": "HEMIS features test"
  },
  "Вход преподавателя — тест HEMIS": {
    "uz": "O‘qituvchi uchun kirish — HEMIS testi",
    "en": "Teacher sign-in — HEMIS test"
  },
  "Регистрация преподавателя — тест HEMIS": {
    "uz": "O‘qituvchini ro‘yxatdan o‘tkazish — HEMIS testi",
    "en": "Teacher registration — HEMIS test"
  },
  "Личный кабинет студента": {
    "uz": "Talabaning shaxsiy kabineti",
    "en": "Student account"
  },
  "Доступные анонимные опросы и статус участия": {
    "uz": "Mavjud anonim so‘rovnomalar va ishtirok holati",
    "en": "Available anonymous surveys and participation status"
  },
  "Вход в кабинет студента": {
    "uz": "Talaba kabinetiga kirish",
    "en": "Student sign-in"
  },
  "Личный кабинет студента и доступ к анонимным опросам": {
    "uz": "Talabaning shaxsiy kabineti va anonim so‘rovnomalarga kirish",
    "en": "Student account and access to anonymous surveys"
  }
};

export function surveyText(locale: string, text: string): string {
  if (locale !== "uz" && locale !== "en") return text;
  if (text !== text.trim()) return (text.match(/^\s*/)?.[0] || "") + surveyText(locale, text.trim()) + (text.match(/\s*$/)?.[0] || "");
  if (translations[text]) return translations[text][locale];
  const numbered = text.match(/^(\d+\.\s*)([\s\S]+)$/);
  if (numbered) return numbered[1] + surveyText(locale, numbered[2]);
  const degree = text.match(/^(.*) — (бакалавриат|магистратура)$/);
  if (degree) return surveyText(locale, degree[1]) + " — " + (locale === "uz" ? (degree[2] === "бакалавриат" ? "bakalavriat" : "magistratura") : (degree[2] === "бакалавриат" ? "bachelor’s degree" : "master’s degree"));
  return text;
}

export function qualityAnswerLabel(locale: string, key: string): string {
  const labels: Record<string, string> = {
    firstJobTiming: "Через какой период после окончания Института Вы нашли первую работу?",
    curriculum: "Какие дисциплины, темы или практические занятия необходимо добавить или расширить?",
    improvements: "Что необходимо улучшить в деятельности Института?",
    recommendation: "Рекомендовали бы Вы обучение в Институте своим знакомым?",
    suggestions: "Дополнительные предложения и пожелания",
    difficulties: "Какие трудности Вы испытываете в процессе обучения и выполнения диссертационного исследования?",
    support: "Какие условия или виды поддержки необходимо улучшить в первую очередь?",
  };
  return surveyText(locale, labels[key] || key);
}
