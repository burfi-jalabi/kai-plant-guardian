import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Droplets, Calendar, Clock, TrendingDown, Leaf } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const predictionData = [
  { day: "Today", moisture: 68, predicted: 68 },
  { day: "Tomorrow", moisture: null, predicted: 55 },
  { day: "Day 3", moisture: null, predicted: 42 },
  { day: "Day 4", moisture: null, predicted: 35 },
  { day: "Day 5", moisture: null, predicted: 48 },
  { day: "Day 6", moisture: null, predicted: 62 },
  { day: "Day 7", moisture: null, predicted: 70 },
];

const zones = [
  { id: 1, name: "Zone A - Greenhouse", nextWater: "In 2 hours", status: "urgent", moisture: 35 },
  { id: 2, name: "Zone B - Garden", nextWater: "Tomorrow 8 AM", status: "normal", moisture: 58 },
  { id: 3, name: "Zone C - Indoor", nextWater: "In 3 days", status: "optimal", moisture: 72 },
  { id: 4, name: "Zone D - Nursery", nextWater: "Tomorrow 6 PM", status: "normal", moisture: 52 },
];

const schedule = [
  { id: 1, zone: "Zone A", time: "Today, 2:00 PM", duration: "15 min", amount: "12L" },
  { id: 2, zone: "Zone B", time: "Tomorrow, 8:00 AM", duration: "20 min", amount: "18L" },
  { id: 3, zone: "Zone D", time: "Tomorrow, 6:00 PM", duration: "10 min", amount: "8L" },
  { id: 4, zone: "Zone C", time: "Dec 15, 9:00 AM", duration: "12 min", amount: "10L" },
];

export default function WaterPrediction() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <DashboardTopbar title="Water Prediction" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Water Used Today</p>
            <p className="text-2xl font-bold text-foreground">24L</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Water Saved</p>
            <p className="text-2xl font-bold text-foreground">234L</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Next Watering</p>
            <p className="text-2xl font-bold text-foreground">2h</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-teal-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Zones Optimal</p>
            <p className="text-2xl font-bold text-foreground">3/4</p>
          </div>
        </div>

        {/* Prediction Chart */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">7-Day Moisture Prediction</h3>
              <p className="text-sm text-muted-foreground">AI-powered forecast based on weather and plant needs</p>
            </div>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                <XAxis dataKey="day" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                <YAxis stroke="hsl(150, 15%, 45%)" fontSize={12} domain={[0, 100]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(210, 100%, 50%)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="url(#moistureGradient)" 
                  name="Predicted Moisture"
                />
                <Area 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="hsl(152, 60%, 28%)" 
                  strokeWidth={2}
                  fill="hsl(152, 60%, 28%)"
                  fillOpacity={0.2}
                  name="Current Moisture"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 border-t-2 border-dashed border-blue-500" style={{ width: 12 }} />
              <span className="text-muted-foreground">Predicted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zone Status */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Zone Status</h3>
            <div className="space-y-3">
              {zones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      zone.status === 'urgent' ? 'bg-destructive animate-pulse' :
                      zone.status === 'optimal' ? 'bg-primary' :
                      'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{zone.name}</p>
                      <p className="text-sm text-muted-foreground">{zone.nextWater}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{zone.moisture}%</p>
                    <p className="text-xs text-muted-foreground">Moisture</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Watering Schedule</h3>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl ${
                  index === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                }`}>
                  <div>
                    <p className="font-medium text-foreground">{item.zone}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{item.amount}</p>
                    <p className="text-xs text-muted-foreground">{item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
