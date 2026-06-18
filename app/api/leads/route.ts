import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface LeadRequest {
  name: string;
  phone: string;
  requestedService?: string;
  message?: string;
  sessionId?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, requestedService, message, sessionId } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "name and phone are required" },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // Graceful fallback — chatbot still works without DB configured
    console.warn("Supabase not configured, lead not saved:", { name, phone });
    return NextResponse.json({ success: true });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      phone: phone.trim(),
      requested_service: requestedService?.trim() ?? null,
      message: message?.trim() ?? null,
      session_id: sessionId ?? null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      // Don't fail the UX — lead may still be logged elsewhere
    }
  } catch (err) {
    console.error("Lead save error:", err);
  }

  return NextResponse.json({ success: true });
}
