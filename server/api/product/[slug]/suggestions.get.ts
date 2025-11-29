import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event, "slug");

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Producto no encontrado con ${slug}`,
      data: {
        slug,
        state: process.env.STAGE,
      },
      stack: process.env.STAGE !== "prod" ? new Error().stack : "",
    });
  }

  const suggestions = await prisma.product.findMany({
    where: {
      tags: {
        hasSome: product.tags,
      },
      NOT: {
        id: product.id,
      },
    },
    take: 3,
  });

  return suggestions;
});
