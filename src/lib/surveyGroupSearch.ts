export const studyModes = ["full", "part", "distance", "other"] as const;
export type StudyMode = typeof studyModes[number];

export function studyMode(label: string): StudyMode {
  const s = label.toLowerCase();
  if (/дистанц|masofavi|distance|\(\s*[дd]\s*\)/iu.test(s)) return "distance";
  if (/заоч|sirtqi|part[ -]?time|\(\s*[зz]\s*\)/iu.test(s)) return "part";
  if (/очн|kunduzgi|full[ -]?time|\(\s*[оo]\s*\)/iu.test(s)) return "full";
  return "other";
}

const equivalent: Record<string, string> = { а:"a", в:"v", е:"e", ё:"e", к:"k", м:"m", н:"n", о:"o", р:"r", с:"s", т:"t", у:"u", х:"x", и:"i", п:"p", б:"b", г:"g", л:"l", д:"d", э:"e", з:"z" };

export function matchesSurveyGroup(label: string, input: string) {
  const normalize = (s: string) => s.normalize("NFKC").toLowerCase().replace(/[а-яё]/gu, char => equivalent[char] ?? char).replace(/[^\p{L}\p{N}]/gu, "");
  return normalize(label).includes(normalize(input));
}
