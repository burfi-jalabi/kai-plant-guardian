import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Activity, Thermometer, Droplets, Sun, Wind, Gauge } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { useSensorData } from "@/hooks/useDashboardData";

/**
 * Sensor Data Page
 * 
 * API MAPPINGS:
 * - Live Readings: GET /api/sensors/current → temperature, humidity, light, co2
 * - Charts use time-series data (can be extended with additional endpoints)
 * 
 * BACKEND TO CONFIRM: Add endpoint for historical sensor data if needed
 */

// Fallback chart data - BACKEND TO CONFIRM: Replace with GET /api/sensors/history
const temperatureData = [
  { time: "00:00", value: 18 },
  { time: "04:00", value: 16 },
  { time: "08:00", value: 20 },
  { time: "12:00", value: 26 },
  { time: "16:00", value: 24 },
  { time: "20:00", value: 21 },
  { time: "24:00", value: 19 },
];

const humidityData = [
  { time: "00:00", value: 75 },
  { time: "04:00", value: 80 },
  { time: "08:00", value: 70 },
  { time: "12:00", value: 55 },
  { time: "16:00", value: 60 },
  { time: "20:00", value: 68 },
  { time: "24:00", value: 72 },
];

const lightData = [
  { time: "00:00", value: 0 },
  { time: "04:00", value: 50 },
  { time: "08:00", value: 450 },
  { time: "12:00", value: 900 },
  { time: "16:00", value: 650 },
  { time: "20:00", value: 100 },
  { time: "24:00", value: 0 },
];

const sensors = [
  { id: 1, name: "Zone A - Greenhouse", status: "active", battery: 85 },
  { id: 2, name: "Zone B - Garden", status: "active", battery: 72 },
  { id: 3, name: "Zone C - Indoor", status: "active", battery: 94 },
  { id: 4, name: "Zone D - Nursery", status: "warning", battery: 23 },
];

export default function SensorData() {
  // Fetch live sensor readings - GET /api/sensors/current
  const { data: sensorData, isLoading, error } = useSensorData();

  // Helper to format sensor values with loading state
  const formatValue = (value: number | undefined, unit: string) => {
    if (isLoading) return "...";
    if (value === undefined) return "N/A";
    return `${value}${unit}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <DashboardTopbar title="Sensor Data" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* API Error Banner */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
            Unable to fetch live sensor data. Showing cached values.
          </div>
        )}

        {/* Live Readings - GET /api/sensors/current */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Temperature</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {formatValue(sensorData?.temperature, "°C")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Avg: 22°C</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Humidity</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {formatValue(sensorData?.humidity, "%")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Optimal</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Sun className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">Light</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {formatValue(sensorData?.light, " lux")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Bright</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Wind className="w-5 h-5 text-teal-500" />
              </div>
              <span className="text-sm text-muted-foreground">CO2 Level</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {formatValue(sensorData?.co2, " ppm")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Normal</p>
          </div>
        </div>

        {/* Charts - BACKEND TO CONFIRM: Add historical data endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Temperature Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Temperature</h3>
                <p className="text-sm text-muted-foreground">24-hour trend</p>
              </div>
              <Thermometer className="w-5 h-5 text-orange-500" />
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureData}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="time" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis stroke="hsl(150, 15%, 45%)" fontSize={12} unit="°C" />
                  <Tooltip 
                    formatter={(value: number) => [`${value}°C`, 'Temperature']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(25, 95%, 53%)" strokeWidth={2} fill="url(#tempGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Humidity Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Humidity</h3>
                <p className="text-sm text-muted-foreground">24-hour trend</p>
              </div>
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={humidityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="time" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis stroke="hsl(150, 15%, 45%)" fontSize={12} unit="%" />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Humidity']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(210, 100%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(210, 100%, 50%)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Light Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Light Intensity</h3>
                <p className="text-sm text-muted-foreground">24-hour trend (lux)</p>
              </div>
              <Sun className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140, 20%, 88%)" />
                  <XAxis dataKey="time" stroke="hsl(150, 15%, 45%)" fontSize={12} />
                  <YAxis stroke="hsl(150, 15%, 45%)" fontSize={12} unit=" lux" />
                  <Tooltip 
                    formatter={(value: number) => [`${value} lux`, 'Light']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(0, 0%, 100%)', 
                      border: '1px solid hsl(140, 20%, 88%)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(45, 93%, 47%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sensor Status */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Sensor Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{sensor.name}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${
                    sensor.status === 'active' ? 'bg-primary' : 'bg-yellow-500'
                  }`} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Battery</span>
                  <span className={sensor.battery < 30 ? 'text-destructive' : 'text-foreground'}>
                    {sensor.battery}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      sensor.battery < 30 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${sensor.battery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
