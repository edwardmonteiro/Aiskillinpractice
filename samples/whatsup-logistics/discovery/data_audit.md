---
skill: discovery.data_audit
product: WhatsUp Logistics
focus: WhatsApp driver tracking data integrity
---

# Discovery · Data Audit

## Purpose
Validate that existing GPS pings, WhatsApp chat exports, and order assignments contain the signal required to build reliable driver tracking and customer notifications across Brazil.

## Invocation Summary
- **Command**
  ```bash
  codex run --skill discovery.data_audit \
    --vars "product=WhatsUp Logistics" \
           "regions=São Paulo,Rio de Janeiro,Belo Horizonte" \
           "systems=WhatsApp Business API,PostgreSQL order db,GPS broker" \
           "data_owner=Operations Analytics" \
           "compliance_requirements=LGPD,ANATEL messaging rules"
  ```
- **Agent**: Windsurf local agent executed analysis in IDE.
- **Timestamp**: 2025-03-24T14:05:00Z

## Key Findings
- GPS broker provides 15-second frequency pings with 97% completeness; missing entries concentrated during heavy rain.
- WhatsApp Business API message IDs map cleanly to order IDs after normalizing hyphenated format used in Rio.
- Found inconsistent driver nicknames in chat exports; resolved by referencing HR employee IDs maintained in Airtable.
- LGPD review confirmed data retention needs truncation after 180 days—flagged for roadmap.

## Follow-Up Actions
1. Create automatic null-check alerts in Datadog for GPS ingestion gaps exceeding 5 minutes.
2. Enforce driver identifier normalization inside ingestion pipeline prior to storing transcripts.
3. Implement retention policy aligned with LGPD within warehouse.

## Linked Artifacts
- Data quality checklist stored in `data-quality/whatsup-gps-checklist.csv`.
- Risk ledger updated in [`risk_assessment.md`](risk_assessment.md) referencing compliance findings.
