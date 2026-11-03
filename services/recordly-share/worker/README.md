# Share Worker

A self-hosted service for publishing and reviewing videos, built on **Cloudflare Workers**. It is optional, and not an official Outcut Cloud.

| Feature | Details |
| --- | --- |
| 🎬 Streaming | Range streaming from R2 with a responsive viewer |
| 💬 Feedback | Timestamped comments and reactions. Viewers don't need an account |
| 🔒 Access | Passwords, expiration dates, and a private recording library |
| 🗄️ Storage | R2 for video, D1 for metadata |

## 🧑‍💻 Local development

```sh
cp .dev.vars.example .dev.vars
npm install
npm --prefix web install
npm --prefix web run build
npm run dev
```

In `.dev.vars`, set:

| Variable | Value |
| --- | --- |
| `OWNER_USER_ID` | The Supabase user ID of the library owner |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | The same public project settings the desktop app uses |
| `API_SECRET` | Server-side password for library administration |

The desktop app uploads to `http://localhost:8787/api/upload` with the user's access token, which the Worker validates.

> [!WARNING]
> `ALLOW_API_SECRET_UPLOADS=true` allows uploads with the API secret. Use it only for isolated local tests, never in production.

## 🚀 Deploy

```sh
npm install
npm --prefix web install
npm --prefix web run build
npx wrangler secret put API_SECRET
npx wrangler secret put SUPABASE_PUBLISHABLE_KEY
npm run deploy
```

Set `SUPABASE_URL` as a Worker variable. A new deployment creates the `recordly-share-db` database and the `recordly-videos` bucket.

## 📚 More guides

| Guide | Covers |
| --- | --- |
| [HOSTED.md](./HOSTED.md) | Multi-account hosted mode |
| [STAGING.md](./STAGING.md) | Running a separate staging deployment |
| [CREATOR_PROFILE.md](./CREATOR_PROFILE.md) | The public creator profile shown on recordings |

## 🗂️ Source layout

| File | Responsibility |
| --- | --- |
| `src/index.js` | Fetch and scheduled entry points, error handling |
| `router.js` | Routing and access checks |
| `schema.js` | Database setup and migrations |
| `auth.js`, `accounts.js` | Owner access, video passwords, viewer accounts |
| `uploads.js` | Upload creation, multipart transfers, metadata |
| `media.js` | Streaming, captions, share data, social previews |
| `feedback.js` | Comments and reactions |
| `library.js` | Listing, renewal, deletion, view counts, expiry cleanup |
| `crypto.js`, `http.js`, `video.js` | Shared helpers |

Run `npm test` in this folder to test the endpoints and migrations.

## 📄 Attribution

Adapted from the MIT-licensed [Voom](https://github.com/aritropaul/voom) project. The original notice is kept in [`../LICENSE`](../LICENSE) and in the root [`THIRD_PARTY_NOTICES.md`](../../../THIRD_PARTY_NOTICES.md). Keep both with any copy you distribute.
