/**
 * █ [UTIL] :: SLEEP
 * =====================================================================
 * DESC:   Retardo basado en promesas.
 * META:   - Usado para simular latencia
 * STATUS: ESTABLE
 * =====================================================================
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
