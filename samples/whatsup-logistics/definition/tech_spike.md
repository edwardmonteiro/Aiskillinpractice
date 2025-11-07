---
skill: definition.tech_spike
product: WhatsUp Logistics
focus: WhatsApp live location streaming
---

# Definition · Tech Spike

## Goal
Validate architecture options for streaming motorcycle GPS coordinates through WhatsApp Business API while handling offline scenarios common in Brazilian cities.

## Experiments
1. **Meta Cloud API webhooks**
   - Implemented Node.js listener to process inbound driver quick replies toggling live location.
   - Measured average latency of 2.1 seconds; acceptable for SLA.
2. **Twilio Sandbox fallback**
   - Configured Twilio as failover with template parity.
   - Latency increases to 3.8 seconds but ensures redundancy.
3. **Offline caching prototype**
   - Android foreground service caches coordinates when network drops.
   - When connectivity returns, service bulk sends last 10 points via WhatsApp interactive message.

## Findings
- Meta Cloud API suits primary flow; maintain Twilio for disaster recovery.
- Need queue buffer in AWS to smooth bursts (use Kinesis with 1-minute retention).
- Quick reply payloads must include driver_id and order_id for deterministic mapping.

## Recommendations
- Document final approach in [`tech_spec.md`](../delivery/tech_spec.md).
- Update testing focus areas in [`test_plan.md`](../delivery/test_plan.md) to cover offline caching.
