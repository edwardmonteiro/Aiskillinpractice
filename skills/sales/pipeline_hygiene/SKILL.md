---
name: sales.pipeline_hygiene
phase: sales
roles:
  - Sales Ops Lead
  - Revenue Operations Analyst
  - Regional Sales Manager
  - SDR Manager
description: Enforce CRM hygiene, deduplicate records, and realign stages to keep forecasts trustworthy and audit-ready.
variables:
  required:
    - name: crm_export
      description: Latest pipeline export (CSV/JSON) with deal IDs, stages, owners, and amounts.
    - name: stage_definitions
      description: Current stage definitions and exit criteria.
  optional:
    - name: forecast_targets
      description: ARR/GMV targets by segment/region to benchmark pipeline coverage.
    - name: data_quality_rules
      description: Custom field validations (e.g., close dates within quarter, mandatory contacts, currency).
outputs:
  - Cleaned pipeline table with deduped IDs, normalized fields, and stage realignments saved to specs/projects/<initiative>/sales/pipeline_hygiene.csv.
  - Gap report summarizing invalid records, missing fields, and recommended owner actions saved to specs/projects/<initiative>/sales/pipeline_hygiene.md.
---

# Purpose
Keep pipeline data trustworthy so downstream forecasts, capacity planning, and deal-desk approvals start from a clean baseline.

# Pre-run Checklist
- ✅ Confirm the CRM export includes owner IDs, stage timestamps, and currency columns.
- ✅ Align on the canonical stage ladder and definitions.
- ✅ List fields that must be present for forecast inclusion (e.g., primary contact, next step, close date).

# Invocation Guidance
```bash
codex skills run sales.pipeline_hygiene \
  --vars "crm_export={{crm_export}}" \
         "stage_definitions={{stage_definitions}}" \
         "forecast_targets={{forecast_targets}}" \
         "data_quality_rules={{data_quality_rules}}"
```

# Toolchain & Integrations
- **Scripts:** Use a small pandas script (via `uv run`) to dedupe, validate, and normalize currency; keep transformations idempotent.
- **APIs/MCP:** If available, pull stage definitions and targets from MCP servers (`skills_catalog`, `skill_executor`) to avoid drift.
- **Fallbacks:** When automation is offline, run validations in a shared sheet with data validation rules mirroring the checks below.

# Functional Contract
- **Inputs → Outputs:**
  - `crm_export` → cleaned CSV with deduped deal IDs, standardized owner names, normalized currency, and stage realignment.
  - `stage_definitions` → exit-criteria lookup applied to each record; deviations flagged in the gap report.
  - `forecast_targets` (optional) → pipeline coverage table by segment/region appended to the gap report.
- **Idempotence:** Re-running overwrites the CSV and regenerates the markdown report; dedupe keys are `deal_id` and `account_id`.
- **Error Handling:** If required fields are missing, write a blocking notice to the gap report and exit without producing the cleaned CSV.

# Implementation Notes
- Normalize stages to the canonical ladder before running coverage math.
- Flag stale deals where `last_activity_at` exceeds the regional SLA; propose owners for cleanup.
- Track total pipeline, weighted pipeline, and coverage vs. targets when provided.

# Human Layer: Reflective Practice
- Pause after the first pass to ask whether the validation rules reflect how teams actually sell in-region.
- Consider how owners might react to automated reassignments; keep notes action-oriented and respectful.

# Critical Thinking Loop
- If large portions of the pipeline fail validation, reassess whether definitions or data capture processes need revision.
- If coverage is thin, question whether to adjust stage probabilities or seek more top-of-funnel rather than overfitting cleanup.

# Follow-up Checklist
- [ ] Circulate the gap report to regional leads with deadlines for remediation.
- [ ] Sync the cleaned dataset back into the CRM or data warehouse.
- [ ] Schedule a forecast call to confirm coverage and probability assumptions.
