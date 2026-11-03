# Cloud Sharing

> [!NOTE]
> Cloud sharing is **optional**. Exporting an MP4 or GIF is the supported way to share videos today.

The share worker in `services/recordly-share` stays in the repository for compatibility with Recordly and for a future, independently hosted Outcut Cloud.

## 📋 Policy

- Production Outcut builds must not use Recordly-owned share servers, unless BuildWithDani has explicit permission and users know which service they are using.
- Share buttons must fail gracefully when no cloud service is configured.
- The desktop app still accepts upstream-compatible share origins (`videos.recordly.dev`, the staging worker, and localhost) until Outcut Cloud exists. That doesn't make them official Outcut services.

## 🛠️ Self-host the share worker

1. Follow the [share worker guide](../services/recordly-share/worker/README.md).
2. Create your own Cloudflare Worker, R2 bucket, D1 database, and auth secrets.
3. Point `VITE_CLOUD_SHARE_ENDPOINT` in your desktop build at your deployment's `/api/upload` URL.

Never commit secrets or account IDs to the repository.
