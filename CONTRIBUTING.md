# Contributing to Outcut AI

Thank you for helping improve Outcut AI. This project is maintained by [BuildWithDani](https://github.com/BuildWithDani) and includes substantial code derived from Recordly and OpenScreen. Keep attribution accurate and product branding consistent.

## Report an issue

Open a bug report at https://github.com/BuildWithDani/Outcut/issues and include:

- Outcut AI version or git commit SHA
- Operating system and version
- Steps to reproduce
- Expected vs actual behavior
- Relevant logs (without secrets, API keys, or private media paths)

Security-sensitive findings belong in [SECURITY.md](./SECURITY.md), not public issues.

## Request a feature

Use the feature-request issue template. Prefer concrete workflows over slogans. Features that depend on **AI Director 2.0** should be labeled as roadmap items — that subsystem is not shipped yet.

## Local development

```bash
git clone https://github.com/BuildWithDani/Outcut.git
cd Outcut
npm install
npm run dev
```

Prefer cloning into a folder named `Outcut` (not `Recordly`). In Cursor or VS Code, open [`Outcut.code-workspace`](./Outcut.code-workspace) so the window title shows **Outcut AI**.

`.npmrc` enables `legacy-peer-deps=true` so local installs match GitHub Actions (`npm ci`).

Common checks:

```bash
npm run typecheck
npm run lint
npm test
npm run test:ui   # Playwright UI suite when changing onboarding/editor chrome
```

Platform packaging:

```bash
npm run build:win
npm run build:mac
npm run build:linux
```

Native helpers may require Rust and platform SDKs. Prefer reproducing capture/export bugs on the OS you changed.

## Code conventions

- Match existing TypeScript / React / Electron patterns in the area you touch.
- Prefer focused diffs. Do not redesign Recordly-derived editor layout unless an issue asks for it.
- Keep user-facing product name **Outcut AI** and the teal brand tokens in `src/styles/outcut-brand.css`.
- Do not modify `assets/branding/outcut-logo.svg` geometry, gradient, or colors.
- Preserve compatibility contracts listed in [UPSTREAM.md](./UPSTREAM.md) (`.recordly` projects, `recordly.*` settings keys, auth schemes) unless you ship a tested migration.
- Do not connect contributors’ builds to Recordly-owned production cloud endpoints as if they were Outcut Cloud.
- Do not invent Outcut Cloud billing or AI Director 2.0 behavior in cleanup PRs.

## Tests and pull requests

1. Fork https://github.com/BuildWithDani/Outcut (or push a branch if you have write access).
2. Create a branch named for the change (`fix/…`, `feat/…`, `docs/…`, `chore/…`).
3. Run typecheck, lint, and the tests relevant to your change.
4. Open a pull request against the default branch (`main`).
5. Describe the problem, the approach, and how you validated it.
6. Link related issues.

Reviewers look for correctness, compatibility, attribution, and scope control. Large unrelated refactors slow review and may be asked to split.

## Contributor licensing

By contributing, you agree that your contributions are licensed under the [GNU Affero General Public License v3.0](./LICENSE.md), and that you have the right to submit them under that license.

## AI-assisted contributions

AI tools may be used to draft or edit patches. Contributors remain responsible for:

- Verifying behavior on a real build where feasible
- Not inventing features, credentials, or security guarantees
- Preserving licenses, notices, and upstream attribution
- Avoiding blind search-and-replace across product identity or persisted formats

## Community standards

Be respectful. Harassment, spam, and bad-faith contribution dumps will be rejected.
