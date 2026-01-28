export const useAdminProduct = async (id: string) => {
  const { data, error, status, execute, refresh, pending } = await useFetch(
    `/api/admin/product/${id}`,
  );
  const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
    const isCreating = data.id === 0;

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Crear producto
    if (isCreating) {
      const { product } = await $fetch("/api/admin/product", {
        method: "POST",
        body: data,
      });
      return product;
    }
    // Actualizar producto
    try {
      const { product } = await $fetch(`/api/admin/product/${id}`, {
        method: "PATCH",
        body: formData,
      });
      return product;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return {
    data,
    error,
    status,
    execute,
    refresh,
    pending,

    //Metodos
    createOrUpdate,
  };
};
