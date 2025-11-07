---
skill: governance.skill_release
product: WhatsUp Logistics
focus: WhatsApp-specific skill update
---

# Governance · Skill Release Brief

## Release Summary
- **Skill Updated**: `delivery.tech_spec`, `delivery.test_plan`, `delivery.agent_collaboration`
- **Version**: 2025.03-WA
- **Owner**: Ana Souza (Product Lead)
- **Date**: 2025-03-24

## Change Description
- Added Portuguese-specific variable guidance (`template_locale`, `quick_reply_set`) across delivery skills.
- Documented WhatsApp live location constraints and failover expectations in skill bodies.
- Introduced `agent_handoff_log` output requirement to align with local and cloud agent collaboration records.

## Rationale
The WhatsUp Logistics rollout requires localized prompts and governance to ensure drivers, dispatchers, and cloud agents operate from the same context while complying with LGPD and Meta platform policies.

## Impact Assessment
- **Affected Teams**: Delivery, Operations, Legal.
- **Risk Level**: Medium — prompts now enforce additional variables; missing values will raise validation errors.
- **Mitigations**: Updated `samples/whatsup-logistics/` artifacts demonstrate expected usage; `scripts/validate-skills` extended to cover new variables (see change request `PR-87`).

## Rollout Plan
1. Merge skill updates with approvals from Product, Engineering, and Legal.
2. Tag repository with `skills-2025.03-wa` and publish release notes internally.
3. Notify all automation agents to refresh enumerated skills via `list-skills`.
4. Audit first two sprints for compliance with new variable requirements.

## Validation
- `scripts/validate-skills` run on commit `7f3b9e2` (pass).
- Sample invocation logs stored in [`../skill-run-log.json`](../skill-run-log.json).

## Follow-Up
- Schedule governance review in May to assess need for Spanish localization prompts.
- Align new experiments or updates with `skill_release` before expansion to Belo Horizonte.
