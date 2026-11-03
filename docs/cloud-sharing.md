# Cloud sharing (optional / future)

Outcut AI can edit and export entirely offline. Cloud sharing code under `services/recordly-share` is retained for compatibility with upstream Recordly share-worker designs and for a future independently hosted Outcut Cloud.

## Current policy

- Do not point production Outcut builds at Recordly-owned share endpoints unless BuildWithDani has explicit authorization and users are told what service they are using.
- Local MP4/GIF export remains the supported sharing path for this open desktop foundation.
- Account-gated share UI should degrade gracefully when cloud is unavailable (see in-app copy and [UPSTREAM.md](../UPSTREAM.md)).

## Operator notes

If you self-host the share worker:

1. Read `services/recordly-share/worker/README.md` and related staging/hosted docs.
2. Configure your own Cloudflare / R2 / auth secrets.
3. Update desktop environment variables to your deployment — never commit secrets.

AI Director 2.0 and managed AI services are out of scope for this document until those features ship.
