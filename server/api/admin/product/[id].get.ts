import prisma from "~~/lib/prisma";

/**
 * █ [API] :: ADMIN_PRODUCT_DETAIL
 * =====================================================================
 * DESC:   Get product for admin editing.
 * META:   - Special handling for id="new" (returns empty template)
 * STATUS: STABLE
 * =====================================================================
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;

  if (id === "new") {
    return {
      id: 0,
      slug: "",
      name: "",
      description: "",
      price: 0,
      images: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Product;
  }

  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: `Producto con id ${id} no encontrado`,
    });
  }
  return product;
});
