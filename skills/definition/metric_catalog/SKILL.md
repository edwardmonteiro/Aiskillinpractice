---
name: definition.metric_catalog
phase: definition
roles:
  - Data Analyst
  - Product Manager
description: Document key metrics, definitions, and segmentation required to track product success.
variables:
  required:
    - name: theme
      description: Product or business theme (e.g., Activation, Retention).
    - name: required_segments
      description: Segmentation dimensions needed for reporting.
  optional:
    - name: measurement_tools
      description: Analytics tools or warehouses where metrics live.
    - name: stakeholders
      description: Stakeholders who rely on the metrics.
outputs:
  - Metric catalog with definitions, formulas, and owners.
  - Segmentation guidance and data availability notes.
  - Instrumentation or governance checklist.
---

# Purpose
Ensure product and analytics teams align on the metrics that matter, how they are defined, and how they will be reported.

# Pre-run Checklist
- ✅ Review existing dashboards and metric definitions.
- ✅ Confirm segmentation requirements with stakeholders.
- ✅ Verify data availability or instrumentation plans for new metrics.

# Invocation Guidance
```bash
codex run --skill definition.metric_catalog \
  --vars "theme={{theme}}" \
         "required_segments={{required_segments}}" \
         "measurement_tools={{measurement_tools}}" \
         "stakeholders={{stakeholders}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Confirm downstream definition and delivery skills before finalizing catalog owners.
- **Sample artifact – `samples/whatsup-logistics/definition/metric_catalog.md`**: Model catalog structure, segmentation notes, and governance checklists after the WhatsUp Logistics example.
- **External API – Looker & dbt metadata endpoints**: Pull canonical metric definitions and lineage to embed accurate formulas.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Trigger warehouse validation or metric freshness checks via MCP automations.

# Recommended Input Attachments
- Current metric definitions or SQL queries.
- Business reviews or KPI scorecards.

# Claude Workflow Outline
1. Summarize the theme and stakeholders.
2. Build a catalog table with metric names, definitions, formulas, owners, and tools.
3. Detail segmentation requirements, data sources, and known gaps.
4. Provide governance and instrumentation checklist for each metric.
5. Suggest review cadence and communication plan.

# Output Template
```
## Metric Catalog — {{theme}}
| Metric | Definition | Formula / Source | Owner | Tool | Segments |
| --- | --- | --- | --- | --- | --- |

## Segmentation Guidance
- Required Segments:
- Data Availability:
- Known Gaps:

## Governance & Instrumentation
| Metric | Quality Checks | Instrumentation Actions | Review Cadence |
| --- | --- | --- | --- |
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Publish the catalog in the analytics knowledge base.
- Align with engineering on instrumentation stories.
- Schedule periodic metric reviews to ensure definitions stay current.
