# Email Setup

Sign-in emails (magic links and sign-up confirmation) are sent by Supabase Auth. Use custom SMTP in production, because Supabase's built-in sender is heavily rate-limited.

## 📮 Connect an SMTP provider

The steps below use [Resend](https://resend.com/docs/send-with-supabase-smtp), but any SMTP provider works.

1. Add a sending subdomain in your provider, for example `auth.example.com`, and add the DNS records it gives you (DKIM and return-path).
2. Create an API key with **sending-only** access to that domain.
3. In Supabase, go to **Authentication → Emails → SMTP Settings** and enter:

   | Setting | Value (Resend) |
   | --- | --- |
   | Host | `smtp.resend.com` |
   | Port | `465` (TLS) |
   | Username | `resend` |
   | Password | Your API key |
   | Sender | `Outcut AI <noreply@auth.example.com>` |

4. Save, reload the page, and check that the settings were kept.

> [!NOTE]
> Turning on custom SMTP sets the email rate limit to 30 per hour by default. Raise it before launch if you need to.

## 🎨 Email templates

Paste these into **Authentication → Emails → Templates**:

| Template | File | Suggested subject |
| --- | --- | --- |
| Magic link | [`templates/magic-link.html`](./templates/magic-link.html) | Your sign-in link for Outcut AI |
| Confirm sign-up | [`templates/confirm-sign-up.html`](./templates/confirm-sign-up.html) | Verify your email for Outcut AI |

Keep Supabase's `{{ .ConfirmationURL }}` placeholder in each template.

## 🔗 How the link reaches the app

The app requests the link with a PKCE client and sets the redirect itself:

| Build | Redirect |
| --- | --- |
| Development | `http://127.0.0.1:43821/auth/callback` |
| Packaged | `recordly://auth/callback` |

Users must request and open the link on the same computer, with Outcut AI running.

> [!TIP]
> A test email sent from the Supabase dashboard redirects to the Site URL. It doesn't test the desktop sign-in. To test end to end, request the link from the app itself.
