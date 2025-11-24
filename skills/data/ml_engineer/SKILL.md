---
name: data.ml_engineer
phase: data
roles:
  - Machine Learning Engineer
  - Platform Engineer
  - Reliability Engineer
description: Operationalize models from notebooks into scalable, observable, and maintainable services.
variables:
  required:
    - name: model_name
      description: Name of the model to productionize.
    - name: runtime_target
      description: Target runtime or stack (e.g., Scala service, Clojure job, Python microservice).
    - name: interfaces
      description: Interfaces or endpoints required (e.g., REST, gRPC, batch jobs).
  optional:
    - name: performance_slo
      description: Latency/throughput targets and model-specific thresholds.
    - name: rollout_strategy
      description: Deployment approach (e.g., canary, shadow, AB test).
outputs:
  - Architecture plan bridging research artifacts to production code.
  - Deployment checklist with feature flags, rollbacks, and observability hooks.
  - Monitoring and maintenance playbook aligned with SRE and data science.
---

# Purpose
Provide a reliable pathway to take research models into production while keeping parity with data science intent and platform guardrails.

# Pre-run Checklist
- ✅ Confirm model artifact availability (weights, dependencies, serialization format).
- ✅ Align with data scientists on expected inputs, outputs, and validation thresholds.
- ✅ Review infra constraints (language portability, GPU/CPU availability, cost budgets).

# Invocation Guidance
```bash
codex skills run data.ml_engineer \
  --vars "model_name={{model_name}}" \
         "runtime_target={{runtime_target}}" \
         "interfaces={{interfaces}}" \
         "performance_slo={{performance_slo}}" \
         "rollout_strategy={{rollout_strategy}}"
```

# Toolchain & Integrations
- **Deployment stacks – Scala/Clojure services + Docker/Kubernetes**: Port models into production runtimes with CI/CD hooks.
- **Sample artifact – `samples/whatsup-logistics/data/ml_engineer.md`**: Captures the WhatsUp Logistics rollout plan for stall-detection models.
- **Monitoring – Datadog + custom drift checks**: Track performance, drift, and health with alert thresholds tied to SLOs.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Execute scaffolding scripts or validation commands requested during productionization.

# Recommended Input Attachments
- Link to research notebook or model registry entry.
- API contracts or payload schemas.
- Deployment environment constraints or service templates.

# Claude Workflow Outline
1. Restate the model objective and expected business impact.
2. Define runtime architecture, dependencies, and interface contracts.
3. Map validation and canary/shadow rollout steps with observability and drift monitoring.
4. Document reliability safeguards (circuit breakers, rollbacks, fallback models).
5. Assign owners for maintenance, retraining cadence, and incident response.

# Output Template
```
## Model Overview
- Model: {{model_name}}
- Runtime target: {{runtime_target}}
- Interfaces: {{interfaces}}
- Performance SLO: {{performance_slo}}
- Rollout: {{rollout_strategy}}

## Architecture & Integration
- Packaging + dependencies:
- Serving pattern:
- Data contracts:
- Infra notes:

## Deployment & Safety
- Validation steps:
- Canary/shadow plan:
- Observability + drift checks:
- Rollback + fallback plan:

## Ownership
- Operators:
- Retraining cadence:
- Incident response hooks:
```

# Human Layer: Reflective Practice
- Check whether the production plan preserves the spirit of the research model; avoid optimizing for infra at the expense of accuracy or trust.
- Recognize the stress that late-stage changes can cause to data scientists and SREs; communicate timelines and risks openly.

# Critical Thinking Loop
- Anticipate how reviewers might react to complexity vs. reliability trade-offs and adjust to reduce operational burden.
- If constraints make the current approach fragile, step back and redefine the deployment strategy rather than forcing an unsafe rollout.
