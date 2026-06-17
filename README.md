# Big IRON 🎯

Firearm & ammo price comparison engine with nationwide dealer search, state compliance filtering, deal alerts, and financing options.

## Features

- **Price comparison** across GunBroker, Bud's Gun Shop, PSA, Guns.com, GrabAGun, Sportsman's Warehouse
- **Nationwide local dealer search** — 65,000+ FFL dealers + Cabela's, Bass Pro, Sportsman's Warehouse, Academy Sports, Walmart, and more — searchable by ZIP code via Google Places
- **State compliance filtering** — all 50 states, warns on AWBs, mag limits, permit requirements, etc.
- **Price history** & all-time low indicators
- **Deal alerts** — email notification when price drops below your target
- **Financing** — Credova/Sezzle availability highlighted per retailer
- **Giveaway** banner system

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google Places API key.

**Getting a Google Places API key:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → Enable **Places API** and **Geocoding API**
3. Create an API key under "Credentials"
4. Google gives $200/month free credit (~40,000 dealer searches/month)

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Push to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → Add New Project → select `Big-IRON`
3. Add `GOOGLE_PLACES_API_KEY` in the Environment Variables section
4. Deploy

## Monetization

- **Affiliate links** — retailer "Buy" links are affiliate-ready (add IDs to `lib/data.ts`)
- **Featured dealer listings** — local dealers pay for top placement (edit `app/api/dealers/route.ts` to boost)
- **Manufacturer product locator widget** — white-label the search for brands
- **Deal alert email list** — monetize with sponsored drops

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Google Places API + Geocoding API
- Lucide React icons

## Roadmap

- [ ] Real retailer price scraping / affiliate feed integration
- [ ] FFL Bridge API for transfer fee comparison
- [ ] User accounts + saved searches
- [ ] Mobile app (React Native)
- [ ] Manufacturer widget (embeddable)
