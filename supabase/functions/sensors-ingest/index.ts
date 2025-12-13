import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * POST /sensors-ingest
 * Ingests sensor data from ESP32/IoT devices
 * 
 * Body: {
 *   device_id: string,
 *   temperature: number,
 *   humidity: number,
 *   soil_moisture: number,
 *   light_intensity: number,
 *   co2_level?: number
 * }
 */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body = await req.json();
    console.log("Received sensor data:", body);

    // Validate required fields
    const { device_id, temperature, humidity, soil_moisture, light_intensity, co2_level } = body;
    
    if (!device_id || temperature === undefined || humidity === undefined || 
        soil_moisture === undefined || light_intensity === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert sensor reading
    const { data, error } = await supabase
      .from("sensor_readings")
      .insert({
        device_id,
        temperature,
        humidity,
        soil_moisture,
        light_intensity,
        co2_level: co2_level ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sensor data stored successfully:", data.id);

    // Check thresholds and create alerts if needed
    if (soil_moisture < 30) {
      await supabase.from("alerts").insert({
        type: "warning",
        message: `Low soil moisture (${soil_moisture}%) detected on ${device_id}`,
      });
    }

    if (temperature > 35) {
      await supabase.from("alerts").insert({
        type: "warning",
        message: `High temperature (${temperature}°C) detected on ${device_id}`,
      });
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing sensor data:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
