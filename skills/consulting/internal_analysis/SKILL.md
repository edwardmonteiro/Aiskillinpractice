---
name: consulting.internal_analysis
phase: consulting
roles:
  - Edwards Principal
  - Edwards Engagement Manager
  - Edwards Associate
  - Client Operations Lead
description: Diagnose internal performance using SWOT, value chain, and KPI/root-cause trees to reveal execution gaps and strengths.
variables:
  required:
    - name: business_unit
      description: Business unit or function under review.
    - name: target_kpis
      description: KPIs to decompose (growth, margin, retention, etc.).
  optional:
    - name: benchmarks
      description: Known benchmarks or targets to compare against.
    - name: pain_points
      description: Reported issues from leadership or teams.
outputs:
  - SWOT summarizing capabilities and vulnerabilities.
  - Value chain walkthrough highlighting cost/value opportunities.
  - KPI tree with root-cause hypotheses and data asks.
---

# Purpose
Give Edwards teams a fast, structured way to translate client performance gaps into prioritized diagnostic paths.

# Pre-run Checklist
- ✅ Collect latest KPI trends and operational dashboards.
- ✅ Identify process owners and systems of record for the business unit.
- ✅ Confirm available benchmarks or targets.

# Invocation Guidance
```bash
codex skills run consulting.internal_analysis \
  --vars "business_unit={{business_unit}}" \
         "target_kpis={{target_kpis}}" \
         "benchmarks={{benchmarks}}" \
         "pain_points={{pain_points}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Link to data.analytics_engineer and discovery.data_audit for pipeline and quality checks.
- **Python CLI – `scripts/validate-skills`**: Keep consulting metadata and variables consistent.
- **Sample artifact – `samples/whatsup-logistics/consulting/internal_analysis.md`**: Example SWOT, value chain, and KPI tree for the WhatsApp delivery fleet.
- **MCP server – `mcp/servers/skill_executor/server.py`**: Execute quick KPI pulls or SQL snippets during the session.
- **External APIs – BI/export endpoints**: Pull supporting visuals or CSVs for KPI trends.

# Recommended Input Attachments
- Current KPI dashboards and definitions.
- Process maps or SOPs for the business unit.
- Benchmark references (industry reports, internal targets).

# Claude Workflow Outline
1. Summarize pain points and KPI trends for the business unit.
2. Build a SWOT table with supporting evidence.
3. Map the value chain with cost/value observations.
4. Create KPI/root-cause trees with data asks and owners.
5. Highlight quick wins and deeper-dive workstreams.

# Output Template
```
# Internal Analysis — {{business_unit}}

## SWOT
| Strengths | Weaknesses | Opportunities | Threats |
| --- | --- | --- | --- |

## Value Chain Highlights
- Inbound/Operations:
- Delivery/Service:
- Support/Retention:
- Enablers (Data, Infra, People):

## KPI Trees
- KPI: {{target_kpis}}
  - Drivers:
  - Root-Cause Hypotheses:
  - Data Needed & Owners:

## Quick Wins & Deep Dives
- Quick Wins:
- Deep-Dive Workstreams:
```

# Human Layer: Reflective Practice
- **Metacognitive check-ins**: Validate that SWOT statements are evidence-backed, not hearsay; re-label if uncertain.
- **Emotional awareness**: Acknowledge team accomplishments before surfacing weaknesses to maintain trust.

# Critical Thinking Loop
- **Audience resonance scan**: Anticipate which findings could create defensiveness; lead with data and options, not judgment.
- **Adaptive strategy**: If the KPI tree reveals a dominant root cause, adjust the workplan rather than spreading effort thinly.

# Follow-up Actions
- Send data requests tied to each KPI branch.
- Schedule deep-dive workshops with process owners.
- Translate quick wins into a 30-60-90 action plan.
