# Releasing Outcut AI

Releases are built by GitHub Actions with `electron-builder`. Installed apps update themselves through `electron-updater`, which reads update files from GitHub Releases on macOS, Windows, and Linux.

## 🚀 Release in four steps

1. Set `version` in `package.json`, for example `1.2.3`, then commit and push.
2. Create the release. The helper adds your notes and keeps GitHub's generated changelog and contributor list:

   ```bash
   npm run release:create -- --tag v1.2.3 --title "v1.2.3" --notes-file ./release-notes.md
   ```

   For a prerelease, add `--prerelease`:

   ```bash
   npm run release:create -- --tag v1.2.0-beta.2 --title "v1.2.0 beta 2" --prerelease --notes-file ./release-notes.md
   ```

3. The **Publish Release** workflow (`.github/workflows/release.yml`) builds, signs, and uploads everything.
4. Check the release page for the installers and the `latest*.yml` update files.

## ⚙️ What the workflow does

| Step | Output |
| --- | --- |
| Checks that the tag matches `package.json` | Fails early on a mismatch |
| 🍎 Builds, signs, and notarizes macOS x64 and arm64 | `.dmg`, `.zip`, and one merged `latest-mac.yml` |
| 🪟 Builds and signs Windows | NSIS installer and `latest.yml` |
| 🐧 Builds Linux | AppImage and `latest-linux.yml` |
| 🍺 Starts the Homebrew tap workflow | A pull request to the tap repository |

To re-publish an existing tag, run `release.yml` manually from the **Actions** tab and enter the tag.

## 🔐 Required secrets

| Platform | Secrets |
| --- | --- |
| **macOS** | `APPLE_SIGNING_CERTIFICATE_P12_BASE64`, `APPLE_SIGNING_CERTIFICATE_PASSWORD`, `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` |
| **Windows** | `WINDOWS_SIGNING_CERTIFICATE_P12_BASE64`, `WINDOWS_SIGNING_CERTIFICATE_PASSWORD` |
| **Homebrew** (optional) | `HOMEBREW_TAP_TOKEN` secret, plus optional `HOMEBREW_TAP_REPO` and `HOMEBREW_TAP_AUTO_MERGE` variables |

> [!IMPORTANT]
> macOS needs a **Developer ID Application** certificate. An **Apple Development** certificate is not enough for notarized public releases or auto-updates.

To export the macOS certificate and copy it as base64:

```bash
security export -k ~/Library/Keychains/login.keychain-db -t identities -f pkcs12 -P "YOUR_P12_PASSWORD" -o outcut-mac-signing.p12
base64 < outcut-mac-signing.p12 | pbcopy
```

Paste the result into `APPLE_SIGNING_CERTIFICATE_P12_BASE64`, and the export password into `APPLE_SIGNING_CERTIFICATE_PASSWORD`. For Windows, export your Authenticode certificate as `.p12` and base64-encode it the same way.

## 📝 Notes

- macOS auto-updates need the `zip` target as well as `dmg`, because `latest-mac.yml` is generated from the zip.
- The x64 and arm64 update files are merged into one `latest-mac.yml`, so each Mac downloads the right build.
- Artifact names include the version, so the update files always match the uploaded installers.
- `build.yml` always uses `--publish never`, so regular CI builds never upload to a release.
