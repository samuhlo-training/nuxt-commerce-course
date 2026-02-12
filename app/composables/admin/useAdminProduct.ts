/**
 * █ [COMPOSABLE] :: ADMIN_PRODUCT
 * =====================================================================
 * DESC:   Manages admin product data and operations.
 * META:   - Fetches product details
 *         - Handles create/update logic (merged)
 *         - Manages file uploads within formData
 * STATUS: STABLE
 * =====================================================================
 */
export const useAdminProduct = async (id: string) => {
  // ===========================================================================
  // █ DATA FETCHING
  // ===========================================================================
  const { data, error, status, execute, refresh, pending } = await useFetch(
    `/api/admin/product/${id}`,
  );
  // ===========================================================================
  // █ ACTIONS
  // ===========================================================================
  const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
    const isCreating = data.id === 0;

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    //Si hay archivos cargalos
    if (files) {
      files.forEach((file) => {
        formData.append("files", file); // files : [file1, file2, file3]
      });
    }
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

  // ===========================================================================
  // █ EXPOSE
  // ===========================================================================
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
