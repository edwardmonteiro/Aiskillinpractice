---
name: design.ux_research
phase: design
roles:
  - UX Researcher
  - CX Strategist
  - Product Manager
  - Design Lead
description: Plan and synthesize lightweight research to de-risk flows, copy, and service moments before delivery.
variables:
  required:
    - name: research_question
      description: Core question or assumption to validate.
    - name: audience
      description: Target participants (segment, geography, accessibility needs).
    - name: channel
      description: Surface to test (WhatsApp, mobile web, in-app, agent console).
  optional:
    - name: prototypes
      description: Links to Figma frames, copy docs, or conversational scripts.
    - name: risks
      description: Known concerns (compliance, safety, brand).
outputs:
  - Rapid research plan with recruiting, stimuli, and success signals.
  - Synthesis highlights that update CX/Design artifacts and identify decisions.
  - Next actions for delivery/data partners based on findings.
---

# Purpose
De-risk experience assumptions quickly and feed structured insights back into CX, design, and delivery workstreams.

# Pre-run Checklist
- ✅ Align on the most critical assumption blocking delivery.
- ✅ Gather available prototypes or scripts to test.
- ✅ Confirm participant safety and privacy expectations, especially on WhatsApp.

# Invocation Guidance
```bash
codex skills run design.ux_research \
  --vars "research_question={{research_question}}" \
         "audience={{audience}}" \
         "channel={{channel}}" \
         "prototypes={{prototypes}}" \
         "risks={{risks}}"
```

# Toolchain & Integrations
- **Guide – `docs/functional-skill-architecture.md`**: Treat research inputs/outputs as pure data for reuse by agents.
- **Templates – `samples/whatsup-logistics/design/ux_research.md`**: Example WhatsApp-first protocol and synthesis snippet.
- **Specs – `specs/projects/whatsup-logistics/sdd.md`**: Update Skills Bridge and UX sections with synthesized findings.
- **Validation – `scripts/validate-skills`**: Ensure metadata correctness after edits.
- **MCP – `mcp/servers/skill_executor/server.py`**: Trigger surveys or note-taking scripts from IDE/cloud agents.

# Implementation Notes
- **Lightweight loops**: Bias for short research cycles that converge on a go/no-go decision for the current design iteration.
- **Traceability**: Save notes and decisions alongside design artifacts so downstream agents can cite them.
- **Ethics**: Include consent language and data minimization steps, especially when logging WhatsApp transcripts.

# Human Layer: Reflective Practice
- **Participant perspective**: Double-check that tasks and prompts respect participants’ time and sensitivities.
- **Self-check**: Confirm your synthesis avoids cherry-picking and reflects the audience’s needs.

# Critical Thinking Loop
- **Reframe if needed**: If findings challenge the original question, redefine the goal or pivot to a more impactful assumption.
- **Stakeholder resonance**: Anticipate which findings may unsettle stakeholders and plan communication accordingly.

# Follow-up Checklist
- [ ] Share synthesis with CX, design, delivery, and data owners.
- [ ] Update flows, copy, and instrumentation asks based on findings.
- [ ] Log the research run in the project skill log with links to raw notes.
