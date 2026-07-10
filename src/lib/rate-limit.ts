import { NextRequest, NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function applyRateLimit(
  request: NextRequest,
  options: { keyPrefix: string; limit?: number; windowMs?: number }
) {
  const limit = options.limit ?? 30;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  const key = `${options.keyPrefix}:${ip}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;

  if (current.count <= limit) {
    return null;
  }

  return NextResponse.json(
    { error: "Trop de requetes. Reessayez dans quelques instants." },
    {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((current.resetAt - now) / 1000)),
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": "0",
      },
    }
  );
}
