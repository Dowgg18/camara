import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { applicationData } = await req.json();

    if (!applicationData) {
      return new Response(
        JSON.stringify({ error: "Missing application data" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const webhookUrl = "https://webhook.domingoscreative.tech/webhook/associacao";

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "membership_approved",
        timestamp: new Date().toISOString(),
        data: applicationData,
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook failed with status: ${webhookResponse.status}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Webhook sent successfully"
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending webhook:", error);

    return new Response(
      JSON.stringify({ 
        error: "Failed to send webhook",
        details: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
