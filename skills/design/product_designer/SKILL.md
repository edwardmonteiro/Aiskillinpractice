---
name: design.product_designer
phase: design
roles:
  - Product Designer
  - UX Designer
  - Content Designer
  - Design Technologist
description: Translate CX guardrails into flows, wireframes, and content patterns ready for rapid engineering handoff.
variables:
  required:
    - name: initiative
      description: Feature or journey slice being designed.
    - name: primary_channel
      description: Primary channel or surface (for example, WhatsApp thread, mobile web, or in-app modal).
    - name: success_metrics
      description: Experience KPIs or adoption targets to design toward.
  optional:
    - name: cx_source
      description: Link to the upstream CX blueprint or research insight to honor.
    - name: constraints
      description: Brand, accessibility, or platform constraints to respect.
outputs:
  - Flow map and wireframe outlines by channel with acceptance notes for engineering.
  - Content strategy (tone, messages, fallbacks) aligned to CX guardrails and compliance.
  - Checklist of design decisions that require data/ML instrumentation.
---

# Purpose
Produce channel-specific flows and wireframes that are easy to consume by IDE or cloud agents while staying faithful to CX and compliance constraints.

# Pre-run Checklist
- ✅ Import the latest CX blueprint and verify tone/guardrails.
- ✅ Confirm platform constraints (WhatsApp template rules, media limits, throttling guidance).
- ✅ Gather success metrics and expected signals to instrument.

# Invocation Guidance
```bash
codex skills run design.product_designer \
  --vars "initiative={{initiative}}" \
         "primary_channel={{primary_channel}}" \
         "success_metrics={{success_metrics}}" \
         "cx_source={{cx_source}}" \
         "constraints={{constraints}}"
```

# Toolchain & Integrations
- **Reference – `docs/functional-skill-architecture.md`**: Keep artifacts pure and composable for downstream automation.
- **Specs – `specs/projects/whatsup-logistics/sdd.md`**: Link flows and content notes into the Skills Bridge and UX/UI sections.
- **Samples – `samples/whatsup-logistics/design/product_designer.md`**: Example WhatsApp-first flows and copy blocks.
- **Validation – `scripts/validate-skills`**: Run after edits to ensure metadata and placement remain correct.
- **MCP – `mcp/servers/skills_catalog/server.py`**: Expose the design skill to agents so they can request artifacts or run checklists on demand.

# Implementation Notes
- **Channel specificity**: Document WhatsApp constraints (template length, emojis, media types) and provide fallbacks for poor connectivity.
- **Handoff clarity**: Use bulletproof acceptance notes (IDs, timing, error states) so engineers and agents can generate tests automatically.
- **Functional flows**: Keep each flow atomic and idempotent; iterative updates should replace sections rather than append ad hoc notes.

# Human Layer: Reflective Practice
- **Audience awareness**: Consider how operations, customer support, and riders will interpret the flows; keep language inclusive and concise.
- **Design humility**: Revisit assumptions if usability or accessibility concerns surface mid-draft.

# Critical Thinking Loop
- **Scenario stress test**: Evaluate edge cases (offline users, permission errors, template rejections) and adjust the flow hierarchy accordingly.
- **Goal alignment**: If the flow design drifts from the stated success metrics, reframe the structure instead of forcing the original layout.

# Follow-up Checklist
- [ ] Sync flows with engineering and QA owners; attach to backlog items.
- [ ] Capture open questions for CX/research and schedule validation sessions.
- [ ] Record the run in the project’s skill log with artifact paths.
