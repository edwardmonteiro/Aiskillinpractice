# Aiskillinpractice

A curated **skills library + enumerator script** for teams that want reusable agent workflows without building a full plugin platform. The repository gives you two practical things:

1. a `list-skills` script that discovers skills from `SKILL.md` files; and
2. a lifecycle-based skills catalog for product, design, engineering, QA, and analytics teams.

If you are evaluating whether this repo is genuinely useful, the honest answer is:

- **Yes, as a starting system** for teams that want standardized prompt workflows.  
- **No, not yet as a finished product** with onboarding, governance, examples, validation, and operational polish.

This README is intentionally direct so a new user can decide in a few minutes whether the repo fits their needs.

## Why this repository can be useful

This repo solves a real coordination problem: most teams experimenting with AI agents end up with prompt snippets scattered across chats, docs, and personal notes. Here, those snippets become **versioned, discoverable skills** with a shared structure.

That is useful because it enables:

- **Repeatability** — teams can run the same workflow with consistent variables and outputs.
- **Portability** — the `scripts/list-skills` enumerator exposes skills in a simple JSON contract that other tools can consume.
- **Role clarity** — the skills are organized around common product-delivery jobs instead of one-off experiments.
- **Repository ownership** — skills live in files, so they can be reviewed, improved, and tracked like code.

## Where the repo falls short today

Before adopting this repo, be aware of the current limitations:

- **The value is mostly documentation-driven.** The repo does not include deep automation, execution guardrails, or strong integration tests.
- **New-user onboarding was previously weak.** A first-time visitor could understand the files, but not quickly answer: “What is this, who is it for, and why should I trust it?”
- **The skills are templates, not proof of outcomes.** They provide structure, but teams still need judgment, evidence, and quality review.
- **The enumerator is intentionally lightweight.** It reads front matter and emits JSON, but it does not validate skill quality, schema completeness, or output effectiveness.
- **Operational guidance is spread across the repo.** There was too much cognitive load for someone arriving from GitHub and trying to evaluate usefulness.

## Quick verdict

### Good fit if…
- You want a **shared, file-based skill system** for agent workflows.
- Your team already works in Git and wants prompt assets under version control.
- You need a lightweight way to expose skills to Codex CLI or similar tools.
- You are willing to refine prompts and operating practices over time.

### Poor fit if…
- You expect a polished SaaS-like product out of the box.
- You need strict governance, analytics, permissions, or enterprise workflow orchestration.
- You want guaranteed business outcomes without adapting the skills to your context.
- You do not have a team willing to maintain the prompt library.

## Start here in 5 minutes

### 1. Inspect the skills catalog
```bash
./scripts/list-skills ./skills
```

This prints the available skills as JSON so you can immediately see what the repository actually contains.

### 2. Read one skill end to end
Start with one file such as:

- `skills/discovery/problem_framing/SKILL.md`
- `skills/delivery/design_review/SKILL.md`
- `skills/optimization/metric_review/SKILL.md`

A good skill in this repo includes:

- clear purpose,
- required variables,
- a practical workflow,
- expected output structure, and
- follow-up actions.

### 3. Decide whether the structure matches your team
The repository is organized around the delivery lifecycle:

| Phase | What it helps with | Example skills |
| --- | --- | --- |
| Discovery | Understand users, risks, market, and constraints | `user_research`, `problem_framing`, `tech_landscape` |
| Definition | Turn insight into scope, strategy, and alignment | `story_map`, `okr_drafting`, `metric_catalog` |
| Delivery | Support implementation and cross-functional execution | `tech_spec`, `test_plan`, `design_review` |
| Optimization | Measure results and improve the system | `metric_review`, `retrospective`, `postmortem` |

If that lifecycle mirrors how your team actually works, the repo is probably useful. If not, it is a reference implementation—not a final solution.

## What is inside

### Core assets
- [`scripts/list-skills`](scripts/list-skills) — Python-based enumerator that scans `SKILL.md` files, reads YAML-style front matter, and outputs a JSON array.
- [`skills/`](skills) — the reusable skills library, grouped by phase.
- [`docs/digital-product-team-howto.md`](docs/digital-product-team-howto.md) — a deeper playbook for implementing the repo in a real team.
- [`docs/repo-review.md`](docs/repo-review.md) — a critical review of the repo's strengths, weaknesses, and recommended next steps.

### Current strength of the implementation

| Area | Current state | Notes |
| --- | --- | --- |
| Skill structure | Good | Skills use a consistent format and are understandable. |
| Discoverability | Good | The enumerator makes the library machine-readable. |
| First-run onboarding | Better, but still lightweight | This README now clarifies the value proposition and limitations. |
| Validation/testing | Weak | There is little automated quality control beyond enumerating skills. |
| Evidence of impact | Weak | The repo explains workflows, but does not yet show case studies or measured results. |

## How to use it

### Install the enumerator
```bash
chmod +x scripts/list-skills
cp scripts/list-skills ~/bin/list-skills
```

### Point your agent tooling at the shared skills directory
```json
{
  "skillsEnumerator": "~/bin/list-skills",
  "skillsDir": "~/workspace/Aiskillinpractice/skills"
}
```

### Enumerate and run skills
```bash
list-skills ~/workspace/Aiskillinpractice/skills
codex skills run discovery.problem_framing --vars "product=Atlas" "segment=Operations" "evidence_sources=User interviews"
```

## Recommended path for new users

If you are seeing this repo for the first time, use this order:

1. Read this README to decide whether the repo is worth your time.
2. Run `./scripts/list-skills ./skills` to verify the catalog is real.
3. Open two or three representative skills and assess quality.
4. Read the implementation guide in `docs/digital-product-team-howto.md`.
5. Review `docs/repo-review.md` for the critical assessment and improvement priorities.
6. Pilot one workflow with a real team artifact before scaling the repo.

## Suggested next improvements

The repository has a solid base, but it would become much stronger with:

- a schema validator for `SKILL.md` front matter,
- example inputs/outputs for each skill,
- role-based onboarding paths,
- contribution standards for skill quality,
- richer integration guidance for non-Codex tools, and
- a small set of “golden” end-to-end examples proving practical value.

## Bottom line

This repository is **useful as a structured foundation**, not as a finished platform. Its best asset is the combination of a simple enumerator plus a coherent skills library that teams can adapt. Its biggest risk is that users may overestimate maturity unless the documentation is explicit about what the repo does and does not provide.

That is why this landing page now leads with value, fit, constraints, and next steps instead of assuming the reader is already convinced.
