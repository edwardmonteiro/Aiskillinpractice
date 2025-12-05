---
name: data.data_engineer
phase: data
roles:
  - Data Engineer
  - Platform Engineer
  - Analytics Engineer
description: Design and operate reliable, privacy-aware data pipelines that feed CX/UX signals and ML features.
variables:
  required:
    - name: initiative
      description: Initiative or product area to support.
    - name: source_systems
      description: Key sources to ingest (WhatsApp events, app telemetry, operational DBs).
    - name: slis
      description: Core SLIs/SLOs for freshness, quality, and availability.
  optional:
    - name: compliance_notes
      description: Data residency, retention, or PII handling requirements.
    - name: downstream_consumers
      description: Known consumers (dashboards, ML features, CX monitors).
outputs:
  - Data flow design with contracts, privacy controls, and quality gates.
  - Deployment plan with testing steps (contract tests, backfills, rollback strategy).
  - Instrumentation hooks for design, CX, and ML partners.
---

# Purpose
Ensure the Claude Skills catalog includes a data engineering pathway so experience, analytics, and ML teams can trust the signals they consume.

# Pre-run Checklist
- ✅ Confirm source schemas and ownership.
- ✅ Collect privacy/compliance constraints for each data domain.
- ✅ Align SLIs with run/service runbook expectations.

# Invocation Guidance
```bash
codex skills run data.data_engineer \
  --vars "initiative={{initiative}}" \
         "source_systems={{source_systems}}" \
         "slis={{slis}}" \
         "compliance_notes={{compliance_notes}}" \
         "downstream_consumers={{downstream_consumers}}"
```

# Toolchain & Integrations
- **Functional contract – `docs/functional-skill-architecture.md`**: Keep pipeline designs pure and repeatable for automation.
- **Specs – `specs/projects/whatsup-logistics/sdd.md`**: Link SLIs and contracts into the Skills Bridge and run sections.
- **Sample – `samples/whatsup-logistics/data/data_engineer.md`**: Example WhatsApp telemetry ingestion/quality plan.
- **Validation – `scripts/validate-skills`**: Verify metadata before merging.
- **MCP – `mcp/servers/skill_executor/server.py`**: Automate contract test runs or lineage checks from agents.

# Implementation Notes
- **Contracts first**: Define schemas and quality checks before wiring transforms; treat backfills and retries as composable functions.
- **Privacy by design**: Document PII handling and retention; ensure CX/UX logs follow the same constraints.
- **Observability**: Map SLIs to dashboards and alert routes that align with run/incident response skills.

# Human Layer: Reflective Practice
- **Stakeholder check**: Reassess whether downstream consumers can interpret the data safely and accurately.
- **Self-review**: Confirm design choices minimize complexity and avoid overfitting to a single team.

# Critical Thinking Loop
- **Risk review**: Question how failures propagate (late data, schema drift) and adjust controls accordingly.
- **Adaptation**: If SLIs conflict with delivery timelines, renegotiate scope rather than lowering quality silently.

# Follow-up Checklist
- [ ] Publish pipeline contracts and tests to the repo.
- [ ] Notify CX/UX/ML partners of available signals and data quality expectations.
- [ ] Log the run and resulting artifacts in the project skill log.
