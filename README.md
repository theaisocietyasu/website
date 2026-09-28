# The AI Society website

The public site for The AI Society at Arizona State University: home page, team, events, and Relink (the link page used in social bios). The 2024–25 site is kept under `/legacy`.

Next.js 15 (App Router), React 19, Tailwind CSS 3. MongoDB backs Relink and the legacy Software Corner. Officers sign in with Discord. Hosted on Vercel.

## Run it

Needs Node 18+ and npm.

```bash
npm install
cp .env.example .env.local   # fill in values, see below
npm run dev                  # http://localhost:3000
```

The home, team and events pages work without any env vars. Relink and Software Corner need MongoDB and the Discord values.

| Variable | Used for |
| --- | --- |
| `MONGODB_URI` | Relink and Software Corner data |
| `LINKS_COLLECTION_NAME`, `BANNERS_COLLECTION_NAME` | Relink collection names (default `links`, `banners`) |
| `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` | Discord sign-in |
| `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, `ADMIN_ROLE_ID` | Checking that a user holds the officer role in the AIS server |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AUTH_TRUST_HOST` | Session signing |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and the sitemap |

`NEXT_PUBLIC_APP_URL` and the Clerk keys in `.env.example` are not used.

For local Discord sign-in, add `http://localhost:3000/api/auth/callback/discord` as a redirect in the Discord application, and invite its bot to the server with View Server Members.

## Common edits

Most content changes are data edits, not layout edits.

| To change | Edit |
| --- | --- |
| Officers and alumni | `lib/constants.ts` (`EXECUTIVE_BOARD`, `ACADEMIC_OFFICERS`, ..., `AIS_ALUMNI`). Photos go in `public/Officers/`; keep them under ~300 KB. A group with no members is hidden. |
| Programs list | `PROGRAMS` in `lib/site.ts`. Set `photo` to show that photo in the left rail when the row is hovered. |
| Event photos | Add the file to `public/photos/` (WebP, portrait for Programs), then register it in `PHOTOS` in `lib/site.ts`. |
| Initiatives (flagship events and the projects console) | `INITIATIVES` in `lib/site.ts`. No `folder` makes it a flagship tile; a `folder` from `PROJECT_KINDS` files it in `~/ais/projects`. No `href` shows "coming soon". Flagship `image` files live in `public/initiatives/`. |
| Social links, Discord invite, officer application, resume book, calendar | `LINKS` and `SOCIALS` in `lib/site.ts` |
| Nav items | `NAV` in `lib/site.ts` |
| Stats (member count, events per year) | `STATS` in `lib/site.ts` |
| Research partners (labs and industry) | `RESEARCH_PARTNERS` in `lib/site.ts`. `kind` is `lab` or `industry`; leave out `href` if the collaboration isn't public. |
| Sponsors | `SPONSORS` in `lib/site.ts`. Put a transparent PNG or SVG logo in `public/sponsors/` and set its pixel `width` and `height`. Only paying sponsors go here; research collaborators go in `RESEARCH_PARTNERS`. |
| Membership / officer / sponsor blurbs | `MEMBERSHIP` in `lib/site.ts` |
| Events page calendars | `BOARDS` in `app/(site)/events/page.tsx` (Notion embeds, edited in Notion) |
| Relink links and banners | Not in code. Sign in at `/relink/edit` with an officer Discord account. |
| Page copy and layout | `app/(site)/page.tsx` (home), `app/(site)/team/page.tsx`, `app/(site)/events/page.tsx` |
| Colours, fonts, shared styles | `tailwind.config.mjs` (palette), `app/(site)/fonts.ts`, `app/(site)/site.css` (`.window`, `.btn`, `.portrait`, `.sky`, and the rest) |

## Layout

```
app/
  (site)/               current site: layout, home, team, events, relink
    relink/(officer)/   Relink editor and sign-in, wrapped in the session provider
  (legacy)/             2024-25 site, served under /legacy (not indexed)
  api/
    auth/               NextAuth (Discord)
    relink/             Relink links, banners, image upload
    projects/           Software Corner (legacy)
  sitemap.ts, robots.ts
components/
  site/                 components for the current site
  legacy/               components for /legacy only
lib/
  site.ts               content and links for the current site
  constants.ts          officer rosters (shared with /legacy) and legacy data
  relink.ts             Relink data access and validation
  relink-api.ts         Relink route handlers
  auth.ts               NextAuth config and Discord role check
  auth-middleware.ts    requireOfficer() for API routes
public/
  Officers/  photos/  initiatives/  sponsors/
middleware.ts           redirects signed-out users away from /relink/edit and /admin
next.config.mjs         redirects old paths (/projects, /ml_lab, ...) to /legacy
```

The two route groups have separate root layouts and stylesheets, so a change in one does not affect the other. New pages go in `app/(site)`.

## Auth

Discord is the only sign-in. Sign-in succeeds only if the bot finds the user in `DISCORD_GUILD_ID` with `ADMIN_ROLE_ID`. Every API write calls `requireOfficer`, which checks the role again (cached for 60 seconds), so removing the role in Discord removes write access. Sessions are JWTs with no database.

## Deploy

The Vercel project is `ais-website` under the `theaisociety` team. Every pull request gets a preview deployment, linked in a comment on the PR, and merging to `main` deploys production. Environment variables are set in Vercel, not in the repo.

Work on a branch, open a PR, check the preview, then merge.

## Before you merge

There is no CI and no test suite. `next.config.mjs` sets `ignoreBuildErrors` and `ignoreDuringBuilds`, so type and lint errors do not stop a deploy. Run these yourself:

```bash
npm run build
npx tsc --noEmit    # errors in Software Corner files are pre-existing
```

## Known issues

- Type and lint errors are ignored at build time (see above).
- `package.json` still carries the v0 template: the name is `my-v0-project`, many Radix packages are unused, and many versions are pinned to `latest`.
- There are two Tailwind configs. `tailwind.config.mjs` is the one in use; `tailwind.config.ts` is dead.
- `public/Officers/` is about 50 MB of uncompressed photos.
- Software Corner (`/legacy/software-corner`, `/admin/software-corner`) is legacy. See `SOFTWARE_CORNER_README.md`. Its routes in that file predate the move to `/legacy`.

## License

© The AI Society at Arizona State University
