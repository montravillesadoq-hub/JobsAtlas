import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { mockCvSummary } from "@/lib/mock-data";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("cvs").select("*").limit(1).single();

    if (error) {
      return NextResponse.json({ cv: mockCvSummary, source: "mock" });
    }

    return NextResponse.json({ cv: data, source: "supabase" });
  } catch {
    return NextResponse.json({ cv: mockCvSummary, source: "mock" });
  }
}
