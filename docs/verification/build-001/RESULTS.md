# BUILD 001 verification — Windows

Date: 2026-11-03  
Branch: `chore/outcut-rebrand`  
Upstream base: `109ca3a13c362e969d9add25d1f93406c36dba2a` (Recordly)

## Build

- `npm run typecheck` — passed
- Vite production build — passed (after installing HeroUI `@react-aria/*` peers required by current lock resolution)
- `npx electron-builder --win` — passed
- Artifacts (local, not committed):
  - `release/win-unpacked/OutcutAI.exe`
  - `release/Outcut AI-windows-x64.exe`

## Launch checks

| Check | Result |
| --- | --- |
| App launches as Outcut AI | Pass — process `OutcutAI`, window title `Outcut AI Editor` |
| Official logo displays | Pass — title bar, sidebar, welcome modal |
| Home / recorder CTA visible | Pass — `+ Record new` on home sidebar |
| Editor shell loads | Pass — home/editor chrome behind onboarding |
| Credits visible | Pass — `Credits` entry in home sidebar |
| Timeline unchanged | Not fully exercised in this pass (no project media loaded; UI chrome preserved) |
| Recording controls | Not fully exercised (sign-in gate / cloud notice); HUD code paths untouched |
| Save/open `.recordly` | Not exercised this pass (format intentionally unchanged) |
| MP4/GIF export | Not exercised this pass |

## Screenshots

- `outcut-editor-window.png` — packaged app home + Welcome to Outcut AI
- `outcut-128.png` / `outcut-512.png` — generated logo samples
- `primary-desktop.png` — primary monitor capture (app was often on a secondary display)

## Icon clarity note

Canonical SVG renders correctly at 32–512px. At **16px**, the cut-circle mark remains recognizable but soft; the approved source was not altered.
