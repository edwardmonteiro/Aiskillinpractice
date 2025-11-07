---
skill: optimization.experiment_brief
product: WhatsUp Logistics
focus: Proactive vs reactive driver nudges
---

# Optimization · Experiment Brief

## Hypothesis
Proactively nudging drivers via WhatsApp when predicted delays exceed 5 minutes will reduce SLA breaches more effectively than waiting for dispatcher intervention.

## Experiment Design
- **Type**: A/B test across São Paulo pilot routes.
- **Population**: 600 drivers split evenly between proactive (treatment) and reactive (control) groups.
- **Duration**: 4 weeks (April 15 – May 12, 2025).
- **Primary Metric**: SLA breach rate per order.
- **Secondary Metrics**: Driver satisfaction, message engagement, dispatcher manual interventions.

## Implementation Steps
1. Enable delay detection webhooks to trigger WhatsApp nudge templates in treatment group.
2. Control group continues manual dispatcher outreach workflow.
3. Instrument experiment IDs in messaging and analytics pipelines.
4. Collect driver feedback post-shift via quick survey.

## Risks & Mitigations
- **Over-notification**: Limit nudges to once every 10 minutes per driver.
- **Driver confusion**: Provide training and align incentives before experiment.
- **Data leakage**: Ensure experiment groups remain separated in scheduling tool.

## Governance
- Ethics review confirms nudges comply with labor agreements.
- Experiment registered in analytics catalog entry `EXP-2025-07`.
- Analysis scheduled via [`optimization/experiment_analysis.md`](experiment_analysis.md).
