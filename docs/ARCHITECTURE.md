# Architecture

This document describes how the site is built as of September 2026. For day-to-day edits, start with the README. For planned work, see [ROADMAP.md](ROADMAP.md).

## Overview

The site is one Next.js 15 app (App Router, React 19, TypeScript, Tailwind CSS 3) deployed on Vercel. Most of it is static content compiled from TypeScript files. Two features use a database: Relink (the link page used in social bios) and Software Corner (a legacy project showcase). Both store data in MongoDB and let only officers write, checked through Discord.

```
browser
  |
  v
Vercel (Next.js)
  |-- static pages      /, /team, /events, /legacy/*     content from lib/site.ts and lib/constants.ts
  |-- dynamic pages     /relink                            reads MongoDB on every request
  |-- client pages      /relink/edit, /admin/software-corner
  |-- route handlers    /api/relink/*, /api/projects/*, /api/auth/*
         |                     |                 |
         v                     v                 v
      MongoDB           Discord API        Discord OAuth
  (Relink db, default db)  (role check)    (sign-in)

external embeds: Notion (events boards), Google Calendar (subscribe link), Vercel Analytics
```

There is no separate backend, no queue, and no scheduled job. Everything runs inside Next.js on Vercel.

## Route groups

`app/` has two route groups. Each has its own root layout (its own `<html>` and `<body>`) and its own stylesheet, so they share no CSS and no chrome.

| Group | Served at | Layout | Stylesheet | Purpose |
| --- | --- | --- | --- | --- |
| `app/(site)` | `/`, `/team`, `/events`, `/relink`, `/relink/edit`, `/relink/signin` | `app/(site)/layout.tsx` | `app/(site)/site.css` | Current site |
| `app/(legacy)` | `/legacy/*`, `/admin/software-corner` | `app/(legacy)/layout.tsx` | `app/(legacy)/globals.css` | 2024-25 site, kept for reference and old links |

Moving between the two groups is a full page load, because they have different root layouts.

`next.config.mjs` sends old top-level paths (`/projects`, `/software-corner`, `/ml_lab`, `/nlp_lab`, `/ai_makerspace`) to `/legacy/...` with a temporary (307) redirect, so those paths can be reused later.

## Current site: app/(site)

### Pages

| Route | File | Rendering | Data |
| --- | --- | --- | --- |
| `/` | `page.tsx` | Static | `lib/site.ts`, `lib/constants.ts` |
| `/team` | `team/page.tsx` | Static | Rosters in `lib/constants.ts` |
| `/events` | `events/page.tsx` | Static shell, Notion iframes | `BOARDS` in the same file, `LINKS.googleCalendar` |
| `/relink` | `relink/page.tsx` | `force-dynamic` | MongoDB via `getRelinkContent()` |
| `/relink/edit` | `relink/(officer)/edit/page.tsx` | Client component | `/api/relink/*` |
| `/relink/signin` | `relink/(officer)/signin/page.tsx` | Client component | NextAuth |

The home page is one server component made of sections in this order: hero, ticker, About (01), Programs (02), Initiatives (03), Research (04), Membership (05), Team (06), Opportunities (07), and a closing call to action. Each numbered block uses `components/site/section.tsx`, which takes an `index`, `label`, `title` and an optional `aside` for the left rail.

`relink/(officer)/layout.tsx` wraps the editor and sign-in pages in the NextAuth `SessionProvider` and marks them `noindex`. No other part of the current site loads the session on the client.

### Content model

Almost all copy and lists live in two files:

- `lib/site.ts`: data for the current site only. `SITE` (name, URL, description), `LINKS`, `SOCIALS`, `NAV`, `STATS`, `PHOTOS`, `PROGRAMS`, `PROJECT_KINDS`, `INITIATIVES`, `RESEARCH_PARTNERS`, `SPONSORS`, `MEMBERSHIP`.
- `lib/constants.ts`: officer rosters and alumni, which both the current site and `/legacy` use, plus legacy workshop and project data.

Types for these are defined next to the data in `lib/site.ts`, or in `lib/types.ts` for the shared and legacy shapes. Because the data is TypeScript and not a CMS, every content change is a commit and a deploy. That keeps it reviewable. The cost is that officers who do not use Git cannot edit it.

Some relationships are encoded in the data:

- `PROGRAMS[].photo` is a key of `PHOTOS`. When a program row is hovered, the Programs rail shows that photo. This is done in CSS with `:has()`, so the page stays a server component with no client JS.
- `INITIATIVES[]` with no `folder` is a flagship tile, and its `image` comes from `public/initiatives/`. With a `folder` from `PROJECT_KINDS`, it appears in the `~/ais/projects` console instead. With no `href`, it shows "coming soon".
- `RESEARCH_PARTNERS[].kind` is `lab` or `industry`, and it only sets the card label. With no `href`, the card has no link.
- `SPONSORS` are paying event sponsors, shown in the logo row under Membership. They are kept separate from research partners on purpose.

### Styling

- Tailwind 3 is configured in `tailwind.config.mjs`. The current palette is `ink`, `paper`, `haze` and `signal`. The `primary` and `secondary` scales come from CSS variables and are used by `/legacy`. `tailwind.config.ts` is not loaded and is dead.
- Fonts are defined in `app/(site)/fonts.ts`: Unbounded (display), Inter (body) and JetBrains Mono, all through `next/font/google` and exposed as CSS variables.
- `app/(site)/site.css` holds the component classes the pages use: `.wrap`, `.window`, `.window-bar` and `.window-title` for the retro window frames, `.sky` for the gradient header, `.btn` and `.btn-solid`, `.label`, `.portrait` for the greyscale photos that turn to colour when a parent `.group` is hovered, `.dither`, `.field`, and `.md` for Relink markdown.
- Only `components/site/mobile-menu.tsx`, `components/site/ascii-chip.tsx` and the Relink officer pages are client components.

### SEO and metadata

`app/(site)/layout.tsx` sets site-wide metadata: title template, Open Graph and Twitter images from `public/og-image.png`, and an `Organization` JSON-LD block built from `SITE`, `SOCIALS` and `LINKS`. It also loads Vercel Analytics and Speed Insights. Each page sets its own title, description and canonical URL.

`app/sitemap.ts` lists `/`, `/events` and `/team`. `app/robots.ts` blocks `/api/`, `/admin/`, `/relink/edit` and `/relink/signin`. `NEXT_PUBLIC_SITE_URL` sets `SITE.url`, which is used as the base for canonical URLs.

## Relink

Relink replaces a Linktree. Officers keep an ordered list of links and banners, and `/relink` renders them.

### Data

- MongoDB database `Relink`, reached through the shared client in `lib/mongodb.ts`.
- Collection `links` (or `LINKS_COLLECTION_NAME`): `{ title, url, description?, order, createdAt, updatedAt }`.
- Collection `banners` (or `BANNERS_COLLECTION_NAME`): `{ title, content (markdown), imageUrl?, order, createdAt, updatedAt }`.
- GridFS bucket `images` in the same database stores banner uploads.

### Code

- `lib/relink.ts`: database access and validation. `parseLink` and `parseBanner` trim and cap lengths (title 120, description 280, content 5000) and accept only absolute `http(s)` URLs. Banner images must be one of our own upload URLs (`/api/relink/upload/<24 hex>`) or an external `https` URL.
- `lib/relink-api.ts`: `relinkCollectionRoutes(collection, parse, noun)` builds the `GET`, `POST`, `PUT` and `DELETE` handlers for one collection. `GET` is public. The three writes call `requireOfficer` first. `PUT` removes any optional field the editor cleared instead of leaving the old value.
- `app/api/relink/links/route.ts` and `banners/route.ts`: each is one line that calls the factory.
- `app/api/relink/upload/route.ts`: `POST` requires an officer and accepts PNG, JPEG, WebP or GIF up to 5 MB. SVG is refused because it can carry script. The uploader's Discord ID is recorded in the file metadata.
- `app/api/relink/upload/[id]/route.ts`: public `GET`. It serves an image inline only if its stored type is an allowed image type, and anything else as an attachment. It always sends `nosniff` and a sandboxed CSP, and it caches for a year, since uploads are never overwritten.
- `components/site/relink/markdown.tsx`: renders banner markdown with `react-markdown` without raw HTML, and makes links open in a new tab.

`/relink` renders on every request (`force-dynamic`), so edits show up immediately. If MongoDB is unreachable, the page renders empty instead of failing.

## Software Corner (legacy)

Software Corner is a showcase where officers add projects with thumbnails and collaborators. It lives under `/legacy/software-corner` (public) and `/admin/software-corner` (officers), and is documented in `SOFTWARE_CORNER_README.md`.

It uses a different data stack from Relink:

- Mongoose (`lib/mongoose.ts`) with the `Project` model in `lib/models/Project.ts`, stored in the database named in `MONGODB_URI` (the default database), not `Relink`.
- Thumbnails go in the GridFS bucket `project_thumbnails` through `lib/gridfs.ts`, which opens its own `MongoClient`.
- Routes live under `app/api/projects/*`. Reads are public and paginated by `created_at` cursor. Writes call `requireOfficer`, and changing a project also requires `owner_discord_id` to match the caller.

That makes three MongoDB client pools per server instance (`lib/mongodb.ts`, `lib/mongoose.ts`, `lib/gridfs.ts`). `scripts/seed.js` seeds sample projects. `lib/config.ts` holds the Software Corner limits.

## Authentication

Discord is the only sign-in, through NextAuth v5 (`lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`).

1. The user signs in with Discord OAuth.
2. The `signIn` callback calls `verifyDiscordAdminRole(discordId)`. This uses `DISCORD_BOT_TOKEN` to fetch the user's membership in `DISCORD_GUILD_ID` and checks for `ADMIN_ROLE_ID`. If the role is missing or any config is missing, sign-in is refused.
3. The session is a JWT (no database) that lasts 7 days (`SESSION.MAX_AGE`). The Discord ID is stored in the token and exposed as `session.user.discordId`.
4. Every write route calls `requireOfficer` (`lib/auth-middleware.ts`). It reads the session, then checks the role again. A positive result is cached per server instance for 60 seconds. Removing the role in Discord removes write access within about a minute, even though the JWT is still valid.

`middleware.ts` only checks that a session cookie exists for `/relink/edit` and `/admin/software-corner`, and redirects to sign-in if not. It does not check the role, so authorization is enforced in the route handlers, not in middleware.

## Static assets

| Folder | Contents | Notes |
| --- | --- | --- |
| `public/Officers/` | Officer and alumni headshots | About 50 MB, mostly uncompressed JPEGs |
| `public/photos/` | Event photos for the About and Programs rails | WebP, registered in `PHOTOS` |
| `public/initiatives/` | Flagship initiative images | WebP |
| `public/sponsors/` | Sponsor logos | Transparent PNG or SVG with width and height set in `SPONSORS` |
| `public/` root | Logo, OG image, legacy images and v0 placeholders | Several placeholders are unused |

Images go through `next/image`. `next.config.mjs` allows remote images from any https host.

## Configuration

Everything comes from environment variables, set in Vercel for deployments and in `.env.local` locally. The README has the full table. `MONGODB_URI` is required at import time by `lib/mongodb.ts`, `lib/mongoose.ts` and `lib/gridfs.ts`. Because of that, `next build` fails with "Failed to collect page data" when it is missing or malformed, even though the static pages never use it.

## Build and deploy

- Vercel project `ais-website` under the `theaisociety` team. Every PR gets a preview deployment, and merging to `main` deploys production.
- `next.config.mjs` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so type and lint errors do not block a deploy.
- There is no CI and no test suite.

## Constraints to keep

- The `(site)` and `(legacy)` groups do not import each other's components. Shared data (rosters) lives in `lib/`.
- Every write route calls `requireOfficer`. Middleware alone is not enough.
- Stored URLs are validated to `http(s)`, and uploads are served with `nosniff` and a sandboxed CSP. Keep both if you add new user-supplied links or files.
- Content that officers change often should be data in `lib/site.ts`, not copy buried in JSX.
