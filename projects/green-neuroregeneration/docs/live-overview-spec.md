# Live Overview Spec

Purpose
- Public, real-time index of all method ideas, their status, collaborators, validation artifacts, and vote stats.

Data Sources
- ideas/<slug>/meta.json — canonical metadata
- votes/ — aggregated tallies per window
- matches/ — accepted matches (non-sensitive)
- status/ — CI-generated status badges (e.g., validation pipeline checks)

Endpoints (example)
- GET /api/ideas → list with filters (category, TRL, tags, region)
- GET /api/ideas/:slug → full metadata
- GET /api/votes/current → active ballots + user eligibility info
- GET /api/matches/recent → anonymized match stats

UI
- Cards per idea with tags, status, collaborators (consent-based), and links to docs
- Sorting: newest, most validated, most discussed, top-voted
- Export: CSV/JSON dumps for open science

Privacy
- No raw chat content; only link to E2EE room (access via SSO).