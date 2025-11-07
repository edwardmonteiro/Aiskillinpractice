---
skill: delivery.design_review
product: WhatsUp Logistics
focus: WhatsApp conversational flows
---

# Delivery · Design Review

## Scope
Evaluate conversational UI for dispatcher and driver WhatsApp interactions, including quick reply layouts, localization, and escalation paths.

## Artifacts Reviewed
- Figma prototype `WhatsUp WhatsApp V2` covering onboarding, live tracking, and incident escalation flows.
- WhatsApp template drafts: `shift_assignments_pt-BR`, `status_delay_pt-BR`, `proof_of_delivery_pt-BR`.
- Driver opt-in consent script referencing LGPD requirements.

## Findings
1. **Quick Reply Density** — Limit to four options per message to avoid Android truncation; prioritize `Iniciar rota`, `Entregue`, `Problema`, `Pausa`.
2. **Localization** — Use Brazilian Portuguese idioms (e.g., "motoboy") and provide accent marks; align with marketing copy.
3. **Accessibility** — Increase contrast for dispatcher dashboard alerts; ensure screen reader labels in React components.
4. **Escalation Flow** — Add fallback instructions when driver selects `Problema`, automatically open Zendesk ticket with metadata.
5. **Proof-of-Delivery** — Confirm WhatsApp photo uploads compress to < 16 MB; store metadata for compliance.

## Decisions
- Adopt consistent emoji usage (✅ delivered, ⚠️ delay) for quick status recognition.
- Provide inline tooltips linking to training videos for new drivers.

## Follow-Ups
- Design team to update prototypes and export assets for development handoff.
- Engineering to adjust quick reply payload schema accordingly.
- Legal to review final consent copy (tracked in [`skill_release.md`](../governance/skill_release.md)).
