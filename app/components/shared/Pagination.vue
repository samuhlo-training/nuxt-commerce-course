<script setup lang="ts">
/**
 * █ [SHARED] :: PAGINATION
 * =====================================================================
 * DESC:   Pagination component that syncs with URL query params.
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
    total: number;
    modelValue: number;
    perPage: number;
}>();

// =============================================================================
// █ CORE: DEPENDENCIES & STATE
// =============================================================================
const router = useRouter();
const route = useRoute();

const currentPage = computed(() => {
    return parseInt(route.query.page as string) || 1;
});

// =============================================================================
// █ INTERACTION: HANDLERS
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
    <!-- █ COMPONENT: PAGINATION -->
    <!-- ======================================================================= -->
    <div class="flex items-center justify-center my-10 ">
        <UPagination :total="total" :page="currentPage" :per-page="perPage" :items-per-page="perPage" show-edges
            :ui="ui" @update:page="handlePageUpdate" />
    </div>
</template>