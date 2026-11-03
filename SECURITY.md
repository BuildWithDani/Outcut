# Security Policy

Outcut AI keeps your recordings and projects on your own machine, and we take that trust seriously. 🔒

## ✅ Supported versions

| Version | Supported |
| --- | :---: |
| Latest release | ✅ |
| `main` branch | ✅ |
| Older releases, forks, and unofficial builds | ❌ |

## 📬 Report a vulnerability

> [!CAUTION]
> Please **do not** open a public issue for security problems.

Report privately through **[GitHub Security Advisories](https://github.com/BuildWithDani/Outcut/security/advisories/new)**.

Please include:

- Your platform (Windows, macOS, or Linux) and the Outcut AI version or commit
- Steps to reproduce
- The impact, and what data is exposed

## 🔄 What happens next

1. We confirm we received your report.
2. We investigate and work on a fix.
3. We release the fix and credit you, unless you'd rather stay anonymous.

This is a community project, so responses are best-effort and come without a guaranteed timeline.
Issues that also affect Recordly may be shared with the upstream project once Outcut AI users are protected.

## 🎯 Scope

| In scope | Out of scope |
| --- | --- |
| Path traversal or unsafe file writes during import or export | Attacks that need physical access to an unlocked machine |
| Unsafe parsing of project files or extensions | Social engineering outside the app |
| Leaked tokens or credentials in logs, updates, or auth redirects | Denial of service from intentionally huge media files |
| Privilege issues in native capture helpers | Feature requests filed as security issues |

Optional cloud and sharing code may still point at upstream Recordly services. Those are not official Outcut services. See [docs/EXTERNAL_SERVICES.md](./docs/EXTERNAL_SERVICES.md).
