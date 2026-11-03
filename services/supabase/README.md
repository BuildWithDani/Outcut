# Supabase Backend

Optional backend for **in-app feedback** and **export error reports**. The desktop app works without it.

| Guide | Covers |
| --- | --- |
| [SETUP.md](./SETUP.md) | Deploying migrations and functions to your own project |
| [EMAIL_SETUP.md](./EMAIL_SETUP.md) | Sign-in emails over custom SMTP |

## 📂 Contents

| Path | Purpose |
| --- | --- |
| `migrations/` | Tables, row-level security, quotas, and cleanup jobs |
| `functions/submit-feedback/` | Feedback from signed-in users, with attachments |
| `functions/submit-export-error/` | Anonymous, user-confirmed export error reports |
| `checks/` | SQL scripts that verify access rules |
| `tests/` | SQL tests for quotas and permissions |
| `templates/` | Email templates for magic links and sign-up |

> [!CAUTION]
> The service-role key stays inside Supabase function secrets. Never put it in the desktop app or in this repository.

## 💬 Feedback

The desktop app calls `submit-feedback` with the user's signed-in session. The function checks the token with `auth.getUser` before it reads the request.

| Limit | Value |
| --- | --- |
| Per submission | 5 non-empty files, 10 MB total |
| Per account per UTC day | 10 attempts, 25 files, 50 MB |

- Failed attempts still use quota, so retries can't get around the limits.
- Clients can't write reports or upload attachments directly. Only the function can.
- Users can read their own reports. Staff use service-role access.
- Reports are stored in `public.feedback_reports`, and attachments in the private `feedback-attachments` bucket.

The app adds diagnostics automatically: up to 100 recent warnings and errors, platform details, and a timestamp. Secrets, URLs, emails, and home-folder paths are redacted, and the total is capped below 300,000 bytes. Users choose any attachments themselves.

## 🧯 Export error reports

`submit-export-error` is public and takes only a strict 4 KiB technical schema. Nothing is sent until the user clicks **Report error**, reviews the preview, and clicks **Send report**.

- **Stored**: error codes, failure positions, format, stage, output size and FPS, app version, OS, and an optional self-reported plan
- **Never stored**: account, email, media, file paths, logs, device ID, or IP address
- The function rejects authorization headers and unknown fields.
- Accepted reports are capped at 20 per minute across all users.
- Reports older than 30 days are deleted automatically by Supabase Cron.

> [!NOTE]
> Supabase's own infrastructure logs may still record request metadata such as IP addresses, so don't describe these reports as guaranteed anonymous. Update your privacy notice with your hosting region, logging, and retention.

## 🔍 Verifying access rules

In a disposable database with all migrations applied, run these as `postgres`:

- `checks/feedback-quota-access.sql`: server-only inserts, owner-only reads, quota limits, and blocked direct uploads
- `tests/feedback_limits.sql` and `tests/export_error_reports.sql`: quota and permission tests

All of them roll back their test data. `checks/feedback-access.sql` is only for testing the first migration on its own.
