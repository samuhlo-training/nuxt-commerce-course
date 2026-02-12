import z from "zod";
import prisma from "~~/lib/prisma";

/**
 * █ [API] :: PRODUCT_REVIEW_POST
 * =====================================================================
 * DESC:   Submit a new product review.
 * META:   - Validates input
 *         - Checks if user is logged in
 *         - Checks for existing review (one per user per product)
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ VALIDATION SCHEMA
// =============================================================================
const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string(),
  userTitle: z.string(),
});

export default defineEventHandler(async (event) => {
  // ===========================================================================
  // █ BODY & PARAMS
  // ===========================================================================
  const body = await readValidatedBody(event, bodySchema.parse);
  const slug = getRouterParam(event, "slug");

  // ===========================================================================
  // █ AUTHENTICATION
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
  // █ PRODUCT CHECK
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
  // █ DUPLICATE CHECK
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
  // █ CREATE REVIEW
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
