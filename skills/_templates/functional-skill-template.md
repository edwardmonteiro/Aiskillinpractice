# Functional Skill Template

Copy this file into the correct lifecycle folder and rename it to `SKILL.md`.
Update the front matter to match the folder path (`phase/role/action` → `phase.role.action`).

---
name: phase.role.action
phase: phase
roles:
  - Role Owner
  - Partner Role
description: One-line purpose statement.
variables:
  required:
    - name: input_one
      description: First required input.
  optional:
    - name: input_two
      description: Optional input.
outputs:
  - Deterministic artifact saved to specs/projects/<initiative>/...
---

# Purpose
Describe the outcome in one or two sentences.

# Pre-run Checklist
- ✅ Preconditions that must be true before running the skill.
- ✅ Links to upstream artifacts that will be read.

# Invocation Guidance
```bash
codex skills run phase.role.action \
  --vars "input_one={{input_one}}" \
         "input_two={{input_two}}"
```

# Toolchain & Integrations
- **Scripts:** Helper scripts or CLIs the skill calls (keep them composable and side-effect free).
- **APIs/MCP:** External services or MCP servers to invoke; include minimal params.
- **Fallbacks:** Manual steps if automation is unavailable.

# Functional Contract
- **Inputs → Outputs:** Map each input to the specific output paths or tables.
- **Idempotence:** Note how reruns converge (e.g., overwrite same file, merge structured sections).
- **Error Handling:** What to write when data is missing or a check fails.

# Implementation Notes
- Any nuances, sequencing, or hooks to other skills.

# Human Layer: Reflective Practice
- Metacognitive reminders tailored to the audience and context.

# Critical Thinking Loop
- Prompts to reassess goals, tone, or approach if new information appears.

# Follow-up Checklist
- [ ] Who reviews the artifact?
- [ ] Where is it stored or shared?
