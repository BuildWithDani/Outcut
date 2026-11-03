# NOTICE

Outcut AI  
Copyright (C) 2026 BuildWithDani

This product includes software derived from Recordly and OpenScreen.  
BuildWithDani does **not** claim ownership of Recordly-derived or OpenScreen-derived code.

## Provenance

1. **OpenScreen** — Copyright (c) 2025 Siddharth Vaddem  
   Original MIT-licensed project: https://github.com/siddharthvaddem/openscreen  
   See `LICENSE.md` Part 2 for the MIT terms that apply to that original work.

2. **Recordly** — Copyright (C) 2026 webadderall  
   Independent AGPL-3.0 application derived from OpenScreen:  
   https://github.com/webadderallorg/Recordly  
   Upstream commit used as the Outcut AI rebrand base:  
   `109ca3a13c362e969d9add25d1f93406c36dba2a`

3. **Outcut AI** — Copyright (C) 2026 BuildWithDani  
   Independent branding, documentation, icon assets, attribution surfaces, theme tokens,
   repository presentation, and future independently authored features developed by
   BuildWithDani on top of the Recordly codebase.  
   Repository: https://github.com/BuildWithDani/Outcut

## Independently authored Outcut AI surfaces

Paths authored or substantially rewritten by BuildWithDani for Outcut AI (non-exhaustive; does not claim ownership of Recordly/OpenScreen program logic):

- `assets/branding/outcut-logo.svg` and generated Outcut icons under `assets/branding/generated/`, `public/app-icons/outcut-*.png`, and regenerated `icons/icons/**`
- `scripts/generate-outcut-icons.mjs`
- `src/styles/outcut-brand.css` and related theme wiring
- `src/components/credits/CreditsDialog.tsx`
- Product documentation: `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `NOTICE.md`, `UPSTREAM.md`, `TRADEMARKS.md`
- Packaging identity for Outcut AI (`package.json` product metadata, `electron-builder.json5` product fields, `outcut.rb`)

All other application functionality remains Recordly-derived (itself OpenScreen-derived where applicable) and continues under AGPL-3.0 with the upstream copyright notices preserved in `LICENSE.md`.

## Required attribution

When redistributing Outcut AI or a modified version:

- Preserve this `NOTICE.md`, `LICENSE.md`, `THIRD_PARTY_NOTICES.md`, and `UPSTREAM.md`
- Keep user-facing Credits acknowledging Recordly and OpenScreen
- Do not use Recordly or OpenScreen names/logos as if Outcut AI were an official release of those projects
- Do not remove AGPL obligations when offering network services based on this code
