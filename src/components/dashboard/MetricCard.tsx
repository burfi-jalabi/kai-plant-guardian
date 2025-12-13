import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10"
}: MetricCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-glow transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-foreground group-hover:glow-text transition-all">{value}</p>
          {change && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              changeType === "positive" && "text-primary",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
          "group-hover:shadow-glow",
          iconBg
        )}>
          <Icon className={cn("w-6 h-6", iconColor)} />
          {/* Pulsing sensor indicator */}
          <span className="absolute w-2 h-2 bg-primary rounded-full sensor-pulse opacity-0 group-hover:opacity-100 transition-opacity" 
            style={{ top: '0.5rem', right: '0.5rem' }} 
          />
        </div>
      </div>
    </div>
  );
}
