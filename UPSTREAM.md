# Upstream provenance

## Outcut AI

- Project: Outcut AI
- Maintainer: BuildWithDani
- Repository: https://github.com/BuildWithDani/Outcut
- License: GNU Affero General Public License v3.0 (AGPL-3.0)

## Immediate upstream: Recordly

- Project: Recordly
- Author: webadderall
- Repository: https://github.com/webadderallorg/Recordly
- License: AGPL-3.0 (with additional trademark/attribution terms in `LICENSE.md`)
- Verified source commit for the Outcut rebrand base: `109ca3a13c362e969d9add25d1f93406c36dba2a`  
  (`Merge pull request #1147 from webadderallorg/codex/mac-audio-gap-timing`)

Outcut AI preserves Recordly’s eligible recorder, editor, timeline, webcam, cursor, export, settings, extensions, and project workflows. Subsequent Outcut commits add branding, documentation, packaging identity, dismissible onboarding, teal theme tokens, and repository cleanup — not a second editor.

## Earlier upstream: OpenScreen

- Project: OpenScreen
- Author: Siddharth Vaddem (2025)
- Repository: https://github.com/siddharthvaddem/openscreen
- License: MIT

Recordly originally started as a fork of OpenScreen. OpenScreen attribution and MIT terms remain in `LICENSE.md`.

## Compatibility contracts (intentionally preserved)

| Area | Status |
| --- | --- |
| `.recordly` project files | Preserved for open/save compatibility |
| `recordly.*` localStorage / settings keys | Preserved |
| Auth deep-link schemes `recordly://` / `recordly-dev://` | Preserved for existing redirect configuration; `outcut://` is also registered |
| MIME / UTI `dev.recordly.app.project` | Preserved for document-type continuity |
| Native helper binary names (`recordly-*-helper`, `recordly-gpu-export`, …) | Preserved where packaging and spawn paths depend on them |
| Internal TypeScript symbols (e.g. `RecordlySignInDialog`) | Preserved where rename churn has no user benefit |
| `services/recordly-share` | Retained as optional upstream-compatible share worker; not an official Outcut Cloud |

## Cloud / authentication

Local recording, editing, save/open, and export do **not** require an Outcut account.

Optional sign-in UI remains for future Outcut Cloud and Recordly auth plumbing (Supabase client, magic-link templates, share worker). Until Outcut operates authorized cloud endpoints:

- Do not present Recordly-owned cloud URLs as official Outcut services
- Treat cloud account features as optional / future
- Welcome onboarding is dismissible via **X**, **Escape**, or **Continue without an account**

## Remotes

- History retained from `https://github.com/webadderallorg/Recordly`
- Destination repository: `https://github.com/BuildWithDani/Outcut`

## Active Git history note

The default branch may use a fresh import commit that preserves this source tree without replaying upstream commit parents. Full Recordly-derived ancestry remains on archive refs (`archive/outcut-with-upstream-history`). Legal attribution in this file and `NOTICE.md` is unaffected.

## External services

See [docs/EXTERNAL_SERVICES.md](./docs/EXTERNAL_SERVICES.md) for the BUILD 001.4 service inventory.
