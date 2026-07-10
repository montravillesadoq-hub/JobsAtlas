import { NextRequest, NextResponse } from "next/server";
import { generateLetter } from "@/lib/ai/document-intelligence";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = applyRateLimit(request, { keyPrefix: "ai-letter", limit: 15 });

  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => ({}));
  const result = await generateLetter({
    form: body,
    job: {
      title: body.role,
      company: body.company,
      description: body.job || "",
    },
    profile: {
      cvSummary: body.cv,
    },
    country: body.country,
    language: body.locale,
    tone: body.tone,
  });

  return NextResponse.json({
    ...result,
    result: result.data,
  });
}
