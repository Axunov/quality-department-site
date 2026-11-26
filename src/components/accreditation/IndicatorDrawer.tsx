"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronRight, X } from "lucide-react";
import type { Locale } from "@/lib/accreditation/specialData";
import { registryCopy } from "@/lib/accreditation/workspace";

export default function IndicatorDrawer({ locale, code, title, status, statusKind, progress, dueDate, responsible, openOnMount, children }: {
  locale: Locale; code: string; title: string; status: string; statusKind: string; progress: number; dueDate: string | null; responsible?: string; openOnMount?: boolean; children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const initialized = useRef(false);
  const [hasOpened, setHasOpened] = useState(false);
  const id = useId(), t = registryCopy[locale];

  useEffect(() => {
    if (!openOnMount || initialized.current) return;
    const frame = requestAnimationFrame(() => {
      if (initialized.current || !dialog.current) return;
      initialized.current = true;
      if (!dialog.current.open) dialog.current.showModal();
      setHasOpened(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [openOnMount]);

  function open() {
    setHasOpened(true);
    if (!dialog.current?.open) dialog.current?.showModal();
  }

  return <>
    <button ref={trigger} type="button" onClick={open} className="indicator-row" aria-label={`${t.open} ${code}: ${title}`} aria-haspopup="dialog">
      <span className="indicator-code font-bold text-blue-700">{code}</span>
      <span className="indicator-description min-w-0 text-left text-sm leading-5">
        <strong className="block break-words">{title}</strong>
        {responsible && <span className="mt-1 block break-words text-xs font-medium text-slate-600">{t.responsible}: {responsible}</span>}
      </span>
      <span className="indicator-row-status" data-status={statusKind}>{status}</span>
      <span className="indicator-deadline text-left text-xs text-slate-600"><span className="block">{t.deadline}</span>{dueDate ?? t.none}</span>
      <span className="indicator-progress text-right text-sm font-bold text-blue-800" aria-label={`${t.readiness}: ${progress}%`}>{progress}%</span>
      <ChevronRight size={17} aria-hidden="true" className="text-slate-400"/>
    </button>
    <dialog ref={dialog} className="indicator-drawer qd-glass-bar" aria-labelledby={id} onClose={() => trigger.current?.focus({ preventScroll:true })} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
    }}>
      <header className="drawer-toolbar items-start">
        <div className="min-w-0">
          <p className="text-xs font-bold text-blue-700">{code}</p>
          <h2 id={id} className="break-words text-base font-bold">{title}</h2>
        </div>
        <button autoFocus type="button" onClick={() => dialog.current?.close()} className="header-control shrink-0" aria-label={t.close}><X size={20} aria-hidden="true"/></button>
      </header>
      <div className="drawer-body">{hasOpened && children}</div>
    </dialog>
  </>;
}
