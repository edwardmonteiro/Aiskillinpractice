---
skill: data.data_scientist
product: WhatsUp Logistics
focus: Predicting rider stalls and late deliveries in Brazilian metros
---

# Data · Data Science Exploration

## Objective & Metric
- Objective: Reduce late deliveries by proactively rerouting or reassigning drivers.
- Target metric: P90 delivery lateness minutes; secondary metric: rider idle time.
- Constraints: Preference for interpretable features for dispatcher trust.

## Data Landscape
- Datasets: `fct_delivery_status`, `driver_locations_stream`, `weather_alerts`, `traffic_events`, `support_incidents`.
- Risks: GPS jitter in dense cities; incomplete weather data for rural routes; potential leakage from post-event statuses.

## Candidate Approaches
- Baselines: rolling averages by driver/route, rule-based stall detection.
- Models: gradient boosted trees with categorical encodings; lightweight LSTM for sequence of status events.
- Features: time-of-day, neighborhood traffic index (Google), rain severity, driver tenure, device battery level, recent cancellation count.

## Evaluation Plan
- Cross-validation by city-week to avoid leakage.
- Metrics: AUC-PR for stall detection, calibration curves, confusion matrix by geography.
- Offline tests against historical events; shadow mode in São Paulo before broader rollout.

## Deployment & Monitoring Notes
- Handoff to ML Engineering: package baseline model with feature list and drift checks.
- Monitoring: Datadog dashboards for stall alerts, false positive rate, and coverage of traffic/weather signals.
