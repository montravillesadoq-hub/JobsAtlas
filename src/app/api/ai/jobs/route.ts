import { NextRequest, NextResponse } from "next/server";
import { analyzeJobOffer, askJobAssistant, compareJobs, recommendJobs, translateJob } from "@/lib/ai/job-intelligence";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = applyRateLimit(request, { keyPrefix: "ai-jobs", limit: 20 });

  if (limited) {
    return limited;
  }

  const body = await request.json().catch(() => ({}));
  const action = body.action || "analyze";

  if (action === "recommend") {
    const result = await recommendJobs(body.profile || {}, body.locale);
    return NextResponse.json({ ...result, result: result.data });
  }

  if (action === "compare") {
    const result = await compareJobs(body.jobs || [], body.locale);
    return NextResponse.json({ ...result, result: result.data });
  }

  if (action === "translate") {
    const result = await translateJob(body.job, body.language || "français");
    return NextResponse.json({ ...result, result: result.data });
  }

  if (action === "chat") {
    const result = await askJobAssistant(body.question || "", body.job, body.locale);
    return NextResponse.json({ ...result, result: result.data });
  }

  const result = await analyzeJobOffer(body.job || body, body.locale);
  return NextResponse.json({ ...result, result: result.data });
}
