import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * POST /predict-disease
 * Analyzes plant images for disease detection using AI vision
 * 
 * Body: FormData with 'image' field OR { image_base64: string }
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

    let imageBase64: string | null = null;
    let imageUrl: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // Handle form data with image file
      const formData = await req.formData();
      const imageFile = formData.get("image") as File | null;
      
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        imageBase64 = btoa(String.fromCharCode(...bytes));
      }
    } else {
      // Handle JSON with base64 image
      const body = await req.json();
      imageBase64 = body.image_base64;
      imageUrl = body.image_url;
    }

    if (!imageBase64 && !imageUrl) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing disease detection request...");

    // Use AI vision for disease detection
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
            content: `You are an expert plant pathologist AI. Analyze plant images for diseases.
            Return ONLY a valid JSON object with these exact fields:
            {
              "disease_name": "Disease Name or Healthy",
              "confidence": 85,
              "severity": "low" | "medium" | "high" | null,
              "treatment": "Treatment recommendation or null if healthy",
              "is_healthy": true | false
            }
            
            Common plant diseases to detect:
            - Powdery Mildew, Leaf Blight, Root Rot, Bacterial Spot
            - Mosaic Virus, Anthracnose, Downy Mildew, Rust
            - Nutrient deficiencies (Nitrogen, Iron, etc.)
            
            If the plant appears healthy, set is_healthy: true and disease_name: "Healthy".`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this plant image for any diseases, pests, or health issues. Provide a detailed diagnosis."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl || `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await aiResponse.text();
      console.error("AI API error:", errorText);
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content ?? "";
    
    console.log("AI disease detection response:", aiContent);

    // Parse AI response
    let result;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse AI response:", e);
    }

    const diagnosis = {
      disease_name: result?.disease_name ?? "Unknown",
      confidence: result?.confidence ?? 75,
      severity: result?.severity ?? null,
      treatment: result?.treatment ?? null,
      is_healthy: result?.is_healthy ?? false,
    };

    // Store scan result
    await supabase.from("disease_scans").insert({
      disease_name: diagnosis.disease_name,
      confidence: diagnosis.confidence,
      severity: diagnosis.severity,
      treatment: diagnosis.treatment,
      is_healthy: diagnosis.is_healthy,
      image_url: imageUrl,
    });

    // Create alert if disease detected
    if (!diagnosis.is_healthy && diagnosis.severity !== "low") {
      await supabase.from("alerts").insert({
        type: "warning",
        message: `Disease detected: ${diagnosis.disease_name} (${diagnosis.severity} severity)`,
      });
    }

    console.log("Disease detection result:", diagnosis);

    return new Response(
      JSON.stringify(diagnosis),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Disease detection error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        disease_name: "Analysis Failed",
        confidence: 0,
        is_healthy: false,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
