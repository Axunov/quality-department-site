import { Link } from "@/i18n/routing";

const labels = {
  ru: {
    badge: "О подразделении",
    title: "Отдел контроля качества образования",
    description:
      "Структурное подразделение института, обеспечивающее функционирование внутренней системы качества, мониторинг образовательного процесса и сопровождение аккредитационных процедур.",

    missionLabel: "Наша миссия",
    missionTitle: "Формирование устойчивой культуры качества",
    missionText:
      "Миссия отдела заключается в создании прозрачной, объективной и современной системы внутреннего обеспечения качества образования, ориентированной на постоянное развитие института.",

    goalLabel: "Цель деятельности",
    goalTitle: "Постоянное совершенствование образовательного процесса",
    goalText:
      "Повышение качества образования на основе системного мониторинга, анализа результатов, изучения обратной связи и разработки обоснованных управленческих решений.",

    principlesLabel: "Принципы работы",
    principlesTitle: "Подходы, на которых строится деятельность отдела",
    transparency: "Прозрачность",
    transparencyDesc:
      "Открытость процедур оценки и доступность информации о результатах работы.",
    objectivity: "Объективность",
    objectivityDesc:
      "Принятие решений на основе фактических данных, анализа и подтверждённых результатов.",
    continuous: "Непрерывность",
    continuousDesc:
      "Постоянный мониторинг и последовательное совершенствование образовательных процессов.",
    participation: "Вовлечённость",
    participationDesc:
      "Участие студентов, преподавателей, работодателей и других заинтересованных сторон.",

    tasksLabel: "Функциональные направления",
    tasksTitle: "Основные задачи отдела",
    tasksDescription:
      "Работа отдела охватывает ключевые процессы внутреннего контроля, анализа и обеспечения качества образования.",

    tasks: [
      {
        title: "Мониторинг качества",
        description:
          "Систематическое изучение состояния образовательного процесса и качества реализации учебных программ.",
      },
      {
        title: "Анализ успеваемости",
        description:
          "Анализ посещаемости, академической успеваемости и результатов обучения студентов.",
      },
      {
        title: "Аккредитация",
        description:
          "Подготовка института и образовательных программ к государственной и международной аккредитации.",
      },
      {
        title: "Обратная связь",
        description:
          "Организация опросов студентов, преподавателей, работодателей и выпускников.",
      },
      {
        title: "Аналитическая работа",
        description:
          "Подготовка аналитических отчётов, справок, рекомендаций и предложений для руководства.",
      },
      {
        title: "Контроль исполнения",
        description:
          "Мониторинг реализации решений и мероприятий, направленных на повышение качества образования.",
      },
    ],

    processLabel: "Система работы",
    processTitle: "Как осуществляется контроль качества",
    processDescription:
      "Деятельность отдела выстроена как непрерывный цикл анализа, принятия решений и оценки достигнутых результатов.",

    stages: [
      {
        number: "01",
        title: "Сбор данных",
        description:
          "Получение информации из образовательных систем, отчётов, наблюдений и опросов.",
      },
      {
        number: "02",
        title: "Анализ",
        description:
          "Систематизация показателей, выявление проблем, рисков и положительной динамики.",
      },
      {
        number: "03",
        title: "Рекомендации",
        description:
          "Подготовка обоснованных предложений по устранению недостатков и развитию процессов.",
      },
      {
        number: "04",
        title: "Контроль результатов",
        description:
          "Повторная оценка эффективности принятых решений и реализованных мероприятий.",
      },
    ],

    ctaTitle: "Документы внутренней системы качества",
    ctaDescription:
      "Ознакомьтесь с положениями, нормативными материалами и документами отдела.",
    ctaButton: "Перейти к документам",
  },

  uz: {
    badge: "Bo‘lim haqida",
    title: "Ta’lim sifatini nazorat qilish bo‘limi",
    description:
      "Institutning ichki sifat tizimi faoliyatini ta’minlovchi, ta’lim jarayonini monitoring qiluvchi va akkreditatsiya jarayonlarini muvofiqlashtiruvchi tarkibiy bo‘linma.",

    missionLabel: "Bizning missiyamiz",
    missionTitle: "Barqaror sifat madaniyatini shakllantirish",
    missionText:
      "Bo‘limning missiyasi institutni muntazam rivojlantirishga qaratilgan shaffof, xolis va zamonaviy ichki sifatni ta’minlash tizimini yaratishdan iborat.",

    goalLabel: "Faoliyat maqsadi",
    goalTitle: "Ta’lim jarayonini muntazam takomillashtirish",
    goalText:
      "Tizimli monitoring, natijalarni tahlil qilish, qayta aloqani o‘rganish va asoslangan boshqaruv qarorlarini ishlab chiqish orqali ta’lim sifatini oshirish.",

    principlesLabel: "Ish tamoyillari",
    principlesTitle: "Bo‘lim faoliyati asoslanadigan yondashuvlar",
    transparency: "Shaffoflik",
    transparencyDesc:
      "Baholash jarayonlarining ochiqligi va ish natijalari haqidagi ma’lumotlarning mavjudligi.",
    objectivity: "Xolislik",
    objectivityDesc:
      "Qarorlarni aniq ma’lumotlar, tahlil va tasdiqlangan natijalar asosida qabul qilish.",
    continuous: "Uzluksizlik",
    continuousDesc:
      "Ta’lim jarayonlarini doimiy monitoring qilish va izchil takomillashtirish.",
    participation: "Ishtirok",
    participationDesc:
      "Talabalar, o‘qituvchilar, ish beruvchilar va boshqa manfaatdor tomonlarning ishtiroki.",

    tasksLabel: "Funksional yo‘nalishlar",
    tasksTitle: "Bo‘limning asosiy vazifalari",
    tasksDescription:
      "Bo‘lim faoliyati ta’lim sifatini ichki nazorat qilish, tahlil etish va ta’minlashning asosiy jarayonlarini qamrab oladi.",

    tasks: [
      {
        title: "Sifat monitoringi",
        description:
          "Ta’lim jarayoni holati va o‘quv dasturlarining amalga oshirilish sifatini tizimli o‘rganish.",
      },
      {
        title: "O‘zlashtirish tahlili",
        description:
          "Talabalarning davomati, akademik o‘zlashtirishi va ta’lim natijalarini tahlil qilish.",
      },
      {
        title: "Akkreditatsiya",
        description:
          "Institut va ta’lim dasturlarini davlat hamda xalqaro akkreditatsiyaga tayyorlash.",
      },
      {
        title: "Qayta aloqa",
        description:
          "Talabalar, o‘qituvchilar, ish beruvchilar va bitiruvchilar o‘rtasida so‘rovlar o‘tkazish.",
      },
      {
        title: "Tahliliy faoliyat",
        description:
          "Rahbariyat uchun tahliliy hisobotlar, ma’lumotnomalar, tavsiyalar va takliflar tayyorlash.",
      },
      {
        title: "Ijro nazorati",
        description:
          "Ta’lim sifatini oshirishga qaratilgan qarorlar va tadbirlar ijrosini monitoring qilish.",
      },
    ],

    processLabel: "Ish tizimi",
    processTitle: "Ta’lim sifati qanday nazorat qilinadi",
    processDescription:
      "Bo‘lim faoliyati tahlil qilish, qaror qabul qilish va erishilgan natijalarni baholashning uzluksiz sikli asosida tashkil etilgan.",

    stages: [
      {
        number: "01",
        title: "Ma’lumotlarni yig‘ish",
        description:
          "Axborot tizimlari, hisobotlar, kuzatuvlar va so‘rovlar orqali ma’lumot olish.",
      },
      {
        number: "02",
        title: "Tahlil",
        description:
          "Ko‘rsatkichlarni tizimlashtirish, muammolar, xavflar va ijobiy natijalarni aniqlash.",
      },
      {
        number: "03",
        title: "Tavsiyalar",
        description:
          "Kamchiliklarni bartaraf etish va jarayonlarni rivojlantirish bo‘yicha asoslangan takliflar tayyorlash.",
      },
      {
        number: "04",
        title: "Natijalarni nazorat qilish",
        description:
          "Qabul qilingan qarorlar va amalga oshirilgan tadbirlarning samaradorligini qayta baholash.",
      },
    ],

    ctaTitle: "Ichki sifat tizimi hujjatlari",
    ctaDescription:
      "Bo‘lim nizomlari, me’yoriy materiallari va hujjatlari bilan tanishing.",
    ctaButton: "Hujjatlarga o‘tish",
  },

  en: {
    badge: "About the department",
    title: "Education Quality Control Department",
    description:
      "A structural unit responsible for the internal quality assurance system, monitoring of the educational process and coordination of accreditation procedures.",

    missionLabel: "Our mission",
    missionTitle: "Building a sustainable culture of quality",
    missionText:
      "The department’s mission is to develop a transparent, objective and modern internal quality assurance system focused on the continuous development of the institute.",

    goalLabel: "Purpose",
    goalTitle: "Continuous improvement of the educational process",
    goalText:
      "Improving education quality through systematic monitoring, analysis of results, stakeholder feedback and evidence-based management decisions.",

    principlesLabel: "Working principles",
    principlesTitle: "Approaches underlying the department’s activities",
    transparency: "Transparency",
    transparencyDesc:
      "Openness of evaluation procedures and accessibility of information about performance results.",
    objectivity: "Objectivity",
    objectivityDesc:
      "Decision-making based on reliable data, analysis and verified results.",
    continuous: "Continuity",
    continuousDesc:
      "Continuous monitoring and systematic improvement of educational processes.",
    participation: "Participation",
    participationDesc:
      "Engagement of students, teachers, employers and other interested parties.",

    tasksLabel: "Functional areas",
    tasksTitle: "Core responsibilities",
    tasksDescription:
      "The department covers the key processes of internal control, analysis and quality assurance in education.",

    tasks: [
      {
        title: "Quality monitoring",
        description:
          "Systematic assessment of the educational process and the quality of programme delivery.",
      },
      {
        title: "Performance analysis",
        description:
          "Analysis of student attendance, academic performance and learning outcomes.",
      },
      {
        title: "Accreditation",
        description:
          "Preparation of the institute and its educational programmes for national and international accreditation.",
      },
      {
        title: "Feedback",
        description:
          "Organisation of surveys among students, teachers, employers and graduates.",
      },
      {
        title: "Analytical work",
        description:
          "Preparation of analytical reports, references, recommendations and proposals for management.",
      },
      {
        title: "Implementation control",
        description:
          "Monitoring the implementation of decisions and measures aimed at improving education quality.",
      },
    ],

    processLabel: "Work system",
    processTitle: "How education quality is monitored",
    processDescription:
      "The department’s activities follow a continuous cycle of analysis, decision-making and evaluation of achieved results.",

    stages: [
      {
        number: "01",
        title: "Data collection",
        description:
          "Collection of information from educational systems, reports, observations and surveys.",
      },
      {
        number: "02",
        title: "Analysis",
        description:
          "Systematisation of indicators and identification of problems, risks and positive trends.",
      },
      {
        number: "03",
        title: "Recommendations",
        description:
          "Preparation of evidence-based proposals for addressing weaknesses and improving processes.",
      },
      {
        number: "04",
        title: "Result control",
        description:
          "Reassessment of the effectiveness of implemented decisions and measures.",
      },
    ],

    ctaTitle: "Internal quality assurance documents",
    ctaDescription:
      "Review the regulations, reference materials and documents of the department.",
    ctaButton: "View documents",
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const principles = [
    {
      icon: "M12 3 4 7v5c0 4.7 3.4 8.8 8 10 4.6-1.2 8-5.3 8-10V7l-8-4Z",
      title: t.transparency,
      description: t.transparencyDesc,
    },
    {
      icon: "M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z",
      title: t.objectivity,
      description: t.objectivityDesc,
    },
    {
      icon: "M20 12a8 8 0 1 1-2.34-5.66M20 4v6h-6",
      title: t.continuous,
      description: t.continuousDesc,
    },
    {
      icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
      title: t.participation,
      description: t.participationDesc,
    },
  ];

  return (
    <main className="overflow-hidden bg-[#f7f9fc]">
      {/* Главный экран */}
<section
  className="relative isolate min-h-[620px] overflow-hidden bg-[#061b33] text-white"
  style={{
    backgroundImage: "url('/images/institute.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>
  {/* Затемнение фотографии */}
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,29,59,0.98)_0%,rgba(5,48,91,0.94)_45%,rgba(6,77,105,0.64)_100%)]" />

  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031326]/90 via-transparent to-[#061b33]/20" />

  {/* Световые элементы */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.28),transparent_30%)]" />

  <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />

  <div className="absolute -bottom-48 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

  <div className="container-main grid min-h-[620px] items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
    {/* Левая часть */}
    <div className="max-w-4xl">
      <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-xl">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />

          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
        </span>

        {t.badge}
      </div>

      <h1 className="mt-8 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
        {t.title}
      </h1>

      <p className="mt-7 max-w-3xl text-base leading-8 text-blue-50/90 sm:text-lg">
        {t.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/documents"
          className="group inline-flex items-center rounded-2xl bg-white px-7 py-4 font-bold text-[#073b70] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]"
        >
          {t.ctaButton}

          <span className="ml-3 transition group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/employees"
          className="inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          {currentLocale === "ru"
            ? "Сотрудники отдела"
            : currentLocale === "uz"
              ? "Bo‘lim xodimlari"
              : "Department staff"}
        </Link>
      </div>
    </div>

    {/* Правая карточка */}
    <div className="hidden lg:block">
      <div className="relative ml-auto max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-white/[0.11] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                {currentLocale === "ru"
                  ? "Внутренняя система качества"
                  : currentLocale === "uz"
                    ? "Ichki sifat tizimi"
                    : "Internal quality system"}
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                {currentLocale === "ru"
                  ? "Основные направления работы"
                  : currentLocale === "uz"
                    ? "Asosiy faoliyat yo‘nalishlari"
                    : "Key areas of activity"}
              </h2>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <path d="M12 3 4.5 6v5.2c0 4.6 3.2 8.8 7.5 9.8 4.3-1 7.5-5.2 7.5-9.8V6L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              currentLocale === "ru"
                ? "Мониторинг качества образования"
                : currentLocale === "uz"
                  ? "Ta’lim sifati monitoringi"
                  : "Education quality monitoring",

              currentLocale === "ru"
                ? "Подготовка к аккредитации"
                : currentLocale === "uz"
                  ? "Akkreditatsiyaga tayyorgarlik"
                  : "Accreditation preparation",

              currentLocale === "ru"
                ? "Аналитика и обратная связь"
                : currentLocale === "uz"
                  ? "Tahlil va qayta aloqa"
                  : "Analytics and feedback",

              currentLocale === "ru"
                ? "Совершенствование процессов"
                : currentLocale === "uz"
                  ? "Jarayonlarni takomillashtirish"
                  : "Process improvement",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                  ✓
                </span>

                <span className="font-semibold text-blue-50">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />

            {currentLocale === "ru"
              ? "Непрерывное обеспечение качества"
              : currentLocale === "uz"
                ? "Sifatni uzluksiz ta’minlash"
                : "Continuous quality assurance"}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Плавный переход к следующему блоку */}
  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f9fc] to-transparent" />
</section>

      {/* Mission and goal */}
      <section className="container-main relative z-10 -mt-8 pb-24">
        <div className="grid gap-7 lg:grid-cols-2">
          <article className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
              >
                <path d="M12 3 4 7v5c0 4.7 3.4 8.8 8 10 4.6-1.2 8-5.3 8-10V7l-8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
              {t.missionLabel}
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
              {t.missionTitle}
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              {t.missionText}
            </p>
          </article>

          <article className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
              {t.goalLabel}
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
              {t.goalTitle}
            </h2>

            <p className="mt-5 leading-8 text-slate-600">{t.goalText}</p>
          </article>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-24">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-700">
              {t.principlesLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.principlesTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="group rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm transition group-hover:bg-blue-700 group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d={principle.icon} />
                  </svg>
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                  {principle.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks */}
      <section className="container-main py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-700">
              {t.tasksLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.tasksTitle}
            </h2>
          </div>

          <p className="max-w-2xl leading-8 text-slate-600 lg:justify-self-end">
            {t.tasksDescription}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.tasks.map((task, index) => (
            <article
              key={task.title}
              className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-8 shadow-[0_14px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="absolute right-5 top-3 text-6xl font-black text-slate-100 transition group-hover:text-blue-50">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b4b8f] to-[#0b7b88] font-black text-white shadow-lg">
                  ✓
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                  {task.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {task.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#061b33] py-24 text-white">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-300">
              {t.processLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              {t.processTitle}
            </h2>

            <p className="mt-5 leading-8 text-blue-50/75">
              {t.processDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.stages.map((stage) => (
              <article
                key={stage.number}
                className="rounded-[28px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.10]"
              >
                <span className="text-sm font-black tracking-[0.18em] text-cyan-300">
                  {stage.number}
                </span>

                <h3 className="mt-5 text-xl font-extrabold">
                  {stage.title}
                </h3>

                <p className="mt-4 leading-7 text-blue-50/70">
                  {stage.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-main py-24">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-[#0b4b8f] to-[#087d83] px-8 py-12 text-white shadow-[0_24px_70px_rgba(11,75,143,0.22)] sm:px-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {t.ctaTitle}
              </h2>

              <p className="mt-4 leading-7 text-blue-50/85">
                {t.ctaDescription}
              </p>
            </div>

            <Link
              href="/documents"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-7 py-4 font-extrabold text-[#0b4b8f] shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {t.ctaButton}
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}