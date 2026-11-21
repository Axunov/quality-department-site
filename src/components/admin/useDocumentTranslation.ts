"use client";

import { useState } from "react";
import { editorialCopy, getEditorialTranslations, translationError, type EditorialLanguage } from "./EditorialTranslation";

export function useDocumentTranslation(locale: EditorialLanguage, showMessage: (text: string) => void) {
  const [source, setSource] = useState(locale);
  const [busy, setBusy] = useState(false);
  async function translate(form: HTMLFormElement) {
    if (busy) return;
    const data = new FormData(form);
    setBusy(true);
    showMessage("");
    try {
      const result = await getEditorialTranslations(source, String(data.get("title_" + source) || ""), String(data.get("description_" + source) || ""), "text");
      for (const [lang, translated] of Object.entries(result)) {
        const panel = form.querySelector<HTMLDetailsElement>(`[data-editor-language="${lang}"]`);
        if (panel) panel.open = true;
        for (const [name, value] of [["title", translated.title], ["description", translated.content]]) {
          const input = form.elements.namedItem(name + "_" + lang);
          if ((input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) && !input.value.trim()) input.value = value;
        }
      }
      showMessage(editorialCopy[locale].ready);
    } catch (error) { showMessage(translationError(error, editorialCopy[locale])); }
    finally { setBusy(false); }
  }
  return { source, setSource, busy, translate };
}
