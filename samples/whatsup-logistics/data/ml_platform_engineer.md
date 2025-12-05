# ML Platform Capability Brief (WhatsUp Logistics)
- **Scope:** Low-latency ETA serving + feature store + monitoring
- **Tenants:** ETA API, fraud signals, customer experience dashboards
- **Reliability targets:** 99.9% availability; P99 latency < 120ms; drift alerts within 15 minutes

## Architecture
- Managed feature store with governance policies for PII scrubbing
- Serverless GPU/CPU mix for model variants; autoscaling tuned to WhatsApp peak times
- Observability: unified tracing for template send → model call → webhook outcome

## Automation
- MCP-exposed commands for model promotion, feature schema checks, and shadow deployments
- Terraform modules for tenants; golden-path pipelines documented in repo

## Runbook alignment
- Alert routes to on-call channel + incident skill; runbook includes canary disable + rollback steps
