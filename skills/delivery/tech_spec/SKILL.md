---
name: delivery.tech_spec
phase: delivery
roles:
  - Engineering Lead
  - Feature Team Engineer
description: Produce an implementation-ready technical specification with architecture, sequencing, and validation details.
variables:
  required:
    - name: feature
      description: Feature or capability to be implemented.
    - name: objectives
      description: Desired business or customer outcomes for the work.
  optional:
    - name: constraints
      description: Technical, compliance, or timeline constraints.
    - name: integrations
      description: External systems or services impacted.
outputs:
  - Technical design overview with diagrams and data flow descriptions.
  - Implementation plan with milestones and task breakdown.
  - Validation strategy including testing, monitoring, and rollout considerations.
---

# Purpose
Accelerate engineering planning by generating a comprehensive spec template aligned with the squad's delivery standards.

# Pre-run Checklist
- ✅ Confirm definition artifacts (story map, spikes) are finalized.
- ✅ Align on target release milestone and success metrics.
- ✅ Gather existing system diagrams or API documentation.

# Invocation Guidance
```bash
codex skills run delivery.tech_spec \
  --vars "feature={{feature}}" \
         "objectives={{objectives}}" \
         "constraints={{constraints}}" \
         "integrations={{integrations}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Reference inputs from discovery and definition phases to keep the spec grounded in prior decisions.
- **Python CLI – `scripts/validate-skills`**: Confirm any new skill references or updates introduced by the spec remain compliant.
- **Sample artifact – `samples/whatsup-logistics/delivery/tech_spec.md`**: Mirror the WhatsUp Logistics architecture and sequencing pattern for WhatsApp-first delivery tracking.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Execute architecture diagram generators or static analysis scripts through remote agents.
- **External API – WhatsApp Business Cloud API docs**: Link to the Graph API endpoints leveraged by the delivery tracker implementation.

# Recommended Input Attachments
- Architecture or sequence diagrams.
- API contracts or schema definitions.
- Relevant RFCs or ADRs.

# Claude Workflow Outline
1. Summarize feature objectives, constraints, and integration points.
2. Describe the target architecture, including components, data flows, and failure handling.
3. Outline implementation phases with tasks, owners, and dependencies.
4. Define validation strategy: testing, monitoring, observability, and rollout plan.
5. Provide documentation and review checklist.

# Output Template
```
# Technical Specification — {{feature}}

## 1. Summary & Objectives
- Objectives:
- Success Metrics:
- Constraints:

## 2. Architecture Overview
- Component Diagram Description
- Data Flow:
- Failure Modes & Mitigations:

## 3. Implementation Plan
| Milestone | Tasks | Owner | Dependencies | Target Date |
| --- | --- | --- | --- | --- |

## 4. Validation Strategy
- Testing:
- Monitoring & Alerts:
- Rollout Plan:

## 5. Open Questions & Risks
- Item — Owner — Due Date

## 6. Review Checklist
- [ ] Design review scheduled
- [ ] Security review required?
- [ ] Documentation updates planned
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Schedule a design review with relevant stakeholders.
- Break down milestone tasks into backlog tickets.
- Keep the spec updated as implementation progresses.
