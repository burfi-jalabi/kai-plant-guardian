import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type MetricStatus = "safe" | "warning" | "critical" | "neutral";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  status?: MetricStatus;
  trend?: "up" | "down" | "stable";
  subtitle?: string;
  size?: "default" | "large";
  isLoading?: boolean;
}

const statusStyles = {
  safe: {
    border: "border-primary/30",
    glow: "shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]",
    indicator: "bg-primary",
    pulse: false,
  },
  warning: {
    border: "border-yellow-500/30",
    glow: "shadow-[0_0_20px_-5px_hsl(45,93%,47%,0.2)]",
    indicator: "bg-yellow-500",
    pulse: true,
  },
  critical: {
    border: "border-destructive/30",
    glow: "shadow-[0_0_20px_-5px_hsl(var(--destructive)/0.25)]",
    indicator: "bg-destructive",
    pulse: true,
  },
  neutral: {
    border: "border-border/50",
    glow: "",
    indicator: "bg-muted-foreground",
    pulse: false,
  },
};

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  status = "neutral",
  trend,
  subtitle,
  size = "default",
  isLoading = false,
}: MetricCardProps) {
  const styles = statusStyles[status];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-card rounded-2xl shadow-soft border transition-all duration-300",
        "hover:shadow-elevated hover:translate-y-[-2px]",
        styles.border,
        styles.glow,
        size === "large" ? "p-8" : "p-6"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm text-muted-foreground truncate">{title}</p>
            {status !== "neutral" && (
              <span className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                styles.indicator,
                styles.pulse && "animate-pulse"
              )} />
            )}
          </div>
          
          {isLoading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded-lg" />
          ) : (
            <motion.p 
              key={value}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "font-bold text-foreground",
                size === "large" ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"
              )}
            >
              {value}
            </motion.p>
          )}
          
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          
          {change && (
            <p className={cn(
              "text-sm mt-2 font-medium flex items-center gap-1",
              changeType === "positive" && "text-primary",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {change}
            </p>
          )}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={cn(
            "flex items-center justify-center rounded-xl flex-shrink-0",
            iconBg,
            size === "large" ? "w-14 h-14" : "w-12 h-12"
          )}
        >
          <Icon className={cn(
            iconColor,
            size === "large" ? "w-7 h-7" : "w-6 h-6"
          )} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Hero card for primary metrics
export function HeroMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 lg:p-8",
        "bg-gradient-to-br from-primary/90 via-primary to-primary/80",
        "text-primary-foreground shadow-glow",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5 opacity-80" />
              <span className="text-sm font-medium opacity-90">{title}</span>
            </div>
            <p className="text-4xl lg:text-5xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-sm opacity-80 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
