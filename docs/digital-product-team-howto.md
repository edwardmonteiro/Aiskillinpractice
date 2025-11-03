# Claude Skills Playbook for Digital Product Teams

This guide shows how a modern product organization can integrate Claude Skills into their day-to-day workflows. It builds on the enumerator concept described in [Robert Glaser's blog post on Claude Skills in Codex CLI](https://www.robert-glaser.de/claude-skills-in-codex-cli/) and adapts it for a full product delivery lifecycle.

---

## 1. Foundations

### 1.1 Prerequisites

| Requirement | Details |
| --- | --- |
| Claude API access | Claude 3 or newer with API key stored in your environment. |
| Codex CLI | Install via `npm install -g @codex/cli` or follow your team's CLI setup. |
| Claude Skills enumerator | Copy [`scripts/list-skills`](../scripts/list-skills) onto your PATH so agents can enumerate skills consistently across repositories. |
| Skill definitions | Store reusable prompt snippets in `skills/<phase>/<skill>/SKILL.md` to align with Codex CLI expectations. |

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

---

## 2. Lifecycle Overview

| Phase | Objective | Key Claude Skill Collections |
| --- | --- | --- |
| Discovery | Understand users, market, and problem space. | `discovery.user_research`, `discovery.market_scan`, `discovery.problem_framing` |
| Definition | Shape product strategy, define scope, and align stakeholders. | `definition.value_proposition`, `definition.story_map`, `definition.okr_drafting` |
| Delivery | Build, validate, and release the product increment. | `delivery.tech_spec`, `delivery.test_plan`, `delivery.release_notes` |
| Optimization | Monitor outcomes, refine features, and capture learnings. | `optimization.experiment_brief`, `optimization.metric_review`, `optimization.retrospective` |

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
- Skill: `delivery.tech_spec`
- Implementation checklist:
  1. Generate a baseline spec in `docs/specs/<feature>.md`.
  2. Run `codex lint` to ensure the document meets internal quality bars.
  3. Share in pull requests to align with QA and stakeholders.

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
4. **Publish team-specific templates**
   - Check in sample commands in `docs/playbooks/` so each role has a starting point.
   - Encourage contributions through pull requests to maintain quality and traceability.
5. **Operationalize feedback loops**
   - Use `codex transcript --save` to capture Claude conversations.
   - Store transcripts in `transcripts/<date>-<topic>.md` for audits and knowledge sharing.

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
| Delivery | Tech Spec | Engineering Lead, Feature Team Engineer | `skills/delivery/tech_spec/SKILL.md` |
| Delivery | Test Plan | QA Lead, Test Engineer | `skills/delivery/test_plan/SKILL.md` |
| Delivery | Release Notes | Product Manager, Product Marketing | `skills/delivery/release_notes/SKILL.md` |
| Delivery | Design Review | Product Designer, Design Lead | `skills/delivery/design_review/SKILL.md` |
| Delivery | Roadmap | Product Manager, Program Manager | `skills/delivery/roadmap/SKILL.md` |
| Delivery | Dashboard Brief | Data Analyst, Product Designer | `skills/delivery/dashboard_brief/SKILL.md` |
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
- **Pair automation with judgement:** Use Claude to accelerate analysis and documentation, but keep human decisions explicit in your outputs.

---

## 6. Next Steps for Your Team

1. Run through the implementation blueprint and validate Codex CLI connectivity.
2. Pilot the playbook with one cross-functional squad for two sprints.
3. Gather feedback, add new skills, and expand to the rest of the organization.

This repository can serve as your central hub for Claude Skills templates. Fork it, adapt the skills to your product language, and share the workflows with your entire digital product team.
