# Hosted Mode

Self-hosting for a single owner is the default. **Hosted mode** lets many verified accounts each keep their own library.

> [!CAUTION]
> Keep hosted settings in your own Wrangler configuration. Never commit account IDs, user IDs, credentials, or real deployment URLs.

## ⚙️ Configuration

Keep the `DB`, `VIDEOS_BUCKET`, and `ASSETS` bindings and the scheduled cleanup trigger from `wrangler.jsonc`, then add:

| Setting | Value |
| --- | --- |
| `HOSTED_MODE` | `true` |
| `SUPABASE_URL` | The HTTPS URL of your auth project |
| `SUPABASE_PUBLISHABLE_KEY` | That project's publishable key. Never a service-role key |
| `REQUEST_RATE_LIMIT`, `ACCOUNT_RATE_LIMIT` | Cloudflare rate-limit bindings. Hosted requests are refused without both |
| `STAGING_ALLOWED_USER_ID` (optional) | Limits a staging deployment to one verified user |

Deploy the Worker first. Then set `VITE_CLOUD_SHARE_ENDPOINT` in the desktop build to its HTTPS `/api/upload` URL. Without an endpoint, production builds show cloud sharing as unavailable.

## 📏 Free limits

| Limit | Value |
| --- | --- |
| Recordings per account | 5, including pending uploads |
| Size per recording | 1,000,000,000 bytes |
| Expiry | 14 days |

Scheduled cleanup removes expired recordings and abandoned uploads. Paid plans are not implemented.

## 🗄️ Database

`ensureSchema` upgrades existing databases. Migrations `0008` and `0009` add recording owners and upload sessions. Older recordings without an owner don't appear in hosted libraries, and ownership is never guessed from data the client sends.

Test with a separate database and bucket before you roll out to production.
