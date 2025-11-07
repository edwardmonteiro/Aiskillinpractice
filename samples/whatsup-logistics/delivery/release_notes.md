---
skill: delivery.release_notes
product: WhatsUp Logistics
focus: Pilot launch communications
---

# Delivery · Release Notes — WhatsApp Driver Tracker Pilot

- **Version**: 2025.4.0
- **Date**: 2025-05-05
- **Audience**: Dispatchers, customer support, driver leads, executive stakeholders

## Highlights
- WhatsApp live location sharing for São Paulo and Rio riders with pause/resume quick replies.
- Dispatcher dashboard showing driver map, SLA alerts, and incident queue.
- Automated customer notifications with localized Portuguese templates.
- PIX payout reconciliation flow integrated into nightly batch.

## Rollout Plan
1. Enable feature flag `whatsapp_tracker_enabled` for São Paulo riders on May 6.
2. Monitor metrics hourly (message latency, SLA adherence) for 48 hours.
3. Expand to Rio riders on May 10 if KPIs meet thresholds.
4. Conduct retrospective on May 24 before expanding to Belo Horizonte.

## Known Issues
- When drivers re-install WhatsApp mid-shift, live location requires re-authorization (documented in runbook).
- Map overlays show delayed traffic updates in tunnels; mitigation planned via caching.

## Action Items for Teams
- **Dispatch**: Review updated training deck and confirm readiness in daily stand-up.
- **Support**: Update Zendesk macros and escalate incidents via new form.
- **Engineering**: Keep Twilio fallback warm and monitor Datadog dashboards.
- **Ops Enablement**: Gather driver feedback via WhatsApp survey on May 12.

## Supporting Artifacts
- SDD: [`specs/projects/whatsup-logistics/sdd.md`](../../specs/projects/whatsup-logistics/sdd.md)
- Test Plan: [`test_plan.md`](test_plan.md)
- Roadmap: [`roadmap.md`](roadmap.md)
