"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function RichTextEditor({
  name,
  initialContent = "",
}: {
  name: string;
  initialContent?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="rounded-lg border bg-white">
      <div className="flex flex-wrap gap-2 border-b p-3">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="rounded border px-3 py-1 font-bold">
          B
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="rounded border px-3 py-1 italic">
          I
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="rounded border px-3 py-1">
          • Список
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="rounded border px-3 py-1">
          1. Список
        </button>

        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className="rounded border px-3 py-1">
          Текст
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="rounded border px-3 py-1">
          Заголовок
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[260px] p-4 leading-7 outline-none" />

      <input type="hidden" name={name} value={editor.getHTML()} readOnly />
    </div>
  );
}