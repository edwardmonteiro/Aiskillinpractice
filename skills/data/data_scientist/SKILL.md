---
name: data.data_scientist
phase: data
roles:
  - Data Scientist
  - Applied Scientist
  - Analytics Lead
description: Explore data, develop predictive features, and evaluate models that unlock business decisions with rigor and transparency.
variables:
  required:
    - name: objective
      description: Business objective or decision to influence.
    - name: target_metric
      description: Primary metric the model or analysis should move.
    - name: datasets
      description: Key datasets or tables available for exploration.
  optional:
    - name: candidate_models
      description: Algorithms or baselines to compare (e.g., XGBoost, Prophet, logistic regression).
    - name: constraints
      description: Runtime, cost, or fairness considerations.
outputs:
  - Problem framing with success criteria and candidate approaches.
  - Feature plan, experiment design, and offline evaluation checklist.
  - Deployment and monitoring recommendations aligned with engineering teams.
---

# Purpose
Give data scientists a structured flow to frame problems, build models, and hand off production-ready recommendations.

# Pre-run Checklist
- ✅ Verify data quality for the listed datasets (missingness, leakage, stationarity).
- ✅ Align on evaluation metrics and guardrails with stakeholders.
- ✅ Clarify delivery timelines and handoff expectations with ML engineering.

# Invocation Guidance
```bash
codex skills run data.data_scientist \
  --vars "objective={{objective}}" \
         "target_metric={{target_metric}}" \
         "datasets={{datasets}}" \
         "candidate_models={{candidate_models}}" \
         "constraints={{constraints}}"
```

# Toolchain & Integrations
- **Notebook stack – Jupyter + scikit-learn/Keras**: Prototype models and export evaluation artifacts.
- **Sample artifact – `samples/whatsup-logistics/data/data_scientist.md`**: Illustrates exploration and feature planning for Brazilian motorcycle delivery reliability.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Execute repeatable evaluation or data profiling tasks requested by agents.
- **External APIs – Google Maps traffic, IBGE socio-economic indicators**: Enrich features and contextual signals for Brazil-specific demand patterns.

# Recommended Input Attachments
- Data dictionaries, profiling summaries, or small CSV excerpts.
- Prior experiment summaries or baseline benchmarks.
- Constraints on latency, interpretability, or bias mitigation.

# Claude Workflow Outline
1. Clarify the objective, success criteria, and target metric.
2. Summarize available datasets, risks, and data quality notes.
3. Propose candidate features and model families with evaluation design.
4. Outline experiment steps, cross-validation, and offline metrics.
5. Recommend deployment path, monitoring, and alignment with ML engineers.

# Output Template
```
## Problem & Objective
- Objective: {{objective}}
- Target metric: {{target_metric}}
- Constraints: {{constraints}}

## Data Landscape
- Datasets: {{datasets}}
- Risks/quality notes:

## Approach
- Candidate models: {{candidate_models}}
- Feature ideas:
- Evaluation plan:

## Deployment & Monitoring
- Handoff notes for ML engineering:
- Rollout + monitoring plan:
```

# Human Layer: Reflective Practice
- Periodically question whether the modeling effort is the simplest way to influence the metric; consider heuristic baselines first.
- Be mindful of stakeholder expectations about explainability and address concerns proactively.

# Critical Thinking Loop
- Anticipate how readers will respond to trade-offs between accuracy and interpretability; adjust framing to keep trust.
- If exploration reveals a better objective or feature strategy, revisit goals and propose a sharper plan instead of forcing the initial path.
