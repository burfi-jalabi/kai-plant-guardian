import { LucideIcon, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface SensorDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  value: string;
  status: "safe" | "warning" | "critical" | "neutral";
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  optimalRange: string;
  description: string;
  trend: "up" | "down" | "stable";
  trendData: { time: string; value: number }[];
  tips: string[];
}

const statusConfig = {
  safe: {
    label: "Normal",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  warning: {
    label: "Needs Attention",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  critical: {
    label: "Critical",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
  },
  neutral: {
    label: "Unknown",
    color: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-border",
  },
};

export function SensorDetailModal({
  open,
  onOpenChange,
  title,
  value,
  status,
  icon: Icon,
  iconColor,
  iconBg,
  optimalRange,
  description,
  trend,
  trendData,
  tips,
}: SensorDetailModalProps) {
  const config = statusConfig[status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
              <Icon className={cn("w-5 h-5", iconColor)} />
            </div>
            <div>
              <span>{title}</span>
              <p className="text-sm font-normal text-muted-foreground">Sensor Details</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Current Value */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 rounded-xl border",
              config.bg,
              config.border
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Reading</p>
                <p className="text-3xl font-bold text-foreground">{value}</p>
              </div>
              <div className="text-right">
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  config.bg,
                  config.color
                )}>
                  {trend === "up" && <TrendingUp className="w-3 h-3" />}
                  {trend === "down" && <TrendingDown className="w-3 h-3" />}
                  {trend === "stable" && <Minus className="w-3 h-3" />}
                  {config.label}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Optimal: {optimalRange}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 24h Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-medium text-foreground mb-3">24 Hour Trend</h4>
            <div className="h-40 bg-muted/30 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="sensorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#sensorGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground">{description}</p>
          </motion.div>

          {/* Tips */}
          {tips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Tips
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
