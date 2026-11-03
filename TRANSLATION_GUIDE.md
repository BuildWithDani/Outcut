# Translation Guide

Help bring Outcut AI to more people! 🌍 You can translate the app without touching any app logic.

## 📁 Where translations live

Each language has a folder in `src/i18n/locales/`:

| Code | Language | Code | Language |
| --- | --- | --- | --- |
| `en` | English (source) | `nl` | Dutch |
| `de` | German | `pt-BR` | Portuguese (Brazil) |
| `es` | Spanish | `ru` | Russian |
| `fr` | French | `zh-CN` | Chinese (Simplified) |
| `it` | Italian | `zh-TW` | Chinese (Traditional) |
| `ko` | Korean | | |

Every folder has the same seven files: `common.json`, `launch.json`, `editor.json`, `timeline.json`, `settings.json`, `dialogs.json`, and `shortcuts.json`.

> [!TIP]
> English (`en`) is the source of truth. Every other language must use exactly the same keys.

## ✍️ Rules for keys

- Keep the same key paths in every language.
- Add new keys to `en` first, then to every other language.
- Don't rename existing keys unless you also update the code that uses them.
- Use descriptive, stable names, for example `app.editorTitle`.
- Use `{{name}}` placeholders for values that get filled in, and keep them unchanged in translations.

## 🔎 How the app finds text

- A key such as `settings.export.title` is read from the `settings` file.
- A key with no prefix is read from `common`.
- A missing translation falls back to English, then to the fallback text in the code, then to the key itself.

## ✅ Workflow

1. Pull the latest `main`.
2. Add or update keys in `en/<file>.json`.
3. Add the same keys to the other languages.
4. Check the structure:

   ```bash
   npm run i18n:check
   ```

   This reports missing files, missing keys, and extra keys compared to English.

5. Run the app with `npm run dev` and check the text in the UI.
6. Open a pull request that lists the files you changed.

> [!NOTE]
> Not every UI string uses translations yet. Move strings over one file at a time to keep pull requests small and easy to review.
