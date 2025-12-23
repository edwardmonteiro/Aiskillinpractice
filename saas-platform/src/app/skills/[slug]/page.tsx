"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSkillBySlugData, phaseInfo, skillsData } from "@/lib/skills-data";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  FileText,
  Rocket,
  TrendingUp,
  Users,
  Sparkles,
  Play,
  Copy,
  Check,
  Download,
  Terminal,
  Zap,
  Clock,
  Target,
} from "lucide-react";

const phaseIcons = {
  discovery: Search,
  definition: FileText,
  delivery: Rocket,
  optimization: TrendingUp,
};

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const skill = getSkillBySlugData(slug);

  const [variables, setVariables] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const relatedSkills = useMemo(() => {
    if (!skill) return [];
    return skillsData
      .filter((s) => s.phase === skill.phase && s.slug !== skill.slug)
      .slice(0, 3);
  }, [skill]);

  if (!skill) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Skill Not Found</CardTitle>
            <CardDescription>
              The skill you&apos;re looking for doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/skills">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Skills
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const info = phaseInfo[skill.phase];
  const Icon = phaseIcons[skill.phase];
  const skillName = skill.name.split(".")[1].replace(/_/g, " ");

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const output = generateMockOutput(skill, variables);
    setGeneratedOutput(output);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateCLICommand = () => {
    const varsString = Object.entries(variables)
      .filter(([, value]) => value)
      .map(([key, value]) => `--var "${key}=${value}"`)
      .join(" ");
    return `codex skills run ${skill.name} ${varsString}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/skills"
            className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Skills
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${info.bgLight} ${info.bgDark} ${info.text} ${info.textDark}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <Badge variant={skill.phase} className="mb-1">
                    {info.title} Phase
                  </Badge>
                  <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                    {skillName}
                  </h1>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                {skill.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.roles.map((role) => (
                  <Badge key={role} variant="outline" className="gap-1">
                    <Users className="h-3 w-3" />
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Variables Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <CardTitle>Configure Skill</CardTitle>
                </div>
                <CardDescription>
                  Fill in the variables to customize the skill output
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Required Variables */}
                {skill.variables.required.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                      <Target className="h-4 w-4 text-red-500" />
                      Required Variables
                    </h3>
                    <div className="space-y-4">
                      {skill.variables.required.map((variable) => (
                        <div key={variable.name}>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {variable.name.replace(/_/g, " ")}
                            <span className="ml-1 text-red-500">*</span>
                          </label>
                          <Textarea
                            placeholder={variable.description}
                            value={variables[variable.name] || ""}
                            onChange={(e) =>
                              setVariables({
                                ...variables,
                                [variable.name]: e.target.value,
                              })
                            }
                            className="min-h-[80px]"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            {variable.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Variables */}
                {skill.variables.optional.length > 0 && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                      <Clock className="h-4 w-4 text-gray-400" />
                      Optional Variables
                    </h3>
                    <div className="space-y-4">
                      {skill.variables.optional.map((variable) => (
                        <div key={variable.name}>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {variable.name.replace(/_/g, " ")}
                          </label>
                          <Input
                            placeholder={variable.description}
                            value={variables[variable.name] || ""}
                            onChange={(e) =>
                              setVariables({
                                ...variables,
                                [variable.name]: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Generate Output
                      </>
                    )}
                  </Button>
                </div>

                {/* CLI Command */}
                <div className="rounded-lg bg-gray-900 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
                    <Terminal className="h-4 w-4" />
                    CLI Command
                  </div>
                  <code className="block overflow-x-auto text-sm text-green-400">
                    {generateCLICommand()}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Generated Output */}
            {generatedOutput && (
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <CardTitle>Generated Output</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        {copied ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900">
                      {generatedOutput}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Info & Related */}
          <div className="space-y-6">
            {/* Expected Outputs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expected Outputs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {skill.outputs.map((output, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {output}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skill Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skill Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-xs font-medium uppercase text-gray-500">
                    Full Name
                  </div>
                  <div className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
                    {skill.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase text-gray-500">
                    Phase
                  </div>
                  <div className="mt-1">
                    <Badge variant={skill.phase}>{info.title}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase text-gray-500">
                    Primary Roles
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {skill.roles.map((role) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Skills */}
            {relatedSkills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedSkills.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/skills/${related.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <div>
                        <div className="font-medium capitalize text-gray-900 dark:text-white">
                          {related.name.split(".")[1].replace(/_/g, " ")}
                        </div>
                        <div className="line-clamp-1 text-xs text-gray-500">
                          {related.description}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateMockOutput(
  skill: ReturnType<typeof getSkillBySlugData>,
  variables: Record<string, string>
): string {
  if (!skill) return "";

  const skillName = skill.name.split(".")[1].replace(/_/g, " ");
  const varsDisplay = Object.entries(variables)
    .filter(([, value]) => value)
    .map(([key, value]) => `  - ${key}: ${value}`)
    .join("\n");

  return `# ${skillName.charAt(0).toUpperCase() + skillName.slice(1)} Output

## Configuration
${varsDisplay || "  No variables provided"}

## Generated Content

${skill.outputs.map((output, i) => `### ${i + 1}. ${output}

This is a sample output for the "${output}" section. In a real implementation,
Claude AI would generate comprehensive, contextual content based on your inputs.

Key points:
- Point 1 related to ${output}
- Point 2 with actionable insights
- Point 3 with recommendations

`).join("\n")}

---
Generated by AI SkillsPro | Skill: ${skill.name}
`;
}
