import { createCacheKey, getCachedValue, setCachedValue } from "@/lib/ai/cache";
import { logAiEvent } from "@/lib/ai/logger";
import type { AiCallOptions, AiCallResult } from "@/lib/ai/types";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function callGemini(options: AiCallOptions): Promise<AiCallResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const cacheKey = options.cacheKey || createCacheKey(["gemini", model, options.task, options.prompt, options.system]);
  const cached = getCachedValue<string>(cacheKey);

  if (cached) {
    logAiEvent({ provider: "gemini", task: options.task, status: "cache" });
    return { provider: "gemini", model, cached: true, data: cached };
  }

  if (!apiKey) {
    return {
      provider: "fallback",
      model: "local-fallback",
      cached: false,
      data: "",
    };
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: options.system
          ? {
              parts: [{ text: options.system }],
            }
          : undefined,
        contents: [
          {
            role: "user",
            parts: [{ text: options.prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.25,
          responseMimeType: options.responseFormat === "json" ? "application/json" : "text/plain",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error ${response.status}`);
    }

    const payload = (await response.json()) as GeminiResponse;
    const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() || "";
    setCachedValue(cacheKey, text);
    logAiEvent({ provider: "gemini", task: options.task, status: "success", durationMs: Date.now() - startedAt });
    return { provider: "gemini", model, cached: false, data: text };
  } catch (error) {
    logAiEvent({
      provider: "gemini",
      task: options.task,
      status: "error",
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "Unknown Gemini error",
    });
    throw error;
  }
}
