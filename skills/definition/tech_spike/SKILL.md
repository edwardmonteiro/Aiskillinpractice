---
name: definition.tech_spike
phase: definition
roles:
  - Engineering Lead
  - Staff Engineer
description: Scope and prioritize technical spikes that de-risk architecture or implementation questions.
variables:
  required:
    - name: topic
      description: Technology, component, or uncertainty to investigate.
    - name: desired_outcome
      description: Decision or learning goal that the spike must achieve.
  optional:
    - name: constraints
      description: Constraints such as timebox, compliance, or tooling.
    - name: collaborators
      description: Roles or teams partnering on the spike.
outputs:
  - Spike charter including background, questions, and deliverables.
  - Evaluation criteria and success definition.
  - Work plan with tasks, owners, and timebox.
---

# Purpose
Help engineering leaders quickly define spikes that reduce uncertainty and feed confidently into planning conversations.

# Pre-run Checklist
- ✅ Clarify what decision will be unlocked by the spike.
- ✅ Align on timebox and resourcing availability.
- ✅ Gather related research or prior explorations.

# Invocation Guidance
```bash
codex skills run definition.tech_spike \
  --vars "topic={{topic}}" \
         "desired_outcome={{desired_outcome}}" \
         "constraints={{constraints}}" \
         "collaborators={{collaborators}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Identify prerequisite discovery research or downstream delivery skills needed after the spike concludes.
- **Sample artifact – `samples/whatsup-logistics/definition/tech_spike.md`**: Base charters, evaluation criteria, and work-plan grids on the WhatsUp Logistics spike.
- **Python CLI – `scripts/validate-skills`**: Confirm spike learnings that propose catalog updates by validating metadata before merge requests.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Trigger prototype commands or benchmark scripts from IDE agents through the shared executor.

# Recommended Input Attachments
- Architecture diagrams or RFCs.
- Known issues or bugs impacting the area.

# Claude Workflow Outline
1. Summarize context, desired outcome, and constraints.
2. Define success criteria and explicit questions to answer.
3. Outline the spike plan with tasks, owners, and deliverables.
4. Recommend instrumentation or benchmarks to capture results.
5. Provide guidance for sharing outcomes and converting to stories.

# Output Template
```
## Spike Charter — {{topic}}
### Background
...

### Questions to Answer
1. ...

### Success Criteria
- Criterion:

### Plan & Timebox
| Task | Owner | Duration | Notes |
| --- | --- | --- | --- |

### Reporting Plan
- Artifact:
- Audience:
- Next Steps:
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Create spike tickets in the engineering tracker with links to this output.
- Schedule readout with the product trio to review learnings.
- Convert recommendations into backlog work with acceptance criteria.
