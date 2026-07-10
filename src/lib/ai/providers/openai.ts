import { createCacheKey, getCachedValue, setCachedValue } from "@/lib/ai/cache";
import { logAiEvent } from "@/lib/ai/logger";
import type { AiCallOptions, AiCallResult } from "@/lib/ai/types";

type OpenAiResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{ text?: string }>;
  }>;
};

export async function callOpenAI(options: AiCallOptions): Promise<AiCallResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const cacheKey = options.cacheKey || createCacheKey(["openai", model, options.task, options.prompt, options.system]);
  const cached = getCachedValue<string>(cacheKey);

  if (cached) {
    logAiEvent({ provider: "openai", task: options.task, status: "cache" });
    return { provider: "openai", model, cached: true, data: cached };
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
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: options.system || "Tu es l’assistant IA professionnel de JobsAtlas.",
          },
          {
            role: "user",
            content: options.prompt,
          },
        ],
        text: options.responseFormat === "json" ? { format: { type: "json_object" } } : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error ${response.status}`);
    }

    const payload = (await response.json()) as OpenAiResponse;
    const text = payload.output_text || payload.output?.flatMap((item) => item.content || []).map((content) => content.text || "").join("\n").trim() || "";
    setCachedValue(cacheKey, text);
    logAiEvent({ provider: "openai", task: options.task, status: "success", durationMs: Date.now() - startedAt });
    return { provider: "openai", model, cached: false, data: text };
  } catch (error) {
    logAiEvent({
      provider: "openai",
      task: options.task,
      status: "error",
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "Unknown OpenAI error",
    });
    throw error;
  }
}
