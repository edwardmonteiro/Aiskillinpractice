---
skill: data.business_analyst
product: WhatsUp Logistics
focus: Balancing courier experience with on-time delivery in São Paulo
---

# Data · Business Analysis

## Decision Context
- Question: How do we reduce late deliveries without increasing rider churn?
- Stakeholders: Operations, Finance, Support, Courier Community Team
- Timeframe: Q3 pilot in São Paulo and Rio
- Success metric: Improve on-time delivery by 5% while keeping rider satisfaction ≥ 4.5/5

## Hypotheses & Risks
- Hypotheses: (1) Dynamic rerouting with stall scores reduces lateness; (2) Proactive WhatsApp nudges lower cancellations.
- Risks: Alert fatigue for riders; potential increase in support tickets if nudges misfire; budget constraints for incentives.

## Experiment / Analysis Plan
- Design: Split zones by neighborhood; compare standard ops vs. stall-informed rerouting + rider incentive messages.
- Metrics & guardrails: on-time %, rider churn %, support tickets per delivery, incentive cost per saved delivery.
- Data sources: delivery status marts, stall scores service logs, support tickets, incentive payouts.
- Timeline: 4-week pilot with mid-point readout.

## Recommendations & Next Steps
- Provisional answer: Proceed with pilot using conservative nudging; cap incentives and pair with human review for outliers.
- Implementation tasks: finalize dashboards, align with ML + Analytics Engineering on data feeds, brief support team.
- Owners & deadlines: Ops lead (pilot), Analytics (reporting), Finance (budget), ML Eng (integration) — kickoff next Monday.
