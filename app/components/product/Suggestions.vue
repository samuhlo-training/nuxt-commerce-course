<script setup lang="ts">
/**
 * █ [PRODUCT] :: SUGGESTIONS
 * =====================================================================
 * DESC:   Related products suggestions.
 *         Fetches and displays suggested products grid.
 * STATUS: STABLE
 * =====================================================================
 */

import { ProductSuggestions, USkeleton, ProductsGrid, ClientOnly } from '../../../.nuxt/components';

// =============================================================================
// █ CORE: PROPS
// =============================================================================
const props = defineProps<{
    slug: string;
}>();

const slug = props.slug;

// =============================================================================
// █ CORE: DATA FETCHING
// =============================================================================
const { data: productSuggestions, status } = useLazyFetch<Product[]>(`/api/product/${slug}/suggestions`, {
    server: false,
    cache: 'force-cache',
});
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENT: SUGGESTIONS -->
    <!-- ======================================================================= -->
    <ClientOnly>
        <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <USkeleton class="w-full h-52 rounded-md mb-4" />
            <USkeleton class="w-full h-52 rounded-md mb-4" />
            <USkeleton class="w-full h-52 rounded-md mb-4" />
        </div>
        <ProductsGrid v-else :products="productSuggestions || []" />
    </ClientOnly>
</template>