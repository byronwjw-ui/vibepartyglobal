export function isBrowser() { return typeof window !== 'undefined'; }
export function loadJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try { const raw = window.localStorage.getItem(key); if (!raw) return fallback; return JSON.parse(raw) as T; } catch { return fallback; }
}
export function saveJSON<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
export function removeKey(key: string) {
  if (!isBrowser()) return;
  try { window.localStorage.removeItem(key); } catch {}
}
export function clearAll(prefix = 'vibeparty.') {
  if (!isBrowser()) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i); if (k && k.startsWith(prefix)) keys.push(k);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch {}
}
