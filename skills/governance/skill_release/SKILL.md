---
name: governance.skill_release
phase: governance
roles:
  - Skills Maintainer
  - Chapter Lead
  - Engineering Enablement
description: Coordinate versioned skill releases, branching strategy, and rollout guidance across multiple teams.
variables:
  required:
    - name: release_version
      description: Semantic version for the skill release (for example, 1.3.0).
    - name: scope
      description: Summary of new or changed skills covered by this release.
  optional:
    - name: rollout_window
      description: Target dates for documentation updates, enablement sessions, and production usage.
    - name: review_board
      description: Stakeholder group (by role or squad) that must sign off before merge.
outputs:
  - Release brief capturing highlights, affected skills, and migration notes.
  - Git workflow checklist including branch strategy, validation commands, and approval matrix.
  - Rollout communications plan with enablement assets and owner assignments.
allowed-tools:
  - git
  - gh
---

# Purpose
Provide a repeatable path for scaling Claude Skills updates like application code, ensuring every squad consumes vetted, versioned prompts.

# Pre-run Checklist
- ✅ Capture proposed skill changes in a branch named `skills/release-<release_version>`.
- ✅ Ensure `scripts/validate-skills` passes locally.
- ✅ Confirm change log entries exist for each skill touched.

# Invocation Guidance
```bash
codex skills run governance.skill_release \
  --vars "release_version={{release_version}}" \
         "scope={{scope}}" \
         "rollout_window={{rollout_window}}" \
         "review_board={{review_board}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/validate-skills`**: Enforce metadata correctness before tagging or merging release branches.
- **Python CLI – `scripts/list-skills`**: Generate before/after catalogs that accompany the release brief and MCP announcements.
- **Sample artifact – `samples/whatsup-logistics/governance/skill_release.md`**: Model the release brief and rollout sections on the WhatsUp Logistics governance record.
- **External API – GitHub GraphQL & gh CLI**: Automate pull request audits, reviewer assignments, and tagging from the release checklist.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Publish updated catalog metadata to connected agents immediately after tagging.

# Recommended Input Attachments
- Diff summaries or pull request links for the skills being updated.
- Feedback notes from squads piloting the changes.
- Updated documentation drafts (README, how-to, or webapp excerpts).

# Claude Workflow Outline
1. Summarize the release scope and highlight breaking or high-impact changes.
2. Map skills to owning squads and identify required migration or training.
3. Generate a Git-focused release checklist (branch naming, review steps, validation commands, tag instructions).
4. Prepare rollout messaging and enablement resources for local IDE agents and cloud automation partners.
5. Capture metrics to monitor adoption and surface follow-up actions.

# Output Template
```
# Claude Skills Release — v{{release_version}}

## 1. Scope Overview
- Summary:
- Skills touched:
- Linked PRs / branches:

## 2. Git Workflow & Quality Gates
- Branch strategy:
- Required reviewers:
- Validation commands:
  - `scripts/validate-skills`
  - `scripts/list-skills skills | jq '.[].name'`
- Tagging instructions:

## 3. Rollout & Enablement Plan
- Rollout window:
- Squads impacted:
- Enablement assets:
- Communication owners:

## 4. Migration Notes
- Deprecated prompts:
- Required updates for local IDE agents:
- Required updates for cloud automations:

## 5. Follow-up Metrics
- Adoption signals to monitor:
- Feedback loops:
```

# Follow-up Automation Hooks
- Trigger `scripts/validate-skills` in CI pipelines before merging skill changes.
- Tag releases using `git tag skills/v{{release_version}} && git push origin skills/v{{release_version}}` once approved.
- Notify all squads via the enablement channel with the generated rollout plan.

# Changelog
- v1.0.0 — Initial release capturing governance workflow, Git checklist, and rollout guidance.
