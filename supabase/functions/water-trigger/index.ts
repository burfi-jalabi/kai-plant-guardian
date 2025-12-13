import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * POST /water-trigger
 * Triggers manual watering for a zone
 * 
 * Body: { zone_id: number }
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

    const { zone_id } = await req.json();

    if (!zone_id) {
      return new Response(
        JSON.stringify({ error: "zone_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Manual watering triggered for zone ${zone_id}`);

    // Get zone info
    const { data: zone } = await supabase
      .from("zones")
      .select("name")
      .eq("id", zone_id)
      .maybeSingle();

    // Update latest prediction to mark as triggered
    await supabase
      .from("water_predictions")
      .update({ was_triggered: true })
      .eq("zone_id", zone_id)
      .order("created_at", { ascending: false })
      .limit(1);

    // Create success alert
    await supabase.from("alerts").insert({
      type: "success",
      message: `Manual watering started for ${zone?.name || `Zone ${zone_id}`}`,
    });

    // Here you would integrate with actual IoT/hardware control
    // For now, we just log and acknowledge

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Watering triggered for zone ${zone_id}`,
        zone_name: zone?.name,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error triggering watering:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
