---
name: consulting.strategy_prioritization
phase: consulting
roles:
  - Edwards Principal
  - Edwards Engagement Manager
  - Edwards Associate
  - Client Strategy Lead
description: Develop and prioritize strategic options using Ansoff, BCG, and ICE scoring to focus resources on the highest-value plays.
variables:
  required:
    - name: growth_goals
      description: Target outcomes (revenue, margin, market share) for the horizon.
    - name: options
      description: Candidate strategic moves or initiatives to assess.
  optional:
    - name: market_data
      description: Market share, growth rates, and positioning inputs.
    - name: capacity
      description: Delivery or investment capacity constraints.
outputs:
  - Ansoff matrix positioning the options across markets and products.
  - BCG-style portfolio view with market data and investment posture.
  - ICE scoring table with recommendations and next steps.
---

# Purpose
Enable Edwards teams to translate insights into a sharp, evidence-backed strategy shortlist with clear sequencing.

# Pre-run Checklist
- ✅ Confirm growth goals and horizon are approved.
- ✅ Gather market share estimates and product performance data.
- ✅ Align on capacity and risk appetite with client leadership.

# Invocation Guidance
```bash
codex skills run consulting.strategy_prioritization \
  --vars "growth_goals={{growth_goals}}" \
         "options={{options}}" \
         "market_data={{market_data}}" \
         "capacity={{capacity}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Pull inputs from external and internal analyses plus data.scientist projections.
- **Python CLI – `scripts/validate-skills`**: Keep metadata consistent as strategy options evolve.
- **Sample artifact – `samples/whatsup-logistics/consulting/strategy_prioritization.md`**: Example Ansoff/BCG/ICE stack for WhatsUp Logistics.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Run quick calculations (ICE scoring, growth deltas) via remote tools.
- **External APIs – finance/market datasets**: Populate growth rates and share estimates.

# Recommended Input Attachments
- Market share charts and TAM/SAM/SOM estimates.
- Product performance dashboards.
- Capacity or headcount plans.

# Claude Workflow Outline
1. Restate growth goals and constraints.
2. Place options on the Ansoff matrix with rationale.
3. Map options into a BCG-style portfolio and suggest investment posture.
4. Score each option with ICE, calling out assumptions and sensitivity.
5. Recommend a sequenced roadmap with quick wins and bold bets.

# Output Template
```
# Strategy Prioritization — {{growth_goals}}

## Ansoff Matrix
| | Existing Markets | New Markets |
| --- | --- | --- |
| Existing Products | | |
| New Products | | |

## Portfolio Snapshot (BCG-style)
| Option | Growth Rate | Relative Share | Quadrant | Investment Posture |
| --- | --- | --- | --- | --- |

## ICE Scoring
| Option | Impact (1-5) | Confidence (1-5) | Ease (1-5) | ICE | Notes |
| --- | --- | --- | --- | --- | --- |

## Recommendation & Sequencing
- Shortlist:
- Quick Wins:
- Transformational Bets:
- Dependencies & Risks:
```

# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Challenge whether options are genuinely MECE and data-supported; drop or merge weak ones.
- **Emotional awareness**: Balance ambition with feasibility; avoid overstating confidence to appease optimistic sponsors.

# Critical Thinking Loop
- **Audience resonance scan**: Emphasize how recommendations support the client's agenda; rephrase if it conflicts with political realities.
- **Adaptive strategy**: If scoring reveals a surprise front-runner, revisit the narrative and constraints instead of forcing the old favorite.

# Follow-up Actions
- Share the shortlist with sponsors for alignment.
- Convert recommended options into OKRs or roadmap epics.
- Plan a checkpoint to refresh scores as new data arrives.
