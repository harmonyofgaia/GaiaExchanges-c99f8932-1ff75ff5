# System Architecture (Idea Alignment → Secure Chat → Overview → Voting → Treasury)

Components
- Idea Service
  - Stores method proposals and versions (ideas/<slug>).
  - Validates metadata and publishes to the Live Overview.
- Matching Service
  - Embedding-based semantic match (cross-matching between method ideas and researcher profiles) + constraint filters (skills, modality, indication, region).
  - On match acceptance, provisions a secure chat room and SSO link.
- Secure Chat Integration ("Habby Tycoon")
  - E2EE rooms per match; SSO with wallet-bound identity. Chat metadata only (room id) stored in our system.
- Live Overview
  - Static site + API-backed index of all methods, status, validation evidence, and votes.
- Voting/Governance
  - Wallet-based auth; sybil resistance via existing Green Investments approach.
  - Quadratic voting by default; configurable to token-weighted with identity gating.
- Treasury Controller
  - Computes annual award within guardrails tied to token mechanism and treasury health; emits a payout proposal on-year.
- Wallet Adapter
  - Thin layer to reuse the existing wallet stack (auth, signatures, payouts).
- Observability & Health
  - Metrics on token flow, treasury runway, participation, and match outcomes.

Flows
1) Submit Idea → validate → create ideas/<slug> folder → index.
2) Discover/Match → propose collaborators → if accepted, create E2EE chat and issue SSO link.
3) Workstream → update idea docs and validation artifacts.
4) Vote windows → tally with sybil resistance → archive proofs.
5) Yearly Award → Treasury Controller computes safe payout → multisig/treasury execution.