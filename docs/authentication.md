# Authentication (optional)

Outcut AI’s core desktop workflow — record, edit, save `.recordly` projects, and export locally — does **not** require an account.

Optional sign-in UI remains in the codebase for:

- A future independently hosted **Outcut Cloud**
- Compatibility with upstream Recordly Supabase / magic-link / OAuth plumbing

Until BuildWithDani operates authorized Outcut cloud endpoints, do not present Recordly-owned production URLs as official Outcut services. Welcome onboarding is dismissible (X, Escape, or Continue without an account).

## Configuring optional Supabase Auth

1. Create a Supabase project you control (not a Recordly production project unless you have authorization).
2. Copy the project URL and publishable key into `.env.local` from `.env.example`. Never ship the service-role key in the desktop app.
3. In **Authentication → URL configuration**, allow:
   - `outcut://auth/callback`
   - `recordly://auth/callback` (compatibility)
   - `http://127.0.0.1:43821/auth/callback` (dev loopback)
4. Enable email magic links and any OAuth providers you need (Google, Microsoft, GitHub). The dialog reads `/auth/v1/settings` and shows only enabled providers.

Production SMTP and email templates: see `services/supabase/EMAIL_SETUP.md`.

## Settings

**Settings → Account** remains available for display name, email change, connected identities, and sign-out when a session exists. Sign-out clears the local session; local projects stay on disk.

**Settings → Permissions** continues to surface platform capture permissions (notably macOS Screen Recording / Accessibility).

## Share worker

`services/recordly-share` is retained as an upstream-compatible optional service. It is not an official Outcut Cloud deployment. See [UPSTREAM.md](../UPSTREAM.md) and `services/recordly-share/worker/README.md`.
