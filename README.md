# Roll Anime to Fight — Unofficial Guide

A fan-made Next.js guide site for the Roblox game **Roll Anime to Fight**: unit
cards, two tier lists, and a full traits/mutations/progression tutorial. A
Discord button is pinned in the corner on every page.

## What's inside

- **`/`** — Minimal hero + a spotlight of top units.
- **`/cards`** — Every unit as a searchable, filterable card grid.
- **`/tierlist`** — Tabs between the **Wave Clear** and **Quality** tier lists.
- **`/tutorial`** — Trait/mutation tables, upgrade order, merging & cloning,
  gamepass priority.
- **`/credits`** — Placeholder credits list — edit `data/credits.ts`.
- A floating Discord icon (`components/DiscordButton.tsx`) is rendered in the
  root layout, so it's pinned in the corner on every route.
- `app/template.tsx` gives every route a quick fade/slide-in on navigation.

## Card art

Cards don't ship with real character art (there's no reliable source of
official assets to pull from, and anime character art is copyrighted), so
each card renders a small generated emblem, colored and shaped uniquely per
unit, as a placeholder.

To use real art for a unit:

1. Drop the image in `public/cards/` (e.g. `public/cards/sakuna-heian.png`).
2. In `data/units.ts`, add `image: "/cards/sakuna-heian.png"` to that unit's
   entry.

The card automatically switches to the real image; if the path 404s it falls
back to the generated emblem.

## Editing the data

All guide content lives in plain TypeScript under `data/`, so you can update
it without touching any component:

- `data/units.ts` — the master unit list (name, rarity, optional tag).
- `data/tierlists.ts` — the two tier lists, referencing unit names from
  `units.ts`.
- `data/traits.ts` — trait tiers, drop chances, and buffs.
- `data/mutations.ts` — mutation tiers and their damage/health buffs.
- `data/gamepasses.ts` — the gamepass purchase priority list.
- `data/rarity.ts` — the color/styling for each rarity, used everywhere else.
- `data/credits.ts` — the credits list shown on `/credits`.

> The unit names and rarities in `units.ts` were transcribed by hand from
> community tier-list screenshots, so a few stylized names may need a
> correction pass — search the file for the unit and fix the `rarity` or
> `name` field directly.

To change the Discord invite link, edit `DISCORD_URL` at the top of
`components/DiscordButton.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel

**Option A — via GitHub (recommended)**

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as **Next.js** — no config needed.
4. Click **Deploy**.

**Option B — via the Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts; it'll build and give you a live URL.

## Tech

Next.js 14 (App Router) + TypeScript + Tailwind CSS. No database, no
external APIs — everything is static data, so it deploys as a static/SSR
site with no environment variables required.
