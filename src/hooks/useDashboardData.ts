/**
 * Custom hooks for fetching dashboard data from backend APIs
 * 
 * These hooks handle loading states, error states, and data caching
 * using React Query for optimal performance and UX.
 */

import { useQuery } from "@tanstack/react-query";
import {
  fetchSensorData,
  fetchTodaySensorData,
  fetchWeeklySensorData,
  fetchQuickStats,
  fetchAlerts,
  fetchWaterPrediction,
  fetchZones,
  fetchWeatherForecast,
  type SensorData,
  type TimeSeriesPoint,
  type WeeklyDataPoint,
  type QuickStats,
  type Alert,
  type WaterPrediction,
  type ZoneStatus,
  type WeatherDay,
} from "@/services/api";

// ============================================
// Dashboard Home Hooks
// ============================================

/**
 * Fetch current sensor readings for metric cards
 * Maps to: Soil Moisture, Temperature, Light Level, Humidity cards
 */
export function useSensorData() {
  return useQuery<SensorData>({
    queryKey: ["sensorData"],
    queryFn: fetchSensorData,
    refetchInterval: 30000, // Refresh every 30 seconds for live data
    retry: 2,
  });
}

/**
 * Fetch today's time-series data for the "Today's Readings" chart
 * Maps to: ComposedChart showing moisture & temperature
 */
export function useTodaySensorData() {
  return useQuery<TimeSeriesPoint[]>({
    queryKey: ["todaySensorData"],
    queryFn: fetchTodaySensorData,
    refetchInterval: 60000, // Refresh every minute
    retry: 2,
  });
}

/**
 * Fetch weekly overview data for the "Weekly Overview" chart
 * Maps to: BarChart showing moisture & light levels
 */
export function useWeeklySensorData() {
  return useQuery<WeeklyDataPoint[]>({
    queryKey: ["weeklySensorData"],
    queryFn: fetchWeeklySensorData,
    refetchInterval: 300000, // Refresh every 5 minutes
    retry: 2,
  });
}

/**
 * Fetch quick stats for the dashboard sidebar
 * Maps to: Active Sensors, Plants Monitored, Avg Soil Moisture, Water Saved
 */
export function useQuickStats() {
  return useQuery<QuickStats>({
    queryKey: ["quickStats"],
    queryFn: fetchQuickStats,
    refetchInterval: 60000,
    retry: 2,
  });
}

/**
 * Fetch recent alerts
 * Maps to: Recent Alerts section
 */
export function useAlerts() {
  return useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    refetchInterval: 30000,
    retry: 2,
  });
}

// ============================================
// Water Prediction Hooks
// ============================================

/**
 * Fetch water prediction data
 * Maps to: Next watering hero card (hours, minutes, confidence, zone)
 */
export function useWaterPrediction() {
  return useQuery<WaterPrediction>({
    queryKey: ["waterPrediction"],
    queryFn: fetchWaterPrediction,
    refetchInterval: 60000,
    retry: 2,
  });
}

/**
 * Fetch zone statuses
 * Maps to: Zone Status section
 */
export function useZones() {
  return useQuery<ZoneStatus[]>({
    queryKey: ["zones"],
    queryFn: fetchZones,
    refetchInterval: 60000,
    retry: 2,
  });
}

/**
 * Fetch weather forecast
 * Maps to: Weather Forecast bar
 */
export function useWeatherForecast() {
  return useQuery<WeatherDay[]>({
    queryKey: ["weatherForecast"],
    queryFn: fetchWeatherForecast,
    refetchInterval: 300000, // Refresh every 5 minutes
    retry: 2,
  });
}
