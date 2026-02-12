import prisma from "~~/lib/prisma";

/**
 * █ [API] :: PRODUCT_DETAIL
 * =====================================================================
 * DESC:   Get product details by slug.
 * META:   - Handles 404
 * STATUS: STABLE
 * =====================================================================
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const product = await prisma.product.findUnique({
    where: { slug },
  });

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

  return product;
});
