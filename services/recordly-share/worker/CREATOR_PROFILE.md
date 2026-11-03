# Creator Profile

Recordings on a single-owner share service can show an optional public creator profile.

Set these Worker variables in `.dev.vars` for local development, or in Cloudflare for a deployment:

| Variable | Description | Limit |
| --- | --- | --- |
| `CREATOR_NAME` | Public display name | 100 characters |
| `CREATOR_BIO` | Short description (optional) | 200 characters |
| `CREATOR_WEBSITE` | Public HTTP(S) website (optional) | — |

- The share data endpoint returns these values only after the recording's access checks pass.
- They apply to all existing and future recordings on the service.
- Nothing is read from the account email or the operating system.
- Without a name, viewers see **Creator not provided**.
