# Staging Deployment

Run a separate staging copy of the share worker in hosted mode before you change production.

> [!CAUTION]
> Use separate D1, R2, and rate-limit resources for staging and production. Never commit account IDs, resource IDs, user IDs, or deployment URLs.

## 1️⃣ Create resources

| Resource | Example name | Notes |
| --- | --- | --- |
| D1 database | `recordly-share-staging-db` | Initialize it with `schema.sql` |
| R2 bucket | `recordly-videos-staging` | Keep public access off |
| Rate limiters | Two namespaces | Different from production |

Add an R2 lifecycle rule that aborts unfinished multipart uploads after 7 days.

## 2️⃣ Configure

Use `wrangler.staging.jsonc`. It sets `HOSTED_MODE=true`, enables `workers.dev`, and turns off preview URLs, custom domains, and API-secret uploads. Put your real IDs in an untracked local file. Never add a service-role key.

Optionally set `STAGING_ALLOWED_USER_ID` so that only one verified account can use staging.

## 3️⃣ Validate and deploy

Build the web assets, then do a dry run without publishing:

```sh
npm --prefix web run build
npx wrangler deploy --dry-run --experimental-provision=false --config wrangler.staging.jsonc --outdir /tmp/recordly-share-staging-build
```

When the dry run passes, deploy with the same config, without `--dry-run`. If your resources already exist, `--experimental-provision=false` skips automatic provisioning.

## 🛡️ What hosted mode enforces

| Area | Behavior |
| --- | --- |
| **Auth** | Every request needs a verified Supabase session with a confirmed email. Shared API secrets and dashboard cookies are ignored |
| **Ownership** | The owner comes from the session, never from the request. Every upload, renew, and delete checks ownership. Public share links still play for anyone |
| **Quota** | 5 recordings per account, reserved atomically. Deleting a recording frees its slot |
| **Uploads** | Up to 1 GB per recording and 2 MiB per thumbnail. Direct uploads up to 50 MiB; larger files use 25 MiB multipart chunks. Transfers time out after 5 minutes |
| **Rate limits** | 120 requests per minute per IP, and 60 per minute per account |
| **Expiry** | 14 days on the free plan. Free renewals are refused |
| **Cleanup** | Runs hourly (`17 * * * *`). Removes expired recordings and reservations older than 24 hours, 100 at a time |

## ✅ Before production

- [ ] Run `npm test` in the worker folder
- [ ] Check that unsigned requests to `/api/health` and `/api/videos` return `401`
- [ ] Upload, play, and delete a test recording from the desktop app
- [ ] Confirm that a second account can't see or change the first account's recordings
- [ ] Test a large multipart upload over a real network
- [ ] Watch at least one scheduled cleanup succeed
- [ ] Set up usage alerts
- [ ] Add the exact staging origin to the desktop allowlist. Don't allow wildcard `workers.dev` origins
