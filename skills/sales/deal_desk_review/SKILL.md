---
name: sales.deal_desk_review
phase: sales
roles:
  - Deal Desk Lead
  - Sales Ops Lead
  - Account Executive
  - Legal Partner
description: Standardize deal review across pricing, terms, risk, and approvals so enterprise and velocity motions stay compliant and fast.
variables:
  required:
    - name: deal_packet
      description: Summary of pricing, products, term length, payment terms, and non-standard asks.
    - name: guardrails
      description: Approval thresholds and playbooks (discount caps, SLA terms, data protection requirements).
  optional:
    - name: reference_deals
      description: Comparable won/lost deals to calibrate pricing and concession patterns.
    - name: risk_notes
      description: Known redlines or blockers from legal, security, or finance.
outputs:
  - Deal desk decision memo saved to specs/projects/<initiative>/sales/deal_desk_review.md with risks, approvals, and next steps.
  - Concession ledger snippet saved to specs/projects/<initiative>/sales/deal_desk_ledger.csv capturing discounts and exceptions.
---

# Purpose
Keep deal reviews predictable, transparent, and auditable while enabling speed where risk is low.

# Pre-run Checklist
- ✅ Confirm ARR/GMV impact, term length, and payment schedule are present.
- ✅ Align on latest pricing guardrails and required approvers by segment.
- ✅ Collect precedent deals (won/lost) to inform trade-offs.

# Invocation Guidance
```bash
codex skills run sales.deal_desk_review \
  --vars "deal_packet={{deal_packet}}" \
         "guardrails={{guardrails}}" \
         "reference_deals={{reference_deals}}" \
         "risk_notes={{risk_notes}}"
```

# Toolchain & Integrations
- **Scripts:** Lightweight Python scoring script to compare deal packet vs. guardrails and log concessions; run via `uv run`.
- **APIs/MCP:** Query the contracts repository or pricing API through MCP to auto-fill precedent concessions.
- **Fallbacks:** Use a structured template in docs if APIs are unavailable; paste the output into the ledger CSV after review.

# Functional Contract
- **Inputs → Outputs:**
  - `deal_packet` + `guardrails` → decision memo with approval path, risks, and recommended concessions.
  - `reference_deals` → variance analysis and benchmarks appended to the memo.
  - `risk_notes` → consolidated risk register per function.
- **Idempotence:** Re-running overwrites the memo and appends/updates the ledger row keyed by `deal_id` and `close_quarter`.
- **Error Handling:** If any guardrail input is missing, flag the blocker in the memo and stop before writing ledger entries.

# Implementation Notes
- Highlight SLA, data residency, and indemnity deviations early for legal review.
- Recommend fallback bundles or term trade-offs when discount caps are exceeded.
- Capture approver names and timestamps to keep audits intact.

# Human Layer: Reflective Practice
- Check whether the tone balances customer empathy with firm guardrails; avoid adversarial language.
- Ask if the recommended path would make sense to a new AE reading it without context.

# Critical Thinking Loop
- If multiple concessions accumulate, reassess whether the deal fits ICP or if a phased pilot is safer.
- If precedent deals differ materially, revisit the benchmark set or adjust risk posture.

# Follow-up Checklist
- [ ] Send the decision memo to approvers with clear deadlines.
- [ ] Update the CRM opportunity with approved terms and risks.
- [ ] Log concessions for quarterly pricing and product reviews.
