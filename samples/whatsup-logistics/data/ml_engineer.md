---
skill: data.ml_engineer
product: WhatsUp Logistics
focus: Serving stall-detection scores to dispatcher workflows
---

# Data · ML Engineering Plan

## Model Overview
- Model: Stall detection gradient boosted trees v0.3
- Runtime target: Scala microservice with gRPC endpoint for dispatcher dashboard and alerting worker.
- Interfaces: `ScoreRequest` (driver_id, route_id, status_seq, traffic_index, rain_level); `ScoreResponse` (stall_score, top_features).
- Performance SLO: p95 < 80ms per request; 99% uptime.
- Rollout: shadow in São Paulo, then canary 10% in Rio, followed by nationwide.

## Architecture & Integration
- Packaging: bundle model with ONNX export + feature mapping; load in Scala via runtime bindings.
- Serving: deploy to Kubernetes with horizontal pod autoscaling; cache traffic/weather features for low latency.
- Data contracts: align payloads with `fct_delivery_status` schema; enforce versioned protobufs.
- Infra notes: GPU not required; ensure TLS for inter-service calls.

## Deployment & Safety
- Validation: replay last 14 days of events through the service; compare against notebook outputs.
- Observability: Datadog traces for latency, drift monitors on feature distributions, Prometheus metrics for error codes.
- Rollback: feature flag toggle in dispatcher dashboard; fallback to rules-based thresholds if drift exceeds limits.

## Ownership
- Operators: ML Platform + Reliability team
- Retraining cadence: monthly or when drift exceeds 5% on key features
- Incident response: page on-call SRE; follow `run.incident_response` for coordination
