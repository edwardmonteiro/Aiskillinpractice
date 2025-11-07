---
skill: optimization.metric_review
product: WhatsUp Logistics
focus: Weekly SLA and engagement metrics
---

# Optimization · Metric Review (Week of 2025-05-19)

## Snapshot
| Metric | Target | Actual | Trend | Commentary |
| --- | --- | --- | --- | --- |
| On-Time Delivery Rate | 95% | 93.4% | ↗︎ +1.2pp | Slightly below target; Rio experiencing rain-related slowdowns. |
| WhatsApp Engagement Rate | 75% | 81% | ↗︎ +3pp | Customers responding positively to proactive nudges. |
| Message Latency (p95) | <2s | 1.7s | ↘︎ -0.1s | Stable after Kinesis optimization. |
| Driver Availability Uptime | 92% | 88% | ↘︎ -2pp | Belo Horizonte drivers pausing tracking due to data usage concerns. |
| Support Escalations / 100 orders | <4 | 3.1 | ↘︎ -0.4 | Training updates reduced escalations. |

## Notable Insights
- Belo Horizonte drivers reported device overheating during midday heat; investigating lighter GPS sampling.
- Message latency improvements correspond with lower dispatcher manual interventions.
- Engagement uptick aligns with experiment rollout in São Paulo (see [`experiment_analysis.md`](experiment_analysis.md)).

## Actions
1. Launch driver education campaign on data usage and battery optimization.
2. Monitor On-Time Delivery daily; escalate to operations if below 94% for consecutive days.
3. Add map overlay showing areas with frequent pauses to inform route planning.

## Next Review
- Schedule review for 2025-05-26 with Ops and Engineering leads.
