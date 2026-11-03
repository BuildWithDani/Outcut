# Upstream

Outcut AI is part of a family of open-source screen recorders. This page explains where the code comes from and what stays compatible with upstream.

```text
OpenScreen (MIT, 2025)  ──►  Recordly (AGPL-3.0, 2026)  ──►  Outcut AI (AGPL-3.0, 2026)
Siddharth Vaddem             webadderall                     BuildWithDani
```

| | Outcut AI | Recordly | OpenScreen |
| --- | --- | --- | --- |
| **Maintainer** | BuildWithDani | webadderall | Siddharth Vaddem |
| **Repository** | [BuildWithDani/Outcut](https://github.com/BuildWithDani/Outcut) | [webadderallorg/Recordly](https://github.com/webadderallorg/Recordly) | [siddharthvaddem/openscreen](https://github.com/siddharthvaddem/openscreen) |
| **License** | AGPL-3.0 | AGPL-3.0 with additional terms in [`LICENSE.md`](./LICENSE.md) | MIT |

**Base commit:** Recordly `109ca3a13c362e969d9add25d1f93406c36dba2a` (`Merge pull request #1147 from webadderallorg/codex/mac-audio-gap-timing`).

Outcut AI keeps Recordly's recorder, editor, timeline, webcam, cursor, export, settings, and project workflows. Outcut AI's own changes add branding, documentation, packaging identity, dismissible onboarding, the teal theme, and repository cleanup.

## 🔗 Compatibility contracts

These identifiers keep their Recordly names on purpose, so existing projects and setups keep working.

| Area | Status |
| --- | --- |
| `.recordly` project files | Kept so projects open and save the same way |
| `recordly.*` localStorage and settings keys | Kept |
| Auth deep links `recordly://` and `recordly-dev://` | Kept for existing redirect setups; `outcut://` is also registered |
| MIME / UTI `dev.recordly.app.project` | Kept so file associations keep working |
| Native helper names (`recordly-*-helper`, `recordly-gpu-export`, …) | Kept where packaging and process launch depend on them |
| Internal TypeScript symbols | Auth module, sign-in dialog, and branding constants are renamed to Outcut. Others are kept where renaming brings no user benefit |
| `services/recordly-share` | Kept as an optional, upstream-compatible share worker. It is not an official Outcut Cloud |

## ☁️ Cloud and accounts

You don't need an account to record, edit, save, open, or export.

The optional sign-in UI stays in place for a future Outcut Cloud. Until BuildWithDani runs its own cloud services:

- Recordly-owned cloud URLs are not official Outcut services
- Cloud account features are optional and future work
- Onboarding can be dismissed with **X**, **Escape**, or **Continue without an account**

See [`docs/EXTERNAL_SERVICES.md`](./docs/EXTERNAL_SERVICES.md) for every external service.

## 🎨 Branding assets

| Asset | Location |
| --- | --- |
| Canonical logo | `assets/branding/outcut-logo.svg` |
| Generated icons | `public/app-icons/outcut-*.png`, `icons/icons/**` (run `npm run icons:outcut`) |
