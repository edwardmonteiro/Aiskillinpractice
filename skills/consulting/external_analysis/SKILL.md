---
name: consulting.external_analysis
phase: consulting
roles:
  - Edwards Principal
  - Edwards Engagement Manager
  - Edwards Associate
  - Client Insights Lead
description: Evaluate external forces with PESTLE and Porter's Five Forces to quantify market pressure and competitive posture.
variables:
  required:
    - name: market
      description: Target market, geography, or segment to assess.
    - name: product_lines
      description: Products or services under review.
  optional:
    - name: competitors
      description: Named competitors to benchmark.
    - name: time_horizon
      description: Planning horizon for the analysis (e.g., next 12 months).
outputs:
  - PESTLE summary highlighting material external shifts.
  - Five Forces assessment with quantified threat and power scores.
  - Implications and watchlist items for downstream strategy work.
---

# Purpose
Help Edwards teams rapidly size external pressure and surface threats or tailwinds that shape strategy.

# Pre-run Checklist
- ✅ Confirm the market and product scope are locked.
- ✅ Collect recent analyst reports, funding news, and regulatory updates.
- ✅ Align on whether the horizon is near-term defense or longer-term growth.

# Invocation Guidance
```bash
codex skills run consulting.external_analysis \
  --vars "market={{market}}" \
         "product_lines={{product_lines}}" \
         "competitors={{competitors}}" \
         "time_horizon={{time_horizon}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Pair with discovery.market_scan and data.scientist skills for signal gathering.
- **Python CLI – `scripts/validate-skills`**: Keep consulting-phase metadata consistent as the catalog scales.
- **Sample artifact – `samples/whatsup-logistics/consulting/external_analysis.md`**: Example PESTLE and Five Forces for WhatsUp Logistics.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Trigger web scrapers or data pulls requested in the analysis.
- **External APIs – news/finance feeds**: Populate competitive moves, pricing shifts, and macro changes.

# Recommended Input Attachments
- Analyst or equity research summaries.
- Competitor pricing sheets and feature matrices.
- Regulatory calendars or compliance updates.

# Claude Workflow Outline
1. Outline PESTLE factors with evidence and relevance to the market and product lines.
2. Score each Porter force with rationale and competitor notes.
3. Summarize implications, risks, and opportunity spaces.
4. Identify data gaps to close with follow-on discovery or data pulls.
5. Propose watchlist and check-in cadence for the time horizon.

# Output Template
```
# External Analysis — {{market}}

## PESTLE Snapshot
| Factor | Observations | Impact | Evidence |
| --- | --- | --- | --- |

## Porter's Five Forces
| Force | Score (1-5) | Rationale | Key Players |
| --- | --- | --- | --- |

## Implications & Watchlist
- Opportunities:
- Risks:
- Data Gaps:
- Check-in Cadence:
```

# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Verify the force scores are evidence-based, not gut feel; adjust if data is weak.
- **Emotional awareness**: Consider how clients may react to threat language; balance urgency with actionable tone.

# Critical Thinking Loop
- **Audience resonance scan**: Emphasize the forces leadership cares about (e.g., regulation vs. rivalry); reframe if misaligned.
- **Adaptive strategy**: If a force dominates, revisit scope or add alternative scenarios instead of forcing symmetry.

# Follow-up Actions
- Share the analysis as pre-read for strategy optioning.
- Convert watchlist items into monitoring tickets or dashboards.
- Schedule a refresh after key market events.
