# Aiskillinpractice

Make Claude Skills first-class citizens in Codex CLI (and any other agent) with a portable skills directory and enumerator inspired by [Robert Glaser's blog post](https://www.robert-glaser.de/claude-skills-in-codex-cli/).

## Repository layout

- [`docs/repository-field-guide.md`](docs/repository-field-guide.md) — step-by-step tour that orients new teams to the repo, skills catalog, and WhatsUp Logistics sample workspace.
- [`docs/ai-native-team-topology.md`](docs/ai-native-team-topology.md) — AI-native team composition, pod templates, and skill-to-role mapping aligned to the OpenAI engineering playbook.
- [`docs/digital-product-team-howto.md`](docs/digital-product-team-howto.md) — end-to-end implementation guidance for digital product teams adopting Claude Skills.
- [`docs/mcp-integration-guide.md`](docs/mcp-integration-guide.md) — walkthrough for wiring the sample MCP servers into Claude Desktop, Windsurf, Devin, and other agents.
- [`scripts/list-skills`](scripts/list-skills) — standalone enumerator that emits a JSON array of skills by reading each `SKILL.md` front matter.
- [`scripts/validate-skills`](scripts/validate-skills) — governance helper that checks metadata, naming, and directory alignment before merging changes.
- [`skills/`](skills) — lifecycle-organized skills (`discovery`, `definition`, `delivery`, `data`, `run`, `optimization`) with one directory per skill and a `SKILL.md` definition (including `delivery.agent_collaboration` for coordinating Windsurf-style local agents with Devin-style cloud agents). Every skill now includes `Toolchain & Integrations`, `Human Layer: Reflective Practice`, and `Critical Thinking Loop` sections so teams pair automation with self-awareness, emotional intelligence, and adaptive decision-making.
- [`skills/run/service_runbook`](skills/run/service_runbook/SKILL.md) & [`skills/run/incident_response`](skills/run/incident_response/SKILL.md) — “build-and-run” guidance so squads maintain runbooks, on-call rituals, and real-time coordination once the product is live.
- [`skills/governance/skill_release`](skills/governance/skill_release/SKILL.md) — guidance for shipping versioned updates to the skills catalog across multiple squads.
- [`skills/delivery/mcp_session`](skills/delivery/mcp_session/SKILL.md) — aligns Claude Skills with MCP servers so agents share the same context before implementation.
- [`mcp/`](mcp) — sample Model Context Protocol servers and manifests exposing the skills catalog and automation commands.
- [`specs/`](specs) — AI-first software design workspace aligned with github/spec-kit, including templates and project SDDs that link directly to delivery skills.
- [`samples/whatsup-logistics/`](samples/whatsup-logistics) — end-to-end WhatsApp-native delivery application demonstrating every skill in action with saved artifacts and invocation logs (including new `run/` artifacts for operational readiness and incident response).
- [`webapp/`](webapp) — lightweight site that renders the full implementation guide with navigation, search, and download actions for sharing across the company.

## Getting started

1. **Install the enumerator**
   ```bash
   chmod +x scripts/list-skills
   cp scripts/list-skills ~/bin/  # or anywhere on your PATH
   ```
2. **Point Codex (or another agent) at the skills directory**
   ```json
   {
     "skillsEnumerator": "~/bin/list-skills",
     "skillsDir": "~/workspace/Aiskillinpractice/skills"
   }
   ```
3. **List and run skills**
   ```bash
   list-skills ~/workspace/Aiskillinpractice/skills
   codex skills run discovery.user_research --vars "product=Atlas" "persona=Operations Lead"
   ```

4. **Align local + cloud agents**
   ```bash
   codex skills run delivery.agent_collaboration --vars \
     "initiative=unified-insights" \
     "local_agent=Windsurf" \
     "cloud_agent=Devin" \
     "repo_path=~/workspace/Aiskillinpractice"
   ```
   Capture the handshake output under `specs/projects/<initiative>/sdd.md` so both perspectives reuse the same Claude skills and guardrails.

5. **Bridge Claude Skills with MCP**
   ```bash
   codex skills run delivery.mcp_session --vars \
     "initiative=unified-insights" \
     "catalog_server=uvx --from path ./mcp/servers/skills_catalog/server.py" \
     "executor_server=uvx --from path ./mcp/servers/skill_executor/server.py" \
     "agents=Windsurf, Claude Desktop, Devin"
   ```
   Follow the checklist to ensure every agent can load the same skills via MCP before coding.

6. **Author AI-first SDDs**
   ```bash
   codex skills run delivery.ai_delivery_sdd --vars "feature=Unified release dashboard" \
     "objectives=Increase release confidence" \
     "architecture_context=Existing deployment pipeline diagram"
   ```
   Save the output under `specs/projects/<initiative>/` using the provided template so engineers and AI collaborators stay aligned.

7. **Share the guide via the web app**
   ```bash
   # From the repository root
   python -m http.server 8000
   ```
   Visit [http://localhost:8000/webapp/](http://localhost:8000/webapp/) to browse the field guide, the implementation playbook, the MCP integration guide, or the WhatsUp Logistics case study side by side. The page automatically fetches the latest Markdown from this repo, so the web view stays current as you update any guide.

 Customize or extend the skills directories to match your product rituals, then share the repository with your team.

## WhatsUp Logistics sample application

The `samples/whatsup-logistics/` directory and the companion case study in [`docs/case-studies/whatsup-logistics.md`](docs/case-studies/whatsup-logistics.md) show how to build a WhatsApp-native delivery tracking service for motorcycle couriers in Brazil:

1. **Review artifacts by lifecycle** — Explore each subfolder (`discovery`, `definition`, `delivery`, `data`, `run`, `optimization`, `governance`) to see how every skill produces real outputs.
2. **Inspect the AI-first SDD** — Read [`specs/projects/whatsup-logistics/sdd.md`](specs/projects/whatsup-logistics/sdd.md) to understand how skills and spec-kit structure align for engineers and agents.
3. **Replay skill runs** — Consult [`samples/whatsup-logistics/skill-run-log.json`](samples/whatsup-logistics/skill-run-log.json) for timestamps, variables, and agent ownership of each invocation.
4. **Share via the webapp** — Use the updated web interface to switch between the primary how-to and the WhatsUp Logistics case study when onboarding new teams.

## Scaling across multiple teams

1. **Adopt a Git-first workflow for skills**
   - Create feature branches using the `skills/<initiative>-<topic>` convention.
   - Run `scripts/validate-skills` before opening a pull request and attach the output to the PR description.
   - Require approvals from a skills maintainer and a representative from at least one consuming squad.
2. **Bundle releases**
   - Use `governance.skill_release` to capture scope, validation commands, and rollout plans.
   - Tag approved bundles with `git tag skills/v<major>.<minor>.<patch>` and push to origin.
   - Store the generated release brief in `specs/projects/skills-releases/` for historical context.
3. **Broadcast updates**
   - Update `docs/digital-product-team-howto.md` and re-run the webapp to broadcast changes internally.
   - Ping local IDE agent maintainers (for example, Windsurf workspace owners) and cloud automation admins (for example, Devin operators) with the rollout plan so they install the tagged release simultaneously.
