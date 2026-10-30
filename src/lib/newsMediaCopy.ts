const copy = {
  ru: {
    media: "Фото и видео", add: "Добавить фото или видео", hint: "До 20 файлов в одной новости. Фото: JPG, PNG, WebP, GIF, AVIF — до 10 МБ. Видео: MP4 или WebM — до 50 МБ. Для телефонов рекомендуем MP4 (H.264/AAC).",
    order: "Первый файл — обложка новости. Меняйте порядок стрелками. Изменения вступят в силу после сохранения новости.",
    photo: "Фото", video: "Видео", cover: "Обложка", remove: "Убрать", previous: "Раньше", next: "Позже", cancel: "Отменить загрузку", uploading: "Загрузка", ready: "Файлы загружены. Сохраните новость.",
    format: "Неподдерживаемый формат. Выберите фото или видео MP4/WebM.", size: "Файл пустой или слишком большой: фото — до 10 МБ, видео — до 50 МБ.", limit: "В одной новости можно разместить не более 20 файлов.",
    uploadError: "Не удалось загрузить файл. Проверьте соединение и вход администратора, затем повторите.", saveError: "Не удалось сохранить новость. Файлы сохранены в форме. Проверьте соединение и повторите.",
    titleRequired: "Укажите заголовок хотя бы на одном языке.", session: "Войдите в админ-панель и подтвердите второй фактор.", open: "Открыть файл", fallback: "Если видео не воспроизводится, откройте файл.", poster: "Обложка видео", posterHint: "Необязательно: добавьте изображение для превью видео.", new: "Новая новость", saved: "Новость сохранена!", publish: "Опубликовать", save: "Сохранить изменения", saving: "Сохраняется...", empty: "Добавьте фотографии, видео или их сочетание.",
  },
  uz: {
    media: "Foto va video", add: "Foto yoki video qo‘shish", hint: "Bitta yangilikka 20 tagacha fayl. Foto: JPG, PNG, WebP, GIF, AVIF — 10 MB gacha. Video: MP4 yoki WebM — 50 MB gacha. Telefonlar uchun MP4 (H.264/AAC) tavsiya etiladi.",
    order: "Birinchi fayl yangilik muqovasi bo‘ladi. Tartibni strelkalar bilan o‘zgartiring. O‘zgarishlar yangilik saqlangandan so‘ng kuchga kiradi.",
    photo: "Foto", video: "Video", cover: "Muqova", remove: "Olib tashlash", previous: "Oldinga", next: "Keyinga", cancel: "Yuklashni bekor qilish", uploading: "Yuklanmoqda", ready: "Fayllar yuklandi. Yangilikni saqlang.",
    format: "Format qo‘llab-quvvatlanmaydi. Foto yoki MP4/WebM videosini tanlang.", size: "Fayl bo‘sh yoki juda katta: foto — 10 MB gacha, video — 50 MB gacha.", limit: "Bitta yangilikka ko‘pi bilan 20 ta fayl joylash mumkin.",
    uploadError: "Fayl yuklanmadi. Internet aloqasi va administrator kirishini tekshiring, so‘ng qayta urinib ko‘ring.", saveError: "Yangilik saqlanmadi. Fayllar shaklda saqlanib turibdi. Aloqani tekshirib, qayta urinib ko‘ring.",
    titleRequired: "Kamida bitta tilda sarlavha kiriting.", session: "Administrator paneliga kiring va ikkinchi omilni tasdiqlang.", open: "Faylni ochish", fallback: "Video ijro etilmasa, faylni oching.", poster: "Video muqovasi", posterHint: "Ixtiyoriy: video uchun muqova rasmini qo‘shing.", new: "Yangi yangilik", saved: "Yangilik saqlandi!", publish: "E’lon qilish", save: "O‘zgarishlarni saqlash", saving: "Saqlanmoqda...", empty: "Foto, video yoki ularning kombinatsiyasini qo‘shing.",
  },
  en: {
    media: "Photos and videos", add: "Add photos or videos", hint: "Up to 20 files per article. Photos: JPG, PNG, WebP, GIF, AVIF — up to 10 MB. Videos: MP4 or WebM — up to 50 MB. MP4 (H.264/AAC) is recommended for phones.",
    order: "The first file is the news cover. Use the arrows to change the order. Changes take effect after saving the article.",
    photo: "Photo", video: "Video", cover: "Cover", remove: "Remove", previous: "Move earlier", next: "Move later", cancel: "Cancel upload", uploading: "Uploading", ready: "Files uploaded. Save the article.",
    format: "Unsupported format. Choose a photo or an MP4/WebM video.", size: "File is empty or too large: photos up to 10 MB, videos up to 50 MB.", limit: "An article can contain up to 20 files.",
    uploadError: "Upload failed. Check your connection and administrator sign-in, then try again.", saveError: "Could not save the article. Files remain in the form. Check your connection and try again.",
    titleRequired: "Enter a title in at least one language.", session: "Sign in to the admin panel and confirm your second factor.", open: "Open file", fallback: "If the video does not play, open the file.", poster: "Video cover", posterHint: "Optional: add a cover image for this video.", new: "New article", saved: "Article saved!", publish: "Publish", save: "Save changes", saving: "Saving...", empty: "Add photos, videos, or a combination of both.",
  },
};
export function newsMediaCopy(locale: string) { return copy[locale === "uz" || locale === "en" ? locale : "ru"]; }
