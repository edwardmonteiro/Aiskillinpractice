---
skill: delivery.roadmap
product: WhatsUp Logistics
focus: WhatsApp driver tracking rollout
---

# Delivery · Roadmap

## Horizon Overview
| Quarter | Initiative | Description | Owner |
| --- | --- | --- | --- |
| Q2 2025 | Pilot WhatsApp tracking in São Paulo & Rio | Launch live location, delay detection, dispatcher dashboard | Product & Ops |
| Q3 2025 | Expand to Belo Horizonte + PIX payouts | Add payout automation, driver incentive program, Portuguese/English templates | Payments Squad |
| Q4 2025 | Predictive routing & ML improvements | Integrate predictive ETA updates, driver coaching insights | Data Science |
| Q1 2026 | Marketplace integrations | Provide APIs for retail partners to embed WhatsApp tracking | Platform Team |

## Milestones
- **April 5**: Complete tech spec and finalize backlog sizing.
- **April 19**: Finish load testing and redundancy checks.
- **May 3**: Conduct pilot readiness review and update [`release_notes.md`](release_notes.md).
- **June 1**: Evaluate pilot metrics (see [`optimization/metric_review.md`](../optimization/metric_review.md)) and plan expansion.

## Dependencies
- Meta API quota approval (awaiting confirmation).
- Legal sign-off on LGPD consent language.
- Finance integration with PIX provider (Banco do Brasil).

## Risks & Mitigations
- **Driver adoption**: Provide onboarding training and incentives.
- **API stability**: Maintain Twilio fallback and automated health checks.
- **Data latency**: Optimize Kinesis stream and caching for low bandwidth regions.

## Notes
- Roadmap items cross-linked with issues in GitHub Project `WhatsUp Delivery`.
- Update after each monthly steering meeting.
