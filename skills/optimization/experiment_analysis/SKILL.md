---
name: optimization.experiment_analysis
phase: optimization
roles:
  - Data Analyst
  - Product Manager
description: Analyze completed experiments and craft executive-ready summaries with insights and recommendations.
variables:
  required:
    - name: experiment_name
      description: Identifier for the experiment.
    - name: primary_metric
      description: Primary metric evaluated.
  optional:
    - name: secondary_metrics
      description: Additional metrics tracked.
    - name: audience
      description: Audience for the analysis (e.g., execs, squad).
outputs:
  - Results summary with statistical interpretation.
  - Customer and business impact assessment.
  - Recommendations and decision rationale.
---

# Purpose
Accelerate experiment readouts by combining statistical rigor with storytelling tailored to executive stakeholders.

# Pre-run Checklist
- ✅ Export experiment results (variant metrics, significance, sample sizes).
- ✅ Gather qualitative feedback or session notes if applicable.
- ✅ Align on rollout decisions pending the analysis.

# Invocation Guidance
```bash
codex run --skill optimization.experiment_analysis \
  --input data/{{experiment_name}}-results.csv \
  --vars "experiment_name={{experiment_name}}" \
         "primary_metric={{primary_metric}}" \
         "secondary_metrics={{secondary_metrics}}" \
         "audience={{audience}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Queue follow-up optimization skills (metric_review, quality_report) as part of the experiment program.
- **Sample artifact – `samples/whatsup-logistics/optimization/experiment_analysis.md`**: Emulate the WhatsUp Logistics storytelling style and statistical framing.
- **External API – Amplitude & SQL warehouse connections**: Pull segment-level experiment results directly into the prompt via Python or MCP commands.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Execute analysis notebooks or statistical scripts that enrich the narrative.

# Recommended Input Attachments
- Experiment tracking sheet or stats engine export.
- Screenshots of variants.
- Customer feedback related to the experiment.

# Claude Workflow Outline
1. Summarize experiment purpose, setup, and success criteria.
2. Present results for primary and secondary metrics with statistical significance.
3. Interpret findings, including customer behavior shifts and operational considerations.
4. Recommend decisions (ship, iterate, stop) with supporting rationale.
5. Highlight next steps, follow-up analyses, and knowledge base updates.

# Output Template
```
# Experiment Analysis — {{experiment_name}}

## Overview
- Objective:
- Dates:
- Audience:

## Results Summary
| Metric | Control | Variant | Δ | Significance | Notes |
| --- | --- | --- | --- | --- | --- |

## Interpretation
- Customer Impact:
- Business Impact:
- Operational Considerations:

## Recommendation
- Decision:
- Rationale:
- Dependencies:

## Next Steps
- Action:
- Owner:
- Timeline:
```

# Follow-up Actions
- Present findings in the growth or optimization forum.
- Update experiment backlog with learnings and links to artifacts.
- Coordinate rollout or rollback actions per recommendation.
