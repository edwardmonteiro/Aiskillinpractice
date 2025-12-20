# Agent Skills Overview Pattern

A concise pattern for structuring, discovering, and evolving Claude Skills (and any MCP-aware agents) across the repo. Use this as the top-level guide before diving into lifecycle- or domain-specific playbooks.

## Why this pattern
- Keep skills portable: small YAML front matter + progressive discovery through `list-skills`.
- Treat skills as pure, composable functions with explicit inputs/outputs and human layers.
- Align automation with governance: every change is versioned, validated, and tied to evidence.

## End-to-end flow
1. **Orient**
   - Start in `README.md` to see lifecycle and domain maps.
   - Open this overview, then the field guide for directory details.
2. **Discover**
   - Run `scripts/list-skills skills` (or the MCP skills catalog) to enumerate available skills without loading bodies.
   - Filter by phase/domain (e.g., discovery, delivery, sales, data, consulting, run).
3. **Select & Plan**
   - Use the repository field guide to locate the matching sample artifact under `samples/`.
   - Pin the functional contract (`inputs`, `outputs`, `preconditions`, idempotence) and human layers.
   - Check the toolchain/MCP section for required scripts, APIs, and servers.
4. **Execute**
   - Invoke the skill following its input contract (CLI, MCP call, or IDE agent) and log runs to the sample `skill-run-log.json` for traceability.
   - Keep human-layer prompts visible to reinforce reflective and critical-thinking loops.
5. **Validate**
   - Run `scripts/validate-skills` before commit to enforce naming, structure, and toolchain sections.
   - Capture deltas in `specs/` (SDDs, release briefs) for auditability.
6. **Evolve & Govern**
   - Propose changes via PRs; use the governance skills to plan releases and update the `samples/` evidence.
   - Publish updated skills to MCP servers (`mcp/servers/skills_catalog`) to make them discoverable by local and cloud agents.

## Role mapping
- **Product & Delivery**: discovery/definition/delivery/optimization/run skills + SDD templates.
- **Design & CX**: design phase skills with journey/UX research patterns.
- **Data & ML**: data lifecycle (analytics engineers, data scientists, ML/ML platform engineers) with infra/toolchain callouts.
- **Consulting (Edwards)**: SCQA/MECE framing through execution comms for advisory engagements.
- **Sales**: pipeline hygiene, deal desk, renewals, and enablement feedback for back-office support.
- **Agent Ops**: MCP session skills, agent collaboration, and functional architecture guidance.

## Functional skill anatomy (quick reminder)
- **Front matter**: `name`, `description`, `phase`, optional `allowed-tools`.
- **Contract**: inputs, outputs, side effects, error handling, and idempotence notes.
- **Toolchain & Integrations**: repo scripts, APIs, MCP servers, and environment flags.
- **Human layer**: reflective practice + critical thinking loop.
- **Play steps**: numbered actions with checkpoints; keep them composable across agents.

## What to update when adding or changing a skill
- Skill file under `skills/<phase>/<skill>/SKILL.md` using the functional template.
- Sample evidence under `samples/<workspace>/<phase>/` plus `skill-run-log.json` entry.
- Specs in `specs/projects/<project>/` if the change affects delivery or governance.
- Documentation links: README, field guide, and web app selector so others can find the update.

Use this pattern as the default handshake for new contributors and agents before they branch into deeper guides.
