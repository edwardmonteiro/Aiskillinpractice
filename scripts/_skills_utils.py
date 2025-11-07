"""Utilities for working with Claude Skills metadata."""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional


@dataclass
class SkillRecord:
    """Represents the minimal metadata stored in a SKILL.md front matter."""

    name: str
    description: str
    path: Path
    phase: Optional[str] = None
    roles: Optional[List[str]] = None
    allowed_tools: Optional[List[str]] = None


def _parse_front_matter_text(text: str) -> Dict[str, object]:
    """Extract a simple YAML front matter block without external deps."""

    if not text.startswith("---"):
        return {}
    lines = iter(text.splitlines())
    try:
        first = next(lines)
    except StopIteration:
        return {}
    if first.strip() != "---":
        return {}

    front_matter_lines: List[str] = []
    for line in lines:
        if line.strip() == "---":
            break
        front_matter_lines.append(line.rstrip("\n"))

    meta: Dict[str, object] = {}
    i = 0
    while i < len(front_matter_lines):
        line = front_matter_lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue
        if not line.startswith(" ") and ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            if key == "allowed-tools":
                tools: List[str] = []
                if value:
                    tools = [v.strip() for v in value.split(",") if v.strip()]
                else:
                    j = i + 1
                    while j < len(front_matter_lines):
                        sub = front_matter_lines[j]
                        if not sub.startswith("  - "):
                            break
                        tools.append(sub[4:].strip())
                        j += 1
                    i = j - 1
                if tools:
                    meta[key] = tools
            elif key in {"roles", "tags"}:
                items: List[str] = []
                if value:
                    items = [v.strip() for v in value.split(",") if v.strip()]
                else:
                    j = i + 1
                    while j < len(front_matter_lines):
                        sub = front_matter_lines[j]
                        if not sub.startswith("  - "):
                            break
                        items.append(sub[4:].strip())
                        j += 1
                    i = j - 1
                if items:
                    meta[key] = items
            else:
                meta[key] = value
        i += 1
    return meta


def read_front_matter(path: Path) -> Dict[str, object]:
    """Read a SKILL.md file and return the metadata dictionary."""

    return _parse_front_matter_text(path.read_text(encoding="utf-8"))


def iter_skill_files(root: Path) -> Iterable[Path]:
    """Yield all SKILL.md files under the provided root."""

    yield from sorted(root.rglob("SKILL.md"))


def load_skill_records(root: Path) -> List[SkillRecord]:
    """Load basic metadata for each skill under the root."""

    records: List[SkillRecord] = []
    for skill_file in iter_skill_files(root):
        meta = read_front_matter(skill_file)
        name = meta.get("name")
        description = meta.get("description")
        if not isinstance(name, str) or not isinstance(description, str):
            continue
        phase = meta.get("phase") if isinstance(meta.get("phase"), str) else None
        roles = meta.get("roles") if isinstance(meta.get("roles"), list) else None
        allowed = meta.get("allowed-tools")
        allowed_tools = allowed if isinstance(allowed, list) else None
        records.append(
            SkillRecord(
                name=name,
                description=description,
                path=skill_file,
                phase=phase,
                roles=roles,
                allowed_tools=allowed_tools,
            )
        )
    records.sort(key=lambda record: record.name.lower())
    return records
