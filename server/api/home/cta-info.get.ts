/**
 * █ [API] :: HOME_CTA_INFO
 * =====================================================================
 * DESC:   Obtiene información de la sección CTA.
 * META:   - Contenido estático (mocked)
 * STATUS: ESTABLE
 * =====================================================================
 */
export default defineEventHandler((event) => {
  return {
    message: "Confiado y respaldado por nuestra increíble comunidad",
    description:
      "Hemos establecido una asociación sólida y duradera. Su confianza es el motor que nos impulsa hacia el éxito compartido.",
  };
});
