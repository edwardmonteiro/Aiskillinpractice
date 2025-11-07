# WhatsUp Logistics: AI-First Delivery Coordination over WhatsApp

WhatsUp Logistics is a Brazil-based courier network that coordinates fleets of motorcycle drivers entirely through WhatsApp. This case study walks through how the digital-product team uses the Claude skills catalog and AI-first spec-kit practices in this repository to build, launch, and continuously improve the WhatsUp driver-tracking web service.

The scenario demonstrates how every skill in `skills/` contributes to a cohesive workflow. Each artifact linked below was produced by invoking the skill with WhatsUp-specific variables and saving the outputs into `samples/whatsup-logistics/` for transparent governance.

---

## Operating Principles

- **AI-first execution:** Local IDE agents (e.g., Windsurf) and cloud automation agents (e.g., Devin) collaborate by reading the same skills, SDD, and audit logs before taking action.
- **WhatsApp-native experience:** All product decisions emphasize conversational interactions, quick reply buttons, and real-time driver location sharing that works on low-end Android devices common in Brazil.
- **Skill-backed source of truth:** Teams treat the skill repository like application code—tracked in git, validated with `scripts/validate-skills`, and versioned with release briefs.

---

## End-to-End Artifact Map

| Lifecycle Phase | Skill | Artifact | Description |
| --- | --- | --- | --- |
| Discovery | `discovery.user_research` | [`discovery/user_research.md`](../../samples/whatsup-logistics/discovery/user_research.md) | Interview guide and synthesis for São Paulo operations managers.
| Discovery | `discovery.market_scan` | [`discovery/market_scan.md`](../../samples/whatsup-logistics/discovery/market_scan.md) | Competitive scan of Brazilian courier and WhatsApp automation tools.
| Discovery | `discovery.problem_framing` | [`discovery/problem_framing.md`](../../samples/whatsup-logistics/discovery/problem_framing.md) | Problem statement and hypotheses for missed deliveries.
| Discovery | `discovery.risk_assessment` | [`discovery/risk_assessment.md`](../../samples/whatsup-logistics/discovery/risk_assessment.md) | Regulatory and operational risk ledger.
| Discovery | `discovery.tech_landscape` | [`discovery/tech_landscape.md`](../../samples/whatsup-logistics/discovery/tech_landscape.md) | Overview of WhatsApp Business API, Meta Cloud API, and mapping services.
| Discovery | `discovery.data_audit` | [`discovery/data_audit.md`](../../samples/whatsup-logistics/discovery/data_audit.md) | Data quality review for GPS events and customer orders.
| Definition | `definition.value_proposition` | [`definition/value_proposition.md`](../../samples/whatsup-logistics/definition/value_proposition.md) | Messaging and differentiation for dispatch leads.
| Definition | `definition.metric_catalog` | [`definition/metric_catalog.md`](../../samples/whatsup-logistics/definition/metric_catalog.md) | Canonical metrics (SLA adherence, ETA accuracy).
| Definition | `definition.story_map` | [`definition/story_map.md`](../../samples/whatsup-logistics/definition/story_map.md) | Journey map of dispatcher, driver, and customer interactions.
| Definition | `definition.okr_drafting` | [`definition/okr_drafting.md`](../../samples/whatsup-logistics/definition/okr_drafting.md) | OKRs for Q1 WhatsApp automation rollout.
| Definition | `definition.tech_spike` | [`definition/tech_spike.md`](../../samples/whatsup-logistics/definition/tech_spike.md) | Experiment comparing location streaming strategies.
| Definition | `definition.test_strategy` | [`definition/test_strategy.md`](../../samples/whatsup-logistics/definition/test_strategy.md) | Hybrid testing approach covering WhatsApp flows and GPS services.
| Delivery | `delivery.agent_collaboration` | [`delivery/agent_collaboration.md`](../../samples/whatsup-logistics/delivery/agent_collaboration.md) | Handshake protocol between Windsurf and Devin agents.
| Delivery | `delivery.ai_delivery_sdd` | [`../../specs/projects/whatsup-logistics/sdd.md`](../../specs/projects/whatsup-logistics/sdd.md) | AI-first software design document for the WhatsApp driver tracker.
| Delivery | `delivery.dashboard_brief` | [`delivery/dashboard_brief.md`](../../samples/whatsup-logistics/delivery/dashboard_brief.md) | Requirements for dispatcher monitoring dashboard.
| Delivery | `delivery.design_review` | [`delivery/design_review.md`](../../samples/whatsup-logistics/delivery/design_review.md) | Critique of WhatsApp conversational flows and quick replies.
| Delivery | `delivery.roadmap` | [`delivery/roadmap.md`](../../samples/whatsup-logistics/delivery/roadmap.md) | 6-month roadmap balancing automation and driver enablement.
| Delivery | `delivery.tech_spec` | [`delivery/tech_spec.md`](../../samples/whatsup-logistics/delivery/tech_spec.md) | System design for location ingestion, WhatsApp automation, and dispatcher UI.
| Delivery | `delivery.test_plan` | [`delivery/test_plan.md`](../../samples/whatsup-logistics/delivery/test_plan.md) | Manual and automated validation plan.
| Delivery | `delivery.release_notes` | [`delivery/release_notes.md`](../../samples/whatsup-logistics/delivery/release_notes.md) | Launch comms for pilot with Rio de Janeiro couriers.
| Delivery | `delivery.mcp_session` | [`delivery/mcp_session.md`](../../samples/whatsup-logistics/delivery/mcp_session.md) | MCP connection summary bridging Windsurf, Claude Desktop, and Devin.
| Optimization | `optimization.metric_review` | [`optimization/metric_review.md`](../../samples/whatsup-logistics/optimization/metric_review.md) | Weekly metrics digest for delivery performance.
| Optimization | `optimization.quality_report` | [`optimization/quality_report.md`](../../samples/whatsup-logistics/optimization/quality_report.md) | Quality checks for data accuracy and WhatsApp response times.
| Optimization | `optimization.experiment_brief` | [`optimization/experiment_brief.md`](../../samples/whatsup-logistics/optimization/experiment_brief.md) | Experiment to compare proactive vs. reactive driver nudges.
| Optimization | `optimization.experiment_analysis` | [`optimization/experiment_analysis.md`](../../samples/whatsup-logistics/optimization/experiment_analysis.md) | Analysis of experiment outcomes with segment insights.
| Optimization | `optimization.retrospective` | [`optimization/retrospective.md`](../../samples/whatsup-logistics/optimization/retrospective.md) | Retro capturing learnings from first expansion.
| Optimization | `optimization.postmortem` | [`optimization/postmortem.md`](../../samples/whatsup-logistics/optimization/postmortem.md) | Post-incident review of São Paulo outage.
| Governance | `governance.skill_release` | [`governance/skill_release.md`](../../samples/whatsup-logistics/governance/skill_release.md) | Release brief for adding WhatsApp-specific prompt variables to catalog.

---

## Skill Run Log

Every invocation is recorded in [`samples/whatsup-logistics/skill-run-log.json`](../../samples/whatsup-logistics/skill-run-log.json). The log tracks:

- `skill`: Claude skill identifier used during the run.
- `timestamp`: Coordinated Universal Time for the artifact creation.
- `inputs`: Key variables (e.g., city, channel, data sources) passed to the skill.
- `outputs`: Files captured in git.
- `agent`: Whether a local IDE agent or cloud automation agent executed the skill.

Teams can fork the repository, replicate the log schema, and enforce reviews on both skill edits and generated artifacts to maintain the source of truth for AI-assisted delivery workflows.

---

## How to Reuse the Sample

1. **Clone this repository** and install the CLI utilities by running `uv tool install --python 3.11 scripts/list-skills` or by copying the scripts into your PATH.
2. **Run `scripts/list-skills skills`** to enumerate the available Claude skills.
3. **Inspect the sample artifacts** in `samples/whatsup-logistics/` alongside the AI-first SDD in `specs/projects/whatsup-logistics/sdd.md` to understand the level of detail expected from each skill.
4. **Re-run the skills with your own variables** to create a localized version for your city or operational context.
5. **Submit changes via pull request** with `scripts/validate-skills` and include a governance brief modeled after [`governance/skill_release.md`](../../samples/whatsup-logistics/governance/skill_release.md) when updating shared prompts.

---

## Next Steps

- Align your own dispatcher tooling, compliance checks, and agent collaboration procedures with the templates provided here.
- Extend the skill catalog with localized prompts (e.g., multilingual support for Spanish and Portuguese) and create governance briefs whenever you add or modify a skill.
- Keep the web guide (`webapp/`) updated so stakeholders across multiple teams can browse the evolving playbook and case studies.
- Register the sample MCP servers (`mcp/servers/*`) with your IDE and cloud agents so they can reuse the catalog and executor capabilities without manual setup.

