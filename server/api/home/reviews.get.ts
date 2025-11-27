import prisma from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
  const reviews = await prisma.siteReviews.findMany({
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
