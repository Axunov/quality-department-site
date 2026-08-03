-- ВНИМАНИЕ: этот файл удаляет все тестовые материалы и обнуляет прогресс.
-- Выполняйте только перед началом реального сбора материалов.

begin;

-- Удаляем тестовые проверки, комментарии, историю и документы из БД.
delete from public.accreditation_reviews;
delete from public.accreditation_comments;
delete from public.accreditation_history;
delete from public.accreditation_documents;

-- Возвращаем все индикаторы в исходное состояние.
update public.accreditation_indicators
set
  status = 'draft',
  completion_percent = 0,
  submitted_at = null,
  approved_at = null,
  updated_at = now();

-- Возвращаем рабочие группы и проекты в начальное состояние.
update public.accreditation_working_groups
set status = 'draft', updated_at = now();

update public.accreditation_projects
set status = 'in_progress', updated_at = now();

commit;

-- Файлы в Storage удаляются отдельно.
-- Supabase Dashboard → Storage → accreditation-evidence → выбрать тестовые файлы → Delete.
