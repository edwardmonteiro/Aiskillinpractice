---
name: design.cx_lead
phase: design
roles:
  - CX Lead
  - Service Designer
  - Product Manager
  - Operations Partner
description: Shape an end-to-end service blueprint and CX guardrails that connect digital flows, support channels, and operational handoffs.
variables:
  required:
    - name: product
      description: Product, service, or journey slice to design.
    - name: personas
      description: Primary and secondary personas (with accessibility considerations).
    - name: channels
      description: Channels in scope (WhatsApp, web, in-app, live ops, etc.).
  optional:
    - name: constraints
      description: Known regulatory, brand, or platform constraints.
    - name: linked_skills
      description: Upstream or downstream skills to chain (comma separated).
outputs:
  - CX blueprint with frontstage/backstage swimlanes and channel-specific moments of truth.
  - Guardrails that downstream UX/design/delivery skills must respect (latency, tone, privacy, escalation rules).
  - Action list for data/ML partners to capture signals and instrument experience KPIs.
---

# Purpose
Create a composable, channel-aware CX blueprint so engineers, designers, and data teams can operate in parallel without conflicting assumptions.

# Pre-run Checklist
- ✅ Confirm personas and channels match the latest discovery/user research outputs.
- ✅ Pull any WhatsApp constraints or platform rules that affect agent automations.
- ✅ Gather prior incidents or customer complaints to inform moments of truth.

# Invocation Guidance
```bash
codex skills run design.cx_lead \
  --vars "product={{product}}" \
         "personas={{personas}}" \
         "channels={{channels}}" \
         "constraints={{constraints}}" \
         "linked_skills={{linked_skills}}"
```

# Toolchain & Integrations
- **Web guide – `docs/functional-skill-architecture.md`**: Follow the functional contract (inputs/outputs, idempotent artifacts) when drafting the blueprint.
- **Spec workspace – `specs/projects/whatsup-logistics/sdd.md`**: Link CX guardrails directly into the Skills Bridge and non-functional sections.
- **Sample artifact – `samples/whatsup-logistics/design/cx_lead.md`**: Mirror the WhatsApp-native blueprint structure and adjust for your initiative.
- **Validation – `scripts/validate-skills`**: Run after edits to ensure naming/phase alignment remains correct.
- **MCP executor – `mcp/servers/skill_executor/server.py`**: Automate saving the blueprint or notifying channel owners from IDE or cloud agents.

# Implementation Notes
- **Functional chain**: Treat the CX blueprint as a pure function—derive it from personas/channels and write it to a stable file path so downstream skills can consume it deterministically.
- **Guardrail-first**: Explicitly state tone, privacy, latency, and escalation constraints; delivery and run skills must not override them.
- **Service seams**: Call out handoffs between bots, humans, and physical operations so data and ML engineers can instrument the right signals.

# Human Layer: Reflective Practice
- **Audience empathy**: Re-check how frontline teams and riders might interpret the blueprint; adjust language to reduce friction.
- **Self-audit**: Pause after each stage to ensure the CX story matches the problem framing and no persona is underserved.

# Critical Thinking Loop
- **Impact scan**: Consider how changes to any single channel (for example, WhatsApp rate limits) ripple through the experience; revise the plan rather than forcing the old flow.
- **Bias check**: Challenge assumptions about user tech literacy, device capabilities, or network conditions before locking in flows.

# Follow-up Checklist
- [ ] Publish the blueprint next to the SDD and notify design/delivery owners.
- [ ] Capture instrumentation asks for data/ML partners and add them to the backlog.
- [ ] Log the run in `samples/whatsup-logistics/skill-run-log.json` or your project log.
