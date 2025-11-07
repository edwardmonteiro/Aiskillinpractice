---
name: delivery.agent_collaboration
phase: delivery
roles:
  - Feature Team Engineer
  - AI Pair Programmer
  - DevOps Engineer
description: Align local IDE-based agents and cloud automation agents on shared skills, repositories, and delivery checkpoints.
variables:
  required:
    - name: initiative
      description: Project, epic, or stream of work where agents must coordinate.
    - name: local_agent
      description: Local IDE or desktop agent being used (for example, Windsurf).
    - name: cloud_agent
      description: Cloud-hosted agent or automation platform (for example, Devin).
    - name: repo_path
      description: Repository path or monorepo segment that both agents will touch.
  optional:
    - name: guardrails
      description: Compliance, access, or tooling constraints that agents must respect.
    - name: shared_skills
      description: Claude skill IDs that both agents should reference.
outputs:
  - Agent handshake summary with responsibilities, hand-off cadence, and escalation path.
  - Checklist for aligning Claude skills, SDD links, and environment configuration.
  - Update recommendations for `specs/projects/<initiative>/sdd.md` and supporting transcripts.
---

# Purpose
Create a crisp, auditable plan that keeps local IDE agents ("local operators") and cloud automation agents ("cloud operators") aligned on the same Claude skills, repositories, and validation gates.

# Pre-run Checklist
- ✅ Confirm `scripts/list-skills` is installed locally so IDE agents can enumerate the same skills as Codex.
- ✅ Ensure the cloud agent has read/write access to the specified `repo_path` (via GitHub App or CI credentials).
- ✅ Open the relevant SDD (`specs/projects/{{initiative}}/sdd.md`) so updates can be appended during the session.

# Invocation Guidance
```bash
codex skills run delivery.agent_collaboration \
  --vars "initiative={{initiative}}" \
         "local_agent={{local_agent}}" \
         "cloud_agent={{cloud_agent}}" \
         "repo_path={{repo_path}}" \
         "guardrails={{guardrails}}" \
         "shared_skills={{shared_skills}}"
```

# Toolchain & Integrations
- **Python CLI – `scripts/list-skills`**: Ensure both agent types enumerate the same Claude catalog before handshakes.
- **Python CLI – `scripts/validate-skills`**: Schedule validation runs during the session to guarantee catalog integrity after automation changes.
- **MCP servers – `mcp/servers/skills_catalog` & `mcp/servers/skill_executor`**: Bridge local IDEs and cloud agents through shared MCP discovery and execution endpoints.
- **Sample artifact – `samples/whatsup-logistics/delivery/agent_collaboration.md`**: Follow the WhatsUp Logistics handshake format when documenting responsibilities.

# Implementation Notes
- **Shared skill context**: Use `shared_skills` to list IDs like `delivery.ai_delivery_sdd` or `delivery.tech_spec` so both agents pull consistent guidance when drafting code or docs.
- **Branch choreography**: Capture how local commits (e.g., Windsurf branches) and cloud automation (e.g., Devin tasks) merge back into `main`. Reference `specs/templates/ai-first-sdd-template.md#5-skills-bridge` for tracing.
- **Artifact routing**: Point web documentation updates to `webapp/` (for live guide changes) and technical narratives to `specs/`.

# Follow-up Checklist
- [ ] Append the agent handshake output under the "Agent Collaboration" section of the initiative SDD.
- [ ] Store prompt transcripts in `specs/projects/{{initiative}}/ai/` so both agent types can replay context.
- [ ] Open a retrospective issue if hand-offs cause delays or quality regressions.
