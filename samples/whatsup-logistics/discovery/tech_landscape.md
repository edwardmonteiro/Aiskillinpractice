---
skill: discovery.tech_landscape
product: WhatsUp Logistics
focus: Platform capabilities for WhatsApp tracking
---

# Discovery · Technology Landscape

## Summary
The skill mapped the ecosystem required to deliver real-time WhatsApp updates and GPS tracking for motorcycle couriers operating across Brazilian cities.

## Key Platforms
- **Meta WhatsApp Business Cloud API** — Primary messaging channel supporting session and template messages; throughput rated for 25 messages/second after verified status.
- **Twilio WhatsApp** — Considered as backup provider; higher per-message cost but includes template localization support.
- **Google Maps Platform** — Provides Directions, Roads, and Traffic APIs for estimating arrival times and snapping GPS points to road networks.
- **Mapbox Static Images** — Used to generate shareable map snapshots when customers request confirmation via WhatsApp.
- **AWS Kinesis** — Candidate for ingesting GPS events at scale and distributing to both dispatcher UI and analytics warehouse.

## Integration Considerations
- Ensure WhatsApp session management handles Portuguese accent characters in quick replies.
- Rate-limit map snapshot requests to avoid exceeding free tier; implement caching for repeated location queries.
- Evaluate AWS Global Accelerator for reducing latency between northern Brazil regions and São Paulo data center.

## Next Steps
1. Prototype double-provider failover with Meta and Twilio inside [`tech_spike.md`](../definition/tech_spike.md).
2. Document infrastructure dependencies in [`tech_spec.md`](../delivery/tech_spec.md).
3. Capture any new vendor contracts inside procurement workspace.
