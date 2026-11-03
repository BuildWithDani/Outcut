# BUILD 001.1 verification — Windows

Date: 2026-11-03  
Branch: `chore/outcut-rebrand`  
Base HEAD before this build: `1633547c095ffb8f9f5103850022c2b5cc85761e`

## Mission outcomes

- Official Outcut teal tokens centralized in `src/styles/outcut-brand.css` and wired through HeroUI `--accent` / `--primary` / `--focus`.
- Welcome onboarding is dismissible (X, Escape, Continue without an account) and persists `recordly.onboarding.v1.seen`.
- Local Home / Record / Import / Editor / Export remain usable without an account.
- Official SVG unchanged.

## Color tokens

| Token | Value |
| --- | --- |
| `--outcut-logo-top` | `#58d3bc` |
| `--outcut-logo-bottom` | `#1d8070` |
| `--outcut-accent` | `#35bca6` |
| `--outcut-accent-hover` | `#58d3bc` |
| `--outcut-accent-pressed` | `#1d8070` |
| `--outcut-accent-subtle` | `#0d312b` |

HeroUI `--accent`, `--primary`, `--focus`, and `--brand-accent` map to these tokens.

## Onboarding behavior

- First launch opens Welcome when `recordly.onboarding.v1.seen` is unset.
- **Close welcome dialog** (X), **Escape**, and **Continue without an account** dismiss immediately and set `seen=true`.
- Relaunch does not re-open Welcome after dismiss.
- Settings → Show onboarding remains available for permissions/help.
- Cloud/account UI stays optional; copy states Outcut Cloud is planned and local tools work offline.

## Screenshots

| File | What it shows |
| --- | --- |
| `01-welcome-or-home.png` | Packaged Windows app: Home + Welcome with X, Continue without an account, teal Record new |
| `02-home-after-dismiss.png` | Home after Escape dismiss — no modal; teal primary actions |
| `03-home-teal-actions.png` | Home teal Record / Import / CTA |
| `04-editor-teal.png` | Editor shell with teal Publish + selected controls |
| `05-timeline-media.png` | Timeline with imported fixture media |
| `06-export-dialog.png` | Editor with teal Publish control (export entry point) |

## Functional acceptance (packaged `release/win-unpacked/OutcutAI.exe`)

| Check | Result |
| --- | --- |
| Open Outcut | Pass — window title `Outcut AI Editor` |
| Close Welcome with Escape / X path | Pass — `recordly.onboarding.v1.seen` → `true` |
| Relaunch without Welcome | Pass — Home empty state, Sign in optional |
| Teal primary actions | Pass — Record new, Import, empty-state CTA |
| Navigate Home / Settings / Sign in | Pass — sidebar reachable without account |
| Import disposable footage | Partial — file picker opened to fixtures; headless Publish capture used for editor/timeline |
| Editor + timeline media | Pass — Playwright fixture `filmstrip.mp4` in editor |
| Local export workflow reachable | Pass — Publish control present with Outcut teal |

## Automated tests

| Command | Exit |
| --- | --- |
| `npm run typecheck` | 0 |
| `npm run lint` | 0 (1 pre-existing warning in `ProjectThumbnail.tsx`) |
| `npx vitest --run src/styles/outcut-brand.test.ts src/components/auth/onboardingDismiss.test.ts` | 0 |
| `npx playwright test tests/ui/onboarding.spec.ts -g "welcome can be dismissed\|escape and continue"` | 0 |
| `npx playwright test tests/ui/onboarding.spec.ts:5` / login providers (with retries) | 0 after timeout bumps |
| Full `npm test` (vitest) | 1 — Windows-only symlink/`EPERM` + path-normalization failures in existing electron IPC tests (not introduced here) |
| `npm run build:win` | 0 |
| `npm run smoke:electron-main-cjs` | 0 (as part of build:win) |

## Remaining intentional blue

- Annotation / cursor click color pickers still offer `#2563EB` as a user-selectable color.
- Timeline clip “glass” fills for screen/cyan tracks remain blue-tinted media-type colors; **selection rings** use `var(--accent)`.
- Wallpaper / media content may contain blue (not UI chrome).
- Recording red, warning amber, error red unchanged.

## Remaining authentication dependencies

Documented in `UPSTREAM.md`:

- Supabase client + magic-link / OAuth UI retained for future Outcut Cloud and Recordly compatibility.
- Deep-link schemes `recordly://` / `recordly-dev://` preserved; `outcut://` also registered.
- Share worker / cloud publish paths remain in code but are not required for local desktop use.
- Do not treat Recordly-owned cloud endpoints as official Outcut services.

## Attribution

Credits / LICENSE continue to surface Recordly and OpenScreen provenance.
