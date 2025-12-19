---
name: sales.enablement_feedback
phase: sales
roles:
  - Sales Enablement Lead
  - Sales Manager
  - Product Marketing Partner
  - SDR Manager
description: Capture rep feedback, gaps, and win/loss signals to drive content updates, play revisions, and onboarding improvements.
variables:
  required:
    - name: feedback_stream
      description: Aggregated rep feedback from calls, ride-alongs, and enablement sessions.
    - name: win_loss_notes
      description: Recent win/loss summaries with buyer objections, competitors, and proof points.
  optional:
    - name: content_inventory
      description: Current deck/play/one-pager inventory with owners and freshness dates.
    - name: onboarding_metrics
      description: Ramp time, certification pass rates, and call quality scores.
outputs:
  - Enablement action board saved to specs/projects/<initiative>/sales/enablement_feedback.md with prioritized fixes and owners.
  - Content refresh plan saved to specs/projects/<initiative>/sales/content_refresh.csv for tracking updates and deadlines.
---

# Purpose
Create a tight loop between field feedback and enablement content so reps get what they need to win deals faster.

# Pre-run Checklist
- ✅ Gather at least one week of call recordings or notes across regions and segments.
- ✅ Pull latest win/loss breakdown with top objections and competitor mentions.
- ✅ Inventory current enablement assets and their freshness.

# Invocation Guidance
```bash
codex skills run sales.enablement_feedback \
  --vars "feedback_stream={{feedback_stream}}" \
         "win_loss_notes={{win_loss_notes}}" \
         "content_inventory={{content_inventory}}" \
         "onboarding_metrics={{onboarding_metrics}}"
```

# Toolchain & Integrations
- **Scripts:** Text clustering script (via `uv run`) to group feedback themes; export markdown and CSV outputs.
- **APIs/MCP:** Pull call summaries from conversation-intelligence APIs or MCP connectors; push tasks to project tools if enabled.
- **Fallbacks:** Manually tag themes in a shared doc and update the CSV by hand when automation is unavailable.

# Functional Contract
- **Inputs → Outputs:**
  - `feedback_stream` + `win_loss_notes` → prioritized themes, objections, and content gaps.
  - `content_inventory` → freshness checks and owner assignments in the refresh CSV.
  - `onboarding_metrics` → ramp risks and suggested modules to refine.
- **Idempotence:** Overwrites the markdown board and refresh CSV; tasks use `theme` + `asset` as dedupe keys.
- **Error Handling:** If no feedback is provided, emit a stub board stating missing inputs and skip CSV generation.

# Implementation Notes
- Balance regional nuances with global patterns; avoid overfitting to one segment’s objections.
- Include proof points and customer stories tied to each theme where possible.
- Provide suggested content formats (short deck, battlecard, snippet) to speed production.

# Human Layer: Reflective Practice
- Consider how feedback will land with content owners; keep tone collaborative and specific.
- Question whether proposed changes solve the root cause or just the loudest complaints.

# Critical Thinking Loop
- If themes repeat quarter over quarter, reassess whether product gaps or ICP targeting need adjustment.
- If onboarding metrics lag, revisit whether content is the limiter or if coaching/process changes are required.

# Follow-up Checklist
- [ ] Publish the action board to sales leadership and content owners.
- [ ] Assign due dates and update statuses weekly until themes are resolved.
- [ ] Feed top objections back into discovery and product teams.
