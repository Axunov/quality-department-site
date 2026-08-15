# V5.4 — исправление Invalid key при загрузке файлов

Supabase Storage теперь получает только ASCII-имя объекта вида:
`<user>/<indicator>/v1-<timestamp>-document.docx`.

Оригинальное русское/узбекское имя файла сохраняется в таблице
`accreditation_v3_documents.file_name` и отображается пользователю без изменений.

Дополнительный SQL не требуется.
