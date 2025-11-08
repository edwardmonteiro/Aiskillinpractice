---
name: optimization.experiment_brief
phase: optimization
roles:
  - Product Designer
  - Product Manager
description: Prepare an experiment brief outlining hypothesis, design, success metrics, and operational plan.
variables:
  required:
    - name: hypothesis
      description: Hypothesis statement to validate.
    - name: primary_metric
      description: Primary metric measuring experiment success.
  optional:
    - name: secondary_metrics
      description: Supporting or guardrail metrics.
    - name: audience
      description: User segment or cohort being targeted.
outputs:
  - Experiment overview with hypothesis, rationale, and metrics.
  - Test design including variants, sample size, and timeline.
  - Operational checklist for launch, monitoring, and decision-making.
---

# Purpose
Ensure experiments are well-defined, measurable, and aligned with user experience considerations before launch.

# Pre-run Checklist
- ✅ Align with analytics on measurement feasibility and sample size.
- ✅ Confirm design assets and engineering bandwidth for variants.
- ✅ Review related research or previous experiments for context.

# Invocation Guidance
```bash
codex run --skill optimization.experiment_brief \
  --vars "hypothesis={{hypothesis}}" \
         "primary_metric={{primary_metric}}" \
         "secondary_metrics={{secondary_metrics}}" \
         "audience={{audience}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Connect the brief to upstream OKRs and downstream experiment analysis skills for full lifecycle tracking.
- **Sample artifact – `samples/whatsup-logistics/optimization/experiment_brief.md`**: Use the WhatsUp Logistics brief as a template for hypotheses and guardrail mapping.
- **External API – Optimizely/LaunchDarkly REST APIs**: Pre-seed experiment configurations or feature flag setups from within the workflow.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Share the experiment brief prompt with remote experimentation agents or analytics notebooks.

# Recommended Input Attachments
- Design mockups or copy variations.
- Experiment backlog or learning agenda.
- Prior experiment analyses.

# Claude Workflow Outline
1. Summarize hypothesis, audience, and metrics.
2. Detail the experiment design: variants, allocation, instrumentation, and run duration.
3. Provide sample size estimation guidance and data dependencies.
4. Outline monitoring plan, success criteria, and decision framework.
5. Document collaboration and approval workflow.

# Output Template
```
## Experiment Overview
- Hypothesis:
- Audience:
- Primary Metric:
- Secondary Metrics:

## Test Design
| Variant | Description | % Allocation | Key Changes |
| --- | --- | --- | --- |
- Expected Duration:
- Sample Size Estimate:

## Measurement & Monitoring
- Instrumentation Checklist:
- Data Quality Checks:
- Decision Cadence:

## Launch Plan
- Approvals:
- Launch Date:
- Responsibilities:
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Secure approvals from product, design, engineering, and analytics leads.
- Schedule mid-test reviews to monitor guardrails.
- Plan post-test readout session.
