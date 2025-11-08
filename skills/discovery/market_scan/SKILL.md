---
name: discovery.market_scan
phase: discovery
roles:
  - Product Manager
  - Product Marketing
description: Analyze the competitive and adjacent solution landscape to surface differentiation opportunities.
variables:
  required:
    - name: product
      description: Name of the product or initiative you are positioning.
    - name: segment
      description: Target customer or market segment to assess.
    - name: competitors
      description: Comma-separated list of competitor or alternative solutions.
  optional:
    - name: evaluation_criteria
      description: Dimensions to compare, e.g., pricing, integrations, compliance.
    - name: timeframe
      description: Time horizon for the analysis (e.g., FY25).
outputs:
  - Competitive comparison matrix with key differentiators.
  - Opportunity summary and product positioning angles.
  - Risk register noting threats and mitigation ideas.
---

# Purpose
Equip go-to-market and product leads with a structured competitive analysis that highlights how Claude can support subsequent positioning decisions.

# Pre-run Checklist
- ✅ Validate the competitor list with marketing and sales enablement.
- ✅ Gather any pricing sheets, analyst reports, or customer feedback references.
- ✅ Align on evaluation criteria before invoking the skill.

# Invocation Guidance
```bash
codex skills run discovery.market_scan \
  --vars "product={{product}}" \
         "segment={{segment}}" \
         "competitors={{competitors}}" \
         "evaluation_criteria={{evaluation_criteria}}" \
         "timeframe={{timeframe}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Refresh the competitive analysis toolkit before pairing with stakeholders or automations.
- **Sample artifact – `samples/whatsup-logistics/discovery/market_scan.md`**: Reference the WhatsUp Logistics market scan for narrative and formatting cues.
- **External API – Google Trends & IBGE Open Data**: Pull macro demand indicators and Brazilian logistics benchmarks to enrich the comparison matrix.
- **MCP server – `mcp/servers/skills_catalog/server.py`**: Serve the market scan definition to IDE and cloud agents for asynchronous contributions.

# Recommended Input Attachments
- Links or documents containing competitor feature sets.
- Customer interviews referencing competitor strengths and weaknesses.

# Claude Workflow Outline
1. Summarize the segment context and the role of your product.
2. Build a table comparing each competitor against the evaluation criteria with notes on strengths and gaps.
3. Highlight differentiation opportunities and suggested win themes for positioning.
4. Identify potential risks or threats that require monitoring, including trigger signals.
5. Recommend follow-up analyses or validations.

# Output Template
```
## Competitive Landscape Overview
<Overview paragraph>

## Comparison Matrix
| Criteria | {{competitor_1}} | {{competitor_2}} | {{product}} Advantage |
| --- | --- | --- | --- |

## Differentiation Opportunities
1. ...
2. ...

## Risks & Mitigations
| Risk | Trigger | Impact | Mitigation |
| --- | --- | --- | --- |
```


# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Pause after each major section to confirm the prompt is still solving the right problem and that the audience's needs are clearly addressed.
- **Emotional awareness**: Note any stakeholder sensitivities, preferred communication styles, or cultural cues so the narrative lands with empathy.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate how partner teams will receive this artifact; adjust emphasis or tone if something could trigger confusion or resistance.
- **Adaptive strategy**: If new insights emerge mid-draft, revisit the goal or success criteria and revise the approach instead of forcing the original plan.

# Follow-up Actions
- Align with product marketing on messaging updates.
- Feed insights into roadmap prioritization and customer storytelling.
- Schedule quarterly refreshes to keep the landscape current.
