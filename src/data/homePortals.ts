export type HomeLocale = "ru" | "uz" | "en";

export function homeLocale(locale: string): HomeLocale {
  return locale === "uz" || locale === "en" ? locale : "ru";
}

export const presidentCopy = {
  ru: {
    label: "Образование — основа развития",
    quote: "Повышение качества образования – единственно правильный путь развития Нового Узбекистана.",
    name: "Шавкат Мирзиёев",
    role: "Президент Республики Узбекистан",
    source: "Послание Олий Мажлису и народу Узбекистана",
    date: "20 декабря 2022 года",
    href: "https://president.uz/ru/lists/view/5774",
  },
  uz: {
    label: "Ta’lim — taraqqiyot asosi",
    quote: "Ta’lim sifatini oshirish – Yangi O‘zbekiston taraqqiyotining yakkayu yagona to‘g‘ri yo‘lidir.",
    name: "Shavkat Mirziyoyev",
    role: "O‘zbekiston Respublikasi Prezidenti",
    source: "Oliy Majlis va O‘zbekiston xalqiga Murojaatnoma",
    date: "2022-yil 20-dekabr",
    href: "https://president.uz/oz/lists/view/5774",
  },
  en: {
    label: "Education is the foundation of development",
    quote: "Improving the quality education is the only right way to the development of the New Uzbekistan.",
    name: "Shavkat Mirziyoyev",
    role: "President of the Republic of Uzbekistan",
    source: "Address to the Oliy Majlis and the people of Uzbekistan",
    date: "20 December 2022",
    href: "https://president.uz/en/lists/view/5774",
  },
};

export const portalCopy = {
  ru: { label: "Полезные ссылки", title: "Официальные порталы", description: "Законодательство, образование и государственные услуги — быстрый переход к нужному ресурсу.", pause: "Остановить ленту", play: "Продолжить движение", show: "Все порталы", collapse: "Свернуть список", newTab: "Откроется в новой вкладке" },
  uz: { label: "Foydali havolalar", title: "Rasmiy portallar", description: "Qonunchilik, ta’lim va davlat xizmatlari — kerakli manbaga tezkor o‘tish.", pause: "Lentani to‘xtatish", play: "Harakatni davom ettirish", show: "Barcha portallar", collapse: "Ro‘yxatni yig‘ish", newTab: "Yangi oynada ochiladi" },
  en: { label: "Useful links", title: "Official portals", description: "Legislation, education and public services — a quick route to the resource you need.", pause: "Pause carousel", play: "Resume carousel", show: "All portals", collapse: "Collapse list", newTab: "Opens in a new tab" },
};

export const officialPortals = [
  { id: "lex", url: "https://lex.uz/", domain: "lex.uz", image: "/images/portals/lex.jpg", title: { ru: "Национальная база законодательства", uz: "Qonunchilik ma’lumotlari milliy bazasi", en: "National legislation database" } },
  { id: "president", url: "https://president.uz/", domain: "president.uz", image: "/images/portals/emblem.png", title: { ru: "Президент Республики Узбекистан", uz: "O‘zbekiston Respublikasi Prezidenti", en: "President of the Republic of Uzbekistan" } },
  { id: "government", url: "https://gov.uz/", domain: "gov.uz", image: "/images/portals/government.jpg", title: { ru: "Правительственный портал", uz: "Hukumat portali", en: "Government portal" } },
  { id: "ministry", url: "https://gov.uz/oz/edu", domain: "gov.uz/edu", image: "/images/portals/ministry.jpg", title: { ru: "Министерство высшего образования, науки и инноваций", uz: "Oliy ta’lim, fan va innovatsiyalar vazirligi", en: "Ministry of Higher Education, Science and Innovation" } },
  { id: "agency", url: "https://nqaae.uz/uz", domain: "nqaae.uz", image: "/images/portals/agency.svg", title: { ru: "Национальное агентство обеспечения качества образования", uz: "Ta’lim sifatini ta’minlash milliy agentligi", en: "National Agency for Quality Assurance in Education" } },
  { id: "data", url: "https://data.egov.uz/", domain: "data.egov.uz", image: "/images/portals/open-data.jpg", title: { ru: "Портал открытых данных", uz: "Ochiq ma’lumotlar portali", en: "Open data portal" } },
  { id: "services", url: "https://my.gov.uz/", domain: "my.gov.uz", image: "/images/portals/mygov.jpg", title: { ru: "Единый портал государственных услуг", uz: "Yagona interaktiv davlat xizmatlari portali", en: "Unified portal of public services" } },
] as const;
