# Aiskillinpractice

Make Claude Skills first-class citizens in Codex CLI (and any other agent) with a portable skills directory and enumerator inspired by [Robert Glaser's blog post](https://www.robert-glaser.de/claude-skills-in-codex-cli/).

## Repository layout

- [`docs/digital-product-team-howto.md`](docs/digital-product-team-howto.md) — end-to-end implementation guidance for digital product teams adopting Claude Skills.
- [`scripts/list-skills`](scripts/list-skills) — standalone enumerator that emits a JSON array of skills by reading each `SKILL.md` front matter.
- [`skills/`](skills) — lifecycle-organized skills (`discovery`, `definition`, `delivery`, `optimization`) with one directory per skill and a `SKILL.md` definition.

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

Customize or extend the skills directories to match your product rituals, then share the repository with your team.
