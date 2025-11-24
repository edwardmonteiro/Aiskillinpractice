# AI-Native Team Topology and Skills Map

This guide distills the "Building an AI-Native Engineering Team" recommendations into an actionable team topology for this repository. Use it when forming or scaling squads so roles, Claude skills, and supporting agents line up from day one.

## 1. Why this topology

- **Keep skills as the source of truth.** Each role leans on the `skills/` directory rather than bespoke playbooks so every squad evolves together.
- **Blend humans + agents.** Pair role owners with local IDE agents (for rapid edits) and cloud agents (for async scale) using `delivery.agent_collaboration` and `delivery.mcp_session` to handshake safely.
- **Ship and run.** The topology spans discovery through run so squads avoid "build-only" patterns and own production outcomes.

---

## 2. Core team composition

| Role | Responsibilities | Primary skills | Agent posture |
| --- | --- | --- | --- |
| **Product Lead** | Vision, outcomes, stakeholder alignment, prioritization, and decision hygiene. | `discovery.problem_framing`, `definition.value_proposition`, `definition.story_map`, `definition.okr_drafting`, `optimization.retrospective`. | Local agent for rapid iterations; cloud agent to summarize user research and OKRs at scale. |
| **Tech Lead / Architect** | System guardrails, integration patterns, security, and run readiness. | `delivery.tech_spec`, `delivery.design_review`, `run.service_runbook`, `run.incident_response`, `governance.skill_release`. | Local agent (Windsurf-style) for architecture diffs; cloud agent (Devin-style) for dependency checks and MCP wiring. |
| **Data / ML Engineer** | Data contracts, pipelines, feature stores, model deployment, monitoring. | `data.analytics_engineer`, `data.data_scientist`, `data.ml_engineer`, `definition.metric_catalog`, `optimization.metric_review`. | Cloud agent for heavy data prep/evals; local agent for quick schema/feature edits. |
| **Applied Scientist** | Experiment design, model selection, evaluation rigor, and interpretability. | `optimization.experiment_brief`, `optimization.experiment_analysis`, `delivery.test_plan`, `definition.test_strategy`. | Cloud agent to run comparisons; local agent to adjust prompts/evals live. |
| **Platform / DevEx** | Tooling, CI/CD, MCP servers, and guardrails for multi-agent development. | `delivery.mcp_session`, `delivery.agent_collaboration`, `scripts/list-skills`, `scripts/validate-skills`, `specs/templates/ai-first-sdd-template.md`. | Local agent to tune repos; cloud agent to validate large skill sets and publish MCP manifests. |
| **Delivery Engineer** | Feature implementation, SDD upkeep, test authoring, and release notes. | `delivery.ai_delivery_sdd`, `delivery.test_plan`, `delivery.release_notes`, `delivery.dashboard_brief`, `specs/projects/*/sdd.md`. | Local agent for day-to-day coding; cloud agent to parallelize test/data updates. |
| **Product Analytics / Business Analyst** | Insights, experiment setup, decision briefs, and market sensing. | `data.business_analyst`, `discovery.market_scan`, `optimization.experiment_analysis`, `optimization.quality_report`. | Cloud agent to process logs and survey data; local agent to frame recommendations. |
| **Reliability / Incident Commander** | On-call rotation, SLOs/SLIs, and calm incident response. | `run.service_runbook`, `run.incident_response`, `optimization.postmortem`. | Local agent for live updates during incidents; cloud agent to broadcast and collect timelines. |

> **Tip:** Pair each role with a named backup to keep knowledge resilient; both should know the same skill entry points.

---

## 3. Pod templates you can reuse

1. **Builder pod (shipping a new capability)**
   - Product Lead, Delivery Engineer, Tech Lead, Data/ML Engineer, Product Analytics.
   - Minimum skills: `discovery.problem_framing`, `definition.tech_spike`, `delivery.ai_delivery_sdd`, `delivery.tech_spec`, `delivery.test_plan`, `data.analytics_engineer`, `optimization.experiment_brief`, `run.service_runbook`.
   - Agent mix: local agent for code + docs; cloud agent for scaffolding tests, data mocks, and experiment plans.

2. **Optimization pod (iterating an existing feature)**
   - Product Lead, Applied Scientist, Product Analytics, Delivery Engineer, Reliability.
   - Minimum skills: `optimization.metric_review`, `optimization.experiment_brief`, `optimization.experiment_analysis`, `optimization.retrospective`, `run.incident_response`.
   - Agent mix: cloud agent to crunch logs/evals; local agent to push safe, incremental changes with MCP support.

3. **Platform pod (enabling many squads)**
   - Platform/DevEx, Tech Lead, Reliability, representative Delivery Engineer, Security/Governance reviewer.
   - Minimum skills: `delivery.mcp_session`, `delivery.agent_collaboration`, `governance.skill_release`, `run.service_runbook`, `scripts/validate-skills`.
   - Agent mix: cloud agent to test skills at scale and publish MCP manifests; local agent to patch CLI scripts and docs.

---

## 4. Rituals and artifacts

- **Kickoff** — Run `delivery.agent_collaboration` to align local + cloud agents, then capture the handshake in the SDD for traceability.
- **SDD upkeep** — Use `delivery.ai_delivery_sdd` during refinement and keep `specs/projects/<initiative>/sdd.md` current as decisions land.
- **Experiment loops** — Pair `optimization.experiment_brief` with `optimization.experiment_analysis`; store briefs and results in `samples/<initiative>/optimization/`.
- **Run readiness** — Require `run.service_runbook` and `run.incident_response` outputs before launch; link them in the SDD and on-call docs.
- **Skill governance** — Treat skill updates like code: branch, run `scripts/validate-skills`, open PRs, and record rollouts with `governance.skill_release`.

---

## 5. Using the topology with the WhatsUp Logistics sample

1. **Identify the pod** — The sample uses a builder pod to ship a WhatsApp-native delivery tracker for motorcycle couriers in Brazil.
2. **Follow the breadcrumbs** — Explore `samples/whatsup-logistics/` by phase to see every role's artifacts, including data-phase outputs and runbooks.
3. **Replay agent handoffs** — Open `samples/whatsup-logistics/skill-run-log.json` to watch how local and cloud agents invoked each skill.
4. **Clone the structure** — Copy `specs/projects/whatsup-logistics/sdd.md` as a starting SDD, then adjust roles and rituals per this topology.

Use this guide whenever you spin up a new initiative or grow to multiple pods. It keeps skills, agents, and humans coordinated as the catalog evolves.
