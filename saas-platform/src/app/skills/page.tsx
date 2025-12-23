"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  skillsData,
  phaseInfo,
  getAllRolesData,
  type Skill,
} from "@/lib/skills-data";
import {
  Search,
  FileText,
  Rocket,
  TrendingUp,
  Filter,
  X,
  ArrowRight,
  Users,
  Layers,
} from "lucide-react";

const phaseIcons = {
  discovery: Search,
  definition: FileText,
  delivery: Rocket,
  optimization: TrendingUp,
};

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const allRoles = useMemo(() => getAllRolesData(), []);

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesSearch =
        searchQuery === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.roles.some((role) =>
          role.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesPhase = !selectedPhase || skill.phase === selectedPhase;
      const matchesRole = !selectedRole || skill.roles.includes(selectedRole);

      return matchesSearch && matchesPhase && matchesRole;
    });
  }, [searchQuery, selectedPhase, selectedRole]);

  const groupedSkills = useMemo(() => {
    const grouped: Record<string, Skill[]> = {
      discovery: [],
      definition: [],
      delivery: [],
      optimization: [],
    };

    filteredSkills.forEach((skill) => {
      grouped[skill.phase].push(skill);
    });

    return grouped;
  }, [filteredSkills]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPhase(null);
    setSelectedRole(null);
  };

  const hasActiveFilters = searchQuery || selectedPhase || selectedRole;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Skills Library
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Browse {skillsData.length} AI-powered skills organized by
                lifecycle phase
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Layers className="h-3 w-3" />
                {filteredSkills.length} skills
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search skills by name, description, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Phase Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Filter className="h-4 w-4" />
                Phase:
              </span>
              {(Object.keys(phaseInfo) as Array<keyof typeof phaseInfo>).map(
                (phase) => {
                  const info = phaseInfo[phase];
                  const Icon = phaseIcons[phase];
                  const isSelected = selectedPhase === phase;
                  return (
                    <Button
                      key={phase}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        setSelectedPhase(isSelected ? null : phase)
                      }
                      className="gap-1"
                    >
                      <Icon className="h-3 w-3" />
                      {info.title}
                    </Button>
                  );
                }
              )}
            </div>

            {/* Role Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                Role:
              </span>
              <select
                value={selectedRole || ""}
                onChange={(e) => setSelectedRole(e.target.value || null)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="">All Roles</option>
                {allRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredSkills.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No skills found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
            <Button onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {(Object.keys(phaseInfo) as Array<keyof typeof phaseInfo>).map(
              (phase) => {
                const skills = groupedSkills[phase];
                if (skills.length === 0) return null;

                const info = phaseInfo[phase];
                const Icon = phaseIcons[phase];

                return (
                  <div key={phase}>
                    {/* Phase Header */}
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${info.bgLight} ${info.bgDark} ${info.text} ${info.textDark}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {info.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.description}
                        </p>
                      </div>
                      <Badge variant={phase} className="ml-auto">
                        {skills.length} skills
                      </Badge>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {skills.map((skill) => (
                        <Link key={skill.slug} href={`/skills/${skill.slug}`}>
                          <Card className="group h-full cursor-pointer transition-all hover:border-gray-300 hover:shadow-md dark:hover:border-gray-600">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <Badge variant={skill.phase} className="text-xs">
                                  {skill.phase}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                              </div>
                              <CardTitle className="mt-3 text-lg leading-tight">
                                {skill.name.split(".")[1].replace(/_/g, " ")}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                {skill.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-1">
                                {skill.roles.slice(0, 2).map((role) => (
                                  <Badge
                                    key={role}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {role}
                                  </Badge>
                                ))}
                                {skill.roles.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{skill.roles.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}
