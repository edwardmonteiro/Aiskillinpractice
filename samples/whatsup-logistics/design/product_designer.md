# WhatsUp Logistics Flow Outline (WhatsApp)
- **Initiative:** Proof-of-delivery clarity
- **Primary channel:** WhatsApp thread between sender and bot
- **Success metrics:** 5% increase in on-time confirmations; <2% support escalations

## Flow map
1. Shipment created → bot posts confirmation with short-link to live tracker
2. Rider assigned → bot sends avatar, vehicle plate, ETA; includes "pause updates" quick reply
3. Delivery attempted → success/fail template; fail path offers reschedule and support handoff

## Content notes
- Templates pre-approved for PT-BR and EN; include emoji-light variants for low-literacy users
- Error states: template rejection → SMS fallback + log for CX review

## Engineering acceptance
- Provide message IDs per step for observability and retries
- Capture user choices (pause/resume, reschedule) to data events for ML feature store
