import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Zap, Target, Layers, FileText, ListChecks, Info, Clock, TrendingUp, ArrowDown, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface HierarchyLevel {
  id: string;
  name: string;
  icon: typeof Zap;
  color: string;
  bgColor: string;
  borderColor: string;
  owner: string;
  executiveCommentary: string;
  characteristics: string[];
  examples: string[];
  typicalDuration: string;
  typicalCount: string;
  width: string;
  padding: string;
}

const hierarchyLevels: HierarchyLevel[] = [
  {
    id: "theme",
    name: "Strategic Theme",
    icon: TrendingUp,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
    borderColor: "border-pink-500/50",
    owner: "Deputyship",
    executiveCommentary: "Strategic Themes define multi-year company direction and competitive positioning. These are CEO-level priorities that shape the entire portfolio. Board oversight and annual strategy reviews required. All initiatives must ladder up to an active theme.",
    characteristics: [
      "Multi-year strategic direction",
      "Board-level alignment",
      "Market positioning focus",
      "CEO-owned priorities"
    ],
    examples: ["Digital Transformation", "Customer Experience Excellence", "Operational Excellence"],
    typicalDuration: "2-5 years",
    typicalCount: "2-4 per portfolio",
    width: "w-full max-w-2xl",
    padding: "px-8 py-5"
  },
  {
    id: "initiative",
    name: "Initiative",
    icon: Zap,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
    borderColor: "border-purple-500/50",
    owner: "Product Manager",
    executiveCommentary: "Initiatives represent major strategic investments aligned with company vision. These are the 'big bets' that drive competitive advantage and market position. Board-level visibility and CEO ownership expected.",
    characteristics: [
      "Aligned with strategic themes",
      "Cross-functional impact",
      "Measurable business outcomes",
      "Executive sponsorship required"
    ],
    examples: ["Security Enhancement", "Cloud Migration", "Platform Modernization"],
    typicalDuration: "6-18 months",
    typicalCount: "3-8 per portfolio",
    width: "w-[90%] max-w-xl",
    padding: "px-7 py-4"
  },
  {
    id: "feature",
    name: "Feature",
    icon: Target,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    borderColor: "border-blue-500/50",
    owner: "Product Owner",
    executiveCommentary: "Features deliver tangible customer value and competitive differentiation. These are the capabilities your customers will experience and judge you by. Product leadership drives prioritization based on market feedback and strategic fit.",
    characteristics: [
      "End-user facing functionality",
      "Delivers measurable value",
      "Can be released independently",
      "Product Owner owned"
    ],
    examples: ["SSO Authentication", "Real-time Analytics", "Mobile App"],
    typicalDuration: "2-6 months",
    typicalCount: "5-15 per initiative",
    width: "w-[80%] max-w-lg",
    padding: "px-6 py-4"
  },
  {
    id: "epic",
    name: "Epic",
    icon: Layers,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
    borderColor: "border-indigo-500/50",
    owner: "Product Owner/BA",
    executiveCommentary: "Epics break down complex features into manageable delivery increments. This is where engineering leadership translates business requirements into technical delivery. Progress here indicates actual implementation velocity and risk.",
    characteristics: [
      "Spans multiple sprints",
      "Technical decomposition",
      "Team-level planning",
      "Dependencies managed"
    ],
    examples: ["User Authentication Flow", "Data Pipeline Setup", "API Integration"],
    typicalDuration: "2-8 weeks",
    typicalCount: "3-8 per feature",
    width: "w-[70%] max-w-md",
    padding: "px-6 py-3"
  },
  {
    id: "story",
    name: "Story",
    icon: FileText,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 dark:bg-green-500/20",
    borderColor: "border-green-500/50",
    owner: "BA",
    executiveCommentary: "Stories are the daily currency of your delivery teams. Completed stories mean working software. Blocked or delayed stories signal impediments requiring leadership intervention. Velocity at this level predicts release timelines.",
    characteristics: [
      "Fits within a sprint",
      "Testable and demonstrable",
      "Clear acceptance criteria",
      "BA owned"
    ],
    examples: ["Login UI Component", "Password Reset Email", "Session Timeout"],
    typicalDuration: "1-5 days",
    typicalCount: "5-12 per epic",
    width: "w-[60%] max-w-sm",
    padding: "px-5 py-3"
  },
  {
    id: "subtask",
    name: "Subtask",
    icon: ListChecks,
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-500/10 dark:bg-slate-500/20",
    borderColor: "border-slate-500/50",
    owner: "Developer/Tester",
    executiveCommentary: "Subtasks represent the granular work engineers track internally. While not typically visible at executive level, systemic blockers at this tier cascade up and impact delivery commitments. Trust your teams to manage this layer autonomously.",
    characteristics: [
      "Technical implementation detail",
      "Hours to complete",
      "Team-internal tracking",
      "Developer/Tester owned"
    ],
    examples: ["Write unit tests", "Update API documentation", "Code review"],
    typicalDuration: "2-8 hours",
    typicalCount: "2-6 per story",
    width: "w-[50%] max-w-xs",
    padding: "px-4 py-2"
  }
];

const businessRequestInfo = {
  id: "business-request",
  name: "Business Request",
  icon: Briefcase,
  color: "text-orange-600 dark:text-orange-400",
  bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
  borderColor: "border-orange-500/50",
  owner: "Business Owner",
  executiveCommentary: "Business Requests represent stakeholder-driven work items that can exist at multiple hierarchy levels. These span from Feature-level strategic requests down to Subtask-level tactical changes. Business Owners maintain accountability throughout the delivery lifecycle.",
  characteristics: [
    "Stakeholder-driven initiatives",
    "Can span multiple hierarchy levels",
    "Business value focused",
    "Business Owner accountability"
  ],
  examples: ["Compliance Requirement", "Customer Enhancement Request", "Process Improvement"],
  scope: "Feature → Epic → Story → Subtask"
};

export default function RoadmapGuide() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Info className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold">Roadmap Guide</h1>
      </div>

      {/* Executive Snapshot Card */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Hierarchy Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Size-Based Hierarchy Visualization */}
          <div className="flex justify-center py-4">
            <div className="flex flex-col gap-0 items-center w-full">
              {hierarchyLevels.map((level, index) => {
                const Icon = level.icon;
                
                return (
                  <div key={level.id} className="flex flex-col items-center w-full">
                    {/* Hierarchy Level - Size decreases top to bottom */}
                    <div
                      className={cn(
                        "relative transition-all cursor-pointer hover-elevate",
                        level.width
                      )}
                      onClick={() => setHoveredLevel(level.id)}
                      data-testid={`pyramid-level-${level.id}`}
                    >
                      <div
                        className={cn(
                          "border-2 rounded-lg",
                          level.bgColor,
                          level.borderColor,
                          level.padding
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Icon className={cn("w-5 h-5 flex-shrink-0", level.color)} />
                            <div className="flex flex-col">
                              <span className="font-semibold text-base">{level.name}</span>
                              <span className="text-xs font-medium text-muted-foreground">Owner: {level.owner}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {level.typicalDuration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {level.typicalCount}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connector Arrow */}
                    {index < hierarchyLevels.length - 1 && (
                      <div className="flex flex-col items-center py-2">
                        <ArrowDown className="w-5 h-5 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Executive Commentary Modal */}
          <Dialog open={hoveredLevel !== null} onOpenChange={(open) => !open && setHoveredLevel(null)}>
            <DialogContent className="max-w-2xl">
              {hoveredLevel && (() => {
                const level = hierarchyLevels.find(l => l.id === hoveredLevel);
                if (!level) return null;
                const Icon = level.icon;
                
                return (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-6 h-6", level.color)} />
                        <DialogTitle className="text-xl">{level.name} - Executive Perspective</DialogTitle>
                      </div>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed text-foreground">
                          {level.executiveCommentary}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-base">Key Characteristics</h4>
                          <ul className="space-y-2">
                            {level.characteristics.map((char, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-base">Examples</h4>
                          <div className="flex flex-wrap gap-2">
                            {level.examples.map((example, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </DialogContent>
          </Dialog>
          
          {/* Instruction text */}
          <div className="text-center pb-4 text-muted-foreground text-sm">
            Click any hierarchy level to view executive commentary and details
          </div>
        </CardContent>
      </Card>

      {/* Business Request Section */}
      <Card 
        className={cn(
          "border-2",
          businessRequestInfo.borderColor,
          businessRequestInfo.bgColor
        )}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className={cn("w-5 h-5", businessRequestInfo.color)} />
            <CardTitle>Business Request (Cross-Level Work Item)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-base">{businessRequestInfo.name}</span>
                  <span className="text-xs font-medium text-muted-foreground">Owner: {businessRequestInfo.owner}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                Scope: {businessRequestInfo.scope}
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground">
              {businessRequestInfo.executiveCommentary}
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Characteristics</h4>
                <ul className="space-y-1">
                  {businessRequestInfo.characteristics.map((char, idx) => (
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
                  {businessRequestInfo.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
