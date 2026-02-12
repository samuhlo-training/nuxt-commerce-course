/**
 * █ [COMPOSABLE] :: PAGINATED_PRODUCTS
 * =====================================================================
 * DESC:   Obtiene productos con soporte de paginación.
 * META:   - Sincroniza con parámetros de consulta URL (página, límite)
 *         - Desplazamientos computados
 * STATUS: ESTABLE
 * =====================================================================
 */
export const usePaginatedProducts = async () => {
  // ===========================================================================
  // █ DEPENDENCIAS
  // ===========================================================================
  const route = useRoute();

  // ===========================================================================
  // █ ESTADO COMPUTADO
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
  // █ OBTENCIÓN DE DATOS
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
  // █ EXPONER
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
