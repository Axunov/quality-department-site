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
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oşiriş böyiça tarkibiy tuzilma va uning samarali işlaş mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Ta’lim dasturini amalga oşiriş uçun mas’ul bölgan tarkibiy bölinma (kafedra, bölim) (keyingi örinlarda tarkibiy bölinma) taşkil etiş, şuningdek, uni moddiy-texnika bazasi va moliyaviy resurslar bilan ta'minlaş böyiça aniq rejalar mavjud*.",
      "ru": "Имеются конкретные планы по созданию структурного подразделения (кафедры, отдела), ответственного за реализацию образовательной программы, а также по обеспечению его материально-технической базой и финансовыми ресурсами*.",
      "en": "There are clear plans to establish the structural unit (department/office) responsible for delivering the educational programme and to provide it with the necessary facilities and financial resources*."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ijroçi direktorning öquv işlari böyiça örinbosari; Işlar boşqarmasi; Reja-moliya bölimi; Xodimlar bölimi",
      "ru": "Заместитель исполнительного директора по учебной работе; Управление делами; Планово-финансовый отдел; Отдел кадров",
      "en": "Deputy Executive Director for Academic Affairs; Administrative Affairs Department; Planning and Finance Department; Human Resources Department"
    },
    "evidence": {
      "uz": "Kafedra töğrisidagi nizom; ştat va kadrlar tarkibi; iş rejasi; resurslar haqida ma'lumot; işlab çiqiş va jihozlaş rejalari.",
      "ru": "Положение о кафедре; штатное расписание и кадровый состав; план работы; сведения о ресурсах; планы развития и оснащения.",
      "en": "Department regulations; staffing and personnel structure; work plan; resource information; development and equipment plans."
    }
  },
  {
    "code": "1.1.2",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oşiriş böyiça tarkibiy tuzilma va uning samarali işlaş mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Ta’lim dasturini samarali amalga oşiriş uçun tarkibiy bölinma moddiy-texnika bazasi, moliyaviy va kadrlar bilan ta’minlangan, iş rejalari işlab çiqilgan**",
      "ru": "Для эффективной реализации образовательной программы структурное подразделение обеспечено материально-технической базой, финансовыми и кадровыми ресурсами, разработаны планы работы**.",
      "en": "The structural unit is provided with facilities, financial and human resources for effective programme delivery, and work plans have been developed**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ijroçi direktorning öquv işlari böyiça örinbosari; Işlar boşqarmasi; Reja-moliya bölimi; Xodimlar bölimi",
      "ru": "Заместитель исполнительного директора по учебной работе; Управление делами; Планово-финансовый отдел; Отдел кадров",
      "en": "Deputy Executive Director for Academic Affairs; Administrative Affairs Department; Planning and Finance Department; Human Resources Department"
    },
    "evidence": {
      "uz": "Kafedra töğrisidagi nizom; ştat va kadrlar tarkibi; iş rejasi; resurslar haqida ma'lumot; işlab çiqiş va jihozlaş rejalari.",
      "ru": "Положение о кафедре; штатное расписание и кадровый состав; план работы; сведения о ресурсах; планы развития и оснащения.",
      "en": "Department regulations; staffing and personnel structure; work plan; resource information; development and equipment plans."
    }
  },
  {
    "code": "1.1.3",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oşiriş böyiça tarkibiy tuzilma va uning samarali işlaş mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Tarkibiy bölinma faoliyati oliy ta’lim taşkilotining maqsadlariga, ta’lim dasturining maqsadlariga va kutilayotgan öquv natijalariga muvofiqdir**",
      "ru": "Деятельность структурного подразделения соответствует целям организации высшего образования, целям образовательной программы и ожидаемым результатам обучения**.",
      "en": "The activities of the structural unit are aligned with the goals of the higher education institution, the objectives of the educational programme and the expected learning outcomes**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Учебно-методический отдел; Отдел контроля качества образования",
      "en": "Academic and Methodological Department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Dastur maqsadlari va natijalari; kafedra rejasi; bölim/kengaş bayonnomalari; maqsadlar va natijalar örtasidagi muvofiqlik matritsasi.",
      "ru": "Цели и результаты программы; план кафедры; протоколы отдела/совета; матрица соответствия целей и результатов.",
      "en": "Programme objectives and outcomes; department plan; department/council minutes; objectives-to-outcomes alignment matrix."
    }
  },
  {
    "code": "1.1.4",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oşiriş böyiça tarkibiy tuzilma va uning samarali işlaş mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Tarkibiy bölinma ta’lim dasturining mehnat bozori talablariga muvofiqligini va uning samaradorligini baholaydi hamda tahliliy materiallarni muntazam ravişda tayyorlaydi**",
      "ru": "Структурное подразделение оценивает соответствие образовательной программы требованиям рынка труда и ее эффективность, а также регулярно готовит аналитические материалы**.",
      "en": "The structural unit evaluates the programme’s alignment with labour-market requirements and its effectiveness, and regularly prepares analytical materials**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; öquv-uslubiy bölim; Marketing va talabalar amaliyoti bölimi",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел; Отдел маркетинга и практики студентов",
      "en": "Education Quality Control Department; Academic and Methodological Department; Marketing and Student Practice Department"
    },
    "evidence": {
      "uz": "Mehnat bozorini tahlil qiliş; iş beruvçilar fikr-mulohazalari; sörov natijalari; dastur samaradorligi böyiça tahliliy hisobot.",
      "ru": "Анализ рынка труда; отзывы работодателей; результаты опросов; аналитический отчет об эффективности программы.",
      "en": "Labour-market analysis; employer feedback; survey results; analytical report on programme effectiveness."
    }
  },
  {
    "code": "1.1.5",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oşiriş böyiça tarkibiy tuzilma va uning samarali işlaş mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Tarkibiy bölinma faoliyati muntazam monitoring va tahlillar orqali tizimli tahlil qilinadi**",
      "ru": "Деятельность структурного подразделения системно анализируется посредством регулярного мониторинга и анализа**.",
      "en": "The activities of the structural unit are systematically reviewed through regular monitoring and analysis**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; öquv-uslubiy bölim",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел",
      "en": "Education Quality Control Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Monitoring jadvali; nazorat röyxatlari; içki monitoring hisobotlari; muhokama bayonnomalari.",
      "ru": "График мониторинга; контрольные листы; отчеты внутреннего мониторинга; протоколы обсуждений.",
      "en": "Monitoring schedule; checklists; internal monitoring reports; discussion minutes."
    }
  },
  {
    "code": "1.1.6",
    "criterionCode": "1.1",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini amalga oşiriş böyiça tarkibiy tuzilma va uning samarali işlaş mexanizmlarining mavjudligi",
      "ru": "Наличие структурного подразделения и эффективных механизмов его работы для реализации образовательной программы",
      "en": "Availability of a structural unit and effective operating mechanisms for delivery of the educational programme"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga köra tarkibiy bölinma faoliyatini takomillaştiriş böyiça doimiy çora-tadbirlar amalga oşirilmoqda**",
      "ru": "По результатам мониторинга и анализа на постоянной основе реализуются меры по совершенствованию деятельности структурного подразделения**.",
      "en": "Based on monitoring and analysis, continuous measures are implemented to improve the activities of the structural unit**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; Ijroçi direktorning öquv işlari böyiça örinbosari",
      "ru": "Отдел контроля качества образования; Заместитель исполнительного директора по учебной работе",
      "en": "Education Quality Control Department; Deputy Executive Director for Academic Affairs"
    },
    "evidence": {
      "uz": "Tuzatiş böyiça harakatlar rejasi; ijro hujjatlari; takroriy monitoring.",
      "ru": "План корректирующих действий; документы об исполнении; повторный мониторинг.",
      "en": "Corrective action plan; implementation documents; follow-up monitoring."
    }
  },
  {
    "code": "1.2.1",
    "criterionCode": "1.2",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini rivojlantiriş va moliyaviy barqarorligini taʼminlaş böyiça 5 yillik istiqbolli rejaning (bundan buyon matnda istiqbolli reja deb yuritiladi) mavjudligi",
      "ru": "Наличие 5-летнего перспективного плана развития образовательной программы и обеспечения ее финансовой устойчивости",
      "en": "Availability of a five-year prospective plan for programme development and financial sustainability"
    },
    "indicator": {
      "uz": "Uzoq muddatli rejaning bajarilişini monitoring qiliş va tahlil qiliş tizimi yaratildi**",
      "ru": "Создана система мониторинга и анализа выполнения долгосрочного плана**.",
      "en": "A system for monitoring and analysing implementation of the long-term plan has been established**."
    },
    "main": {
      "uz": "Ijroçi direktorning öquv işlari böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по учебной работе",
      "en": "Deputy Executive Director for Academic Affairs"
    },
    "co": {
      "uz": "Reja-moliya bölimi; tegişli kafedra mudiri; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Планово-финансовый отдел; Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Planning and Finance Department; Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Beş yillik uzoq muddatli reja; samaradorlik körsatkiçlari va monitoringi; körib çiqiş protokollari; rejasiga özgartirişlar kiritiş.",
      "ru": "Пятилетний долгосрочный план; показатели эффективности и мониторинг; протоколы рассмотрения; изменения в план.",
      "en": "Five-year long-term plan; performance indicators and monitoring; review minutes; amendments to the plan."
    }
  },
  {
    "code": "1.2.2",
    "criterionCode": "1.2",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturini rivojlantiriş va moliyaviy barqarorligini taʼminlaş böyiça 5 yillik istiqbolli rejaning (bundan buyon matnda istiqbolli reja deb yuritiladi) mavjudligi",
      "ru": "Наличие 5-летнего перспективного плана развития образовательной программы и обеспечения ее финансовой устойчивости",
      "en": "Availability of a five-year prospective plan for programme development and financial sustainability"
    },
    "indicator": {
      "uz": "Zarur bölganda, monitoring va tahlil natijalariga köra, uzoq muddatli rejaga tegişli özgartirişlar kiritiladi**",
      "ru": "При необходимости по результатам мониторинга и анализа в долгосрочный план вносятся соответствующие изменения**.",
      "en": "Where necessary, the long-term plan is amended on the basis of monitoring and analysis results**."
    },
    "main": {
      "uz": "Ijroçi direktorning öquv işlari böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по учебной работе",
      "en": "Deputy Executive Director for Academic Affairs"
    },
    "co": {
      "uz": "Reja-moliya bölimi; tegişli kafedra mudiri; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Планово-финансовый отдел; Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Planning and Finance Department; Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Beş yillik uzoq muddatli reja; samaradorlik körsatkiçlari va monitoringi; körib çiqiş protokollari; rejasiga özgartirişlar kiritiş.",
      "ru": "Пятилетний долгосрочный план; показатели эффективности и мониторинг; протоколы рассмотрения; изменения в план.",
      "en": "Five-year long-term plan; performance indicators and monitoring; review minutes; amendments to the plan."
    }
  },
  {
    "code": "1.3.1",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni içki taʼminlaş mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning iştiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Sifatni ta’minlaşning içki mexanizmlarini joriy qiliş, muvofiqlaştiriş va takomillaştiriş jarayonlari strategik boşqaruvning ajralmas qismi sifatida tizimli ravişda amalga oşiriladi**",
      "ru": "Процессы внедрения, координации и совершенствования механизмов внутреннего обеспечения качества системно осуществляются как неотъемлемая часть стратегического управления**.",
      "en": "Processes for implementing, coordinating and improving internal quality assurance mechanisms are systematically carried out as an integral part of strategic management**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Ijroçi direktorning öquv işlari böyiça örinbosari; öquv-uslubiy bölim; tegişli kafedra mudiri",
      "ru": "Заместитель исполнительного директора по учебной работе; Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Deputy Executive Director for Academic Affairs; Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Içki sifat kafolati töğrisidagi nizom; rejalar/hisobotlar; boşqaruv organlarining bayonnomalari.",
      "ru": "Положение о внутреннем обеспечении качества; планы/отчеты; протоколы органов управления.",
      "en": "Internal quality assurance regulation; plans/reports; minutes of governing bodies."
    }
  },
  {
    "code": "1.3.2",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni içki taʼminlaş mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning iştiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Ta’lim dasturining sifatini baholaş uçun manfaatdor tomonlarning fikrlari muntazam ravişda örganiladi va baholanadi**",
      "ru": "Для оценки качества образовательной программы мнения заинтересованных сторон регулярно изучаются и оцениваются**.",
      "en": "Stakeholder opinions are regularly collected and evaluated to assess the quality of the educational programme**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; dekanatlar; iş beruvçilar va boşqa manfaatdor tomonlar",
      "ru": "Заведующий соответствующей кафедрой; деканаты; работодатели и другие заинтересованные стороны",
      "en": "Head of the relevant department; dean’s offices; employers and other stakeholders"
    },
    "evidence": {
      "uz": "Anketalar/sörovlar; iştirokçilar reestri; natijalar va tahliliy hisobotlar.",
      "ru": "Анкеты/опросы; реестр участников; результаты и аналитические отчеты.",
      "en": "Questionnaires/surveys; participant register; results and analytical reports."
    }
  },
  {
    "code": "1.3.3",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni içki taʼminlaş mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning iştiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Manfaatdor tomonlarning fikr-mulohazalari asosida ta’lim dasturini takomillaştiriş çora-tadbirlari belgilandi**",
      "ru": "На основе отзывов заинтересованных сторон определены меры по совершенствованию образовательной программы**.",
      "en": "Measures to improve the educational programme have been defined on the basis of stakeholder feedback**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; öquv-uslubiy bölim",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел",
      "en": "Education Quality Control Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Fikr-mulohazalarga asoslangan harakatlar rejasi; protokollar; amalga oşirilgan yaxşilanişlarni tasdiqlaş.",
      "ru": "План действий на основе обратной связи; протоколы; подтверждение реализованных улучшений.",
      "en": "Feedback-based action plan; minutes; evidence of implemented improvements."
    }
  },
  {
    "code": "1.3.4",
    "criterionCode": "1.3",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida sifatni içki taʼminlaş mexanizmining mavjudligi hamda bu jarayonlarda manfaatdor tomonlarning iştiroki taʼminlangani",
      "ru": "Наличие механизма внутреннего обеспечения качества в рамках образовательной программы и участие заинтересованных сторон в этих процессах",
      "en": "Availability of an internal quality assurance mechanism within the educational programme and stakeholder participation in these processes"
    },
    "indicator": {
      "uz": "Içki sifatni ta’minlaş tizimi doirasida amalga oşirilayotgan tadbirlar samaradorligi muntazam ravişda baholanadi**",
      "ru": "Эффективность мероприятий, реализуемых в рамках системы внутреннего обеспечения качества, регулярно оценивается**.",
      "en": "The effectiveness of activities implemented within the internal quality assurance system is regularly evaluated**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Ijroçi direktorning öquv işlari böyiça örinbosari; tegişli kafedra mudiri",
      "ru": "Заместитель исполнительного директора по учебной работе; Заведующий соответствующей кафедрой",
      "en": "Deputy Executive Director for Academic Affairs; Head of the relevant department"
    },
    "evidence": {
      "uz": "Tadbirlar samaradorligini baholaş; takroriy sörovlar/monitoring; analitik hisobot.",
      "ru": "Оценка эффективности мероприятий; повторные опросы/мониторинг; аналитический отчет.",
      "en": "Evaluation of activity effectiveness; repeat surveys/monitoring; analytical report."
    }
  },
  {
    "code": "1.4.1",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning sönggi tendensiyalarini aniqlaş böyiça monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Tahlil va monitoring natijalariga köra taʼlim dasturini takomillaştiriş çora-tadbirlari belgilandi**",
      "ru": "По результатам анализа и мониторинга определены меры по совершенствованию образовательной программы**.",
      "en": "Measures to improve the educational programme have been defined on the basis of analysis and monitoring results**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Marketing va talabalar amaliyoti bölimi; Ta’lim sifatini nazorat qiliş bölimi; Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlaş boşqarmasi; xalqaro hamkorlik bölimi",
      "ru": "Отдел маркетинга и практики студентов; Отдел контроля качества образования; Управление научных исследований, инноваций и подготовки научно-педагогических кадров; отдел международного сотрудничества",
      "en": "Marketing and Student Practice Department; Education Quality Control Department; Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; International Cooperation Department"
    },
    "evidence": {
      "uz": "Mehnat bozori va ilmiy va texnologik tendentsiyalarni monitoring qiliş; dasturni takomillaştiriş rejasi.",
      "ru": "Мониторинг рынка труда и научно-технологических тенденций; план совершенствования программы.",
      "en": "Monitoring of the labour market and scientific/technological trends; programme improvement plan."
    }
  },
  {
    "code": "1.4.2",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning sönggi tendensiyalarini aniqlaş böyiça monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Tahlil va monitoring natijalari, şuningdek belgilangan tadbirlarni amalga oşiriş natijalari asosida taʼlim dasturiga zarur özgartirişlar kiritiladi**",
      "ru": "На основе результатов анализа и мониторинга, а также реализации установленных мероприятий в образовательную программу вносятся необходимые изменения**.",
      "en": "Necessary changes are made to the educational programme based on analysis and monitoring results and on the outcomes of implemented measures**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Departament/kengaş qarorlari; yangilangan öquv rejalari va dasturlari; özgarişlarni taqqoslaş jadvali.",
      "ru": "Решения кафедры/совета; обновленные учебные планы и программы; таблица сопоставления изменений.",
      "en": "Department/council decisions; updated curricula and programmes; change-comparison table."
    }
  },
  {
    "code": "1.4.3",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning sönggi tendensiyalarini aniqlaş böyiça monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Talabalarni mehnat bozoridagi mavjud imkoniyatlar haqida xabardor qiliş mexanizmi yaratildi**",
      "ru": "Создан механизм информирования студентов о существующих возможностях на рынке труда**.",
      "en": "A mechanism has been established to inform students about available labour-market opportunities**."
    },
    "main": {
      "uz": "Marketing va talabalar amaliyoti bölimi",
      "ru": "Отдел маркетинга и практики студентов",
      "en": "Marketing and Student Practice Department"
    },
    "co": {
      "uz": "Dekanatlar; Tegişli kafedra mudiri; Yoşlar bilan işlaş bölimi",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; Отдел по работе с молодежью",
      "en": "Dean’s offices; Head of the relevant department; Youth Affairs Department"
    },
    "evidence": {
      "uz": "Axborot uçraşuvlari; vakansiyalar/yarmarkalar; poçta jönatmalari; veb-sayt/Telegram; martaba voqealari hisobotlari.",
      "ru": "Информационные встречи; вакансии/ярмарки; рассылки; сайт/Telegram; отчеты о карьерных мероприятиях.",
      "en": "Information meetings; vacancies/fairs; mailings; website/Telegram; career-event reports."
    }
  },
  {
    "code": "1.4.4",
    "criterionCode": "1.4",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Mehnat bozori va taʼlim ehtiyojlari hamda ilmiy-tadqiqotning sönggi tendensiyalarini aniqlaş böyiça monitoring tizimining mavjudligi",
      "ru": "Наличие системы мониторинга рынка труда, образовательных потребностей и последних тенденций научных исследований",
      "en": "Availability of a monitoring system for the labour market, educational needs and recent research trends"
    },
    "indicator": {
      "uz": "Ta’lim ehtiyojlari va sönggi tadqiqot tendentsiyalari töğrisidagi töplangan ma’lumotlar manfaatdor tomonlar foydalanişi uçun jamoat mulki sifatida e’lon qilinadi**",
      "ru": "Собранная информация об образовательных потребностях и последних тенденциях исследований публикуется в открытом доступе для использования заинтересованными сторонами**.",
      "en": "Collected information on educational needs and recent research trends is published openly for use by stakeholders**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlaş boşqarmasi; Registrator ofisi; sayt administratori; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Управление научных исследований, инноваций и подготовки научно-педагогических кадров; Офис регистратора; администратор сайта; Отдел контроля качества образования",
      "en": "Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; Registrar’s Office; website administrator; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Saytdagi naşrlar; analitik materiallar; havolalar/skrinşotlar; ma’lumotlarni uzatiş protokollari.",
      "ru": "Публикации на сайте; аналитические материалы; ссылки/скриншоты; протоколы передачи данных.",
      "en": "Website publications; analytical materials; links/screenshots; data-transfer records."
    }
  },
  {
    "code": "1.5.1",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Ta’lim dasturlari böyiça talabalar örtasida sörovlar (suhbatlar, muhokamalar va talabalarning fikrlarini örganişga qaratilgan boşqa tadbirlar) ötkazişning belgilangan tartibi mavjud.",
      "ru": "Установлен порядок проведения среди студентов опросов по образовательным программам (интервью, обсуждений и иных мероприятий, направленных на изучение мнения студентов).",
      "en": "A defined procedure is in place for conducting student surveys on educational programmes, including interviews, discussions and other activities aimed at studying student opinions."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; tegişli kafedra mudiri; Registrator ofisi",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; Офис регистратора",
      "en": "Dean’s offices; Head of the relevant department; Registrar’s Office"
    },
    "evidence": {
      "uz": "Sörovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklaş; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.2",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Sörovlar taşkiliy va boşqaruv jarayonlari va ta’lim dasturi doirasidagi öquv jarayoni sifati bilan boğliq qöşimça savollarni öz içiga oladi**",
      "ru": "Опросы включают дополнительные вопросы, связанные с организационно-управленческими процессами и качеством учебного процесса в рамках образовательной программы**.",
      "en": "Surveys include additional questions related to organisational and management processes and the quality of the learning process within the educational programme**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; tegişli fakultet dekanatlari; tegişli kafedra mudirlari.",
      "ru": "Учебно-методический отдел; деканаты соответствующих факультетов; tegishli kafedra mudirlari.",
      "en": "Academic and Methodological Department; relevant faculty dean’s offices; tegishli kafedra mudirlari."
    },
    "evidence": {
      "uz": "Sörovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklaş; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.3",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Qöşimça sörov savollari va uni ötkaziş tartibi ilmiy-uslubiy asosga ega**",
      "ru": "Дополнительные вопросы опроса и порядок его проведения имеют научно-методическое обоснование**.",
      "en": "Additional survey questions and the survey procedure have a scientific and methodological basis**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; tegişli kafedra mudiri",
      "ru": "Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Sörovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklaş; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.4",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Sörovlar oliy ta’lim taşkiloti tomonidan belgilangan vaqt oraliğida muntazam ravişda ötkaziladi va ularning natijalari tizimli tahlil qilinadi**",
      "ru": "Опросы регулярно проводятся в сроки, установленные организацией высшего образования, а их результаты системно анализируются**.",
      "en": "Surveys are conducted regularly within the timeframes established by the higher education institution and their results are systematically analysed**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; tegişli kafedra mudiri; Registrator ofisi",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; Офис регистратора",
      "en": "Dean’s offices; Head of the relevant department; Registrar’s Office"
    },
    "evidence": {
      "uz": "Sörovlarning pozitsiyasi/metodologiyasi; anketalar; jadval; natijalarni yuklaş; analitik hisobotlar.",
      "ru": "Положение/методология опросов; анкеты; график; выгрузка результатов; аналитические отчеты.",
      "en": "Survey regulations/methodology; questionnaires; schedule; result exports; analytical reports."
    }
  },
  {
    "code": "1.5.5",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Sörovlar natijalariga köra aniqlangan muammolarni bartaraf etiş çoralari belgilandi**",
      "ru": "По результатам опросов определены меры по устранению выявленных проблем**.",
      "en": "Measures have been defined to address problems identified through survey results**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; öquv-uslubiy bölim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Aniqlangan muammolarni bartaraf etiş rejasi; bajarilişini nazorat qiliş.",
      "ru": "План устранения выявленных проблем; контроль исполнения.",
      "en": "Plan to address identified problems; implementation monitoring."
    }
  },
  {
    "code": "1.5.6",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Tahlil natijalari va amalga oşirilgan tadbirlar natijalariga köra ta’lim dasturiga zarur özgartirişlar kiritildi**",
      "ru": "По результатам анализа и реализованных мероприятий в образовательную программу внесены необходимые изменения**.",
      "en": "Necessary changes have been made to the educational programme based on analysis results and implemented measures**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Yangilangan dastur hujjatlari; protokollarni özgartiriş; qiyosiy tahlil.",
      "ru": "Обновленные документы программы; протоколы изменений; сравнительный анализ.",
      "en": "Updated programme documents; change minutes; comparative analysis."
    }
  },
  {
    "code": "1.5.7",
    "criterionCode": "1.5",
    "chapter": {
      "uz": "1-BOB. TAŞKILIY-BOŞQARUV FAOLIYATI VA SIFATNI TA’MINLAŞ",
      "ru": "ГЛАВА 1. ОРГАНИЗАЦИОННО-УПРАВЛЕНЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ И ОБЕСПЕЧЕНИЕ КАЧЕСТВА",
      "en": "CHAPTER 1. ORGANISATIONAL AND MANAGEMENT ACTIVITIES AND QUALITY ASSURANCE"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça talabalar örtasida sörovnomalar ötkazilgani va uning natijalari asosida ta’lim dasturlarining takomillaştirilgani",
      "ru": "Проведение опросов студентов по действующим образовательным программам и совершенствование программ на основе их результатов",
      "en": "Conducting student surveys on current educational programmes and improving programmes based on the results"
    },
    "indicator": {
      "uz": "Talabalar sörov natijalari va ular asosida bajarilgan işlar töğrisida xabardor qilinadi**",
      "ru": "Студенты информируются о результатах опросов и выполненных на их основе мероприятиях**.",
      "en": "Students are informed about survey results and the actions taken on their basis**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; Registrator ofisi; sayt administratori; tegişli kafedra mudiri",
      "ru": "Деканаты; Офис регистратора; администратор сайта; Заведующий соответствующей кафедрой",
      "en": "Dean’s offices; Registrar’s Office; website administrator; Head of the relevant department"
    },
    "evidence": {
      "uz": "Talabalarni xabardor qiliş: veb-sayt, bot, uçraşuvlar, e’lonlar; yordamçi materiallar.",
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
      "uz": "Manfaatdor tomonlar iştirokida taʼlim dasturining belgilangan tartibda işlab çiqilgani. Bunda taʼlim dasturining maqsadi, natijalarining belgilangani, mehnat bozori, davlat taʼlim standarti (bundan buyon matnda DTS deb yuriladi) va milliy malakalar ramkasi (bundan buyon matnda MMR deb yuritiladi) talablariga muvofiqligi",
      "ru": "Разработка образовательной программы в установленном порядке с участием заинтересованных сторон, определение целей и результатов и соответствие требованиям рынка труда, государственных образовательных стандартов и Национальной рамки квалификаций",
      "en": "Development of the educational programme according to established procedures with stakeholder participation, defined objectives and outcomes, and compliance with labour-market requirements, state education standards and the National Qualifications Framework"
    },
    "indicator": {
      "uz": "Ta’lim dasturini işlab çiqiş jarayonida iş beruvçilar, soha mutaxassislari va professor-öqituvçilarning iştiroki ta’minlanib, bu jarayon tizimli asosda taşkil etilmoqda*.",
      "ru": "В разработке образовательной программы обеспечено участие работодателей, отраслевых специалистов и профессорско-преподавательского состава, процесс организован на системной основе*.",
      "en": "Employers, industry experts and academic staff participate in the development of the educational programme, and the process is organised systematically*."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; iş beruvçilar; professor-öqituvçilar",
      "ru": "Учебно-методический отдел; работодатели; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; employers; academic staff"
    },
    "evidence": {
      "uz": "Işçi guruhlarning bayonnomalari; iş beruvçilar fikr-mulohazalari / şarhlari; tasdiqlaş varaqlari; dastur loyihalari.",
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
      "uz": "Manfaatdor tomonlar iştirokida taʼlim dasturining belgilangan tartibda işlab çiqilgani. Bunda taʼlim dasturining maqsadi, natijalarining belgilangani, mehnat bozori, davlat taʼlim standarti (bundan buyon matnda DTS deb yuriladi) va milliy malakalar ramkasi (bundan buyon matnda MMR deb yuritiladi) talablariga muvofiqligi",
      "ru": "Разработка образовательной программы в установленном порядке с участием заинтересованных сторон, определение целей и результатов и соответствие требованиям рынка труда, государственных образовательных стандартов и Национальной рамки квалификаций",
      "en": "Development of the educational programme according to established procedures with stakeholder participation, defined objectives and outcomes, and compliance with labour-market requirements, state education standards and the National Qualifications Framework"
    },
    "indicator": {
      "uz": "Jamoatçilik, abituriyentlar va talabalarga ta’lim dasturi haqida işonçli va xolis ma’lumot oliş imkoniyati taqdim etilgan**",
      "ru": "Общественности, абитуриентам и студентам обеспечена возможность получать достоверную и объективную информацию об образовательной программе**.",
      "en": "The public, applicants and students are provided with access to reliable and objective information about the educational programme**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Qabul komissiyasi; dekanatlar; Registrator ofisi; sayt administratori",
      "ru": "Приемная комиссия; деканаты; Офис регистратора; администратор сайта",
      "en": "Admissions Committee; dean’s offices; Registrar’s Office; website administrator"
    },
    "evidence": {
      "uz": "Veb-saytdagi dastur haqida rasmiy ma'lumot; bukletlar; qabul qiliş qoidalari; ta'lim natijalarining tavsifi.",
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
      "uz": "Ta’lim dasturining davomiyligi (kreditlarning umumiy soni (soatlar), öqiş davomiyligi) dastur maqsadlariga va kutilayotgan öquv natijalariga muvofiq belgilanadi*",
      "ru": "Продолжительность образовательной программы (общее количество кредитов/часов и срок обучения) устанавливается в соответствии с целями программы и ожидаемыми результатами обучения*.",
      "en": "The duration of the educational programme (total credits/hours and period of study) is determined in accordance with the programme objectives and expected learning outcomes*."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "evidence": {
      "uz": "Öquv dasturi; kreditlar/soatlarni hisoblaş; öqiş şartlari; ta’lim natijalari matritsasi.",
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
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravişda monitoringi yuritilgani hamda uning samaradorligini oşiriş va takomillaştiriş böyiça çora-tadbirlarning amalga oşirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Ta’lim dasturining samaradorligini baholaş tartibi va mezonlari işlab çiqildi**",
      "ru": "Разработаны порядок и критерии оценки эффективности образовательной программы**.",
      "en": "Procedures and criteria for evaluating the effectiveness of the educational programme have been developed**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; tegişli kafedra mudiri",
      "ru": "Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Ta‘lim dasturining samaradorligini baholaş tartibi va mezonlari.",
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
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravişda monitoringi yuritilgani hamda uning samaradorligini oşiriş va takomillaştiriş böyiça çora-tadbirlarning amalga oşirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Ta’lim dasturining tizimli monitoringi va tahlili oliy ta’lim taşkiloti tomonidan belgilangan muddatlarda izçil amalga oşirilmoqda**",
      "ru": "Системный мониторинг и анализ образовательной программы последовательно осуществляются в сроки, установленные организацией высшего образования**.",
      "en": "Systematic monitoring and analysis of the educational programme are consistently carried out within the timeframes established by the higher education institution**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; öquv-uslubiy bölim",
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
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravişda monitoringi yuritilgani hamda uning samaradorligini oşiriş va takomillaştiriş böyiça çora-tadbirlarning amalga oşirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Monitoring jarayonida tizimli asosda iş beruvçilar, talabalar va soha mutaxassislarining iştiroki ta’minlanadi**",
      "ru": "В процессе мониторинга на системной основе обеспечивается участие работодателей, студентов и отраслевых специалистов**.",
      "en": "Employers, students and industry experts systematically participate in the monitoring process**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; iş beruvçilar; talabalar; soha mutaxassislari",
      "ru": "Отдел контроля качества образования; работодатели; студенты; отраслевые специалисты",
      "en": "Education Quality Control Department; employers; students; industry experts"
    },
    "evidence": {
      "uz": "Protokollar, sörovlar, ekspert xulosalari, iştirok varaqalari.",
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
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravişda monitoringi yuritilgani hamda uning samaradorligini oşiriş va takomillaştiriş böyiça çora-tadbirlarning amalga oşirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga köra aniqlangan muammo va kamçiliklarni bartaraf etiş böyiça tizimli çora-tadbirlar işlab çiqilib, ularning ijrosi holati nazorat qilinadi**",
      "ru": "По результатам мониторинга и анализа разрабатываются системные меры по устранению выявленных проблем и недостатков, а состояние их исполнения контролируется**.",
      "en": "Systematic measures are developed to address problems and deficiencies identified through monitoring and analysis, and implementation is monitored**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; öquv-uslubiy bölim",
      "ru": "Отдел контроля качества образования; Учебно-методический отдел",
      "en": "Education Quality Control Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Tuzatiş böyiça harakatlar rejasi; muammoli röyxatga oliş kitobi; işlaş hisobotlari.",
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
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravişda monitoringi yuritilgani hamda uning samaradorligini oşiriş va takomillaştiriş böyiça çora-tadbirlarning amalga oşirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Ta’lim dasturini monitoring qiliş va tahlil qiliş natijalariga oçiq kiriş imkoniyati ta’minlangan**",
      "ru": "Обеспечен открытый доступ к результатам мониторинга и анализа образовательной программы**.",
      "en": "Open access to the results of monitoring and analysis of the educational programme is ensured**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Registrator ofisi; sayt administratori; tegişli kafedra mudiri",
      "ru": "Офис регистратора; администратор сайта; Заведующий соответствующей кафедрой",
      "en": "Registrar’s Office; website administrator; Head of the relevant department"
    },
    "evidence": {
      "uz": "Monitoring natijalarini naşr etiş; oçiq isobotlar/sertifikatlar; havolalar va skrinşotlar.",
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
      "uz": "Amaldagi ta’lim dasturlarining tizimli ravişda monitoringi yuritilgani hamda uning samaradorligini oşiriş va takomillaştiriş böyiça çora-tadbirlarning amalga oşirilgani",
      "ru": "Системный мониторинг действующих образовательных программ и реализация мер по повышению их эффективности и совершенствованию",
      "en": "Systematic monitoring of current educational programmes and implementation of measures to improve their effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga köra ta’lim dasturiga, jumladan, fanlar (modullar), öqitiş metodikasi va baholaş tizimi mazmuniga zarur özgartirişlar kiritiladi**",
      "ru": "По результатам мониторинга и анализа в образовательную программу, включая содержание дисциплин (модулей), методику обучения и систему оценивания, вносятся необходимые изменения**.",
      "en": "Based on monitoring and analysis, necessary changes are introduced into the educational programme, including the content of courses/modules, teaching methods and the assessment system**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Yangilangan öquv rejalari, fan dasturlari, öqitiş va baholaş usullari; protokollarni özgartiriş.",
      "ru": "Обновленные учебные планы, программы дисциплин, методы обучения и оценивания; протоколы изменений.",
      "en": "Updated curricula, course programmes, teaching and assessment methods; change minutes."
    }
  },
  {
    "code": "3.1.1",
    "criterionCode": "3.1",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Işçi öquv reja va dasturlarining belgilangan talablarga muvofiq işlab çiqilgani",
      "ru": "Разработка рабочих учебных планов и программ в соответствии с установленными требованиями",
      "en": "Development of working curricula and study programmes in accordance with established requirements"
    },
    "indicator": {
      "uz": "Öquv rejalari va öquv dasturlari Milliy malaka asoslari, davlat taʼlim standartlari, kasbiy standart(lar), malaka talablari va (yoki) xalqaro taʼlim standartlariga* muvofiq işlab çiqiladi.",
      "ru": "Учебные планы и программы разработаны в соответствии с Национальной рамкой квалификаций, государственными образовательными стандартами, профессиональными стандартами, квалификационными требованиями и/или международными образовательными стандартами*.",
      "en": "Curricula and study programmes are developed in accordance with the National Qualifications Framework, state educational standards, professional standards, qualification requirements and/or international education standards*."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; yuriskonsult",
      "ru": "Заведующий соответствующей кафедрой; юрисконсульт",
      "en": "Head of the relevant department; legal counsel"
    },
    "evidence": {
      "uz": "Işçi öquv rejalari va dasturlari; MMR/DTS/professional standartlarga havolalar; yozişmalar jadvali.",
      "ru": "Рабочие учебные планы и программы; ссылки на НРК/ГОС/профессиональные стандарты; таблица соответствия.",
      "en": "Working curricula and programmes; references to NQF/state/professional standards; compliance matrix."
    }
  },
  {
    "code": "3.2.1",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining taʼlim dasturida belgilangan öquv natijalariga erişişga yönaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Ta’lim dasturi amaliyot bazalarini öz içiga oladi*",
      "ru": "Образовательная программа включает базы практики*.",
      "en": "The educational programme includes internship and practical training bases*."
    },
    "main": {
      "uz": "Marketing va talabalar amaliyoti bölimi",
      "ru": "Отдел маркетинга и практики студентов",
      "en": "Marketing and Student Practice Department"
    },
    "co": {
      "uz": "Dekanatlar; Tegişli kafedra mudiri",
      "ru": "Деканаты; Заведующий соответствующей кафедрой",
      "en": "Dean’s offices; Head of the relevant department"
    },
    "evidence": {
      "uz": "Amaliyot bazalari bilan şartnomalar; buyurtmalar; stajirovka dasturlari; asoslar röyxati.",
      "ru": "Договоры с базами практики; приказы; программы практики; перечень баз.",
      "en": "Agreements with placement sites; orders; internship programmes; list of sites."
    }
  },
  {
    "code": "3.2.2",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining taʼlim dasturida belgilangan öquv natijalariga erişişga yönaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Öquv jarayoni nazariy bilimlarni amaliyotda, işlab çiqariş amaliyotida va tadqiqot faoliyatida qöllaş imkonini beruvçi amaliy maşğulotlarni (seminarlar, amaliy loyihalar, laboratoriya işlari va boşqa turdagi darslarni) öz içiga oladi**",
      "ru": "Учебный процесс включает практические занятия (семинары, практические проекты, лабораторные работы и другие виды занятий), позволяющие применять теоретические знания на практике, в производственной практике и исследовательской деятельности**.",
      "en": "The learning process includes practical activities—seminars, practical projects, laboratory work and other forms of instruction—that enable students to apply theoretical knowledge in practice, industrial placements and research activities**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlaş bölimi",
      "ru": "Учебно-методический отдел; отдел научных исследований, инноваций и подготовки научно-педагогических кадров",
      "en": "Academic and Methodological Department; Research, Innovation and Scientific-Pedagogical Staff Training Department"
    },
    "evidence": {
      "uz": "Syllabuslar; laboratoriya/amaliy işlar; loyihalar; stajirovka dasturlari; Talabalarning ilmiy-tadqiqot işlari.",
      "ru": "Силлабусы; лабораторные/практические работы; проекты; программы практики; научно-исследовательские работы студентов.",
      "en": "Syllabi; laboratory/practical work; projects; internship programmes; student research work."
    }
  },
  {
    "code": "3.2.3",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining taʼlim dasturida belgilangan öquv natijalariga erişişga yönaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Amaliyot natijalari böyiça manfaatdor tomonlarning fikrlarini töplaş va tahlil qiliş amaliyoti mavjud**",
      "ru": "Существует практика сбора и анализа мнений заинтересованных сторон по результатам практики**.",
      "en": "There is an established practice of collecting and analysing stakeholder feedback on practical training outcomes**."
    },
    "main": {
      "uz": "Marketing va talabalar amaliyoti bölimi",
      "ru": "Отдел маркетинга и практики студентов",
      "en": "Marketing and Student Practice Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Talabalar/iş beruvçilarning sörovnomalari; şarhlar; amaliyot natijalarini tahlil qiliş.",
      "ru": "Опросы студентов/работодателей; отзывы; анализ результатов практики.",
      "en": "Student/employer surveys; feedback; analysis of practical training outcomes."
    }
  },
  {
    "code": "3.2.4",
    "criterionCode": "3.2",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining taʼlim dasturida belgilangan öquv natijalariga erişişga yönaltirilgani",
      "ru": "Ориентация учебного процесса на достижение результатов обучения, установленных образовательной программой",
      "en": "Orientation of the learning process toward achievement of the learning outcomes defined by the educational programme"
    },
    "indicator": {
      "uz": "Tahlil natijalariga köra amaliyot samaradorligi baholanadi va amaliyot dasturlari takomillaştiriladi**",
      "ru": "По результатам анализа оценивается эффективность практики и совершенствуются программы практики**.",
      "en": "Based on analysis results, the effectiveness of practical training is evaluated and practical training programmes are improved**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Учебно-методический отдел; Отдел контроля качества образования",
      "en": "Academic and Methodological Department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Amaliyot samaradorligini tahlil qiliş; yangilangan amaliyot dasturlari; protokollar.",
      "ru": "Анализ эффективности практики; обновленные программы практики; протоколы.",
      "en": "Analysis of practical training effectiveness; updated internship programmes; minutes."
    }
  },
  {
    "code": "3.3.1",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining doimiy baholab borilişi va takomillaştirişga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "Öquv jarayoni sifatini baholaş va tahlil qiliş oliy ta’lim taşkiloti tomonidan belgilangan muddatlarda izçil amalga oşiriladi**",
      "ru": "Оценка и анализ качества учебного процесса последовательно осуществляются в сроки, установленные организацией высшего образования**.",
      "en": "Evaluation and analysis of the quality of the learning process are consistently carried out within the timeframes established by the higher education institution**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; tegişli kafedra mudiri",
      "ru": "Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Öquv jarayonini monitoring qiliş rejasi; darslarda qatnaşiş; hisobotlar va tahlillar.",
      "ru": "План мониторинга учебного процесса; посещение занятий; отчеты и анализ.",
      "en": "Learning-process monitoring plan; class observations; reports and analyses."
    }
  },
  {
    "code": "3.3.2",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining doimiy baholab borilişi va takomillaştirişga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "Baholaş jarayonida manfaatdor tomonlarning iştiroki tizimli ravişda ta’minlanadi**",
      "ru": "В процессе оценки системно обеспечивается участие заинтересованных сторон**.",
      "en": "Stakeholder participation in the evaluation process is systematically ensured**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Dekanatlar; tegişli kafedra mudiri; talabalar va iş beruvçilar",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; студенты и работодатели",
      "en": "Dean’s offices; Head of the relevant department; students and employers"
    },
    "evidence": {
      "uz": "Protokollar/sörovlar/intervyular; Manfaatdor tomonlar iştiroki varaqalari.",
      "ru": "Протоколы/опросы/интервью; листы участия заинтересованных сторон.",
      "en": "Minutes/surveys/interviews; stakeholder participation sheets."
    }
  },
  {
    "code": "3.3.3",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining doimiy baholab borilişi va takomillaştirişga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "Baholaş va tahlil natijalariga köra aniqlangan muammo va kamçiliklarni bartaraf etiş çoralari belgilandi**",
      "ru": "По результатам оценки и анализа определены меры по устранению выявленных проблем и недостатков**.",
      "en": "Measures have been defined to address problems and deficiencies identified through evaluation and analysis**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; tegişli kafedra mudiri",
      "ru": "Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Kamçiliklarni bartaraf etiş böyiça çora-tadbirlar rejasi; işlaşni tekşiriş belgilari.",
      "ru": "План мероприятий по устранению недостатков; отметки о проверке исполнения.",
      "en": "Action plan to address deficiencies; implementation verification records."
    }
  },
  {
    "code": "3.3.4",
    "criterionCode": "3.3",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Öquv jarayonining doimiy baholab borilişi va takomillaştirişga qaratilgani",
      "ru": "Постоянная оценка учебного процесса и его направленность на совершенствование",
      "en": "Continuous evaluation of the learning process and focus on improvement"
    },
    "indicator": {
      "uz": "Öquv jarayonini baholaş va tahlil qiliş natijalari hamda amalga oşirilayotgan tadbirlar asosida oliy ta’lim taşkilotining öquv dasturi va uslubiy hujjatlari doimiy ravişda takomillaştirilmoqda**",
      "ru": "На основе результатов оценки и анализа учебного процесса и проводимых мероприятий учебные программы и методические документы организации высшего образования постоянно совершенствуются**.",
      "en": "Based on evaluation and analysis of the learning process and the measures being implemented, curricula and methodological documents are continuously improved**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Заведующий соответствующей кафедрой; Отдел контроля качества образования",
      "en": "Head of the relevant department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Yangilangan uslubiy hujjatlar; protokollar; özgarişlarni taqqoslaş jadvali.",
      "ru": "Обновленные методические документы; протоколы; таблица сопоставления изменений.",
      "en": "Updated methodological documents; minutes; change-comparison table."
    }
  },
  {
    "code": "3.4.1",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Öquv jarayonida öqitişning yangi usullari, ilğor pedagogik va innovatsion texnologiyalar (keyingi örinlarda ilğor pedagogik yondaşuvlar) muntazam qöllaniladi **",
      "ru": "В учебном процессе регулярно применяются новые методы обучения, передовые педагогические и инновационные технологии (далее — передовые педагогические подходы)**.",
      "en": "New teaching methods and advanced pedagogical and innovative technologies (hereinafter, advanced pedagogical approaches) are regularly applied in the learning process**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; professor-öqituvçilar",
      "ru": "Учебно-методический отдел; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; academic staff"
    },
    "evidence": {
      "uz": "Syllabuslar; dars rejalari; raqamli materiallar; loyihalar; innovatsion usullardan foydalanişga misollar.",
      "ru": "Силлабусы; планы занятий; цифровые материалы; проекты; примеры применения инновационных методов.",
      "en": "Syllabi; lesson plans; digital materials; projects; examples of innovative methods."
    }
  },
  {
    "code": "3.4.2",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilğor pedagogik yondaşuvlar fanlar (modullar) mazmunini çuqur özlaştirişga, öquvçilarning mustaqil bilim oliş könikmalarini rivojlantirişga, tahliliy, tanqidiy va ijodiy fikrlaşga, jamoada işlaşga, şuningdek, ta’lim dasturida belgilangan ta’lim natijalariga samarali erişişga qaratilgan**",
      "ru": "Передовые педагогические подходы направлены на глубокое освоение содержания дисциплин (модулей), развитие навыков самостоятельного обучения, аналитического, критического и творческого мышления, командной работы и эффективное достижение результатов обучения, установленных образовательной программой**.",
      "en": "Advanced pedagogical approaches are aimed at deep mastery of course/module content, development of independent learning skills, analytical, critical and creative thinking, teamwork, and effective achievement of the learning outcomes defined by the educational programme**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; professor-öqituvçilar",
      "ru": "Учебно-методический отдел; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; academic staff"
    },
    "evidence": {
      "uz": "Syllabuslar; dars rejalari; raqamli materiallar; loyihalar; innovatsion usullardan foydalanişga misollar.",
      "ru": "Силлабусы; планы занятий; цифровые материалы; проекты; примеры применения инновационных методов.",
      "en": "Syllabi; lesson plans; digital materials; projects; examples of innovative methods."
    }
  },
  {
    "code": "3.4.3",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilğor pedagogik yondaşuvlar ta’lim şakli va talabalarning ehtiyojlarini hisobga olgan holda belgilanadi**",
      "ru": "Передовые педагогические подходы определяются с учетом формы обучения и потребностей студентов**.",
      "en": "Advanced pedagogical approaches are selected with consideration of the mode of study and student needs**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; professor-öqituvçilar",
      "ru": "Учебно-методический отдел; профессорско-преподавательский состав",
      "en": "Academic and Methodological Department; academic staff"
    },
    "evidence": {
      "uz": "Syllabuslar; dars rejalari; raqamli materiallar; loyihalar; innovatsion usullardan foydalanişga misollar.",
      "ru": "Силлабусы; планы занятий; цифровые материалы; проекты; примеры применения инновационных методов.",
      "en": "Syllabi; lesson plans; digital materials; projects; examples of innovative methods."
    }
  },
  {
    "code": "3.4.4",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilğor pedagogik yondaşuvlar samaradorligini muntazam monitoring qiliş va tahlil qiliş amalga oşiriladi**",
      "ru": "Регулярно осуществляется мониторинг и анализ эффективности передовых педагогических подходов**.",
      "en": "The effectiveness of advanced pedagogical approaches is regularly monitored and analysed**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; tegişli kafedra mudiri",
      "ru": "Учебно-методический отдел; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Ta’lim texnologiyalaridan foydalaniş monitoringi; samaradorlikni tahlil qiliş; sörovlar.",
      "ru": "Мониторинг использования образовательных технологий; анализ эффективности; опросы.",
      "en": "Monitoring of educational technology use; effectiveness analysis; surveys."
    }
  },
  {
    "code": "3.4.5",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalari böyiça aniqlangan kamçiliklarni bartaraf etiş maqsadida professor-öqituvçilarning ilğor pedagogik yondaşuvlarni qöllaş borasidagi salohiyati doimiy ravişda rivojlantirilmoqda**",
      "ru": "Для устранения недостатков, выявленных по результатам мониторинга и анализа, постоянно развивается потенциал преподавателей в применении передовых педагогических подходов**.",
      "en": "To address shortcomings identified through monitoring and analysis, academic staff capacity to apply advanced pedagogical approaches is continuously developed**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Xodimlar bölimi; tegişli kafedra mudiri",
      "ru": "Отдел кадров; Заведующий соответствующей кафедрой",
      "en": "Human Resources Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Kasbiy rivojlaniş rejalari; sertifikatlar; professor-öqituvçilar uçun seminarlar/treninglar.",
      "ru": "Планы профессионального развития; сертификаты; семинары/тренинги для преподавателей.",
      "en": "Professional development plans; certificates; seminars/training for academic staff."
    }
  },
  {
    "code": "3.4.6",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Monitoring va tahlil natijalariga köra öquv rejalari, öquv dasturlari va öquv-uslubiy majmualar yangilanib, ilğor pedagogik yondaşuvlar böyiça öquv-metodik qöllanmalar va öquv-metodik qöllanmalar muntazam işlab çiqilib, joriy etilmoqda**",
      "ru": "По результатам мониторинга и анализа обновляются учебные планы, программы и учебно-методические комплексы, регулярно разрабатываются и внедряются учебно-методические материалы по передовым педагогическим подходам**.",
      "en": "Based on monitoring and analysis, curricula, study programmes and teaching-methodological packages are updated, and guidance materials on advanced pedagogical approaches are regularly developed and implemented**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; professor-öqituvçilar",
      "ru": "Заведующий соответствующей кафедрой; профессорско-преподавательский состав",
      "en": "Head of the relevant department; academic staff"
    },
    "evidence": {
      "uz": "Yangilangan dasturlar va uslubiy materiallar; işlab çiqilgan qöllanmalar; amalga oşiriş aktlari.",
      "ru": "Обновленные программы и методические материалы; разработанные пособия; акты внедрения.",
      "en": "Updated programmes and methodological materials; developed guides; implementation acts."
    }
  },
  {
    "code": "3.4.7",
    "criterionCode": "3.4",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv jarayonida ilğor pedagogik texnologiyalarning qöllanilgani va tegişli samaradorlikka erişilgani",
      "ru": "Применение передовых педагогических технологий в учебном процессе по действующим образовательным программам и достижение соответствующей эффективности",
      "en": "Application of advanced pedagogical technologies in current educational programmes and achievement of appropriate effectiveness"
    },
    "indicator": {
      "uz": "Ilğor pedagogik yondaşuvlar samaradorligi böyiça tahliliy hisobot har yili tayyorlanadi va Oliy ta’lim taşkiloti Kengaşi tomonidan körib çiqiladi**",
      "ru": "Ежегодно готовится аналитический отчет об эффективности передовых педагогических подходов и рассматривается Советом организации высшего образования**.",
      "en": "An analytical report on the effectiveness of advanced pedagogical approaches is prepared annually and reviewed by the Council of the higher education institution**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi; Kengaş kotibi; tegişli kafedra mudiri",
      "ru": "Отдел контроля качества образования; Секретарь Совета; Заведующий соответствующей кафедрой",
      "en": "Education Quality Control Department; Council Secretary; Head of the relevant department"
    },
    "evidence": {
      "uz": "Yillik tahliliy hisobot; institut kengaşi tomonidan körib çiqiş bayonnomasi.",
      "ru": "Ежегодный аналитический отчет; протокол рассмотрения Советом института.",
      "en": "Annual analytical report; minutes of review by the Institute Council."
    }
  },
  {
    "code": "3.5.1",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining şaffof va xolis baholanişi, baholaş jarayonlarining öquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Baholaş tartibi (qoidalari), mezonlari, usullari va yondaşuvlari har bir fan (modul) boşlanişidan oldin talabalar e’tiboriga havola etiladi**",
      "ru": "Порядок (правила), критерии, методы и подходы к оцениванию доводятся до сведения студентов до начала каждой дисциплины (модуля)**.",
      "en": "Assessment procedures, criteria, methods and approaches are communicated to students before the start of each course/module**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; tegişli kafedra mudiri; öqituvçilar",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; преподаватели",
      "en": "Registrar’s Office; Head of the relevant department; teachers"
    },
    "evidence": {
      "uz": "Baholaş töğrisidagi nizom; öquv dasturlari; mezonlar/rubrikalar; HEMIS/LMS; namunaviy topşiriqlar.",
      "ru": "Положение об оценивании; учебные программы; критерии/рубрики; HEMIS/LMS; примеры заданий.",
      "en": "Assessment regulations; study programmes; criteria/rubrics; HEMIS/LMS; sample assignments."
    }
  },
  {
    "code": "3.5.2",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining şaffof va xolis baholanişi, baholaş jarayonlarining öquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Ta’lim dasturi formativ (joriy) va summativ (yakuniy) baholaşni ta’minlaydigan yondaşuv va vositalardan foydalanadi**",
      "ru": "Образовательная программа использует подходы и инструменты, обеспечивающие формативное (текущее) и суммативное (итоговое) оценивание**.",
      "en": "The educational programme uses approaches and tools that provide both formative (ongoing) and summative (final) assessment**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; tegişli kafedra mudiri; öqituvçilar",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; преподаватели",
      "en": "Registrar’s Office; Head of the relevant department; teachers"
    },
    "evidence": {
      "uz": "Baholaş töğrisidagi nizom; öquv dasturlari; mezonlar/rubrikalar; HEMIS/LMS; namunaviy topşiriqlar.",
      "ru": "Положение об оценивании; учебные программы; критерии/рубрики; HEMIS/LMS; примеры заданий.",
      "en": "Assessment regulations; study programmes; criteria/rubrics; HEMIS/LMS; sample assignments."
    }
  },
  {
    "code": "3.5.3",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining şaffof va xolis baholanişi, baholaş jarayonlarining öquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Baholaş mezonlari fan (modul) va ta’lim dasturi böyiça kutilayotgan öquv natijalariga asoslanadi va talabalarga aniq va tuşunarli şaklda yetkaziladi**",
      "ru": "Критерии оценивания основаны на ожидаемых результатах обучения по дисциплине (модулю) и образовательной программе и доводятся до студентов в ясной и понятной форме**.",
      "en": "Assessment criteria are based on the expected learning outcomes of the course/module and educational programme and are communicated to students in a clear and understandable form**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; tegişli kafedra mudiri; öqituvçilar",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; преподаватели",
      "en": "Registrar’s Office; Head of the relevant department; teachers"
    },
    "evidence": {
      "uz": "Baholaş töğrisidagi nizom; öquv dasturlari; mezonlar/rubrikalar; HEMIS/LMS; namunaviy topşiriqlar.",
      "ru": "Положение об оценивании; учебные программы; критерии/рубрики; HEMIS/LMS; примеры заданий.",
      "en": "Assessment regulations; study programmes; criteria/rubrics; HEMIS/LMS; sample assignments."
    }
  },
  {
    "code": "3.5.4",
    "criterionCode": "3.5",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturi doirasida talabalar bilimining şaffof va xolis baholanişi, baholaş jarayonlarining öquv natijalariga muvofiqligi",
      "ru": "Прозрачное и объективное оценивание знаний студентов в рамках образовательной программы и соответствие процессов оценивания результатам обучения",
      "en": "Transparent and objective assessment of student knowledge and alignment of assessment processes with learning outcomes"
    },
    "indicator": {
      "uz": "Baholaş jarayoni adolat, oşkoralik va akademik halollik tamoyillariga qat’iy amal qiladi**",
      "ru": "Процесс оценивания строго соблюдает принципы справедливости, прозрачности и академической честности**.",
      "en": "The assessment process strictly follows the principles of fairness, transparency and academic integrity**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Komplayens-nazorat bölimi; Registrator ofisi; Ta’lim sifatini nazorat qiliş bölimi; tegişli kafedra mudiri",
      "ru": "Отдел комплаенс-контроля; Офис регистратора; Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Compliance Control Department; Registrar’s Office; Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Baholaş va akademik halollik qoidalari; nazorat protokollari; tekşiriş natijalari.",
      "ru": "Правила оценивания и академической честности; протоколы контроля; результаты проверок.",
      "en": "Assessment and academic integrity rules; monitoring records; inspection results."
    }
  },
  {
    "code": "3.6.1",
    "criterionCode": "3.6",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Talabalarning baholaş natijalari böyiça fikr-mulohazalarini oliş imkoniyati mavjudligi",
      "ru": "Наличие возможности получения обратной связи от студентов по результатам оценивания",
      "en": "Availability of mechanisms for obtaining student feedback on assessment results"
    },
    "indicator": {
      "uz": "Takliflar, fikr-mulohazalar va şikoyatlar talabalar uçun qulay şaroitlarda va ularning ehtiyojlariga javob beradigan şakllarda qabul qilinadi hamda ularni körib çiqiş jarayoni şaffoflik, javobgarlik va manfaatlar töqnaşuvining oldini oliş tamoyillari asosida amalga oşiriladi**",
      "ru": "Предложения, отзывы и жалобы принимаются в удобных для студентов формах, отвечающих их потребностям, а их рассмотрение осуществляется на принципах прозрачности, подотчетности и предотвращения конфликта интересов**.",
      "en": "Suggestions, feedback and complaints are accepted in forms convenient for students and responsive to their needs; the review process is based on transparency, accountability and prevention of conflicts of interest**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Dekanatlar; Ta’lim sifatini nazorat qiliş bölimi; Komplayens-nazorat bölimi",
      "ru": "Деканаты; Отдел контроля качества образования; Отдел комплаенс-контроля",
      "en": "Dean’s offices; Education Quality Control Department; Compliance Control Department"
    },
    "evidence": {
      "uz": "Kanallarni söraş; jurnallar/registrlar; körib çiqiş tartibi; javoblar va statistika.",
      "ru": "Каналы обращений; журналы/реестры; порядок рассмотрения; ответы и статистика.",
      "en": "Feedback channels; journals/registers; review procedure; responses and statistics."
    }
  },
  {
    "code": "3.6.2",
    "criterionCode": "3.6",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Talabalarning baholaş natijalari böyiça fikr-mulohazalarini oliş imkoniyati mavjudligi",
      "ru": "Наличие возможности получения обратной связи от студентов по результатам оценивания",
      "en": "Availability of mechanisms for obtaining student feedback on assessment results"
    },
    "indicator": {
      "uz": "Talabalarning baholaş jarayoni va natijalari böyiça şikoyatlari oliy ta’lim taşkilotining apellyatsiya komissiyasi tomonidan körib çiqiladi va tizimli tahlil qilinadi**",
      "ru": "Жалобы студентов по процессу и результатам оценивания рассматриваются апелляционной комиссией организации высшего образования и системно анализируются**.",
      "en": "Student complaints regarding the assessment process and results are reviewed by the institution’s appeals commission and systematically analysed**."
    },
    "main": {
      "uz": "Apellyatsiya komissiyasi",
      "ru": "Апелляционная комиссия",
      "en": "Appeals Commission"
    },
    "co": {
      "uz": "Registrator ofisi; öquv-uslubiy bölim; Ijroçi direktorning öquv işlari böyiça örinbosari",
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
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Talabalarning baholaş natijalari böyiça fikr-mulohazalarini oliş imkoniyati mavjudligi",
      "ru": "Наличие возможности получения обратной связи от студентов по результатам оценивания",
      "en": "Availability of mechanisms for obtaining student feedback on assessment results"
    },
    "indicator": {
      "uz": "Tahlil natijalariga köra hisobotlar tayyorlanadi, baholaş jarayonini takomillaştiriş çora-tadbirlari belgilanadi, baholaş tartibi va mezonlariga zarur özgartirişlar kiritiladi**",
      "ru": "По результатам анализа готовятся отчеты, определяются меры по совершенствованию процесса оценивания и вносятся необходимые изменения в порядок и критерии оценивания**.",
      "en": "Based on the analysis, reports are prepared, measures to improve assessment are defined, and necessary changes are made to assessment procedures and criteria**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Registrator ofisi; öquv-uslubiy bölim",
      "ru": "Офис регистратора; Учебно-методический отдел",
      "en": "Registrar’s Office; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Sörovlar/murojaatlar böyiça tahliliy hisobot; baholaşni takomillaştiriş rejasi.",
      "ru": "Аналитический отчет по опросам/обращениям; план совершенствования оценивания.",
      "en": "Analytical report on surveys/appeals; assessment improvement plan."
    }
  },
  {
    "code": "3.7.1",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini oliş böyiça samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Akademik yaxlitlik tamoyillari ta’lim dasturini işlab çiqiş, öqitiş, baholaş va tadqiqot faoliyati jarayonlariga tizimli ravişda birlaştiriladi**",
      "ru": "Принципы академической честности системно интегрированы в процессы разработки образовательной программы, обучения, оценивания и исследовательской деятельности**.",
      "en": "Principles of academic integrity are systematically integrated into programme development, teaching, assessment and research activities**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Komplayens-nazorat bölimi; Ta’lim sifatini nazorat qiliş bölimi; tegişli kafedra mudiri",
      "ru": "Отдел комплаенс-контроля; Отдел контроля качества образования; Заведующий соответствующей кафедрой",
      "en": "Compliance Control Department; Education Quality Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Akademik halollik kodeksi/bayonoti; talablarni öquv dasturlari va baholaşga integratsiya qiliş.",
      "ru": "Кодекс/положение об академической честности; интеграция требований в учебные программы и оценивание.",
      "en": "Academic integrity code/policy; integration of requirements into curricula and assessment."
    }
  },
  {
    "code": "3.7.2",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini oliş böyiça samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Plagiat va akademik daxlsizlik qoidalarining boşqa buzilişining oldini oliş, aniqlaş va bartaraf etiş böyiça antiplagiat tizimi va taşkiliy çora-tadbirlar joriy etildi**",
      "ru": "Внедрены антиплагиатная система и организационные меры по предупреждению, выявлению и устранению плагиата и иных нарушений академической честности**.",
      "en": "An anti-plagiarism system and organisational measures have been introduced to prevent, detect and address plagiarism and other violations of academic integrity**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlaş boşqarmasi; Raqamli va axborot texnologiyalari bölimi; Komplayens-nazorat bölimi",
      "ru": "Управление научных исследований, инноваций и подготовки научно-педагогических кадров; Отдел цифровых и информационных технологий; Отдел комплаенс-контроля",
      "en": "Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; Digital and Information Technologies Department; Compliance Control Department"
    },
    "evidence": {
      "uz": "Plagiatga qarşi kelişuv/kiriş; körsatmalar; tekşiriş hisobotlari; taşkiliy çora-tadbirlar.",
      "ru": "Договор/доступ к антиплагиатной системе; инструкции; отчеты о проверках; организационные меры.",
      "en": "Anti-plagiarism agreement/access; instructions; verification reports; organisational measures."
    }
  },
  {
    "code": "3.7.3",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini oliş böyiça samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Akademik daxlsizlik qoidalarini buzganlik holatlarini körib çiqiş va jazolarni belgilaşning şaffof tartibi mavjud**",
      "ru": "Существует прозрачный порядок рассмотрения случаев нарушения академической честности и определения мер ответственности**.",
      "en": "A transparent procedure exists for reviewing violations of academic integrity and determining sanctions**."
    },
    "main": {
      "uz": "Komplayens-nazorat bölimi",
      "ru": "Отдел комплаенс-контроля",
      "en": "Compliance Control Department"
    },
    "co": {
      "uz": "Yuriskonsult; Öquv-uslubiy bölim; Xodimlar bölimi; tegişli fakultet dekanati.",
      "ru": "Юрисконсульт; Учебно-методический отдел; Отдел кадров; tegishli fakultet dekanati.",
      "en": "Legal counsel; Academic and Methodological Department; Human Resources Department; tegishli fakultet dekanati."
    },
    "evidence": {
      "uz": "Huquqbuzarliklarni körib çiqiş tartibi; komissiya; protokollar va majburiyatlar.",
      "ru": "Порядок рассмотрения нарушений; комиссия; протоколы и меры ответственности.",
      "en": "Procedure for reviewing violations; commission; minutes and accountability measures."
    }
  },
  {
    "code": "3.7.4",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini oliş böyiça samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Talabalar va professor-öqituvçilar akademik halollik va axloq qoidalari bilan tanişadilar**",
      "ru": "Студенты и профессорско-преподавательский состав ознакомлены с правилами академической честности и этики**.",
      "en": "Students and academic staff are familiarised with academic integrity and ethical rules**."
    },
    "main": {
      "uz": "Komplayens-nazorat bölimi",
      "ru": "Отдел комплаенс-контроля",
      "en": "Compliance Control Department"
    },
    "co": {
      "uz": "Dekanatlar; Xodimlar bölimi; öquv-uslubiy bölim; tegişli kafedra mudirlari.",
      "ru": "Деканаты; Отдел кадров; Учебно-методический отдел; tegishli kafedra mudirlari.",
      "en": "Dean’s offices; Human Resources Department; Academic and Methodological Department; tegishli kafedra mudirlari."
    },
    "evidence": {
      "uz": "Tanişuv varaqalari; brifing jurnallari; elektron tasdiqlar.",
      "ru": "Листы ознакомления; журналы инструктажей; электронные подтверждения.",
      "en": "Acknowledgement sheets; briefing logs; electronic confirmations."
    }
  },
  {
    "code": "3.7.5",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini oliş böyiça samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Talabalar va professor-öqituvçilar uçun akademik halollik, axloq, plagiat, sun’iy intellektdan töğri foydalaniş, mualliflik huquqi va manfaatlar töqnaşuvi** mavzularida muntazam ravişda treninglar (seminarlar, ma’ruzalar) taşkil etilmoqda.",
      "ru": "Для студентов и профессорско-преподавательского состава регулярно организуются тренинги (семинары, лекции) по академической честности, этике, плагиату, корректному использованию искусственного интеллекта, авторскому праву и конфликту интересов**.",
      "en": "Regular training sessions, seminars and lectures are organised for students and academic staff on academic integrity, ethics, plagiarism, responsible use of artificial intelligence, copyright and conflicts of interest**."
    },
    "main": {
      "uz": "Komplayens-nazorat bölimi",
      "ru": "Отдел комплаенс-контроля",
      "en": "Compliance Control Department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlaş boşqarmasi; Yuriskonsult; Xodimlar bölimi; tegişli fakultet dekanatlari va kafedra mudirlari",
      "ru": "Учебно-методический отдел; Управление научных исследований, инноваций и подготовки научно-педагогических кадров; Юрисконсульт; Отдел кадров; деканаты соответствующих факультетов и заведующие кафедрами",
      "en": "Academic and Methodological Department; Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; Legal counsel; Human Resources Department; relevant faculty dean’s offices and heads of departments"
    },
    "evidence": {
      "uz": "Seminarlarning rejalari va materiallari; iştirokçilar röyxati; fotosuratlar/protokollar; sertifikatlar.",
      "ru": "Планы и материалы семинаров; списки участников; фотографии/протоколы; сертификаты.",
      "en": "Seminar plans and materials; participant lists; photographs/minutes; certificates."
    }
  },
  {
    "code": "3.7.6",
    "criterionCode": "3.7",
    "chapter": {
      "uz": "3-BOB. ÖQUV JARAYONINI TAŞKIL ETIŞ VA TA’LIM NATIJALARINI BAHOLAŞ",
      "ru": "ГЛАВА 3. ОРГАНИЗАЦИЯ УЧЕБНОГО ПРОЦЕССА И ОЦЕНКА РЕЗУЛЬТАТОВ ОБУЧЕНИЯ",
      "en": "CHAPTER 3. ORGANISATION OF THE LEARNING PROCESS AND ASSESSMENT OF LEARNING OUTCOMES"
    },
    "criterion": {
      "uz": "Taʼlim dasturida akademik halollik qoidalarining belgilangani va unga zid holatlarning oldini oliş böyiça samarali tizimning mavjudligi",
      "ru": "Установление правил академической честности в образовательной программе и наличие эффективной системы предупреждения нарушений",
      "en": "Established academic integrity rules within the educational programme and an effective system for preventing violations"
    },
    "indicator": {
      "uz": "Talabalar va professor-öqituvçilar tomonidan yaratilgan ilmiy işlar, innovatsion ğoyalar, ixtirolar va boşqa intellektual mulkka bölgan huquqlar himoyasi taʼminlanadi**",
      "ru": "Обеспечивается защита прав на научные работы, инновационные идеи, изобретения и иные объекты интеллектуальной собственности, созданные студентами и профессорско-преподавательским составом**.",
      "en": "Protection is ensured for rights to research works, innovative ideas, inventions and other intellectual property created by students and academic staff**."
    },
    "main": {
      "uz": "Ijroçi direktorning ilmiy işlar böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по научной работе",
      "en": "Deputy Executive Director for Research"
    },
    "co": {
      "uz": "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlaş boşqarmasi; yuriskonsult; Komplayens-nazorat bölimi; tegişli kafedra mudiri",
      "ru": "Управление научных исследований, инноваций и подготовки научно-педагогических кадров; юрисконсульт; Отдел комплаенс-контроля; Заведующий соответствующей кафедрой",
      "en": "Department for Research, Innovation and Training of Scientific-Pedagogical Personnel; legal counsel; Compliance Control Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Intellektual mulk töğrisidagi nizom; şartnomalar; patentlar/sertifikatlar; huquqlarini himoya qiliş çoralari.",
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
      "uz": "Taʼlim dasturi böyiça qabul talablari aniq belgilangani, öqişga qabul qiliş şaffof tarzda yölga qöyilgani",
      "ru": "Четкое определение требований приема на образовательную программу и прозрачная организация приема",
      "en": "Clearly defined programme admission requirements and transparent admissions procedures"
    },
    "indicator": {
      "uz": "Çet tilida amalga oşiriladigan ta’lim dasturiga hujjat topşirişda, Nomzodlardan milliy yoki xalqaro talablarga javob beradigan çet tilini biliş darajasi talab qilinadi** (Bunda abituriyentning dasturga kirişdan oldin çet tilini yetarli darajada bilişi tegişli hujjat bilan tasdiqlanadi)",
      "ru": "При поступлении на образовательную программу, реализуемую на иностранном языке, от кандидатов требуется уровень владения иностранным языком, соответствующий национальным или международным требованиям; достаточный уровень подтверждается соответствующим документом**.",
      "en": "For admission to a programme delivered in a foreign language, applicants must demonstrate a level of foreign-language proficiency meeting national or international requirements; sufficient proficiency is confirmed by an appropriate document**."
    },
    "main": {
      "uz": "Qabul komissiyasi",
      "ru": "Приемная комиссия",
      "en": "Admissions Committee"
    },
    "co": {
      "uz": "Xalqaro hamkorlik bölimi; öquv-uslubiy bölim",
      "ru": "Отдел международного сотрудничества; Учебно-методический отдел",
      "en": "International Cooperation Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Qabul qiliş qoidalari; til sertifikatlariga qöyiladigan talablar; olingan hujjatlar - agar körsatkiç mavjud bölsa.",
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
      "uz": "Taʼlim dasturi böyiça qabul talablari aniq belgilangani, öqişga qabul qiliş şaffof tarzda yölga qöyilgani",
      "ru": "Четкое определение требований приема на образовательную программу и прозрачная организация приема",
      "en": "Clearly defined programme admission requirements and transparent admissions procedures"
    },
    "indicator": {
      "uz": "Ta’lim dasturiga qabul qiliş talablari ötgan yillarda qabul qilingan talabalarni formativ va summativ baholaş natijalari böyiça tizimli ravişda körib çiqiladi va zarurat tuğilganda özgartirişlar kiritiladi**",
      "ru": "Требования к приему на образовательную программу системно пересматриваются с учетом результатов формативного и суммативного оценивания студентов, принятых в предыдущие годы, и при необходимости корректируются**.",
      "en": "Admission requirements for the educational programme are systematically reviewed using formative and summative assessment results of students admitted in previous years and are adjusted where necessary**."
    },
    "main": {
      "uz": "Qabul komissiyasi",
      "ru": "Приемная комиссия",
      "en": "Admissions Committee"
    },
    "co": {
      "uz": "Registrator ofisi; öquv-uslubiy bölim; ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Офис регистратора; Учебно-методический отдел; Отдел контроля качества образования",
      "en": "Registrar’s Office; Academic and Methodological Department; Education Quality Control Department"
    },
    "evidence": {
      "uz": "Qabul qilingan kontingentlarni tayyorlaş natijalarini tahlil qiliş; qabul qiliş talablarini tuzatiş böyiça takliflar.",
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
      "uz": "Qabul parametrlarining taʼlim taşkilotining resurslari va imkoniyatlariga mos kelişi",
      "ru": "Соответствие параметров приема ресурсам и возможностям образовательной организации",
      "en": "Alignment of admission parameters with the resources and capacity of the educational institution"
    },
    "indicator": {
      "uz": "Qabul qiliş parametrlarini amalga oşiriş tahlili har yili amalga oşiriladi va tahlil natijalariga köra qabul parametrlariga zarur özgartirişlar kiritiladi**",
      "ru": "Ежегодно проводится анализ реализации параметров приема, по результатам которого при необходимости в параметры приема вносятся изменения**.",
      "en": "Implementation of admission parameters is analysed annually and necessary changes are made based on the results**."
    },
    "main": {
      "uz": "Qabul komissiyasi",
      "ru": "Приемная комиссия",
      "en": "Admissions Committee"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; Reja-moliya bölimi; dekanatlar",
      "ru": "Учебно-методический отдел; Планово-финансовый отдел; деканаты",
      "en": "Academic and Methodological Department; Planning and Finance Department; dean’s offices"
    },
    "evidence": {
      "uz": "Qabul qiliş parametrlarini amalga oşirişning yillik tahlili; resurslar bilan ta’minlaşni hisoblaş; taklif qiladi.",
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
      "uz": "Talabalarning öqişini köçiriş, kursdan-kursga ötkaziş (qoldiriş), öqişdan çetlaştiriş va öqişini qayta tiklaş (bundan buyon matnda talabalar harakati deb yuritiladi) tartibining belgilangani",
      "ru": "Установленный порядок перевода, перехода с курса на курс, отчисления и восстановления студентов",
      "en": "Established procedures for student transfer, progression, dismissal and reinstatement"
    },
    "indicator": {
      "uz": "Talabalar harakatiga oid içki hujjatlar (qoidalar, tartiblar, tartiblar) mavjud bölib, talabalar va ularning ota-onalari köçiriş, kursdan kursga ötiş, öqişdan çetlaştiriş va qayta tiklaş jarayonlari va natijalari töğrisida xabardor qilinadi**",
      "ru": "Имеются внутренние документы, регулирующие движение студентов; студенты и их родители информируются о процедурах и результатах перевода, перехода с курса на курс, отчисления и восстановления**.",
      "en": "Internal documents regulating student mobility are in place; students and their parents are informed about procedures and outcomes for transfer, progression, dismissal and reinstatement**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Dekanatlar; yuriskonsult; Raqamli va axborot texnologiyalari bölimi",
      "ru": "Деканаты; юрисконсульт; Отдел цифровых и информационных технологий",
      "en": "Dean’s offices; legal counsel; Digital and Information Technologies Department"
    },
    "evidence": {
      "uz": "Talabalar harakatining içki tartibi; eslatmalar; talabalar va ota-onalarga naşrlar/xabarnomalar.",
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
      "uz": "Talabalarning öqişini köçiriş, kursdan-kursga ötkaziş (qoldiriş), öqişdan çetlaştiriş va öqişini qayta tiklaş (bundan buyon matnda talabalar harakati deb yuritiladi) tartibining belgilangani",
      "ru": "Установленный порядок перевода, перехода с курса на курс, отчисления и восстановления студентов",
      "en": "Established procedures for student transfer, progression, dismissal and reinstatement"
    },
    "indicator": {
      "uz": "Talabalar harakati masalalari böyiça qabul qilingan qarorlar tegişli asoslar bilan hujjatlaştiriladi**",
      "ru": "Решения по вопросам движения студентов документируются с указанием соответствующих оснований**.",
      "en": "Decisions on student mobility matters are documented with the relevant grounds**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Dekanatlar; öquv-uslubiy bölim; yuriskonsult",
      "ru": "Деканаты; Учебно-методический отдел; юрисконсульт",
      "en": "Dean’s offices; Academic and Methodological Department; legal counsel"
    },
    "evidence": {
      "uz": "Ötkaziş, qayta tiklaş, çiqarib yuboriş töğrisidagi buyruqlar /qarorlar; asoslar; protokollar.",
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
      "uz": "Talabalarni qöllab-quvvatlaş va ularga maslahat beriş mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Talabalarga “Ustoz-şogird” formatida yordam körsatiladi va töğri fanlarni (modullarni) tanlaş, baholaş tizimini tuşuniş va şaxsiy rivojlaniş yönalişini aniqlaşda murabbiylik yordami körsatiladi**",
      "ru": "Студентам оказывается поддержка в формате «Устоз-шогирд», включая наставничество при выборе дисциплин (модулей), понимании системы оценивания и определении направления личностного развития**.",
      "en": "Students receive support in the “Mentor–Apprentice” format, including mentoring in selecting courses/modules, understanding the assessment system and defining personal development pathways**."
    },
    "main": {
      "uz": "Ijroçi direktorning yoşlar bilan işlaş böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по работе с молодежью",
      "en": "Deputy Executive Director for Youth Affairs"
    },
    "co": {
      "uz": "Dekanatlar; tegişli kafedra mudiri; tyutorlar",
      "ru": "Деканаты; Заведующий соответствующей кафедрой; тьюторы",
      "en": "Dean’s offices; Head of the relevant department; tutors"
    },
    "evidence": {
      "uz": "Mentorlar böyiça buyurtmalar; rejalar va hisobotlar; maslahatlaşuvlar; jurnallar/protokollar.",
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
      "uz": "Talabalarni qöllab-quvvatlaş va ularga maslahat beriş mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Psixologik maslahat va yordam markazi taşkil etildi**",
      "ru": "Создан центр психологического консультирования и помощи**.",
      "en": "A psychological counselling and support centre has been established**."
    },
    "main": {
      "uz": "Ijroçi direktorning yoşlar bilan işlaş böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по работе с молодежью",
      "en": "Deputy Executive Director for Youth Affairs"
    },
    "co": {
      "uz": "Psixolog; dekanatlar",
      "ru": "Психолог; деканаты",
      "en": "Psychologist; dean’s offices"
    },
    "evidence": {
      "uz": "Psixologik xizmatlar töğrisidagi buyruq/nizom; jadval; maslahat jurnali; axborot materiallari.",
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
      "uz": "Talabalarni qöllab-quvvatlaş va ularga maslahat beriş mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Akademik qarzdor talabalar bilan tizimli iş olib borilmoqda**",
      "ru": "Системно ведется работа со студентами, имеющими академическую задолженность**.",
      "en": "Systematic work is carried out with students who have academic arrears**."
    },
    "main": {
      "uz": "Dekanatlar",
      "ru": "Деканаты",
      "en": "Dean’s offices"
    },
    "co": {
      "uz": "Registrator ofisi; tegişli kafedra mudiri; öquv-uslubiy bölim",
      "ru": "Офис регистратора; Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Registrar’s Office; Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Akademik qarzlar reestri; individual jadvallar; protokollar va iş natijalari.",
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
      "uz": "Talabalarni qöllab-quvvatlaş va ularga maslahat beriş mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Talabalarning qiziqişlari va kasbiy maqsadlarini hisobga olgan holda individual ta’lim traektoriyasi şakllantiriladi va uni amalga oşiriş uçun uslubiy va axborot ta’minoti ta’minlanadi**",
      "ru": "С учетом интересов и профессиональных целей студентов формируется индивидуальная образовательная траектория и обеспечивается методическое и информационное сопровождение ее реализации**.",
      "en": "Individual learning pathways are formed in accordance with students’ interests and professional goals, with methodological and information support for their implementation**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Registrator ofisi; dekanatlar; tegişli kafedra mudiri",
      "ru": "Офис регистратора; деканаты; Заведующий соответствующей кафедрой",
      "en": "Registrar’s Office; dean’s offices; Head of the relevant department"
    },
    "evidence": {
      "uz": "Şaxsiy traektoriyani şakllantiriş tartibi; fanlarni tanlaş; maslahatlaşuvlar; IEP.",
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
      "uz": "Talabalarni qöllab-quvvatlaş va ularga maslahat beriş mexanizmlarining mavjudligi",
      "ru": "Наличие механизмов поддержки и консультирования студентов",
      "en": "Availability of mechanisms for student support and counselling"
    },
    "indicator": {
      "uz": "Konsultatsiya xizmatlaridan foydalaniş va ularning samaradorligi töğrisidagi ma’lumotlar yiğiladi va tahlil qilinadi, talabalarning uşbu xizmatlardan qoniqiş darajasi muntazam ravişda baholanadi va maslahat tizimi takomillaştiriladi**",
      "ru": "Собираются и анализируются данные об использовании консультационных услуг и их эффективности, регулярно оценивается удовлетворенность студентов и совершенствуется система консультирования**.",
      "en": "Data on the use and effectiveness of counselling services are collected and analysed, student satisfaction is regularly assessed, and the counselling system is improved**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Yoşlar bilan işlaş bölimi; dekanatlar; Registrator ofisi",
      "ru": "Отдел по работе с молодежью; деканаты; Офис регистратора",
      "en": "Youth Affairs Department; dean’s offices; Registrar’s Office"
    },
    "evidence": {
      "uz": "Konsalting xizmatlaridan qoniqiş sörovi; tahlil; takomillaştiriş rejasi.",
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
      "uz": "Taʼlim dasturi uçun belgilangan meʼyorlarga muvofiq pedagog kadrlar, şuningdek, boşqaruv, texnik, xizmat körsatuvçi va öquv-yordamçi xodimlar mavjudligi hamda ularning sifat tarkibi, malakasi va mutaxassisligi belgilangan talablarga mosligi",
      "ru": "Наличие педагогических, управленческих, технических, обслуживающих и учебно-вспомогательных работников в соответствии с нормами программы и соответствие их состава, квалификации и специализации установленным требованиям",
      "en": "Availability of academic, managerial, technical, service and support staff in accordance with programme norms and compliance of their composition, qualifications and specialisations with established requirements"
    },
    "indicator": {
      "uz": "Xodimlarni ijtimoiy qöllab-quvvatlaş va moddiy rağbatlantiriş tizimi joriy etildi**",
      "ru": "Внедрена система социальной поддержки и материального стимулирования работников**.",
      "en": "A system of social support and financial incentives for staff has been introduced**."
    },
    "main": {
      "uz": "Xodimlar bölimi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Reja-moliya bölimi; Institut boşqaruvi",
      "ru": "Планово-финансовый отдел; Руководство института",
      "en": "Planning and Finance Department; Institute Management"
    },
    "evidence": {
      "uz": "Rağbatlantiriş qoidalari; reklama buyurtmalari; ijtimoiy çora-tadbirlar; tölovlarni tasdiqlaş.",
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
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv rejadagi fanlarga mos (tegişli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Ta’lim dasturining maqsad, vazifalari va kutilayotgan öquv natijalaridan kelib çiqib, öquv rejasini samarali amalga oşirişni ta’minlaş uçun professor-öqituvçilarning soni va tarkibi şakllantirildi**",
      "ru": "Исходя из целей, задач и ожидаемых результатов образовательной программы сформированы численность и состав профессорско-преподавательского состава, обеспечивающие эффективную реализацию учебного плана**.",
      "en": "Based on the objectives, tasks and expected learning outcomes of the educational programme, the number and composition of academic staff have been formed to ensure effective delivery of the curriculum**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Xodimlar bölimi; öquv-uslubiy bölim; Ijroçi direktorning öquv işlari böyiça örinbosari",
      "ru": "Отдел кадров; Учебно-методический отдел; Заместитель исполнительного директора по учебной работе",
      "en": "Human Resources Department; Academic and Methodological Department; Deputy Executive Director for Academic Affairs"
    },
    "evidence": {
      "uz": "Kadrlar jadvali; tariflaş; yukni taqsimlaş; xodimlar haqida ma’lumot.",
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
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv rejadagi fanlarga mos (tegişli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Öqituvçilar tarkibining ixtisosligi öqitiladigan fanlarga (modullarga) mos keladi**",
      "ru": "Специализация преподавательского состава соответствует преподаваемым дисциплинам (модулям)**.",
      "en": "The specialisation of academic staff corresponds to the courses/modules they teach**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Xodimlar bölimi; öquv-uslubiy bölim",
      "ru": "Отдел кадров; Учебно-методический отдел",
      "en": "Human Resources Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Diplomlar/sertifikatlar; tajriba haqida ma’lumot; öqituvçi-intizom yozişmalari matritsasi.",
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
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv rejadagi fanlarga mos (tegişli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Professor-öqituvçilarning erişgan yutuqlari körsatkiçlari şakllantirildi (davlat va tarmoq mukofotlari, faxriy unvonlar, xalqaro va respublika tanlovlaridagi ğalabalar va boşqa yutuqlar) **",
      "ru": "Сформированы показатели достижений профессорско-преподавательского состава (государственные и отраслевые награды, почетные звания, победы в международных и республиканских конкурсах и иные достижения)**.",
      "en": "Indicators of academic staff achievements have been compiled, including state and sector awards, honorary titles, victories in international and national competitions and other achievements**."
    },
    "main": {
      "uz": "Xodimlar bölimi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Ilmiy işlar böyiça direktor örinbosari; tegişli kafedra mudiri",
      "ru": "Заместитель директора по научной работе; Заведующий соответствующей кафедрой",
      "en": "Deputy Director for Research; Head of the relevant department"
    },
    "evidence": {
      "uz": "Mukofotlar, unvonlar va yutuqlar reestri; tasdiqlovçi hujjatlarning nusxalari.",
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
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv rejadagi fanlarga mos (tegişli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Professor-öqituvçilarning öquv, ilmiy, uslubiy va ilmiy-tadqiqot faoliyati natijalari (fundamental, amaliy va boşqa ilmiy loyihalarda iştirok etiş, darsliklar, öquv qöllanmalar va öquv-uslubiy işlanmalar tayyorlaş, mahalliy va xalqaro naşrlarda naşrlar, şu jumladan Scopus, Web of Science yoki boşqa umume’tirof etilgan ma’lumotlar bazalarida indekslangan impakt faktorli jurnallarda va boşqalar)**",
      "ru": "Учитываются результаты учебной, научной, методической и научно-исследовательской деятельности профессорско-преподавательского состава, включая участие в проектах, подготовку учебных изданий и публикации в национальных и международных изданиях, в том числе индексируемых в Scopus, Web of Science и иных признанных базах данных**.",
      "en": "Results of teaching, scientific, methodological and research activities of academic staff are documented, including participation in projects, preparation of educational publications and publications in national and international journals, including those indexed in Scopus, Web of Science and other recognised databases**."
    },
    "main": {
      "uz": "Ijroçi direktorning ilmiy işlar böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по научной работе",
      "en": "Deputy Executive Director for Research"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; Xodimlar bölimi",
      "ru": "Заведующий соответствующей кафедрой; Отдел кадров",
      "en": "Head of the relevant department; Human Resources Department"
    },
    "evidence": {
      "uz": "Ilmiy va uslubiy işlar reestri; naşrlar; loyihalar; Scopus/WoS va boşqa tasdiqlar.",
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
      "uz": "Amaldagi ta’lim dasturlari böyiça öquv rejadagi fanlarga mos (tegişli) kasbiy, pedagogik va ilmiy kompetensiyalarga ega pedagog kadrlar bilan ta’minlangani",
      "ru": "Обеспечение действующих образовательных программ педагогическими кадрами, обладающими профессиональными, педагогическими и научными компетенциями, соответствующими дисциплинам учебного плана",
      "en": "Provision of academic staff with professional, pedagogical and scientific competencies relevant to the courses in current educational programmes"
    },
    "indicator": {
      "uz": "Xodimlarni doimiy ravişda içki va taşqi malaka oşiriş kurslariga yuboriş tizimi yaratildi**",
      "ru": "Создана система регулярного направления работников на внутренние и внешние курсы повышения квалификации**.",
      "en": "A system has been established for regularly sending staff to internal and external professional development courses**."
    },
    "main": {
      "uz": "Xodimlar bölimi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Öquv işlari böyiça örinbosari; Xalqaro hamkorlik bölimi; tegişli kafedra mudiri",
      "ru": "Заместитель по учебной работе; Отдел международного сотрудничества; Заведующий соответствующей кафедрой",
      "en": "Deputy for Academic Affairs; International Cooperation Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Kasbiy rivojlaniş rejasi; buyurtmalar; şartnomalar; sertifikatlar; hisobot beriş.",
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
      "uz": "Kadrlarning kasbiy rivojlanişi va malaka oşirişiga şaroit yaratilgani, moddiy va maʼnaviy rağbatlantiriş tizimining mavjudligi",
      "ru": "Создание условий для профессионального развития и повышения квалификации кадров, наличие системы материального и морального стимулирования",
      "en": "Conditions for staff professional development and continuing education, with a system of material and non-material incentives"
    },
    "indicator": {
      "uz": "Xodimlarni mutaxassisligi böyiça xorijiy amaliyot va konferensiyalarga yuboriş amaliyoti mavjud**",
      "ru": "Практикуется направление работников на зарубежные стажировки и конференции по профилю их специальности**.",
      "en": "There is a practice of sending staff to international internships and conferences relevant to their specialisation**."
    },
    "main": {
      "uz": "Xalqaro hamkorlik bölimi",
      "ru": "Отдел международного сотрудничества",
      "en": "International Cooperation Department"
    },
    "co": {
      "uz": "Ijroçi direktorning ilmiy işlar böyiça örinbosari; Xodimlar bölimi; tegişli kafedra mudiri",
      "ru": "Заместитель исполнительного директора по научной работе; Отдел кадров; Заведующий соответствующей кафедрой",
      "en": "Deputy Executive Director for Research; Human Resources Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Amaliyot/konferentsiya böyiça buyurtmalar; taklifnomalar; sertifikatlar; natijalar haqida hisobot.",
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
      "uz": "Taʼlim dasturini amalga oşiriş uçun amaliy, laboratoriya maşğulotlari va kurs işi (loyiha)ni bajariş uçun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomaşyo materiallari va boşqalarning mavjudligi hamda metodik qöllanma (körsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Uskunalar, asboblar va texnik vositalar uçun texnik pasportlar mavjud; texnik körikdan ötkaziladi va profilaktika işlari (ta’mirlaş, profilaktika) hujjatlaştiriladi**",
      "ru": "Для оборудования, приборов и технических средств имеются технические паспорта; проводятся технические осмотры и документируются профилактические и ремонтные работы**.",
      "en": "Technical passports are available for equipment, instruments and technical devices; technical inspections are carried out and preventive maintenance and repairs are documented**."
    },
    "main": {
      "uz": "Işlar boşqarmasi boşliği",
      "ru": "Начальник управления делами",
      "en": "Head of Administrative Affairs"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; laboratoriya mudirlari va uskunalar uçun mas’ullar",
      "ru": "Заведующий соответствующей кафедрой; заведующие лабораториями и ответственные за оборудование",
      "en": "Head of the relevant department; laboratory heads and equipment officers"
    },
    "evidence": {
      "uz": "Inventarizatsiya hisoboti; texnik pasportlar; tekşiriş hisobotlari; texnik xizmat körsatiş va ta’mirlaş jurnallari.",
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
      "uz": "Taʼlim dasturini amalga oşiriş uçun amaliy, laboratoriya maşğulotlari va kurs işi (loyiha)ni bajariş uçun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomaşyo materiallari va boşqalarning mavjudligi hamda metodik qöllanma (körsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Uslubiy qöllanmalar, öquv va texnologik xaritalar, asbob-uskunalar, qurilmalar va texnik vositalar uçun körsatmalar va foydalaniş körsatmalari, şu jumladan xavfsizlik böyiça körsatmalar mavjud**",
      "ru": "Имеются методические пособия, учебные и технологические карты, инструкции и руководства по эксплуатации оборудования, устройств и технических средств, включая инструкции по безопасности**.",
      "en": "Methodological guides, instructional and technological maps, operating instructions and manuals for equipment, devices and technical resources, including safety instructions, are available**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Işlar boşqarmasi boşliği;; Mehnatni muhofaza qiliş va texnika xavfsizligi böyiça mas’ul",
      "ru": "Начальник управления делами; ответственный по охране труда и технике безопасности",
      "en": "Head of Administrative Affairs; occupational health and safety officer"
    },
    "evidence": {
      "uz": "Körsatmalar; texnologik xaritalar; işlaş qoidalari; brifing jurnallari.",
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
      "uz": "Taʼlim dasturini amalga oşiriş uçun amaliy, laboratoriya maşğulotlari va kurs işi (loyiha)ni bajariş uçun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomaşyo materiallari va boşqalarning mavjudligi hamda metodik qöllanma (körsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Soha mutaxassislari yoki iş beruvçilar bilan birgalikda öqituvçilar va talabalar uçun asbob-uskunalar bilan işlaş böyiça treninglar (mahorat darslari) taşkil etildi**",
      "ru": "Совместно с отраслевыми специалистами или работодателями организованы тренинги (мастер-классы) для преподавателей и студентов по работе с оборудованием**.",
      "en": "Training sessions and master classes on using equipment are organised for academic staff and students jointly with industry experts or employers**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "laboratoriya mudiri (laboratoriya uçun mas’ul xodim); Marketing va talabalar amaliyoti bölimi; iş beruvçilar va soha mutaxassislari",
      "ru": "заведующий лабораторией (ответственный сотрудник); Отдел маркетинга и практики студентов; работодатели и отраслевые специалисты",
      "en": "laboratory head (responsible staff member); Marketing and Student Practice Department; employers and industry experts"
    },
    "evidence": {
      "uz": "Mahorat darslarining rejalari va dasturlari; iştirokçilar röyxati; fotosurat; protokollar/sertifikatlar.",
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
      "uz": "Taʼlim dasturini amalga oşiriş uçun amaliy, laboratoriya maşğulotlari va kurs işi (loyiha)ni bajariş uçun zarur asbob-uskunalar, jihozlar, inventarlar, texnikalar, xomaşyo materiallari va boşqalarning mavjudligi hamda metodik qöllanma (körsatma)lar bilan taʼminlangani",
      "ru": "Наличие оборудования, оснащения, инвентаря, техники, сырья и иных ресурсов для практических и лабораторных занятий и курсовых работ, а также обеспечение методическими руководствами",
      "en": "Availability of equipment, facilities, inventory, machinery, raw materials and other resources for practical and laboratory work and course projects, together with methodological guidance"
    },
    "indicator": {
      "uz": "Amaliy va laboratoriya maşğulotlari uçun öquv xonalarini modernizatsiya qiliş va innovatsion texnologiyalar bilan jihozlaş böyiça yillik reja işlab çiqildi**",
      "ru": "Разработан ежегодный план модернизации учебных помещений для практических и лабораторных занятий и их оснащения инновационными технологиями**.",
      "en": "An annual plan has been developed to modernise classrooms for practical and laboratory activities and equip them with innovative technologies**."
    },
    "main": {
      "uz": "Işlar boşqarmasi boşliği",
      "ru": "Начальник управления делами",
      "en": "Head of Administrative Affairs"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; Reja-moliya bölimi; öquv-uslubiy bölim",
      "ru": "Заведующий соответствующей кафедрой; Планово-финансовый отдел; Учебно-методический отдел",
      "en": "Head of the relevant department; Planning and Finance Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Yillik laboratoriyani modernizatsiya qiliş rejasi; taxminlar; xaridlar; kiritiş aktlari; fotografik yozuv.",
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
      "uz": "Fanlar kesimida öquv va öquv-metodik adabiyotlar, elektron taʼlim resurslari bilan belgilangan talablarga muvofiq taʼminlangani",
      "ru": "Обеспечение по дисциплинам учебной и учебно-методической литературой и электронными образовательными ресурсами в соответствии с требованиями",
      "en": "Provision of teaching and methodological literature and electronic learning resources for each course in accordance with requirements"
    },
    "indicator": {
      "uz": "Öqituvçilar va talabalar uçun elektron resurslardan uzluksiz foydalaniş imkoniyati ta’minlangan**",
      "ru": "Для преподавателей и студентов обеспечен непрерывный доступ к электронным ресурсам**.",
      "en": "Continuous access to electronic resources is provided for academic staff and students**."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Raqamli va axborot texnologiyalari bölimi; tegişli kafedra mudiri",
      "ru": "Отдел цифровых и информационных технологий; Заведующий соответствующей кафедрой",
      "en": "Digital and Information Technologies Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Elektron ma’lumotlar bazalariga kiriş; hisoblar; körsatmalar; foydalaniş statistikasi.",
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
      "uz": "Fanlar kesimida öquv va öquv-metodik adabiyotlar, elektron taʼlim resurslari bilan belgilangan talablarga muvofiq taʼminlangani",
      "ru": "Обеспечение по дисциплинам учебной и учебно-методической литературой и электронными образовательными ресурсами в соответствии с требованиями",
      "en": "Provision of teaching and methodological literature and electronic learning resources for each course in accordance with requirements"
    },
    "indicator": {
      "uz": "Öquv adabiyotlari va öquv qöllanmalari doimiy ravişda yangilanib, zamonaviy fanlar (modullar) mazmuniga hamda fan-texnika taraqqiyoti tendentsiyalariga muvofiqlaştirilmoqda**",
      "ru": "Учебная литература и пособия постоянно обновляются и приводятся в соответствие с современным содержанием дисциплин (модулей) и тенденциями научно-технического прогресса**.",
      "en": "Educational literature and teaching aids are continuously updated and aligned with current course/module content and trends in scientific and technological development**."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; öquv-uslubiy bölim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Sotib oliş rejasi; qabul qiliş dalolatnomalari; yangilangan ma'lumotnomalar röyxati.",
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
      "uz": "Fanlar kesimida öquv va öquv-metodik adabiyotlar, elektron taʼlim resurslari bilan belgilangan talablarga muvofiq taʼminlangani",
      "ru": "Обеспечение по дисциплинам учебной и учебно-методической литературой и электронными образовательными ресурсами в соответствии с требованиями",
      "en": "Provision of teaching and methodological literature and electronic learning resources for each course in accordance with requirements"
    },
    "indicator": {
      "uz": "Fan (modul) mazmuniga mos keladigan zamonaviy xorijiy adabiyotlardan foydalaniladi**",
      "ru": "Используется современная зарубежная литература, соответствующая содержанию дисциплины (модуля)**.",
      "en": "Modern international literature relevant to course/module content is used**."
    },
    "main": {
      "uz": "Tegişli kafedra mudiri",
      "ru": "Заведующий соответствующей кафедрой",
      "en": "Head of the relevant department"
    },
    "co": {
      "uz": "Axborot-resurs markazi (kutubxona); professor-öqituvçilar",
      "ru": "Информационно-ресурсный центр (библиотека); профессорско-преподавательский состав",
      "en": "Information Resource Centre (Library); academic staff"
    },
    "evidence": {
      "uz": "Zamonaviy xorijiy adabiyotlar röyxati; öquv dasturlari; elektron ma’lumotlar bazalari.",
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
      "uz": "Öquv va laboratoriya xonalari hamda ustaxona (poligon)larning talabalar sonidan kelib çiqib, taʼlim dasturlariga mos jihozlar va axborot-kommunikatsiya vositalari bilan taʼminlangani hamda xavfsizlik qoidalariga rioya qilingani",
      "ru": "Оснащение учебных и лабораторных помещений и мастерских оборудованием и ИКТ в соответствии с образовательными программами и числом студентов, соблюдение требований безопасности",
      "en": "Provision of classrooms, laboratories and workshops with programme-appropriate equipment and ICT based on student numbers, with compliance with safety requirements"
    },
    "indicator": {
      "uz": "Oliy taʼlim taşkiloti talabalar sonidan kelib çiqqan holda öquv xonalari bilan taʼminlanadi*",
      "ru": "Организация высшего образования обеспечена учебными аудиториями исходя из численности студентов*.",
      "en": "The higher education institution provides sufficient classrooms based on the number of students*."
    },
    "main": {
      "uz": "Işlar boşqarmasi boşliği",
      "ru": "Начальник управления делами",
      "en": "Head of Administrative Affairs"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; dekanatlar; tegişli kafedra mudiri",
      "ru": "Учебно-методический отдел; деканаты; Заведующий соответствующей кафедрой",
      "en": "Academic and Methodological Department; dean’s offices; Head of the relevant department"
    },
    "evidence": {
      "uz": "Tomoşabinlar pasportlari; xavfsizlikni hisoblaş; jadval; fotosurat; inventarizatsiya ma'lumotlari.",
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
      "uz": "Inklyuziv taʼlim oliş uçun binolar va jihozlarning moslaştirilgani, maxsus öquv materiallarining mavjudligi, axborot-kommunikatsiya vositalaridan (bundan buyon matnda AKT deb yuritiladi) foydalaniş imkoniyati yaratilgani",
      "ru": "Адаптация зданий и оборудования для инклюзивного образования, наличие специальных учебных материалов и доступ к ИКТ",
      "en": "Adaptation of buildings and equipment for inclusive education, availability of special learning materials and access to ICT"
    },
    "indicator": {
      "uz": "Ta’lim jarayonida inklyuziv ta'limni pedagogik va psixologik qöllab-quvvatlaş tizimi mavjud**",
      "ru": "В образовательном процессе действует система педагогической и психологической поддержки инклюзивного образования**.",
      "en": "A system of pedagogical and psychological support for inclusive education is available within the educational process**."
    },
    "main": {
      "uz": "Ijroçi direktorning yoşlar bilan işlaş böyiça örinbosari",
      "ru": "Заместитель исполнительного директора по работе с молодежью",
      "en": "Deputy Executive Director for Youth Affairs"
    },
    "co": {
      "uz": "Psixolog; Işlar boşqarmasi; öquv-uslubiy bölim",
      "ru": "Психолог; Управление делами; Учебно-методический отдел",
      "en": "Psychologist; Administrative Affairs Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Qöllab-quvvatlaşning pozitsiyasi va tartibi; qulay muhit; maslahatlaşuvlar; moslaştiriş materiallari.",
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
      "uz": "Inklyuziv taʼlim oliş uçun binolar va jihozlarning moslaştirilgani, maxsus öquv materiallarining mavjudligi, axborot-kommunikatsiya vositalaridan (bundan buyon matnda AKT deb yuritiladi) foydalaniş imkoniyati yaratilgani",
      "ru": "Адаптация зданий и оборудования для инклюзивного образования, наличие специальных учебных материалов и доступ к ИКТ",
      "en": "Adaptation of buildings and equipment for inclusive education, availability of special learning materials and access to ICT"
    },
    "indicator": {
      "uz": "Inklyuziv ta’lim metodologiyasi böyiça malaka oşirgan va zarur könikmalarga ega bölgan öqituvçi (öqituvçilar) va (yoki) psixolog mavjud**",
      "ru": "Имеется преподаватель (преподаватели) и/или психолог, прошедшие повышение квалификации по методологии инклюзивного образования и обладающие необходимыми навыками**.",
      "en": "There is at least one teacher and/or psychologist who has completed professional development in inclusive education methodology and possesses the necessary skills**."
    },
    "main": {
      "uz": "Xodimlar bölimi",
      "ru": "Отдел кадров",
      "en": "Human Resources Department"
    },
    "co": {
      "uz": "Yoşlar bilan işlaş bölimi; öquv-uslubiy bölim; psixolog",
      "ru": "Отдел по работе с молодежью; Учебно-методический отдел; psixolog",
      "en": "Youth Affairs Department; Academic and Methodological Department; psixolog"
    },
    "evidence": {
      "uz": "Inklyuziv ta’lim böyiça öqituvçilar va psixologlarning tayyorgarligi / malakasi töğrisidagi hujjatlar.",
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
      "uz": "Inklyuziv taʼlim oliş uçun binolar va jihozlarning moslaştirilgani, maxsus öquv materiallarining mavjudligi, axborot-kommunikatsiya vositalaridan (bundan buyon matnda AKT deb yuritiladi) foydalaniş imkoniyati yaratilgani",
      "ru": "Адаптация зданий и оборудования для инклюзивного образования, наличие специальных учебных материалов и доступ к ИКТ",
      "en": "Adaptation of buildings and equipment for inclusive education, availability of special learning materials and access to ICT"
    },
    "indicator": {
      "uz": "Inklyuziv ta’lim şartlarining amalda qöllanilişi va samaradorligi nazorat qilinadi**",
      "ru": "Контролируются фактическое применение и эффективность условий инклюзивного образования**.",
      "en": "The practical implementation and effectiveness of inclusive education conditions are monitored**."
    },
    "main": {
      "uz": "Ta’lim sifatini nazorat qiliş bölimi",
      "ru": "Отдел контроля качества образования",
      "en": "Education Quality Control Department"
    },
    "co": {
      "uz": "Yoşlar bilan işlaş bölimi; Işlar boşqarmasi; psixolog",
      "ru": "Отдел по работе с молодежью; Управление делами; psixolog",
      "en": "Youth Affairs Department; Administrative Affairs Department; psixolog"
    },
    "evidence": {
      "uz": "Inklyuziv şartlarning mavjudligi va samaradorligini monitoring qiliş; sörovlar; takomillaştiriş rejasi.",
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
      "uz": "Axborot-resurs markazining (kutubxonaning) taʼlim dasturlariga mos öquv adabiyotlari, kompyuterlar bilan taʼminlangani, öquv zali va elektron kutubxonaning mavjudligi",
      "ru": "Обеспечение информационно-ресурсного центра (библиотеки) учебной литературой и компьютерами в соответствии с программами, наличие читального зала и электронной библиотеки",
      "en": "Provision of the information resource centre (library) with programme-relevant literature and computers, and availability of a reading room and electronic library"
    },
    "indicator": {
      "uz": "Axborot-resurs markazi (kutubxona) öquv dasturiga muvofiq darsliklar, öquv qöllanmalari, adabiyotlar va badiiy adabiyotlarga ega*",
      "ru": "Информационно-ресурсный центр (библиотека) располагает учебниками, учебными пособиями, профильной и художественной литературой в соответствии с образовательной программой*.",
      "en": "The information resource centre (library) has textbooks, teaching aids, specialist literature and fiction aligned with the educational programme*."
    },
    "main": {
      "uz": "Axborot-resurs markazi (kutubxona)",
      "ru": "Информационно-ресурсный центр (библиотека)",
      "en": "Information Resource Centre (Library)"
    },
    "co": {
      "uz": "Tegişli kafedra mudiri; öquv-uslubiy bölim",
      "ru": "Заведующий соответствующей кафедрой; Учебно-методический отдел",
      "en": "Head of the relevant department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "Dastur uçun adabiyotlar katalogi/reestri; fanlar bilan ta’minlaş; elektron katalog.",
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
      "uz": "Axborot-resurs markazining (kutubxonaning) taʼlim dasturlariga mos öquv adabiyotlari, kompyuterlar bilan taʼminlangani, öquv zali va elektron kutubxonaning mavjudligi",
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
      "uz": "Reja-moliya bölimi; tegişli kafedra mudiri",
      "ru": "Планово-финансовый отдел; Заведующий соответствующей кафедрой",
      "en": "Planning and Finance Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Jamğarmani sotib oliş rejasi va hisobotlari; xaridlar / kvitansiyalar; hisobdan çiqariş va yangilanişlar.",
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
      "uz": "Muntazam ravişda veb-seminarlar va onlayn seminarlar taşkil etiladi**",
      "ru": "Регулярно организуются вебинары и онлайн-семинары**.",
      "en": "Webinars and online seminars are regularly organised**."
    },
    "main": {
      "uz": "Öquv-uslubiy bölim",
      "ru": "Учебно-методический отдел",
      "en": "Academic and Methodological Department"
    },
    "co": {
      "uz": "Raqamli va axborot texnologiyalari bölimi; tegişli kafedra mudiri",
      "ru": "Отдел цифровых и информационных технологий; Заведующий соответствующей кафедрой",
      "en": "Digital and Information Technologies Department; Head of the relevant department"
    },
    "evidence": {
      "uz": "Vebinar jadvali; havolalar/yozuvlar; iştirokçilar röyxati; hisobotlar.",
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
      "uz": "Ta’lim jarayonini boşqariş axborot tizimi HEMIS va (yoki) LMS (ta’limni boşqariş tizimi) orqali talabalar, professor-öqituvçilar va ma’muriyat örtasida özaro aloqa kanali yaratildi**",
      "ru": "Через информационную систему управления образовательным процессом HEMIS и/или LMS создан канал взаимодействия между студентами, профессорско-преподавательским составом и администрацией**.",
      "en": "HEMIS and/or an LMS is used to provide an interaction channel between students, academic staff and administration**."
    },
    "main": {
      "uz": "Registrator ofisi",
      "ru": "Офис регистратора",
      "en": "Registrar’s Office"
    },
    "co": {
      "uz": "Raqamli va axborot texnologiyalari bölimi; öquv-uslubiy bölim",
      "ru": "Отдел цифровых и информационных технологий; Учебно-методический отдел",
      "en": "Digital and Information Technologies Department; Academic and Methodological Department"
    },
    "evidence": {
      "uz": "HEMIS / LMS sozlamalari; körsatmalar; skrinşotlar; jurnallar/aloqa kanallaridan foydalaniş statistikasi.",
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
      "uz": "Elektron ta’lim resurslaridan foydalaniş böyiça texnik yordam xizmati mavjud**",
      "ru": "Действует служба технической поддержки по использованию электронных образовательных ресурсов**.",
      "en": "A technical support service is available for the use of electronic educational resources**."
    },
    "main": {
      "uz": "Raqamli va axborot texnologiyalari bölimi",
      "ru": "Отдел цифровых и информационных технологий",
      "en": "Digital and Information Technologies Department"
    },
    "co": {
      "uz": "Öquv-uslubiy bölim; registrator ofisi; axborot-resurs markazi",
      "ru": "Учебно-методический отдел; registrator ofisi; axborot-resurs markazi",
      "en": "Academic and Methodological Department; registrator ofisi; axborot-resurs markazi"
    },
    "evidence": {
      "uz": "Texnik qöllab-quvvatlaş qoidalari; kontaktlar; qönğiroqlar jurnali; körsatmalar/FAQ.",
      "ru": "Правила технической поддержки; контакты; журнал обращений; инструкции/FAQ.",
      "en": "Technical-support rules; contacts; support-request log; instructions/FAQ."
    }
  }
];
