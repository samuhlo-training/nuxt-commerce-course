<script setup lang="ts">
/**
 * █ [SHARED] :: PAGINATION
 * =====================================================================
 * DESC:   Componente de paginación que se sincroniza con los parámetros de consulta de la URL.
 * STATUS: ESTABLE
 * =====================================================================
 */

// =============================================================================
// █ NÚCLEO: PROPS
// =============================================================================
defineProps<{
    total: number;
    modelValue: number;
    perPage: number;
}>();

// =============================================================================
// █ NÚCLEO: DEPENDENCIAS Y ESTADO
// =============================================================================
const router = useRouter();
const route = useRoute();

const currentPage = computed(() => {
    return parseInt(route.query.page as string) || 1;
});

// =============================================================================
// █ INTERACCIÓN: MANEJADORES
// =============================================================================
const handlePageUpdate = (page: number) => {
    router.push({ query: { ...route.query, page: page.toString() } });
};

const ui = {
    item: 'cursor-pointer'
};
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENTE: PAGINACIÓN -->
    <!-- ======================================================================= -->
    <div class="flex items-center justify-center my-10 ">
        <UPagination :total="total" :page="currentPage" :per-page="perPage" :items-per-page="perPage" show-edges
            :ui="ui" @update:page="handlePageUpdate" />
    </div>
</template>