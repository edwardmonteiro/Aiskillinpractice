# AI-First Specification Kit

This directory adapts the [github/spec-kit](https://github.com/github/spec-kit) conventions for AI-first delivery. It provides:

- **Templates** that pair Claude skills with structured software design documents (SDDs).
- **Project workspaces** that track active specs, AI prompts, and engineering checklists.
- **Skill alignment guidance** so engineers know when to invoke a skill and where to capture the resulting artifacts.

The goal is to give the implementation squad a "spec kit"—every build starts with a shared template, the right Claude skills, and an organized place to store outputs.

## Directory layout

```
specs/
├── README.md                 # This overview
├── templates/                # Source-of-truth SDD and prompt templates
└── projects/                 # Project-specific SDDs and AI prompt transcripts
```

## Usage workflow

1. **Select a template** from `templates/` that matches the kind of work.
2. **Run the paired Claude skill** (see each template's header) to bootstrap the first draft.
3. **Capture the conversation**—save the AI transcript or refined prompts under `projects/<initiative>/ai/`.
4. **Evolve the SDD**: commit updates as engineers refine architecture, implementation notes, or testing strategy.

Each template includes a _Skills Bridge_ table showing which skill to call, required variables, and the expected artifact. This keeps Codex (or other agents) in sync with the human-authored spec.

## Conventions

- **One initiative per folder** in `projects/`. Use kebab-case names (e.g. `projects/codex-integration/`).
- **Include timestamps** in transcript filenames when saving prompt history (e.g. `2025-03-14T0900Z.md`).
- **Reference skills by slug** (`delivery.tech_spec`, `delivery.ai_delivery_sdd`, etc.) so automations can map them directly.
- **Capture agent handshakes** using `delivery.agent_collaboration` and append the output to Section 8 of the active SDD so Windsurf (local) and Devin (cloud) runs stay aligned.
- **Keep specs modular**: link to diagrams or code PRs rather than embedding large blobs inline.
- **Version the skills catalog**: Store `governance.skill_release` briefs in `projects/skills-releases/` so you can audit when squads adopt new prompts.

For more background, review the how-to in `docs/digital-product-team-howto.md`, which now includes an AI-first engineering track.
