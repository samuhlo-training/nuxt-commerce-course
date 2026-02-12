/**
 * █ [COMPOSABLE] :: USE_PRODUCT
 * =====================================================================
 * DESC:   Obtiene un producto único por slug.
 * META:   - Encapsula useFetch para detalle de producto
 * STATUS: ESTABLE
 * =====================================================================
 */
export const useProduct = async (slug: string) => {
  // ===========================================================================
  // █ OBTENCIÓN DE DATOS
  // ===========================================================================
  const { data, error, status, clear, execute, refresh, pending } =
    await useFetch(`/api/product/${slug}`);

  return {
    data,
    product: data,
    error,
    status,
    clear,
    execute,
    refresh,
    pending,
  };
};
