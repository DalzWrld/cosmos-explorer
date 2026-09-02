# Cosmos Explorer — Backend

Flask + PostgreSQL API replacing the direct NASA calls from Phase 1, starting with the
**My Collection** feature: users save, organize, and annotate discoveries into named
collections.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then edit DATABASE_URL if needed
createdb cosmos_explorer_dev    # requires a local PostgreSQL install

flask --app run db upgrade      # create tables
python seed.py                  # creates a placeholder dev user (id=1)

python run.py                   # runs on http://localhost:5000
```

## Current endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/collections?page=1&per_page=10` | List the dev user's collections (paginated) |
| POST | `/api/collections` | Create a collection — body: `{ "name", "description" }` |
| GET | `/api/collections/:id` | Get one collection with its saved discoveries |
| PATCH | `/api/collections/:id` | Update name/description |
| DELETE | `/api/collections/:id` | Delete a collection (cascades to its saved discoveries) |

All error responses are JSON: `{ "error": "..." }`.

## Known scope for this milestone

- **No auth yet.** Every request is scoped to a hardcoded `DEV_USER_ID = 1` (see
  `app/routes/collections.py`). This is intentional for the Part 2 MVP checkpoint —
  "one working endpoint, frontend fetching from it" — and gets replaced with real
  login/signup and per-user ownership checks in the next pass.
- **`SavedDiscovery` CRUD isn't wired up yet** — the model and table exist (see
  `app/models.py`), but there's no route for it yet. That's the next resource to add.
- Migrations live in `migrations/` (Flask-Migrate/Alembic) — always run
  `flask --app run db migrate -m "..."` after changing `app/models.py`, then
  `flask --app run db upgrade`.