---
skill: discovery.risk_assessment
product: WhatsUp Logistics
focus: Operational and compliance risks
---

# Discovery · Risk Assessment

## Invocation Summary
- **Command**
  ```bash
  codex run --skill discovery.risk_assessment \
    --vars "product=WhatsUp Logistics" \
           "regions=São Paulo,Rio de Janeiro" \
           "channels=WhatsApp" \
           "compliance=LGPD,ANATEL" \
           "dependencies=Meta Cloud API,Google Maps Platform"
  ```
- **Agent**: Windsurf local agent coordinating with legal counsel via shared doc.
- **Timestamp**: 2025-03-24T15:10:00Z

## Risk Ledger
| Risk | Type | Impact | Likelihood | Mitigation |
| --- | --- | --- | --- | --- |
| WhatsApp API outage during peak hours | Availability | High | Medium | Implement SMS fallback for priority orders, monitor Meta status webhooks. |
| LGPD breach from storing driver location longer than allowed | Compliance | High | Medium | Apply 180-day retention with automated deletion and anonymize archived analytics. |
| Motorcycle theft or phone loss exposing WhatsApp account | Security | Medium | Medium | Enforce device biometrics, enable WhatsApp Business multi-device with instant revocation flow. |
| Driver distrust of location sharing | Adoption | Medium | Medium | Co-design consent scripts, allow pause/resume via quick reply, include incentives in payouts. |
| Mapping inaccuracies in dense urban areas | Operational | Medium | High | Blend Google Maps traffic data with Waze live feed; escalate anomalies to dispatcher. |

## Action Items
1. Draft WhatsApp business continuity plan with support to ensure fallback messaging.
2. Collaborate with security team to document device loss procedures.
3. Feed compliance requirements into [`test_strategy.md`](../definition/test_strategy.md).
