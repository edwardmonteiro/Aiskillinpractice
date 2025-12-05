# Data Science Engineering Handoff (WhatsUp Logistics)
- **Model scope:** ETA prediction and delivery success probability
- **Training assets:** notebooks/eta-prototype.ipynb, datasets/events.messaging, datasets/core.orders
- **Runtime constraints:** P99 latency < 150ms, cost < $0.001/request, PT-BR privacy rules

## Promotion steps
- Convert notebook to modular pipeline with seeded random state
- Package feature store jobs for template acceptance rate, rider variance, opt-in frequency
- Add drift + fairness monitors; align alerts with runbook owners

## Deployment plan
- Canary REST endpoint with autoscaling; rollback via feature flag
- Batch backfill for historical deliveries; seed cache for cold starts
- Document API/feature contracts in SDD + MCP catalog
