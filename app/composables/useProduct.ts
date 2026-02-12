/**
 * █ [COMPOSABLE] :: USE_PRODUCT
 * =====================================================================
 * DESC:   Fetches a single product by slug.
 * META:   - Encapsulates useFetch for product detail
 * STATUS: STABLE
 * =====================================================================
 */
export const useProduct = async (slug: string) => {
  // ===========================================================================
  // █ DATA FETCHING
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
