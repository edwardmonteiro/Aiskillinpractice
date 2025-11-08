---
name: delivery.dashboard_brief
phase: delivery
roles:
  - Data Analyst
  - Product Designer
description: Align analysts and designers on the goals, requirements, and storytelling approach for a new or updated dashboard.
variables:
  required:
    - name: audience
      description: Primary audience for the dashboard.
    - name: decisions
      description: Decisions or actions the dashboard should enable.
  optional:
    - name: data_sources
      description: Key data sources feeding the dashboard.
    - name: design_language
      description: Design system or visualization guidelines.
outputs:
  - Dashboard goals and narrative structure.
  - Data requirements, transformations, and quality checks.
  - Wireframe outline with recommended visualizations and interactions.
---

# Purpose
Ensure analytics and design have a shared blueprint before building dashboards, reducing iteration and aligning on data storytelling.

# Pre-run Checklist
- ✅ Gather stakeholder requirements and success metrics.
- ✅ Review existing dashboards or reports serving similar needs.
- ✅ Confirm data availability and latency expectations.

# Invocation Guidance
```bash
codex run --skill delivery.dashboard_brief \
  --vars "audience={{audience}}" \
         "decisions={{decisions}}" \
         "data_sources={{data_sources}}" \
         "design_language={{design_language}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Pull companion skills like `definition.metric_catalog` or `optimization.metric_review` to align metrics and storytelling.
- **Sample artifact – `samples/whatsup-logistics/delivery/dashboard_brief.md`**: Use the WhatsUp Logistics brief as a reference for narrative flow and visualization mapping.
- **External API – Looker & Metabase REST APIs**: Inspect existing dashboards or seed prototypes using authenticated API calls.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Share the dashboard blueprint skill with agents embedded in IDEs or analytics notebooks.

# Recommended Input Attachments
- Sample dashboards or inspiration references.
- Data dictionary or metric catalog extracts.
- UX research on stakeholder workflows.

# Claude Workflow Outline
1. Summarize audience, decisions, and context.
2. Define dashboard objectives, success metrics, and narrative flow.
3. Detail data sources, transformations, and quality considerations.
4. Recommend visualization choices mapped to user questions.
5. Outline collaboration plan, milestones, and review cadence.

# Output Template
```
## Dashboard Brief
### Audience & Decisions
- Audience:
- Key Decisions:

### Narrative Flow
1. Context
2. Explore
3. Act

### Data Requirements
| Source | Metric | Transformation | Quality Checks | Owner |
| --- | --- | --- | --- | --- |

### Visualization Outline
| Section | Visual Type | Purpose | Notes |
| --- | --- | --- | --- |

### Collaboration Plan
- Milestones:
- Feedback Rituals:
- Open Questions:
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Create build tasks for analytics engineering and design.
- Validate data quality before stakeholder preview.
- Schedule enablement session to walk through the dashboard story.
