---
name: consulting.execution_comms
phase: consulting
roles:
  - Edwards Principal
  - Edwards Engagement Manager
  - Edwards Associate
  - Client PMO Lead
description: Translate strategy into an execution backbone with Pyramid Principle messaging, OKRs, and agile-friendly governance.
variables:
  required:
    - name: recommendation
      description: The chosen strategic answer or north star.
    - name: audience
      description: Primary audience for the communication (e.g., ExCo, BU leads, PMO).
  optional:
    - name: initiatives
      description: Key initiatives or workstreams to launch.
    - name: cadence
      description: Governance and reporting cadence.
outputs:
  - Pyramid Principle narrative for the target audience.
  - OKR set linked to initiatives and owners.
  - Execution and governance cadence with rituals and artifacts.
---

# Purpose
Equip Edwards teams to move from deck to delivery with crisp storytelling and a pragmatic execution plan.

# Pre-run Checklist
- ✅ Confirm the recommendation is signed off by sponsors.
- ✅ Gather initiative owners and feasibility signals.
- ✅ Align on governance requirements (risk, compliance, finance).

# Invocation Guidance
```bash
codex skills run consulting.execution_comms \
  --vars "recommendation={{recommendation}}" \
         "audience={{audience}}" \
         "initiatives={{initiatives}}" \
         "cadence={{cadence}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Link to delivery.roadmap and run.service_runbook for downstream rituals.
- **Python CLI – `scripts/validate-skills`**: Keep consulting-phase metadata aligned with catalog standards.
- **Sample artifact – `samples/whatsup-logistics/consulting/execution_comms.md`**: Shows Pyramid narrative and OKRs for the WhatsUp Logistics rollout.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Generate governance trackers or OKR tables programmatically.
- **External APIs – task/OKR systems**: Push resulting OKRs and cadences into client tools.

# Recommended Input Attachments
- Final recommendation or executive summary.
- Initiative list with owners and budgets.
- Existing PMO cadence or reporting templates.

# Claude Workflow Outline
1. Summarize the recommendation and why it matters to the audience.
2. Build a Pyramid Principle storyline with headline, supporting arguments, and evidence.
3. Translate initiatives into OKRs with owners and metrics.
4. Define execution rituals (standups, steerco, risk reviews) and cadence.
5. Surface risks, dependencies, and immediate next actions.

# Output Template
```
# Execution & Comms — {{audience}}

## Pyramid Narrative
- Answer:
- Supporting Points (with evidence):

## OKRs
| Objective | Key Results | Owner | Timing |
| --- | --- | --- | --- |

## Execution Backbone
- Initiatives:
- Cadence (standups/steerco): {{cadence}}
- Risks & Mitigations:
- Reporting Artifacts:
- Next Actions:
```

# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Ensure the pyramid headline truly answers the question; adjust if it drifts into detail.
- **Emotional awareness**: Anticipate executive reactions; calibrate tone to inspire confidence without minimizing risk.

# Critical Thinking Loop
- **Audience resonance scan**: Test if each supporting point is compelling for this audience; reorder or simplify if needed.
- **Adaptive strategy**: If an initiative lacks ownership or feasibility, refine or defer it instead of forcing it into the plan.

# Follow-up Actions
- Circulate the narrative and OKRs as pre-read before the next steerco.
- Create PMO tickets for rituals and reporting artifacts.
- Establish a checkpoint to refresh OKRs after the first increment.
