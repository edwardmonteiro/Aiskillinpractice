---
name: data.ml_platform_engineer
phase: data
roles:
  - ML Platform Engineer
  - MLOps Engineer
  - Reliability Engineer
description: Build and maintain serving, feature, and monitoring platforms so models ship safely and run reliably.
variables:
  required:
    - name: platform_scope
      description: Scope of platform capability to deliver (serving, features, monitoring, labeling).
    - name: tenant_teams
      description: Teams or services that will onboard first.
    - name: reliability_targets
      description: Target SLOs/SLIs for availability, latency, and drift detection.
  optional:
    - name: compliance_requirements
      description: Regulatory or privacy expectations to encode in platform defaults.
    - name: automation_hooks
      description: Existing pipelines or MCP servers to integrate.
outputs:
  - Platform capability brief with architecture options and trade-offs.
  - Implementation backlog with automation hooks for IDE/cloud agents.
  - Runbook alignment (monitoring, alerting, and rollback patterns) shared with operations teams.
---

# Purpose
Provide a reusable MLOps pathway that keeps Claude Skills grounded in reliable platform primitives rather than ad hoc scripts.

# Pre-run Checklist
- ✅ Confirm tenant teams and their model/feature requirements.
- ✅ Collect compliance and security controls to bake into defaults.
- ✅ Align reliability targets with run and incident response skills.

# Invocation Guidance
```bash
codex skills run data.ml_platform_engineer \
  --vars "platform_scope={{platform_scope}}" \
         "tenant_teams={{tenant_teams}}" \
         "reliability_targets={{reliability_targets}}" \
         "compliance_requirements={{compliance_requirements}}" \
         "automation_hooks={{automation_hooks}}"
```

# Toolchain & Integrations
- **Functional guide – `docs/functional-skill-architecture.md`**: Compose platform capabilities as pure modules that agents can call.
- **Specs – `specs/projects/whatsup-logistics/sdd.md`**: Capture platform defaults and integrations in the Skills Bridge.
- **Samples – `samples/whatsup-logistics/data/ml_platform_engineer.md`**: Example platform capability brief for the WhatsApp tracker.
- **Validation – `scripts/validate-skills`**: Check metadata before merging.
- **MCP – `mcp/servers/skills_catalog/server.py`**: Advertise platform tasks so agents can self-serve provisioning or checks.

# Implementation Notes
- **Golden paths**: Document blessed pipelines, serving stacks, and observability defaults as reusable functions.
- **Automation**: Prefer MCP/executor hooks and IaC snippets over manual steps so cloud agents can help operate the platform.
- **Reliability**: Tie alert routes and error budgets to run/incident response skills; publish dashboards for tenants.

# Human Layer: Reflective Practice
- **Operator empathy**: Consider support load on platform and tenant teams; simplify onboarding where possible.
- **Bias check**: Ensure defaults do not favor a single team or geography at the expense of others.

# Critical Thinking Loop
- **Trade-off review**: Re-evaluate build vs. buy and on-prem vs. managed choices as requirements evolve.
- **Strategy pivot**: If platform scope creeps beyond capacity, narrow to a minimal golden path and stage expansions.

# Follow-up Checklist
- [ ] Publish platform capability brief and backlog.
- [ ] Align runbooks and alerting with operations.
- [ ] Log the skill run with artifact links in the project log.
