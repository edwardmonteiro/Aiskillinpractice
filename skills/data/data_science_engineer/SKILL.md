---
name: data.data_science_engineer
phase: data
roles:
  - Data Science Engineer
  - ML Engineer
  - Analytics Engineer
description: Productionize research notebooks into reliable services and shared feature stores while preserving scientific rigor.
variables:
  required:
    - name: model_scope
      description: Business problem or model family to operationalize.
    - name: training_assets
      description: Pointers to datasets, notebooks, and experiment logs.
    - name: runtime_constraints
      description: Latency, cost, and privacy requirements for serving.
  optional:
    - name: governance_links
      description: Links to risk reviews, approvals, or audits.
    - name: consumers
      description: Downstream clients (APIs, batch jobs, dashboards).
outputs:
  - Productionization plan mapping notebook artifacts to services, jobs, or features.
  - Testing and monitoring matrix (data drift, performance, fairness) aligned to runbooks.
  - Deployment and rollback steps coordinated with delivery and run skills.
---

# Purpose
Bridge research and production with a functional, repeatable workflow that agents and engineers can execute together.

# Pre-run Checklist
- ✅ Collect the latest experiment metrics and champion model artifacts.
- ✅ Verify data contracts and privacy rules for training and inference.
- ✅ Align runtime constraints with run/incident response expectations.

# Invocation Guidance
```bash
codex skills run data.data_science_engineer \
  --vars "model_scope={{model_scope}}" \
         "training_assets={{training_assets}}" \
         "runtime_constraints={{runtime_constraints}}" \
         "governance_links={{governance_links}}" \
         "consumers={{consumers}}"
```

# Toolchain & Integrations
- **Functional guide – `docs/functional-skill-architecture.md`**: Treat promotion steps as pure transformations from notebooks to services/features.
- **Specs – `specs/projects/whatsup-logistics/sdd.md`**: Update the Skills Bridge with serving patterns and monitoring hooks.
- **Samples – `samples/whatsup-logistics/data/data_science_engineer.md`**: Example conversion of experimentation assets into production paths.
- **Validation – `scripts/validate-skills`**: Verify metadata before merging.
- **MCP – `mcp/servers/skill_executor/server.py`**: Automate linting, packaging, or canary checks from agents.

# Implementation Notes
- **Reproducibility**: Pin datasets, seeds, and dependencies; codify pipelines as code using the functional patterns in the guide.
- **Safety**: Include fairness, bias, and privacy checks; align alerting with run/incident skills.
- **Handoffs**: Provide explicit API contracts and dashboards so consuming teams can integrate without rework.

# Human Layer: Reflective Practice
- **Risk awareness**: Re-examine potential harms or drift impacts on users; adjust rollout plans accordingly.
- **Audience check**: Ensure docs meet both researcher and operator needs without assuming prior context.

# Critical Thinking Loop
- **Alternate paths**: If serving constraints clash with model quality, consider lightweight baselines or hybrid approaches.
- **Strategy reset**: Revisit goals if experiment evidence suggests a different objective will deliver more value.

# Follow-up Checklist
- [ ] Publish serving contracts and monitoring dashboards.
- [ ] Schedule a walkthrough with research, data engineering, and run owners.
- [ ] Log the run and links to production assets in the project skill log.
