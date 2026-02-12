import prisma from "../../../lib/prisma";

/**
 * █ [API] :: HOME_REVIEWS
 * =====================================================================
 * DESC:   Obtiene las últimas reseñas del sitio.
 * META:   - Limita a 6 reseñas recientes
 *         - Selecciona solo campos de visualización
 * STATUS: ESTABLE
 * =====================================================================
 */
export default defineEventHandler(async (event) => {
  const reviews = await prisma.siteReview.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    select: {
      name: true,
      subtitle: true,
      description: true,
      profileImage: true,
    },
  });
  return reviews;
});
