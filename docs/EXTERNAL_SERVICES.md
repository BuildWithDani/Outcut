# External Services

Outcut AI's recorder and editor work **fully offline**. Every network service below is optional, except auto-updates in packaged builds.

| Service | Configuration | Status |
| --- | --- | --- |
| 🔄 **Auto-updates** | GitHub Releases (`BuildWithDani/Outcut`) | Used by packaged builds |
| 📣 **Announcements** | `announcements.json` on the default branch | Optional; see [announcements](./announcements.md) |
| 🔑 **Sign-in** (Supabase magic link / OAuth) | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` | Optional; use your own Supabase project. See [authentication](./authentication.md) |
| 🔗 **Auth deep links** | `outcut://`, plus `recordly://` for compatibility | Needed only for sign-in |
| ☁️ **Cloud sharing** | `VITE_CLOUD_SHARE_ENDPOINT`, `services/recordly-share` | Optional self-hosted worker; see [cloud sharing](./cloud-sharing.md) |
| 💬 **Feedback and export error reports** | Supabase functions in `services/supabase` | Optional; needs operator keys |
| 📊 **Analytics** | None configured | No analytics or telemetry endpoint exists in the desktop app |

## Environment variables

`OUTCUT_*` names are preferred where they exist. Older `RECORDLY_*` names still work as fallbacks. Don't remove them without a migration plan.

## Rules for builds

> [!WARNING]
> - Never ship Recordly production keys, and never present Recordly-owned services as official Outcut services.
> - Leave `VITE_CLOUD_SHARE_ENDPOINT` empty in packaged builds until an Outcut-operated endpoint exists.
> - Never make sign-in required for recording, editing, or exporting.
