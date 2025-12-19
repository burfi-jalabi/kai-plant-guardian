import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { MetricCard, HeroMetricCard } from "@/components/dashboard/MetricCard";
import { PlantSelector } from "@/components/dashboard/PlantSelector";
import { EmptyDashboardState } from "@/components/dashboard/EmptyDashboardState";
import { usePlant } from "@/contexts/PlantContext";
import { Droplets, Thermometer, Sun, Wind, Activity, Leaf, AlertTriangle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area } from "recharts";
import { useSensorData, useTodaySensorData, useWeeklySensorData, useQuickStats, useAlerts } from "@/hooks/useDashboardData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Fallback data when API is unavailable
const fallbackSensorData = [
  { time: "6AM", moisture: 45, temperature: 18, humidity: 65 },
  { time: "9AM", moisture: 52, temperature: 22, humidity: 58 },
  { time: "12PM", moisture: 48, temperature: 28, humidity: 45 },
  { time: "3PM", moisture: 42, temperature: 32, humidity: 40 },
  { time: "6PM", moisture: 55, temperature: 26, humidity: 52 },
  { time: "9PM", moisture: 68, temperature: 20, humidity: 68 },
];

const fallbackWeeklyData = [
  { day: "Mon", moisture: 60, light: 720 },
  { day: "Tue", moisture: 55, light: 680 },
  { day: "Wed", moisture: 70, light: 820 },
  { day: "Thu", moisture: 65, light: 750 },
  { day: "Fri", moisture: 58, light: 690 },
  { day: "Sat", moisture: 62, light: 780 },
  { day: "Sun", moisture: 68, light: 850 },
];

const fallbackAlerts = [
  { id: 1, type: "warning" as const, message: "Low moisture detected in Zone A", time: "2 hours ago" },
  { id: 2, type: "success" as const, message: "Watering completed successfully", time: "4 hours ago" },
  { id: 3, type: "info" as const, message: "Disease scan completed - All clear", time: "6 hours ago" },
];

// Helper to determine status based on value ranges
function getStatus(value: number | undefined, low: number, high: number): "safe" | "warning" | "critical" {
  if (value === undefined) return "safe";
  if (value < low * 0.5 || value > high * 1.5) return "critical";
  if (value < low || value > high) return "warning";
  return "safe";
}

export default function DashboardHome() {
  const { activePlant } = usePlant();
  
  // Fetch data from backend APIs
  const { data: sensorData, isLoading: sensorsLoading, error: sensorsError } = useSensorData();
  const { data: todayData, isLoading: todayLoading } = useTodaySensorData();
  const { data: weeklyData, isLoading: weeklyLoading } = useWeeklySensorData();
  const { data: quickStats, isLoading: statsLoading } = useQuickStats();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  // Use API data or fallback
  const chartData = todayData || fallbackSensorData;
  const weeklyChartData = weeklyData || fallbackWeeklyData;
  const alertList = alerts || fallbackAlerts;

  // Helper to show loading or error state
  const getMetricValue = (value: number | undefined, unit: string, isLoading: boolean) => {
    if (isLoading) return "...";
    if (value === undefined) return "N/A";
    return `${value}${unit}`;
  };

  // Determine status for each metric
  const moistureStatus = getStatus(sensorData?.soil_moisture, 40, 80);
  const tempStatus = getStatus(sensorData?.temperature, 18, 32);
  const humidityStatus = getStatus(sensorData?.humidity, 50, 70);
  const lightStatus = getStatus(sensorData?.light, 300, 1000);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background overflow-hidden">
      <DashboardTopbar title="Dashboard" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!activePlant ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyDashboardState />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Plant Selector Bar */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                  <div className="flex-1 max-w-md">
                    <PlantSelector />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-primary" />
                      {activePlant.type}
                    </span>
                    <span className="text-border">•</span>
                    <span>{activePlant.zone}</span>
                    <span className="text-border">•</span>
                    <span>Last watered: {activePlant.lastWatered || "Unknown"}</span>
                  </div>
                </div>
              </div>

              {/* API Error Banner */}
              {sensorsError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Unable to fetch live sensor data. Showing cached values.
                </motion.div>
              )}

              {/* Hero Card - Primary Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                <HeroMetricCard
                  title="Plant Health Status"
                  value={activePlant.status === "healthy" ? "Excellent" : activePlant.status === "warning" ? "Needs Attention" : "Critical"}
                  subtitle={`${activePlant.name} is ${activePlant.status === "healthy" ? "thriving" : "requiring care"}`}
                  icon={Leaf}
                  className="lg:col-span-1"
                >
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <Droplets className="w-4 h-4" />
                      <span>{sensorData?.soil_moisture ?? 58}% moisture</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <TrendingUp className="w-4 h-4" />
                      <span>Growing well</span>
                    </div>
                  </div>
                </HeroMetricCard>

                {/* Quick Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-3 lg:gap-4">
                  <MetricCard
                    title="Soil Moisture"
                    value={getMetricValue(sensorData?.soil_moisture, "%", sensorsLoading)}
                    change="Optimal range (40-80%)"
                    changeType={moistureStatus === "safe" ? "positive" : "negative"}
                    icon={Droplets}
                    iconColor="text-blue-500"
                    iconBg="bg-blue-500/10"
                    status={moistureStatus}
                    isLoading={sensorsLoading}
                  />
                  <MetricCard
                    title="Temperature"
                    value={getMetricValue(sensorData?.temperature, "°C", sensorsLoading)}
                    change="Range: 18-32°C"
                    changeType={tempStatus === "safe" ? "positive" : "neutral"}
                    icon={Thermometer}
                    iconColor="text-orange-500"
                    iconBg="bg-orange-500/10"
                    status={tempStatus}
                    isLoading={sensorsLoading}
                  />
                  <MetricCard
                    title="Light Level"
                    value={getMetricValue(sensorData?.light, " lux", sensorsLoading)}
                    change="Good for growth"
                    changeType="positive"
                    icon={Sun}
                    iconColor="text-yellow-500"
                    iconBg="bg-yellow-500/10"
                    status={lightStatus}
                    isLoading={sensorsLoading}
                  />
                  <MetricCard
                    title="Humidity"
                    value={getMetricValue(sensorData?.humidity, "%", sensorsLoading)}
                    change="Ideal: 50-70%"
                    changeType={humidityStatus === "safe" ? "positive" : "neutral"}
                    icon={Wind}
                    iconColor="text-teal-500"
                    iconBg="bg-teal-500/10"
                    status={humidityStatus}
                    isLoading={sensorsLoading}
                  />
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
                {/* Today's Readings Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl p-4 lg:p-6 shadow-soft border border-border/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Today's Readings</h3>
                      <p className="text-sm text-muted-foreground">
                        {todayLoading ? "Loading..." : `${activePlant.name} • Moisture & Temperature`}
                      </p>
                    </div>
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="h-56 lg:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData}>
                        <defs>
                          <linearGradient id="moistureAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="hsl(210, 100%, 50%)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(30, 100%, 50%)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-elevated)'
                          }}
                          formatter={(value: number, name: string) => {
                            if (name === 'moisture') return [`${value}%`, 'Moisture'];
                            if (name === 'temperature') return [`${value}°C`, 'Temperature'];
                            return [value, name];
                          }}
                        />
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="moisture" 
                          stroke="hsl(210, 100%, 50%)" 
                          strokeWidth={2}
                          fill="url(#moistureAreaGradient)" 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="hsl(30, 100%, 50%)" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(30, 100%, 50%)', strokeWidth: 0, r: 3 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Moisture (%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-muted-foreground">Temperature (°C)</span>
                    </div>
                  </div>
                </motion.div>

                {/* Weekly Overview Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl p-4 lg:p-6 shadow-soft border border-border/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Weekly Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        {weeklyLoading ? "Loading..." : `${activePlant.name} • Moisture & Light`}
                      </p>
                    </div>
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="h-56 lg:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyChartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" stroke="hsl(210, 100%, 50%)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(45, 100%, 50%)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-elevated)'
                          }}
                          formatter={(value: number, name: string) => {
                            if (name === 'moisture') return [`${value}%`, 'Moisture'];
                            if (name === 'light') return [`${value} lux`, 'Light'];
                            return [value, name];
                          }}
                        />
                        <Bar yAxisId="left" dataKey="moisture" fill="hsl(210, 100%, 50%)" radius={[6, 6, 0, 0]} />
                        <Bar yAxisId="right" dataKey="light" fill="hsl(45, 93%, 47%)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Moisture (%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Light (lux)</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Section - Alerts & Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Recent Alerts */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2 bg-card rounded-2xl p-4 lg:p-6 shadow-soft border border-border/50"
                >
                  <h3 className="font-semibold text-foreground mb-4">
                    {alertsLoading ? "Loading Alerts..." : `Recent Alerts • ${activePlant.name}`}
                  </h3>
                  <div className="space-y-3">
                    {alertList.slice(0, 4).map((alert, index) => (
                      <motion.div 
                        key={alert.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                          alert.type === 'warning' ? 'bg-yellow-500' :
                          alert.type === 'success' ? 'bg-primary' :
                          'bg-blue-500'
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card rounded-2xl p-4 lg:p-6 shadow-soft border border-border/50"
                >
                  <h3 className="font-semibold text-foreground mb-4">
                    {statsLoading ? "Loading Stats..." : "Quick Stats"}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Active Sensors", value: quickStats?.active_sensors ?? 12, color: "text-foreground" },
                      { label: "Plants Monitored", value: quickStats?.plants_monitored ?? 48, color: "text-foreground" },
                      { label: "Avg Soil Moisture", value: `${quickStats?.avg_soil_moisture ?? 58}%`, color: "text-blue-500" },
                      { label: "Water Saved", value: `${quickStats?.water_saved_liters ?? 234}L`, color: "text-primary" },
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className={cn("font-semibold", stat.color)}>
                          {statsLoading ? "..." : stat.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
