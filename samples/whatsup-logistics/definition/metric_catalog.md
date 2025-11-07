---
skill: definition.metric_catalog
product: WhatsUp Logistics
focus: WhatsApp delivery tracking KPIs
---

# Definition · Metric Catalog

## Invocation Summary
- **Command**
  ```bash
  codex run --skill definition.metric_catalog \
    --vars "product=WhatsUp Logistics" \
           "primary_goal=Increase SLA adherence" \
           "channels=WhatsApp" \
           "regions=São Paulo,Rio de Janeiro,Belo Horizonte"
  ```
- **Agent**: Devin cloud agent generated the table and synced to shared metrics repo.
- **Timestamp**: 2025-03-24T16:00:00Z

## Metrics
| Metric | Definition | Owner | Frequency | Source |
| --- | --- | --- | --- | --- |
| On-Time Delivery Rate | % of deliveries arriving within promised window | Delivery Ops Lead | Daily | GPS events + order DB |
| WhatsApp Engagement Rate | % of customers interacting with automated messages | Product Marketing | Weekly | WhatsApp Business API logs |
| Driver Availability Uptime | Average % of shift with live location enabled | Fleet Manager | Daily | GPS broker |
| SLA Breach Escalations | Count of orders requiring manual intervention | Dispatch Manager | Daily | Dispatcher dashboard |
| Message Delivery Latency | Median seconds between status change and WhatsApp notification | Platform Engineering | Hourly | Messaging pipeline |
| Customer Support Volume | WhatsApp or phone escalations per 100 orders | Support Lead | Weekly | Zendesk |

## Decisions
- Track WhatsApp engagement as a north-star indicator of trust before expanding to new cities.
- Instrument message latency inside observability stack and tie to pager duty for P1 incidents.

## Linked Artifacts
- Metrics referenced in [`okr_drafting.md`](okr_drafting.md) and [`quality_report.md`](../optimization/quality_report.md).
