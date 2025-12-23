import { NextResponse } from "next/server";
import { skillsData, phaseInfo } from "@/lib/skills-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phase = searchParams.get("phase");
  const role = searchParams.get("role");
  const search = searchParams.get("search");

  let filteredSkills = [...skillsData];

  if (phase) {
    filteredSkills = filteredSkills.filter((skill) => skill.phase === phase);
  }

  if (role) {
    filteredSkills = filteredSkills.filter((skill) =>
      skill.roles.includes(role)
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredSkills = filteredSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower) ||
        skill.roles.some((r) => r.toLowerCase().includes(searchLower))
    );
  }

  return NextResponse.json({
    skills: filteredSkills,
    total: filteredSkills.length,
    phases: phaseInfo,
  });
}
