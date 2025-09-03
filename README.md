# Vehicle Inventory & Finance (Next.js + TS + Redux + styled-components)

## Getting started
```bash
npm install
npm run dev
```

- Home: `/`
- Search: `/vehicleSearch`
- Vehicle detail (SSR): `/vehicle/[make]/[model]?id=veh001`

## Tech
- Next.js (Pages Router) + TypeScript
- Redux Toolkit (manual slices + thunks) — **not** RTK Query
- styled-components with SSR via Next SWC transform
- Jest + RTL test setup

## Mock APIs
- `GET /api/vehicles?query&make&model&year&colour&page&pageSize&sort=field:dir`
- `GET /api/vehicle-filters?...` — returns option lists with counts based on current filters
- `GET /api/vehicle?id=veh001`
- `POST /api/finance-quote` — returns FinanceQuote for given price, deposit, term

## Notes
- Finance example intentionally excludes APR/interest per brief.
- API endpoints simulate latency (150–300ms) to mimic async behaviour.
