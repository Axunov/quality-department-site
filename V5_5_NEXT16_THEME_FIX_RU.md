# V5.5 — исправление Next.js 16 theme initializer

Исправлено:
- удалён `next/script` из `<head>` в locale layout;
- инициализация темы выполняется обычным inline `<script>` через `dangerouslySetInnerHTML`;
- сохранён `data-scroll-behavior="smooth"` на `<html>`.

Дополнительный SQL не требуется.
