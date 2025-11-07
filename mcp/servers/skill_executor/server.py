#!/usr/bin/env -S uv run -s
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "modelcontextprotocol>=0.1.0",
# ]
# ///
"""Expose repository automation commands as MCP tools."""

from __future__ import annotations

import asyncio
import os
import subprocess
from pathlib import Path
from typing import Dict

ROOT = Path(__file__).resolve().parents[2]

try:
    from modelcontextprotocol.server import Server  # type: ignore
    from modelcontextprotocol.types import CallToolResult, Tool  # type: ignore
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "modelcontextprotocol is required. Install via `uv pip install modelcontextprotocol`."
    ) from exc

REPO_ROOT = Path(os.environ.get("AISKILLIN_REPO_ROOT", ROOT)).resolve()

server = Server("skills-executor")


TOOLS: Dict[str, Dict[str, object]] = {
    "validate-skills": {
        "description": "Run scripts/validate-skills to lint the Claude Skills catalog.",
        "command": ["bash", "-lc", "scripts/validate-skills"],
    },
    "replay-whatsup-agent-handshake": {
        "description": "Print the delivery.agent_collaboration artifact for the WhatsUp Logistics sample.",
        "command": [
            "bash",
            "-lc",
            "cat samples/whatsup-logistics/delivery/agent_collaboration.md",
        ],
    },
}


@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name=name,
            description=str(meta["description"]),
            inputSchema={"type": "object", "properties": {}, "additionalProperties": False},
        )
        for name, meta in TOOLS.items()
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict | None = None) -> CallToolResult:
    if name not in TOOLS:
        raise ValueError(f"Unknown tool: {name}")
    command = TOOLS[name]["command"]
    process = subprocess.run(
        command,
        cwd=REPO_ROOT,
        text=True,
        capture_output=True,
        check=False,
    )
    output = process.stdout + ("\n" + process.stderr if process.stderr else "")
    if process.returncode != 0:
        output = f"Command failed with exit code {process.returncode}\n{output}"
    return CallToolResult(content=output.strip())


async def main() -> None:
    async with server:
        await server.serve()


if __name__ == "__main__":
    asyncio.run(main())
