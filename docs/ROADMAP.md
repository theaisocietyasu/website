# Roadmap

What to build next, in rough order. Each item says why it matters and a suggested approach. [ARCHITECTURE.md](ARCHITECTURE.md) describes how the site works today.

Update this file as part of the PR that finishes an item, or drop an item when it's no longer wanted.

## Now: make it safe to change

Anyone should be able to make these changes without breaking production.

- **Add CI.** Add a GitHub Actions workflow that runs `npm ci`, `npx tsc --noEmit`, `npm run lint` and `npm run build` on every PR. Today nothing checks a PR before Vercel deploys it.
- **Stop ignoring build errors.** Fix the existing type errors in the Software Corner files, then remove `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` from `next.config.mjs` so a broken change fails the build instead of shipping.
- **Clean up the v0 template.** Rename the package from `my-v0-project` and pin every dependency marked `latest`. Remove unused Radix and other v0 packages, the Clerk variables in `.env.example`, `tailwind.config.ts`, the placeholder images in `public/`, and any `lib/` files that only `/legacy` uses once `/legacy` is gone.
- **Compress officer photos.** Convert `public/Officers/` to WebP at about 600 px on the long side, which takes it from about 50 MB to a few MB. Add a small `scripts/optimize-photos` step using `sharp`, and note it in the README, so new photos are compressed the same way.
- **Build without MongoDB.** Connect to MongoDB lazily, inside the functions that use it, instead of at import time. `next build` should then work with no `MONGODB_URI`, and a preview without a database still renders every static page.
- **Protect `main`.** Require a PR and a green CI run before merging. Add a CODEOWNERS file so someone who knows the site reviews changes.

## Next: events

The events page embeds two Notion boards in iframes. They load slowly, don't match the site's style, and search engines can't see the events.

- **Google Calendar as the source of events.** The club calendar (theaisociety.asu@gmail.com) already exists and is linked from the page.
  - Read it on the server with the Calendar API v3 (`events.list` with an API key on the public calendar), or parse its public iCal feed so no key is needed.
  - Cache the result with `revalidate` (for example 15 minutes) so the page stays static between refreshes.
  - Render upcoming events as native cards in the site's style: date, time in Arizona time, location, and a short description.
  - Give each card "Add to Google Calendar" and ".ics" links. Keep the "Subscribe" button for the whole calendar.
  - Add `Event` JSON-LD for each upcoming event so events can show up in search results.
  - Remove the Notion iframes once the calendar is the source of truth.
  - This needs the calendar to be public, and a `GOOGLE_CALENDAR_ID` (and `GOOGLE_CALENDAR_API_KEY` if the API is used) in Vercel.
- **Next event on the home page.** Show the next one or two events in the hero or ticker, using the same data.
- **Past events archive.** Past events with photos and slides, grouped by semester. This reuses the calendar data plus a small `PAST_EVENTS` list for media links.

## Next: content without Git

All content is TypeScript in `lib/site.ts` and `lib/constants.ts`. That works for developers but blocks officers who don't use Git.

- **Officer editor for rosters.** Move officers and alumni to MongoDB, with an editor like Relink's behind `requireOfficer`, and photo upload through the same GridFS pattern. The team page then reads the database and is revalidated when a roster changes.
- **Consider the same for partners and sponsors.** Only do this if they change often. If they change once a semester, a PR is fine.
- **One MongoDB client.** Relink, Mongoose and GridFS each open their own connection pool. Share one client before adding more collections.

## Later: help the club grow

These are ideas, not commitments. Pick based on what officers need.

- **Workshop library.** A page listing past workshops with slides, recordings and notebooks. Link to AI-pedia articles where they overlap, and don't duplicate AI-pedia's content.
- **Projects from GitHub.** List projects by reading repositories in the `theaisocietyasu` org (topics or a manifest file) at build time, so the projects console updates without code changes.
- **Research outputs.** A publications list with papers, posters and demos once partner work produces them. Each links back to its partner card.
- **Sponsor page.** What sponsorship funds, past sponsors, and a contact or packet download. The logo row under Membership links to it.
- **Mailing list.** An email signup (for example a Google Form or Buttondown) for people who aren't on Discord.
- **Relink click counts.** Count clicks per link (a redirect route that increments a counter) so officers can see which links are used.
- **Live stats.** Read the Discord member count from the bot that is already configured, instead of hardcoding it in `STATS`.
- **Alumni outcomes.** Where alumni went (companies, grad programs). It is useful for recruiting and sponsors.
- **Flagship event pages.** Pages for Innovation Hacks and the AI Summit with schedule, tracks, past winners and sponsor tiers, instead of external links only.
- **Tests.** A Playwright smoke test that loads each page and checks for console errors, plus unit tests for the Relink parsers. Run both in CI.
- **Accessibility and performance.** Run a Lighthouse and axe pass on each page and fix what they flag. Keep the home page's JavaScript small.
- **Retire /legacy.** Decide whether Software Corner is worth porting to the current design. If it is, port it. Then delete `app/(legacy)`, `components/legacy`, the legacy-only `lib/` files, and the redirects that point there.

## Out of scope for now

- Accounts for general members. Only officers sign in.
- A headless CMS subscription. The data files and small officer editors cover what is needed without another vendor.
