<div align="center">

<img src="./assets/branding/outcut-logo.svg" width="120" alt="Outcut AI logo" />

# Outcut AI

**Record. Edit. Export. All on your machine.**

A free, open-source screen recorder and video editor for creators who want polished videos without cloud lock-in.

[![Code Quality](https://github.com/BuildWithDani/Outcut/actions/workflows/quality.yml/badge.svg)](https://github.com/BuildWithDani/Outcut/actions/workflows/quality.yml)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-1D8070?style=flat-square)](./LICENSE.md)
[![Platforms](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-0D312B?style=flat-square)](#-platforms)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-35BCA6?style=flat-square)](./CONTRIBUTING.md)

[**Quick start**](#-quick-start) · [**Report a bug**](https://github.com/BuildWithDani/Outcut/issues/new?template=bug_report.yml) · [**Request a feature**](https://github.com/BuildWithDani/Outcut/issues/new?template=feature_request.yml)

**English** · [简体中文](./README.zh-CN.md)

</div>

---

## ✨ Highlights

<table>
<tr>
<td width="50%" valign="top">

### 🎥 Record

- Full display or single-window capture
- Microphone and system audio
- Webcam bubble overlay
- Native capture on macOS and Windows

</td>
<td width="50%" valign="top">

### ✂️ Edit

- Timeline with trim and speed regions
- Automatic and manual zoom
- Text, image, and shape annotations
- On-device auto captions

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🎨 Polish

- Cursor styles, sizing, and click effects
- Wallpapers, padding, and shadows
- Crop and aspect-ratio presets
- Smooth cursor motion and framing

</td>
<td width="50%" valign="top">

### 📦 Export

- MP4 and GIF export
- Projects saved locally, fully offline
- Keyboard shortcuts throughout
- Quality settings for every export

</td>
</tr>
</table>

## 💻 Platforms

| Platform | Minimum | Capture engine |
| --- | --- | --- |
| **macOS** | 14 Sonoma | ScreenCaptureKit |
| **Windows** | 10 (build 19041) | Windows Graphics Capture |
| **Linux** | Modern X11 / Wayland desktop | Electron capture (Wayland uses the system picker) |

## 🚀 Quick start

> [!NOTE]
> Installers will be published on [Releases](https://github.com/BuildWithDani/Outcut/releases). Until then, build from source.

You need **Node.js 22+** and Git.

```bash
git clone https://github.com/BuildWithDani/Outcut.git
cd Outcut
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the app in development mode |
| `npm test` | Run the unit tests |
| `npm run lint` · `npm run typecheck` | Check code quality |
| `npm run build:win` · `build:mac` · `build:linux` | Package an installer |

Packaging builds native capture helpers. These need Xcode on macOS, or Visual Studio C++ build tools and CMake on Windows.

## 🗺️ Roadmap

- [ ] **AI Director 2.0**: guided, agent-assisted editing with your own AI agent
- [ ] **Outcut Cloud**: optional sharing that is never required for the desktop app
- [ ] Signed installers on Releases

## 🤝 Contributing

Contributions are welcome! Read the [contributing guide](./CONTRIBUTING.md) to get started.
Found a vulnerability? Please follow the [security policy](./SECURITY.md) instead of opening a public issue.

## 📄 License

Outcut AI is licensed under the [GNU AGPL-3.0](./LICENSE). See [LICENSE.md](./LICENSE.md) for the Recordly terms and copyright notices, and [TRADEMARKS.md](./TRADEMARKS.md) for brand usage.

## 🙏 Acknowledgements

Outcut AI is built on [**Recordly**](https://github.com/webadderallorg/Recordly) by webadderall, which began as [**OpenScreen**](https://github.com/siddharthvaddem/openscreen) by Siddharth Vaddem. Thank you to both projects and their contributors.
See [NOTICE.md](./NOTICE.md), [UPSTREAM.md](./UPSTREAM.md), and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for full attribution.

---

<div align="center">
<sub>Made with 💚 by <a href="https://github.com/BuildWithDani">BuildWithDani</a></sub>
</div>
