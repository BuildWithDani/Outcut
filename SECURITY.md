# Security Policy

## Supported versions

Security fixes for Outcut AI are applied on the default branch of https://github.com/BuildWithDani/Outcut and on subsequently published release tags when maintainers cut them.

Older unofficial builds, forks, and unverified installers are outside the supported set unless a maintainer explicitly states otherwise.

## Reporting a vulnerability

Prefer GitHub Security Advisories for this repository:

https://github.com/BuildWithDani/Outcut/security/advisories/new

If advisories are unavailable, contact the [BuildWithDani](https://github.com/BuildWithDani) organization through GitHub and request a private channel. Do **not** open a public issue with exploit details, credentials, or private media.

Please include:

- Affected platform (Windows / macOS / Linux)
- Outcut AI version or commit SHA
- Clear reproduction steps
- Impact (confidentiality, integrity, availability)
- Whether local project files, recordings, auth tokens, or clipboard/media paths are involved

## Response expectations

Maintainers will acknowledge valid reports when practical and coordinate disclosure after a fix or mitigation is available. There is **no guaranteed response-time SLA** in this document.

## Privacy and local media

Outcut AI stores recordings, project files, and editor state on the user’s machine. Treat local media paths, project JSON, and optional auth tokens as sensitive. Reports involving:

- Path traversal or arbitrary file write during import/export
- Unsafe deserialization of project or extension payloads
- Credential leakage in logs, updater channels, or auth redirects
- Privilege issues in native capture helpers

…are especially valuable.

Optional cloud and share-worker code may still reference upstream Recordly-era infrastructure. Do not treat Recordly-owned endpoints as official Outcut production services. See [docs/EXTERNAL_SERVICES.md](./docs/EXTERNAL_SERVICES.md). Vulnerabilities that also affect upstream Recordly may be shared upstream at https://github.com/webadderallorg/Recordly after Outcut users are protected, when appropriate.

## Out of scope (examples)

- Issues that require physical access to an unlocked machine with the user’s project directory already open
- Social-engineering of end users outside the application
- Denial of service via intentionally enormous media files without a security boundary bypass
- Feature requests filed as security issues

## Future agent tools

When AI Director 2.0 or bring-your-own-agent tooling lands, treat agent tool permissions, prompt injection against local files, and secret exfiltration as first-class security concerns. Until that code ships, speculative agent attack reports should target the design discussion rather than claiming a shipped vulnerability.
