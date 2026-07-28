# Roll Anime to Fight — Unofficial Guide

A fan-made Next.js guide site for the Roblox game **Roll Anime to Fight**: unit
cards, two tier lists, and a full traits/mutations/progression tutorial. A
Discord button is pinned in the corner on every page.

## What's inside

- **`/`** — Home page with hero, rarity legend, and a spotlight of top units.
- **`/cards`** — Every unit as a searchable, filterable card grid (filter by
  rarity, search by name).
- **`/tierlist`** — Tabs between the **Wave-Clear Tier List** (how far a unit
  can push) and the **Quality Tier List** (META → Trash, level 1, no
  traits/mutations).
- **`/tutorial`** — Trait drop rates & buffs, mutation tiers, the coin upgrade
  path, merging & cloning, and gamepass purchase priority.
- A floating **Join the Discord** button (`components/DiscordButton.tsx`) is
  rendered in the root layout, so it appears fixed in the corner on every
  route and follows scroll.

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
