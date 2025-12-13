/**
 * GrowSense AI - Backend API Service
 * 
 * This service handles all API calls to the Lovable Cloud backend.
 * Uses Supabase Edge Functions for all data operations.
 */

import { supabase } from "@/integrations/supabase/client";

// ============================================
// API Response Types
// ============================================

// Sensor data from ESP32/IoT devices
export interface SensorData {
  temperature: number;      // °C
  humidity: number;         // %
  soil_moisture: number;    // %
  light: number;            // lux
  co2?: number;             // ppm (optional)
  timestamp?: string;
}

// Time-series data for graphs
export interface TimeSeriesPoint {
  time: string;
  moisture?: number;
  temperature?: number;
  humidity?: number;
  light?: number;
  evaporation?: number;
}

// Weekly overview data
export interface WeeklyDataPoint {
  day: string;
  moisture: number;
  light: number;
}

// Water prediction response
export interface WaterPrediction {
  next_watering_hours: number;
  next_watering_minutes: number;
  confidence: number;        // 0-100
  recommended_amount_liters: number;
  zone: string;
}

// Disease detection response
export interface DiseaseDetectionResult {
  disease_name: string;      // e.g., "Powdery Mildew" or "Healthy"
  confidence: number;        // 0-100
  severity?: "low" | "medium" | "high";
  treatment?: string;
  is_healthy: boolean;
}

// Quick stats for dashboard
export interface QuickStats {
  active_sensors: number;
  plants_monitored: number;
  avg_soil_moisture: number;
  water_saved_liters: number;
}

// Alert type
export interface Alert {
  id: number;
  type: "warning" | "success" | "info";
  message: string;
  time: string;
}

// Zone status
export interface ZoneStatus {
  id: number;
  name: string;
  next_water: string;
  status: "urgent" | "normal" | "optimal";
  moisture: number;
  soil_type: string;
}

// Weather forecast
export interface WeatherDay {
  day: string;
  icon: string;
  temp: string;
  humidity: string;
  rain: string;
}

// ============================================
// API Functions (Using Supabase Edge Functions)
// ============================================

/**
 * Fetch current sensor readings
 * Endpoint: sensors-latest
 */
export async function fetchSensorData(): Promise<SensorData> {
  const { data, error } = await supabase.functions.invoke("sensors-latest");
  
  if (error) {
    console.error("Failed to fetch sensor data:", error);
    throw new Error("Failed to fetch sensor data");
  }
  
  return data;
}

/**
 * Fetch time-series sensor data for today's graph
 * Endpoint: sensors-history?range=24h
 */
export async function fetchTodaySensorData(): Promise<TimeSeriesPoint[]> {
  const { data, error } = await supabase.functions.invoke("sensors-history", {
    body: { range: "24h" },
  });
  
  if (error) {
    console.error("Failed to fetch today's sensor data:", error);
    throw new Error("Failed to fetch today's sensor data");
  }
  
  return data || [];
}

/**
 * Fetch weekly overview data
 * Endpoint: sensors-history?range=7d
 */
export async function fetchWeeklySensorData(): Promise<WeeklyDataPoint[]> {
  const { data, error } = await supabase.functions.invoke("sensors-history", {
    body: { range: "7d" },
  });
  
  if (error) {
    console.error("Failed to fetch weekly data:", error);
    throw new Error("Failed to fetch weekly data");
  }
  
  // Group by day for weekly overview
  const dailyData: { [key: string]: { moisture: number[]; light: number[] } } = {};
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  (data || []).forEach((point: TimeSeriesPoint) => {
    const date = new Date();
    const dayName = days[date.getDay()];
    
    if (!dailyData[dayName]) {
      dailyData[dayName] = { moisture: [], light: [] };
    }
    
    if (point.moisture !== undefined) dailyData[dayName].moisture.push(point.moisture);
    if (point.light !== undefined) dailyData[dayName].light.push(point.light);
  });
  
  return Object.entries(dailyData).map(([day, values]) => ({
    day,
    moisture: values.moisture.length > 0 
      ? Math.round(values.moisture.reduce((a, b) => a + b, 0) / values.moisture.length) 
      : 50,
    light: values.light.length > 0 
      ? Math.round(values.light.reduce((a, b) => a + b, 0) / values.light.length) 
      : 500,
  }));
}

/**
 * Fetch quick stats for dashboard
 * Endpoint: stats
 */
export async function fetchQuickStats(): Promise<QuickStats> {
  const { data, error } = await supabase.functions.invoke("stats");
  
  if (error) {
    console.error("Failed to fetch stats:", error);
    throw new Error("Failed to fetch stats");
  }
  
  return data;
}

/**
 * Fetch recent alerts
 * Endpoint: alerts
 */
export async function fetchAlerts(): Promise<Alert[]> {
  const { data, error } = await supabase.functions.invoke("alerts");
  
  if (error) {
    console.error("Failed to fetch alerts:", error);
    throw new Error("Failed to fetch alerts");
  }
  
  return data || [];
}

/**
 * Fetch water prediction
 * Endpoint: predict-water
 */
export async function fetchWaterPrediction(): Promise<WaterPrediction> {
  const { data, error } = await supabase.functions.invoke("predict-water");
  
  if (error) {
    console.error("Failed to fetch water prediction:", error);
    throw new Error("Failed to fetch water prediction");
  }
  
  return data;
}

/**
 * Fetch zone statuses
 * Endpoint: zones
 */
export async function fetchZones(): Promise<ZoneStatus[]> {
  const { data, error } = await supabase.functions.invoke("zones");
  
  if (error) {
    console.error("Failed to fetch zones:", error);
    throw new Error("Failed to fetch zones");
  }
  
  return data || [];
}

/**
 * Fetch weather forecast
 * Note: This would typically integrate with a weather API
 * For now, returns mock data
 */
export async function fetchWeatherForecast(): Promise<WeatherDay[]> {
  // TODO: Integrate with actual weather API
  return [
    { day: "Today", icon: "☀️", temp: "28°C", humidity: "65%", rain: "10%" },
    { day: "Tomorrow", icon: "🌤️", temp: "26°C", humidity: "70%", rain: "20%" },
    { day: "Wed", icon: "🌧️", temp: "24°C", humidity: "85%", rain: "80%" },
    { day: "Thu", icon: "⛈️", temp: "22°C", humidity: "90%", rain: "95%" },
    { day: "Fri", icon: "🌤️", temp: "25°C", humidity: "75%", rain: "30%" },
  ];
}

/**
 * Analyze plant image for disease detection
 * Endpoint: predict-disease
 * 
 * @param imageFile - Image file (from ESP32 CAM or manual upload)
 */
export async function detectDisease(imageFile: File | Blob): Promise<DiseaseDetectionResult> {
  // Convert file to base64
  const arrayBuffer = await imageFile.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const imageBase64 = btoa(binary);
  
  const { data, error } = await supabase.functions.invoke("predict-disease", {
    body: { image_base64: imageBase64 },
  });
  
  if (error) {
    console.error("Failed to analyze image:", error);
    throw new Error("Failed to analyze image");
  }
  
  return data;
}

/**
 * Capture snapshot from ESP32 CAM
 * Note: This requires direct connection to ESP32
 */
export async function captureESP32Snapshot(ipAddress: string): Promise<Blob> {
  // Direct connection to ESP32 CAM
  const response = await fetch(`http://${ipAddress}/capture`);
  if (!response.ok) throw new Error("Failed to capture from ESP32 CAM");
  return response.blob();
}

/**
 * Test ESP32 CAM connection
 */
export async function testESP32Connection(ipAddress: string): Promise<boolean> {
  try {
    const response = await fetch(`http://${ipAddress}/`, { 
      method: "HEAD",
      mode: "no-cors",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Trigger manual watering
 * Endpoint: water-trigger
 */
export async function triggerWatering(zoneId: number): Promise<void> {
  const { error } = await supabase.functions.invoke("water-trigger", {
    body: { zone_id: zoneId },
  });
  
  if (error) {
    console.error("Failed to trigger watering:", error);
    throw new Error("Failed to trigger watering");
  }
}

/**
 * Ingest sensor data (for ESP32/IoT devices)
 * Endpoint: sensors-ingest
 */
export async function ingestSensorData(data: {
  device_id: string;
  temperature: number;
  humidity: number;
  soil_moisture: number;
  light_intensity: number;
  co2_level?: number;
}): Promise<void> {
  const { error } = await supabase.functions.invoke("sensors-ingest", {
    body: data,
  });
  
  if (error) {
    console.error("Failed to ingest sensor data:", error);
    throw new Error("Failed to ingest sensor data");
  }
}
