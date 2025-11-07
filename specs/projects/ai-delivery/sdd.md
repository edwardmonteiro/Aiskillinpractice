---
template: ai-first-sdd
initiative: ai-delivery
status: drafting
paired-skills:
  - delivery.ai_delivery_sdd
  - delivery.tech_spec
  - delivery.test_plan
---

# 1. Problem & Context
- **Feature / capability**: Unified AI-first delivery workflow for Claude + Codex pairing.
- **Business outcomes**: Reduce hand-off friction between product specs, Claude skills, and engineering implementation.
- **Definition inputs**: discovery/user_research transcript dated 2025-03-12; definition/story_map v1.3.
- **Current state**: Skills organized per lifecycle but engineering work lacks a centralized SDD workspace.

# 2. Goals & Guardrails
- ✅ Provide engineers with a codified AI-first SDD template linked to relevant skills.
- ✅ Ensure every feature launch stores AI transcripts and spec updates in `specs/projects/<initiative>/`.
- 🚫 Avoid duplicating documentation that already lives in the skills directories.
- 📏 Must support offline generation via `list-skills` enumerator.

# 3. Solution Narrative
- Create a `specs/` workspace aligned with github/spec-kit guidelines.
- Introduce a new `delivery.ai_delivery_sdd` skill that scaffolds SDD sections and references the template.
- Add `delivery.agent_collaboration` so Windsurf operators (local) and Devin automations (cloud) coordinate on repo access, guardrails, and Claude skill reuse.
- Document AI prompt hygiene and transcript storage under `specs/projects/ai-delivery/ai/`.
- Wire the process into the digital product how-to so teams adopt it during delivery.

# 4. Implementation Plan
| Sprint | Scope | Owner(s) | Skill Assist |
| ------ | ----- | -------- | ------------- |
| Sprint 1 | Land templates + directories | Platform Engineer | delivery.ai_delivery_sdd |
| Sprint 2 | Pilot with upcoming release epic | Feature Team | delivery.tech_spec |
| Sprint 3 | Automate transcript filing | Developer Experience | delivery.ai_delivery_sdd |

# 5. Skills Bridge
| Skill | When to run | Required variables | Expected artifact |
| ----- | ----------- | ------------------ | ----------------- |
| delivery.agent_collaboration | Before handing off between Windsurf and Devin | initiative, local_agent, cloud_agent, repo_path | Handshake notes archived in Section 8 + `ai/` transcripts |
| delivery.ai_delivery_sdd | When kicking off a new feature build | feature, objectives, architecture_context | Draft SDD using template sections |
| delivery.tech_spec | When solidifying implementation | feature, objectives, integrations | Detailed design appended in Section 3 |
| delivery.test_plan | Prior to code complete | feature, objectives, constraints | QA strategy stored under Section 4 |

# 6. Open Questions & Risks
- How do we automate reminders for saving AI transcripts?
- What gating criteria move an SDD from `drafting` to `approved`?

# 7. Decision Log
| Date | Decision | Owner | Link |
| ---- | -------- | ----- | ---- |
| 2025-03-15 | Adopt ai-first-sdd template for all delivery epics | Eng Lead | docs/digital-product-team-howto.md#ai-first-engineering |

# 8. Rollout, Validation & Agent Collaboration
- Launch plan: start with one squad, then codify in `docs/` after feedback.
- Telemetry: track enumerator usage + SDD updates per sprint.
- Success criteria review: monthly architecture sync.
- Agent handshake: Windsurf engineers keep feature branches in sync with Devin's automation branches; both log transcripts under `ai/2025-03-15T0900Z.md`.

# Appendices
- AI transcripts stored in `ai/`
- Related skills: see `skills/delivery/`
