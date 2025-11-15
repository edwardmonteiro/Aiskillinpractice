# WhatsUp Logistics — Production Runbook

## 1. Service Snapshot
- **Customer Promises**: Couriers and merchants always see live rider locations and status updates via WhatsApp threads with <5s lag.
- **Runtime Context**: Python FastAPI control plane in São Paulo + Recife, PostgreSQL + Redis, WhatsApp Business Cloud + Meta Webhooks, Datadog monitoring.
- **Primary Dependencies**: WhatsApp Webhook ingestion, courier location microservice, notification fan-out workers, MCP-powered skill executor.

## 2. Reliability Guardrails
- **SLIs & SLOs**
  - Location freshness < 5 seconds for 99% of WhatsApp sessions.
  - Delivery assignment latency < 2 seconds.
  - Message send success rate 99.95%.
- **Alert Routing**
  - Datadog monitors -> PagerDuty “WhatsUp Logistics” rotation -> WhatsApp war room.
  - MCP health check -> Devin cloud agent DM.
- **On-call Rotation**
  - Weekdays: Joana (IC), Felipe (comms)
  - Weekends: Marcos (IC), Ana (comms)

## 3. Standard Operating Procedures
- **Deployments**: GitHub Actions -> Blue/green deploy; verify `/healthz` via MCP executor before swapping traffic.
- **Config Changes**: Update feature flags in LaunchDarkly, log change ID in WhatsApp control room.
- **Access Management**: Temporary AWS console access granted through IAM role `whatsup-operator` for 2 hours.

## 4. Incident Playbooks
| Scenario | Detection Signal | First Actions | Escalation Path | Customer Messaging |
| --- | --- | --- | --- | --- |
| WhatsApp API latency | Datadog `whatsapp.api.latency` SLO breach | Check Meta status page, capture traceroute, reduce push frequency via feature flag | Escalate to Meta partner manager if >30m | "Estamos enfrentando lentidão..." template | 
| Location drift | Courier complaints or freshness monitor | Confirm GPS ingestion queue, replay latest MCP job, validate Redis TTLs | Escalate to data platform team | "Localização temporariamente fora do ar" template |
| MCP executor offline | MCP heartbeat failure | Restart uv process, tail logs via `mcp/servers/skill_executor/server.py --debug`, reroute tasks to Windsurf agent | Escalate to platform SRE | "Nossos agentes automáticos estão em manutenção" template |

## 5. Communication Templates
- **Internal update**: "[HH:MM] Incident {{id}} — impact, actions, next check, blockers." Share in WhatsApp war room + Slack `#runroom`.
- **External update**: Portuguese + English template referencing courier trust and ETA clarity.

## 6. Automation & Improvement Backlog
- Add automatic WhatsApp broadcast when MCP executor fails.
- Build Datadog dashboard panel for LaunchDarkly flag overrides.
- Automate post-deploy validation script via MCP executor.
