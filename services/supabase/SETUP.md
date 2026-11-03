# Supabase Setup

Deploy the feedback and export-error backend to **your own** Supabase project.

## 1️⃣ Apply migrations

Run these in order in the SQL editor or with the Supabase CLI:

| Order | Migration | Adds |
| :---: | --- | --- |
| 1 | `202609230001_feedback.sql` | Feedback tables and the private attachments bucket |
| 2 | `202609230002_feedback_limits.sql` | Daily quotas, and blocks direct client inserts and uploads |
| 3 | `202610020001_export_error_reports.sql` | Export error reports and cleanup jobs |
| 4 | `202610030001_feedback_access.sql` | Removes inherited client privileges. Apply it to existing projects too |

> [!WARNING]
> These migrations only create objects. Don't run them twice against the same project.

## 2️⃣ Deploy the functions

From the repository root:

```bash
supabase functions deploy submit-feedback --workdir services --project-ref YOUR_PROJECT_REF
supabase functions deploy submit-export-error --workdir services --project-ref YOUR_PROJECT_REF
```

`services/supabase/config.toml` turns off only the gateway JWT check. `submit-feedback` still checks every token itself, and `submit-export-error` is public by design.

Both functions use the built-in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` secrets.

## 3️⃣ Configure authentication

- Add the redirect URLs listed in [`docs/authentication.md`](../../docs/authentication.md).
- Turn on the email and OAuth providers you want.
- Set a production **Site URL**. The default `http://localhost:3000` is only a fallback.
- Set up email delivery with [EMAIL_SETUP.md](./EMAIL_SETUP.md).

## 4️⃣ Connect the desktop app

Put your project URL and **publishable** key in `.env.local`:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

## ✅ Before launch

- [ ] Run the access checks in [README.md](./README.md#-verifying-access-rules)
- [ ] Confirm the Supabase Cron cleanup job exists and succeeds
- [ ] Send a real feedback report with an attachment from a signed-in desktop build
- [ ] Test sign-in end to end, including the packaged `recordly://` callback
- [ ] Review email rate limits for your expected volume
- [ ] Plan cleanup for interrupted uploads and old `feedback_daily_usage` rows
- [ ] Update your privacy notice

> [!CAUTION]
> Don't commit project refs, account IDs, credentials, or setup notes for a real deployment.
