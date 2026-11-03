# Contribution Guidelines

Thank you for considering contributing to **Outcut AI**. By contributing, you help make this project better for everyone.

Areas where help is especially valuable:

- Export optimisations
- Native screen recording for Linux
- Wallpaper submissions
- Extensions (device frames, click effects, render hooks — see [EXTENSIONS.md](./EXTENSIONS.md))
- Documentation and localization polish
- Future AI Director 2.0 work (tracked separately; not part of the rebrand milestone)

## How to Contribute

1. **Fork the Repository**
   - Fork https://github.com/BuildWithDani/Outcut

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/Outcut.git
   ```

3. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**
   - Prefer focused diffs. Do not redesign existing Recordly-derived UI unless the issue asks for it.
   - Preserve `.recordly` project compatibility and existing storage keys unless a migration is explicitly planned.

5. **Test Your Changes**
   - Run lint/typecheck/tests relevant to your change.
   - On Windows, smoke-test recorder and editor when touching capture or packaging.

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add a brief description of your changes"
   ```

7. **Push Your Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Open a PR against https://github.com/BuildWithDani/Outcut
   - Describe the problem, the fix, and how you tested it

## Reporting Issues

Open an issue at https://github.com/BuildWithDani/Outcut/issues with reproduction steps, OS, and Outcut AI version/commit.

Security reports: see [SECURITY.md](./SECURITY.md).

## Upstream relationship

Outcut AI is derived from [Recordly](https://github.com/webadderallorg/Recordly) (AGPL-3.0), which started from [OpenScreen](https://github.com/siddharthvaddem/openscreen) (MIT). See [UPSTREAM.md](./UPSTREAM.md) and [NOTICE.md](./NOTICE.md).

## Style Guide

- Write clear, concise commit messages.
- Comment complex logic where necessary.
- Keep branding as **Outcut AI**; do not reintroduce Recordly logos as product branding.

## License

By contributing, you agree that your contributions are licensed under the [GNU Affero General Public License v3.0](./LICENSE.md).
