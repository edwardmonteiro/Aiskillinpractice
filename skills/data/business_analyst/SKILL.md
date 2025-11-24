---
name: data.business_analyst
phase: data
roles:
  - Business Analyst
  - Strategy Lead
  - Operations Analyst
description: Translate business questions into analyses, experiments, and decisions that balance company and customer perspectives.
variables:
  required:
    - name: question
      description: Core business question or decision to address.
    - name: stakeholders
      description: Primary stakeholder groups (e.g., Operations, Finance, Support).
    - name: timeframe
      description: Time period for the analysis or decision window.
  optional:
    - name: hypotheses
      description: Initial hypotheses to validate.
    - name: success_metric
      description: Metric that defines success for the initiative.
outputs:
  - Decision brief with context, hypotheses, and recommended experiments.
  - Test design and monitoring plan.
  - Implementation follow-up tasks with owners and timelines.
---

# Purpose
Equip business analysts with a structured path from question to decision, ensuring tests, metrics, and narratives stay aligned across teams.

# Pre-run Checklist
- ✅ Confirm stakeholder goals and constraints (budget, capacity, risk appetite).
- ✅ Gather baseline metrics and any prior experiment results.
- ✅ Align on how success will be measured and communicated.

# Invocation Guidance
```bash
codex skills run data.business_analyst \
  --vars "question={{question}}" \
         "stakeholders={{stakeholders}}" \
         "timeframe={{timeframe}}" \
         "hypotheses={{hypotheses}}" \
         "success_metric={{success_metric}}"
```

# Toolchain & Integrations
- **BI stack – Looker/Mode/Metabase**: Run queries and visualize results that feed the decision brief.
- **Sample artifact – `samples/whatsup-logistics/data/business_analyst.md`**: Shows how WhatsUp Logistics balanced company vs. courier experience in test design.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Keep the decisioning skill discoverable for local/cloud agents during planning.
- **Scripts – `scripts/list-skills` + `scripts/validate-skills`**: Ensure agents enumerate the latest decisioning prompt and it passes governance before handoff.

# Recommended Input Attachments
- KPI dashboards or CSV exports for the timeframe in scope.
- Stakeholder notes from planning sessions.
- Any existing A/B test or pilot summaries.

# Claude Workflow Outline
1. Restate the business question, stakeholders, and timeframe.
2. Capture hypotheses, potential risks, and decision criteria.
3. Propose experiment/test design with metrics, guardrails, and sample size considerations.
4. Outline analysis steps, success evaluation, and communication plan.
5. Recommend follow-up actions and accountability once results arrive.

# Output Template
```
## Decision Context
- Question: {{question}}
- Stakeholders: {{stakeholders}}
- Timeframe: {{timeframe}}
- Success metric: {{success_metric}}

## Hypotheses & Risks
- Hypotheses: {{hypotheses}}
- Risks/assumptions:

## Experiment / Analysis Plan
- Design:
- Metrics & guardrails:
- Data sources:
- Timeline:

## Recommendations & Next Steps
- Provisional answer:
- Implementation tasks:
- Owners & deadlines:
```

# Human Layer: Reflective Practice
- Check whether the analysis scope answers the real stakeholder concern and remains sensitive to customer impact.
- Acknowledge emotions around risk tolerance or conflicting incentives; surface them to keep alignment.

# Critical Thinking Loop
- Anticipate how stakeholders might interpret results; adjust the narrative to prevent misreads.
- If a better path emerges (e.g., a faster proxy test), pivot the plan instead of rigidly following the first design.
