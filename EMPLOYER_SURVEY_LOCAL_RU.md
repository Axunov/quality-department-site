# Локальный запуск опроса работодателей

1. Откройте проект в VS Code.
2. В Supabase откройте SQL Editor и выполните файл `supabase/employer-survey.sql`.
3. Проверьте `.env.local`: должны быть указаны `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` и `SUPABASE_SERVICE_ROLE_KEY`.
4. Выполните `npm install`, затем `npm run dev`.
5. Откройте `http://localhost:3000/ru/surveys/employers`.

Страница добавлена в меню «Система качества» под названием «Опрос работодателей».
Ответы сохраняются в таблицу `employer_survey_responses`.


## Изменение версии

В этой версии полностью удалён прежний вопрос №18 о добавлении дисциплин и практических направлений. Последующие вопросы перенумерованы. Если таблица уже создана по прежней версии, выполните файл `supabase/remove-employer-survey-question-18.sql`.
