---
skill: discovery.problem_framing
product: WhatsUp Logistics
focus: Missed delivery transparency on WhatsApp
---

# Discovery · Problem Framing

## Problem Statement
Dispatchers and customers lack real-time visibility into motorcycle driver progress during peak hours, resulting in 18% more failed deliveries in São Paulo compared with contract commitments.

## Hypotheses
- If drivers can share live location via WhatsApp quick replies, dispatchers can reroute stalled orders within 3 minutes, reducing failures by 30%.
- If customers receive automated WhatsApp updates with localized Portuguese copy, inbound call volume will drop by 20%.
- If we integrate predictive traffic data for São Paulo and Rio, we can detect likely delays 10 minutes earlier than human monitoring.

## Assumptions
- Drivers use Android smartphones with WhatsApp installed; at least 95% keep GPS enabled during shifts.
- WhatsApp Business API throughput will support peak concurrency of 15k messages/hour across Brazil.
- Dispatch team continues to monitor a desktop web dashboard integrated with existing CRM.

## Measures of Success
- SLA adherence improves from 82% to 95% across pilot cities.
- Customer support chat volume decreases by 25% during evening peaks.
- Dispatchers report (via survey) a 4.5/5 satisfaction score with the tracking experience.

## Next Steps
1. Validate driver willingness to opt into live location sharing (see [`user_research.md`](user_research.md)).
2. Audit API limits with Meta partner representative.
3. Prototype delay detection heuristics in tech spike (see [`../definition/tech_spike.md`](../definition/tech_spike.md)).
