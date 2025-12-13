import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Droplets, Thermometer, Sun, Activity, Wind } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area } from "recharts";

const sensorData = [
  { time: "6AM", moisture: 45, temperature: 18, humidity: 65 },
  { time: "9AM", moisture: 52, temperature: 22, humidity: 58 },
  { time: "12PM", moisture: 48, temperature: 28, humidity: 45 },
  { time: "3PM", moisture: 42, temperature: 32, humidity: 40 },
  { time: "6PM", moisture: 55, temperature: 26, humidity: 52 },
  { time: "9PM", moisture: 68, temperature: 20, humidity: 68 },
];

const weeklyData = [
  { day: "Mon", moisture: 60, light: 720 },
  { day: "Tue", moisture: 55, light: 680 },
  { day: "Wed", moisture: 70, light: 820 },
  { day: "Thu", moisture: 65, light: 750 },
  { day: "Fri", moisture: 58, light: 690 },
  { day: "Sat", moisture: 62, light: 780 },
  { day: "Sun", moisture: 68, light: 850 },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "Low moisture detected in Zone A", time: "2 hours ago" },
  { id: 2, type: "success", message: "Watering completed successfully", time: "4 hours ago" },
  { id: 3, type: "info", message: "Disease scan completed - All clear", time: "6 hours ago" },
];

export default function DashboardHome() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background leaf-pattern">
      <DashboardTopbar title="Dashboard" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Welcome message */}
        <div className="mb-6 animate-fade-up">
          <h2 className="text-lg text-foreground font-medium">Welcome back!</h2>
          <p className="text-sm text-muted-foreground">Here's what's happening with your plants today.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="animate-fade-up">
            <MetricCard
              title="Soil Moisture"
              value="68%"
              change="Optimal range (40-80%)"
              changeType="positive"
              icon={Droplets}
              iconColor="text-primary"
              iconBg="bg-primary/15"
            />
          </div>
          <div className="animate-fade-up-delay-1">
            <MetricCard
              title="Temperature"
              value="24°C"
              change="Range: 18-32°C"
              changeType="neutral"
              icon={Thermometer}
              iconColor="text-secondary"
              iconBg="bg-secondary/15"
            />
          </div>
          <div className="animate-fade-up-delay-2">
            <MetricCard
              title="Light Level"
              value="720 lux"
              change="Good for growth"
              changeType="positive"
              icon={Sun}
              iconColor="text-secondary"
              iconBg="bg-secondary/15"
            />
          </div>
          <div className="animate-fade-up-delay-3">
            <MetricCard
              title="Humidity"
              value="58%"
              change="Ideal: 50-70%"
              changeType="positive"
              icon={Wind}
              iconColor="text-primary-light"
              iconBg="bg-primary/10"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Real-time Sensor Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 glow-pulse">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Today's Readings</h3>
                <p className="text-sm text-muted-foreground">Moisture & Temperature</p>
              </div>
              <div className="relative">
                <Activity className="w-5 h-5 text-primary" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full sensor-pulse" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sensorData}>
                  <defs>
                    <linearGradient id="moistureAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145, 70%, 45%)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(145, 70%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(145, 70%, 45%)" fontSize={12} unit="%" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(85, 75%, 55%)" fontSize={12} unit="°C" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 0 20px hsl(145, 70%, 45%, 0.2)'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
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
                    stroke="hsl(145, 70%, 45%)" 
                    strokeWidth={2}
                    fill="url(#moistureAreaGradient)" 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="hsl(85, 75%, 55%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(85, 75%, 55%)', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shadow-glow" />
                <span className="text-muted-foreground">Moisture (%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" style={{ boxShadow: '0 0 10px hsl(85, 75%, 55%)' }} />
                <span className="text-muted-foreground">Temperature (°C)</span>
              </div>
            </div>
          </div>

          {/* Weekly Comparison Bar Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Weekly Overview</h3>
                <p className="text-sm text-muted-foreground">Moisture & Light levels</p>
              </div>
              <Sun className="w-5 h-5 text-secondary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(145, 70%, 45%)" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(85, 75%, 55%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(value: number, name: string) => {
                      if (name === 'moisture') return [`${value}%`, 'Moisture'];
                      if (name === 'light') return [`${value} lux`, 'Light'];
                      return [value, name];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="moisture" fill="hsl(145, 70%, 45%)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="light" fill="hsl(85, 75%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Moisture (%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Light (lux)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-secondary sensor-pulse' :
                    alert.type === 'success' ? 'bg-primary sensor-pulse' :
                    'bg-primary-light sensor-pulse'
                  }`} style={{ animationDelay: `${index * 0.2}s` }} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Sensors</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full sensor-pulse" />
                  <span className="font-semibold text-foreground">12</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plants Monitored</span>
                <span className="font-semibold text-foreground">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Soil Moisture</span>
                <span className="font-semibold text-primary glow-text">58%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Water Saved</span>
                <span className="font-semibold text-primary glow-text">234L</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
