import prisma from "~~/lib/prisma";
import { z } from "zod";

const bodySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()).min(0),
  tags: z.array(z.string()).min(0),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "There is no data inside the body",
    });
  }

  //Procesar los archivos
  let dataString = "";

  for (const part of formData) {
    if (part.name === "data" && part.data) {
      dataString = part.data.toString("utf-8");
      console.log({ dataString });
    }
  }
  //Leer archivos

  const body = bodySchema.safeParse(JSON.parse(dataString));

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Check the body of the request",
      data: body.error,
    });
  }

  //Confirmar que el producto exista
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

  const updateProduct = await prisma.product.update({
    where: {
      id: +id,
    },
    data: body.data,
  });

  return {
    message: "Producto actualizado correctamente",
    product: updateProduct,
    files: [],
  };
});
