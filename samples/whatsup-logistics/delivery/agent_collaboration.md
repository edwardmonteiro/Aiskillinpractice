---
skill: delivery.agent_collaboration
product: WhatsUp Logistics
focus: Windsurf + Devin agent handshake
---

# Delivery · Agent Collaboration Charter

## Purpose
Coordinate local IDE agent (Windsurf) and cloud automation agent (Devin) while implementing the WhatsApp driver tracker to ensure consistent adherence to Claude skills and AI-first specs.

## Agreement Highlights
- **Shared Context Load**: Both agents enumerate skills via `list-skills` and read [`../specs/projects/whatsup-logistics/sdd.md`](../../specs/projects/whatsup-logistics/sdd.md) before modifying code.
- **Task Allocation**:
  - *Windsurf*: Handles low-latency iterations in repo (API integration, React dashboard updates) and records context in `samples/whatsup-logistics/delivery/`.
  - *Devin*: Executes long-running experiments (load testing, external API validation) and posts results to `specs/projects/whatsup-logistics/ai/` transcripts.
- **Handoff Ritual**: Each agent updates `samples/whatsup-logistics/skill-run-log.json` with timestamp, skill used, and files touched.
- **Guardrails**: Agents run `scripts/validate-skills` before commits and request human review for governance changes.

## Communication Channels
- Shared Slack channel `#whatsup-ai-agents` for notifications.
- Daily async stand-up doc referencing roadmap increments (see [`roadmap.md`](roadmap.md)).
- Incident response escalations follow playbook stored in `ops/runbooks/whatsapp-outage.md`.

## Metrics
- Handoff cycle time between agents stays below 2 hours.
- No incidents attributed to outdated skill versions.
- 100% of PRs include reference to relevant skill artifacts.

## Next Steps
- Automate log updates with git hooks referencing `skill-run-log.json` schema.
- Extend charter when onboarding new automation agents.
