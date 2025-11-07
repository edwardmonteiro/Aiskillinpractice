# Model Context Protocol samples

The Model Context Protocol (MCP) lets agents attach external tools and runtimes over a
stable JSON-over-stdio contract. Inspired by [Anthropic's guide to code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp), this repository now ships ready-to-run sample servers that expose the Claude Skills catalog and automation helpers to any MCP-compatible assistant (Claude Desktop, Cursor, Windsurf, Devin, or bespoke orchestrators).

Use these samples to bootstrap MCP adoption in parallel with the existing Claude Skills workflow:

- **`servers/skills_catalog`** — Publishes every `SKILL.md` as an MCP resource and prompt so agents can progressively discover guidance without eagerly loading the full file. Includes a `list-skills`-style tool that agents can call interactively.
- **`servers/skill_executor`** — Wraps repo automation commands (for example `scripts/validate-skills`) in a safe execution sandbox so agents can validate catalog changes or replay sample runs on demand.

## Directory layout

```
mcp/
├── README.md
└── servers
    ├── skill_executor
    │   ├── mcp.json
    │   └── server.py
    └── skills_catalog
        ├── mcp.json
        └── server.py
```

Each server is implemented as a single-file MCP daemon using `uv` inline metadata so
you can run it without managing a virtual environment manually. The `mcp.json`
files can be copied into `~/.mcp/servers/` (Claude Desktop) or translated into the
format required by your agent.

## Quick start

1. **Install uv (if necessary)**
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
2. **Launch the catalog server**
   ```bash
   uvx --from path ./mcp/servers/skills_catalog/server.py
   ```
   or, when wiring into an agent, point the connector at `mcp/servers/skills_catalog/mcp.json`.
3. **Launch the executor server**
   ```bash
   uvx --from path ./mcp/servers/skill_executor/server.py
   ```
4. **Tell your agent about the servers**
   - Claude Desktop: copy both `mcp.json` files into `~/Library/Application Support/Claude/servers/` (macOS) or `%APPDATA%\Claude\servers` (Windows).
   - Windsurf or Cursor: add the `command` array to the tool configuration so the IDE spawns the MCP process.
   - Devin or other cloud agents: check in the JSON into the agent's configuration repo and reference the repo-relative path.

Once connected, the agent can list resources, call tools, or stream skill content without leaving the MCP contract. Combine these servers with the `delivery.mcp_session` skill to document handshakes between Claude Skills and MCP-aware agents.
