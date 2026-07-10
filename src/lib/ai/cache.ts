import { createHash } from "crypto";

type CacheEntry = {
  expiresAt: number;
  value: unknown;
};

const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL_MS = 1000 * 60 * 30;

export function createCacheKey(parts: unknown[]) {
  return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}

export function getCachedValue<T>(key: string): T | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.value as T;
}

export function setCachedValue(key: string, value: unknown, ttlMs = DEFAULT_TTL_MS) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}
