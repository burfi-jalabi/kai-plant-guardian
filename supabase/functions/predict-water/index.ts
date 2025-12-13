import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * GET/POST /predict-water
 * Uses AI to predict next watering time based on sensor data
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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Get recent sensor readings for context
    const { data: sensorData } = await supabase
      .from("sensor_readings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    // Get zone info
    const { data: zones } = await supabase
      .from("zones")
      .select("*")
      .limit(1);

    const latestReading = sensorData?.[0];
    const zone = zones?.[0];

    // Use AI for intelligent prediction
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an agricultural AI expert specializing in irrigation prediction. 
            Analyze sensor data and provide precise watering recommendations.
            Return ONLY a JSON object with: next_watering_hours (number), confidence (0-100), recommended_amount_liters (number).
            Consider soil moisture levels, temperature, humidity, and typical plant needs.`
          },
          {
            role: "user",
            content: `Current sensor readings:
            - Soil Moisture: ${latestReading?.soil_moisture ?? 50}%
            - Temperature: ${latestReading?.temperature ?? 25}°C
            - Humidity: ${latestReading?.humidity ?? 60}%
            - Light: ${latestReading?.light_intensity ?? 500} lux
            - Zone: ${zone?.name ?? "Default"} (${zone?.soil_type ?? "loamy"} soil, ${zone?.plant_type ?? "mixed"} plants)
            
            Historical trend: ${sensorData?.slice(0, 5).map(s => s.soil_moisture).join(', ')}% (recent to old)
            
            Predict the optimal next watering time.`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", errorText);
      
      // Fallback prediction based on soil moisture
      const moisture = latestReading?.soil_moisture ?? 50;
      const hoursNeeded = moisture < 30 ? 2 : moisture < 50 ? 6 : 12;
      
      return new Response(
        JSON.stringify({
          next_watering_hours: hoursNeeded,
          next_watering_minutes: 0,
          confidence: 70,
          recommended_amount_liters: 2.5,
          zone: zone?.name ?? "Zone A",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content ?? "";
    
    console.log("AI prediction response:", aiContent);

    // Parse AI response
    let prediction;
    try {
      // Extract JSON from response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        prediction = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse AI response:", e);
    }

    const result = {
      next_watering_hours: prediction?.next_watering_hours ?? 6,
      next_watering_minutes: Math.round((prediction?.next_watering_hours % 1) * 60) || 0,
      confidence: prediction?.confidence ?? 85,
      recommended_amount_liters: prediction?.recommended_amount_liters ?? 2.5,
      zone: zone?.name ?? "Zone A",
    };

    // Store prediction
    await supabase.from("water_predictions").insert({
      zone_id: zone?.id ?? 1,
      next_watering_hours: result.next_watering_hours,
      confidence: result.confidence,
      recommended_amount_liters: result.recommended_amount_liters,
    });

    console.log("Water prediction result:", result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Prediction error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        next_watering_hours: 6,
        next_watering_minutes: 0,
        confidence: 50,
        recommended_amount_liters: 2.0,
        zone: "Zone A",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
