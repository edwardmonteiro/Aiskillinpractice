---
name: run.incident_response
phase: run
roles:
  - Incident Commander
  - Reliability Engineer
  - Customer Support Lead
description: Guide real-time coordination, diagnostics, and communications when a production incident occurs.
variables:
  required:
    - name: incident_id
      description: Identifier or short name for the active incident.
    - name: impact_summary
      description: Known customer or business impact at the start of the incident.
  optional:
    - name: suspected_systems
      description: Initial hypotheses or components to investigate.
    - name: stakeholders
      description: Teams or executives requiring status updates.
outputs:
  - Incident timeline with roles, hypotheses, decisions, and next actions.
  - Diagnostic plan covering tooling, logs, experiments, and rollback options.
  - Customer and stakeholder communication templates tailored to the scenario.
---

# Purpose
Ensure every responder (human or AI) runs the same, calm playbook to triage, communicate, and resolve incidents quickly.

# Pre-run Checklist
- ✅ Confirm the production runbook and escalation matrix are accessible.
- ✅ Identify the current incident commander and note-taking scribe.
- ✅ Establish secure channels (e.g., WhatsApp war room, Slack bridge) for real-time collaboration.

# Invocation Guidance
```bash
codex skills run run.incident_response \
  --vars "incident_id={{incident_id}}" \
         "impact_summary={{impact_summary}}" \
         "suspected_systems={{suspected_systems}}" \
         "stakeholders={{stakeholders}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Bring in context from `run.service_runbook` and delivery skills while coordinating a response.
- **Sample artifact – `samples/whatsup-logistics/run/incident_response.md`**: Study the WhatsUp Logistics incident narrative for tone and structure.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Trigger diagnostic scripts, log tailers, or remediation commands from IDE/cloud agents without context loss.
- **External APIs – PagerDuty, WhatsApp Business Cloud message templates**: Send automated notifications or collect telemetry via MCP requests or HTTP calls.

# Recommended Input Attachments
- Latest monitoring snapshots or Grafana dashboards.
- Links to relevant runbook sections or ADRs.
- Customer ticket counts or live support transcripts.

# Claude Workflow Outline
1. Restate the incident context, severity, and impact to align responders.
2. Assign roles (incident commander, communications lead, operations) and log owners.
3. Outline investigative steps, instrumentation to query, and checkpoints to reassess.
4. Draft customer-facing messages with empathetic tone and data-backed updates.
5. Capture follow-up actions (postmortem prep, backlog fixes) as soon as mitigation is confirmed.

# Output Template
```
# Incident {{incident_id}} — Live Response Plan

## 1. Situation Overview
- Start Time:
- Impact Summary:
- Affected Regions / Users:
- Suspected Systems:

## 2. Roles & Channels
| Role | Owner | Contact | Primary Channel |
| --- | --- | --- | --- |

## 3. Investigation Timeline
| Time | Action | Owner | Notes |
| --- | --- | --- | --- |

## 4. Customer Communications
- Internal status template
- External / WhatsApp template

## 5. Mitigation & Verification Checklist
- [ ] Action — Owner

## 6. Post-incident Follow-up
- Postmortem Owner:
- Target Date:
- Backlog Items:
```

# Human Layer: Reflective Practice
- **Real-time metacognition**: Pause periodically to ask whether the plan is solving the actual customer pain or just chasing noise; adjust hypotheses quickly.
- **Emotional/social awareness**: Track responder stress levels and escalate support (swaps, breaks, extra scribes) to maintain clarity under pressure.

# Critical Thinking Loop
- **Audience empathy**: Predict how executives or customers will interpret each update; adjust clarity and candor to build trust.
- **Strategic reframing**: If new data suggests a different blast radius or better mitigation path, redefine goals mid-response and communicate the shift explicitly.

# Follow-up Actions
- Schedule the postmortem and pre-fill it with the captured timeline.
- Close the incident with a final status note and ensure customer communications are archived.
- Update the runbook and automation backlog based on lessons learned.
