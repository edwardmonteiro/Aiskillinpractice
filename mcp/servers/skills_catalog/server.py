#!/usr/bin/env -S uv run -s
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "modelcontextprotocol>=0.1.0",
# ]
# ///
"""Expose the Claude Skills catalog as an MCP resource server."""

from __future__ import annotations

import asyncio
import json
import os
import sys
from dataclasses import asdict
from pathlib import Path
from typing import List

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts._skills_utils import SkillRecord, load_skill_records  # noqa: E402

try:
    from modelcontextprotocol.server import Server  # type: ignore
    from modelcontextprotocol.types import (  # type: ignore
        CallToolResult,
        ListResourcesResult,
        Prompt,
        PromptArgument,
        PromptMessage,
        Resource,
        ResourceContents,
        TextResourceContents,
        Tool,
    )
except ImportError as exc:  # pragma: no cover - surfaced at runtime
    raise SystemExit(
        "modelcontextprotocol is required. Install via `uv pip install modelcontextprotocol`."
    ) from exc

SKILLS_DIR = Path(os.environ.get("AISKILLIN_SKILLS_DIR", ROOT / "skills")).resolve()

server = Server("skills-catalog")


def _record_to_resource(record: SkillRecord) -> Resource:
    return Resource(
        uri=f"skill://{record.name}",
        name=record.name,
        description=record.description,
        mimeType="text/markdown",
    )


@server.list_resources()
async def list_resources() -> ListResourcesResult:
    records = load_skill_records(SKILLS_DIR)
    return ListResourcesResult(
        resources=[_record_to_resource(record) for record in records]
    )


@server.read_resource()
async def read_resource(uri: str) -> ResourceContents:
    records = {record.name: record for record in load_skill_records(SKILLS_DIR)}
    if not uri.startswith("skill://"):
        raise ValueError(f"Unsupported URI {uri}")
    skill_name = uri.replace("skill://", "", 1)
    record = records.get(skill_name)
    if not record:
        raise ValueError(f"Unknown skill: {skill_name}")
    contents = record.path.read_text(encoding="utf-8")
    return ResourceContents(
        contents=[
            TextResourceContents(
                uri=uri,
                mimeType="text/markdown",
                text=contents,
            )
        ]
    )


@server.list_prompts()
async def list_prompts() -> List[Prompt]:
    records = load_skill_records(SKILLS_DIR)
    return [
        Prompt(
            name=f"skills/{record.name}",
            description=f"Stream the SKILL.md for {record.name}",
            arguments=[
                PromptArgument(
                    name="with_metadata",
                    description="Set to true to prepend metadata JSON.",
                    required=False,
                )
            ],
        )
        for record in records
    ]


@server.get_prompt()
async def get_prompt(name: str, arguments: dict | None = None) -> List[PromptMessage]:
    arguments = arguments or {}
    if not name.startswith("skills/"):
        raise ValueError(f"Unsupported prompt {name}")
    skill_name = name.split("/", 1)[1]
    records = {record.name: record for record in load_skill_records(SKILLS_DIR)}
    record = records.get(skill_name)
    if not record:
        raise ValueError(f"Unknown skill: {skill_name}")
    body = record.path.read_text(encoding="utf-8")
    with_metadata = arguments.get("with_metadata") in {True, "true", "1", 1}
    prefix = ""
    if with_metadata:
        prefix = json.dumps(asdict(record), indent=2)
    text = f"{prefix}\n\n{body}" if prefix else body
    return [
        PromptMessage(
            role="system",
            content=text,
        )
    ]


@server.list_tools()
async def list_tools() -> List[Tool]:
    return [
        Tool(
            name="list-skills",
            description="Return the Claude Skills metadata as JSON.",
            inputSchema={
                "type": "object",
                "properties": {
                    "phase": {
                        "type": "string",
                        "description": "Optional lifecycle filter (discovery, definition, delivery, optimization, governance)",
                    }
                },
                "additionalProperties": False,
            },
        )
    ]


@server.call_tool("list-skills")
async def call_list_skills(arguments: dict | None = None) -> CallToolResult:
    arguments = arguments or {}
    phase = arguments.get("phase")
    records = load_skill_records(SKILLS_DIR)
    if phase:
        records = [record for record in records if record.phase == phase]
    payload = [
        {
            "name": record.name,
            "description": record.description,
            "phase": record.phase,
            "path": str(record.path),
        }
        for record in records
    ]
    return CallToolResult(content=json.dumps(payload, ensure_ascii=False, indent=2))


async def main() -> None:
    async with server:
        await server.serve()


if __name__ == "__main__":
    asyncio.run(main())
