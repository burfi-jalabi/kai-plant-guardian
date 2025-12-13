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
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <DashboardTopbar title="Dashboard" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Welcome message */}
        <div className="mb-6">
          <h2 className="text-lg text-muted-foreground">Welcome back!</h2>
          <p className="text-sm text-muted-foreground">Here's what's happening with your plants today.</p>
        </div>

        {/* Metrics Grid - Removed Plant Health, Added units */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Soil Moisture"
            value="68%"
            change="Optimal range (40-80%)"
            changeType="positive"
            icon={Droplets}
            iconColor="text-blue-500"
            iconBg="bg-blue-500/10"
          />
          <MetricCard
            title="Temperature"
            value="24°C"
            change="Range: 18-32°C"
            changeType="neutral"
            icon={Thermometer}
            iconColor="text-orange-500"
            iconBg="bg-orange-500/10"
          />
          <MetricCard
            title="Light Level"
            value="720 lux"
            change="Good for growth"
            changeType="positive"
            icon={Sun}
            iconColor="text-yellow-500"
            iconBg="bg-yellow-500/10"
          />
          <MetricCard
            title="Humidity"
            value="58%"
            change="Ideal: 50-70%"
            changeType="positive"
            icon={Wind}
            iconColor="text-teal-500"
            iconBg="bg-teal-500/10"
          />
        </div>

        {/* Charts Section - New chart types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Real-time Sensor Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Today's Readings</h3>
                <p className="text-sm text-muted-foreground">Moisture & Temperature</p>
              </div>
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={sensorData}>
                  <defs>
                    <linearGradient id="moistureAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="time" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(210, 100%, 50%)" fontSize={12} unit="%" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(30, 100%, 50%)" fontSize={12} unit="°C" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
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
                    dot={{ fill: 'hsl(30, 100%, 50%)', strokeWidth: 2, r: 4 }}
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
          </div>

          {/* Weekly Comparison Bar Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Weekly Overview</h3>
                <p className="text-sm text-muted-foreground">Moisture & Light levels</p>
              </div>
              <Sun className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="day" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(210, 100%, 50%)" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(45, 100%, 50%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'moisture') return [`${value}%`, 'Moisture'];
                      if (name === 'light') return [`${value} lux`, 'Light'];
                      return [value, name];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="moisture" fill="hsl(210, 100%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="light" fill="hsl(45, 100%, 50%)" radius={[4, 4, 0, 0]} />
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
          </div>
        </div>

        {/* Recent Alerts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    alert.type === 'success' ? 'bg-primary' :
                    'bg-blue-500'
                  }`} />
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
                <span className="font-semibold text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plants Monitored</span>
                <span className="font-semibold text-foreground">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Soil Moisture</span>
                <span className="font-semibold text-blue-500">58%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Water Saved</span>
                <span className="font-semibold text-primary">234L</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
