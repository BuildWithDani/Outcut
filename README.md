<p align="center">
  <img width="160" alt="Outcut AI logo" src="./assets/branding/outcut-logo.svg" />
</p>

<p align="center">
  <strong>Outcut AI</strong> — free, open-source screen recording and video editing for creators who want polished captures without a cloud lock-in.
</p>

<p align="center">
  <a href="https://github.com/BuildWithDani/Outcut/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-AGPL--3.0-1D8070?style=flat-square" alt="AGPL-3.0" /></a>
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-0D312B?style=flat-square" alt="macOS Windows Linux" />
  <a href="https://github.com/BuildWithDani/Outcut"><img src="https://img.shields.io/badge/maintainer-BuildWithDani-35BCA6?style=flat-square" alt="BuildWithDani" /></a>
</p>

# Outcut AI

Outcut AI is a desktop recorder and editor maintained by [BuildWithDani](https://github.com/BuildWithDani). Capture a display or window, jump straight into a timeline, polish cursor motion, frame the scene, annotate, and export locally — all without requiring an account for core use.

The product is independently branded and maintained. Its eligible recording and editing engine is derived from [Recordly](https://github.com/webadderallorg/Recordly) (AGPL-3.0), which itself began from [OpenScreen](https://github.com/siddharthvaddem/openscreen) (MIT). See [NOTICE.md](./NOTICE.md) and [UPSTREAM.md](./UPSTREAM.md). BuildWithDani does **not** claim authorship of inherited Recordly or OpenScreen code.

> **AI Director 2.0** is on the roadmap as a bring-your-own-agent layer for guided editing. It is **not implemented** in this repository yet. Manual recording and editing are the shipped foundation.

## Overview

Outcut AI keeps the professional desktop workflow in one place:

1. Record screen (and optional microphone / system audio / webcam).
2. Edit on a real timeline with zooms, speed regions, crops, and annotations.
3. Style the frame with backgrounds, padding, shadows, and cursor effects.
4. Export MP4 or GIF locally.

Optional cloud sign-in UI remains in the tree for a future Outcut Cloud and for compatibility with upstream auth plumbing. Local save, open, edit, and export do not require signing in.

## Capabilities (shipped)

### Recording

- Full display or single-window capture
- Microphone and system audio where the platform supports it
- Native capture helpers on macOS (ScreenCaptureKit) and Windows (WGC); Linux via Electron capture APIs
- Direct handoff into the editor after a take

### Editing

- Drag-and-drop timeline with trim
- Manual and automatic zoom regions
- Speed-up / slow-down regions
- Text, image, and figure annotations
- Crop, aspect ratio, padding, shadow, and wallpaper backgrounds
- Webcam bubble overlays
- Cursor show/hide, sizing, styles, and click effects
- Project files using the `.recordly` extension (compatibility preserved)

### Export and extensibility

- MP4 and GIF export
- Settings and keyboard shortcuts
- Community extension hooks (see [EXTENSIONS.md](./EXTENSIONS.md))

### Roadmap (not shipped)

- **AI Director 2.0** — agent-assisted editing on top of the manual editor, designed for bring-your-own-agent workflows
- Independently hosted Outcut Cloud (optional; not required for desktop use)

## Platforms

| Platform | Support notes |
| --- | --- |
| **macOS** 14.0+ | Native ScreenCaptureKit helpers |
| **Windows** 10 (19041+) | Native WGC capture; WASAPI audio |
| **Linux** | Electron capture; Wayland uses the system picker; cursor hiding not supported today |

## Install

Release installers will appear on the [Releases](https://github.com/BuildWithDani/Outcut/releases) page when BuildWithDani publishes them.

Until then, build from source.

## Build from source

Requirements:

- Node.js 20+ (22 verified on Windows)
- Rust toolchain for native helpers
- Platform SDKs for Electron native modules

```bash
git clone https://github.com/BuildWithDani/Outcut.git
cd Outcut
npm install --legacy-peer-deps
npm run dev
```

Useful commands:

```bash
npm run typecheck
npm test
npm run build:win    # Windows
npm run build:mac
npm run build:linux
```

Regenerate application icons from the canonical SVG (do not edit the SVG geometry or gradient):

```bash
npm install --no-save sharp png2icons
npm run icons:outcut
```

Canonical logo: [`assets/branding/outcut-logo.svg`](./assets/branding/outcut-logo.svg)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

- Issues and feature requests: https://github.com/BuildWithDani/Outcut/issues
- Security reports: [SECURITY.md](./SECURITY.md)

## License and attribution

Outcut AI is licensed under the **GNU Affero General Public License v3.0**. See [LICENSE.md](./LICENSE.md).

| Document | Purpose |
| --- | --- |
| [NOTICE.md](./NOTICE.md) | Copyright layering and Outcut-authored surfaces |
| [UPSTREAM.md](./UPSTREAM.md) | Recordly / OpenScreen provenance and compatibility contracts |
| [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) | Third-party components |
| [TRADEMARKS.md](./TRADEMARKS.md) | Outcut, Recordly, and OpenScreen marks |

In-app **Credits** (home sidebar) repeats Recordly and OpenScreen attribution for end users.

## Maintainer

[BuildWithDani](https://github.com/BuildWithDani) — independent maintenance of Outcut AI branding, packaging, documentation, and future original features on properly attributed upstream source.
