# In-App Announcements

Outcut AI can show dismissible announcements in the editor without a new app release.

| Style | Can include |
| --- | --- |
| **Popup** | Text, images, or video, plus buttons |
| **Carousel slide** | Several pages in one popup |
| **Notification** | Short text with optional buttons |
| **Header banner** | Short text with optional buttons |

## 📣 Publishing an announcement

Edit [`announcements.json`](../announcements.json) on the default branch. Released apps check that file on GitHub at most once every six hours. If the check fails, nothing happens and startup is never blocked.

```json
{
  "settings": {
    "aspectRatio": "4:3"
  },
  "announcements": [
    {
      "id": "outcut-welcome",
      "title": "Welcome to Outcut AI",
      "body": "Local recording and editing work without an account.",
      "presentation": "popup",
      "audience": "editor",
      "priority": 10,
      "controls": {
        "close": true,
        "dismiss": true,
        "action": false,
        "navigation": false,
        "indicators": true
      }
    }
  ]
}
```

## ✅ Guidelines

- Use Outcut AI naming in titles and text.
- Host images and video on infrastructure you control.
- Don't link to Recordly-owned marketing pages as if they were Outcut pages.
- Don't commit large screenshots for testing. Attach them to pull requests instead.
