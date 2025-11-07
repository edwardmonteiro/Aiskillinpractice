# MCP Integration Guide: Connecting Claude Skills to Model Context Protocol

Model Context Protocol (MCP) standardises how assistants discover tools, prompts, and code execution environments. Building on Anthropic's [code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) guidance, this repository now includes sample MCP servers that expose the Claude Skills catalog and automation helpers to any MCP-aware agent.

Use this guide to set up the servers, connect local and cloud agents, and document the workflow with the new `delivery.mcp_session` skill.

---

## 1. Understand the building blocks

| Component | Path | Purpose |
| --- | --- | --- |
| Catalog server | [`mcp/servers/skills_catalog/server.py`](../mcp/servers/skills_catalog/server.py) | Streams Claude Skills metadata and `SKILL.md` bodies as MCP resources, prompts, and a `list-skills` tool. |
| Executor server | [`mcp/servers/skill_executor/server.py`](../mcp/servers/skill_executor/server.py) | Wraps repository commands (for example `scripts/validate-skills`) so agents can trigger them safely over MCP. |
| Server manifests | [`mcp/servers/*/mcp.json`](../mcp/servers/skills_catalog/mcp.json) | Drop-in descriptors for Claude Desktop, Windsurf, Devin, or other connectors. |
| Session skill | [`skills/delivery/mcp_session/SKILL.md`](../skills/delivery/mcp_session/SKILL.md) | Produces a repeatable MCP session agenda, checklist, and follow-up notes. |
| Sample artifact | [`samples/whatsup-logistics/delivery/mcp_session.md`](../samples/whatsup-logistics/delivery/mcp_session.md) | Demonstrates how the WhatsUp Logistics team records an MCP-enabled working session. |

---

## 2. Launch the servers locally

1. **Install uv (if you haven't already)**
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
2. **Start the catalog server**
   ```bash
   uvx --from path ./mcp/servers/skills_catalog/server.py
   ```
3. **Start the executor server**
   ```bash
   uvx --from path ./mcp/servers/skill_executor/server.py
   ```
4. **Verify resources and tools**
   ```bash
   # New terminal
   export MCP_SOCKET=$(ls /tmp/mcp-* | head -n1)  # Example path; adjust for your agent
   # The catalog server exposes resources, prompts, and the list-skills tool.
   ```

> **Tip:** When running through a desktop agent, you rarely need to start the servers manually. Most clients read `mcp.json`, spawn the process, and manage sockets for you.

---

## 3. Connect agents (local + cloud)

### 3.1 Claude Desktop
1. Copy both `mcp.json` files into the Claude servers folder:
   - macOS: `~/Library/Application Support/Claude/servers/`
   - Windows: `%APPDATA%\Claude\servers`
2. Restart Claude Desktop and check **Tools → Manage servers** to confirm both appear.
3. Use `/tools list` in a chat to verify the `list-skills` and `validate-skills` commands are available.

### 3.2 Windsurf (local IDE agent)
1. Open Windsurf's MCP configuration and add the following snippet:
   ```json
   {
     "name": "Aiskillinpractice skills",
     "command": ["uvx", "--from", "path", "./mcp/servers/skills_catalog/server.py"],
     "cwd": "${workspaceRoot}"
   }
   ```
2. Repeat for the executor server, swapping the path to `skill_executor/server.py`.
3. Reload the workspace and run `MCP: List Resources` from the command palette.

### 3.3 Devin or other cloud agents
1. Check the `mcp/` directory into the automation configuration repo.
2. Reference the manifests in your agent bootstrap (for example, `.devin/config/tools.json`).
3. During provisioning, run `scripts/validate-skills` to ensure the catalog matches the MCP view.

---

## 4. Run the `delivery.mcp_session` skill

With servers online and agents connected:

```bash
codex skills run delivery.mcp_session \
  --vars "initiative=whatsup-logistics" \
         "catalog_server=uvx --from path ./mcp/servers/skills_catalog/server.py" \
         "executor_server=uvx --from path ./mcp/servers/skill_executor/server.py" \
         "agents=Windsurf, Claude Desktop, Devin" \
         "scope=delivery.tech_spec" \
         "validation_commands=scripts/validate-skills"
```

The skill output should be saved to `samples/<initiative>/delivery/mcp_session.md` and appended to the initiative SDD. Use the checklist to confirm each agent can:

- Enumerate `skill://` resources.
- Stream prompts with or without metadata.
- Trigger `validate-skills` (or other approved commands) via the executor server.

---

## 5. Governance at scale

- **Version control:** Treat `mcp/servers/*` like code. Update manifests and scripts in branches, seek review, and tag releases alongside skill updates.
- **CI hooks:** Extend your CI pipeline to run `uvx --from path ./mcp/servers/skills_catalog/server.py --check` (or equivalent) to ensure imports resolve.
- **Run logs:** Continue appending entries to `samples/<initiative>/skill-run-log.json` whenever an MCP session occurs so auditors can trace how agents accessed the catalog.
- **Web documentation:** The web app now exposes this guide, making it easy for stakeholders to read MCP onboarding steps without cloning the repo.

---

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Agent cannot list MCP resources | Server not on PATH or manifest not registered | Confirm `uvx` is installed and the manifest path is absolute in the agent config. |
| `validate-skills` fails when called via MCP | Repository not mounted or permissions missing | Set `AISKILLIN_REPO_ROOT` to a path the agent can access; confirm scripts are executable. |
| Claude Desktop shows duplicated skills | Multiple copies of the catalog server are registered | Remove duplicates from `~/Library/Application Support/Claude/servers/`. |

---

## 7. Next steps

1. Automate MCP server startup in your local dev scripts so every engineer has consistent access.
2. Extend `skill_executor` with additional commands (for example, `scripts/list-skills skills --phase delivery`).
3. Capture learnings in `governance.skill_release` entries whenever the MCP configuration changes.
4. Share screenshots of the web app's MCP section during onboarding so teams know where to find this guide.
