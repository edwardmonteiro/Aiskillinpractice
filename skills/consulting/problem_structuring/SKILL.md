---
name: consulting.problem_structuring
phase: consulting
roles:
  - Edwards Principal
  - Edwards Engagement Manager
  - Edwards Associate
  - Client Sponsor
description: Frame ambiguous client problems using SCQA and MECE issue trees to align stakeholders on the question and initial hypotheses.
variables:
  required:
    - name: client_context
      description: Core facts about the client, business unit, and market situation.
    - name: trigger
      description: Event or complication prompting the engagement.
  optional:
    - name: hypotheses
      description: Early answers or beliefs to pressure-test.
    - name: decision_date
      description: Target date for executive decision or steering committee.
outputs:
  - SCQA narrative that clarifies situation, complication, question, and starting answer.
  - MECE issue tree with branches, owners, and data needs.
  - Engagement backlog with checkpoints tied to the decision date.
---

# Purpose
Create a crisp, executive-ready problem statement that sets the guardrails for Edwards-led engagements.

# Pre-run Checklist
- ✅ Confirm who the economic buyer and day-to-day sponsor are.
- ✅ Gather latest board decks, KPI reports, and market news.
- ✅ Align on decision cadence (steerco, exec readouts, working sessions).

# Invocation Guidance
```bash
codex skills run consulting.problem_structuring \
  --vars "client_context={{client_context}}" \
         "trigger={{trigger}}" \
         "hypotheses={{hypotheses}}" \
         "decision_date={{decision_date}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Cross-reference discovery and data-phase skills to fill gaps in context and metrics.
- **Python CLI – `scripts/validate-skills`**: Ensure naming and metadata stay aligned with consulting phase standards.
- **Sample artifact – `samples/whatsup-logistics/consulting/problem_structuring.md`**: Mirror the WhatsUp Logistics SCQA and issue-tree pattern.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Surface adjacent skills (data audit, market scan) to enrich the tree.
- **External sources – client KPI warehouse / news feeds**: Anchor the SCQA facts with freshest signals.

# Recommended Input Attachments
- Board or business review excerpts.
- Recent KPI dashboards and trend charts.
- Press releases or market analyst notes.

# Claude Workflow Outline
1. Summarize the situation and complication from the provided context and trigger.
2. Formulate the primary question and initial answer to test.
3. Build a MECE issue tree with branches, owners, and data sources.
4. Define engagement checkpoints and decision timeline tied to the decision date.
5. Flag risks, assumptions, and immediate follow-ups.

# Output Template
```
# SCQA & Issue Tree — {{client_context}}

## SCQA
- Situation:
- Complication:
- Question:
- Initial Answer/Hypothesis:

## MECE Issue Tree
| Branch | Sub-Questions | Owner | Data Needed | Timing |
| --- | --- | --- | --- | --- |

## Engagement Backbone
- Decision Date: {{decision_date}}
- Key Checkpoints:
- Risks & Assumptions:
- Immediate Actions:
```

# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after drafting SCQA to ensure it is non-controversial and specific enough for exec alignment.
- **Emotional awareness**: Consider sponsor sensitivities; avoid assigning blame when describing complications.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how leadership will react to the issue tree; rebalance branches if a hot-button topic dominates.
- **Adaptive strategy**: If new facts surface, revise the question or restructure the tree rather than forcing the original framing.

# Follow-up Actions
- Schedule the first steering session with the SCQA as pre-read.
- Assign analysts to each branch with clear data requests.
- Revisit the tree after initial fact pack findings.
