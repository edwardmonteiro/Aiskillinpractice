---
name: run.service_runbook
phase: run
roles:
  - Site Reliability Lead
  - Support Lead
  - On-call Engineer
description: Produce a living runbook for day-2 operations, playbooks, and escalation paths for a production service.
variables:
  required:
    - name: service_name
      description: Name of the production service or capability.
    - name: customer_promises
      description: Key customer or business commitments the service must honor.
  optional:
    - name: runtime_context
      description: Hosting environment, regions, or dependencies to call out.
    - name: escalation_contacts
      description: POCs or rotations responsible for incidents.
outputs:
  - Structured runbook covering service overview, dependencies, SLIs/SLOs, alert routing, and communication templates.
  - Operational dashboards and tooling references tied to each playbook.
  - Follow-up backlog of reliability or automation gaps discovered while drafting the runbook.
---

# Purpose
Document how the team keeps the service healthy after launch, ensuring every engineer and agent can discover the same operational knowledge.

# Pre-run Checklist
- ✅ Confirm the delivery artifacts (tech spec, test plan) capture deployment details.
- ✅ Pull the latest incident history or production telemetry for the service.
- ✅ Align with the support org on escalation boundaries and customer communications.

# Invocation Guidance
```bash
codex skills run run.service_runbook \
  --vars "service_name={{service_name}}" \
         "customer_promises={{customer_promises}}" \
         "runtime_context={{runtime_context}}" \
         "escalation_contacts={{escalation_contacts}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Cross-reference delivery skills (tech spec, test plan) so operational steps inherit implementation truth.
- **Sample artifact – `samples/whatsup-logistics/run/service_runbook.md`**: Mirror the WhatsUp Logistics WhatsApp-first runbook for formatting and tone.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Publish the run skills catalog so IDE and cloud agents can load the runbook template live.
- **External API – Observability stack (e.g., Datadog, New Relic) or WhatsApp Business Cloud API health endpoints**: Link metric snapshots and diagnostic commands into the playbooks.

# Recommended Input Attachments
- Architecture diagram segments specific to runtime dependencies.
- PagerDuty / Opsgenie schedule exports.
- Latest incident postmortems or on-call retro notes.

# Claude Workflow Outline
1. Summarize customer promises and critical service dependencies.
2. Capture SLIs/SLOs with monitoring locations, alert thresholds, and dashboards.
3. Document steady-state procedures (deployments, config changes) and emergency playbooks.
4. Enumerate escalation tiers with contacts and preferred communication channels.
5. Record automation or reliability gaps discovered, including backlog candidates.

# Output Template
```
# {{service_name}} — Production Runbook

## 1. Service Snapshot
- Customer Promises:
- Runtime Context:
- Primary Dependencies:

## 2. Reliability Guardrails
- SLIs & SLO Targets:
- Alert Routing & Dashboards:
- On-call Rotation:

## 3. Standard Operating Procedures
- Deployments:
- Config Changes:
- Access Management:

## 4. Incident Playbooks
| Scenario | Detection Signal | First Actions | Escalation Path | Customer Messaging |
| --- | --- | --- | --- | --- |

## 5. Communication Templates
- Internal Update Template
- External Update Template

## 6. Automation & Improvement Backlog
- Item — Owner — Target Date
```

# Human Layer: Reflective Practice
- **Metacognitive audit**: Continually check whether each runbook entry helps the intended audience (on-call engineers, support leads) act faster; remove fluff that slows response time.
- **Emotional awareness**: Note stress triggers for on-call rotations and encode supportive language in communications to keep morale high during incidents.

# Critical Thinking Loop
- **Empathy-driven validation**: Anticipate how customers and internal stakeholders feel when reading updates; adjust tone, transparency, and cadence accordingly.
- **Strategic recalibration**: If the draft exposes a better operational model (e.g., automation over manual steps), redefine the goal and capture the improved strategy instead of repeating legacy habits.

# Follow-up Actions
- Schedule a runbook review and dry run with on-call responders.
- File backlog items for automation or monitoring gaps uncovered.
- Publish the runbook link in the engineering handbook and incident tooling.
