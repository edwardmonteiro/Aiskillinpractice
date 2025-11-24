---
skill: data.analytics_engineer
product: WhatsUp Logistics
focus: WhatsApp webhook ingestion and trusted delivery status marts
---

# Data · Analytics Engineering Plan

## Sources
- WhatsApp Business webhooks (delivery updates, driver responses)
- GPS pings via Kinesis from the rider Android app
- Support tickets and cancellation events from Zendesk export

## Contract
- Grain: driver × delivery × status transition
- Schema highlights: `driver_id`, `delivery_id`, `status`, `status_timestamp`, `geo_hash`, `traffic_level`, `handoff_channel`
- Freshness: <5m end-to-end for operational dashboards; hourly aggregates for finance
- Tests: not-null on IDs/status, freshness on `status_timestamp`, valid status transitions

## Pipeline Design
- Ingest WhatsApp payloads into raw S3, normalize via Lambda, enqueue to Kinesis.
- Transform with dbt: `stg_whatsapp_events` → `fct_delivery_status` → `dm_delivery_health` marts.
- Lineage + quality: dbt tests + Great Expectations alerts into Datadog; lineage exposed via OpenLineage.
- Cost controls: S3 lifecycle to Glacier after 90 days; Snowflake clustering on `status_timestamp`.

## Rollout
- Backfill last 30 days using stored webhooks and driver app replays.
- Validate with operations leads on dashboard parity vs. manual trackers.
- Publish contracts in the internal catalog and schedule knowledge share.
