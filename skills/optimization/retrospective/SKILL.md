---
name: optimization.retrospective
phase: optimization
roles:
  - Product Manager
  - Engineering Lead
  - Scrum Master
description: Facilitate a sprint or release retrospective focusing on insights, actions, and ownership.
variables:
  required:
    - name: period
      description: Sprint, release, or project window being reviewed.
    - name: goals
      description: Goals or commitments set for the period.
  optional:
    - name: participants
      description: Roles attending the retrospective.
    - name: data_points
      description: Supporting metrics or signals to consider.
outputs:
  - Retrospective agenda and prompts.
  - Themed insights categorized as Keep/Stop/Start or equivalent.
  - Action plan with owners, due dates, and follow-up cadence.
---

# Purpose
Ensure retrospectives are structured, psychologically safe, and result in actionable improvements.

# Pre-run Checklist
- ✅ Collect metrics, incidents, and feedback for the reviewed period.
- ✅ Confirm participants and logistical details.
- ✅ Align on facilitation approach and tools.

# Invocation Guidance
```bash
codex run --skill optimization.retrospective \
  --vars "period={{period}}" \
         "goals={{goals}}" \
         "participants={{participants}}" \
         "data_points={{data_points}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Surface companion optimization outputs (quality_report, experiment_analysis) to inform the retro discussion.
- **Sample artifact – `samples/whatsup-logistics/optimization/retrospective.md`**: Follow the WhatsUp Logistics format for capturing WhatsApp-first wins and actions.
- **External API – Notion/Confluence APIs**: Publish retro notes and action registers into the team's knowledge base without manual copy/paste.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Allow remote facilitators to host retros in IDEs while referencing the same prompts.

# Recommended Input Attachments
- Sprint reports, burndown charts, or throughput metrics.
- Incident summaries or customer feedback.

# Claude Workflow Outline
1. Summarize period context, goals, and participants.
2. Propose an agenda with timings and facilitation tips.
3. Capture insights under themes (Keep, Stop, Start) or squad-specific categories.
4. Translate insights into actionable improvements with owners and deadlines.
5. Provide follow-up rituals for accountability.

# Output Template
```
## Retrospective Agenda — {{period}}
| Segment | Time | Purpose | Facilitation Tips |
| --- | --- | --- | --- |

## Insights
### Keep Doing
- ...

### Stop Doing
- ...

### Start Doing
- ...

## Action Plan
| Action | Owner | Due Date | Success Measure |
| --- | --- | --- | --- |

## Follow-up
- Next Check-in:
- Accountability Mechanism:
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Share retro notes with the squad and stakeholders.
- Track action items in the team workspace and revisit each retro.
- Celebrate improvements and adjust format as needed.
