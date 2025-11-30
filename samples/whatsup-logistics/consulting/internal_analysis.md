# Internal Analysis — Operations & Driver Network

## SWOT
| Strengths | Weaknesses | Opportunities | Threats |
| --- | --- | --- | --- |
| WhatsApp-native CX with high response rates | Evening SLA breaches in SP; limited realtime routing | Expand electric moto pilots to reduce cost/ESG risk | Competitors overpaying drivers in peak windows |
| Strong merchant NPS outside SP | Driver activation funnel drop-off at training | Monetize premium SLA tier for B2B merchants | Regulatory changes on moto telematics |
| Lightweight ops stack; fast script automation | Inconsistent KPI definitions across cities | Increase automation of dispatch and support | Data debt slowing new city launches |

## Value Chain Highlights
- Inbound/Operations: Driver sign-up through WhatsApp templates is fast but training completion is low; vetting relies on manual checks.
- Delivery/Service: Routing based on simple proximity; reassignments spike during rain and evening peaks; payout logic varies by city.
- Support/Retention: Driver support handled via chat macros; limited proactive retention offers.
- Enablers (Data, Infra, People): Data models differ by city; limited observability on dispatch latency.

## KPI Trees
- KPI: SLA reliability (on-time deliveries)
  - Drivers: Active drivers per zone; assignment latency; reassignments per order
  - Root-Cause Hypotheses: Driver scarcity during peaks; routing inefficiency; weather sensitivity
  - Data Needed & Owners: Routing logs (Eng), payout tables (Finance), churn/activation (Ops)

## Quick Wins & Deep Dives
- Quick Wins: Standardize payout curves for SP peaks; add weather-aware surge; refresh driver training template.
- Deep-Dive Workstreams: Routing optimization spike with engineering; KPI harmonization across cities; proactive retention experiments.
