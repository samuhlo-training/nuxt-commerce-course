import prisma from "../../../lib/prisma";

/**
 * █ [API] :: HOME_REVIEWS
 * =====================================================================
 * DESC:   Fetch latest site reviews.
 * META:   - Limits to 6 recent reviews
 *         - Selects only display fields
 * STATUS: STABLE
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
