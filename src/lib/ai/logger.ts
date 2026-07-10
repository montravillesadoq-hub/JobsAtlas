import type { AiProviderName } from "@/lib/ai/types";

type AiLogPayload = {
  provider: AiProviderName | "fallback";
  task: string;
  status: "success" | "error" | "cache";
  durationMs?: number;
  error?: string;
};

export function logAiEvent(payload: AiLogPayload) {
  const safePayload = {
    ...payload,
    error: payload.error ? payload.error.slice(0, 240) : undefined,
    at: new Date().toISOString(),
  };

  if (payload.status === "error") {
    console.error("[JobsAtlas AI]", safePayload);
    return;
  }

  console.info("[JobsAtlas AI]", safePayload);
}
