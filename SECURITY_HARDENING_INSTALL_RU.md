# Защищённый студенческий кабинет — установка

Эта версия:

- не показывает Ф.И.О. в кабинете;
- проверяет Student ID только на сервере;
- хранит авторизацию в `HttpOnly + Secure + SameSite=Strict` cookie;
- требует CAPTCHA только после подозрительных попыток;
- ограничивает перебор Student ID;
- закрывает чувствительные таблицы и RPC Supabase от браузера;
- записывает подозрительные попытки без открытого Student ID и IP;
- отделяет реестр участия от анонимных ответов.

## 1. Сделайте резервную копию

В Supabase откройте `Database → Backups` и убедитесь, что резервное копирование
активно. Не удаляйте прежний проект до полной проверки новой версии.

## 2. Выполните SQL

1. Откройте Supabase → `SQL Editor`.
2. Создайте новый запрос.
3. Откройте файл:
   `supabase/student-portal-security-hardening.sql`.
4. Скопируйте **содержимое файла**, а не его путь.
5. Нажмите `Run`.
6. В результате должны появиться:
   `secure_login_ready = true`,
   `rate_limit_ready = true`,
   `audit_log_ready = true`.

SQL выполняется после ранее установленного `student-portal-upgrade.sql`.
Повторно импортировать студентов и расписание не нужно.

## 3. Создайте Cloudflare Turnstile

1. Войдите в Cloudflare Dashboard.
2. Откройте `Turnstile` → `Add widget`.
3. Название: `Quality Department student login`.
4. Тип: `Managed`.
5. Добавьте домены:
   `qualitydepartment.netlify.app` и ваш собственный домен, если он есть.
6. Сохраните `Site key` и `Secret key`.

CAPTCHA не показывается при обычном входе. Она включается после трёх неудачных
попыток за 10 минут либо при аномально большом числе запросов.

## 4. Создайте секрет защиты журнала

В PowerShell выполните:

```powershell
[Convert]::ToHexString(
  [Security.Cryptography.RandomNumberGenerator]::GetBytes(32)
)
```

Скопируйте полученные 64 символа. Это значение
`STUDENT_SECURITY_PEPPER`. Не отправляйте его в чат и не сохраняйте в GitHub.

## 5. Добавьте переменные в Netlify

Откройте:
`Netlify → qualitydepartment → Project configuration → Environment variables`.

Добавьте:

| Переменная | Значение |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |
| `STUDENT_SECURITY_PEPPER` | секрет из шага 4 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile Site key |
| `TURNSTILE_SECRET_KEY` | Turnstile Secret key |

Важно:

- у `SUPABASE_SERVICE_ROLE_KEY`, `STUDENT_SECURITY_PEPPER` и
  `TURNSTILE_SECRET_KEY` **не должно быть** префикса `NEXT_PUBLIC_`;
- не помещайте реальные значения в `.env.example`;
- после изменения переменных запустите новый deploy.

Для локальной проверки скопируйте `.env.example` в `.env.local`, затем замените
заглушки реальными значениями. `.env.local` уже исключён из Git.

## 6. Опубликуйте через GitHub

В PowerShell:

```powershell
cd "C:\Sites\quality-site-github"
git status
git add .
git status
git commit -m "Harden anonymous student portal"
git push origin main
```

Перед `git commit` убедитесь, что среди файлов нет `.env.local`,
`_private_student_import`, `node_modules`, `.next` и `.netlify`.

Netlify автоматически соберёт ветку `main`. После публикации откройте
`Deploys` и убедитесь, что статус последнего deploy — `Published`.

## 7. Включите дополнительную защиту Netlify

Если в вашем тарифе доступна настройка WAF/rate limiting:

1. Откройте `Project configuration → Access & security`.
2. Создайте правило для `/api/student/login`.
3. Начальный безопасный предел: 30 запросов в минуту с одного IP.
4. Действие: блокировать или challenge.

Встроенное серверное ограничение работает и без платного WAF:

- CAPTCHA: 3 ошибки / 10 минут;
- блок: 10 ошибок / 15 минут;
- дополнительный предел защищает от массовых запросов;
- учтено, что несколько студентов могут использовать общий IP учебного корпуса.

## 8. Проверьте после публикации

1. Откройте сайт в режиме инкогнито.
2. Войдите с действительным `STU-xxxx`.
3. Убедитесь, что Ф.И.О. нигде не отображается.
4. Откройте опрос: на странице не должно быть Student ID, токена или кода.
5. Выполните две ошибочные попытки — CAPTCHA ещё не обязательна.
6. После третьей ошибочной попытки должна появиться CAPTCHA.
7. В DevTools → Application → Cookies проверьте cookie
   `qds_student_portal`: должна иметь флаги `HttpOnly`, `Secure`,
   `SameSite=Strict`.
8. Отправьте тестовый ответ и проверьте, что в ответах нет Ф.И.О. и Student ID.

## 9. Просмотр журнала подозрительных попыток

Выполняйте только в Supabase SQL Editor:

```sql
select
  created_at,
  success,
  reason,
  left(ip_hash, 12) as ip_fingerprint
from public.student_login_attempts
order by created_at desc
limit 100;
```

Журнал хранит HMAC-отпечаток IP и SHA-256-отпечаток Student ID. Открытые IP,
Ф.И.О. и Student ID в журнал не записываются. Таблица недоступна публичным
ролям.

## 10. Как устроена анонимность

Student ID проверяется сервером только для допуска. Затем сервер выдаёт
короткоживущую сессию кабинета. При открытии опроса создаётся другая анонимная
сессия. Ответы связываются с преподавателем, предметом и периодом опроса, но не
с Ф.И.О. или Student ID. Реестр участия получает только отметку о завершении.

Для усиления статистической анонимности администратору рекомендуется не
показывать детализацию по группе, пока не накопится минимум 5 ответов.

## Экстренное отключение

Если замечена атака:

1. В Supabase отключите активный период опроса (`active = false`).
2. В Netlify временно ограничьте доступ к `/api/student/login`.
3. Смените `SUPABASE_SERVICE_ROLE_KEY`, `STUDENT_SECURITY_PEPPER` и
   `TURNSTILE_SECRET_KEY`.
4. Выполните новый deploy.
5. Проверьте `student_login_attempts` и журналы Netlify.
