import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { mockProfile } from "@/lib/mock-data";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("profiles").select("*").limit(1).single();

    if (error) {
      return NextResponse.json({ profile: mockProfile, source: "mock" });
    }

    return NextResponse.json({ profile: data, source: "supabase" });
  } catch {
    return NextResponse.json({ profile: mockProfile, source: "mock" });
  }
}
