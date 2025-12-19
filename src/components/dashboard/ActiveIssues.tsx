import { useState } from "react";
import { AlertTriangle, Bug, Droplets, ChevronRight, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePlant } from "@/contexts/PlantContext";

interface Issue {
  id: string;
  type: "disease" | "warning" | "critical";
  title: string;
  plantId: string;
  plantName: string;
  description: string;
  severity: "low" | "medium" | "high";
  detectedAt: string;
  suggestedAction: string;
}

const sampleIssues: Issue[] = [
  {
    id: "issue-1",
    type: "disease",
    title: "Early Blight Detected",
    plantId: "plant-1",
    plantName: "Tomato Garden",
    description: "Brown spots with concentric rings detected on lower leaves. This is a common fungal disease that spreads in humid conditions.",
    severity: "medium",
    detectedAt: "2 hours ago",
    suggestedAction: "Remove affected leaves and apply fungicide. Ensure proper air circulation around plants.",
  },
  {
    id: "issue-2",
    type: "warning",
    title: "Low Soil Moisture",
    plantId: "plant-2",
    plantName: "Rose Bed",
    description: "Soil moisture has dropped below optimal levels. Extended low moisture can cause wilting and stress.",
    severity: "medium",
    detectedAt: "4 hours ago",
    suggestedAction: "Water the plants thoroughly. Consider mulching to retain moisture.",
  },
  {
    id: "issue-3",
    type: "critical",
    title: "Severe Dehydration",
    plantId: "plant-4",
    plantName: "Wheat Field",
    description: "Critical moisture levels detected. Plants are showing signs of severe water stress.",
    severity: "high",
    detectedAt: "6 hours ago",
    suggestedAction: "Immediate watering required. Check irrigation system for blockages.",
  },
];

const issueConfig = {
  disease: {
    icon: Bug,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  critical: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
};

const severityConfig = {
  low: { label: "Low", color: "text-muted-foreground", bg: "bg-muted" },
  medium: { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  high: { label: "High", color: "text-destructive", bg: "bg-destructive/10" },
};

interface ActiveIssuesProps {
  className?: string;
}

export function ActiveIssues({ className }: ActiveIssuesProps) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const { setActivePlant, plants } = usePlant();

  const handleGoToPlant = () => {
    if (selectedIssue) {
      const plant = plants.find(p => p.id === selectedIssue.plantId);
      if (plant) {
        setActivePlant(plant);
      }
      setSelectedIssue(null);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={cn(
          "bg-card rounded-2xl p-4 lg:p-6 shadow-soft border border-border/50",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Active Issues
          </h3>
          <span className="text-xs text-muted-foreground">{sampleIssues.length} issues</span>
        </div>

        <div className="space-y-3">
          {sampleIssues.map((issue, index) => {
            const config = issueConfig[issue.type];
            const Icon = config.icon;
            const severity = severityConfig[issue.severity];

            return (
              <motion.button
                key={issue.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedIssue(issue)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                  "hover:shadow-soft",
                  config.bg,
                  config.border
                )}
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{issue.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {issue.plantName} • {issue.detectedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    severity.bg,
                    severity.color
                  )}>
                    {severity.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Issue Detail Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedIssue && (
                <>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    issueConfig[selectedIssue.type].bg
                  )}>
                    {(() => {
                      const Icon = issueConfig[selectedIssue.type].icon;
                      return <Icon className={cn("w-4 h-4", issueConfig[selectedIssue.type].color)} />;
                    })()}
                  </div>
                  {selectedIssue.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  <span>{selectedIssue.plantName}</span>
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  severityConfig[selectedIssue.severity].bg,
                  severityConfig[selectedIssue.severity].color
                )}>
                  {severityConfig[selectedIssue.severity].label} Severity
                </span>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
              </div>

              <div className={cn(
                "p-4 rounded-xl border",
                issueConfig[selectedIssue.type].bg,
                issueConfig[selectedIssue.type].border
              )}>
                <h4 className="text-sm font-medium text-foreground mb-2">Suggested Action</h4>
                <p className="text-sm text-muted-foreground">{selectedIssue.suggestedAction}</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setSelectedIssue(null)} className="flex-1">
                  Dismiss
                </Button>
                <Button onClick={handleGoToPlant} className="flex-1">
                  <Leaf className="w-4 h-4 mr-2" />
                  View Plant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
