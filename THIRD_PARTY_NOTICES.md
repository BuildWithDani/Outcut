# Third-Party Notices

Outcut AI includes the third-party components below, in addition to the npm packages listed in `package.json`.

| Component | Used for | License | Copyright |
| --- | --- | --- | --- |
| [Voom](https://github.com/aritropaul/voom) | Share worker in `services/recordly-share/worker` | MIT | © 2026 Aritro Paul |
| [Solar Icon Set](https://github.com/480-Design/Solar-Icon-Set) | App icons, rendered with `@solar-icons/react` (MIT) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 480 Design |
| [DM Sans](https://github.com/googlefonts/dm-fonts) | App typeface | [SIL OFL 1.1](./src/assets/fonts/dm-sans/OFL.txt) | © 2014 The DM Sans Project Authors |

## Voom

The share worker is adapted from Voom at upstream commit `c1c0350ed610b0c9bc4a307fcc6a01aab0f926f9`.
Recordly added product branding, desktop publishing, authenticated comments, local development setup, and viewer styling. Outcut AI also rebrands user-facing share pages that are built from source.

<details>
<summary><strong>View the Voom MIT License</strong></summary>

```text
MIT License

Copyright (c) 2026 Aritro Paul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

</details>

## Solar Icons

Solar Icon Set by 480 Design, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The muted-microphone icon is modified with an added diagonal stroke.

## DM Sans

DM Sans is licensed under the SIL Open Font License 1.1. The unmodified regular and italic variable fonts come from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/dmsans). The full license is in [`src/assets/fonts/dm-sans/OFL.txt`](./src/assets/fonts/dm-sans/OFL.txt).
