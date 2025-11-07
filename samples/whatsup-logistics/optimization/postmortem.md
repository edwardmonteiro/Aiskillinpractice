---
skill: optimization.postmortem
product: WhatsUp Logistics
focus: São Paulo messaging outage
---

# Optimization · Postmortem — WhatsApp Messaging Outage

- **Incident Date**: 2025-03-12
- **Duration**: 47 minutes
- **Impact**: 214 deliveries experienced delayed status updates; 36 customer complaints received.

## Summary
Meta's WhatsApp API returned 5xx errors for Brazilian numbers, preventing outbound status messages. Drivers continued sharing location, but customers and dispatchers lacked automated updates.

## Timeline
| Time (BRT) | Event |
| --- | --- |
| 18:03 | Alert triggered for WhatsApp message failure rate >5%.
| 18:08 | On-call engineer validated issue, confirmed Meta status page outage.
| 18:15 | Switched outbound messaging to Twilio fallback; backlog processing began.
| 18:32 | Customer support notified via Slack and activated manual update script.
| 18:50 | Meta service restored; backlog cleared by 18:56.

## Root Cause
Meta regional API failure; no automated failover due to missing health check coverage.

## Corrective Actions
1. Implement automated failover logic to Twilio when Meta errors exceed threshold.
2. Expand synthetic monitoring to cover Meta regional endpoints.
3. Update incident runbook with communication templates in Portuguese and English.

## Follow-Up
- Add failover tests to [`test_plan.md`](../delivery/test_plan.md).
- Track mitigation progress in operations Jira epic `OPS-122`.
- Share learnings at next retrospective (see [`retrospective.md`](retrospective.md)).
