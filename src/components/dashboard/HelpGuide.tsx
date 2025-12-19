import { useState } from "react";
import { HelpCircle, Leaf, Droplets, Bug, Activity, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const guideSteps: GuideStep[] = [
  {
    id: "select",
    title: "Select Your Plant",
    description: "Start by selecting a plant from your collection. Use the plant selector at the top of the dashboard to choose which plant you want to monitor.",
    icon: Leaf,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "monitor",
    title: "Monitor Sensor Data",
    description: "View real-time data from your sensors including soil moisture, temperature, light levels, and humidity. Each card shows the current reading and status.",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "water",
    title: "Water Predictions",
    description: "Get AI-powered predictions for when your plants need watering. The system analyzes sensor data and weather to recommend optimal watering times.",
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    id: "disease",
    title: "Disease Detection",
    description: "Upload photos of your plants to detect diseases early. Our AI can identify common plant diseases and suggest treatments.",
    icon: Bug,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export function HelpGuide() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Dashboard Guide
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            Welcome to your Plant Care Dashboard. Here's how to get started:
          </p>

          {guideSteps.map((step, index) => {
            const Icon = step.icon;
            const isExpanded = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveStep(isExpanded ? null : step.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left",
                    isExpanded ? "bg-muted/50 border-primary/30" : "bg-card border-border/50 hover:border-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", step.bg)}>
                      <Icon className={cn("w-5 h-5", step.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
                      </div>
                      <h4 className="font-medium text-foreground">{step.title}</h4>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isExpanded && "rotate-90"
                    )} />
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-muted-foreground mt-3 pl-13">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Need more help? Contact support or check our full documentation.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
