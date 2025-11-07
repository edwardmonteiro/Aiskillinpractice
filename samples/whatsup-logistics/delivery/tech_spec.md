---
skill: delivery.tech_spec
product: WhatsUp Logistics
focus: System architecture for WhatsApp driver tracker
---

# Delivery · Technical Specification

## Overview
The system enables WhatsUp Logistics to coordinate motorcycle drivers via WhatsApp, track live locations, and provide dispatchers with real-time dashboards.

## Architecture Components
1. **Messaging Ingestion Service** (Node.js on AWS Fargate)
   - Receives WhatsApp webhook events.
   - Parses quick replies, updates driver status, and enqueues tasks.
2. **Location Stream Processor** (Python on AWS Lambda + Kinesis)
   - Normalizes GPS points, enriches with Google Maps traffic data, writes to DynamoDB + Snowflake.
3. **Dispatcher Dashboard API** (FastAPI)
   - Serves aggregated driver status, incidents, and map overlays to Next.js frontend.
4. **Event Bus** (Amazon EventBridge)
   - Routes stall detection events to alerting service and WhatsApp messaging module.
5. **Customer Notification Worker** (Python, Celery)
   - Sends WhatsApp template messages for status updates and ETA changes.
6. **Data Warehouse & Analytics** (Snowflake + dbt)
   - Powers KPI dashboards for operations and quality reports.

## Data Model Highlights
- `driver_status` table storing current location, status, last_update.
- `delivery_event` capturing transitions (assigned, en route, delivered, stalled).
- `whatsapp_message_log` with template name, language, delivery status.

## Non-Functional Requirements
- Handle 20k concurrent deliveries with <2s message latency.
- Ensure 99.9% uptime for messaging ingestion service.
- Encrypt data at rest and in transit; follow LGPD for retention.

## Dependencies
- Meta WhatsApp Business Cloud API (primary) and Twilio (fallback).
- Google Maps Directions, Roads, and Traffic APIs.
- PIX integration for driver payouts.

## Testing Strategy
- Refer to [`test_plan.md`](test_plan.md) for comprehensive scenarios.

## Monitoring & Alerting
- Datadog monitors message latency, error rates, and stall detection accuracy.
- PagerDuty on-call rotation for platform team.
- Dashboarding requirements derived from [`dashboard_brief.md`](dashboard_brief.md).

## Security Considerations
- Rotate WhatsApp API tokens every 30 days.
- Audit access to driver location data; log access in SIEM.
- Multi-factor authentication for dispatcher dashboard.

## Implementation Notes
- Follow SDD sections in [`../../specs/projects/whatsup-logistics/sdd.md`](../../specs/projects/whatsup-logistics/sdd.md).
- Document API contracts in `specs/projects/whatsup-logistics/api/` as they evolve.
