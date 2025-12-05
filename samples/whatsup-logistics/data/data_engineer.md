# Data Engineering Plan (WhatsUp Logistics)
- **Sources:** WhatsApp webhooks, rider GPS pings, ops DB orders table
- **SLIs:** Freshness < 2 min lag; <0.5% schema drift incidents; 99.5% daily availability

## Contracts
- Webhook events normalized to `events.messaging` with template_id, message_id, delivery_status
- GPS pings to `events.location` with jitter obfuscation; store coarse geo only
- Orders to `core.orders` with delivery SLA flags

## Quality gates
- Contract tests on template_id enums
- Null/PII scans on message bodies; drop/alert if found
- Late arrival detector with quarantine queue

## Deployment
- IaC-managed ingestion; canary for webhook normalization
- Backfill scripts for historical orders; checkpointed retries
