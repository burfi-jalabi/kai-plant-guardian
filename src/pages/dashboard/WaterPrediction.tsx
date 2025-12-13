import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Droplets, Calendar, Clock, TrendingDown, Leaf, CloudRain, MapPin, Gauge, Hand } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Bar, ComposedChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useWaterPrediction, useZones, useWeatherForecast } from "@/hooks/useDashboardData";

/**
 * Water Prediction Page
 * 
 * API MAPPINGS:
 * - Hero Card: GET /api/water/prediction → next_watering_hours, confidence, zone
 * - Weather Forecast: GET /api/weather → forecast data
 * - Zone Status: GET /api/zones → zone list with moisture levels
 */

// Fallback data when API is unavailable
const fallbackPredictionData = [
  { day: "Today", moisture: 68, predicted: 68, temperature: 24, rainfall: 0 },
  { day: "Tomorrow", moisture: null, predicted: 55, temperature: 26, rainfall: 0 },
  { day: "Day 3", moisture: null, predicted: 42, temperature: 28, rainfall: 5 },
  { day: "Day 4", moisture: null, predicted: 58, temperature: 22, rainfall: 12 },
  { day: "Day 5", moisture: null, predicted: 65, temperature: 20, rainfall: 8 },
  { day: "Day 6", moisture: null, predicted: 62, temperature: 23, rainfall: 0 },
  { day: "Day 7", moisture: null, predicted: 52, temperature: 27, rainfall: 0 },
];

const fallbackHourlyData = [
  { hour: "6AM", moisture: 68, evaporation: 2 },
  { hour: "9AM", moisture: 65, evaporation: 5 },
  { hour: "12PM", moisture: 58, evaporation: 12 },
  { hour: "3PM", moisture: 52, evaporation: 15 },
  { hour: "6PM", moisture: 55, evaporation: 8 },
  { hour: "9PM", moisture: 60, evaporation: 3 },
];

const fallbackZones = [
  { id: 1, name: "Zone A - Greenhouse", next_water: "In 2 hours", status: "urgent" as const, moisture: 35, soil_type: "Loamy" },
  { id: 2, name: "Zone B - Garden", next_water: "Tomorrow 8 AM", status: "normal" as const, moisture: 58, soil_type: "Sandy" },
  { id: 3, name: "Zone C - Indoor", next_water: "In 3 days", status: "optimal" as const, moisture: 72, soil_type: "Clay" },
  { id: 4, name: "Zone D - Nursery", next_water: "Tomorrow 6 PM", status: "normal" as const, moisture: 52, soil_type: "Loamy" },
];

const fallbackSchedule = [
  { id: 1, zone: "Zone A", time: "Today, 2:00 PM", duration: "15 min", amount: "12L" },
  { id: 2, zone: "Zone B", time: "Tomorrow, 8:00 AM", duration: "20 min", amount: "18L" },
  { id: 3, zone: "Zone D", time: "Tomorrow, 6:00 PM", duration: "10 min", amount: "8L" },
  { id: 4, zone: "Zone C", time: "Dec 15, 9:00 AM", duration: "12 min", amount: "10L" },
];

const fallbackWeatherForecast = [
  { day: "Today", icon: "☀️", temp: "24°C", humidity: "45%", rain: "0%" },
  { day: "Tomorrow", icon: "⛅", temp: "26°C", humidity: "52%", rain: "10%" },
  { day: "Day 3", icon: "🌧️", temp: "22°C", humidity: "78%", rain: "80%" },
  { day: "Day 4", icon: "🌧️", temp: "20°C", humidity: "85%", rain: "90%" },
  { day: "Day 5", icon: "⛅", temp: "23°C", humidity: "65%", rain: "30%" },
];

export default function WaterPrediction() {
  const [manualOverride, setManualOverride] = useState(false);

  // Fetch data from backend APIs
  const { data: prediction, isLoading: predictionLoading, error: predictionError } = useWaterPrediction();
  const { data: zones, isLoading: zonesLoading } = useZones();
  const { data: weather, isLoading: weatherLoading } = useWeatherForecast();

  // Use API data or fallback - GET /api/water/prediction
  const nextWateringHours = prediction?.next_watering_hours ?? 2;
  const nextWateringMinutes = prediction?.next_watering_minutes ?? 15;
  const confidenceLevel = prediction?.confidence ?? 92;
  const recommendedAmount = prediction?.recommended_amount_liters ?? 12;
  const targetZone = prediction?.zone ?? "Zone A - Greenhouse";

  // Zone data - GET /api/zones
  const zoneList = zones || fallbackZones;

  // Weather data - GET /api/weather
  const weatherList = weather || fallbackWeatherForecast;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <DashboardTopbar title="Water Prediction" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* API Error Banner */}
        {predictionError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
            Unable to fetch prediction data. Showing estimated values.
          </div>
        )}

        {/* Next Watering Hero Card - GET /api/water/prediction */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-soft mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">Next Watering Needed In</span>
                  {predictionLoading && <span className="text-xs opacity-70">(Loading...)</span>}
                </div>
                <p className="text-4xl lg:text-5xl font-bold mb-1">
                  {nextWateringHours}h {nextWateringMinutes}m
                </p>
                <p className="text-sm opacity-80">{targetZone} ({recommendedAmount}L recommended)</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Confidence Indicator - from prediction.confidence */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4" />
                    <span className="text-xs font-medium">Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-500" 
                        style={{ width: `${confidenceLevel}%` }} 
                      />
                    </div>
                    <span className="text-sm font-bold">{confidenceLevel}%</span>
                  </div>
                </div>
                
                {/* Manual Override */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Hand className="w-4 h-4" />
                    <span className="text-xs font-medium">Manual Override</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={manualOverride} 
                      onCheckedChange={setManualOverride}
                      className="data-[state=checked]:bg-white data-[state=checked]:text-blue-500"
                    />
                    <span className="text-sm">{manualOverride ? 'Active' : 'Auto'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {manualOverride && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm mb-3 opacity-90">Manual mode active - AI predictions paused</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                    <Droplets className="w-4 h-4 mr-2" />
                    Water Now
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/50 text-white hover:bg-white/20">
                    Skip Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

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
                <Calendar className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Scheduled Today</p>
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground mt-1">Watering events</p>
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

        {/* Weather Forecast Bar - GET /api/weather */}
        <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CloudRain className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-foreground">
              {weatherLoading ? "Loading Weather..." : "Weather Forecast"}
            </h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {weatherList.map((day, index) => (
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
                  <ComposedChart data={fallbackPredictionData}>
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
                  <LineChart data={fallbackHourlyData}>
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
          {/* Zone Status - GET /api/zones */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                {zonesLoading ? "Loading Zones..." : "Zone Status"}
              </h3>
            </div>
            <div className="space-y-3">
              {zoneList.map((zone) => (
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
                        <p className="text-sm text-muted-foreground">{zone.next_water}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{zone.soil_type}</span>
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
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-foreground">Upcoming Schedule</h3>
            </div>
            <div className="space-y-3">
              {fallbackSchedule.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
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
