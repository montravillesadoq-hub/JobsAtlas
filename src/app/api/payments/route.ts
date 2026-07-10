import { NextRequest, NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = applyRateLimit(request, { keyPrefix: "payments", limit: 10 });

  if (limited) {
    return limited;
  }

  const formData = await request.formData();
  const plan = String(formData.get("plan") || "");
  const email = String(formData.get("email") || "");
  const receipt = formData.get("receipt");

  if (!plan || !email || !(receipt instanceof File)) {
    return NextResponse.json({ error: "Plan, email et reçu sont obligatoires." }, { status: 400 });
  }

  return NextResponse.json({
    status: "pending",
    message: "Reçu enregistré en attente de validation administrateur. Configurez Supabase Storage pour conserver le fichier en production.",
    payment: {
      plan,
      email,
      receiptName: receipt.name,
      receiptSize: receipt.size,
    },
  });
}
