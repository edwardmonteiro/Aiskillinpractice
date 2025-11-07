---
skill: definition.story_map
product: WhatsUp Logistics
focus: WhatsApp driver coordination journey
---

# Definition · Story Map

## User Activities
1. **Schedule deliveries** — Dispatchers import same-day orders from ERP and assign to available riders.
2. **Coordinate routes** — WhatsApp bot suggests optimized sequences and shares with drivers.
3. **Monitor progress** — Dispatchers track live locations, respond to stalls, and update customers.
4. **Confirm completion** — Riders capture proof-of-delivery photos and mark orders complete via quick replies.
5. **Settle payouts** — Finance reconciles driver payouts through PIX and tracks bonuses.

## Backbone Stories
| Persona | Story | Notes |
| --- | --- | --- |
| Dispatcher | As a dispatcher, I send a WhatsApp broadcast with each rider's assignments at shift start. | Utilizes template `shift_assignments_pt-BR`. |
| Driver | As a rider, I tap "Iniciar Rota" quick reply to share live GPS with dispatch. | Must handle offline caching. |
| Customer | As a customer, I receive WhatsApp updates when the rider is 5 minutes away. | Provide opt-out command. |
| Dispatcher | As a dispatcher, I get alerted if a rider stops moving for 7 minutes. | Powered by delay detection models. |
| Driver | As a rider, I report delivery issues with photo attachments inside WhatsApp. | Integrate with Zendesk ticket creation. |

## Opportunities Identified
- Introduce automated escalation to shift lead when a rider deviates 1km from planned route.
- Add Portuguese voice memo transcription for drivers who prefer audio updates.
- Provide aggregated performance summary to drivers weekly to reinforce incentives.

## Links
- Test coverage expectations outlined in [`test_strategy.md`](test_strategy.md).
- Roadmap increments derived from this map are tracked in [`roadmap.md`](../delivery/roadmap.md).
