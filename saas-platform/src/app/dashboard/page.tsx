"use client";

import { useMemo } from "react";
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
import { skillsData, phaseInfo, getAllRolesData } from "@/lib/skills-data";
import {
  Search,
  FileText,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  Activity,
  BarChart3,
  ArrowUpRight,
  Clock,
  Target,
  Layers,
  Play,
} from "lucide-react";

const phaseIcons = {
  discovery: Search,
  definition: FileText,
  delivery: Rocket,
  optimization: TrendingUp,
};

// Mock data for analytics
const mockAnalytics = {
  totalRuns: 1247,
  activeUsers: 23,
  avgRunTime: "4.2s",
  successRate: 98.5,
  weeklyTrend: [65, 78, 82, 91, 85, 94, 102],
  topSkills: [
    { name: "discovery.user_research", runs: 187, trend: 12 },
    { name: "delivery.tech_spec", runs: 156, trend: 8 },
    { name: "definition.value_proposition", runs: 142, trend: 15 },
    { name: "optimization.metric_review", runs: 128, trend: -3 },
    { name: "delivery.release_notes", runs: 115, trend: 5 },
  ],
  recentActivity: [
    { skill: "discovery.user_research", user: "Sarah C.", time: "2 min ago" },
    { skill: "delivery.tech_spec", user: "Mike R.", time: "8 min ago" },
    { skill: "definition.okr_drafting", user: "Lisa M.", time: "15 min ago" },
    { skill: "optimization.postmortem", user: "James K.", time: "23 min ago" },
    { skill: "delivery.test_plan", user: "Anna P.", time: "31 min ago" },
  ],
  roleUsage: [
    { role: "Product Manager", percentage: 35, runs: 436 },
    { role: "Engineering Lead", percentage: 28, runs: 349 },
    { role: "Product Designer", percentage: 18, runs: 224 },
    { role: "QA Lead", percentage: 12, runs: 150 },
    { role: "Data Analyst", percentage: 7, runs: 88 },
  ],
};

export default function DashboardPage() {
  const roles = useMemo(() => getAllRolesData(), []);
  const skillsByPhase = useMemo(() => {
    return {
      discovery: skillsData.filter((s) => s.phase === "discovery").length,
      definition: skillsData.filter((s) => s.phase === "definition").length,
      delivery: skillsData.filter((s) => s.phase === "delivery").length,
      optimization: skillsData.filter((s) => s.phase === "optimization").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track skill usage and team adoption
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/skills">
                <Button variant="outline">
                  <Layers className="mr-2 h-4 w-4" />
                  Browse Skills
                </Button>
              </Link>
              <Link href="/playground">
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Playground
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Runs
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAnalytics.totalRuns.toLocaleString()}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAnalytics.activeUsers}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +3 new this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Avg Run Time
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAnalytics.avgRunTime}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                0.3s faster
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAnalytics.successRate}%
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +0.5% improvement
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Top Skills */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                Top Skills
              </CardTitle>
              <CardDescription>
                Most frequently used skills this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topSkills.map((skill, i) => {
                  const skillData = skillsData.find((s) => s.name === skill.name);
                  const phase = skillData?.phase || "discovery";
                  const info = phaseInfo[phase];

                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {skill.name.split(".")[1].replace(/_/g, " ")}
                          </span>
                          <Badge variant={phase as "discovery" | "definition" | "delivery" | "optimization"} className="text-xs">
                            {info.title}
                          </Badge>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${info.gradient}`}
                            style={{
                              width: `${(skill.runs / mockAnalytics.topSkills[0].runs) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {skill.runs}
                        </div>
                        <div
                          className={`text-xs ${
                            skill.trend >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {skill.trend >= 0 ? "+" : ""}
                          {skill.trend}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.user}</span>{" "}
                        ran{" "}
                        <span className="font-medium">
                          {activity.skill.split(".")[1].replace(/_/g, " ")}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills by Phase & Role Usage */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Skills by Phase */}
          <Card>
            <CardHeader>
              <CardTitle>Skills by Phase</CardTitle>
              <CardDescription>
                Distribution across product lifecycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(Object.keys(phaseInfo) as Array<keyof typeof phaseInfo>).map(
                  (phase) => {
                    const info = phaseInfo[phase];
                    const Icon = phaseIcons[phase];
                    const count = skillsByPhase[phase];

                    return (
                      <div key={phase} className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${info.bgLight} ${info.bgDark} ${info.text} ${info.textDark}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {info.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              {count} skills
                            </span>
                          </div>
                          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${info.gradient}`}
                              style={{
                                width: `${(count / skillsData.length) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Usage by Role</CardTitle>
              <CardDescription>
                Skill usage distribution across team roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.roleUsage.map((role) => (
                  <div key={role.role} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {role.role}
                        </span>
                        <span className="text-sm text-gray-500">
                          {role.runs} runs ({role.percentage}%)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${role.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Run User Research",
                    skill: "discovery.user_research",
                    icon: Search,
                    color: "blue",
                  },
                  {
                    title: "Create Tech Spec",
                    skill: "delivery.tech_spec",
                    icon: FileText,
                    color: "green",
                  },
                  {
                    title: "Draft OKRs",
                    skill: "definition.okr_drafting",
                    icon: Target,
                    color: "purple",
                  },
                  {
                    title: "Analyze Metrics",
                    skill: "optimization.metric_review",
                    icon: BarChart3,
                    color: "orange",
                  },
                ].map((action) => {
                  const skill = skillsData.find((s) => s.name === action.skill);
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.skill}
                      href={skill ? `/skills/${skill.slug}` : "/skills"}
                    >
                      <Card className="cursor-pointer transition-all hover:border-gray-300 hover:shadow-md dark:hover:border-gray-600">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${action.color}-100 text-${action.color}-600 dark:bg-${action.color}-900/30 dark:text-${action.color}-400`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {action.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {action.skill}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
