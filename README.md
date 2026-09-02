# Cosmos Explorer

> Space is complicated. Exploring it doesn't have to be.

A React front end (Phase 1 of a 3-phase capstone project) that turns three of NASA's public
APIs into one discovery experience: a daily featured image, an open-ended search of NASA's
media archive, and a live look at asteroids making a close approach to Earth.

## Problem & audience

Space and astronomy information is abundant but not always easy to casually explore or
understand. Cosmos Explorer brings it into one approachable, interactive experience aimed
primarily at casual space enthusiasts, with students and curious learners as a secondary
audience.

**Product philosophy:** Discover → Explore → Understand → Remember

## Setup

```bash
npm install
cp .env.example .env   # then paste in your NASA API key
npm run dev
```

Get a free personal key instantly at [api.nasa.gov](https://api.nasa.gov) — it raises your
rate limit from the shared `DEMO_KEY`'s 30 requests/hour to 1,000 requests/hour across the
APOD and NeoWs endpoints. The app falls back to `DEMO_KEY` if `VITE_NASA_API_KEY` isn't set,
so it still runs without one.

## APIs used

| Experience | API | Endpoint |
|---|---|---|
| Home — daily featured discovery | Astronomy Picture of the Day (APOD) | `GET https://api.nasa.gov/planetary/apod` |
| Near-Earth — asteroid tracker | Near Earth Object Web Service (NeoWs) | `GET https://api.nasa.gov/neo/rest/v1/feed` |
| Explore — open search | NASA Image & Video Library | `GET https://images-api.nasa.gov/search` |

The Image & Video Library needs no API key. Mars Rover Photos was considered and dropped —
NASA's API portal currently lists it as archived.

## Architecture

```
Pages -> Custom hooks -> Service layer -> NASA APIs
```

Each API has its own service module (`src/services/apodService.js`, `neoService.js`,
`libraryService.js`) built on a shared `httpClient.js` wrapper, rather than one monolithic
API file. This is deliberate groundwork for Phase 2: when a Flask backend sits between React
and NASA, only the base URLs (and the fact that the key moves server-side) need to change —
the hooks and components stay the same.

## Routes

- `/` — Home (APOD hero + quick links)
- `/explore` — search NASA's media library
- `/explore/:id` — discovery detail page
- `/near-earth` — date-range asteroid explorer

## Known trade-offs (Phase 1)

- **API key exposure**: `VITE_NASA_API_KEY` ships in the client bundle — normal for a
  Phase 1, backend-less app, but not something to do once real secrets are involved. Phase 2
  moves the key behind Flask.
- **CORS**: NASA's endpoints have occasionally had CORS issues reported. If a direct browser
  request to APOD or NeoWs fails in your environment, that's the likely cause — Phase 2's
  Flask proxy removes this entirely.
- **Rate limits**: a personal key gives 1,000 requests/hour shared across APOD + NeoWs. The
  Explore search only fires on submit (not per keystroke) to stay well under that.

## Stack

Vite - React 19 - React Router v6 - Tailwind CSS v4 - shadcn-style UI primitives
(Button, Card, Input, Badge, Skeleton) - lucide-react icons - JavaScript