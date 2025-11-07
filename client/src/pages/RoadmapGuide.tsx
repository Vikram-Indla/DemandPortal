import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Layers, FileText, ListChecks, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface HierarchyLevel {
  id: string;
  name: string;
  icon: typeof Zap;
  color: string;
  bgColor: string;
  borderColor: string;
  width: string;
  description: string;
  executiveCommentary: string;
  characteristics: string[];
  examples: string[];
  typicalDuration: string;
  typicalCount: string;
}

const hierarchyLevels: HierarchyLevel[] = [
  {
    id: "initiative",
    name: "Initiative",
    icon: Zap,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
    borderColor: "border-purple-500/50",
    width: "w-64",
    description: "Strategic business objectives",
    executiveCommentary: "Initiatives represent major strategic investments aligned with company vision. These are the 'big bets' that drive competitive advantage and market position. Board-level visibility and CEO ownership expected.",
    characteristics: [
      "Aligned with strategic themes",
      "Cross-functional impact",
      "Measurable business outcomes",
      "Executive sponsorship required"
    ],
    examples: ["Digital Transformation", "Market Expansion", "Platform Modernization"],
    typicalDuration: "6-18 months",
    typicalCount: "3-8 per portfolio"
  },
  {
    id: "feature",
    name: "Feature",
    icon: Target,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    borderColor: "border-blue-500/50",
    width: "w-80",
    description: "Customer-facing capabilities",
    executiveCommentary: "Features deliver tangible customer value and competitive differentiation. These are the capabilities your customers will experience and judge you by. Product leadership drives prioritization based on market feedback and strategic fit.",
    characteristics: [
      "End-user facing functionality",
      "Delivers measurable value",
      "Can be released independently",
      "Product Manager owned"
    ],
    examples: ["SSO Authentication", "Real-time Analytics", "Mobile App"],
    typicalDuration: "2-6 months",
    typicalCount: "5-15 per initiative"
  },
  {
    id: "epic",
    name: "Epic",
    icon: Layers,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
    borderColor: "border-indigo-500/50",
    width: "w-96",
    description: "Large bodies of work decomposed from features",
    executiveCommentary: "Epics break down complex features into manageable delivery increments. This is where engineering leadership translates business requirements into technical delivery. Progress here indicates actual implementation velocity and risk.",
    characteristics: [
      "Spans multiple sprints",
      "Technical decomposition",
      "Team-level planning",
      "Dependencies managed"
    ],
    examples: ["User Authentication Flow", "Data Pipeline Setup", "API Integration"],
    typicalDuration: "2-8 weeks",
    typicalCount: "3-8 per feature"
  },
  {
    id: "story",
    name: "Story",
    icon: FileText,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 dark:bg-green-500/20",
    borderColor: "border-green-500/50",
    width: "w-[28rem]",
    description: "Deliverable increments of work",
    executiveCommentary: "Stories are the daily currency of your delivery teams. Completed stories mean working software. Blocked or delayed stories signal impediments requiring leadership intervention. Velocity at this level predicts release timelines.",
    characteristics: [
      "Fits within a sprint",
      "Testable and demonstrable",
      "Clear acceptance criteria",
      "Developer assigned"
    ],
    examples: ["Login UI Component", "Password Reset Email", "Session Timeout"],
    typicalDuration: "1-5 days",
    typicalCount: "5-12 per epic"
  },
  {
    id: "subtask",
    name: "Subtask",
    icon: ListChecks,
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-500/10 dark:bg-slate-500/20",
    borderColor: "border-slate-500/50",
    width: "w-[32rem]",
    description: "Technical implementation steps",
    executiveCommentary: "Subtasks represent the granular work engineers track internally. While not typically visible at executive level, systemic blockers at this tier cascade up and impact delivery commitments. Trust your teams to manage this layer autonomously.",
    characteristics: [
      "Technical implementation detail",
      "Hours to complete",
      "Team-internal tracking",
      "Engineering owned"
    ],
    examples: ["Write unit tests", "Update API documentation", "Code review"],
    typicalDuration: "2-8 hours",
    typicalCount: "2-6 per story"
  }
];

export default function RoadmapGuide() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Roadmap Guide</h1>
        </div>
        <p className="text-muted-foreground">
          Understanding work item hierarchy for effective portfolio governance and change management
        </p>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Hierarchy Model</CardTitle>
          <CardDescription>
            Work items flow from strategic initiatives down to tactical execution. Each level serves a specific purpose in translating business vision into delivered value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pyramid Visualization */}
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="text-sm text-muted-foreground mb-4">
              Strategic (Top) → Tactical (Bottom)
            </div>
            
            {hierarchyLevels.map((level, index) => {
              const Icon = level.icon;
              const isHovered = hoveredLevel === level.id;
              
              return (
                <div
                  key={level.id}
                  className="flex flex-col items-center gap-2"
                  onMouseEnter={() => setHoveredLevel(level.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                >
                  {/* Pyramid Level */}
                  <div
                    className={cn(
                      "relative transition-all duration-300",
                      level.width,
                      isHovered ? "scale-105" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "border-2 rounded-md p-4 cursor-pointer transition-all hover-elevate",
                        level.bgColor,
                        level.borderColor,
                        isHovered ? "shadow-lg" : ""
                      )}
                      data-testid={`pyramid-level-${level.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-5 h-5", level.color)} />
                          <span className="font-semibold text-base">{level.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {level.typicalCount}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {level.description}
                      </p>
                      
                      {/* Duration badge */}
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          ⏱️ {level.typicalDuration}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < hierarchyLevels.length - 1 && (
                    <div className="w-px h-6 bg-border" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Executive Commentary Panel */}
          {hoveredLevel && (
            <Card className={cn(
              "border-2 transition-all",
              hierarchyLevels.find(l => l.id === hoveredLevel)?.borderColor
            )}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {(() => {
                    const level = hierarchyLevels.find(l => l.id === hoveredLevel);
                    if (!level) return null;
                    const Icon = level.icon;
                    return (
                      <>
                        <Icon className={cn("w-5 h-5", level.color)} />
                        <CardTitle className="text-lg">{level.name} - Executive Perspective</CardTitle>
                      </>
                    );
                  })()}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const level = hierarchyLevels.find(l => l.id === hoveredLevel);
                  if (!level) return null;
                  
                  return (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm leading-relaxed">
                          {level.executiveCommentary}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Key Characteristics</h4>
                          <ul className="space-y-1">
                            {level.characteristics.map((char, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Examples</h4>
                          <div className="flex flex-wrap gap-2">
                            {level.examples.map((example, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Default message when nothing hovered */}
          {!hoveredLevel && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Hover over any hierarchy level to view executive commentary and details
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Insights Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Management Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Strategic Alignment
              </h4>
              <p className="text-sm text-muted-foreground">
                Top-level initiatives must ladder up to strategic themes and company objectives. Any initiative without clear business justification should be challenged.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Value Delivery
              </h4>
              <p className="text-sm text-muted-foreground">
                Features represent the unit of customer value. Focus roadmap conversations at this level to balance stakeholder needs with delivery capacity.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Execution Planning
              </h4>
              <p className="text-sm text-muted-foreground">
                Epics bridge the gap between product vision and engineering execution. Well-decomposed epics indicate mature planning and reduce delivery risk.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Delivery Cadence
              </h4>
              <p className="text-sm text-muted-foreground">
                Story completion velocity is the heartbeat of delivery. Consistent velocity enables predictable commitments. Declining velocity signals systemic issues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
