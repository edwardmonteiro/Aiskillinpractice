---
name: discovery.data_audit
phase: discovery
roles:
  - Data Analyst
  - Analytics Engineer
description: Inventory available datasets, instrumentation gaps, and data quality considerations for the initiative.
variables:
  required:
    - name: domain
      description: Product area or journey requiring data assessment.
    - name: decision_goals
      description: Business or product decisions the data should support.
  optional:
    - name: current_sources
      description: Known data sources or dashboards already leveraged.
    - name: compliance_flags
      description: Privacy or governance issues to consider.
outputs:
  - Data catalog listing sources, owners, freshness, and accessibility.
  - Gap analysis with recommended instrumentation or ETL changes.
  - Alignment summary on how data will support upcoming decisions.
---

# Purpose
Give analytics partners a reusable way to surface the state of data readiness and highlight what is needed to support discovery.

# Pre-run Checklist
- ✅ Access existing schema documentation or data dictionaries.
- ✅ Review outstanding data governance tickets or debt.
- ✅ Align with product on the decision timeline and required fidelity.

# Invocation Guidance
```bash
codex skills run discovery.data_audit \
  --vars "domain={{domain}}" \
         "decision_goals={{decision_goals}}" \
         "current_sources={{current_sources}}" \
         "compliance_flags={{compliance_flags}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Enumerate the current discovery catalog so analysts can cite consistent skill names in their notes and prompts.
- **Sample artifact – `samples/whatsup-logistics/discovery/data_audit.md`**: Use the WhatsUp Logistics deliverable as a benchmark for structure and depth.
- **External API – Data warehouse connectors (BigQuery/Snowflake)**: Pull freshness, ownership, and lineage details directly from governed warehouse metadata services.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Allow IDE and cloud agents to pull the same discovery inventory via MCP before contributing findings.

# Recommended Input Attachments
- Links to Looker/Mode dashboards or warehouse tables.
- Screenshots of tracking plans or event schemas.

# Claude Workflow Outline
1. Summarize the decision goals and domain context.
2. Produce a data catalog table with source details, owners, freshness, and trust level.
3. Identify instrumentation or modeling gaps blocking the decision goals.
4. Recommend implementation steps, owners, and sequencing.
5. Outline interim proxies or experiments while data gaps are addressed.

# Output Template
```
## Data Inventory
| Source | Owner | Freshness | Accessibility | Trust Level | Notes |
| --- | --- | --- | --- | --- | --- |

## Gaps & Recommendations
1. Gap — Impact — Suggested Fix — Owner — Timeline

## Decision Support Plan
- Immediate next step:
- Interim proxy:
- Long-term instrumentation:
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- File tracking or warehouse work items with clear acceptance criteria.
- Communicate data readiness to product and engineering leadership.
- Schedule follow-up audits post-implementation.
