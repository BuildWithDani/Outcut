# Onboarding

Onboarding is a two-page carousel, **Account** and **Permissions**, switched with the pagination buttons at the bottom. The Outcut AI logo sits above the title on each page.

| Part | File |
| --- | --- |
| Layout and banner | `src/components/auth/OnboardingLayout.tsx` |
| Permission controls and **Start recording** | `src/components/auth/OnboardingPermissions.tsx` |
| Banner image | `public/auth/login-banner.png` |

- Signing in is optional. Users can close onboarding with **X**, **Escape**, or **Continue without an account**.
- The banner fills the space the page content leaves free, and shrinks to a minimum height in short windows. The form stays scrollable and the bottom navigation stays visible.
