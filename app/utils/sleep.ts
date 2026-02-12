/**
 * █ [UTIL] :: SLEEP
 * =====================================================================
 * DESC:   Promise-based delay.
 * META:   - Used for simulating latency
 * STATUS: STABLE
 * =====================================================================
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
