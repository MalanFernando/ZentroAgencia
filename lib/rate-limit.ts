type Bucket = { count: number; resetAt: number };

// En memoria: se reinicia con el servidor y no se comparte entre instancias.
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function checkRateLimit(key: string): { ok: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}
