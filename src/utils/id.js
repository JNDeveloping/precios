// Genera IDs estables sin depender de crypto.randomUUID, que puede fallar en algunos navegadores/localhosts.
export function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `poster-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
