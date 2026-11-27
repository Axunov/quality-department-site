import { appealHelp, appealReplyTemplates, type AppealLocale } from "./appealHelp";

const languageNames = { ru: "Russian", uz: "Uzbek in Latin script", en: "English" };
const sourceIds = {
  schedule: ["schedule", "track"],
  technical: ["technical", "privacy", "track"],
  suggestion: ["suggestion", "track"],
} as const;

export function appealDraftContext(category: unknown, locale: AppealLocale) {
  const template = appealReplyTemplates.find((entry) => entry.id === category);
  if (!template) return null;
  const ids: readonly string[] = sourceIds[template.id];
  return {
    topic: template.id,
    language: languageNames[locale],
    template: template.body[locale],
    sources: appealHelp.filter((entry) => ids.includes(entry.id))
      .map((entry) => ({ id: entry.id, title: entry.question[locale], text: entry.answer[locale] })),
  };
}

type Context = NonNullable<ReturnType<typeof appealDraftContext>>;
export function appealDraftRequest(context: Context) {
  return {
    model: "gpt-5.4-mini",
    store: false,
    max_output_tokens: 450,
    reasoning: { effort: "none" },
    instructions: "Write a short, editable student support reply in the requested language. Use only the supplied template and source facts. No URLs, HTML, placeholders, deadlines, resolutions, claims that checks already happened, or requests for codes, passwords or personal data. Public tracking is read-only: never imply students can reply there. Use only source IDs supporting the reply. Return an empty reply with no IDs if a grounded draft is not possible.",
    input: JSON.stringify(context),
    text: { format: {
      type: "json_schema", name: "appeal_draft", strict: true,
      schema: {
        type: "object", additionalProperties: false, required: ["draft", "source_ids"],
        properties: {
          draft: { type: "string" },
          source_ids: { type: "array", items: { type: "string", enum: context.sources.map((source) => source.id) } },
        },
      },
    } },
  };
}

export function readAppealDraft(response: unknown, context: Context) {
  if (!response || typeof response !== "object" || !("status" in response) || response.status !== "completed" ||
      !("output" in response) || !Array.isArray(response.output)) return null;
  const content = response.output.flatMap((item) => item?.type === "message" && Array.isArray(item.content) ? item.content : []);
  if (content.length !== 1 || content[0]?.type !== "output_text" || typeof content[0].text !== "string" || content[0].text.length > 3000) return null;
  try {
    const { draft, source_ids: ids } = JSON.parse(content[0].text);
    const allowed = new Set(context.sources.map((source) => source.id));
    if (typeof draft !== "string" || draft.trim().length < 15 || draft.length > 1500 ||
        /https?:|www\.|[<>]|\S+@\S+/i.test(draft) ||
        !Array.isArray(ids) || !ids.length || ids.length > allowed.size ||
        ids.some((id) => typeof id !== "string" || !allowed.has(id))) return null;
    return { draft: draft.trim(), sourceIds: [...new Set<string>(ids)] };
  } catch { return null; }
}
