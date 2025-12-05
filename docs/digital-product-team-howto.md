# Claude Skills Playbook for Digital Product Teams

This guide shows how a modern product organization can integrate Claude Skills into their day-to-day workflows. It builds on the enumerator concept described in [Robert Glaser's blog post on Claude Skills in Codex CLI](https://www.robert-glaser.de/claude-skills-in-codex-cli/) and adapts it for a full product delivery lifecycle. If you need a quick orientation first, start with the [Claude Skills Repository Field Guide](repository-field-guide.md) and return here for deeper, role-specific detail.

---

## 1. Foundations

### 1.1 Prerequisites

| Requirement | Details |
| --- | --- |
| Claude API access | Claude 3 or newer with API key stored in your environment. |
| Codex CLI | Install via `npm install -g @codex/cli` or follow your team's CLI setup. |
| Claude Skills enumerator | Copy [`scripts/list-skills`](../scripts/list-skills) onto your PATH so agents can enumerate skills consistently across repositories. |
| Functional skill architecture | Read [`docs/functional-skill-architecture.md`](functional-skill-architecture.md) to design skills as pure, composable functions with explicit inputs/outputs. |
| Skill definitions | Store reusable prompt snippets in `skills/<phase>/<skill>/SKILL.md` to align with Codex CLI expectations. |
| Skills quality gate | Run [`scripts/validate-skills`](../scripts/validate-skills) locally and in CI to guarantee metadata quality as the catalog scales. |
| MCP sample servers | Wire [`mcp/servers/*`](../mcp/README.md) into MCP-aware agents so Claude Skills stream directly into Windsurf, Claude Desktop, Devin, and beyond. |

> **Tip:** Keep your enumerator script under version control so each role can add new skills without breaking existing automation.

### 1.2 Core Commands

```bash
# Enumerate skills from the shared directory (Codex runs this on startup)
list-skills ~/workspace/Aiskillinpractice/skills

# List available Claude skills for quick discovery
codex skills list

# Invoke a skill with contextual variables (e.g., product name and target persona)
codex skills run discovery.user_research --vars "product=Atlas" "persona=Marketing Manager"

# Generate a project artifact and capture it in Markdown for async review
codex run --skill delivery.roadmap --output docs/roadmap.md
```

### 1.3 Case Study: WhatsUp Logistics

Follow the WhatsApp-native logistics sample included in this repository to see the lifecycle in action:

- **Artifacts**: Explore `samples/whatsup-logistics/` for discovery through run + governance outputs created by every skill.
- **Design Doc**: Review [`specs/projects/whatsup-logistics/sdd.md`](../specs/projects/whatsup-logistics/sdd.md) for the AI-first SDD referenced by local IDE (Windsurf) and cloud (Devin) agents.
- **Run Log**: Check [`samples/whatsup-logistics/skill-run-log.json`](../samples/whatsup-logistics/skill-run-log.json) to understand which agent executed each skill, the variables provided, and resulting files.
- **Narrative Guide**: Share [`docs/case-studies/whatsup-logistics.md`](case-studies/whatsup-logistics.md) internally as a playbook for WhatsApp-based delivery services in Brazil.

---

## 2. Lifecycle Overview

| Phase | Objective | Key Claude Skill Collections |
| --- | --- | --- |
| Consulting | Frame the engagement, analyze the market, and prioritize plays with Edwards-style consulting workflows. | `consulting.problem_structuring`, `consulting.external_analysis`, `consulting.internal_analysis`, `consulting.strategy_prioritization`, `consulting.execution_comms` |
| Discovery | Understand users, market, and problem space. | `discovery.user_research`, `discovery.market_scan`, `discovery.problem_framing` |
| Design | Translate CX guardrails into flows, research plans, and copy that respect channel constraints. | `design.cx_lead`, `design.ux_research`, `design.product_designer` |
| Definition | Shape product strategy, define scope, and align stakeholders. | `definition.value_proposition`, `definition.story_map`, `definition.okr_drafting` |
| Delivery | Build, validate, and release the product increment. | `delivery.tech_spec`, `delivery.test_plan`, `delivery.release_notes` |
| Data | Operationalize signals, models, and platforms for analytics and ML. | `data.data_engineer`, `data.data_scientist`, `data.data_science_engineer`, `data.ml_platform_engineer` |
| Run | Keep the service healthy after launch with shared runbooks and calm incident coordination. | `run.service_runbook`, `run.incident_response` |
| Optimization | Monitor outcomes, refine features, and capture learnings. | `optimization.experiment_brief`, `optimization.metric_review`, `optimization.retrospective` |
| Governance | Coordinate cross-team releases of the skills catalog. | `governance.skill_release` |

Each phase bundles role-specific skills. The sections below outline responsibilities, recommended prompts, and sample outputs.

---

## 3. Role-by-Role Playbooks

### 3.1 Product Manager

**Discovery**
- Skill: `discovery.problem_framing`
- Sample prompt variables:
  ```bash
  codex skills run discovery.problem_framing \
    --vars "product=Atlas" "segment=Remote-first startups" "evidence_sources=Customer interviews"
  ```
- Expected output: A concise problem statement, hypothesis table, and alignment checklist.

**Definition**
- Skill: `definition.okr_drafting`
- Sample workflow:
  1. Draft OKRs with Claude, storing the result in `docs/objectives.md`.
  2. Share the file asynchronously for cross-functional review.
  3. Use `codex annotate docs/objectives.md` to capture feedback inline.

**Delivery**
- Skill: `delivery.release_notes`
- Example:
  ```bash
  codex skills run delivery.release_notes \
    --vars "version=v1.4" "highlights=New onboarding flow" "audience=Customer Success"
  ```
- Output: Structured release notes with callouts for rollout, risks, and customer messaging.

**Optimization**
- Skill: `optimization.metric_review`
- Combine with your analytics export:
  ```bash
  codex run --skill optimization.metric_review \
    --input data/latest-metrics.csv \
    --vars "goal_metric=Activation rate" "period=Q3"
  ```
- Result: Summary of metric movements, flagged anomalies, and recommended actions.

---

### 3.2 Product Designer

**Discovery**
- Skill: `discovery.user_research`
- Sample command:
  ```bash
  codex run --skill discovery.user_research \
    --vars "persona=Operations Lead" "research_method=Contextual inquiry" "key_questions=Handoff pain points"
  ```
- Output: Interview guide, assumptions log, and opportunity map.

**Definition**
- Skill: `definition.story_map`
- Workflow:
  1. Generate a story map skeleton to anchor design sprints.
  2. Export to FigJam via CSV by adding `--output tmp/story-map.csv`.
  3. Sync updates back into `docs/story-map.md` for engineering alignment.

**Delivery**
- Skill: `delivery.design_review`
- Use annotated screenshots as input:
  ```bash
  codex run --skill delivery.design_review \
    --input assets/ui-v1.png \
    --vars "feature=Admin dashboard" "design_principles=Clarity, efficiency"
  ```
- Output: Structured critique, UX checklist, and implementation notes.

**Optimization**
- Skill: `optimization.experiment_brief`
- Generate experiment briefs tied to usability tests and track them in `docs/experiments/`.

---

### 3.3 Engineering Lead

**Discovery**
- Skill: `discovery.tech_landscape`
- Example:
  ```bash
  codex skills run discovery.tech_landscape \
    --vars "domain=Workflow automation" "constraints=SOC2, multi-tenant"
  ```
- Output: Architecture options, dependency risks, and integration opportunities.

**Definition**
- Skill: `definition.tech_spike`
- Use Claude to scope investigation tasks and acceptance criteria.

**Delivery**
- Skill: `delivery.mcp_session`
- When to use: Immediately after the agent collaboration handshake to ensure MCP catalog + executor servers resolve for every participant.
- Output: Session agenda, validation checklist, and follow-up notes saved to `samples/<initiative>/delivery/mcp_session.md`.
- Reference: Follow the [MCP Integration Guide](mcp-integration-guide.md) for wiring sample servers into local and cloud agents.
- Skill: `delivery.tech_spec`
- Implementation checklist:
  1. Generate a baseline spec in `docs/specs/<feature>.md`.
  2. Run `codex lint` to ensure the document meets internal quality bars.
  3. Share in pull requests to align with QA and stakeholders.

- Skill: `delivery.agent_collaboration`
- When to use: At the start of each initiative to align on how local IDE agents (for example, Windsurf) and cloud automation agents (for example, Devin) will pair on implementation tasks.
- Output: Handshake notes saved alongside the initiative SDD documenting branch strategy, Claude skills to reuse, and guardrails for code generation.

**Governance**
- Skill: `governance.skill_release`
- When to use: Coordinating catalog updates before tagging a new release so every team adopts the same prompts and guardrails.
- Output: Release brief capturing branch strategy, validation commands, rollout plan, and migration notes tied to the skills repository.

**Optimization**
- Skill: `optimization.postmortem`
- Prompt variables: incident summary, impacted services, mitigation steps.

---

### 3.4 QA & Test Engineer

**Discovery**
- Skill: `discovery.risk_assessment`
- Deliverable: High-level risk map and test heuristics.

**Definition**
- Skill: `definition.test_strategy`
- Example command:
  ```bash
  codex run --skill definition.test_strategy \
    --vars "feature=Cross-org search" "scope=Web + mobile" "non_functional=Performance"
  ```

**Delivery**
- Skill: `delivery.test_plan`
- Steps:
  1. Generate modular test cases for regression suites.
  2. Sync with issue tracker by exporting JSON via `--format json`.

**Optimization**
- Skill: `optimization.quality_report`
- Output: Weekly quality pulse with open defects, flaky test insights, and recommendations.

---

### 3.5 Data & Analytics

**Analytics Engineer**
- Skill: `data.analytics_engineer`
- Command:
  ```bash
  codex skills run data.analytics_engineer \
    --vars "initiative=WhatsUp Logistics" \
           "sources=WhatsApp webhooks,Kinesis GPS" \
           "consumers=Ops dashboard,ML features" \
           "latency_slo=<5m"
  ```
- Output: Dataset contract, dbt layering plan, and rollout steps (see `samples/whatsup-logistics/data/analytics_engineer.md`).

**Data Scientist**
- Skill: `data.data_scientist`
- Use with notebook attachments or CSV excerpts:
  ```bash
  codex skills run data.data_scientist \
    --vars "objective=Reduce late deliveries" \
           "target_metric=P90 lateness" \
           "datasets=fct_delivery_status,driver_locations_stream" \
           "candidate_models=GBM,Rule-based baseline"
  ```
- Output: Problem framing, feature plan, evaluation approach, and deployment recommendations (see `samples/whatsup-logistics/data/data_scientist.md`).

**Machine Learning Engineer**
- Skill: `data.ml_engineer`
- Command:
  ```bash
  codex skills run data.ml_engineer \
    --vars "model_name=Stall detection v0.3" \
           "runtime_target=Scala service" \
           "interfaces=grpc ScoreRequest/ScoreResponse" \
           "performance_slo=p95<80ms" \
           "rollout_strategy=Shadow then canary"
  ```
- Output: Production architecture, rollout, and observability plan (see `samples/whatsup-logistics/data/ml_engineer.md`).

**Business Analyst**
- Skill: `data.business_analyst`
- Command:
  ```bash
  codex skills run data.business_analyst \
    --vars "question=How to cut late deliveries without rider churn?" \
           "stakeholders=Ops,Support,Finance" \
           "timeframe=Q3 pilot" \
           "success_metric=On-time + rider CSAT"
  ```
- Output: Decision brief, experiment design, and follow-up tasks (see `samples/whatsup-logistics/data/business_analyst.md`).

**Discovery**
- Skill: `discovery.data_audit`
- Output: Inventory of available datasets and instrumentation gaps.

**Definition**
- Skill: `definition.metric_catalog`
- Command:
  ```bash
  codex run --skill definition.metric_catalog \
    --vars "theme=Activation" "required_segments=Plan tier, Region"
  ```

**Delivery**
- Skill: `delivery.dashboard_brief`
- Use to pair analyst and designer on visualization requirements.

**Optimization**
- Skill: `optimization.experiment_analysis`
- Combine with raw experiment results to produce executive-ready summaries.

---

### 3.6 Site Reliability & RunOps

**Run**
- Skill: `run.service_runbook`
- Command:
  ```bash
  codex skills run run.service_runbook \
    --vars "service_name=WhatsUp Logistics" \
           "customer_promises=WhatsApp location freshness <5s" \
           "runtime_context=FastAPI control plane, Redis, WhatsApp Cloud API"
  ```
- Output: Production-ready runbook with SLIs/SLOs, on-call rotations, SOPs, and communication templates you can drop directly into the WhatsUp Logistics `run/` workspace.

**Incident response**
- Skill: `run.incident_response`
- Workflow:
  1. Page on-call via PagerDuty or WhatsApp war room.
  2. Run the skill to capture timeline, investigation steps, and customer messaging.
  3. Save the output under `samples/<initiative>/run/incident_<id>.md` so the follow-up postmortem has a clean source of truth.

**Optimization (closing the loop)**
- Skill: `optimization.postmortem`
- After the incident plan stabilizes, transition straight into `optimization.postmortem` using the captured notes to accelerate learning and backlog creation.

---

### 3.7 Edwards Consulting Pod (Principals, Engagement Managers, Associates)

**Frame the engagement**
- Skill: `consulting.problem_structuring`
- Command:
  ```bash
  codex skills run consulting.problem_structuring \
    --vars "client_context=WhatsUp Logistics Brazil" \
           "trigger=SLA breaches in São Paulo" \
           "hypotheses=Routing quality + supply depth" \
           "decision_date=2025-05-12"
  ```
- Output: SCQA narrative, MECE issue tree, and engagement backbone you can re-use in steerco pre-reads.

**Analyze the landscape**
- Skills: `consulting.external_analysis`, `consulting.internal_analysis`
- Pair PESTLE/Five Forces with SWOT, value chain, and KPI trees to build a fact pack before strategy optioning. See `samples/whatsup-logistics/consulting/` for ready-made examples.

**Prioritize and communicate**
- Skill: `consulting.strategy_prioritization` followed by `consulting.execution_comms`
- Combine Ansoff/BCG/ICE scoring with Pyramid Principle messaging and OKRs to hand the shortlist to product and engineering leads.

---

## 4. Implementation Blueprint

1. **Bootstrap the enumerator script**
   ```bash
   mkdir -p ~/bin
   cp scripts/list-skills ~/bin/
   chmod +x ~/bin/list-skills
   ```
   The binary works anywhere that respects the Claude Skills contract by emitting a JSON array of `{name, description, path}`
   tuples. Point `CODEX_SKILLS_DIR` at a shared skills folder (for example `~/.codex/skills`) to make the skills globally
   discoverable.
2. **Wire up Codex CLI**
   - Add the script to your Codex config (`~/.codex/config.json`):
     ```json
     {
       "skillsEnumerator": "~/bin/list-skills",
       "skillsDir": "~/workspace/Aiskillinpractice/skills"
     }
     ```
   - Reload Codex CLI or run `codex doctor` to verify the integration.
3. **Author shared skills**
   - Create directories such as `skills/discovery/problem_framing/` with a `SKILL.md` that captures context, steps, and output
     format.
   - Embed variable placeholders (`{{product}}`, `{{persona}}`) to enforce consistency.
   - Pair new skills with both local and cloud agent workflows. For example, add `delivery.agent_collaboration` so Windsurf-based contributors and Devin automation runs share the same assumptions about repositories, branches, and safeguards.
   - Append `Toolchain & Integrations`, `Human Layer: Reflective Practice`, and `Critical Thinking Loop` sections after each
     invocation block so contributors know which Python CLIs, external APIs, MCP servers, and mindset prompts support the skill
     in practice.
4. **Publish team-specific templates**
   - Check in sample commands in `docs/playbooks/` so each role has a starting point.
   - Encourage contributions through pull requests to maintain quality and traceability.
5. **Operationalize feedback loops**
   - Use `codex transcript --save` to capture Claude conversations.
   - Store transcripts in `transcripts/<date>-<topic>.md` for audits and knowledge sharing.

### Scaling the skills repository across squads

- **Branch intentionally**: Prefix branches with `skills/` (for example, `skills/onboarding-refresh`) so governance dashboards can filter changes quickly.
- **Run quality gates**: Execute `scripts/validate-skills` before raising a pull request and paste the success output in the PR description.
- **Bundle releases**: Use `governance.skill_release` to craft a release brief, then tag the repository with `git tag skills/v<major>.<minor>.<patch>`.
- **Track adoption**: Save each release brief under `specs/projects/skills-releases/ai/<timestamp>.md` to create an audit trail of catalog evolution.
- **Coordinate enablement**: Update the webapp after tagging so business stakeholders always read the currently promoted instructions.

### AI-first engineering workspace

To help engineers adopt an AI-first delivery mindset, the repository now ships with a spec-kit inspired workspace under [`specs/`](../specs/README.md). Pair it with `delivery.ai_delivery_sdd` to:

- Generate and iterate on software design documents via [`specs/templates/ai-first-sdd-template.md`](../specs/templates/ai-first-sdd-template.md).
- File initiative-specific specs and transcripts under `specs/projects/<initiative>/`.
- Keep Claude skill outputs and human edits synchronized through the Skills Bridge table embedded in each SDD.

The enumerator continues to list skills lazily, so Codex will suggest `delivery.ai_delivery_sdd` once you have run `delivery.tech_spec` or `delivery.test_plan`.

### Local + Cloud Agent Operating Model

Modern delivery teams often blend on-device copilots (for example, Windsurf in VS Code) with cloud-hosted automation agents (for example, Devin orchestrating multi-step tasks). Use the new `delivery.agent_collaboration` skill to keep them synchronized:

- **Handshake once per initiative**: Run the skill with `--vars "local_agent=Windsurf" "cloud_agent=Devin"` so both sides agree on repo paths, branching strategy, and security guardrails captured in `specs/projects/<initiative>/sdd.md`.
- **Share Claude context**: Pass `shared_skills=delivery.tech_spec,delivery.ai_delivery_sdd` so each agent references the same prompt scaffolding. Because `scripts/list-skills` is portable, the local agent can enumerate identical skills before suggesting changes.
- **Route artifacts intentionally**: Store developer-facing docs in `specs/`, keep end-user guidance in `webapp/`, and check handshake outputs plus transcripts into `specs/projects/<initiative>/ai/` for auditability.
- **Close the loop**: After Devin completes an automation cycle, ask the local agent to verify changes using the same skills (for example, re-running `delivery.test_plan`) so quality gates remain consistent across environments.

### Skill Directory Reference

| Phase | Skill | Primary Roles | File Path |
| --- | --- | --- | --- |
| Discovery | Problem Framing | Product Manager | `skills/discovery/problem_framing/SKILL.md` |
| Discovery | User Research | Product Designer, Product Manager | `skills/discovery/user_research/SKILL.md` |
| Discovery | Market Scan | Product Manager, Product Marketing | `skills/discovery/market_scan/SKILL.md` |
| Discovery | Tech Landscape | Engineering Lead, Solution Architect | `skills/discovery/tech_landscape/SKILL.md` |
| Discovery | Risk Assessment | QA Lead, Reliability Engineer | `skills/discovery/risk_assessment/SKILL.md` |
| Discovery | Data Audit | Data Analyst, Analytics Engineer | `skills/discovery/data_audit/SKILL.md` |
| Definition | Value Proposition | Product Manager, Product Marketing | `skills/definition/value_proposition/SKILL.md` |
| Definition | Story Map | Product Designer, Product Manager | `skills/definition/story_map/SKILL.md` |
| Definition | OKR Drafting | Product Manager, Product Director | `skills/definition/okr_drafting/SKILL.md` |
| Definition | Tech Spike | Engineering Lead, Staff Engineer | `skills/definition/tech_spike/SKILL.md` |
| Definition | Test Strategy | QA Lead, Test Engineer | `skills/definition/test_strategy/SKILL.md` |
| Definition | Metric Catalog | Data Analyst, Product Manager | `skills/definition/metric_catalog/SKILL.md` |
| Data | Analytics Engineer | Analytics Engineer, Data Platform | `skills/data/analytics_engineer/SKILL.md` |
| Data | Data Scientist | Data Scientist, Applied Scientist | `skills/data/data_scientist/SKILL.md` |
| Data | Machine Learning Engineer | ML Engineer, Platform Engineer | `skills/data/ml_engineer/SKILL.md` |
| Data | Business Analyst | Business Analyst, Strategy Lead | `skills/data/business_analyst/SKILL.md` |
| Delivery | Tech Spec | Engineering Lead, Feature Team Engineer | `skills/delivery/tech_spec/SKILL.md` |
| Delivery | AI Delivery SDD | Feature Team Engineer, Tech Lead | `skills/delivery/ai_delivery_sdd/SKILL.md` |
| Delivery | Agent Collaboration | Feature Team Engineer, AI Pair Programmer | `skills/delivery/agent_collaboration/SKILL.md` |
| Delivery | Test Plan | QA Lead, Test Engineer | `skills/delivery/test_plan/SKILL.md` |
| Delivery | Release Notes | Product Manager, Product Marketing | `skills/delivery/release_notes/SKILL.md` |
| Delivery | Design Review | Product Designer, Design Lead | `skills/delivery/design_review/SKILL.md` |
| Delivery | Roadmap | Product Manager, Program Manager | `skills/delivery/roadmap/SKILL.md` |
| Delivery | Dashboard Brief | Data Analyst, Product Designer | `skills/delivery/dashboard_brief/SKILL.md` |
| Run | Service Runbook | Site Reliability Lead, On-call Engineer | `skills/run/service_runbook/SKILL.md` |
| Run | Incident Response | Incident Commander, Support Lead | `skills/run/incident_response/SKILL.md` |
| Governance | Skill Release | Skills Maintainer, Chapter Lead | `skills/governance/skill_release/SKILL.md` |
| Optimization | Experiment Brief | Product Designer, Product Manager | `skills/optimization/experiment_brief/SKILL.md` |
| Optimization | Metric Review | Product Manager, Analytics Lead | `skills/optimization/metric_review/SKILL.md` |
| Optimization | Retrospective | Product Manager, Engineering Lead, Scrum Master | `skills/optimization/retrospective/SKILL.md` |
| Optimization | Postmortem | Engineering Lead, SRE, QA Lead | `skills/optimization/postmortem/SKILL.md` |
| Optimization | Quality Report | QA Lead, Product Manager | `skills/optimization/quality_report/SKILL.md` |
| Optimization | Experiment Analysis | Data Analyst, Product Manager | `skills/optimization/experiment_analysis/SKILL.md` |

---

## 5. Facilitation Tips

- **Ritualize usage:** Open each sprint planning, research sync, or release review by running the relevant skill together. This keeps prompts fresh and aligned with team goals.
- **Measure impact:** Track time saved or quality improvements by comparing artifacts produced before and after adopting Claude Skills.
- **Invest in governance:** Assign owners for each skill collection to review and update prompts as the product evolves.
- **Version like code:** Schedule quarterly `governance.skill_release` cycles so every team upgrades together and tags are traceable.
- **Pair automation with judgement:** Use Claude to accelerate analysis and documentation, but keep human decisions explicit in your outputs.
- **Sync agent ecosystems:** Run `delivery.agent_collaboration` whenever Windsurf (local) and Devin (cloud) are pairing so both environments share the same Claude context, guardrails, and follow-up tasks in the SDD.

---

## 6. Next Steps for Your Team

1. Run through the implementation blueprint and validate Codex CLI connectivity.
2. Pilot the playbook with one cross-functional squad for two sprints.
3. Gather feedback, add new skills, and expand to the rest of the organization.

This repository can serve as your central hub for Claude Skills templates. Fork it, adapt the skills to your product language, and share the workflows with your entire digital product team.
