# Data Model (JSON Schemas)

Idea (projects/green-neuroregeneration/ideas/<slug>/meta.json)
```json
{
  "slug": "axon-growth-crispr-combo",
  "title": "Combinatorial CRISPRa screens for axon growth",
  "category": "high-throughput cellular perturbation",
  "summary": "Combinatorial activation mapping for axon regeneration factors.",
  "owners": ["did:gi:0xabc..."],
  "tags": ["CRISPRa", "iPSC", "MEA"],
  "indications": ["SCI", "stroke"],
  "trl": 2,
  "status": "proposal",
  "links": {"docs": "projects/green-neuroregeneration/ideas/axon-growth-crispr-combo/README.md"},
  "created_at": "2025-08-16T00:00:00Z"
}
```

Match (projects/green-neuroregeneration/matches/<id>.json)
```json
{
  "id": "match_001",
  "idea_slug": "axon-growth-crispr-combo",
  "participants": ["did:gi:0xabc...", "did:gi:0xdef..."],
  "constraints": {"skills": ["crispr", "omics"], "region": ["EU"]},
  "chat_room_id": "habbytycoon:room:xyz",
  "created_at": "2025-08-16T00:00:00Z"
}
```

Vote (projects/green-neuroregeneration/votes/<ballotId>.json)
```json
{
  "ballot_id": "annual_2025",
  "method": "quadratic",
  "choices": ["axon-growth-crispr-combo", "spatial-ecm-remodeling"],
  "receipts": [{"voter": "did:gi:0xabc...", "choice": "axon-growth-crispr-combo", "weight": 3, "sig": "0x..."}],
  "tally": {"axon-growth-crispr-combo": 127.0, "spatial-ecm-remodeling": 95.5}
}
```

TreasuryEvent (projects/green-neuroregeneration/treasury/events/<id>.json)
```json
{
  "id": "award_2025",
  "amount": 125000,
  "policy_inputs": {"T_t": 5000000, "R_t": 300000, "Runway_t": 30, "P_t": 1.05},
  "award_to": "axon-growth-crispr-combo",
  "approvals": ["did:gi:0xmultisig1", "did:gi:0xmultisig2"],
  "executed_at": null
}
```