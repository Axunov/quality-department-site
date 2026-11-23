// O‘RQ–1184: only the four changed letters. The tutuq sign is retained.
const protectedOrLetter = /(?:https?:\/\/|www\.)[^\s<>]+|[\p{L}\d._%+-]+@[\p{L}\d.-]+\.[a-z]{2,}|\b[\w.-]+\.(?:pdf|docx?|xlsx?|pptx?|zip|jpg|jpeg|png|webp|json|js|uz|gov|com|org)\b|\b(?:SharePoint|Chrome|ChatGPT|GitHub|Shakespeare|WhatsApp)\b|&(?:#\d+|#x[\da-f]+|[a-z]+);|[oOgG]['‘’ʻʼ`´]|[sScC][hH]/giu;

export function uzbekAlphabet(value: string): string {
  return value.replace(protectedOrLetter, (part) => {
    if (part.length !== 2) return part;
    const lower = { o: "ö", g: "ğ", s: "ş", c: "ç" }[part[0].toLowerCase()];
    if (!lower) return part;
    return part[0] === part[0].toUpperCase() ? lower.toUpperCase() : lower;
  });
}

export function normalizeUzbekSearch(value: string): string {
  return uzbekAlphabet(value.normalize("NFKC")).toLocaleLowerCase("uz")
    .replace(/[’‘ʻʼ`´]/g, "'").trim();
}
