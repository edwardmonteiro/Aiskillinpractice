---
skill: discovery.market_scan
product: WhatsUp Logistics
focus: Brazilian last-mile courier tech landscape
---

# Discovery · Market Scan

## Purpose
Understand the competitive environment for WhatsApp-based dispatching and identify differentiators for motorcycle courier coordination in Brazil.

## Invocation Summary
- **Command**
  ```bash
  codex run --skill discovery.market_scan \
    --vars "product=WhatsUp Logistics" \
           "region=Brazil" \
           "competitors=Loggi,99Entrega,Rappi" \
           "channels=WhatsApp,SMS,In-app" \
           "research_window=2024"
  ```
- **Agent**: Devin cloud automation agent executed asynchronous research.
- **Timestamp**: 2025-03-24T14:30:00Z

## Highlights
- Only Loggi offers a native WhatsApp tracking bot; others rely on proprietary apps requiring driver smartphones with stable data plans.
- Meta announced expanded Cloud API availability in Brazil with reduced per-message pricing—opportunity to scale broadcasts.
- 99Entrega’s biggest weakness is manual SLA management; they lack automated stall detection for drivers stuck in traffic.
- Logistics startups increasingly integrate with PIX for cashless COD settlements; inform payment squad.

## Recommended Strategic Bets
1. Double down on WhatsApp-first automation with location pin sharing and quick replies for drivers to update status.
2. Launch proactive delay detection and escalation inside dispatcher dashboard.
3. Partner with PIX providers to reconcile driver payouts within 24 hours.

## Linked Artifacts
- Key differentiators pulled into [`value_proposition.md`](../definition/value_proposition.md).
- Market risks funnelled into [`risk_assessment.md`](risk_assessment.md).
