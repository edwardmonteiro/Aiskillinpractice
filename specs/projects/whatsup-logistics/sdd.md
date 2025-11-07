---
template: ai-first-sdd
paired-skill: delivery.ai_delivery_sdd
summary: WhatsUp Logistics WhatsApp driver tracking experience for Brazilian motorcycle couriers.
feature: WhatsApp-native driver tracking and dispatcher coordination
objectives: Increase on-time delivery to 95%, reduce manual dispatcher workload by 60%, improve customer trust scores by 20%
---

# 1. Problem & Context
- **Feature / capability**: WhatsApp-native driver tracking with live location sharing, proactive delay detection, and dispatcher dashboard integrations.
- **Business outcomes**: Improve SLA adherence, decrease inbound support volume, and boost driver satisfaction across São Paulo, Rio de Janeiro, and Belo Horizonte.
- **Definition inputs**: [`samples/whatsup-logistics/definition/story_map.md`](../../samples/whatsup-logistics/definition/story_map.md), [`samples/whatsup-logistics/definition/metric_catalog.md`](../../samples/whatsup-logistics/definition/metric_catalog.md), [`samples/whatsup-logistics/definition/tech_spike.md`](../../samples/whatsup-logistics/definition/tech_spike.md).
- **Current state**: Dispatchers manually ping drivers via ad-hoc WhatsApp messages and track progress in spreadsheets; no automated location ingestion or delay alerts exist.

# 2. Goals & Guardrails
- ✅ Achieve 95% on-time deliveries and <2 manual check-ins per driver per hour by Q2.
- ✅ Provide bilingual WhatsApp notifications (Portuguese primary, English optional) with opt-out support.
- ✅ Maintain LGPD compliance with 180-day retention limit and explicit driver consent flows.
- 🚫 No requirement to build native mobile apps or replace existing ERP order import pipeline in this phase.
- 🚫 Avoid introducing additional messaging channels (SMS, email) beyond fallback scenarios.
- 📏 Constraints: WhatsApp API throughput (25 msg/sec), budget for AWS + Meta services, driver devices with limited storage, regulatory oversight (LGPD, ANATEL).

# 3. Solution Narrative
- **Architecture overview**: WhatsApp messages flow from Meta Cloud API into an ingestion service running on AWS Fargate. Messages trigger state machine updates (AWS Step Functions) that update dispatcher UI (Next.js) and analytics warehouse (Snowflake). GPS events stream through AWS Kinesis and are enriched with Google Maps traffic data before storing in DynamoDB for real-time queries.
- **Data and AI responsibilities**: Delay detection model consumes historical GPS traces to estimate likelihood of stall; predictions stored in Feature Store and surfaced as proactive alerts. Conversational AI module drafts localized WhatsApp responses using Claude with guardrail prompts stored in `skills/`.
- **Operational considerations**: Datadog monitors message latency and stall detection accuracy. PagerDuty alerts escalate to on-call engineer. Audit logs persisted for compliance and referenced in [`samples/whatsup-logistics/skill-run-log.json`](../../samples/whatsup-logistics/skill-run-log.json).

# 4. Implementation Plan
| Sprint | Scope | Owner(s) | Skill Assist |
| ------ | ----- | -------- | ------------- |
| Sprint 1 | Build WhatsApp webhook ingestion, basic dispatcher UI map, GPS data normalization | Thiago Carvalho, Larissa Mendes | `delivery.tech_spec`, `delivery.agent_collaboration` |
| Sprint 2 | Implement delay detection model, live location streaming, driver opt-in/out workflows | Ana Souza, Devin agent | `definition.tech_spike`, `delivery.test_plan` |
| Sprint 3 | Launch PIX payouts integration, proactive customer messaging, observability dashboards | Bruno Oliveira, Windsurf agent | `delivery.dashboard_brief`, `optimization.metric_review` |
| Sprint 4 | Pilot rollout in São Paulo & Rio, finalize governance and training | Ops Enablement Team | `delivery.release_notes`, `optimization.retrospective` |

# 5. Skills Bridge
| Skill | When to run | Required variables | Expected artifact |
| ----- | ----------- | ------------------ | ----------------- |
| delivery.agent_collaboration | Before parallelizing work across agents | initiative="WhatsUp WhatsApp tracker", local_agent="Windsurf", cloud_agent="Devin", repo_path="Aiskillinpractice" | Charter stored at `samples/whatsup-logistics/delivery/agent_collaboration.md` |
| delivery.mcp_session | After confirming delivery collaborators | initiative="WhatsUp WhatsApp tracker", catalog_server, executor_server, agents | `samples/whatsup-logistics/delivery/mcp_session.md` |
| delivery.tech_spec | Kickoff architecture | feature, objectives, constraints | `samples/whatsup-logistics/delivery/tech_spec.md` |
| delivery.dashboard_brief | Prior to dashboard build | dashboard_name, stakeholders, metrics | `samples/whatsup-logistics/delivery/dashboard_brief.md` |
| delivery.test_plan | Before QA freeze | feature, risk_profile, environments | `samples/whatsup-logistics/delivery/test_plan.md` |
| delivery.release_notes | Prior to pilot launch | version, highlights, rollout_plan | `samples/whatsup-logistics/delivery/release_notes.md` |
| governance.skill_release | After skill changes | skill_name, summary, impact | `samples/whatsup-logistics/governance/skill_release.md` |

# 6. Open Questions & Risks
- Confirm Meta Cloud API quota increases before onboarding Belo Horizonte—pending response from vendor.
- Validate ability to capture proof-of-delivery photos inside WhatsApp for compliance archiving.
- Need legal review for storing driver consent decisions per LGPD requirements.

# 7. Decision Log
| Date | Decision | Owner | Link |
| ---- | -------- | ----- | ---- |
| 2025-03-24 | Adopt AWS Kinesis for GPS event streaming to decouple ingestion from analytics | Thiago Carvalho | [`tech_spike.md`](../../samples/whatsup-logistics/definition/tech_spike.md) |
| 2025-03-24 | Maintain Twilio fallback for WhatsApp messaging outages | Ana Souza | [`risk_assessment.md`](../../samples/whatsup-logistics/discovery/risk_assessment.md) |
| 2025-03-24 | Limit data retention to 180 days to align with LGPD | Bruno Oliveira | [`data_audit.md`](../../samples/whatsup-logistics/discovery/data_audit.md) |

# 8. Rollout, Validation & Agent Collaboration
- **Launch plan**: Stage rollout—pilot São Paulo for 2 weeks, expand to Rio after validation, then Belo Horizonte. Feature flag `whatsapp_tracker_enabled` controls exposure.
- **Telemetry**: Collect message latency, driver opt-in rates, stall detection precision; feed into Datadog dashboards defined in [`dashboard_brief.md`](../../samples/whatsup-logistics/delivery/dashboard_brief.md).
- **Success review**: Weekly meeting across Ops, Product, Engineering to review metrics vs. OKRs; monthly retrospective captured in [`optimization/retrospective.md`](../../samples/whatsup-logistics/optimization/retrospective.md).
- **Agent handshake**: Windsurf handles repo commits, Devin manages load testing and vendor integrations. Handoffs logged in `skill-run-log.json` per [`agent_collaboration.md`](../../samples/whatsup-logistics/delivery/agent_collaboration.md).
- **MCP alignment**: Catalog + executor servers recorded in [`mcp_session.md`](../../samples/whatsup-logistics/delivery/mcp_session.md); configuration snapshots stored under `mcp/servers/*` for reproducibility.

# Appendices
- **API references**: Meta WhatsApp Business Cloud API, Twilio WhatsApp, Google Maps Directions & Roads APIs.
- **Prompt snippets**: Stored in `skills/delivery/*` for reuse.
- **Related specs / issues**: GitHub issues `#42` (delay detection), `#57` (PIX payouts), `#63` (dispatcher UI accessibility).
