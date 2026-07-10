export function parseJsonResponse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      return fallback;
    }

    try {
      return JSON.parse(match[0]) as T;
    } catch {
      return fallback;
    }
  }
}
