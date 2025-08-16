# 🧠 Green Neuroregeneration Initiative — Research Methods + Idea Alignment

Scope
- Only new research methods (discovery, validation, and translation-enabling methods) for neuroregeneration and neurorepair.
- Community matching, secure collaboration, live idea overview, voting, and treasury-integrated annual award.
- Integrates the same wallet model as other Green Investments projects.

Core Features
- Idea submission (methods-focused only) with structured templates.
- Matchmaking: semantic + constraints matching; auto-create an end‑to‑end encrypted (E2EE) chat room via "Habby Tycoon" Secure Chat (SSO deep link).
- Living Overview: searchable list of all methods and their docs; status and validation evidence.
- Voting & Annual Award: community voting with guardrails; yearly boost from the community vault; payout fluctuates with token mechanism while preserving treasury health.
- Wallet Integration: reuses the existing Green Investments wallet model for auth, voting, payouts, and identity safeguards.

Quick Start
1) Draft a method idea via GitHub Issues (New Research Method Proposal template).
2) Once submitted, the matching service suggests collaborators; accepted matches get a secure chat link.
3) Maintain your idea's folder under /projects/green-neuroregeneration/ideas/<slug>.
4) Participate in reviews and votes; the top-voted method annually receives a treasury boost (see governance).

Docs
- docs/research-methods.md — curated catalog of cutting‑edge methods (methods only)
- docs/architecture.md — system components, matching, secure chat, overview
- docs/governance-and-voting.md — process, sybil resistance, voting method
- docs/treasury-and-risk.md — payout policy tied to token mechanism with guardrails
- docs/wallet-integration.md — adapter to existing wallet stack
- docs/live-overview-spec.md — dashboard data sources and API
- docs/data-model.md — schemas for Idea, Match, Vote, Wallet, TreasuryEvent
- docs/privacy-security.md — E2EE chat, consent, compliance
- docs/roadmap.md — milestones to MVP and beyond
- docs/green-ops.md — sustainable operations for compute and lab methods

Repo Layout (this subproject)
- ideas/_template — starter structure for an idea
- ideas/<slug> — each method's docs
- matches/ — metadata-only (no chat content)
- votes/ — vote receipts and tallies
- treasury/events — award events archive

Notes
- "Habby Tycoon" Secure Chat: placeholder SSO target; confirm exact app + SSO protocol with your infra team.
- Wallet integration: uses existing Green Investments wallet API; see docs/wallet-integration.md for adapter contract.