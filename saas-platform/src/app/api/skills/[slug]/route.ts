import { NextResponse } from "next/server";
import { getSkillBySlugData } from "@/lib/skills-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const skill = getSkillBySlugData(slug);

  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json(skill);
}
