---
name: definition.test_strategy
phase: definition
roles:
  - QA Lead
  - Test Engineer
description: Define the holistic testing approach across functional, non-functional, and automation layers for the initiative.
variables:
  required:
    - name: feature
      description: Feature, release, or program under test.
    - name: scope
      description: Platforms, devices, or channels included in coverage.
  optional:
    - name: non_functional
      description: Critical non-functional requirements such as performance or accessibility.
    - name: constraints
      description: Time, tooling, or staffing constraints to consider.
outputs:
  - Testing goals and risk-based prioritization.
  - Coverage matrix across test types and environments.
  - Milestones, entry/exit criteria, and reporting cadence.
---

# Purpose
Equip QA teams with a thorough test strategy document ready to align with engineering and product before delivery begins.

# Pre-run Checklist
- ✅ Review discovery risk assessment outcomes.
- ✅ Gather architectural diagrams and integration dependencies.
- ✅ Confirm available automation frameworks and environment readiness.

# Invocation Guidance
```bash
codex run --skill definition.test_strategy \
  --vars "feature={{feature}}" \
         "scope={{scope}}" \
         "non_functional={{non_functional}}" \
         "constraints={{constraints}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Chain outputs from discovery risk assessment and delivery test plan skills without context loss.
- **Sample artifact – `samples/whatsup-logistics/definition/test_strategy.md`**: Calibrate coverage matrices and milestone language to the WhatsUp Logistics template.
- **External API – BrowserStack & Load Testing services**: Reference environment availability and automate smoke/performance suites via their REST APIs.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Schedule scripted test harness runs or linting commands directly from connected agents.

# Recommended Input Attachments
- Historical defect data or production incident summaries.
- Existing test plans or automation coverage reports.

# Claude Workflow Outline
1. Summarize feature scope, risks, and constraints.
2. Define testing objectives tied to quality risks and success metrics.
3. Produce a coverage matrix mapping test types to owners, environments, and tooling.
4. Outline milestones with entry/exit criteria and reporting cadence.
5. Highlight dependencies, data needs, and automation investments.

# Output Template
```
## Test Strategy Overview
Feature: {{feature}}
Scope: {{scope}}

## Testing Objectives
- Objective — Risk addressed — Metric

## Coverage Matrix
| Test Type | Owner | Environment | Tooling | Automation | Notes |
| --- | --- | --- | --- | --- | --- |

## Milestones & Criteria
| Milestone | Entry Criteria | Exit Criteria | Target Date | Owner |
| --- | --- | --- | --- | --- |

## Dependencies & Data Needs
- Dependency:
- Mitigation:
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Review strategy with engineering and product leadership for sign-off.
- Translate coverage needs into executable test cases in the test management tool.
- Track progress and update strategy as scope evolves.
