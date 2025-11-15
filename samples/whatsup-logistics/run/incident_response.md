# Incident WU-245 — Live Response Plan

## 1. Situation Overview
- **Start Time**: 2025-03-30 14:12 BRT
- **Impact Summary**: 18% of courier WhatsApp sessions stuck on "Atualizando posição" spinner, merchants cannot confirm drop-offs.
- **Affected Regions / Users**: Fortaleza + Recife couriers, 1,200 active orders.
- **Suspected Systems**: Redis location cache, WhatsApp webhook processing queue.

## 2. Roles & Channels
| Role | Owner | Contact | Primary Channel |
| --- | --- | --- | --- |
| Incident Commander | Joana | @joana / +55 11 xxx | WhatsApp war room |
| Comms Lead | Felipe | @felipe | WhatsApp + customer success bridge |
| Ops Lead | Devin cloud agent | #runroom + MCP executor |
| Scribe | Windsurf local agent | Shared Google Doc |

## 3. Investigation Timeline
| Time | Action | Owner | Notes |
| --- | --- | --- | --- |
| 14:12 | Triggered incident, paged on-call | PagerDuty | | 
| 14:15 | Validated WhatsApp Graph API latency nominal | Devin | API metrics green |
| 14:18 | Discovered Redis shard cpu 95% | Windsurf | failover candidate |
| 14:21 | Flushed stuck location jobs, restarted worker pods | Joana | queue cleared |
| 14:29 | Confirmed freshness SLI recovered | Datadog | <5s restored |

## 4. Customer Communications
- **Internal**: "14:22 — WU-245 affecting Fortaleza/Recife. Redis workers saturated; clearing queue + scaling pods. Next update 14:35."
- **External WhatsApp**: "Oi! Estamos enfrentando lentidão na atualização de rotas em Fortaleza/Recife. Nossa equipe já está normalizando o serviço e enviaremos nova atualização em 15 minutos."

## 5. Mitigation & Verification Checklist
- [x] Scale worker deployment to 6 replicas.
- [x] Purge delayed jobs older than 2 minutes.
- [ ] Add Redis throttling dashboard panel.
- [ ] Schedule cache tuning review.

## 6. Post-incident Follow-up
- **Postmortem Owner**: Ana (due 2025-04-02)
- **Backlog Items**:
  - Automate Redis autoscaling via KEDA.
  - Add WhatsApp bot to broadcast when freshness SLI breaches for >5 minutes.
  - Codify lessons learned into `run.service_runbook`.
