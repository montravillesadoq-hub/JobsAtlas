import { NextRequest, NextResponse } from "next/server";
import { generateCv, improveImportedCv } from "@/lib/ai/document-intelligence";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = applyRateLimit(request, { keyPrefix: "ai-cv", limit: 15 });

  if (limited) {
    return limited;
  }

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("cv");
    const targetRole = String(formData.get("targetRole") || "");
    const locale = String(formData.get("locale") || "");
    const fileName = file instanceof File ? file.name : "cv-importé";
    const result = await improveImportedCv(fileName, targetRole, locale);

    return NextResponse.json({
      ...result,
      result: result.data,
    });
  }

  const body = await request.json().catch(() => ({}));
  const result = await generateCv({
    form: body,
    country: body.country,
    language: body.locale,
    template: body.template,
  });

  return NextResponse.json({
    ...result,
    result: result.data,
  });
}
