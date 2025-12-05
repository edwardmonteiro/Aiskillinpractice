# WhatsUp Logistics CX Blueprint (Excerpt)
- **Product:** Moto delivery tracking via WhatsApp
- **Personas:** Sender, Rider, Support
- **Channels:** WhatsApp first; fallback to SMS and phone

## Moments of truth
- Shipment created → confirm SLA and pickup window
- Rider en route → proactive location + ETA updates with opt-in frequency
- Delays/issues → escalation path to human agent within 2 minutes

## Guardrails
- Tone: brief, calm, bilingual (PT-BR/EN) templates
- Privacy: suppress exact addresses in shared rider links; expire deep links after delivery
- Latency: updates < 5s for new events; retry on WhatsApp template rejection with SMS backup

## Backstage
- Ops console receives webhook + SLA flags
- Data/ML capture: template outcome, rider location variance, escalation count
