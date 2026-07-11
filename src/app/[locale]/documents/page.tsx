import { getDocuments } from "@/services/documents.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

const labels = {
  ru: {
    label: "Документы",
    title: "Документы отдела",
    description:
      "Нормативные документы, положения, методические материалы и иные документы внутренней системы обеспечения качества образования.",

    heroCardLabel: "Нормативная база",
    heroCardTitle: "Основные категории документов",
    heroCardItems: [
      "Положения и регламенты",
      "Материалы по аккредитации",
      "Аналитические документы",
      "Методические материалы",
    ],
    heroStatus: "Документы регулярно обновляются",

    documentsCount: "Количество документов",

    sectionLabel: "Электронный архив",
    sectionTitle: "Актуальные документы",
    sectionDescription:
      "Ознакомьтесь с действующими положениями, нормативными материалами и документами отдела контроля качества образования.",

    defaultCategory: "Документы",
    file: "Файл",
    fileSize: "Размер",
    open: "Открыть",
    download: "Скачать",
    empty: "Документы пока не добавлены",
  },

  uz: {
    label: "Hujjatlar",
    title: "Bo‘lim hujjatlari",
    description:
      "Ta’lim sifatini ichki ta’minlash tizimiga oid me’yoriy hujjatlar, nizomlar, uslubiy materiallar va boshqa hujjatlar.",

    heroCardLabel: "Me’yoriy baza",
    heroCardTitle: "Hujjatlarning asosiy toifalari",
    heroCardItems: [
      "Nizomlar va reglamentlar",
      "Akkreditatsiya materiallari",
      "Tahliliy hujjatlar",
      "Uslubiy materiallar",
    ],
    heroStatus: "Hujjatlar muntazam yangilanadi",

    documentsCount: "Hujjatlar soni",

    sectionLabel: "Elektron arxiv",
    sectionTitle: "Dolzarb hujjatlar",
    sectionDescription:
      "Ta’lim sifatini nazorat qilish bo‘limining amaldagi nizomlari, me’yoriy materiallari va hujjatlari bilan tanishing.",

    defaultCategory: "Hujjatlar",
    file: "Fayl",
    fileSize: "Hajmi",
    open: "Ochish",
    download: "Yuklab olish",
    empty: "Hozircha hujjatlar qo‘shilmagan",
  },

  en: {
    label: "Documents",
    title: "Department documents",
    description:
      "Regulations, policies, methodological materials and other documents of the internal education quality assurance system.",

    heroCardLabel: "Regulatory framework",
    heroCardTitle: "Main document categories",
    heroCardItems: [
      "Policies and regulations",
      "Accreditation materials",
      "Analytical documents",
      "Methodological materials",
    ],
    heroStatus: "Documents are regularly updated",

    documentsCount: "Number of documents",

    sectionLabel: "Electronic archive",
    sectionTitle: "Current documents",
    sectionDescription:
      "Review the current policies, regulatory materials and documents of the Education Quality Control Department.",

    defaultCategory: "Documents",
    file: "File",
    fileSize: "Size",
    open: "Open",
    download: "Download",
    empty: "No documents have been added yet",
  },
};

function formatFileSize(size?: number | null) {
  if (!size) return "—";

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function getFileType(fileName?: string) {
  const extension = fileName?.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    return {
      extension: "PDF",
      iconClass: "bg-red-50 text-red-600",
      badgeClass: "bg-red-50 text-red-700",
    };
  }

  if (extension === "doc" || extension === "docx") {
    return {
      extension: extension.toUpperCase(),
      iconClass: "bg-blue-50 text-blue-700",
      badgeClass: "bg-blue-50 text-blue-700",
    };
  }

  if (extension === "xls" || extension === "xlsx") {
    return {
      extension: extension.toUpperCase(),
      iconClass: "bg-emerald-50 text-emerald-700",
      badgeClass: "bg-emerald-50 text-emerald-700",
    };
  }

  if (extension === "ppt" || extension === "pptx") {
    return {
      extension: extension.toUpperCase(),
      iconClass: "bg-orange-50 text-orange-700",
      badgeClass: "bg-orange-50 text-orange-700",
    };
  }

  return {
    extension: extension?.toUpperCase() || "FILE",
    iconClass: "bg-slate-100 text-slate-600",
    badgeClass: "bg-slate-100 text-slate-600",
  };
}

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];
  const documents = await getDocuments();

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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,29,59,0.98)_0%,rgba(5,48,91,0.94)_45%,rgba(6,77,105,0.64)_100%)]" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031326]/90 via-transparent to-[#061b33]/20" />

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

              {t.label}
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
              {t.title}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-blue-50/90 sm:text-lg">
              {t.description}
            </p>

            <div className="mt-10 inline-flex items-center gap-5 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M6 2h8l4 4v16H6V2Z" />
                  <path d="M14 2v5h5M9 13h6M9 17h4" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                  {t.documentsCount}
                </p>

                <p className="mt-1 text-3xl font-black">{documents.length}</p>
              </div>
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
                      {t.heroCardLabel}
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold">
                      {t.heroCardTitle}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M6 2h8l4 4v16H6V2Z" />
                      <path d="M14 2v5h5M9 13h6M9 17h6" />
                    </svg>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {t.heroCardItems.map((item) => (
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

                  {t.heroStatus}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f9fc] to-transparent" />
      </section>

      {/* Заголовок документов */}
      <section className="container-main pb-8 pt-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-700">
              {t.sectionLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.sectionTitle}
            </h2>
          </div>

          <p className="max-w-2xl leading-8 text-slate-600 lg:justify-self-end">
            {t.sectionDescription}
          </p>
        </div>
      </section>

      {/* Список документов */}
      <section className="container-main pb-24 pt-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((doc: any) => {
            const title = getLocalizedText(
              currentLocale,
              doc.title_ru,
              doc.title_uz,
              doc.title_en
            );

            const description = getLocalizedText(
              currentLocale,
              doc.description_ru,
              doc.description_uz,
              doc.description_en
            );

            const fileType = getFileType(doc.file_name);

            return (
              <article
                key={doc.id}
                className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_26px_70px_rgba(15,23,42,0.13)]"
              >
                {/* Превью документа */}
                <div className="relative flex h-[285px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  {doc.preview_url ? (
                    <img
                      src={doc.preview_url}
                      alt={title}
                      className="h-full w-full object-contain object-top p-5 transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div
                      className={`flex h-24 w-24 items-center justify-center rounded-[28px] shadow-sm ${fileType.iconClass}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-12 w-12"
                      >
                        <path d="M6 2h8l4 4v16H6V2Z" />
                        <path d="M14 2v5h5M9 13h6M9 17h4" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute left-5 top-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider ${fileType.badgeClass}`}
                    >
                      {fileType.extension}
                    </span>
                  </div>

                  <div className="absolute bottom-5 right-5">
                    <span className="inline-flex rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm backdrop-blur">
                      {doc.category || t.defaultCategory}
                    </span>
                  </div>
                </div>

                {/* Содержание */}
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="line-clamp-3 text-xl font-black leading-snug text-slate-950">
                    {title}
                  </h2>

                  {description && (
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                      {description}
                    </p>
                  )}

                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {doc.file_name && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M6 2h8l4 4v16H6V2Z" />
                            <path d="M14 2v5h5" />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            {t.file}
                          </p>

                          <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                            {doc.file_name}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M4 18h16M6 15V5h12v10" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          {t.fileSize}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {formatFileSize(doc.file_size)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Кнопки */}
                  <div className="mt-auto grid grid-cols-2 gap-3 pt-7">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5"
                      >
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>

                      {t.open}
                    </a>

                    <a
                      href={doc.file_url}
                      download={doc.file_name || true}
                      className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-700/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-5 w-5"
                      >
                        <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                      </svg>

                      {t.download}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          {documents.length === 0 && (
            <div className="col-span-full rounded-[32px] border border-slate-200 bg-white p-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M6 2h8l4 4v16H6V2Z" />
                  <path d="M14 2v5h5M9 13h6M9 17h4" />
                </svg>
              </div>

              <p className="mt-5 text-slate-500">{t.empty}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}