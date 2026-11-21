"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { editorialCopy, type EditorialLanguage } from "./EditorialTranslation";
import { makeDocumentCover } from "@/lib/documentCover";

export function useDocumentCover() {
  const [cover, setCover] = useState<Blob | null>(null);
  const [state, setState] = useState<"idle" | "busy" | "ready" | "unavailable">("idle");
  const selection = useRef(0);
  useEffect(() => () => { selection.current++; }, []);
  async function select(file?: File) {
    const revision = ++selection.current;
    setCover(null);
    setState(file ? "busy" : "idle");
    if (!file) return;
    const result = await makeDocumentCover(file).catch(() => null);
    if (selection.current !== revision) return;
    setCover(result);
    setState(result ? "ready" : "unavailable");
  }
  return { cover, state, select };
}

export function DocumentCoverField({ state, cover, locale }: { state: ReturnType<typeof useDocumentCover>["state"]; cover: Blob | null; locale: EditorialLanguage }) {
  const t = editorialCopy[locale];
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!cover) return;
    const objectUrl = URL.createObjectURL(cover);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [cover]);
  return <div className="editorial-tools flex items-center gap-4" aria-live="polite">
    {cover && url ? <img src={url} alt={t.cover} className="h-28 w-20 shrink-0 rounded-md border bg-white object-contain" /> : <FileText aria-hidden="true" size={26} className="shrink-0" />}
    <div><p className="font-bold">{t.cover}</p><p className="mt-1 text-sm opacity-85">{state === "busy" ? t.coverBusy : state === "unavailable" ? t.noCover : t.coverHint}</p></div>
  </div>;
}
