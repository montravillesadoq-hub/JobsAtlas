import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const locale = body.locale;

  const response = NextResponse.json({
    ok: true,
    locale,
    source: "cookie",
    note: "When Supabase auth is configured, persist this locale in the user's profile row.",
  });

  if (typeof locale === "string") {
    response.cookies.set("jobsatlas-locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}
