import prisma from "~~/lib/prisma";
import { z } from "zod";

interface FileData {
  name: string;
  type: string;
  data: Buffer;
}

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
  const files: FileData[] = [];

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "There is no data inside the body",
    });
  }

  //Procesar los archivos
  console.log({ formData });

  let dataString = "";

  for (const part of formData) {
    if (part.name === "data" && part.data) {
      dataString = part.data.toString("utf-8");
      console.log({ dataString });
    }
    //Leer archivos
    if (part.name === "files" && part.filename) {
      files.push({
        name: part.filename,
        type: part.type || "application/octet-stream",
        data: part.data,
      });
    }
  }

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

  // Enviar los archivos al Cloud
  if (files.length > 0) {
    const uploadFiles = await Promise.all(
      files.map(async (file) => {
        const url = await fileUpload(file.data);
        return url;
      }),
    );
    body.data.images = [...body.data.images, ...uploadFiles];
    //body.data.images = body.data.images.concat(uploadFiles)
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
  };
});
