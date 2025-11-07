---
skill: definition.test_strategy
product: WhatsUp Logistics
focus: QA for WhatsApp driver tracker
---

# Definition · Test Strategy

## Testing Pillars
1. **Conversational Flow Validation** — Ensure WhatsApp templates render correctly in Portuguese, handle accents, and respect opt-in/out requirements.
2. **Location Integrity** — Verify GPS data accuracy, stall detection thresholds, and fallback to cached updates.
3. **Performance & Resilience** — Stress test message throughput, API rate limits, and failover between Meta and Twilio providers.
4. **Security & Compliance** — Confirm LGPD consent flows, data retention automation, and secure handling of proof-of-delivery images.

## Test Types
| Type | Scope | Owner |
| --- | --- | --- |
| Unit | Message formatter, quick reply parser, driver status reducer | Engineering |
| Integration | WhatsApp webhook to dispatcher UI, PIX payout confirmation | QA Engineer |
| End-to-End | Full driver shift simulation with synthetic orders | QA + Ops |
| Chaos | Simulated Meta API outage triggering Twilio fallback | SRE |
| Accessibility | Dispatcher dashboard screen reader and high-contrast theme | Design Systems |

## Tooling
- Automated tests executed via GitHub Actions with WhatsApp API mocks.
- Load testing using k6 against messaging service.
- Device lab includes mid-tier Android phones common among riders.

## Traceability
- Map test cases to user stories in [`story_map.md`](story_map.md).
- Test plan execution details stored in [`../delivery/test_plan.md`](../delivery/test_plan.md).
