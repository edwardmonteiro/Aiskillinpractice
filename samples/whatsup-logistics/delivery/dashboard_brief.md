---
skill: delivery.dashboard_brief
product: WhatsUp Logistics
focus: Dispatcher monitoring dashboard
---

# Delivery · Dashboard Brief

## Overview
Design a responsive dispatcher dashboard that consolidates WhatsApp driver statuses, GPS locations, and SLA alerts for Brazilian operations teams.

## Audience
- Dispatch supervisors managing 30–50 riders per shift.
- Operations leadership monitoring SLA trends across cities.
- Customer support agents needing quick visibility into rider progress.

## Primary Use Cases
1. Monitor live map with driver locations, traffic overlays, and color-coded SLA status.
2. Escalate stalled deliveries via WhatsApp or phone with one-click actions.
3. Review queue of open incidents with timestamps and responsible agents.
4. Export daily performance summary for leadership briefing.

## Data Sources
- WhatsApp status messages processed via ingestion service.
- GPS events normalized in DynamoDB and aggregated via API.
- Delay detection model outputs from Feature Store.
- Zendesk incident feed for escalations.

## Success Metrics
- Dispatchers resolve 90% of SLA breaches before customer impact.
- Dashboard latency stays under 2 seconds for map updates.
- Incident queue accuracy (matching reality) stays above 98%.

## Design Considerations
- Provide dark mode for night shifts.
- Support Portuguese labels by default; allow English toggle.
- Integrate quick action buttons that trigger pre-approved WhatsApp templates.

## Implementation Notes
- Built with Next.js and Leaflet for map visualization.
- Leverage WebSocket channel for near real-time updates.
- Document component architecture in [`tech_spec.md`](tech_spec.md).
