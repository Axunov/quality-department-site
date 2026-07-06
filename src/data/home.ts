import { BarChart3, FileText, Newspaper, ShieldCheck, Users, ClipboardCheck } from "lucide-react";

export const stats = [
  { title: "Мониторингов", value: "120+", icon: BarChart3 },
  { title: "Документов", value: "85+", icon: FileText },
  { title: "Опросов", value: "30+", icon: ShieldCheck },
  { title: "Новостей", value: "50+", icon: Newspaper },
];

export const quickLinks = [
  {
    title: "Сотрудники отдела",
    text: "Структура отдела, должностные обязанности и контактная информация.",
    icon: Users,
  },
  {
    title: "Аккредитация",
    text: "Материалы по государственной и международной аккредитации.",
    icon: ShieldCheck,
  },
  {
    title: "Документы",
    text: "Положения, приказы, формы и методические материалы.",
    icon: FileText,
  },
  {
    title: "Мониторинг",
    text: "Контроль качества занятий, посещаемости, экзаменов и аналитика.",
    icon: ClipboardCheck,
  },
];

export const news = [
  {
    title: "Проведён мониторинг качества учебного процесса",
    date: "04.07.2026",
    category: "Мониторинг",
  },
  {
    title: "Подготовлены материалы по аккредитации образовательных программ",
    date: "03.07.2026",
    category: "Аккредитация",
  },
  {
    title: "Запущен опрос студентов по качеству образовательной среды",
    date: "02.07.2026",
    category: "Опросы",
  },
];