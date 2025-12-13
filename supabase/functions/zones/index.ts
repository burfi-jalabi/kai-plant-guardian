import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * GET /zones
 * Returns all zones with their current status
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

    // Get zones
    const { data: zones, error } = await supabase
      .from("zones")
      .select("*")
      .order("id");

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    // Get latest sensor reading for moisture levels
    const { data: latestSensor } = await supabase
      .from("sensor_readings")
      .select("soil_moisture")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Get latest water predictions for each zone
    const { data: predictions } = await supabase
      .from("water_predictions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    // Format zones with status
    const formattedZones = (zones || []).map((zone) => {
      const prediction = predictions?.find(p => p.zone_id === zone.id);
      const moisture = latestSensor?.soil_moisture ?? 50;
      
      let status: "urgent" | "normal" | "optimal" = "normal";
      if (moisture < 30) status = "urgent";
      else if (moisture > 60) status = "optimal";

      const nextWaterHours = prediction?.next_watering_hours ?? 6;
      const nextWaterDate = new Date(Date.now() + nextWaterHours * 60 * 60 * 1000);
      const nextWater = nextWaterDate.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit" 
      });

      return {
        id: zone.id,
        name: zone.name,
        next_water: nextWater,
        status,
        moisture,
        soil_type: zone.soil_type,
      };
    });

    console.log(`Returning ${formattedZones.length} zones`);

    return new Response(
      JSON.stringify(formattedZones),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching zones:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
