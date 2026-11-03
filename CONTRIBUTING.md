# Contributing to Outcut AI

Thanks for helping make Outcut AI better! 💚
Every bug report, idea, translation, and pull request counts.

## 🧭 Ways to help

| | How |
| :---: | --- |
| 🐞 | **Report a bug**: open a [bug report](https://github.com/BuildWithDani/Outcut/issues/new?template=bug_report.yml) with your OS, app version, and steps to reproduce |
| 💡 | **Suggest a feature**: open a [feature request](https://github.com/BuildWithDani/Outcut/issues/new?template=feature_request.yml) that describes the workflow you need |
| 🌍 | **Translate**: follow the [translation guide](./TRANSLATION_GUIDE.md) |
| 🛠️ | **Write code**: pick an open issue and send a pull request |

> [!IMPORTANT]
> Security issues should **not** go in public issues. Please follow the [security policy](./SECURITY.md).

## ⚙️ Set up

You need **Node.js 22+** and Git.

```bash
git clone https://github.com/BuildWithDani/Outcut.git
cd Outcut
npm install
npm run dev
```

Packaging (`npm run build:win`, `build:mac`, `build:linux`) also builds native helpers. These need Xcode on macOS, or Visual Studio C++ build tools and CMake on Windows.

## 🔀 Pull requests

1. Fork the repo and create a branch such as `fix/timeline-snap` or `feat/gif-presets`.
2. Keep the change focused on one thing.
3. Use [Conventional Commits](https://www.conventionalcommits.org/) for messages: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
4. Open the PR against `main`, explain what changed and why, and link any related issue.

Before you open it, check:

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] `npm run test:ui` passes, if you changed editor or onboarding UI
- [ ] You tested on the OS you changed, for capture or export work

## 📐 Ground rules

- **Match the code around you.** Follow the existing TypeScript, React, and Electron patterns.
- **Keep the brand.** The product name is **Outcut AI**. Don't change `assets/branding/outcut-logo.svg`.
- **Don't break existing projects.** Keep `.recordly` files, `recordly.*` settings keys, and the auth schemes listed in [UPSTREAM.md](./UPSTREAM.md) working.
- **Keep attribution.** Never remove Recordly or OpenScreen credits or license notices.
- **AI-assisted code is welcome**, but you are responsible for it. Test it, and don't invent features or guarantees.

## 📄 License

By contributing, you agree that your work is licensed under the [GNU AGPL-3.0](./LICENSE), with the terms described in [LICENSE.md](./LICENSE.md).

---

<sub>Be kind and respectful. Harassment, spam, and bad-faith contributions will be removed.</sub>
