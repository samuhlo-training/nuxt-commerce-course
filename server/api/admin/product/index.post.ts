import z from "zod";
import prisma from "~~/lib/prisma";

const bodySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * █ [API] :: ADMIN_PRODUCT_CREATE
 * =====================================================================
 * DESC:   Crear nuevo producto.
 * META:   - Lógica de creación básica
 *         - Usa el endpoint PATCH para la subida de archivos
 * STATUS: ESTABLE
 * =====================================================================
 */
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const product = await prisma.product.create({
    data: body,
  });

  return {
    message: "Product created successfully",
    product: product,
  };
});
