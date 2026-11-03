# Golden Gate Cursors

Vector versions of three macOS 27.2 system hand cursors. They were converted with Poppler `pdftocairo -svg` from the PDFs in
`ApplicationServices.framework/Frameworks/HIServices.framework/Resources/cursors/macos27`, and keep the original 32 × 32 canvas.

| Cursor | Hotspot (points) |
| --- | --- |
| Pointing hand | 12, 8 |
| Open hand | 15, 16 |
| Closed hand | 15, 16 |

Hotspots come from each cursor's `info.plist`.

Golden Gate replaces only these three cursors. Every other state uses the Tahoe artwork. The saved style IDs `tahoe` and `tahoe-inverted` stay the same so existing projects still load. The editor labels them **Golden Gate** and **Golden Gate Inverted**.
