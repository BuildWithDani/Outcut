# External services

Outcut AI’s **local** recorder and editor do not require network services. Optional integrations remain in-tree for compatibility and for a future independently hosted Outcut Cloud.

| Integration | Config | Status | Action |
| --- | --- | --- | --- |
| Supabase Auth (magic link / OAuth) | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` | Optional; operators must use their own project | Keep client; do not ship Recordly production keys |
| Auth deep links | `outcut://`, `recordly://` (compat) | Required for optional sign-in flows | Keep both schemes |
| Cloud share allowlist | `videos.recordly.dev`, staging worker, localhost | Upstream-compatible allowlist until Outcut Cloud | Keep allowlist; user copy is Outcut-neutral; **do not** treat Recordly prod as official Outcut Cloud |
| Share worker | `services/recordly-share` | Optional self-host | Keep source; web `dist/` is build-local / gitignored |
| electron-updater | GitHub Releases (`BuildWithDani/Outcut`) | Required for packaged auto-update | Keep |
| Announcements JSON | raw GitHub on default branch | Optional | Keep |
| Analytics / telemetry | none configured in desktop client | N/A | No product analytics endpoint found in desktop env |
| Marketplace / extensions | local extension system | Keep | See `EXTENSIONS.md` |
| Feedback / export error reports | optional Supabase function paths | Optional; requires operator keys | Keep client; leave unset in public builds |

## Environment variables (desktop)

Prefer `OUTCUT_*` names where introduced. Legacy `RECORDLY_*` names remain as fallbacks for developer and upstream compatibility — do not delete fallbacks without a migration plan.

## Hard rules

- Do not redirect Recordly production endpoints to unverified replacements.
- Do not implement Outcut Cloud billing in cleanup builds.
- Leave `VITE_CLOUD_SHARE_ENDPOINT` blank in packaged builds until an Outcut-operated endpoint is authorized.
- Do not present optional auth UI as mandatory for recording or editing.
