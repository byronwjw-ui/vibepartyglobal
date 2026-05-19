export function randomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
export function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
export function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr]; const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) { const idx = Math.floor(Math.random() * copy.length); out.push(copy.splice(idx, 1)[0]); }
  return out;
}
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function randomInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
