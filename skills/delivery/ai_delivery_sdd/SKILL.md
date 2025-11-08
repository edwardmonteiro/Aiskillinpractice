---
name: delivery.ai_delivery_sdd
phase: delivery
roles:
  - Feature Team Engineer
  - Tech Lead
  - AI Pair Programmer
description: Generate or update an AI-first software design document aligned with the spec-kit templates and Claude skills.
variables:
  required:
    - name: feature
      description: Feature, epic, or platform investment being implemented.
    - name: objectives
      description: Business or customer outcomes targeted by the work.
    - name: architecture_context
      description: Current architecture notes, diagrams, or known constraints.
  optional:
    - name: risks
      description: Known delivery risks or outstanding decisions.
    - name: linked_skills
      description: Additional Claude skills to cross-reference (comma separated).
outputs:
  - Updated SDD sections saved under `specs/projects/<initiative>/` using the ai-first template.
  - Skills Bridge updates mapping each spec section to supporting Claude skills.
  - Next-step checklist for engineers and AI collaborators.
---

# Purpose
Equip engineers with a Codex-friendly workflow to author, iterate, and store AI-first SDDs beside their Claude skills.

# Pre-run Checklist
- ✅ Confirm definition artifacts (`definition/story_map`, `definition/tech_spike`) are linked in the SDD.
- ✅ Create or identify the initiative folder under `specs/projects/`.
- ✅ Gather architecture references or constraints for `architecture_context`.

# Invocation Guidance
```bash
codex skills run delivery.ai_delivery_sdd \
  --vars "feature={{feature}}" \
         "objectives={{objectives}}" \
         "architecture_context={{architecture_context}}" \
         "risks={{risks}}" \
         "linked_skills={{linked_skills}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Reconcile which Claude skills feed the SDD before writing the Skills Bridge section.
- **Python CLI – `scripts/validate-skills`**: Run after updating the SDD to ensure any new skill references still pass governance checks.
- **Spec template – `specs/templates/ai-first-sdd-template.md`**: Anchor generated sections to the canonical AI-first template numbering.
- **Sample artifact – `samples/whatsup-logistics/delivery/ai_delivery_sdd.md`**: Mirror the WhatsUp Logistics structure when documenting WhatsApp-specific design choices.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Automate saving SDD updates or running lint scripts directly from agent sessions.

# Implementation Notes
- **Template alignment**: Always start from `specs/templates/ai-first-sdd-template.md`. The skill outputs markdown shaped to match the numbered sections.
- **Spec-kit harmony**: The enumerator surfaces this skill so Codex can suggest it immediately after `delivery.tech_spec`.
- **Transcript capture**: Save generated drafts and prompt transcripts under `specs/projects/<initiative>/ai/` to maintain traceability.


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Checklist
- [ ] Review generated SDD with engineering peers.
- [ ] Link relevant Claude skill outputs in the _Skills Bridge_ table.
- [ ] File an issue if the template or skill needs new sections for the initiative.
