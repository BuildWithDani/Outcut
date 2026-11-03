# Notice

**Outcut AI**: Copyright (C) 2026 BuildWithDani

Outcut AI includes software derived from **Recordly** and **OpenScreen**.
BuildWithDani does **not** claim ownership of Recordly-derived or OpenScreen-derived code.

## 🧬 Provenance

| Project | Copyright | License | Source |
| --- | --- | --- | --- |
| **OpenScreen** | (c) 2025 Siddharth Vaddem | MIT | [siddharthvaddem/openscreen](https://github.com/siddharthvaddem/openscreen) |
| **Recordly** | (C) 2026 webadderall | AGPL-3.0 | [webadderallorg/Recordly](https://github.com/webadderallorg/Recordly) |
| **Outcut AI** | (C) 2026 BuildWithDani | AGPL-3.0 | [BuildWithDani/Outcut](https://github.com/BuildWithDani/Outcut) |

- Recordly began as a fork of OpenScreen. See the OpenScreen MIT notice in [`LICENSE.md`](./LICENSE.md).
- Outcut AI is based on Recordly commit `109ca3a13c362e969d9add25d1f93406c36dba2a`.

## ✍️ What BuildWithDani authored

These parts were written or substantially rewritten for Outcut AI. This doesn't claim ownership of Recordly or OpenScreen program logic.

- **Branding**: `assets/branding/outcut-logo.svg`, generated icons in `assets/branding/generated/`, `public/app-icons/outcut-*.png`, and `icons/icons/**`
- **Icon pipeline**: `scripts/generate-outcut-icons.mjs`
- **Theme**: `src/styles/outcut-brand.css` and related theme wiring
- **Credits screen**: `src/components/credits/CreditsDialog.tsx`
- **Documentation**: `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `NOTICE.md`, `UPSTREAM.md`, `TRADEMARKS.md`
- **Packaging identity**: product metadata in `package.json` and `electron-builder.json5`, and `outcut.rb`

Everything else remains Recordly-derived (and OpenScreen-derived where applicable). It continues under AGPL-3.0 (full text in [`LICENSE`](./LICENSE)) with the upstream copyright notices preserved in [`LICENSE.md`](./LICENSE.md).

## 📌 Required attribution

If you redistribute Outcut AI or a modified version:

- Keep `NOTICE.md`, `LICENSE`, `LICENSE.md`, `THIRD_PARTY_NOTICES.md`, and `UPSTREAM.md`
- Keep the in-app **Credits** that acknowledge Recordly and OpenScreen
- Don't use the Recordly or OpenScreen names or logos as if your build were an official release of those projects
- Keep the AGPL obligations when you offer a network service based on this code
