---
name: delivery.mcp_session
phase: delivery
roles:
  - Feature Team Engineer
  - AI Pair Programmer
  - Platform Engineer
  - AI Operations Lead
description: Orchestrate and document a joint Claude Skills + Model Context Protocol (MCP) session across local and cloud agents.
variables:
  required:
    - name: initiative
      description: Project, epic, or initiative name driving the MCP-enabled session.
    - name: catalog_server
      description: Name or path of the MCP server that publishes the Claude Skills catalog.
    - name: executor_server
      description: Name or path of the MCP server that exposes automation commands.
    - name: agents
      description: MCP-capable agents participating in the session (for example, Windsurf, Claude Desktop, Devin).
  optional:
    - name: scope
      description: Skills, specs, or sample artifacts to explore during the session.
    - name: validation_commands
      description: Commands (such as scripts/validate-skills) that should run through the executor server.
    - name: follow_up
      description: Next steps or owners who must update SDDs, specs, or run logs after the session.
outputs:
  - Agenda and handshake covering MCP setup, Claude Skills alignment, and environment prerequisites.
  - Checklist for validating the MCP connection (resources, prompts, and tool invocations) before coding begins.
  - Append-only session summary ready to store in `samples/<initiative>/delivery/mcp_session.md` and the initiative SDD.
allowed-tools:
  - mcp:servers/skills_catalog
  - mcp:servers/skill_executor
---

# Purpose
Model Context Protocol lets Claude Skills travel across agents. Use this skill to script a short working session where the team confirms that IDE agents (such as Windsurf) and cloud partners (such as Devin) can reach the same catalog via MCP servers before implementation work starts.

# Pre-run Checklist
- ✅ Confirm `mcp/servers/skills_catalog/mcp.json` and `mcp/servers/skill_executor/mcp.json` are available to every agent.
- ✅ Verify the MCP catalog server resolves the same `skills/` revision that the repo is using.
- ✅ Ensure `scripts/validate-skills` passes locally; agents will rerun it through the executor server.
- ✅ Open `specs/projects/{{initiative}}/sdd.md` so the session outputs can be logged immediately.

# Invocation Guidance
```bash
codex skills run delivery.mcp_session \
  --vars "initiative={{initiative}}" \
         "catalog_server={{catalog_server}}" \
         "executor_server={{executor_server}}" \
         "agents={{agents}}" \
         "scope={{scope}}" \
         "validation_commands={{validation_commands}}" \
         "follow_up={{follow_up}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Surface the MCP-enabled skills roster so every agent aligns on catalog naming before the session.
- **Python CLI – `scripts/validate-skills`**: Run through the MCP executor to confirm metadata and guardrails prior to hand-off.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Publish Claude Skill metadata that IDE and cloud agents discover via MCP.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Allow trusted MCP run requests that execute repository automation such as validation commands.
- **Sample log – `samples/whatsup-logistics/delivery/mcp_session.md`**: Mirror the captured format when storing your own session notes.

# Implementation Notes
- **Catalog discovery**: Capture which agent runs the `skills_catalog` MCP server and how others connect (CLAUDE_DESKTOP, Windsurf CLI, etc.). Document resource URIs (for example `skill://delivery.tech_spec`).
- **Execution guardrails**: Specify how the executor server is sandboxed (for example, `uvx` invocations restricted to repository scripts) and which commands agents are allowed to call.
- **Transcript hygiene**: Store MCP session transcripts or console output in `specs/projects/{{initiative}}/ai/` for future audits.
- **Run log updates**: Append new entries to `samples/{{initiative}}/skill-run-log.json` capturing that a session bridged Claude Skills with MCP tooling.

# Follow-up Checklist
- [ ] Upload the generated session summary to `samples/{{initiative}}/delivery/mcp_session.md`.
- [ ] Update the initiative SDD with MCP setup details in the "Skills Bridge" section.
- [ ] Confirm all participating agents have stored the MCP connection profiles for future runs.
- [ ] Capture any new automation ideas as issues tagged `mcp` in your backlog.
