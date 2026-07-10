import { NextRequest, NextResponse } from "next/server";
import { askCareerAssistant } from "@/lib/ai/document-intelligence";
import { askJobAssistant } from "@/lib/ai/job-intelligence";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = applyRateLimit(request, { keyPrefix: "ai-assistant", limit: 20 });

  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => ({}));
  const mode = body.mode || "career";

  if (mode === "job") {
    const result = await askJobAssistant(body.question || "", body.job, body.locale);
    return NextResponse.json({ ...result, result: result.data });
  }

  const result = await askCareerAssistant(body.question || "", body.context, body.locale);
  return NextResponse.json({ ...result, result: result.data });
}
