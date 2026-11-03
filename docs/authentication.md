# Authentication

> [!NOTE]
> Accounts are **optional**. Recording, editing, saving `.recordly` projects, and exporting all work without signing in.

The sign-in UI exists for a future Outcut Cloud. It uses Supabase for magic links and OAuth. Until BuildWithDani runs its own cloud services, don't present Recordly-owned URLs as official Outcut services.

Onboarding can always be dismissed with **X**, **Escape**, or **Continue without an account**.

## 🔧 Set up your own Supabase project

> [!CAUTION]
> Use only the **publishable** key in the desktop app. Never put a service-role key in it.

1. Create a Supabase project that you control.
2. Copy `.env.example` to `.env.local`, then fill in the project URL and publishable key.
3. In **Authentication → URL Configuration**, allow these redirect URLs:

   | URL | Used by |
   | --- | --- |
   | `recordly://auth/callback` | Packaged app (kept for compatibility) |
   | `outcut://auth/callback` | Also registered by the app |
   | `http://127.0.0.1:43821/auth/callback` | Development |

4. Turn on email magic links and any OAuth providers you want (Google, Microsoft, or GitHub). The sign-in dialog only shows providers that are enabled.

For email delivery and templates, see [`services/supabase/EMAIL_SETUP.md`](../services/supabase/EMAIL_SETUP.md).

## ⚙️ In the app

| Screen | What it does |
| --- | --- |
| **Settings → Account** | Change display name and email, view connected identities, sign out. Signing out keeps your local projects |
| **Settings → Permissions** | Shows capture permissions, such as macOS Screen Recording and Accessibility |

## ☁️ Share worker

`services/recordly-share` is an optional, upstream-compatible service, not an official Outcut Cloud. See [cloud sharing](./cloud-sharing.md).
