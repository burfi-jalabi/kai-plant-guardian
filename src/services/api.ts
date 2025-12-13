/**
 * GrowSense AI - Backend API Service
 * 
 * This service handles all API calls to Shivam's FastAPI backend.
 * 
 * BACKEND TEAM: Update the BASE_URL constant below with your actual API endpoint.
 * All endpoints are prefixed with this URL.
 */

// ============================================
// BACKEND TO CONFIRM: Update this URL
// ============================================
const BASE_URL = "http://localhost:8000/api";

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
// API Functions
// ============================================

/**
 * Fetch current sensor readings
 * BACKEND ENDPOINT: GET /api/sensors/current
 */
export async function fetchSensorData(): Promise<SensorData> {
  const response = await fetch(`${BASE_URL}/sensors/current`);
  if (!response.ok) throw new Error("Failed to fetch sensor data");
  return response.json();
}

/**
 * Fetch time-series sensor data for today's graph
 * BACKEND ENDPOINT: GET /api/sensors/today
 */
export async function fetchTodaySensorData(): Promise<TimeSeriesPoint[]> {
  const response = await fetch(`${BASE_URL}/sensors/today`);
  if (!response.ok) throw new Error("Failed to fetch today's sensor data");
  return response.json();
}

/**
 * Fetch weekly overview data
 * BACKEND ENDPOINT: GET /api/sensors/weekly
 */
export async function fetchWeeklySensorData(): Promise<WeeklyDataPoint[]> {
  const response = await fetch(`${BASE_URL}/sensors/weekly`);
  if (!response.ok) throw new Error("Failed to fetch weekly data");
  return response.json();
}

/**
 * Fetch quick stats for dashboard
 * BACKEND ENDPOINT: GET /api/stats
 */
export async function fetchQuickStats(): Promise<QuickStats> {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
}

/**
 * Fetch recent alerts
 * BACKEND ENDPOINT: GET /api/alerts
 */
export async function fetchAlerts(): Promise<Alert[]> {
  const response = await fetch(`${BASE_URL}/alerts`);
  if (!response.ok) throw new Error("Failed to fetch alerts");
  return response.json();
}

/**
 * Fetch water prediction
 * BACKEND ENDPOINT: GET /api/water/prediction
 */
export async function fetchWaterPrediction(): Promise<WaterPrediction> {
  const response = await fetch(`${BASE_URL}/water/prediction`);
  if (!response.ok) throw new Error("Failed to fetch water prediction");
  return response.json();
}

/**
 * Fetch zone statuses
 * BACKEND ENDPOINT: GET /api/zones
 */
export async function fetchZones(): Promise<ZoneStatus[]> {
  const response = await fetch(`${BASE_URL}/zones`);
  if (!response.ok) throw new Error("Failed to fetch zones");
  return response.json();
}

/**
 * Fetch weather forecast
 * BACKEND ENDPOINT: GET /api/weather
 */
export async function fetchWeatherForecast(): Promise<WeatherDay[]> {
  const response = await fetch(`${BASE_URL}/weather`);
  if (!response.ok) throw new Error("Failed to fetch weather");
  return response.json();
}

/**
 * Analyze plant image for disease detection
 * BACKEND ENDPOINT: POST /api/disease/detect
 * 
 * @param imageFile - Image file (from ESP32 CAM or manual upload)
 */
export async function detectDisease(imageFile: File | Blob): Promise<DiseaseDetectionResult> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${BASE_URL}/disease/detect`, {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) throw new Error("Failed to analyze image");
  return response.json();
}

/**
 * Capture snapshot from ESP32 CAM
 * BACKEND ENDPOINT: GET /api/esp32/capture?ip={ip}
 * 
 * BACKEND TO CONFIRM: This may need to be handled differently
 * depending on how ESP32 CAM integration is set up
 */
export async function captureESP32Snapshot(ipAddress: string): Promise<Blob> {
  const response = await fetch(`${BASE_URL}/esp32/capture?ip=${encodeURIComponent(ipAddress)}`);
  if (!response.ok) throw new Error("Failed to capture from ESP32 CAM");
  return response.blob();
}

/**
 * Test ESP32 CAM connection
 * BACKEND ENDPOINT: GET /api/esp32/test?ip={ip}
 */
export async function testESP32Connection(ipAddress: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/esp32/test?ip=${encodeURIComponent(ipAddress)}`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Trigger manual watering
 * BACKEND ENDPOINT: POST /api/water/trigger
 */
export async function triggerWatering(zoneId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/water/trigger`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ zone_id: zoneId }),
  });
  if (!response.ok) throw new Error("Failed to trigger watering");
}
