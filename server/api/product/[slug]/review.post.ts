import z from "zod";
import prisma from "~~/lib/prisma";

/**
 * █ [API] :: PRODUCT_REVIEW_POST
 * =====================================================================
 * DESC:   Envía una nueva reseña de producto.
 * META:   - Valida la entrada
 *         - Comprueba si el usuario ha iniciado sesión
 *         - Comprueba si existe una reseña (una por usuario por producto)
 * STATUS: ESTABLE
 * =====================================================================
 */

// =============================================================================
// █ ESQUEMA DE VALIDACIÓN
// =============================================================================
const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string(),
  userTitle: z.string(),
});

export default defineEventHandler(async (event) => {
  // ===========================================================================
  // █ CUERPO Y PARÁMETROS
  // ===========================================================================
  const body = await readValidatedBody(event, bodySchema.parse);
  const slug = getRouterParam(event, "slug");

  // ===========================================================================
  // █ AUTENTICACIÓN
  // ===========================================================================
  const session = await requireUserSession(event);
  const userId = session.user.id;

  if (!session.user.name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad request",
    });
  }

  // ===========================================================================
  // █ VERIFICACIÓN DE PRODUCTO
  // ===========================================================================
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  // ===========================================================================
  // █ VERIFICACIÓN DE DUPLICADOS
  // ===========================================================================
  // Usuario no tiene reseñas sobre este producto
  const existingReview = await prisma.productReview.findFirst({
    where: {
      product: {
        slug: slug,
      },
      userId: Number(userId),
    },
  });

  if (existingReview) {
    throw createError({
      statusCode: 400,
      statusMessage: "You have already posted a review for this product",
    });
  }

  console.log({ userId });

  // ===========================================================================
  // █ CREAR RESEÑA
  // ===========================================================================
  const review = await prisma.productReview.create({
    data: {
      name: session.user.name,
      rating: body.rating,
      review: body.review,
      userTitle: body.userTitle,
      productId: product.id,
      userId: Number(userId),
    },
  });

  return review;
});
