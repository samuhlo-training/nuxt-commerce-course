/**
 * █ [COMPOSABLE] :: PAGINATED_PRODUCTS
 * =====================================================================
 * DESC:   Fetches products with pagination support.
 * META:   - Syncs with URL query params (page, limit)
 *         - Computed offsets
 * STATUS: STABLE
 * =====================================================================
 */
export const usePaginatedProducts = async () => {
  // ===========================================================================
  // █ DEPENDENCIES
  // ===========================================================================
  const route = useRoute();

  // ===========================================================================
  // █ COMPUTED STATE
  // ===========================================================================
  const page = computed(() => {
    const pageParam = route.query.page as string;
    return isNaN(+pageParam) ? 1 : +pageParam;
  });

  const limit = computed(() => {
    const limitParam = route.query.limit as string;
    return isNaN(+limitParam) ? 10 : +limitParam;
  });

  const offset = computed(() => {
    return (page.value - 1) * limit.value;
  });

  // ===========================================================================
  // █ DATA FETCHING
  // ===========================================================================
  const { data, error, status, execute, pending } = await useFetch(
    "/api/products",
    {
      query: {
        limit,
        offset,
      },

      watch: [page, limit],
    },
  );

  // ===========================================================================
  // █ EXPOSE
  // ===========================================================================
  return {
    data, // Reactiva

    products: computed(() => data.value?.products || []),
    totalPages: computed(() => data.value?.totalPages || 0),
    currentPage: computed(() => data.value?.currentPage || 1),
    perPage: computed(() => data.value?.perPage || 10),
    total: computed(() => data.value?.total || 0),

    // Actions
    error,
    status,
    execute,
    pending,
  };
};
