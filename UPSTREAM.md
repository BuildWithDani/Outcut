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
- Verified source commit for this Outcut rebrand branch: `109ca3a13c362e969d9add25d1f93406c36dba2a`  
  (`Merge pull request #1147 from webadderallorg/codex/mac-audio-gap-timing`)

Outcut AI preserves Recordly’s eligible recorder, editor, timeline, webcam, cursor, export, settings, extensions, and project workflows. This milestone changes branding, attribution, documentation, and packaging identity only.

## Earlier upstream: OpenScreen

- Project: OpenScreen
- Author: Siddharth Vaddem (2025)
- Repository: https://github.com/siddharthvaddem/openscreen
- License: MIT

Recordly originally started as a fork of OpenScreen. OpenScreen attribution and MIT terms remain in `LICENSE.md`.

## Compatibility notes intentionally preserved

| Area | Status |
| --- | --- |
| `.recordly` project files | Preserved for open/save compatibility |
| `recordly.*` localStorage / settings keys | Preserved |
| Auth deep-link scheme `recordly://` / `recordly-dev://` | Preserved so existing auth redirect configuration continues to work; `outcut://` is also registered |
| MIME / UTI `dev.recordly.app.project` | Preserved for document type continuity |
| Internal code identifiers (e.g. `RecordlySignInDialog`) | Preserved where renaming would be churn without user benefit |

## Remotes used during rebrand

- Upstream history retained from `https://github.com/webadderallorg/Recordly`
- Destination repository: `https://github.com/BuildWithDani/Outcut`
