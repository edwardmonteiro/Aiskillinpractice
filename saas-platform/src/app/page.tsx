import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Search,
  FileText,
  Rocket,
  TrendingUp,
  Users,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Play,
  Code2,
  Layers,
} from "lucide-react";

const phases = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Understanding users, market, and problem space",
    icon: Search,
    color: "blue",
    skills: ["User Research", "Problem Framing", "Market Scan", "Tech Landscape", "Risk Assessment", "Data Audit"],
  },
  {
    id: "definition",
    title: "Definition",
    description: "Shaping strategy, defining scope, aligning stakeholders",
    icon: FileText,
    color: "purple",
    skills: ["Value Proposition", "Story Map", "OKR Drafting", "Tech Spike", "Test Strategy", "Metric Catalog"],
  },
  {
    id: "delivery",
    title: "Delivery",
    description: "Building, validating, and releasing product increments",
    icon: Rocket,
    color: "green",
    skills: ["Tech Spec", "Test Plan", "Release Notes", "Design Review", "Roadmap", "Dashboard Brief"],
  },
  {
    id: "optimization",
    title: "Optimization",
    description: "Monitoring outcomes, refining features, capturing learnings",
    icon: TrendingUp,
    color: "orange",
    skills: ["Experiment Brief", "Metric Review", "Retrospective", "Postmortem", "Quality Report", "Experiment Analysis"],
  },
];

const roles = [
  { name: "Product Manager", count: 12 },
  { name: "Product Designer", count: 8 },
  { name: "Engineering Lead", count: 8 },
  { name: "QA Lead", count: 6 },
  { name: "Data Analyst", count: 6 },
];

const features = [
  {
    icon: Zap,
    title: "AI-Powered Workflows",
    description: "Leverage Claude AI to generate high-quality outputs for every product task.",
  },
  {
    icon: Layers,
    title: "Lifecycle Organized",
    description: "24 skills organized across Discovery, Definition, Delivery, and Optimization phases.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Skills mapped to specific roles: PM, Designer, Engineer, QA, and Analytics.",
  },
  {
    icon: Code2,
    title: "CLI Integration",
    description: "Seamlessly integrate with Codex CLI for command-line productivity.",
  },
  {
    icon: Shield,
    title: "Consistent Quality",
    description: "Standardized templates ensure consistent, high-quality outputs every time.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Track skill usage and team adoption with built-in analytics dashboard.",
  },
];

const testimonials = [
  {
    quote: "AI SkillsPro transformed how our product team collaborates. The structured approach to AI-assisted work is game-changing.",
    author: "Sarah Chen",
    role: "VP of Product, TechCorp",
  },
  {
    quote: "Finally, a way to make AI prompts reusable and consistent across our entire organization.",
    author: "Marcus Johnson",
    role: "Engineering Director, StartupXYZ",
  },
  {
    quote: "The lifecycle-based organization makes it intuitive to find the right skill at the right time.",
    author: "Emily Rodriguez",
    role: "Product Designer, DesignStudio",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-pattern relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="mr-2 h-3 w-3" />
              Powered by Claude AI
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              AI Skills for{" "}
              <span className="gradient-text">Product Teams</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Empower your digital product team with 24 AI-powered skills organized by lifecycle phase.
              From discovery to optimization, streamline every aspect of product development.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/skills">
                <Button size="xl">
                  Explore Skills
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/playground">
                <Button variant="outline" size="xl">
                  <Play className="mr-2 h-5 w-5" />
                  Try Playground
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "24", label: "AI Skills" },
              { value: "4", label: "Lifecycle Phases" },
              { value: "5+", label: "Team Roles" },
              { value: "100%", label: "Customizable" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Phases Section */}
      <section className="border-t border-gray-100 bg-white py-24 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              The Complete Product Lifecycle
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Skills organized into four phases that cover every stage of product development.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const colorClasses = {
                blue: "from-blue-500 to-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-950/50",
                purple: "from-purple-500 to-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-950/50",
                green: "from-green-500 to-green-600 text-green-600 bg-green-50 dark:bg-green-950/50",
                orange: "from-orange-500 to-orange-600 text-orange-600 bg-orange-50 dark:bg-orange-950/50",
              }[phase.color];

              return (
                <Card key={phase.id} className="group relative overflow-hidden">
                  <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${colorClasses?.split(" ")[0]} ${colorClasses?.split(" ")[1]}`} />
                  <CardHeader>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses?.split(" ").slice(2).join(" ")}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400">Phase {index + 1}</span>
                    </div>
                    <CardTitle className="text-xl">{phase.title}</CardTitle>
                    <CardDescription>{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill) => (
                        <Badge key={skill} variant={phase.id as "discovery" | "definition" | "delivery" | "optimization"} className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-gray-100 bg-gray-50 py-24 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Get started in minutes with our intuitive workflow.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Choose Your Skill",
                description: "Browse 24 AI skills organized by lifecycle phase and role. Find the perfect skill for your current task.",
              },
              {
                step: "2",
                title: "Provide Context",
                description: "Fill in the required variables and attach relevant documents. The more context, the better the output.",
              },
              {
                step: "3",
                title: "Generate & Iterate",
                description: "Run the skill to generate high-quality outputs. Refine and iterate until you get the perfect result.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-gray-100 bg-white py-24 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              A complete platform for AI-assisted product development.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-0 bg-gray-50 dark:bg-gray-900">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role-Based Section */}
      <section className="border-t border-gray-100 bg-gray-50 py-24 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Skills for Every Role
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Each skill is mapped to specific roles in your product team, ensuring everyone has the tools they need.
              </p>
              <div className="mt-8 space-y-4">
                {roles.map((role) => (
                  <div key={role.name} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{role.name}</span>
                    </div>
                    <Badge variant="secondary">{role.count} skills</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid gap-4">
                {[
                  { title: "Generate a user research brief", role: "Product Designer" },
                  { title: "Draft OKRs for Q1 launch", role: "Product Manager" },
                  { title: "Create a tech spec for payment integration", role: "Engineering Lead" },
                  { title: "Build a test strategy for the new feature", role: "QA Lead" },
                ].map((example, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{example.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{example.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-gray-100 bg-white py-24 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Loved by Product Teams
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-0 bg-gray-50 dark:bg-gray-900">
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-400">"{testimonial.quote}"</p>
                  <div className="mt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Product Team?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Start using AI-powered skills today and see the difference in your product development workflow.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/skills">
              <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
