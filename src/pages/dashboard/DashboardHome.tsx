import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Leaf, Droplets, Thermometer, Sun, Activity, Bug } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const healthData = [
  { day: "Mon", health: 85, moisture: 60 },
  { day: "Tue", health: 88, moisture: 55 },
  { day: "Wed", health: 82, moisture: 70 },
  { day: "Thu", health: 90, moisture: 65 },
  { day: "Fri", health: 87, moisture: 58 },
  { day: "Sat", health: 92, moisture: 62 },
  { day: "Sun", health: 95, moisture: 68 },
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Plant Health"
            value="95%"
            change="+3% from last week"
            changeType="positive"
            icon={Leaf}
            iconColor="text-primary"
            iconBg="bg-primary/10"
          />
          <MetricCard
            title="Soil Moisture"
            value="68%"
            change="Optimal range"
            changeType="positive"
            icon={Droplets}
            iconColor="text-blue-500"
            iconBg="bg-blue-500/10"
          />
          <MetricCard
            title="Temperature"
            value="24°C"
            change="Within range"
            changeType="neutral"
            icon={Thermometer}
            iconColor="text-orange-500"
            iconBg="bg-orange-500/10"
          />
          <MetricCard
            title="Light Level"
            value="720 lux"
            change="+12% today"
            changeType="positive"
            icon={Sun}
            iconColor="text-yellow-500"
            iconBg="bg-yellow-500/10"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Health Trend Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Health Trend</h3>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </div>
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData}>
                  <defs>
                    <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 60%, 28%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(152, 60%, 28%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="day" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis stroke="hsl(150, 15%, 45%)" fontSize={12} domain={[70, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="health" 
                    stroke="hsl(152, 60%, 28%)" 
                    strokeWidth={2}
                    fill="url(#healthGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Moisture Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Moisture Levels</h3>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </div>
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="day" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis stroke="hsl(150, 15%, 45%)" fontSize={12} domain={[40, 80]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="moisture" 
                    stroke="hsl(210, 100%, 50%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(210, 100%, 50%)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
                <span className="text-sm text-muted-foreground">Disease Alerts</span>
                <span className="font-semibold text-primary">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Water Saved</span>
                <span className="font-semibold text-blue-500">234L</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
