import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  content: string;
  path: string;
  slug: string;
}

export interface SkillsByPhase {
  discovery: Skill[];
  definition: Skill[];
  delivery: Skill[];
  optimization: Skill[];
}

const SKILLS_DIR = path.join(process.cwd(), "..", "skills");

export function getAllSkills(): Skill[] {
  const skills: Skill[] = [];
  const phases = ["discovery", "definition", "delivery", "optimization"];

  for (const phase of phases) {
    const phaseDir = path.join(SKILLS_DIR, phase);
    if (!fs.existsSync(phaseDir)) continue;

    const skillDirs = fs.readdirSync(phaseDir);
    for (const skillDir of skillDirs) {
      const skillPath = path.join(phaseDir, skillDir, "SKILL.md");
      if (fs.existsSync(skillPath)) {
        const fileContent = fs.readFileSync(skillPath, "utf-8");
        const { data, content } = matter(fileContent);

        skills.push({
          name: data.name || `${phase}.${skillDir}`,
          phase: phase as Skill["phase"],
          roles: data.roles || [],
          description: data.description || "",
          variables: {
            required: data.variables?.required || [],
            optional: data.variables?.optional || [],
          },
          outputs: data.outputs || [],
          content: content,
          path: skillPath,
          slug: `${phase}-${skillDir}`,
        });
      }
    }
  }

  return skills;
}

export function getSkillsByPhase(): SkillsByPhase {
  const skills = getAllSkills();
  return {
    discovery: skills.filter((s) => s.phase === "discovery"),
    definition: skills.filter((s) => s.phase === "definition"),
    delivery: skills.filter((s) => s.phase === "delivery"),
    optimization: skills.filter((s) => s.phase === "optimization"),
  };
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return getAllSkills().find((s) => s.slug === slug);
}

export function getAllRoles(): string[] {
  const skills = getAllSkills();
  const rolesSet = new Set<string>();
  skills.forEach((skill) => {
    skill.roles.forEach((role) => rolesSet.add(role));
  });
  return Array.from(rolesSet).sort();
}

export function getSkillsByRole(role: string): Skill[] {
  return getAllSkills().filter((skill) => skill.roles.includes(role));
}

export const phaseInfo = {
  discovery: {
    title: "Discovery",
    description: "Understanding users, market, and problem space",
    color: "blue",
    icon: "Search",
  },
  definition: {
    title: "Definition",
    description: "Shaping strategy, defining scope, aligning stakeholders",
    color: "purple",
    icon: "FileText",
  },
  delivery: {
    title: "Delivery",
    description: "Building, validating, and releasing product increments",
    color: "green",
    icon: "Rocket",
  },
  optimization: {
    title: "Optimization",
    description: "Monitoring outcomes, refining features, capturing learnings",
    color: "orange",
    icon: "TrendingUp",
  },
};
