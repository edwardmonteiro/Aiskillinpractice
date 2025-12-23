"use client";

import { useState, useMemo } from "react";
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
import { skillsData, phaseInfo, type Skill } from "@/lib/skills-data";
import {
  Search,
  FileText,
  Rocket,
  TrendingUp,
  Play,
  Terminal,
  Copy,
  Check,
  Download,
  Sparkles,
  Zap,
  RefreshCw,
  Settings,
  ChevronDown,
} from "lucide-react";

const phaseIcons = {
  discovery: Search,
  definition: FileText,
  delivery: Rocket,
  optimization: TrendingUp,
};

export default function PlaygroundPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSkillSelector, setShowSkillSelector] = useState(true);

  const filteredSkills = useMemo(() => {
    if (!searchQuery) return skillsData;
    const query = searchQuery.toLowerCase();
    return skillsData.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setVariables({});
    setGeneratedOutput(null);
    setShowSkillSelector(false);
  };

  const handleGenerate = async () => {
    if (!selectedSkill) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/skills/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: selectedSkill.slug, variables }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedOutput(data.output);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setVariables({});
    setGeneratedOutput(null);
  };

  const generateCLICommand = () => {
    if (!selectedSkill) return "";
    const varsString = Object.entries(variables)
      .filter(([, value]) => value)
      .map(([key, value]) => `--var "${key}=${value}"`)
      .join(" ");
    return `codex skills run ${selectedSkill.name} ${varsString}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Skill Playground
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Test and experiment with AI skills in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Skill Selection & Configuration */}
          <div className="space-y-6">
            {/* Skill Selector */}
            <Card>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setShowSkillSelector(!showSkillSelector)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <CardTitle>
                      {selectedSkill
                        ? `Selected: ${selectedSkill.name}`
                        : "Select a Skill"}
                    </CardTitle>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      showSkillSelector ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {selectedSkill && !showSkillSelector && (
                  <CardDescription>{selectedSkill.description}</CardDescription>
                )}
              </CardHeader>

              {showSkillSelector && (
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="max-h-80 space-y-2 overflow-y-auto">
                    {(
                      Object.keys(phaseInfo) as Array<keyof typeof phaseInfo>
                    ).map((phase) => {
                      const phaseSkills = filteredSkills.filter(
                        (s) => s.phase === phase
                      );
                      if (phaseSkills.length === 0) return null;

                      const info = phaseInfo[phase];
                      const Icon = phaseIcons[phase];

                      return (
                        <div key={phase} className="space-y-1">
                          <div
                            className={`flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase ${info.text}`}
                          >
                            <Icon className="h-3 w-3" />
                            {info.title}
                          </div>
                          {phaseSkills.map((skill) => (
                            <button
                              key={skill.slug}
                              onClick={() => handleSelectSkill(skill)}
                              className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                                selectedSkill?.slug === skill.slug
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {skill.name.split(".")[1].replace(/_/g, " ")}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-1">
                                {skill.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Variables Configuration */}
            {selectedSkill && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                      <CardTitle>Configure Variables</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedSkill.variables.required.map((variable) => (
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
                        rows={2}
                      />
                    </div>
                  ))}

                  {selectedSkill.variables.optional.map((variable) => (
                    <div key={variable.name}>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {variable.name.replace(/_/g, " ")}
                        <span className="ml-1 text-gray-400">(optional)</span>
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

                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full"
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
                </CardContent>
              </Card>
            )}

            {/* CLI Command */}
            {selectedSkill && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-gray-400" />
                    <CardTitle className="text-base">CLI Command</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-gray-900 p-4">
                    <code className="block overflow-x-auto text-sm text-green-400">
                      {generateCLICommand()}
                    </code>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Output */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <CardTitle>Output</CardTitle>
                  </div>
                  {generatedOutput && (
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
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedSkill ? (
                  <div className="flex h-96 items-center justify-center text-center">
                    <div>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <Sparkles className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Select a skill to get started
                      </p>
                    </div>
                  </div>
                ) : !generatedOutput ? (
                  <div className="flex h-96 items-center justify-center text-center">
                    <div>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <Play className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Fill in the variables and click Generate
                      </p>
                      <div className="mt-4">
                        <Badge variant={selectedSkill.phase}>
                          {selectedSkill.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <pre className="max-h-[600px] overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900">
                      {generatedOutput}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
