export function monitoringFormat(language: string) {
  const locale = language === "uz" ? "uz-Latn-UZ" : language === "en" ? "en-GB" : "ru-RU";
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const percentage = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 });
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tashkent" });
  const month = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" });
  return {
    number: (value: number) => decimal.format(value),
    percent: (value: number) => percentage.format(value),
    date: (value: string) => date.format(new Date(value)),
    month: (value: string) => /^\d{4}-\d{2}$/.test(value) ? month.format(new Date(value + "-01T00:00:00Z")) : value,
  };
}
