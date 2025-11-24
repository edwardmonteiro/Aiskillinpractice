---
name: data.analytics_engineer
phase: data
roles:
  - Analytics Engineer
  - Data Platform
  - Analytics Lead
description: Design, build, and maintain high-quality, high-performance datasets that make operational and product analytics reliable at scale.
variables:
  required:
    - name: initiative
      description: Name of the product or program the datasets will support.
    - name: sources
      description: Comma-separated list of upstream sources (e.g., WhatsApp webhooks, Kinesis streams, Snowflake tables).
    - name: consumers
      description: Target consumers (e.g., operations dashboard, finance reports, ML features).
  optional:
    - name: latency_slo
      description: End-to-end freshness target (e.g., <5m, hourly, daily).
    - name: compliance
      description: Regulatory or privacy constraints to respect.
outputs:
  - Canonical dataset contract (grain, schema, SLAs, data quality tests).
  - Pipeline design covering ingestion, transformation, monitoring, and lineage.
  - Rollout plan including backfills, validation, and documentation tasks.
---

# Purpose
Provide a repeatable pattern for analytics engineers to turn raw signals into trusted, performant datasets while coordinating with downstream consumers.

# Pre-run Checklist
- ✅ Validate upstream source quality, access, and retention windows.
- ✅ Confirm priority consumers and success metrics for the dataset.
- ✅ Align with platform owners on storage patterns and cost guardrails.

# Invocation Guidance
```bash
codex skills run data.analytics_engineer \
  --vars "initiative={{initiative}}" \
         "sources={{sources}}" \
         "consumers={{consumers}}" \
         "latency_slo={{latency_slo}}" \
         "compliance={{compliance}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/validate-skills`**: Keep schema alignment for analytics skills before merging catalog updates.
- **Sample artifact – `samples/whatsup-logistics/data/analytics_engineer.md`**: Shows the WhatsUp Logistics ingestion + dbt layering plan.
- **External tools – dbt, Airflow, Snowflake**: Model transforms, orchestrate jobs, and materialize trusted marts.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Publish the analytics engineer skill to IDE and cloud agents for consistent prompts.

# Recommended Input Attachments
- ERDs, upstream schema references, or sample payloads.
- Existing dashboard requirements or Looker/Mode specs.
- Latency and data quality expectations from consumers.

# Claude Workflow Outline
1. Summarize initiative goals, primary consumers, and freshness expectations.
2. Define dataset grain, schema, partitioning, indexing, and storage format decisions.
3. Sketch ingestion and transformation flow, including monitoring, lineage, and cost controls.
4. Plan validation, backfill, and rollout steps with owners and timelines.
5. Document access controls, governance, and documentation deliverables.

# Output Template
```
## Dataset Purpose
- Initiative: {{initiative}}
- Primary consumers: {{consumers}}
- Freshness target: {{latency_slo}}
- Compliance: {{compliance}}

## Contract
- Grain & keys:
- Schema:
- SLAs & SLOs:
- Tests: uniqueness, not-null, freshness, custom checks.

## Pipeline Design
- Sources: {{sources}}
- Ingestion plan:
- Transformations:
- Monitoring & lineage:
- Cost controls:

## Rollout
- Backfill steps:
- Validation plan:
- Documentation & enablement:
- Owners & timelines:
```

# Human Layer: Reflective Practice
- Pause after defining the contract to ensure the dataset truly answers the consumers' needs and avoids over-engineering.
- Acknowledge potential anxiety from downstream teams about schema churn; plan communication empathetically.

# Critical Thinking Loop
- Anticipate how readers will react to latency or scope trade-offs and adjust priorities if a lighter MVP unblocks value faster.
- If new constraints surface (e.g., privacy or infra limits), revisit the approach and re-scope before executing.
