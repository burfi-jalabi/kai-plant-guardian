import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Droplets, Calendar, Clock, TrendingDown, Leaf, CloudRain, Thermometer, MapPin } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, ComposedChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const predictionData = [
  { day: "Today", moisture: 68, predicted: 68, temperature: 24, rainfall: 0 },
  { day: "Tomorrow", moisture: null, predicted: 55, temperature: 26, rainfall: 0 },
  { day: "Day 3", moisture: null, predicted: 42, temperature: 28, rainfall: 5 },
  { day: "Day 4", moisture: null, predicted: 58, temperature: 22, rainfall: 12 },
  { day: "Day 5", moisture: null, predicted: 65, temperature: 20, rainfall: 8 },
  { day: "Day 6", moisture: null, predicted: 62, temperature: 23, rainfall: 0 },
  { day: "Day 7", moisture: null, predicted: 52, temperature: 27, rainfall: 0 },
];

const hourlyData = [
  { hour: "6AM", moisture: 68, evaporation: 2 },
  { hour: "9AM", moisture: 65, evaporation: 5 },
  { hour: "12PM", moisture: 58, evaporation: 12 },
  { hour: "3PM", moisture: 52, evaporation: 15 },
  { hour: "6PM", moisture: 55, evaporation: 8 },
  { hour: "9PM", moisture: 60, evaporation: 3 },
];

const zones = [
  { id: 1, name: "Zone A - Greenhouse", nextWater: "In 2 hours", status: "urgent", moisture: 35, soilType: "Loamy" },
  { id: 2, name: "Zone B - Garden", nextWater: "Tomorrow 8 AM", status: "normal", moisture: 58, soilType: "Sandy" },
  { id: 3, name: "Zone C - Indoor", nextWater: "In 3 days", status: "optimal", moisture: 72, soilType: "Clay" },
  { id: 4, name: "Zone D - Nursery", nextWater: "Tomorrow 6 PM", status: "normal", moisture: 52, soilType: "Loamy" },
];

const schedule = [
  { id: 1, zone: "Zone A", time: "Today, 2:00 PM", duration: "15 min", amount: "12L" },
  { id: 2, zone: "Zone B", time: "Tomorrow, 8:00 AM", duration: "20 min", amount: "18L" },
  { id: 3, zone: "Zone D", time: "Tomorrow, 6:00 PM", duration: "10 min", amount: "8L" },
  { id: 4, zone: "Zone C", time: "Dec 15, 9:00 AM", duration: "12 min", amount: "10L" },
];

const weatherForecast = [
  { day: "Today", icon: "☀️", temp: "24°C", humidity: "45%", rain: "0%" },
  { day: "Tomorrow", icon: "⛅", temp: "26°C", humidity: "52%", rain: "10%" },
  { day: "Day 3", icon: "🌧️", temp: "22°C", humidity: "78%", rain: "80%" },
  { day: "Day 4", icon: "🌧️", temp: "20°C", humidity: "85%", rain: "90%" },
  { day: "Day 5", icon: "⛅", temp: "23°C", humidity: "65%", rain: "30%" },
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
            <p className="text-2xl font-bold text-foreground">24 L</p>
            <p className="text-xs text-muted-foreground mt-1">Target: 30 L/day</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Water Saved</p>
            <p className="text-2xl font-bold text-foreground">234 L</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Next Watering</p>
            <p className="text-2xl font-bold text-foreground">2h 15m</p>
            <p className="text-xs text-muted-foreground mt-1">Zone A - Greenhouse</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-teal-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Zones Optimal</p>
            <p className="text-2xl font-bold text-foreground">3/4</p>
            <p className="text-xs text-muted-foreground mt-1">1 zone needs attention</p>
          </div>
        </div>

        {/* Weather Forecast Bar */}
        <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CloudRain className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-foreground">Weather Forecast</h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {weatherForecast.map((day, index) => (
              <div key={index} className={`flex-shrink-0 text-center p-3 rounded-xl min-w-[80px] ${index === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'}`}>
                <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
                <p className="text-2xl mb-1">{day.icon}</p>
                <p className="text-sm font-semibold text-foreground">{day.temp}</p>
                <p className="text-xs text-blue-500">💧 {day.rain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction Charts with Tabs */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mb-6">
          <Tabs defaultValue="weekly" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Moisture Prediction</h3>
                <p className="text-sm text-muted-foreground">AI-powered forecast based on weather and plant needs</p>
              </div>
              <TabsList>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="weekly">7-Day</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="weekly" className="mt-0">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={predictionData}>
                    <defs>
                      <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                    <XAxis dataKey="day" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                    <YAxis yAxisId="left" stroke="hsl(210, 100%, 50%)" fontSize={12} domain={[0, 100]} unit="%" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(210, 80%, 70%)" fontSize={12} unit="mm" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)', 
                        border: '1px solid hsl(140, 20%, 88%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === 'predicted') return [`${value}%`, 'Predicted Moisture'];
                        if (name === 'rainfall') return [`${value}mm`, 'Expected Rainfall'];
                        return [value, name];
                      }}
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="hsl(210, 100%, 50%)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#moistureGradient)" 
                      name="predicted"
                    />
                    <Bar yAxisId="right" dataKey="rainfall" fill="hsl(210, 80%, 70%)" radius={[4, 4, 0, 0]} name="rainfall" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 border-t-2 border-dashed border-blue-500" style={{ width: 12 }} />
                  <span className="text-muted-foreground">Predicted Moisture (%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-300" />
                  <span className="text-muted-foreground">Rainfall (mm)</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hourly" className="mt-0">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                    <XAxis dataKey="hour" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                    <YAxis yAxisId="left" stroke="hsl(210, 100%, 50%)" fontSize={12} unit="%" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(30, 100%, 50%)" fontSize={12} unit="mm/h" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)', 
                        border: '1px solid hsl(140, 20%, 88%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number, name: string) => {
                        if (name === 'moisture') return [`${value}%`, 'Soil Moisture'];
                        if (name === 'evaporation') return [`${value}mm/h`, 'Evaporation Rate'];
                        return [value, name];
                      }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="moisture" 
                      stroke="hsl(210, 100%, 50%)" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(210, 100%, 50%)', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="evaporation" 
                      stroke="hsl(30, 100%, 50%)" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(30, 100%, 50%)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">Soil Moisture (%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">Evaporation (mm/h)</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zone Status */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Zone Status</h3>
            </div>
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{zone.nextWater}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{zone.soilType}</span>
                      </div>
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
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-foreground">Watering Schedule</h3>
              </div>
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
