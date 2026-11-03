# In-app announcements

Outcut AI can show dismissible announcements in the editor as a popup, carousel slide, lightweight live notification, or header banner. Popups can contain images or video; notifications and banners are text-only with optional buttons.

## Remote announcements

Edit [`announcements.json`](../announcements.json) on the default branch to publish an announcement without releasing a new app version. Released clients check the raw GitHub file at most once every six hours per running app instance. Fetch failures are silent and never block startup.

Use Outcut AI naming in titles and bodies. Do not present Recordly-owned marketing URLs as official Outcut destinations.

Example shape:

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

Keep announcement media URLs on infrastructure you control. Avoid committing large temporary verification screenshots into this repository; attach them to pull requests or CI artifacts instead.
