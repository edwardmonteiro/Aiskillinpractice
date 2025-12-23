// Static skills data for client-side rendering
// This mirrors the actual skills from the repository

export interface SkillVariable {
  name: string;
  description: string;
}

export interface Skill {
  name: string;
  phase: "discovery" | "definition" | "delivery" | "optimization";
  roles: string[];
  description: string;
  variables: {
    required: SkillVariable[];
    optional: SkillVariable[];
  };
  outputs: string[];
  slug: string;
}

export const skillsData: Skill[] = [
  // Discovery Phase
  {
    name: "discovery.user_research",
    phase: "discovery",
    roles: ["Product Designer", "Product Manager"],
    description: "Generate comprehensive user research briefs and discussion guides",
    variables: {
      required: [
        { name: "persona", description: "Target user persona or segment" },
        { name: "research_method", description: "Research methodology (interviews, surveys, etc.)" },
        { name: "key_questions", description: "Primary research questions to answer" },
      ],
      optional: [
        { name: "timeline", description: "Research timeline and deadlines" },
        { name: "budget", description: "Available research budget" },
      ],
    },
    outputs: ["Research Brief", "Discussion Guide", "Observation Log Template"],
    slug: "discovery-user_research",
  },
  {
    name: "discovery.problem_framing",
    phase: "discovery",
    roles: ["Product Manager"],
    description: "Frame problems clearly with root cause analysis and opportunity sizing",
    variables: {
      required: [
        { name: "problem_statement", description: "Initial problem description" },
        { name: "affected_users", description: "Users impacted by the problem" },
        { name: "current_impact", description: "Current business/user impact" },
      ],
      optional: [
        { name: "constraints", description: "Known constraints or limitations" },
      ],
    },
    outputs: ["Problem Statement", "Root Cause Analysis", "Opportunity Assessment"],
    slug: "discovery-problem_framing",
  },
  {
    name: "discovery.market_scan",
    phase: "discovery",
    roles: ["Product Manager", "Product Marketing"],
    description: "Analyze market landscape, competitors, and trends",
    variables: {
      required: [
        { name: "market_segment", description: "Target market segment" },
        { name: "competitors", description: "Known competitors to analyze" },
      ],
      optional: [
        { name: "geography", description: "Geographic focus" },
        { name: "time_horizon", description: "Trend analysis timeframe" },
      ],
    },
    outputs: ["Market Overview", "Competitive Analysis", "Trend Report"],
    slug: "discovery-market_scan",
  },
  {
    name: "discovery.tech_landscape",
    phase: "discovery",
    roles: ["Engineering Lead", "Solution Architect"],
    description: "Evaluate technology options and architectural approaches",
    variables: {
      required: [
        { name: "problem_domain", description: "Technical problem domain" },
        { name: "requirements", description: "Key technical requirements" },
      ],
      optional: [
        { name: "current_stack", description: "Existing technology stack" },
        { name: "constraints", description: "Technical constraints" },
      ],
    },
    outputs: ["Technology Options", "Architecture Patterns", "Recommendation"],
    slug: "discovery-tech_landscape",
  },
  {
    name: "discovery.risk_assessment",
    phase: "discovery",
    roles: ["QA Lead", "Reliability Engineer"],
    description: "Identify and assess project risks with mitigation strategies",
    variables: {
      required: [
        { name: "project_scope", description: "Project scope and objectives" },
        { name: "stakeholders", description: "Key stakeholders and dependencies" },
      ],
      optional: [
        { name: "timeline", description: "Project timeline" },
        { name: "budget", description: "Budget constraints" },
      ],
    },
    outputs: ["Risk Register", "Risk Matrix", "Mitigation Plan"],
    slug: "discovery-risk_assessment",
  },
  {
    name: "discovery.data_audit",
    phase: "discovery",
    roles: ["Data Analyst", "Analytics Engineer"],
    description: "Audit existing data sources and identify gaps",
    variables: {
      required: [
        { name: "data_domain", description: "Data domain to audit" },
        { name: "use_cases", description: "Intended data use cases" },
      ],
      optional: [
        { name: "systems", description: "Systems to include in audit" },
      ],
    },
    outputs: ["Data Inventory", "Quality Assessment", "Gap Analysis"],
    slug: "discovery-data_audit",
  },

  // Definition Phase
  {
    name: "definition.value_proposition",
    phase: "definition",
    roles: ["Product Manager", "Product Marketing"],
    description: "Craft compelling value propositions with benefit pillars",
    variables: {
      required: [
        { name: "product", description: "Product or feature name" },
        { name: "target_customer", description: "Target customer segment" },
        { name: "core_outcome", description: "Primary outcome or benefit" },
      ],
      optional: [
        { name: "differentiators", description: "Key differentiators" },
      ],
    },
    outputs: ["Value Statement", "Benefit Pillars", "Objection Handling Guide"],
    slug: "definition-value_proposition",
  },
  {
    name: "definition.story_map",
    phase: "definition",
    roles: ["Product Designer", "Product Manager"],
    description: "Create user story maps for feature planning",
    variables: {
      required: [
        { name: "epic", description: "Epic or feature area" },
        { name: "user_journey", description: "User journey stages" },
      ],
      optional: [
        { name: "personas", description: "User personas involved" },
      ],
    },
    outputs: ["Story Map", "User Stories", "Acceptance Criteria"],
    slug: "definition-story_map",
  },
  {
    name: "definition.okr_drafting",
    phase: "definition",
    roles: ["Product Manager", "Product Director"],
    description: "Draft OKRs aligned with company strategy",
    variables: {
      required: [
        { name: "objective", description: "High-level objective" },
        { name: "timeframe", description: "OKR timeframe (quarter, year)" },
        { name: "team", description: "Team or department" },
      ],
      optional: [
        { name: "dependencies", description: "Cross-team dependencies" },
      ],
    },
    outputs: ["Objectives", "Key Results", "Initiatives"],
    slug: "definition-okr_drafting",
  },
  {
    name: "definition.tech_spike",
    phase: "definition",
    roles: ["Engineering Lead", "Staff Engineer"],
    description: "Plan technical spikes for uncertainty reduction",
    variables: {
      required: [
        { name: "hypothesis", description: "Technical hypothesis to validate" },
        { name: "success_criteria", description: "Spike success criteria" },
      ],
      optional: [
        { name: "timebox", description: "Timebox for the spike" },
      ],
    },
    outputs: ["Spike Plan", "Experiment Design", "Decision Framework"],
    slug: "definition-tech_spike",
  },
  {
    name: "definition.test_strategy",
    phase: "definition",
    roles: ["QA Lead", "Test Engineer"],
    description: "Define comprehensive testing strategy",
    variables: {
      required: [
        { name: "feature", description: "Feature or system under test" },
        { name: "quality_goals", description: "Quality goals and metrics" },
      ],
      optional: [
        { name: "constraints", description: "Testing constraints" },
      ],
    },
    outputs: ["Test Strategy Document", "Test Pyramid", "Tool Recommendations"],
    slug: "definition-test_strategy",
  },
  {
    name: "definition.metric_catalog",
    phase: "definition",
    roles: ["Data Analyst", "Product Manager"],
    description: "Define metrics catalog with calculations and ownership",
    variables: {
      required: [
        { name: "domain", description: "Business domain" },
        { name: "goals", description: "Business goals to measure" },
      ],
      optional: [
        { name: "existing_metrics", description: "Existing metrics to include" },
      ],
    },
    outputs: ["Metric Definitions", "Calculation Methods", "Ownership Matrix"],
    slug: "definition-metric_catalog",
  },

  // Delivery Phase
  {
    name: "delivery.tech_spec",
    phase: "delivery",
    roles: ["Engineering Lead", "Feature Team Engineer"],
    description: "Create detailed technical specifications",
    variables: {
      required: [
        { name: "feature", description: "Feature to specify" },
        { name: "objectives", description: "Technical objectives" },
        { name: "constraints", description: "Technical constraints" },
      ],
      optional: [
        { name: "integrations", description: "Required integrations" },
      ],
    },
    outputs: ["Architecture Overview", "Implementation Plan", "Validation Strategy"],
    slug: "delivery-tech_spec",
  },
  {
    name: "delivery.test_plan",
    phase: "delivery",
    roles: ["QA Lead", "Test Engineer"],
    description: "Create detailed test plans for features",
    variables: {
      required: [
        { name: "feature", description: "Feature to test" },
        { name: "scope", description: "Test scope and boundaries" },
      ],
      optional: [
        { name: "environments", description: "Test environments" },
      ],
    },
    outputs: ["Test Plan", "Test Cases", "Environment Setup"],
    slug: "delivery-test_plan",
  },
  {
    name: "delivery.release_notes",
    phase: "delivery",
    roles: ["Product Manager", "Product Marketing"],
    description: "Write user-friendly release notes",
    variables: {
      required: [
        { name: "version", description: "Release version" },
        { name: "features", description: "Features in release" },
        { name: "audience", description: "Target audience" },
      ],
      optional: [
        { name: "breaking_changes", description: "Breaking changes if any" },
      ],
    },
    outputs: ["Release Notes", "Feature Highlights", "Migration Guide"],
    slug: "delivery-release_notes",
  },
  {
    name: "delivery.design_review",
    phase: "delivery",
    roles: ["Product Designer", "Design Lead"],
    description: "Conduct structured design reviews",
    variables: {
      required: [
        { name: "design", description: "Design to review" },
        { name: "criteria", description: "Review criteria" },
      ],
      optional: [
        { name: "reviewers", description: "Reviewer roles" },
      ],
    },
    outputs: ["Review Checklist", "Feedback Summary", "Action Items"],
    slug: "delivery-design_review",
  },
  {
    name: "delivery.roadmap",
    phase: "delivery",
    roles: ["Product Manager", "Program Manager"],
    description: "Build and communicate product roadmaps",
    variables: {
      required: [
        { name: "timeframe", description: "Roadmap timeframe" },
        { name: "themes", description: "Strategic themes" },
      ],
      optional: [
        { name: "dependencies", description: "Key dependencies" },
      ],
    },
    outputs: ["Roadmap View", "Milestone Definitions", "Dependency Map"],
    slug: "delivery-roadmap",
  },
  {
    name: "delivery.dashboard_brief",
    phase: "delivery",
    roles: ["Data Analyst", "Product Designer"],
    description: "Design dashboard specifications",
    variables: {
      required: [
        { name: "purpose", description: "Dashboard purpose" },
        { name: "audience", description: "Dashboard audience" },
        { name: "metrics", description: "Key metrics to display" },
      ],
      optional: [
        { name: "refresh_rate", description: "Data refresh requirements" },
      ],
    },
    outputs: ["Dashboard Wireframe", "Metric Specifications", "Filter Logic"],
    slug: "delivery-dashboard_brief",
  },

  // Optimization Phase
  {
    name: "optimization.experiment_brief",
    phase: "optimization",
    roles: ["Product Designer", "Product Manager"],
    description: "Design A/B tests and experiments",
    variables: {
      required: [
        { name: "hypothesis", description: "Experiment hypothesis" },
        { name: "metric", description: "Primary metric to measure" },
      ],
      optional: [
        { name: "variants", description: "Variant descriptions" },
        { name: "duration", description: "Expected duration" },
      ],
    },
    outputs: ["Experiment Brief", "Variant Specs", "Success Criteria"],
    slug: "optimization-experiment_brief",
  },
  {
    name: "optimization.metric_review",
    phase: "optimization",
    roles: ["Product Manager", "Analytics Lead"],
    description: "Conduct metric review sessions",
    variables: {
      required: [
        { name: "goal_metric", description: "Primary metric to review" },
        { name: "period", description: "Review period" },
      ],
      optional: [
        { name: "comparison", description: "Comparison period or cohort" },
      ],
    },
    outputs: ["Metric Analysis", "Trend Insights", "Action Recommendations"],
    slug: "optimization-metric_review",
  },
  {
    name: "optimization.retrospective",
    phase: "optimization",
    roles: ["Product Manager", "Engineering Lead", "Scrum Master"],
    description: "Facilitate effective retrospectives",
    variables: {
      required: [
        { name: "sprint", description: "Sprint or period to reflect on" },
        { name: "team", description: "Team involved" },
      ],
      optional: [
        { name: "focus_area", description: "Specific focus area" },
      ],
    },
    outputs: ["What Went Well", "Improvements", "Action Items"],
    slug: "optimization-retrospective",
  },
  {
    name: "optimization.postmortem",
    phase: "optimization",
    roles: ["Engineering Lead", "SRE", "QA Lead"],
    description: "Conduct blameless incident postmortems",
    variables: {
      required: [
        { name: "incident_summary", description: "Incident summary" },
        { name: "impact_scope", description: "Impact scope and duration" },
      ],
      optional: [
        { name: "timeline", description: "Incident timeline" },
      ],
    },
    outputs: ["Incident Timeline", "Root Cause Analysis", "Corrective Actions"],
    slug: "optimization-postmortem",
  },
  {
    name: "optimization.quality_report",
    phase: "optimization",
    roles: ["QA Lead", "Product Manager"],
    description: "Generate quality status reports",
    variables: {
      required: [
        { name: "period", description: "Reporting period" },
        { name: "scope", description: "Report scope" },
      ],
      optional: [
        { name: "comparison", description: "Comparison period" },
      ],
    },
    outputs: ["Quality Metrics", "Trend Analysis", "Recommendations"],
    slug: "optimization-quality_report",
  },
  {
    name: "optimization.experiment_analysis",
    phase: "optimization",
    roles: ["Data Analyst", "Product Manager"],
    description: "Analyze experiment results and make recommendations",
    variables: {
      required: [
        { name: "experiment", description: "Experiment to analyze" },
        { name: "data", description: "Experiment data" },
      ],
      optional: [
        { name: "segments", description: "Segment analysis required" },
      ],
    },
    outputs: ["Results Summary", "Statistical Analysis", "Decision Recommendation"],
    slug: "optimization-experiment_analysis",
  },
];

export function getAllSkillsData(): Skill[] {
  return skillsData;
}

export function getSkillBySlugData(slug: string): Skill | undefined {
  return skillsData.find((s) => s.slug === slug);
}

export function getSkillsByPhaseData() {
  return {
    discovery: skillsData.filter((s) => s.phase === "discovery"),
    definition: skillsData.filter((s) => s.phase === "definition"),
    delivery: skillsData.filter((s) => s.phase === "delivery"),
    optimization: skillsData.filter((s) => s.phase === "optimization"),
  };
}

export function getAllRolesData(): string[] {
  const rolesSet = new Set<string>();
  skillsData.forEach((skill) => {
    skill.roles.forEach((role) => rolesSet.add(role));
  });
  return Array.from(rolesSet).sort();
}

export const phaseInfo = {
  discovery: {
    title: "Discovery",
    description: "Understanding users, market, and problem space",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/50",
    text: "text-blue-600",
    textDark: "dark:text-blue-400",
  },
  definition: {
    title: "Definition",
    description: "Shaping strategy, defining scope, aligning stakeholders",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-950/50",
    text: "text-purple-600",
    textDark: "dark:text-purple-400",
  },
  delivery: {
    title: "Delivery",
    description: "Building, validating, and releasing product increments",
    color: "green",
    gradient: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-950/50",
    text: "text-green-600",
    textDark: "dark:text-green-400",
  },
  optimization: {
    title: "Optimization",
    description: "Monitoring outcomes, refining features, capturing learnings",
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    bgDark: "dark:bg-orange-950/50",
    text: "text-orange-600",
    textDark: "dark:text-orange-400",
  },
};
