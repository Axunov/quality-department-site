export type Locale = 'ru' | 'uz' | 'en';
export type LocalizedText = Record<Locale,string>;
export type SpecialIndicator = {code:string; criterionCode:string; chapter:LocalizedText; criterion:LocalizedText; indicator:LocalizedText; main:LocalizedText; co:LocalizedText; evidence:LocalizedText};

export const specialPrograms = [
  {slug:'software-engineering', title:{uz:'Dasturiy ta’minot muhandisligi',ru:'Программная инженерия',en:'Software Engineering'}},
  {slug:'biomedical-instrumentation', title:{uz:'Asboblar muhandisligi (biomedical muhandislik)',ru:'Приборостроение (биомедицинская инженерия)',en:'Instrumentation Engineering (Biomedical Engineering)'}},
] as const;

export const specialIndicators: SpecialIndicator[] = [
  {
    "code": "1.1.1",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish boʻyicha tarkibiy tuzilma va uning samarali ishlash mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Ta’lim dasturini amalga oshirish uchun mas’ul bo‘lgan tarkibiy bo‘linma (kafedra, bo‘lim) (keyingi o‘rinlarda tarkibiy bo‘linma) tashkil etish, shuningdek, uni moddiy-texnika bazasi va moliyaviy resurslar bilan ta'minlash bo‘yicha aniq rejalar mavjud*.",
      "ru": "Имеются конкретные планы по созданию структурного подразделения (кафедры, отдела), ответственного за реализацию образовательной программы, а также по обеспечению его материально-технической базой и финансовыми ресурсами*.",
      "en": "There are clear plans to establish the structural unit (department/office) responsible for delivering the educational programme and to provide it with the necessary facilities and financial resources*."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari; Ishlar boshqarmasi; Reja-moliya bo‘limi; Xodimlar bo‘limi",
      "ru": "Заместитель исполнительного директора по учебной работе; Управление делами; Планово-финансовый отдел; Отдел кадров",
      "en": "Deputy Executive Director for Academic Affairs; Administrative Affairs Department; Planning and Finance Department; Human Resources Department"
    },
    "evidence": {
      "uz": "Kafedra to‘g‘risidagi nizom; shtat va kadrlar tarkibi; ish rejasi; resurslar haqida ma'lumot; ishlab chiqish va jihozlash rejalari.",
      "ru": "Положение о кафедре; штатное расписание и кадровый состав; план работы; сведения о ресурсах; планы развития и оснащения.",
      "en": "Department regulations; staffing and personnel structure; work plan; resource information; development and equipment plans."
    }
  },
  {
    "code": "1.1.2",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish boʻyicha tarkibiy tuzilma va uning samarali ishlash mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Ta’lim dasturini samarali amalga oshirish uchun tarkibiy bo‘linma moddiy-texnika bazasi, moliyaviy va kadrlar bilan ta’minlangan, ish rejalari ishlab chiqilgan**",
      "ru": "Для эффективной реализации образовательной программы структурное подразделение обеспечено материально-технической базой, финансовыми и кадровыми ресурсами, разработаны планы работы**.",
      "en": "The structural unit is provided with facilities, financial and human resources for effective programme delivery, and work plans have been developed**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari; Ishlar boshqarmasi; Reja-moliya bo‘limi; Xodimlar bo‘limi",
      "ru": "Заместитель исполнительного директора по учебной работе; Управление делами; Планово-финансовый отдел; Отдел кадров",
      "en": "Deputy Executive Director for Academic Affairs; Administrative Affairs Department; Planning and Finance Department; Human Resources Department"
    },
    "evidence": {
      "uz": "Kafedra to‘g‘risidagi nizom; shtat va kadrlar tarkibi; ish rejasi; resurslar haqida ma'lumot; ishlab chiqish va jihozlash rejalari.",
      "ru": "Положение о кафедре; штатное расписание и кадровый состав; план работы; сведения о ресурсах; планы развития и оснащения.",
      "en": "Department regulations; staffing and personnel structure; work plan; resource information; development and equipment plans."
    }
  },
  {
    "code": "1.1.3",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish boʻyicha tarkibiy tuzilma va uning samarali ishlash mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Tarkibiy bo‘linma faoliyati oliy ta’lim tashkilotining maqsadlariga, ta’lim dasturining maqsadlariga va kutilayotgan o‘quv natijalariga muvofiqdir**",
      "ru": "Деятельность структурного подразделения соответствует целям организации высшего образования, целям образовательной программы и ожидаемым результатам обучения**.",
      "en": "The activities of the structural unit are aligned with the goals of the higher education institution, the objectives of the educational programme and the expected learning outcomes**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Учебно-методический отдел; Отдел контроля качества образования",
      "en": "Academic and Methodological Department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Dastur maqsadlari va natijalari; kafedra rejasi; bo‘lim/kengash bayonnomalari; maqsadlar va natijalar o‘rtasidagi muvofiqlik matritsasi.",
      "ru": "Цели и результаты программы; план кафедры; протоколы отдела/совета; матрица соответствия целей и результатов.",
      "en": "Programme objectives and outcomes; department plan; department/council minutes; objectives-to-outcomes alignment matrix."
    }
  },
  {
    "code": "1.1.4",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish boʻyicha tarkibiy tuzilma va uning samarali ishlash mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Tarkibiy bo‘linma ta’lim dasturining mehnat bozori talablariga muvofiqligini va uning samaradorligini baholaydi hamda tahliliy materiallarni muntazam ravishda tayyorlaydi**",
      "ru": "Структурное подразделение оценивает соответствие образовательной программы требованиям рынка труда и ее эффективность, а также регулярно готовит аналитические материалы**.",
      "en": "The structural unit evaluates the programme’s alignment with labour-market requirements and its effectiveness, and regularly prepares analytical materials**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; o‘quv-uslubiy bo‘lim; Marketing va talabalar amaliyoti bo‘limi",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел; Отдел маркетинга и практики студентов",
      "en": "Education Quality Control Department; Academic and Methodological Department; Marketing and Student Practice Department"
    },
    "evidence": {
      "uz": "Mehnat bozorini tahlil qilish; ish beruvchilar fikr-mulohazalari; so‘rov natijalari; dastur samaradorligi bo‘yicha tahliliy hisobot.",
      "ru": "Анализ рынка труда; отзывы работодателей; результаты опросов; аналитический отчет об эффективности программы.",
      "en": "Labour-market analysis; employer feedback; survey results; analytical report on programme effectiveness."
    }
  },
  {
    "code": "1.1.5",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish boʻyicha tarkibiy tuzilma va uning samarali ishlash mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Tarkibiy bo‘linma faoliyati muntazam monitoring va tahlillar orqali tizimli tahlil qilinadi**",
      "ru": "Деятельность структурного подразделения системно анализируется посредством регулярного мониторинга и анализа**.",
      "en": "The activities of the structural unit are systematically reviewed through regular monitoring and analysis**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел",
      "en": "Education Quality Control Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Monitoring jadvali; nazorat ro‘yxatlari; ichki monitoring hisobotlari; muhokama bayonnomalari.",
      "ru": "График мониторинга; контрольные листы; отчеты внутреннего мониторинга; протоколы обсуждений.",
      "en": "Monitoring schedule; checklists; internal monitoring reports; discussion minutes."
    }
  },
  {
    "code": "1.1.6",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish boʻyicha tarkibiy tuzilma va uning samarali ishlash mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga ko‘ra tarkibiy bo‘linma faoliyatini takomillashtirish bo‘yicha doimiy chora-tadbirlar amalga oshirilmoqda**",
      "ru": "По результатам мониторинга и анализа на постоянной основе реализуются меры по совершенствованию деятельности структурного подразделения**.",
      "en": "Based on monitoring and analysis, continuous measures are implemented to improve the activities of the structural unit**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",
      "ru": "Отдел контроля качества образования; Заместитель исполнительного директора по учебной работе",
      "en": "Education Quality Control Department; Deputy Executive Director for Academic Affairs"
    },
    "evidence": {
      "uz": "Tuzatish bo‘yicha harakatlar rejasi; ijro hujjatlari; takroriy monitoring.",
      "ru": "План корректирующих действий; документы об исполнении; повторный мониторинг.",
      "en": "Corrective action plan; implementation documents; follow-up monitoring."
    }
  },
  {
    "code": "1.2.1",
    "criterionCode": "1.2",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini rivojlantirish va moliyaviy barqarorligini taʼminlash boʻyicha 5 yillik istiqbolli rejaning (bundan buyon matnda istiqbolli reja deb yuritiladi) mavjudligi",
      "ru": "Наличие 5-летнего перспективного плана развития образовательной программы и обеспечения ее финансовой устойчивости",
      "en": "Availability of a five-year prospective plan for programme development and financial sustainability"
    },
    "indicator": {
      "uz": "Uzoq muddatli rejaning bajarilishini monitoring qilish va tahlil qilish tizimi yaratildi**",
      "ru": "Создана система мониторинга и анализа выполнения долгосрочного плана**.",
      "en": "A system for monitoring and analysing implementation of the long-term plan has been established**."
    },
    "main": {
      "uz": "Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по учебной работе",
      "en": "Deputy Executive Director for Academic Affairs"
    },
    "co": {
      "uz": "Reja-moliya bo‘limi; tegishli kafedra mudiri; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Планово-финансовый отдел; Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Planning and Finance Department; Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Besh yillik uzoq muddatli reja; samaradorlik ko‘rsatkichlari va monitoringi; ko‘rib chiqish protokollari; rejasiga o‘zgartirishlar kiritish.",
      "ru": "Пятилетний долгосрочный план; показатели эффективности и мониторинг; протоколы рассмотрения; изменения в план.",
      "en": "Five-year long-term plan; performance indicators and monitoring; review minutes; amendments to the plan."
    }
  },
  {
    "code": "1.2.2",
    "criterionCode": "1.2",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini rivojlantirish va moliyaviy barqarorligini taʼminlash boʻyicha 5 yillik istiqbolli rejaning (bundan buyon matnda istiqbolli reja deb yuritiladi) mavjudligi",
      "ru": "Наличие 5-летнего перспективного плана развития образовательной программы и обеспечения ее финансовой устойчивости",
      "en": "Availability of a five-year prospective plan for programme development and financial sustainability"
    },
    "indicator": {
      "uz": "Zarur bo‘lganda, monitoring va tahlil natijalariga ko‘ra, uzoq muddatli rejaga tegishli o‘zgartirishlar kiritiladi**",
      "ru": "При необходимости по результатам мониторинга и анализа в долгосрочный план вносятся соответствующие изменения**.",
      "en": "Where necessary, the long-term plan is amended on the basis of monitoring and analysis results**."
    },
    "main": {
      "uz": "Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по учебной работе",
      "en": "Deputy Executive Director for Academic Affairs"
    },
    "co": {
      "uz": "Reja-moliya bo‘limi; tegishli kafedra mudiri; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Планово-финансовый отдел; Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Planning and Finance Department; Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Besh yillik uzoq muddatli reja; samaradorlik ko‘rsatkichlari va monitoringi; ko‘rib chiqish protokollari; rejasiga o‘zgartirishlar kiritish.",
      "ru": "Пятилетний долгосрочный план; показатели эффективности и мониторинг; протоколы рассмотрения; изменения в план.",
      "en": "Five-year long-term plan; performance indicators and monitoring; review minutes; amendments to the plan."
    }
  },
  {
    "code": "1.3.1",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni ichki taʼminlash mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning ishtiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Sifatni ta’minlashning ichki mexanizmlarini joriy qilish, muvofiqlashtirish va takomillashtirish jarayonlari strategik boshqaruvning ajralmas qismi sifatida tizimli ravishda amalga oshiriladi**",
      "ru": "Процессы внедрения, координации и совершенствования механизмов внутреннего обеспечения качества системно осуществляются как неотъемлемая часть стратегического управления**.",
      "en": "Processes for implementing, coordinating and improving internal quality assurance mechanisms are systematically carried out as an integral part of strategic management**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari; o‘quv-uslubiy bo‘lim; tegishli kafedra mudiri",
      "ru": "Заместитель исполнительного директора по учебной работе; Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Deputy Executive Director for Academic Affairs; Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Ichki sifat kafolati to‘g‘risidagi nizom; rejalar/hisobotlar; boshqaruv organlarining bayonnomalari.",
      "ru": "Положение о внутреннем обеспечении качества; планы/отчеты; протоколы органов управления.",
      "en": "Internal quality assurance regulation; plans/reports; minutes of governing bodies."
    }
  },
  {
    "code": "1.3.2",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni ichki taʼminlash mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning ishtiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Ta’lim dasturining sifatini baholash uchun manfaatdor tomonlarning fikrlari muntazam ravishda o‘rganiladi va baholanadi**",
      "ru": "Для оценки качества образовательной программы мнения заинтересованных сторон регулярно изучаются и оцениваются**.",
      "en": "Stakeholder opinions are regularly collected and evaluated to assess the quality of the educational programme**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; dekanatlar; ish beruvchilar va boshqa manfaatdor tomonlar",
      "ru": "Заведующий соответствующей кафедрой; деканаты; работодатели и другие заинтересованные стороны",
      "en": "Head of the relevant department; dean’s offices; employers and other stakeholders"
    },
    "evidence": {
      "uz": "Anketalar/so‘rovlar; ishtirokchilar reestri; natijalar va tahliliy hisobotlar.",
      "ru": "Анкеты/опросы; реестр участников; результаты и аналитические отчеты.",
      "en": "Questionnaires/surveys; participant register; results and analytical reports."
    }
  },
  {
    "code": "1.3.3",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni ichki taʼminlash mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning ishtiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Manfaatdor tomonlarning fikr-mulohazalari asosida ta’lim dasturini takomillashtirish chora-tadbirlari belgilandi**",
      "ru": "На основе отзывов заинтересованных сторон определены меры по совершенствованию образовательной программы**.",
      "en": "Measures to improve the educational programme have been defined on the basis of stakeholder feedback**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел",
      "en": "Education Quality Control Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Fikr-mulohazalarga asoslangan harakatlar rejasi; protokollar; amalga oshirilgan yaxshilanishlarni tasdiqlash.",
      "ru": "План действий на основе обратной связи; протоколы; подтверждение реализованных улучшений.",
      "en": "Feedback-based action plan; minutes; evidence of implemented improvements."
    }
  },
  {
    "code": "1.3.4",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni ichki taʼminlash mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning ishtiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Ichki sifatni ta’minlash tizimi doirasida amalga oshirilayotgan tadbirlar samaradorligi muntazam ravishda baholanadi**",
      "ru": "Эффективность мероприятий, реализуемых в рамках системы внутреннего обеспечения качества, регулярно оценивается**.",
      "en": "The effectiveness of activities implemented within the internal quality assurance system is regularly evaluated**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari; tegishli kafedra mudiri",
      "ru": "Заместитель исполнительного директора по учебной работе; Заведующий соответствующей кафедрой",
      "en": "Deputy Executive Director for Academic Affairs; Head of the relevant department"
    },
    "evidence": {
      "uz": "Tadbirlar samaradorligini baholash; takroriy so‘rovlar/monitoring; analitik hisobot.",
      "ru": "Оценка эффективности мероприятий; повторные опросы/мониторинг; аналитический отчет.",
      "en": "Evaluation of activity effectiveness; repeat surveys/monitoring; analytical report."
    }
  },
  {
    "code": "1.4.1",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning soʻnggi tendensiyalarini aniqlash boʻyicha monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Tahlil va monitoring natijalariga koʻra taʼlim dasturini takomillashtirish chora-tadbirlari belgilandi**",
      "ru": "По результатам анализа и мониторинга определены меры по совершенствованию образовательной программы**.",
      "en": "Measures to improve the educational programme have been defined on the basis of analysis and monitoring results**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Marketing va talabalar amaliyoti bo‘limi; Ta’lim sifatini nazorat qilish bo‘limi; Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi; xalqaro hamkorlik bo‘limi",
      "ru": "Отдел маркетинга и практики студентов; Отдел контроля качества образования; Управление научных исследований, инноваций и подготовки научно-педагогических кадров; отдел международного сотрудничества",
      "en": "Marketing and Student Practice Department; Education Quality Control Department; Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; International Cooperation Department"
    },
    "evidence": {
      "uz": "Mehnat bozori va ilmiy va texnologik tendentsiyalarni monitoring qilish; dasturni takomillashtirish rejasi.",
      "ru": "Мониторинг рынка труда и научно-технологических тенденций; план совершенствования программы.",
      "en": "Monitoring of the labour market and scientific/technological trends; programme improvement plan."
    }
  },
  {
    "code": "1.4.2",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning soʻnggi tendensiyalarini aniqlash boʻyicha monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Tahlil va monitoring natijalari, shuningdek belgilangan tadbirlarni amalga oshirish natijalari asosida taʼlim dasturiga zarur oʻzgartirishlar kiritiladi**",
      "ru": "На основе результатов анализа и мониторинга, а также реализации установленных мероприятий в образовательную программу вносятся необходимые изменения**.",
      "en": "Necessary changes are made to the educational programme based on analysis and monitoring results and on the outcomes of implemented measures**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Departament/kengash qarorlari; yangilangan o‘quv rejalari va dasturlari; o‘zgarishlarni taqqoslash jadvali.",
      "ru": "Решения кафедры/совета; обновленные учебные планы и программы; таблица сопоставления изменений.",
      "en": "Department/council decisions; updated curricula and programmes; change-comparison table."
    }
  },
  {
    "code": "1.4.3",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning soʻnggi tendensiyalarini aniqlash boʻyicha monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Talabalarni mehnat bozoridagi mavjud imkoniyatlar haqida xabardor qilish mexanizmi yaratildi**",
      "ru": "Создан механизм информирования студентов о существующих возможностях на рынке труда**.",
      "en": "A mechanism has been established to inform students about available labour-market opportunities**."
    },
    "main": {
      "uz": "Marketing va talabalar amaliyoti bo‘limi",
      "ru": "Отдел маркетинга и практики студентов",
      "en": "Marketing and Student Practice Department"
    },
    "co": {
      "uz": "Dekanatlar; Tegishli kafedra mudiri; Yoshlar bilan ishlash bo‘limi",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; Отдел по работе с молодежью",
      "en": "Dean’s offices; Head of the relevant department; Youth Affairs Department"
    },
    "evidence": {
      "uz": "Axborot uchrashuvlari; vakansiyalar/yarmarkalar; pochta jo‘natmalari; veb-sayt/Telegram; martaba voqealari hisobotlari.",
      "ru": "Информационные встречи; вакансии/ярмарки; рассылки; сайт/Telegram; отчеты о карьерных мероприятиях.",
      "en": "Information meetings; vacancies/fairs; mailings; website/Telegram; career-event reports."
    }
  },
  {
    "code": "1.4.4",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning soʻnggi tendensiyalarini aniqlash boʻyicha monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Ta’lim ehtiyojlari va so‘nggi tadqiqot tendentsiyalari to‘g‘risidagi to‘plangan ma’lumotlar manfaatdor tomonlar foydalanishi uchun jamoat mulki sifatida e’lon qilinadi**",
      "ru": "Собранная информация об образовательных потребностях и последних тенденциях исследований публикуется в открытом доступе для использования заинтересованными сторонами**.",
      "en": "Collected information on educational needs and recent research trends is published openly for use by stakeholders**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi; Registrator ofisi; sayt administratori; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Управление научных исследований, инноваций и подготовки научно-педагогических кадров; Офис регистратора; администратор сайта; Отдел контроля качества образования",
      "en": "Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; Registrar’s Office; website administrator; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Saytdagi nashrlar; analitik materiallar; havolalar/skrinshotlar; ma’lumotlarni uzatish protokollari.",
      "ru": "Публикации на сайте; аналитические материалы; ссылки/скриншоты; протоколы передачи данных.",
      "en": "Website publications; analytical materials; links/screenshots; data-transfer records."
    }
  },
  {
    "code": "1.5.1",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovlar (suhbatlar, muhokamalar va talabalarning fikrlarini o‘rganishga qaratilgan boshqa tadbirlar) o‘tkazishning belgilangan tartibi mavjud.",
      "ru": "Установлен порядок проведения среди студентов опросов по образовательным программам (интервью, обсуждений и иных мероприятий, направленных на изучение мнения студентов).",
      "en": "A defined procedure is in place for conducting student surveys on educational programmes, including interviews, discussions and other activities aimed at studying student opinions."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; tegishli kafedra mudiri; Registrator ofisi",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; Офис регистратора",
      "en": "Dean’s offices; Head of the relevant department; Registrar’s Office"
    },
    "evidence": {
      "uz": "So‘rovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklash; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.2",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "So‘rovlar tashkiliy va boshqaruv jarayonlari va ta’lim dasturi doirasidagi o‘quv jarayoni sifati bilan bog‘liq qo‘shimcha savollarni o‘z ichiga oladi**",
      "ru": "Опросы включают дополнительные вопросы, связанные с организационно-управленческими процессами и качеством учебного процесса в рамках образовательной программы**.",
      "en": "Surveys include additional questions related to organisational and management processes and the quality of the learning process within the educational programme**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; tegishli fakultet dekanatlari; tegishli kafedra mudirlari.",
      "ru": "Учебно-методический отдел; деканаты соответствующих факультетов; tegishli kafedra mudirlari.",
      "en": "Academic and Methodological Department; relevant faculty dean’s offices; tegishli kafedra mudirlari."
    },
    "evidence": {
      "uz": "So‘rovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklash; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.3",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Qo‘shimcha so‘rov savollari va uni o‘tkazish tartibi ilmiy-uslubiy asosga ega**",
      "ru": "Дополнительные вопросы опроса и порядок его проведения имеют научно-методическое обоснование**.",
      "en": "Additional survey questions and the survey procedure have a scientific and methodological basis**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; tegishli kafedra mudiri",
      "ru": "Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "So‘rovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklash; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.4",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "So‘rovlar oliy ta’lim tashkiloti tomonidan belgilangan vaqt oralig‘ida muntazam ravishda o‘tkaziladi va ularning natijalari tizimli tahlil qilinadi**",
      "ru": "Опросы регулярно проводятся в сроки, установленные организацией высшего образования, а их результаты системно анализируются**.",
      "en": "Surveys are conducted regularly within the timeframes established by the higher education institution and their results are systematically analysed**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; tegishli kafedra mudiri; Registrator ofisi",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; Офис регистратора",
      "en": "Dean’s offices; Head of the relevant department; Registrar’s Office"
    },
    "evidence": {
      "uz": "So‘rovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklash; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.5",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "So‘rovlar natijalariga ko‘ra aniqlangan muammolarni bartaraf etish choralari belgilandi**",
      "ru": "По результатам опросов определены меры по устранению выявленных проблем**.",
      "en": "Measures have been defined to address problems identified through survey results**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; o‘quv-uslubiy bo‘lim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Aniqlangan muammolarni bartaraf etish rejasi; bajarilishini nazorat qilish.",
      "ru": "План устранения выявленных проблем; контроль исполнения.",
      "en": "Plan to address identified problems; implementation monitoring."
    }
  },
  {
    "code": "1.5.6",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Tahlil natijalari va amalga oshirilgan tadbirlar natijalariga ko‘ra ta’lim dasturiga zarur o‘zgartirishlar kiritildi**",
      "ru": "По результатам анализа и реализованных мероприятий в образовательную программу внесены необходимые изменения**.",
      "en": "Necessary changes have been made to the educational programme based on analysis results and implemented measures**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Yangilangan dastur hujjatlari; protokollarni o'zgartirish; qiyosiy tahlil.",
      "ru": "Обновленные документы программы; протоколы изменений; сравнительный анализ.",
      "en": "Updated programme documents; change minutes; comparative analysis."
    }
  },
  {
    "code": "1.5.7",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TASHKILIY-BOSHQARUV FAOLIYATI VA SIFATNI TA’MINLASH",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha talabalar o‘rtasida so‘rovnomalar o‘tkazilgani va uning natijalari asosida ta’lim dasturlarining takomillashtirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Talabalar so'rov natijalari va ular asosida bajarilgan ishlar to'g'risida xabardor qilinadi**",
      "ru": "Студенты информируются о результатах опросов и выполненных на их основе мероприятиях**.",
      "en": "Students are informed about survey results and the actions taken on their basis**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; Registrator ofisi; sayt administratori; tegishli kafedra mudiri",
      "ru": "Деканаты; Офис регистратора; администратор сайта; Заведующий соответствующей кафедрой",
      "en": "Dean’s offices; Registrar’s Office; website administrator; Head of the relevant department"
    },
    "evidence": {
      "uz": "Talabalarni xabardor qilish: veb-sayt, bot, uchrashuvlar, e’lonlar; yordamchi materiallar.",
      "ru": "Информирование студентов: сайт, бот, встречи, объявления; вспомогательные материалы.",
      "en": "Student information: website, bot, meetings, announcements; supporting materials."
    }
  },
  {
    "code": "2.1.1",
    "criterionCode": "2.1",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Manfaatdor tomonlar ishtirokida taʼlim dasturining belgilangan tartibda ishlab chiqilgani. Bunda taʼlim dasturining maqsadi, natijalarining belgilangani, mehnat bozori, davlat taʼlim standarti (bundan buyon matnda DTS deb yuriladi) va milliy malakalar ramkasi (bundan buyon matnda MMR deb yuritiladi) talablariga muvofiqligi",
      "ru": "Разработка образовательной программы в установленном порядке с участием заинтересованных сторон, определение целей и результатов и соответствие требованиям рынка труда, государственных образовательных стандартов и Национальной рамки квалификаций",
      "en": "Development of the educational programme according to established procedures with stakeholder participation, defined objectives and outcomes, and compliance with labour-market requirements, state education standards and the National Qualifications Framework"
    },
    "indicator": {
      "uz": "Ta’lim dasturini ishlab chiqish jarayonida ish beruvchilar, soha mutaxassislari va professor-o‘qituvchilarning ishtiroki ta’minlanib, bu jarayon tizimli asosda tashkil etilmoqda*.",
      "ru": "В разработке образовательной программы обеспечено участие работодателей, отраслевых специалистов и профессорско-преподавательского состава, процесс организован на системной основе*.",
      "en": "Employers, industry experts and academic staff participate in the development of the educational programme, and the process is organised systematically*."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; ish beruvchilar; professor-o‘qituvchilar",
      "ru": "Учебно-методический отдел; работодатели; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; employers; academic staff"
    },
    "evidence": {
      "uz": "Ishchi guruhlarning bayonnomalari; ish beruvchilar fikr-mulohazalari / sharhlari; tasdiqlash varaqlari; dastur loyihalari.",
      "ru": "Протоколы рабочих групп; отзывы/рецензии работодателей; листы согласования; проекты программы.",
      "en": "Working-group minutes; employer feedback/reviews; approval sheets; programme drafts."
    }
  },
  {
    "code": "2.1.2",
    "criterionCode": "2.1",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Manfaatdor tomonlar ishtirokida taʼlim dasturining belgilangan tartibda ishlab chiqilgani. Bunda taʼlim dasturining maqsadi, natijalarining belgilangani, mehnat bozori, davlat taʼlim standarti (bundan buyon matnda DTS deb yuriladi) va milliy malakalar ramkasi (bundan buyon matnda MMR deb yuritiladi) talablariga muvofiqligi",
      "ru": "Разработка образовательной программы в установленном порядке с участием заинтересованных сторон, определение целей и результатов и соответствие требованиям рынка труда, государственных образовательных стандартов и Национальной рамки квалификаций",
      "en": "Development of the educational programme according to established procedures with stakeholder participation, defined objectives and outcomes, and compliance with labour-market requirements, state education standards and the National Qualifications Framework"
    },
    "indicator": {
      "uz": "Jamoatchilik, abituriyentlar va talabalarga ta’lim dasturi haqida ishonchli va xolis ma’lumot olish imkoniyati taqdim etilgan**",
      "ru": "Общественности, абитуриентам и студентам обеспечена возможность получать достоверную и объективную информацию об образовательной программе**.",
      "en": "The public, applicants and students are provided with access to reliable and objective information about the educational programme**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Qabul komissiyasi; dekanatlar; Registrator ofisi; sayt administratori",
      "ru": "Приемная комиссия; деканаты; Офис регистратора; администратор сайта",
      "en": "Admissions Committee; dean’s offices; Registrar’s Office; website administrator"
    },
    "evidence": {
      "uz": "Veb-saytdagi dastur haqida rasmiy ma'lumot; bukletlar; qabul qilish qoidalari; ta'lim natijalarining tavsifi.",
      "ru": "Официальная информация о программе на сайте; буклеты; правила приема; описание результатов обучения.",
      "en": "Official programme information on the website; brochures; admission rules; description of learning outcomes."
    }
  },
  {
    "code": "2.3.1",
    "criterionCode": "2.3",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturining davomiyligi, fanlarning uzviyligi va uzluksizligi taʼminlangani",
      "ru": "Обеспечение продолжительности образовательной программы, преемственности и непрерывности дисциплин",
      "en": "Ensuring appropriate programme duration, coherence and continuity of courses"
    },
    "indicator": {
      "uz": "Ta’lim dasturining davomiyligi (kreditlarning umumiy soni (soatlar), o‘qish davomiyligi) dastur maqsadlariga va kutilayotgan o‘quv natijalariga muvofiq belgilanadi*",
      "ru": "Продолжительность образовательной программы (общее количество кредитов/часов и срок обучения) устанавливается в соответствии с целями программы и ожидаемыми результатами обучения*.",
      "en": "The duration of the educational programme (total credits/hours and period of study) is determined in accordance with the programme objectives and expected learning outcomes*."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "evidence": {
      "uz": "O‘quv dasturi; kreditlar/soatlarni hisoblash; o‘qish shartlari; ta’lim natijalari matritsasi.",
      "ru": "Учебная программа; расчет кредитов/часов; условия обучения; матрица результатов обучения.",
      "en": "Curriculum; credit/hour calculation; study conditions; learning-outcomes matrix."
    }
  },
  {
    "code": "2.4.1",
    "criterionCode": "2.4",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravishda monitoringi yuritilgani hamda uning samaradorligini oshirish va takomillashtirish bo‘yicha chora-tadbirlarning amalga oshirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Ta’lim dasturining samaradorligini baholash tartibi va mezonlari ishlab chiqildi**",
      "ru": "Разработаны порядок и критерии оценки эффективности образовательной программы**.",
      "en": "Procedures and criteria for evaluating the effectiveness of the educational programme have been developed**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; tegishli kafedra mudiri",
      "ru": "Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Ta‘lim dasturining samaradorligini baholash tartibi va mezonlari.",
      "ru": "Порядок и критерии оценки эффективности образовательной программы.",
      "en": "Procedure and criteria for evaluating programme effectiveness."
    }
  },
  {
    "code": "2.4.2",
    "criterionCode": "2.4",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravishda monitoringi yuritilgani hamda uning samaradorligini oshirish va takomillashtirish bo‘yicha chora-tadbirlarning amalga oshirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Ta’lim dasturining tizimli monitoringi va tahlili oliy ta’lim tashkiloti tomonidan belgilangan muddatlarda izchil amalga oshirilmoqda**",
      "ru": "Системный мониторинг и анализ образовательной программы последовательно осуществляются в сроки, установленные организацией высшего образования**.",
      "en": "Systematic monitoring and analysis of the educational programme are consistently carried out within the timeframes established by the higher education institution**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; o‘quv-uslubiy bo‘lim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Monitoring jadvali; hisobotlar; muhokama bayonnomalari.",
      "ru": "График мониторинга; отчеты; протоколы обсуждений.",
      "en": "Monitoring schedule; reports; discussion minutes."
    }
  },
  {
    "code": "2.4.3",
    "criterionCode": "2.4",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravishda monitoringi yuritilgani hamda uning samaradorligini oshirish va takomillashtirish bo‘yicha chora-tadbirlarning amalga oshirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Monitoring jarayonida tizimli asosda ish beruvchilar, talabalar va soha mutaxassislarining ishtiroki ta’minlanadi**",
      "ru": "В процессе мониторинга на системной основе обеспечивается участие работодателей, студентов и отраслевых специалистов**.",
      "en": "Employers, students and industry experts systematically participate in the monitoring process**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; ish beruvchilar; talabalar; soha mutaxassislari",
      "ru": "Отдел контроля качества образования; работодатели; студенты; отраслевые специалисты",
      "en": "Education Quality Control Department; employers; students; industry experts"
    },
    "evidence": {
      "uz": "Protokollar, so‘rovlar, ekspert xulosalari, ishtirok varaqalari.",
      "ru": "Протоколы, опросы, экспертные заключения, листы участия.",
      "en": "Minutes, surveys, expert opinions, participation sheets."
    }
  },
  {
    "code": "2.4.4",
    "criterionCode": "2.4",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravishda monitoringi yuritilgani hamda uning samaradorligini oshirish va takomillashtirish bo‘yicha chora-tadbirlarning amalga oshirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga koʻra aniqlangan muammo va kamchiliklarni bartaraf etish boʻyicha tizimli chora-tadbirlar ishlab chiqilib, ularning ijrosi holati nazorat qilinadi**",
      "ru": "По результатам мониторинга и анализа разрабатываются системные меры по устранению выявленных проблем и недостатков, а состояние их исполнения контролируется**.",
      "en": "Systematic measures are developed to address problems and deficiencies identified through monitoring and analysis, and implementation is monitored**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел",
      "en": "Education Quality Control Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Tuzatish bo‘yicha harakatlar rejasi; muammoli ro‘yxatga olish kitobi; ishlash hisobotlari.",
      "ru": "План корректирующих действий; журнал проблем; отчеты об исполнении.",
      "en": "Corrective action plan; issue register; implementation reports."
    }
  },
  {
    "code": "2.4.5",
    "criterionCode": "2.4",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravishda monitoringi yuritilgani hamda uning samaradorligini oshirish va takomillashtirish bo‘yicha chora-tadbirlarning amalga oshirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Ta’lim dasturini monitoring qilish va tahlil qilish natijalariga ochiq kirish imkoniyati ta’minlangan**",
      "ru": "Обеспечен открытый доступ к результатам мониторинга и анализа образовательной программы**.",
      "en": "Open access to the results of monitoring and analysis of the educational programme is ensured**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Registrator ofisi; sayt administratori; tegishli kafedra mudiri",
      "ru": "Офис регистратора; администратор сайта; Заведующий соответствующей кафедрой",
      "en": "Registrar’s Office; website administrator; Head of the relevant department"
    },
    "evidence": {
      "uz": "Monitoring natijalarini nashr etish; ochiq isobotlar/sertifikatlar; havolalar va skrinshotlar.",
      "ru": "Публикация результатов мониторинга; открытые отчеты/справки; ссылки и скриншоты.",
      "en": "Publication of monitoring results; public reports/certificates; links and screenshots."
    }
  },
  {
    "code": "2.4.6",
    "criterionCode": "2.4",
    "chapter": {
      "uz": "2-BOB. TA’LIM DASTURLARI",
      "ru": "ГЛАВА 2. ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ",
      "en": "CHAPTER 2. EDUCATIONAL PROGRAMMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravishda monitoringi yuritilgani hamda uning samaradorligini oshirish va takomillashtirish bo‘yicha chora-tadbirlarning amalga oshirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga ko‘ra ta’lim dasturiga, jumladan, fanlar (modullar), o‘qitish metodikasi va baholash tizimi mazmuniga zarur o‘zgartirishlar kiritiladi**",
      "ru": "По результатам мониторинга и анализа в образовательную программу, включая содержание дисциплин (модулей), методику обучения и систему оценивания, вносятся необходимые изменения**.",
      "en": "Based on monitoring and analysis, necessary changes are introduced into the educational programme, including the content of courses/modules, teaching methods and the assessment system**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Yangilangan o‘quv rejalari, fan dasturlari, o‘qitish va baholash usullari; protokollarni o‘zgartirish.",
      "ru": "Обновленные учебные планы, программы дисциплин, методы обучения и оценивания; протоколы изменений.",
      "en": "Updated curricula, course programmes, teaching and assessment methods; change minutes."
    }
  },
  {
    "code": "3.1.1",
    "criterionCode": "3.1",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Ishchi oʻquv reja va dasturlarining belgilangan talablarga muvofiq ishlab chiqilgani",
      "ru": "Разработка рабочих учебных планов и программ в соответствии с установленными требованиями",
      "en": "Development of working curricula and study programmes in accordance with established requirements"
    },
    "indicator": {
      "uz": "Oʻquv rejalari va oʻquv dasturlari Milliy malaka asoslari, davlat taʼlim standartlari, kasbiy standart(lar), malaka talablari va (yoki) xalqaro taʼlim standartlariga* muvofiq ishlab chiqiladi.",
      "ru": "Учебные планы и программы разработаны в соответствии с Национальной рамкой квалификаций, государственными образовательными стандартами, профессиональными стандартами, квалификационными требованиями и/или международными образовательными стандартами*.",
      "en": "Curricula and study programmes are developed in accordance with the National Qualifications Framework, state educational standards, professional standards, qualification requirements and/or international education standards*."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; yuriskonsult",
      "ru": "Заведующий соответствующей кафедрой; юрисконсульт",
      "en": "Head of the relevant department; legal counsel"
    },
    "evidence": {
      "uz": "Ishchi o‘quv rejalari va dasturlari; MMR/DTS/professional standartlarga havolalar; yozishmalar jadvali.",
      "ru": "Рабочие учебные планы и программы; ссылки на НРК/ГОС/профессиональные стандарты; таблица соответствия.",
      "en": "Working curricula and programmes; references to NQF/state/professional standards; compliance matrix."
    }
  },
  {
    "code": "3.2.1",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining taʼlim dasturida belgilangan oʻquv natijalariga erishishga yoʻnaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Ta’lim dasturi amaliyot bazalarini o‘z ichiga oladi*",
      "ru": "Образовательная программа включает базы практики*.",
      "en": "The educational programme includes internship and practical training bases*."
    },
    "main": {
      "uz": "Marketing va talabalar amaliyoti bo‘limi",
      "ru": "Отдел маркетинга и практики студентов",
      "en": "Marketing and Student Practice Department"
    },
    "co": {
      "uz": "Dekanatlar; Tegishli kafedra mudiri",
      "ru": "Деканаты; Заведующий соответствующей кафедрой",
      "en": "Dean’s offices; Head of the relevant department"
    },
    "evidence": {
      "uz": "Amaliyot bazalari bilan shartnomalar; buyurtmalar; stajirovka dasturlari; asoslar ro‘yxati.",
      "ru": "Договоры с базами практики; приказы; программы практики; перечень баз.",
      "en": "Agreements with placement sites; orders; internship programmes; list of sites."
    }
  },
  {
    "code": "3.2.2",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining taʼlim dasturida belgilangan oʻquv natijalariga erishishga yoʻnaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "O‘quv jarayoni nazariy bilimlarni amaliyotda, ishlab chiqarish amaliyotida va tadqiqot faoliyatida qo‘llash imkonini beruvchi amaliy mashg‘ulotlarni (seminarlar, amaliy loyihalar, laboratoriya ishlari va boshqa turdagi darslarni) o‘z ichiga oladi**",
      "ru": "Учебный процесс включает практические занятия (семинары, практические проекты, лабораторные работы и другие виды занятий), позволяющие применять теоретические знания на практике, в производственной практике и исследовательской деятельности**.",
      "en": "The learning process includes practical activities—seminars, practical projects, laboratory work and other forms of instruction—that enable students to apply theoretical knowledge in practice, industrial placements and research activities**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash bo‘limi",
      "ru": "Учебно-методический отдел; отдел научных исследований, инноваций и подготовки научно-педагогических кадров",
      "en": "Academic and Methodological Department; Research, Innovation and Scientific-Pedagogical Staff Training Department"
    },
    "evidence": {
      "uz": "Syllabuslar; laboratoriya/amaliy ishlar; loyihalar; stajirovka dasturlari; Talabalarning ilmiy-tadqiqot ishlari.",
      "ru": "Силлабусы; лабораторные/практические работы; проекты; программы практики; научно-исследовательские работы студентов.",
      "en": "Syllabi; laboratory/practical work; projects; internship programmes; student research work."
    }
  },
  {
    "code": "3.2.3",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining taʼlim dasturida belgilangan oʻquv natijalariga erishishga yoʻnaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Amaliyot natijalari bo‘yicha manfaatdor tomonlarning fikrlarini to‘plash va tahlil qilish amaliyoti mavjud**",
      "ru": "Существует практика сбора и анализа мнений заинтересованных сторон по результатам практики**.",
      "en": "There is an established practice of collecting and analysing stakeholder feedback on practical training outcomes**."
    },
    "main": {
      "uz": "Marketing va talabalar amaliyoti bo‘limi",
      "ru": "Отдел маркетинга и практики студентов",
      "en": "Marketing and Student Practice Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Talabalar/ish beruvchilarning so‘rovnomalari; sharhlar; amaliyot natijalarini tahlil qilish.",
      "ru": "Опросы студентов/работодателей; отзывы; анализ результатов практики.",
      "en": "Student/employer surveys; feedback; analysis of practical training outcomes."
    }
  },
  {
    "code": "3.2.4",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining taʼlim dasturida belgilangan oʻquv natijalariga erishishga yoʻnaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Tahlil natijalariga ko‘ra amaliyot samaradorligi baholanadi va amaliyot dasturlari takomillashtiriladi**",
      "ru": "По результатам анализа оценивается эффективность практики и совершенствуются программы практики**.",
      "en": "Based on analysis results, the effectiveness of practical training is evaluated and practical training programmes are improved**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Учебно-методический отдел; Отдел контроля качества образования",
      "en": "Academic and Methodological Department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Amaliyot samaradorligini tahlil qilish; yangilangan amaliyot dasturlari; protokollar.",
      "ru": "Анализ эффективности практики; обновленные программы практики; протоколы.",
      "en": "Analysis of practical training effectiveness; updated internship programmes; minutes."
    }
  },
  {
    "code": "3.3.1",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining doimiy baholab borilishi va takomillashtirishga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "O‘quv jarayoni sifatini baholash va tahlil qilish oliy ta’lim tashkiloti tomonidan belgilangan muddatlarda izchil amalga oshiriladi**",
      "ru": "Оценка и анализ качества учебного процесса последовательно осуществляются в сроки, установленные организацией высшего образования**.",
      "en": "Evaluation and analysis of the quality of the learning process are consistently carried out within the timeframes established by the higher education institution**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "O‘quv jarayonini monitoring qilish rejasi; darslarda qatnashish; hisobotlar va tahlillar.",
      "ru": "План мониторинга учебного процесса; посещение занятий; отчеты и анализ.",
      "en": "Learning-process monitoring plan; class observations; reports and analyses."
    }
  },
  {
    "code": "3.3.2",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining doimiy baholab borilishi va takomillashtirishga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "Baholash jarayonida manfaatdor tomonlarning ishtiroki tizimli ravishda ta’minlanadi**",
      "ru": "В процессе оценки системно обеспечивается участие заинтересованных сторон**.",
      "en": "Stakeholder participation in the evaluation process is systematically ensured**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; tegishli kafedra mudiri; talabalar va ish beruvchilar",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; студенты и работодатели",
      "en": "Dean’s offices; Head of the relevant department; students and employers"
    },
    "evidence": {
      "uz": "Protokollar/so‘rovlar/intervyular; Manfaatdor tomonlar ishtiroki varaqalari.",
      "ru": "Протоколы/опросы/интервью; листы участия заинтересованных сторон.",
      "en": "Minutes/surveys/interviews; stakeholder participation sheets."
    }
  },
  {
    "code": "3.3.3",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining doimiy baholab borilishi va takomillashtirishga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "Baholash va tahlil natijalariga ko‘ra aniqlangan muammo va kamchiliklarni bartaraf etish choralari belgilandi**",
      "ru": "По результатам оценки и анализа определены меры по устранению выявленных проблем и недостатков**.",
      "en": "Measures have been defined to address problems and deficiencies identified through evaluation and analysis**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Kamchiliklarni bartaraf etish bo‘yicha chora-tadbirlar rejasi; ishlashni tekshirish belgilari.",
      "ru": "План мероприятий по устранению недостатков; отметки о проверке исполнения.",
      "en": "Action plan to address deficiencies; implementation verification records."
    }
  },
  {
    "code": "3.3.4",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Oʻquv jarayonining doimiy baholab borilishi va takomillashtirishga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "O‘quv jarayonini baholash va tahlil qilish natijalari hamda amalga oshirilayotgan tadbirlar asosida oliy ta’lim tashkilotining o‘quv dasturi va uslubiy hujjatlari doimiy ravishda takomillashtirilmoqda**",
      "ru": "На основе результатов оценки и анализа учебного процесса и проводимых мероприятий учебные программы и методические документы организации высшего образования постоянно совершенствуются**.",
      "en": "Based on evaluation and analysis of the learning process and the measures being implemented, curricula and methodological documents are continuously improved**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Yangilangan uslubiy hujjatlar; protokollar; o‘zgarishlarni taqqoslash jadvali.",
      "ru": "Обновленные методические документы; протоколы; таблица сопоставления изменений.",
      "en": "Updated methodological documents; minutes; change-comparison table."
    }
  },
  {
    "code": "3.4.1",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "O‘quv jarayonida o‘qitishning yangi usullari, ilg‘or pedagogik va innovatsion texnologiyalar (keyingi o‘rinlarda ilg‘or pedagogik yondashuvlar) muntazam qo‘llaniladi **",
      "ru": "В учебном процессе регулярно применяются новые методы обучения, передовые педагогические и инновационные технологии (далее — передовые педагогические подходы)**.",
      "en": "New teaching methods and advanced pedagogical and innovative technologies (hereinafter, advanced pedagogical approaches) are regularly applied in the learning process**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; professor-o‘qituvchilar",
      "ru": "Учебно-методический отдел; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; academic staff"
    },
    "evidence": {
      "uz": "Syllabuslar; dars rejalari; raqamli materiallar; loyihalar; innovatsion usullardan foydalanishga misollar.",
      "ru": "Силлабусы; планы занятий; цифровые материалы; проекты; примеры применения инновационных методов.",
      "en": "Syllabi; lesson plans; digital materials; projects; examples of innovative methods."
    }
  },
  {
    "code": "3.4.2",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilg‘or pedagogik yondashuvlar fanlar (modullar) mazmunini chuqur o‘zlashtirishga, o‘quvchilarning mustaqil bilim olish ko‘nikmalarini rivojlantirishga, tahliliy, tanqidiy va ijodiy fikrlashga, jamoada ishlashga, shuningdek, ta’lim dasturida belgilangan ta’lim natijalariga samarali erishishga qaratilgan**",
      "ru": "Передовые педагогические подходы направлены на глубокое освоение содержания дисциплин (модулей), развитие навыков самостоятельного обучения, аналитического, критического и творческого мышления, командной работы и эффективное достижение результатов обучения, установленных образовательной программой**.",
      "en": "Advanced pedagogical approaches are aimed at deep mastery of course/module content, development of independent learning skills, analytical, critical and creative thinking, teamwork, and effective achievement of the learning outcomes defined by the educational programme**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; professor-o‘qituvchilar",
      "ru": "Учебно-методический отдел; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; academic staff"
    },
    "evidence": {
      "uz": "Syllabuslar; dars rejalari; raqamli materiallar; loyihalar; innovatsion usullardan foydalanishga misollar.",
      "ru": "Силлабусы; планы занятий; цифровые материалы; проекты; примеры применения инновационных методов.",
      "en": "Syllabi; lesson plans; digital materials; projects; examples of innovative methods."
    }
  },
  {
    "code": "3.4.3",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilg‘or pedagogik yondashuvlar ta’lim shakli va talabalarning ehtiyojlarini hisobga olgan holda belgilanadi**",
      "ru": "Передовые педагогические подходы определяются с учетом формы обучения и потребностей студентов**.",
      "en": "Advanced pedagogical approaches are selected with consideration of the mode of study and student needs**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; professor-o‘qituvchilar",
      "ru": "Учебно-методический отдел; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; academic staff"
    },
    "evidence": {
      "uz": "Syllabuslar; dars rejalari; raqamli materiallar; loyihalar; innovatsion usullardan foydalanishga misollar.",
      "ru": "Силлабусы; планы занятий; цифровые материалы; проекты; примеры применения инновационных методов.",
      "en": "Syllabi; lesson plans; digital materials; projects; examples of innovative methods."
    }
  },
  {
    "code": "3.4.4",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilg‘or pedagogik yondashuvlar samaradorligini muntazam monitoring qilish va tahlil qilish amalga oshiriladi**",
      "ru": "Регулярно осуществляется мониторинг и анализ эффективности передовых педагогических подходов**.",
      "en": "The effectiveness of advanced pedagogical approaches is regularly monitored and analysed**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; tegishli kafedra mudiri",
      "ru": "Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Ta’lim texnologiyalaridan foydalanish monitoringi; samaradorlikni tahlil qilish; so‘rovlar.",
      "ru": "Мониторинг использования образовательных технологий; анализ эффективности; опросы.",
      "en": "Monitoring of educational technology use; effectiveness analysis; surveys."
    }
  },
  {
    "code": "3.4.5",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalari bo‘yicha aniqlangan kamchiliklarni bartaraf etish maqsadida professor-o‘qituvchilarning ilg‘or pedagogik yondashuvlarni qo‘llash borasidagi salohiyati doimiy ravishda rivojlantirilmoqda**",
      "ru": "Для устранения недостатков, выявленных по результатам мониторинга и анализа, постоянно развивается потенциал преподавателей в применении передовых педагогических подходов**.",
      "en": "To address shortcomings identified through monitoring and analysis, academic staff capacity to apply advanced pedagogical approaches is continuously developed**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Xodimlar bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел кадров; Заведующий соответствующей кафедрой",
      "en": "Human Resources Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Kasbiy rivojlanish rejalari; sertifikatlar; professor-o‘qituvchilar uchun seminarlar/treninglar.",
      "ru": "Планы профессионального развития; сертификаты; семинары/тренинги для преподавателей.",
      "en": "Professional development plans; certificates; seminars/training for academic staff."
    }
  },
  {
    "code": "3.4.6",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga ko‘ra o‘quv rejalari, o‘quv dasturlari va o‘quv-uslubiy majmualar yangilanib, ilg‘or pedagogik yondashuvlar bo‘yicha o‘quv-metodik qo‘llanmalar va o‘quv-metodik qo‘llanmalar muntazam ishlab chiqilib, joriy etilmoqda**",
      "ru": "По результатам мониторинга и анализа обновляются учебные планы, программы и учебно-методические комплексы, регулярно разрабатываются и внедряются учебно-методические материалы по передовым педагогическим подходам**.",
      "en": "Based on monitoring and analysis, curricula, study programmes and teaching-methodological packages are updated, and guidance materials on advanced pedagogical approaches are regularly developed and implemented**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; professor-o‘qituvchilar",
      "ru": "Заведующий соответствующей кафедрой; профессорско-преподавательский состав",
      "en": "Head of the relevant department; academic staff"
    },
    "evidence": {
      "uz": "Yangilangan dasturlar va uslubiy materiallar; ishlab chiqilgan qo‘llanmalar; amalga oshirish aktlari.",
      "ru": "Обновленные программы и методические материалы; разработанные пособия; акты внедрения.",
      "en": "Updated programmes and methodological materials; developed guides; implementation acts."
    }
  },
  {
    "code": "3.4.7",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv jarayonida ilg‘or pedagogik texnologiyalarning qo‘llanilgani va tegishli samaradorlikka erishilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilg‘or pedagogik yondashuvlar samaradorligi bo‘yicha tahliliy hisobot har yili tayyorlanadi va Oliy ta’lim tashkiloti Kengashi tomonidan ko‘rib chiqiladi**",
      "ru": "Ежегодно готовится аналитический отчет об эффективности передовых педагогических подходов и рассматривается Советом организации высшего образования**.",
      "en": "An analytical report on the effectiveness of advanced pedagogical approaches is prepared annually and reviewed by the Council of the higher education institution**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi; Kengash kotibi; tegishli kafedra mudiri",
      "ru": "Отдел контроля качества образования; Секретарь Совета; Заведующий соответствующей кафедрой",
      "en": "Education Quality Control Department; Council Secretary; Head of the relevant department"
    },
    "evidence": {
      "uz": "Yillik tahliliy hisobot; institut kengashi tomonidan ko‘rib chiqish bayonnomasi.",
      "ru": "Ежегодный аналитический отчет; протокол рассмотрения Советом института.",
      "en": "Annual analytical report; minutes of review by the Institute Council."
    }
  },
  {
    "code": "3.5.1",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining shaffof va xolis baholanishi, baholash jarayonlarining oʻquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Baholash tartibi (qoidalari), mezonlari, usullari va yondashuvlari har bir fan (modul) boshlanishidan oldin talabalar e’tiboriga havola etiladi**",
      "ru": "Порядок (правила), критерии, методы и подходы к оцениванию доводятся до сведения студентов до начала каждой дисциплины (модуля)**.",
      "en": "Assessment procedures, criteria, methods and approaches are communicated to students before the start of each course/module**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; tegishli kafedra mudiri; o'qituvchilar",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; преподаватели",
      "en": "Registrar’s Office; Head of the relevant department; teachers"
    },
    "evidence": {
      "uz": "Baholash to‘g‘risidagi nizom; o‘quv dasturlari; mezonlar/rubrikalar; HEMIS/LMS; namunaviy topshiriqlar.",
      "ru": "Положение об оценивании; учебные программы; критерии/рубрики; HEMIS/LMS; примеры заданий.",
      "en": "Assessment regulations; study programmes; criteria/rubrics; HEMIS/LMS; sample assignments."
    }
  },
  {
    "code": "3.5.2",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining shaffof va xolis baholanishi, baholash jarayonlarining oʻquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Ta’lim dasturi formativ (joriy) va summativ (yakuniy) baholashni ta’minlaydigan yondashuv va vositalardan foydalanadi**",
      "ru": "Образовательная программа использует подходы и инструменты, обеспечивающие формативное (текущее) и суммативное (итоговое) оценивание**.",
      "en": "The educational programme uses approaches and tools that provide both formative (ongoing) and summative (final) assessment**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; tegishli kafedra mudiri; o‘qituvchilar",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; преподаватели",
      "en": "Registrar’s Office; Head of the relevant department; teachers"
    },
    "evidence": {
      "uz": "Baholash to‘g‘risidagi nizom; o‘quv dasturlari; mezonlar/rubrikalar; HEMIS/LMS; namunaviy topshiriqlar.",
      "ru": "Положение об оценивании; учебные программы; критерии/рубрики; HEMIS/LMS; примеры заданий.",
      "en": "Assessment regulations; study programmes; criteria/rubrics; HEMIS/LMS; sample assignments."
    }
  },
  {
    "code": "3.5.3",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining shaffof va xolis baholanishi, baholash jarayonlarining oʻquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Baholash mezonlari fan (modul) va ta’lim dasturi bo‘yicha kutilayotgan o‘quv natijalariga asoslanadi va talabalarga aniq va tushunarli shaklda yetkaziladi**",
      "ru": "Критерии оценивания основаны на ожидаемых результатах обучения по дисциплине (модулю) и образовательной программе и доводятся до студентов в ясной и понятной форме**.",
      "en": "Assessment criteria are based on the expected learning outcomes of the course/module and educational programme and are communicated to students in a clear and understandable form**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; tegishli kafedra mudiri; o'qituvchilar",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; преподаватели",
      "en": "Registrar’s Office; Head of the relevant department; teachers"
    },
    "evidence": {
      "uz": "Baholash to‘g‘risidagi nizom; o‘quv dasturlari; mezonlar/rubrikalar; HEMIS/LMS; namunaviy topshiriqlar.",
      "ru": "Положение об оценивании; учебные программы; критерии/рубрики; HEMIS/LMS; примеры заданий.",
      "en": "Assessment regulations; study programmes; criteria/rubrics; HEMIS/LMS; sample assignments."
    }
  },
  {
    "code": "3.5.4",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining shaffof va xolis baholanishi, baholash jarayonlarining oʻquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Baholash jarayoni adolat, oshkoralik va akademik halollik tamoyillariga qat’iy amal qiladi**",
      "ru": "Процесс оценивания строго соблюдает принципы справедливости, прозрачности и академической честности**.",
      "en": "The assessment process strictly follows the principles of fairness, transparency and academic integrity**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Komplayens-nazorat bo‘limi; Registrator ofisi; Ta’lim sifatini nazorat qilish bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел комплаенс-контроля; Офис регистратора; Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Compliance Control Department; Registrar’s Office; Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Baholash va akademik halollik qoidalari; nazorat protokollari; tekshirish natijalari.",
      "ru": "Правила оценивания и академической честности; протоколы контроля; результаты проверок.",
      "en": "Assessment and academic integrity rules; monitoring records; inspection results."
    }
  },
  {
    "code": "3.6.1",
    "criterionCode": "3.6",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Talabalarning baholash natijalari boʻyicha fikr-mulohazalarini olish imkoniyati mavjudligi",
      "ru": "Наличие возможности получения обратной связи от студентов по результатам оценивания",
      "en": "Availability of mechanisms for obtaining student feedback on assessment results"
    },
    "indicator": {
      "uz": "Takliflar, fikr-mulohazalar va shikoyatlar talabalar uchun qulay sharoitlarda va ularning ehtiyojlariga javob beradigan shakllarda qabul qilinadi hamda ularni ko‘rib chiqish jarayoni shaffoflik, javobgarlik va manfaatlar to‘qnashuvining oldini olish tamoyillari asosida amalga oshiriladi**",
      "ru": "Предложения, отзывы и жалобы принимаются в удобных для студентов формах, отвечающих их потребностям, а их рассмотрение осуществляется на принципах прозрачности, подотчетности и предотвращения конфликта интересов**.",
      "en": "Suggestions, feedback and complaints are accepted in forms convenient for students and responsive to their needs; the review process is based on transparency, accountability and prevention of conflicts of interest**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Dekanatlar; Ta’lim sifatini nazorat qilish bo‘limi; Komplayens-nazorat bo‘limi",
      "ru": "Деканаты; Отдел контроля качества образования; Отдел комплаенс-контроля",
      "en": "Dean’s offices; Education Quality Control Department; Compliance Control Department"
    },
    "evidence": {
      "uz": "Kanallarni so‘rash; jurnallar/registrlar; ko‘rib chiqish tartibi; javoblar va statistika.",
      "ru": "Каналы обращений; журналы/реестры; порядок рассмотрения; ответы и статистика.",
      "en": "Feedback channels; journals/registers; review procedure; responses and statistics."
    }
  },
  {
    "code": "3.6.2",
    "criterionCode": "3.6",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Talabalarning baholash natijalari boʻyicha fikr-mulohazalarini olish imkoniyati mavjudligi",
      "ru": "Наличие возможности получения обратной связи от студентов по результатам оценивания",
      "en": "Availability of mechanisms for obtaining student feedback on assessment results"
    },
    "indicator": {
      "uz": "Talabalarning baholash jarayoni va natijalari bo‘yicha shikoyatlari oliy ta’lim tashkilotining apellyatsiya komissiyasi tomonidan ko‘rib chiqiladi va tizimli tahlil qilinadi**",
      "ru": "Жалобы студентов по процессу и результатам оценивания рассматриваются апелляционной комиссией организации высшего образования и системно анализируются**.",
      "en": "Student complaints regarding the assessment process and results are reviewed by the institution’s appeals commission and systematically analysed**."
    },
    "main": {
      "uz": "Apellyatsiya komissiyasi",
      "ru": "Апелляционная комиссия",
      "en": "Appeals Commission"
    },
    "co": {
      "uz": "Registrator ofisi; o‘quv-uslubiy bo‘lim; Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",
      "ru": "Офис регистратора; Учебно-методический отдел; Заместитель исполнительного директора по учебной работе",
      "en": "Registrar’s Office; Academic and Methodological Department; Deputy Executive Director for Academic Affairs"
    },
    "evidence": {
      "uz": "Apellyatsiya tartibi; komissiya tarkibi; bayonotlar; protokollar; analitika.",
      "ru": "Порядок апелляции; состав комиссии; заявления; протоколы; аналитика.",
      "en": "Appeals procedure; commission composition; applications; minutes; analytics."
    }
  },
  {
    "code": "3.6.3",
    "criterionCode": "3.6",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Talabalarning baholash natijalari boʻyicha fikr-mulohazalarini olish imkoniyati mavjudligi",
      "ru": "Наличие возможности получения обратной связи от студентов по результатам оценивания",
      "en": "Availability of mechanisms for obtaining student feedback on assessment results"
    },
    "indicator": {
      "uz": "Tahlil natijalariga ko‘ra hisobotlar tayyorlanadi, baholash jarayonini takomillashtirish chora-tadbirlari belgilanadi, baholash tartibi va mezonlariga zarur o‘zgartirishlar kiritiladi**",
      "ru": "По результатам анализа готовятся отчеты, определяются меры по совершенствованию процесса оценивания и вносятся необходимые изменения в порядок и критерии оценивания**.",
      "en": "Based on the analysis, reports are prepared, measures to improve assessment are defined, and necessary changes are made to assessment procedures and criteria**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Registrator ofisi; o‘quv-uslubiy bo‘lim",
      "ru": "Офис регистратора; Учебно-методический отдел",
      "en": "Registrar’s Office; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "So‘rovlar/murojaatlar bo‘yicha tahliliy hisobot; baholashni takomillashtirish rejasi.",
      "ru": "Аналитический отчет по опросам/обращениям; план совершенствования оценивания.",
      "en": "Analytical report on surveys/appeals; assessment improvement plan."
    }
  },
  {
    "code": "3.7.1",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini olish boʻyicha samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Akademik yaxlitlik tamoyillari ta’lim dasturini ishlab chiqish, o‘qitish, baholash va tadqiqot faoliyati jarayonlariga tizimli ravishda birlashtiriladi**",
      "ru": "Принципы академической честности системно интегрированы в процессы разработки образовательной программы, обучения, оценивания и исследовательской деятельности**.",
      "en": "Principles of academic integrity are systematically integrated into programme development, teaching, assessment and research activities**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Komplayens-nazorat bo‘limi; Ta’lim sifatini nazorat qilish bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел комплаенс-контроля; Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Compliance Control Department; Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Akademik halollik kodeksi/bayonoti; talablarni o‘quv dasturlari va baholashga integratsiya qilish.",
      "ru": "Кодекс/положение об академической честности; интеграция требований в учебные программы и оценивание.",
      "en": "Academic integrity code/policy; integration of requirements into curricula and assessment."
    }
  },
  {
    "code": "3.7.2",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini olish boʻyicha samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Plagiat va akademik daxlsizlik qoidalarining boshqa buzilishining oldini olish, aniqlash va bartaraf etish bo‘yicha antiplagiat tizimi va tashkiliy chora-tadbirlar joriy etildi**",
      "ru": "Внедрены антиплагиатная система и организационные меры по предупреждению, выявлению и устранению плагиата и иных нарушений академической честности**.",
      "en": "An anti-plagiarism system and organisational measures have been introduced to prevent, detect and address plagiarism and other violations of academic integrity**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi; Raqamli va axborot texnologiyalari bo‘limi; Komplayens-nazorat bo‘limi",
      "ru": "Управление научных исследований, инноваций и подготовки научно-педагогических кадров; Отдел цифровых и информационных технологий; Отдел комплаенс-контроля",
      "en": "Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; Digital and Information Technologies Department; Compliance Control Department"
    },
    "evidence": {
      "uz": "Plagiatga qarshi kelishuv/kirish; ko‘rsatmalar; tekshirish hisobotlari; tashkiliy chora-tadbirlar.",
      "ru": "Договор/доступ к антиплагиатной системе; инструкции; отчеты о проверках; организационные меры.",
      "en": "Anti-plagiarism agreement/access; instructions; verification reports; organisational measures."
    }
  },
  {
    "code": "3.7.3",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini olish boʻyicha samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Akademik daxlsizlik qoidalarini buzganlik holatlarini ko‘rib chiqish va jazolarni belgilashning shaffof tartibi mavjud**",
      "ru": "Существует прозрачный порядок рассмотрения случаев нарушения академической честности и определения мер ответственности**.",
      "en": "A transparent procedure exists for reviewing violations of academic integrity and determining sanctions**."
    },
    "main": {
      "uz": "Komplayens-nazorat bo‘limi",
      "ru": "Отдел комплаенс-контроля",
      "en": "Compliance Control Department"
    },
    "co": {
      "uz": "Yuriskonsult; O‘quv-uslubiy bo‘lim; Xodimlar bo‘limi; tegishli fakultet dekanati.",
      "ru": "Юрисконсульт; Учебно-методический отдел; Отдел кадров; tegishli fakultet dekanati.",
      "en": "Legal counsel; Academic and Methodological Department; Human Resources Department; tegishli fakultet dekanati."
    },
    "evidence": {
      "uz": "Huquqbuzarliklarni ko‘rib chiqish tartibi; komissiya; protokollar va majburiyatlar.",
      "ru": "Порядок рассмотрения нарушений; комиссия; протоколы и меры ответственности.",
      "en": "Procedure for reviewing violations; commission; minutes and accountability measures."
    }
  },
  {
    "code": "3.7.4",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini olish boʻyicha samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Talabalar va professor-o‘qituvchilar akademik halollik va axloq qoidalari bilan tanishadilar**",
      "ru": "Студенты и профессорско-преподавательский состав ознакомлены с правилами академической честности и этики**.",
      "en": "Students and academic staff are familiarised with academic integrity and ethical rules**."
    },
    "main": {
      "uz": "Komplayens-nazorat bo‘limi",
      "ru": "Отдел комплаенс-контроля",
      "en": "Compliance Control Department"
    },
    "co": {
      "uz": "Dekanatlar; Xodimlar bo‘limi; o‘quv-uslubiy bo‘lim; tegishli kafedra mudirlari.",
      "ru": "Деканаты; Отдел кадров; Учебно-методический отдел; tegishli kafedra mudirlari.",
      "en": "Dean’s offices; Human Resources Department; Academic and Methodological Department; tegishli kafedra mudirlari."
    },
    "evidence": {
      "uz": "Tanishuv varaqalari; brifing jurnallari; elektron tasdiqlar.",
      "ru": "Листы ознакомления; журналы инструктажей; электронные подтверждения.",
      "en": "Acknowledgement sheets; briefing logs; electronic confirmations."
    }
  },
  {
    "code": "3.7.5",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini olish boʻyicha samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Talabalar va professor-o‘qituvchilar uchun akademik halollik, axloq, plagiat, sun’iy intellektdan to‘g‘ri foydalanish, mualliflik huquqi va manfaatlar to‘qnashuvi** mavzularida muntazam ravishda treninglar (seminarlar, ma’ruzalar) tashkil etilmoqda.",
      "ru": "Для студентов и профессорско-преподавательского состава регулярно организуются тренинги (семинары, лекции) по академической честности, этике, плагиату, корректному использованию искусственного интеллекта, авторскому праву и конфликту интересов**.",
      "en": "Regular training sessions, seminars and lectures are organised for students and academic staff on academic integrity, ethics, plagiarism, responsible use of artificial intelligence, copyright and conflicts of interest**."
    },
    "main": {
      "uz": "Komplayens-nazorat bo‘limi",
      "ru": "Отдел комплаенс-контроля",
      "en": "Compliance Control Department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi; Yuriskonsult; Xodimlar bo‘limi; tegishli fakultet dekanatlari va kafedra mudirlari",
      "ru": "Учебно-методический отдел; Управление научных исследований, инноваций и подготовки научно-педагогических кадров; Юрисконсульт; Отдел кадров; деканаты соответствующих факультетов и заведующие кафедрами",
      "en": "Academic and Methodological Department; Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; Legal counsel; Human Resources Department; relevant faculty dean’s offices and heads of departments"
    },
    "evidence": {
      "uz": "Seminarlarning rejalari va materiallari; ishtirokchilar ro‘yxati; fotosuratlar/protokollar; sertifikatlar.",
      "ru": "Планы и материалы семинаров; списки участников; фотографии/протоколы; сертификаты.",
      "en": "Seminar plans and materials; participant lists; photographs/minutes; certificates."
    }
  },
  {
    "code": "3.7.6",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. O‘QUV JARAYONINI TASHKIL ETISH VA TA’LIM NATIJALARINI BAHOLASH",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini olish boʻyicha samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Talabalar va professor-oʻqituvchilar tomonidan yaratilgan ilmiy ishlar, innovatsion gʻoyalar, ixtirolar va boshqa intellektual mulkka boʻlgan huquqlar himoyasi taʼminlanadi**",
      "ru": "Обеспечивается защита прав на научные работы, инновационные идеи, изобретения и иные объекты интеллектуальной собственности, созданные студентами и профессорско-преподавательским составом**.",
      "en": "Protection is ensured for rights to research works, innovative ideas, inventions and other intellectual property created by students and academic staff**."
    },
    "main": {
      "uz": "Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по научной работе",
      "en": "Deputy Executive Director for Research"
    },
    "co": {
      "uz": "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash boshqarmasi; yuriskonsult; Komplayens-nazorat bo‘limi; tegishli kafedra mudiri",
      "ru": "Управление научных исследований, инноваций и подготовки научно-педагогических кадров; юрисконсульт; Отдел комплаенс-контроля; Заведующий соответствующей кафедрой",
      "en": "Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; legal counsel; Compliance Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Intellektual mulk to‘g‘risidagi nizom; shartnomalar; patentlar/sertifikatlar; huquqlarini himoya qilish choralari.",
      "ru": "Положение об интеллектуальной собственности; договоры; патенты/сертификаты; меры защиты прав.",
      "en": "Intellectual-property regulation; agreements; patents/certificates; rights-protection measures."
    }
  },
  {
    "code": "4.1.1",
    "criterionCode": "4.1",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi boʻyicha qabul talablari aniq belgilangani, oʻqishga qabul qilish shaffof tarzda yoʻlga qoʻyilgani",
      "ru": "Четкое определение требований приема на образовательную программу и прозрачная организация приема",
      "en": "Clearly defined programme admission requirements and transparent admissions procedures"
    },
    "indicator": {
      "uz": "Chet tilida amalga oshiriladigan ta’lim dasturiga hujjat topshirishda, Nomzodlardan milliy yoki xalqaro talablarga javob beradigan chet tilini bilish darajasi talab qilinadi** (Bunda abituriyentning dasturga kirishdan oldin chet tilini yetarli darajada bilishi tegishli hujjat bilan tasdiqlanadi)",
      "ru": "При поступлении на образовательную программу, реализуемую на иностранном языке, от кандидатов требуется уровень владения иностранным языком, соответствующий национальным или международным требованиям; достаточный уровень подтверждается соответствующим документом**.",
      "en": "For admission to a programme delivered in a foreign language, applicants must demonstrate a level of foreign-language proficiency meeting national or international requirements; sufficient proficiency is confirmed by an appropriate document**."
    },
    "main": {
      "uz": "Qabul komissiyasi",
      "ru": "Приемная комиссия",
      "en": "Admissions Committee"
    },
    "co": {
      "uz": "Xalqaro hamkorlik bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Отдел международного сотрудничества; Учебно-методический отдел",
      "en": "International Cooperation Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Qabul qilish qoidalari; til sertifikatlariga qo‘yiladigan talablar; olingan hujjatlar - agar ko‘rsatkich mavjud bo‘lsa.",
      "ru": "Правила приема; требования к языковым сертификатам; полученные документы при наличии показателя.",
      "en": "Admission rules; language-certificate requirements; received documents where applicable."
    }
  },
  {
    "code": "4.1.2",
    "criterionCode": "4.1",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi boʻyicha qabul talablari aniq belgilangani, oʻqishga qabul qilish shaffof tarzda yoʻlga qoʻyilgani",
      "ru": "Четкое определение требований приема на образовательную программу и прозрачная организация приема",
      "en": "Clearly defined programme admission requirements and transparent admissions procedures"
    },
    "indicator": {
      "uz": "Ta’lim dasturiga qabul qilish talablari o‘tgan yillarda qabul qilingan talabalarni formativ va summativ baholash natijalari bo‘yicha tizimli ravishda ko‘rib chiqiladi va zarurat tug‘ilganda o‘zgartirishlar kiritiladi**",
      "ru": "Требования к приему на образовательную программу системно пересматриваются с учетом результатов формативного и суммативного оценивания студентов, принятых в предыдущие годы, и при необходимости корректируются**.",
      "en": "Admission requirements for the educational programme are systematically reviewed using formative and summative assessment results of students admitted in previous years and are adjusted where necessary**."
    },
    "main": {
      "uz": "Qabul komissiyasi",
      "ru": "Приемная комиссия",
      "en": "Admissions Committee"
    },
    "co": {
      "uz": "Registrator ofisi; o‘quv-uslubiy bo‘lim; ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Офис регистратора; Учебно-методический отдел; Отдел контроля качества образования",
      "en": "Registrar’s Office; Academic and Methodological Department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Qabul qilingan kontingentlarni tayyorlash natijalarini tahlil qilish; qabul qilish talablarini tuzatish bo‘yicha takliflar.",
      "ru": "Анализ результатов обучения принятого контингента; предложения по корректировке требований приема.",
      "en": "Analysis of learning outcomes of admitted cohorts; proposals to adjust admission requirements."
    }
  },
  {
    "code": "4.2.1",
    "criterionCode": "4.2",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Qabul parametrlarining taʼlim tashkilotining resurslari va imkoniyatlariga mos kelishi",
      "ru": "Соответствие параметров приема ресурсам и возможностям образовательной организации",
      "en": "Alignment of admission parameters with the resources and capacity of the educational institution"
    },
    "indicator": {
      "uz": "Qabul qilish parametrlarini amalga oshirish tahlili har yili amalga oshiriladi va tahlil natijalariga ko‘ra qabul parametrlariga zarur o‘zgartirishlar kiritiladi**",
      "ru": "Ежегодно проводится анализ реализации параметров приема, по результатам которого при необходимости в параметры приема вносятся изменения**.",
      "en": "Implementation of admission parameters is analysed annually and necessary changes are made based on the results**."
    },
    "main": {
      "uz": "Qabul komissiyasi",
      "ru": "Приемная комиссия",
      "en": "Admissions Committee"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; Reja-moliya bo‘limi; dekanatlar",
      "ru": "Учебно-методический отдел; Планово-финансовый отдел; деканаты",
      "en": "Academic and Methodological Department; Planning and Finance Department; dean’s offices"
    },
    "evidence": {
      "uz": "Qabul qilish parametrlarini amalga oshirishning yillik tahlili; resurslar bilan ta’minlashni hisoblash; taklif qiladi.",
      "ru": "Ежегодный анализ реализации параметров приема; расчет ресурсного обеспечения; предложения.",
      "en": "Annual analysis of admission-parameter implementation; resource calculations; proposals."
    }
  },
  {
    "code": "4.3.1",
    "criterionCode": "4.3",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarning oʻqishini koʻchirish, kursdan-kursga oʻtkazish (qoldirish), oʻqishdan chetlashtirish va oʻqishini qayta tiklash (bundan buyon matnda talabalar harakati deb yuritiladi) tartibining belgilangani",
      "ru": "Установленный порядок перевода, перехода с курса на курс, отчисления и восстановления студентов",
      "en": "Established procedures for student transfer, progression, dismissal and reinstatement"
    },
    "indicator": {
      "uz": "Talabalar harakatiga oid ichki hujjatlar (qoidalar, tartiblar, tartiblar) mavjud bo‘lib, talabalar va ularning ota-onalari ko‘chirish, kursdan kursga o‘tish, o‘qishdan chetlashtirish va qayta tiklash jarayonlari va natijalari to‘g‘risida xabardor qilinadi**",
      "ru": "Имеются внутренние документы, регулирующие движение студентов; студенты и их родители информируются о процедурах и результатах перевода, перехода с курса на курс, отчисления и восстановления**.",
      "en": "Internal documents regulating student mobility are in place; students and their parents are informed about procedures and outcomes for transfer, progression, dismissal and reinstatement**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Dekanatlar; yuriskonsult; Raqamli va axborot texnologiyalari bo‘limi",
      "ru": "Деканаты; юрисконсульт; Отдел цифровых и информационных технологий",
      "en": "Dean’s offices; legal counsel; Digital and Information Technologies Department"
    },
    "evidence": {
      "uz": "Talabalar harakatining ichki tartibi; eslatmalar; talabalar va ota-onalarga nashrlar/xabarnomalar.",
      "ru": "Внутренний порядок движения студентов; памятки; публикации/уведомления студентам и родителям.",
      "en": "Internal student-mobility procedure; memos; publications/notifications for students and parents."
    }
  },
  {
    "code": "4.3.2",
    "criterionCode": "4.3",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarning oʻqishini koʻchirish, kursdan-kursga oʻtkazish (qoldirish), oʻqishdan chetlashtirish va oʻqishini qayta tiklash (bundan buyon matnda talabalar harakati deb yuritiladi) tartibining belgilangani",
      "ru": "Установленный порядок перевода, перехода с курса на курс, отчисления и восстановления студентов",
      "en": "Established procedures for student transfer, progression, dismissal and reinstatement"
    },
    "indicator": {
      "uz": "Talabalar harakati masalalari bo‘yicha qabul qilingan qarorlar tegishli asoslar bilan hujjatlashtiriladi**",
      "ru": "Решения по вопросам движения студентов документируются с указанием соответствующих оснований**.",
      "en": "Decisions on student mobility matters are documented with the relevant grounds**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Dekanatlar; o‘quv-uslubiy bo‘lim; yuriskonsult",
      "ru": "Деканаты; Учебно-методический отдел; юрисконсульт",
      "en": "Dean’s offices; Academic and Methodological Department; legal counsel"
    },
    "evidence": {
      "uz": "O‘tkazish, qayta tiklash, chiqarib yuborish to‘g‘risidagi buyruqlar /qarorlar; asoslar; protokollar.",
      "ru": "Приказы/решения о переводе, восстановлении и отчислении; основания; протоколы.",
      "en": "Orders/decisions on transfer, reinstatement and dismissal; grounds; minutes."
    }
  },
  {
    "code": "4.4.1",
    "criterionCode": "4.4",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarni qoʻllab-quvvatlash va ularga maslahat berish mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Talabalarga “Ustoz-shogird” formatida yordam ko‘rsatiladi va to‘g‘ri fanlarni (modullarni) tanlash, baholash tizimini tushunish va shaxsiy rivojlanish yo‘nalishini aniqlashda murabbiylik yordami ko‘rsatiladi**",
      "ru": "Студентам оказывается поддержка в формате «Устоз-шогирд», включая наставничество при выборе дисциплин (модулей), понимании системы оценивания и определении направления личностного развития**.",
      "en": "Students receive support in the “Mentor–Apprentice” format, including mentoring in selecting courses/modules, understanding the assessment system and defining personal development pathways**."
    },
    "main": {
      "uz": "Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по работе с молодежью",
      "en": "Deputy Executive Director for Youth Affairs"
    },
    "co": {
      "uz": "Dekanatlar; tegishli kafedra mudiri; tyutorlar",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; тьюторы",
      "en": "Dean’s offices; Head of the relevant department; tutors"
    },
    "evidence": {
      "uz": "Mentorlar bo'yicha buyurtmalar; rejalar va hisobotlar; maslahatlashuvlar; jurnallar/protokollar.",
      "ru": "Приказы по наставникам; планы и отчеты; консультации; журналы/протоколы.",
      "en": "Mentor appointment orders; plans and reports; consultations; journals/minutes."
    }
  },
  {
    "code": "4.4.2",
    "criterionCode": "4.4",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarni qoʻllab-quvvatlash va ularga maslahat berish mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Psixologik maslahat va yordam markazi tashkil etildi**",
      "ru": "Создан центр психологического консультирования и помощи**.",
      "en": "A psychological counselling and support centre has been established**."
    },
    "main": {
      "uz": "Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по работе с молодежью",
      "en": "Deputy Executive Director for Youth Affairs"
    },
    "co": {
      "uz": "Psixolog; dekanatlar",
      "ru": "Психолог; деканаты",
      "en": "Psychologist; dean’s offices"
    },
    "evidence": {
      "uz": "Psixologik xizmatlar to‘g‘risidagi buyruq/nizom; jadval; maslahat jurnali; axborot materiallari.",
      "ru": "Приказ/положение о психологической службе; график; журнал консультаций; информационные материалы.",
      "en": "Order/regulation on psychological services; schedule; counselling log; information materials."
    }
  },
  {
    "code": "4.4.3",
    "criterionCode": "4.4",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarni qoʻllab-quvvatlash va ularga maslahat berish mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Akademik qarzdor talabalar bilan tizimli ish olib borilmoqda**",
      "ru": "Системно ведется работа со студентами, имеющими академическую задолженность**.",
      "en": "Systematic work is carried out with students who have academic arrears**."
    },
    "main": {
      "uz": "Dekanatlar",
      "ru": "Деканаты",
      "en": "Dean’s offices"
    },
    "co": {
      "uz": "Registrator ofisi; tegishli kafedra mudiri; o‘quv-uslubiy bo‘lim",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Registrar’s Office; Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Akademik qarzlar reestri; individual jadvallar; protokollar va ish natijalari.",
      "ru": "Реестр академических задолженностей; индивидуальные графики; протоколы и результаты работы.",
      "en": "Academic arrears register; individual schedules; minutes and work results."
    }
  },
  {
    "code": "4.4.4",
    "criterionCode": "4.4",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarni qoʻllab-quvvatlash va ularga maslahat berish mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Talabalarning qiziqishlari va kasbiy maqsadlarini hisobga olgan holda individual ta’lim traektoriyasi shakllantiriladi va uni amalga oshirish uchun uslubiy va axborot ta’minoti ta’minlanadi**",
      "ru": "С учетом интересов и профессиональных целей студентов формируется индивидуальная образовательная траектория и обеспечивается методическое и информационное сопровождение ее реализации**.",
      "en": "Individual learning pathways are formed in accordance with students’ interests and professional goals, with methodological and information support for their implementation**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; dekanatlar; tegishli kafedra mudiri",
      "ru": "Офис регистратора; деканаты; Заведующий соответствующей кафедрой",
      "en": "Registrar’s Office; dean’s offices; Head of the relevant department"
    },
    "evidence": {
      "uz": "Shaxsiy traektoriyani shakllantirish tartibi; fanlarni tanlash; maslahatlashuvlar; IEP.",
      "ru": "Порядок формирования индивидуальной траектории; выбор дисциплин; консультации; индивидуальный учебный план.",
      "en": "Procedure for forming individual pathways; course selection; consultations; individual education plan."
    }
  },
  {
    "code": "4.4.5",
    "criterionCode": "4.4",
    "chapter": {
      "uz": "4-BOB. TALABALAR FAOLIYATI",
      "ru": "ГЛАВА 4. ДЕЯТЕЛЬНОСТЬ СТУДЕНТОВ",
      "en": "CHAPTER 4. STUDENT ACTIVITIES"
    },
    "criterion": {
      "uz": "Talabalarni qoʻllab-quvvatlash va ularga maslahat berish mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Konsultatsiya xizmatlaridan foydalanish va ularning samaradorligi to‘g‘risidagi ma’lumotlar yig‘iladi va tahlil qilinadi, talabalarning ushbu xizmatlardan qoniqish darajasi muntazam ravishda baholanadi va maslahat tizimi takomillashtiriladi**",
      "ru": "Собираются и анализируются данные об использовании консультационных услуг и их эффективности, регулярно оценивается удовлетворенность студентов и совершенствуется система консультирования**.",
      "en": "Data on the use and effectiveness of counselling services are collected and analysed, student satisfaction is regularly assessed, and the counselling system is improved**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Yoshlar bilan ishlash bo‘limi; dekanatlar; Registrator ofisi",
      "ru": "Отдел по работе с молодежью; деканаты; Офис регистратора",
      "en": "Youth Affairs Department; dean’s offices; Registrar’s Office"
    },
    "evidence": {
      "uz": "Konsalting xizmatlaridan qoniqish so‘rovi; tahlil; takomillashtirish rejasi.",
      "ru": "Опрос удовлетворенности консультационными услугами; анализ; план совершенствования.",
      "en": "Satisfaction survey on counselling services; analysis; improvement plan."
    }
  },
  {
    "code": "5.1.1",
    "criterionCode": "5.1",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi uchun belgilangan meʼyorlarga muvofiq pedagog kadrlar, shuningdek, boshqaruv, texnik, xizmat koʻrsatuvchi va oʻquv-yordamchi xodimlar mavjudligi hamda ularning sifat tarkibi, malakasi va mutaxassisligi belgilangan talablarga mosligi",
      "ru": "Наличие педагогических, управленческих, технических, обслуживающих и учебно-вспомогательных работников в соответствии с нормами программы и соответствие их состава, квалификации и специализации установленным требованиям",
      "en": "Availability of academic, managerial, technical, service and support staff in accordance with programme norms and compliance of their composition, qualifications and specialisations with established requirements"
    },
    "indicator": {
      "uz": "Xodimlarni ijtimoiy qo‘llab-quvvatlash va moddiy rag‘batlantirish tizimi joriy etildi**",
      "ru": "Внедрена система социальной поддержки и материального стимулирования работников**.",
      "en": "A system of social support and financial incentives for staff has been introduced**."
    },
    "main": {
      "uz": "Xodimlar bo‘limi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Reja-moliya bo‘limi; Institut boshqaruvi",
      "ru": "Планово-финансовый отдел; Руководство института",
      "en": "Planning and Finance Department; Institute Management"
    },
    "evidence": {
      "uz": "Rag‘batlantirish qoidalari; reklama buyurtmalari; ijtimoiy chora-tadbirlar; to‘lovlarni tasdiqlash.",
      "ru": "Правила стимулирования; приказы о поощрении; социальные мероприятия; подтверждение выплат.",
      "en": "Incentive rules; reward orders; social measures; payment confirmations."
    }
  },
  {
    "code": "5.2.1",
    "criterionCode": "5.2",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv rejadagi fanlarga mos (tegishli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Ta’lim dasturining maqsad, vazifalari va kutilayotgan o‘quv natijalaridan kelib chiqib, o‘quv rejasini samarali amalga oshirishni ta’minlash uchun professor-o‘qituvchilarning soni va tarkibi shakllantirildi**",
      "ru": "Исходя из целей, задач и ожидаемых результатов образовательной программы сформированы численность и состав профессорско-преподавательского состава, обеспечивающие эффективную реализацию учебного плана**.",
      "en": "Based on the objectives, tasks and expected learning outcomes of the educational programme, the number and composition of academic staff have been formed to ensure effective delivery of the curriculum**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Xodimlar bo‘limi; o‘quv-uslubiy bo‘lim; Ijrochi direktorning o‘quv ishlari bo‘yicha o‘rinbosari",
      "ru": "Отдел кадров; Учебно-методический отдел; Заместитель исполнительного директора по учебной работе",
      "en": "Human Resources Department; Academic and Methodological Department; Deputy Executive Director for Academic Affairs"
    },
    "evidence": {
      "uz": "Kadrlar jadvali; tariflash; yukni taqsimlash; xodimlar haqida ma’lumot.",
      "ru": "Штатное расписание; тарификация; распределение нагрузки; сведения о сотрудниках.",
      "en": "Staffing schedule; workload/tariffing; workload distribution; staff information."
    }
  },
  {
    "code": "5.2.2",
    "criterionCode": "5.2",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv rejadagi fanlarga mos (tegishli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "O‘qituvchilar tarkibining ixtisosligi o‘qitiladigan fanlarga (modullarga) mos keladi**",
      "ru": "Специализация преподавательского состава соответствует преподаваемым дисциплинам (модулям)**.",
      "en": "The specialisation of academic staff corresponds to the courses/modules they teach**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Xodimlar bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Отдел кадров; Учебно-методический отдел",
      "en": "Human Resources Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Diplomlar/sertifikatlar; tajriba haqida ma’lumot; o‘qituvchi-intizom yozishmalari matritsasi.",
      "ru": "Дипломы/сертификаты; сведения об опыте; матрица соответствия преподавателей дисциплинам.",
      "en": "Diplomas/certificates; experience information; teacher-to-course alignment matrix."
    }
  },
  {
    "code": "5.2.3",
    "criterionCode": "5.2",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv rejadagi fanlarga mos (tegishli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Professor-o‘qituvchilarning erishgan yutuqlari ko‘rsatkichlari shakllantirildi (davlat va tarmoq mukofotlari, faxriy unvonlar, xalqaro va respublika tanlovlaridagi g‘alabalar va boshqa yutuqlar) **",
      "ru": "Сформированы показатели достижений профессорско-преподавательского состава (государственные и отраслевые награды, почетные звания, победы в международных и республиканских конкурсах и иные достижения)**.",
      "en": "Indicators of academic staff achievements have been compiled, including state and sector awards, honorary titles, victories in international and national competitions and other achievements**."
    },
    "main": {
      "uz": "Xodimlar bo‘limi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Ilmiy ishlar bo‘yicha direktor o‘rinbosari; tegishli kafedra mudiri",
      "ru": "Заместитель директора по научной работе; Заведующий соответствующей кафедрой",
      "en": "Deputy Director for Research; Head of the relevant department"
    },
    "evidence": {
      "uz": "Mukofotlar, unvonlar va yutuqlar reestri; tasdiqlovchi hujjatlarning nusxalari.",
      "ru": "Реестр наград, званий и достижений; копии подтверждающих документов.",
      "en": "Register of awards, titles and achievements; copies of supporting documents."
    }
  },
  {
    "code": "5.2.4",
    "criterionCode": "5.2",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv rejadagi fanlarga mos (tegishli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Professor-o‘qituvchilarning o‘quv, ilmiy, uslubiy va ilmiy-tadqiqot faoliyati natijalari (fundamental, amaliy va boshqa ilmiy loyihalarda ishtirok etish, darsliklar, o‘quv qo‘llanmalar va o‘quv-uslubiy ishlanmalar tayyorlash, mahalliy va xalqaro nashrlarda nashrlar, shu jumladan Scopus, Web of Science yoki boshqa umume’tirof etilgan ma’lumotlar bazalarida indekslangan impakt faktorli jurnallarda va boshqalar)**",
      "ru": "Учитываются результаты учебной, научной, методической и научно-исследовательской деятельности профессорско-преподавательского состава, включая участие в проектах, подготовку учебных изданий и публикации в национальных и международных изданиях, в том числе индексируемых в Scopus, Web of Science и иных признанных базах данных**.",
      "en": "Results of teaching, scientific, methodological and research activities of academic staff are documented, including participation in projects, preparation of educational publications and publications in national and international journals, including those indexed in Scopus, Web of Science and other recognised databases**."
    },
    "main": {
      "uz": "Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по научной работе",
      "en": "Deputy Executive Director for Research"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; Xodimlar bo‘limi",
      "ru": "Заведующий соответствующей кафедрой; Отдел кадров",
      "en": "Head of the relevant department; Human Resources Department"
    },
    "evidence": {
      "uz": "Ilmiy va uslubiy ishlar reestri; nashrlar; loyihalar; Scopus/WoS va boshqa tasdiqlar.",
      "ru": "Реестр научных и методических работ; публикации; проекты; подтверждения Scopus/WoS и др.",
      "en": "Register of scientific and methodological works; publications; projects; Scopus/WoS and other evidence."
    }
  },
  {
    "code": "5.2.5",
    "criterionCode": "5.2",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari bo‘yicha o‘quv rejadagi fanlarga mos (tegishli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Xodimlarni doimiy ravishda ichki va tashqi malaka oshirish kurslariga yuborish tizimi yaratildi**",
      "ru": "Создана система регулярного направления работников на внутренние и внешние курсы повышения квалификации**.",
      "en": "A system has been established for regularly sending staff to internal and external professional development courses**."
    },
    "main": {
      "uz": "Xodimlar bo‘limi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "O‘quv ishlari bo‘yicha o‘rinbosari; Xalqaro hamkorlik bo‘limi; tegishli kafedra mudiri",
      "ru": "Заместитель по учебной работе; Отдел международного сотрудничества; Заведующий соответствующей кафедрой",
      "en": "Deputy for Academic Affairs; International Cooperation Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Kasbiy rivojlanish rejasi; buyurtmalar; shartnomalar; sertifikatlar; hisobot berish.",
      "ru": "План профессионального развития; приказы; договоры; сертификаты; отчетность.",
      "en": "Professional development plan; orders; agreements; certificates; reports."
    }
  },
  {
    "code": "5.4.1",
    "criterionCode": "5.4",
    "chapter": {
      "uz": "5-BOB. INSON RESURSLARI",
      "ru": "ГЛАВА 5. ЧЕЛОВЕЧЕСКИЕ РЕСУРСЫ",
      "en": "CHAPTER 5. HUMAN RESOURCES"
    },
    "criterion": {
      "uz": "Kadrlarning kasbiy rivojlanishi va malaka oshirishiga sharoit yaratilgani, moddiy va maʼnaviy ragʻbatlantirish tizimining mavjudligi",
      "ru": "Создание условий для профессионального развития и повышения квалификации кадров, наличие системы материального и морального стимулирования",
      "en": "Conditions for staff professional development and continuing education, with a system of material and non-material incentives"
    },
    "indicator": {
      "uz": "Xodimlarni mutaxassisligi bo‘yicha xorijiy amaliyot va konferensiyalarga yuborish amaliyoti mavjud**",
      "ru": "Практикуется направление работников на зарубежные стажировки и конференции по профилю их специальности**.",
      "en": "There is a practice of sending staff to international internships and conferences relevant to their specialisation**."
    },
    "main": {
      "uz": "Xalqaro hamkorlik bo‘limi",
      "ru": "Отдел международного сотрудничества",
      "en": "International Cooperation Department"
    },
    "co": {
      "uz": "Ijrochi direktorning ilmiy ishlar bo‘yicha o‘rinbosari; Xodimlar bo‘limi; tegishli kafedra mudiri",
      "ru": "Заместитель исполнительного директора по научной работе; Отдел кадров; Заведующий соответствующей кафедрой",
      "en": "Deputy Executive Director for Research; Human Resources Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Amaliyot/konferentsiya bo'yicha buyurtmalar; taklifnomalar; sertifikatlar; natijalar haqida hisobot.",
      "ru": "Приказы по стажировкам/конференциям; приглашения; сертификаты; отчеты о результатах.",
      "en": "Internship/conference orders; invitations; certificates; outcome reports."
    }
  },
  {
    "code": "6.1.1",
    "criterionCode": "6.1",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish uchun amaliy, laboratoriya mashgʻulotlari va kurs ishi (loyiha)ni bajarish uchun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomashyo materiallari va boshqalarning mavjudligi hamda metodik qoʻllanma (koʻrsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Uskunalar, asboblar va texnik vositalar uchun texnik pasportlar mavjud; texnik ko‘rikdan o‘tkaziladi va profilaktika ishlari (ta’mirlash, profilaktika) hujjatlashtiriladi**",
      "ru": "Для оборудования, приборов и технических средств имеются технические паспорта; проводятся технические осмотры и документируются профилактические и ремонтные работы**.",
      "en": "Technical passports are available for equipment, instruments and technical devices; technical inspections are carried out and preventive maintenance and repairs are documented**."
    },
    "main": {
      "uz": "Ishlar boshqarmasi boshlig‘i",
      "ru": "Начальник управления делами",
      "en": "Head of Administrative Affairs"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; laboratoriya mudirlari va uskunalar uchun mas’ullar",
      "ru": "Заведующий соответствующей кафедрой; заведующие лабораториями и ответственные за оборудование",
      "en": "Head of the relevant department; laboratory heads and equipment officers"
    },
    "evidence": {
      "uz": "Inventarizatsiya hisoboti; texnik pasportlar; tekshirish hisobotlari; texnik xizmat ko‘rsatish va ta’mirlash jurnallari.",
      "ru": "Инвентаризационный отчет; технические паспорта; акты проверок; журналы техобслуживания и ремонта.",
      "en": "Inventory report; technical passports; inspection reports; maintenance and repair logs."
    }
  },
  {
    "code": "6.1.2",
    "criterionCode": "6.1",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish uchun amaliy, laboratoriya mashgʻulotlari va kurs ishi (loyiha)ni bajarish uchun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomashyo materiallari va boshqalarning mavjudligi hamda metodik qoʻllanma (koʻrsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Uslubiy qo‘llanmalar, o‘quv va texnologik xaritalar, asbob-uskunalar, qurilmalar va texnik vositalar uchun ko‘rsatmalar va foydalanish ko‘rsatmalari, shu jumladan xavfsizlik bo‘yicha ko‘rsatmalar mavjud**",
      "ru": "Имеются методические пособия, учебные и технологические карты, инструкции и руководства по эксплуатации оборудования, устройств и технических средств, включая инструкции по безопасности**.",
      "en": "Methodological guides, instructional and technological maps, operating instructions and manuals for equipment, devices and technical resources, including safety instructions, are available**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ishlar boshqarmasi boshlig‘i;; Mehnatni muhofaza qilish va texnika xavfsizligi bo‘yicha mas’ul",
      "ru": "Начальник управления делами; ответственный по охране труда и технике безопасности",
      "en": "Head of Administrative Affairs; occupational health and safety officer"
    },
    "evidence": {
      "uz": "Ko‘rsatmalar; texnologik xaritalar; ishlash qoidalari; brifing jurnallari.",
      "ru": "Инструкции; технологические карты; правила эксплуатации; журналы инструктажей.",
      "en": "Instructions; technological maps; operating rules; briefing logs."
    }
  },
  {
    "code": "6.1.3",
    "criterionCode": "6.1",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish uchun amaliy, laboratoriya mashgʻulotlari va kurs ishi (loyiha)ni bajarish uchun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomashyo materiallari va boshqalarning mavjudligi hamda metodik qoʻllanma (koʻrsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Soha mutaxassislari yoki ish beruvchilar bilan birgalikda o‘qituvchilar va talabalar uchun asbob-uskunalar bilan ishlash bo‘yicha treninglar (mahorat darslari) tashkil etildi**",
      "ru": "Совместно с отраслевыми специалистами или работодателями организованы тренинги (мастер-классы) для преподавателей и студентов по работе с оборудованием**.",
      "en": "Training sessions and master classes on using equipment are organised for academic staff and students jointly with industry experts or employers**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "laboratoriya mudiri (laboratoriya uchun mas’ul xodim); Marketing va talabalar amaliyoti bo‘limi; ish beruvchilar va soha mutaxassislari",
      "ru": "заведующий лабораторией (ответственный сотрудник); Отдел маркетинга и практики студентов; работодатели и отраслевые специалисты",
      "en": "laboratory head (responsible staff member); Marketing and Student Practice Department; employers and industry experts"
    },
    "evidence": {
      "uz": "Mahorat darslarining rejalari va dasturlari; ishtirokchilar ro‘yxati; fotosurat; protokollar/sertifikatlar.",
      "ru": "Планы и программы мастер-классов; списки участников; фотографии; протоколы/сертификаты.",
      "en": "Master-class plans and programmes; participant lists; photographs; minutes/certificates."
    }
  },
  {
    "code": "6.1.4",
    "criterionCode": "6.1",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oshirish uchun amaliy, laboratoriya mashgʻulotlari va kurs ishi (loyiha)ni bajarish uchun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomashyo materiallari va boshqalarning mavjudligi hamda metodik qoʻllanma (koʻrsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Amaliy va laboratoriya mashg‘ulotlari uchun o‘quv xonalarini modernizatsiya qilish va innovatsion texnologiyalar bilan jihozlash bo‘yicha yillik reja ishlab chiqildi**",
      "ru": "Разработан ежегодный план модернизации учебных помещений для практических и лабораторных занятий и их оснащения инновационными технологиями**.",
      "en": "An annual plan has been developed to modernise classrooms for practical and laboratory activities and equip them with innovative technologies**."
    },
    "main": {
      "uz": "Ishlar boshqarmasi boshlig‘i",
      "ru": "Начальник управления делами",
      "en": "Head of Administrative Affairs"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; Reja-moliya bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Заведующий соответствующей кафедрой; Планово-финансовый отдел; Учебно-методический отдел",
      "en": "Head of the relevant department; Planning and Finance Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Yillik laboratoriyani modernizatsiya qilish rejasi; taxminlar; xaridlar; kiritish aktlari; fotografik yozuv.",
      "ru": "Ежегодный план модернизации лабораторий; сметы; закупки; акты ввода; фотофиксация.",
      "en": "Annual laboratory modernisation plan; estimates; procurement; commissioning acts; photo records."
    }
  },
  {
    "code": "6.2.1",
    "criterionCode": "6.2",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Fanlar kesimida oʻquv va oʻquv-metodik adabiyotlar, elektron taʼlim resurslari bilan belgilangan talablarga muvofiq taʼminlangani",
      "ru": "Обеспечение по дисциплинам учебной и учебно-методической литературой и электронными образовательными ресурсами в соответствии с требованиями",
      "en": "Provision of teaching and methodological literature and electronic learning resources for each course in accordance with requirements"
    },
    "indicator": {
      "uz": "O‘qituvchilar va talabalar uchun elektron resurslardan uzluksiz foydalanish imkoniyati ta’minlangan**",
      "ru": "Для преподавателей и студентов обеспечен непрерывный доступ к электронным ресурсам**.",
      "en": "Continuous access to electronic resources is provided for academic staff and students**."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Raqamli va axborot texnologiyalari bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел цифровых и информационных технологий; Заведующий соответствующей кафедрой",
      "en": "Digital and Information Technologies Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Elektron ma’lumotlar bazalariga kirish; hisoblar; ko‘rsatmalar; foydalanish statistikasi.",
      "ru": "Доступ к электронным базам данных; учетные записи; инструкции; статистика использования.",
      "en": "Access to electronic databases; accounts; instructions; usage statistics."
    }
  },
  {
    "code": "6.2.2",
    "criterionCode": "6.2",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Fanlar kesimida oʻquv va oʻquv-metodik adabiyotlar, elektron taʼlim resurslari bilan belgilangan talablarga muvofiq taʼminlangani",
      "ru": "Обеспечение по дисциплинам учебной и учебно-методической литературой и электронными образовательными ресурсами в соответствии с требованиями",
      "en": "Provision of teaching and methodological literature and electronic learning resources for each course in accordance with requirements"
    },
    "indicator": {
      "uz": "O‘quv adabiyotlari va o‘quv qo‘llanmalari doimiy ravishda yangilanib, zamonaviy fanlar (modullar) mazmuniga hamda fan-texnika taraqqiyoti tendentsiyalariga muvofiqlashtirilmoqda**",
      "ru": "Учебная литература и пособия постоянно обновляются и приводятся в соответствие с современным содержанием дисциплин (модулей) и тенденциями научно-технического прогресса**.",
      "en": "Educational literature and teaching aids are continuously updated and aligned with current course/module content and trends in scientific and technological development**."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; o‘quv-uslubiy bo‘lim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Sotib olish rejasi; qabul qilish dalolatnomalari; yangilangan ma'lumotnomalar ro'yxati.",
      "ru": "План закупок; акты приема; перечень обновленной литературы.",
      "en": "Procurement plan; acceptance acts; list of updated resources."
    }
  },
  {
    "code": "6.2.3",
    "criterionCode": "6.2",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Fanlar kesimida oʻquv va oʻquv-metodik adabiyotlar, elektron taʼlim resurslari bilan belgilangan talablarga muvofiq taʼminlangani",
      "ru": "Обеспечение по дисциплинам учебной и учебно-методической литературой и электронными образовательными ресурсами в соответствии с требованиями",
      "en": "Provision of teaching and methodological literature and electronic learning resources for each course in accordance with requirements"
    },
    "indicator": {
      "uz": "Fan (modul) mazmuniga mos keladigan zamonaviy xorijiy adabiyotlardan foydalaniladi**",
      "ru": "Используется современная зарубежная литература, соответствующая содержанию дисциплины (модуля)**.",
      "en": "Modern international literature relevant to course/module content is used**."
    },
    "main": {
      "uz": "Tegishli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Axborot-resurs markazi (kutubxona); professor-o‘qituvchilar",
      "ru": "Информационно-ресурсный центр (библиотека); профессорско-преподавательский состав",
      "en": "Information Resource Centre (Library); academic staff"
    },
    "evidence": {
      "uz": "Zamonaviy xorijiy adabiyotlar ro‘yxati; o‘quv dasturlari; elektron ma’lumotlar bazalari.",
      "ru": "Перечень современной зарубежной литературы; учебные программы; электронные базы данных.",
      "en": "List of modern international literature; study programmes; electronic databases."
    }
  },
  {
    "code": "6.3.1",
    "criterionCode": "6.3",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Oʻquv va laboratoriya xonalari hamda ustaxona (poligon)larning talabalar sonidan kelib chiqib, taʼlim dasturlariga mos jihozlar va axborot-kommunikatsiya vositalari bilan taʼminlangani hamda xavfsizlik qoidalariga rioya qilingani",
      "ru": "Оснащение учебных и лабораторных помещений и мастерских оборудованием и ИКТ в соответствии с образовательными программами и числом студентов, соблюдение требований безопасности",
      "en": "Provision of classrooms, laboratories and workshops with programme-appropriate equipment and ICT based on student numbers, with compliance with safety requirements"
    },
    "indicator": {
      "uz": "Oliy taʼlim tashkiloti talabalar sonidan kelib chiqqan holda oʻquv xonalari bilan taʼminlanadi*",
      "ru": "Организация высшего образования обеспечена учебными аудиториями исходя из численности студентов*.",
      "en": "The higher education institution provides sufficient classrooms based on the number of students*."
    },
    "main": {
      "uz": "Ishlar boshqarmasi boshlig‘i",
      "ru": "Начальник управления делами",
      "en": "Head of Administrative Affairs"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; dekanatlar; tegishli kafedra mudiri",
      "ru": "Учебно-методический отдел; деканаты; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; dean’s offices; Head of the relevant department"
    },
    "evidence": {
      "uz": "Tomoshabinlar pasportlari; xavfsizlikni hisoblash; jadval; fotosurat; inventarizatsiya ma'lumotlari.",
      "ru": "Паспорта аудиторий; расчет вместимости/безопасности; расписание; фотографии; инвентаризационные данные.",
      "en": "Classroom passports; capacity/safety calculations; timetable; photographs; inventory data."
    }
  },
  {
    "code": "6.4.1",
    "criterionCode": "6.4",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Inklyuziv taʼlim olish uchun binolar va jihozlarning moslashtirilgani, maxsus oʻquv materiallarining mavjudligi, axborot-kommunikatsiya vositalaridan (bundan buyon matnda AKT deb yuritiladi) foydalanish imkoniyati yaratilgani",
      "ru": "Адаптация зданий и оборудования для инклюзивного образования, наличие специальных учебных материалов и доступ к ИКТ",
      "en": "Adaptation of buildings and equipment for inclusive education, availability of special learning materials and access to ICT"
    },
    "indicator": {
      "uz": "Ta’lim jarayonida inklyuziv ta'limni pedagogik va psixologik qo‘llab-quvvatlash tizimi mavjud**",
      "ru": "В образовательном процессе действует система педагогической и психологической поддержки инклюзивного образования**.",
      "en": "A system of pedagogical and psychological support for inclusive education is available within the educational process**."
    },
    "main": {
      "uz": "Ijrochi direktorning yoshlar bilan ishlash bo‘yicha o‘rinbosari",
      "ru": "Заместитель исполнительного директора по работе с молодежью",
      "en": "Deputy Executive Director for Youth Affairs"
    },
    "co": {
      "uz": "Psixolog; Ishlar boshqarmasi; o‘quv-uslubiy bo‘lim",
      "ru": "Психолог; Управление делами; Учебно-методический отдел",
      "en": "Psychologist; Administrative Affairs Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Qo‘llab-quvvatlashning pozitsiyasi va tartibi; qulay muhit; maslahatlashuvlar; moslashtirish materiallari.",
      "ru": "Положение и порядок поддержки; доступная среда; консультации; адаптационные материалы.",
      "en": "Support policy and procedure; accessible environment; consultations; adaptation materials."
    }
  },
  {
    "code": "6.4.2",
    "criterionCode": "6.4",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Inklyuziv taʼlim olish uchun binolar va jihozlarning moslashtirilgani, maxsus oʻquv materiallarining mavjudligi, axborot-kommunikatsiya vositalaridan (bundan buyon matnda AKT deb yuritiladi) foydalanish imkoniyati yaratilgani",
      "ru": "Адаптация зданий и оборудования для инклюзивного образования, наличие специальных учебных материалов и доступ к ИКТ",
      "en": "Adaptation of buildings and equipment for inclusive education, availability of special learning materials and access to ICT"
    },
    "indicator": {
      "uz": "Inklyuziv ta’lim metodologiyasi bo‘yicha malaka oshirgan va zarur ko‘nikmalarga ega bo‘lgan o‘qituvchi (o‘qituvchilar) va (yoki) psixolog mavjud**",
      "ru": "Имеется преподаватель (преподаватели) и/или психолог, прошедшие повышение квалификации по методологии инклюзивного образования и обладающие необходимыми навыками**.",
      "en": "There is at least one teacher and/or psychologist who has completed professional development in inclusive education methodology and possesses the necessary skills**."
    },
    "main": {
      "uz": "Xodimlar bo‘limi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Yoshlar bilan ishlash bo‘limi; o‘quv-uslubiy bo‘lim; psixolog",
      "ru": "Отдел по работе с молодежью; Учебно-методический отдел; psixolog",
      "en": "Youth Affairs Department; Academic and Methodological Department; psixolog"
    },
    "evidence": {
      "uz": "Inklyuziv ta’lim bo‘yicha o‘qituvchilar va psixologlarning tayyorgarligi / malakasi to‘g‘risidagi hujjatlar.",
      "ru": "Документы о подготовке/квалификации преподавателей и психологов по инклюзивному образованию.",
      "en": "Documents confirming inclusive-education training/qualifications of teachers and psychologists."
    }
  },
  {
    "code": "6.4.3",
    "criterionCode": "6.4",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Inklyuziv taʼlim olish uchun binolar va jihozlarning moslashtirilgani, maxsus oʻquv materiallarining mavjudligi, axborot-kommunikatsiya vositalaridan (bundan buyon matnda AKT deb yuritiladi) foydalanish imkoniyati yaratilgani",
      "ru": "Адаптация зданий и оборудования для инклюзивного образования, наличие специальных учебных материалов и доступ к ИКТ",
      "en": "Adaptation of buildings and equipment for inclusive education, availability of special learning materials and access to ICT"
    },
    "indicator": {
      "uz": "Inklyuziv ta’lim shartlarining amalda qo‘llanilishi va samaradorligi nazorat qilinadi**",
      "ru": "Контролируются фактическое применение и эффективность условий инклюзивного образования**.",
      "en": "The practical implementation and effectiveness of inclusive education conditions are monitored**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qilish bo‘limi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Yoshlar bilan ishlash bo‘limi; Ishlar boshqarmasi; psixolog",
      "ru": "Отдел по работе с молодежью; Управление делами; psixolog",
      "en": "Youth Affairs Department; Administrative Affairs Department; psixolog"
    },
    "evidence": {
      "uz": "Inklyuziv shartlarning mavjudligi va samaradorligini monitoring qilish; so‘rovlar; takomillashtirish rejasi.",
      "ru": "Мониторинг наличия и эффективности инклюзивных условий; опросы; план совершенствования.",
      "en": "Monitoring of availability and effectiveness of inclusive conditions; surveys; improvement plan."
    }
  },
  {
    "code": "6.5.1",
    "criterionCode": "6.5",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Axborot-resurs markazining (kutubxonaning) taʼlim dasturlariga mos oʻquv adabiyotlari, kompyuterlar bilan taʼminlangani, oʻquv zali va elektron kutubxonaning mavjudligi",
      "ru": "Обеспечение информационно-ресурсного центра (библиотеки) учебной литературой и компьютерами в соответствии с программами, наличие читального зала и электронной библиотеки",
      "en": "Provision of the information resource centre (library) with programme-relevant literature and computers, and availability of a reading room and electronic library"
    },
    "indicator": {
      "uz": "Axborot-resurs markazi (kutubxona) o‘quv dasturiga muvofiq darsliklar, o‘quv qo‘llanmalari, adabiyotlar va badiiy adabiyotlarga ega*",
      "ru": "Информационно-ресурсный центр (библиотека) располагает учебниками, учебными пособиями, профильной и художественной литературой в соответствии с образовательной программой*.",
      "en": "The information resource centre (library) has textbooks, teaching aids, specialist literature and fiction aligned with the educational programme*."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Tegishli kafedra mudiri; o‘quv-uslubiy bo‘lim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Dastur uchun adabiyotlar katalogi/reestri; fanlar bilan ta’minlash; elektron katalog.",
      "ru": "Каталог/реестр литературы по программе; обеспеченность дисциплин; электронный каталог.",
      "en": "Programme literature catalogue/register; course coverage; electronic catalogue."
    }
  },
  {
    "code": "6.5.2",
    "criterionCode": "6.5",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Axborot-resurs markazining (kutubxonaning) taʼlim dasturlariga mos oʻquv adabiyotlari, kompyuterlar bilan taʼminlangani, oʻquv zali va elektron kutubxonaning mavjudligi",
      "ru": "Обеспечение информационно-ресурсного центра (библиотеки) учебной литературой и компьютерами в соответствии с программами, наличие читального зала и электронной библиотеки",
      "en": "Provision of the information resource centre (library) with programme-relevant literature and computers, and availability of a reading room and electronic library"
    },
    "indicator": {
      "uz": "Kutubxona fondi muntazam yangilanib turadi**",
      "ru": "Библиотечный фонд регулярно обновляется**.",
      "en": "The library collection is regularly updated**."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Reja-moliya bo‘limi; tegishli kafedra mudiri",
      "ru": "Планово-финансовый отдел; Заведующий соответствующей кафедрой",
      "en": "Planning and Finance Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Jamg‘armani sotib olish rejasi va hisobotlari; xaridlar / kvitansiyalar; hisobdan chiqarish va yangilanishlar.",
      "ru": "План и отчеты по комплектованию фонда; закупки/квитанции; списание и обновление.",
      "en": "Collection acquisition plan and reports; purchases/receipts; write-offs and updates."
    }
  },
  {
    "code": "6.6.1",
    "criterionCode": "6.6",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Raqamli taʼlim muhiti yaratilgani (LMS, Wi-Fi zonalari, onlayn kurslar, vebinarlar va masofaviy taʼlim imkoniyatlari)",
      "ru": "Создание цифровой образовательной среды (LMS, Wi‑Fi, онлайн-курсы, вебинары и возможности дистанционного обучения)",
      "en": "Creation of a digital learning environment (LMS, Wi‑Fi zones, online courses, webinars and distance-learning opportunities)"
    },
    "indicator": {
      "uz": "Muntazam ravishda veb-seminarlar va onlayn seminarlar tashkil etiladi**",
      "ru": "Регулярно организуются вебинары и онлайн-семинары**.",
      "en": "Webinars and online seminars are regularly organised**."
    },
    "main": {
      "uz": "O‘quv-uslubiy bo‘lim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Raqamli va axborot texnologiyalari bo‘limi; tegishli kafedra mudiri",
      "ru": "Отдел цифровых и информационных технологий; Заведующий соответствующей кафедрой",
      "en": "Digital and Information Technologies Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Vebinar jadvali; havolalar/yozuvlar; ishtirokchilar ro‘yxati; hisobotlar.",
      "ru": "График вебинаров; ссылки/записи; списки участников; отчеты.",
      "en": "Webinar schedule; links/recordings; participant lists; reports."
    }
  },
  {
    "code": "6.6.2",
    "criterionCode": "6.6",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Raqamli taʼlim muhiti yaratilgani (LMS, Wi-Fi zonalari, onlayn kurslar, vebinarlar va masofaviy taʼlim imkoniyatlari)",
      "ru": "Создание цифровой образовательной среды (LMS, Wi‑Fi, онлайн-курсы, вебинары и возможности дистанционного обучения)",
      "en": "Creation of a digital learning environment (LMS, Wi‑Fi zones, online courses, webinars and distance-learning opportunities)"
    },
    "indicator": {
      "uz": "Ta’lim jarayonini boshqarish axborot tizimi HEMIS va (yoki) LMS (ta’limni boshqarish tizimi) orqali talabalar, professor-o‘qituvchilar va ma’muriyat o‘rtasida o‘zaro aloqa kanali yaratildi**",
      "ru": "Через информационную систему управления образовательным процессом HEMIS и/или LMS создан канал взаимодействия между студентами, профессорско-преподавательским составом и администрацией**.",
      "en": "HEMIS and/or an LMS is used to provide an interaction channel between students, academic staff and administration**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Raqamli va axborot texnologiyalari bo‘limi; o‘quv-uslubiy bo‘lim",
      "ru": "Отдел цифровых и информационных технологий; Учебно-методический отдел",
      "en": "Digital and Information Technologies Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "HEMIS / LMS sozlamalari; ko‘rsatmalar; skrinshotlar; jurnallar/aloqa kanallaridan foydalanish statistikasi.",
      "ru": "Настройки HEMIS/LMS; инструкции; скриншоты; журналы/статистика использования каналов связи.",
      "en": "HEMIS/LMS settings; instructions; screenshots; logs/statistics on communication-channel use."
    }
  },
  {
    "code": "6.6.3",
    "criterionCode": "6.6",
    "chapter": {
      "uz": "6-BOB. MODDIY-TEXNIK TA’MINOT",
      "ru": "ГЛАВА 6. МАТЕРИАЛЬНО-ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ",
      "en": "CHAPTER 6. FACILITIES AND TECHNICAL RESOURCES"
    },
    "criterion": {
      "uz": "Raqamli taʼlim muhiti yaratilgani (LMS, Wi-Fi zonalari, onlayn kurslar, vebinarlar va masofaviy taʼlim imkoniyatlari)",
      "ru": "Создание цифровой образовательной среды (LMS, Wi‑Fi, онлайн-курсы, вебинары и возможности дистанционного обучения)",
      "en": "Creation of a digital learning environment (LMS, Wi‑Fi zones, online courses, webinars and distance-learning opportunities)"
    },
    "indicator": {
      "uz": "Elektron ta’lim resurslaridan foydalanish bo‘yicha texnik yordam xizmati mavjud**",
      "ru": "Действует служба технической поддержки по использованию электронных образовательных ресурсов**.",
      "en": "A technical support service is available for the use of electronic educational resources**."
    },
    "main": {
      "uz": "Raqamli va axborot texnologiyalari bo‘limi",
      "ru": "Отдел цифровых и информационных технологий",
      "en": "Digital and Information Technologies Department"
    },
    "co": {
      "uz": "O‘quv-uslubiy bo‘lim; registrator ofisi; axborot-resurs markazi",
      "ru": "Учебно-методический отдел; registrator ofisi; axborot-resurs markazi",
      "en": "Academic and Methodological Department; registrator ofisi; axborot-resurs markazi"
    },
    "evidence": {
      "uz": "Texnik qo‘llab-quvvatlash qoidalari; kontaktlar; qo‘ng‘iroqlar jurnali; ko‘rsatmalar/FAQ.",
      "ru": "Правила технической поддержки; контакты; журнал обращений; инструкции/FAQ.",
      "en": "Technical-support rules; contacts; support-request log; instructions/FAQ."
    }
  }
];
