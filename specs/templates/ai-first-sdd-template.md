---
template: ai-first-sdd
paired-skill: delivery.ai_delivery_sdd
summary: Structured software design doc template optimized for AI-first implementation teams.
---

# 1. Problem & Context
- **Feature / capability**: {{feature}}
- **Business outcomes**: {{objectives}}
- **Definition inputs**: Link to story map, OKRs, or spikes.
- **Current state**: Brief system snapshot (include diagrams references).

# 2. Goals & Guardrails
- ✅ Success metrics and signals
- 🚫 Explicit non-goals
- 📏 Constraints (compliance, latency, data residency)

# 3. Solution Narrative
- Architecture overview (include diagram link)
- Data and AI responsibilities (training, inference, evaluation)
- Operational considerations (observability, incident response)

# 4. Implementation Plan
| Sprint | Scope | Owner(s) | Skill Assist |
| ------ | ----- | -------- | ------------- |
|        |       |          |               |

# 5. Skills Bridge
| Skill | When to run | Required variables | Expected artifact |
| ----- | ----------- | ------------------ | ----------------- |
| delivery.agent_collaboration | Prior to parallelizing work across agents | initiative, local_agent, cloud_agent, repo_path | Handshake notes appended to Section 8 + transcripts in `ai/` |
| delivery.tech_spec | Kickoff to outline components | feature, objectives, constraints | Draft tech spec committed under `specs/projects/...` |
| delivery.test_plan | Before implementation freeze | feature, objectives, constraints | Automated test strategy referencing `#4` |
| delivery.ai_delivery_sdd | When codifying the SDD | feature, objectives, architecture_context | Updated SDD section drafts |

# 6. Open Questions & Risks
- TBD

# 7. Decision Log
| Date | Decision | Owner | Link |
| ---- | -------- | ----- | ---- |

# 8. Rollout, Validation & Agent Collaboration
- Launch plan (staged rollout, toggles)
- Telemetry additions
- Success criteria review cadence
- Agent handshake summary (local vs cloud operators)

# Appendices
- API references
- Prompt snippets
- Related specs / issues
