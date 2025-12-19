---
name: sales.renewals_runbook
phase: sales
roles:
  - Customer Success Lead
  - Renewals Manager
  - Account Executive
  - Finance Partner
description: Prepare renewal plays with health signals, risk posture, and save plans to protect net retention and margins.
variables:
  required:
    - name: account_list
      description: Accounts up for renewal with ARR, owner, product mix, and term end dates.
    - name: usage_trends
      description: Recent product usage, adoption milestones, and support ticket history.
  optional:
    - name: expansion_hypotheses
      description: Candidate upsell/cross-sell motions to test per account.
    - name: churn_signals
      description: Known risks (exec sponsor change, budget pressure, product gaps).
outputs:
  - Renewal playbook saved to specs/projects/<initiative>/sales/renewals_runbook.md with risk tiers, actions, and owners.
  - CRM-ready tasks CSV saved to specs/projects/<initiative>/sales/renewals_tasks.csv for bulk upload.
---

# Purpose
Equip account teams with prioritized, data-backed renewal plays that reduce surprises and protect NRR.

# Pre-run Checklist
- ✅ Verify renewal dates, billing frequency, and contract terms per account.
- ✅ Pull latest adoption and support metrics; flag any SEV incidents.
- ✅ Align on pricing and discount guardrails for renewals vs. expansions.

# Invocation Guidance
```bash
codex skills run sales.renewals_runbook \
  --vars "account_list={{account_list}}" \
         "usage_trends={{usage_trends}}" \
         "expansion_hypotheses={{expansion_hypotheses}}" \
         "churn_signals={{churn_signals}}"
```

# Toolchain & Integrations
- **Scripts:** Use pandas to join account lists with usage and support signals; export markdown and CSV outputs in one run.
- **APIs/MCP:** Query product analytics or CSAT APIs via MCP to refresh health scores automatically.
- **Fallbacks:** If APIs are unavailable, paste CSV extracts into the variables and annotate manual health scores in the playbook.

# Functional Contract
- **Inputs → Outputs:**
  - `account_list` + `usage_trends` → risk tiers, health notes, and renewal probability.
  - `expansion_hypotheses` → tailored upsell suggestions per account.
  - `churn_signals` → mitigation plans and exec sponsor asks.
- **Idempotence:** Overwrites the playbook and tasks CSV; task IDs can be regenerated using `account_id` + `renewal_date`.
- **Error Handling:** If any account is missing a renewal date or owner, log the blocker and exclude it from tasks until fixed.

# Implementation Notes
- Cluster accounts by health to focus senior attention where it matters.
- Pre-draft executive outreach for red accounts and align on give/gets.
- Include a brief financial view (ARR at risk, uplift potential) to guide prioritization.

# Human Layer: Reflective Practice
- Ask whether the recommendations respect the customer’s context and constraints; avoid one-size-fits-all upsells.
- Consider how CSMs might perceive the workload; sequence tasks to avoid overload before quarter-end.

# Critical Thinking Loop
- If churn risk is widespread, revisit product gaps or service issues rather than escalating discounts.
- If expansions dominate, verify delivery and support capacity before committing.

# Follow-up Checklist
- [ ] Assign owners and due dates to each renewal task in the CRM.
- [ ] Schedule exec sponsor reviews for red accounts.
- [ ] Re-run the playbook weekly until the renewal window closes.
