import { ProductSuggestions, USkeleton, ProductsGrid } from '../../../.nuxt/components';
<script setup lang="ts">
const props = defineProps<{
    slug: string;
}>();

const slug = props.slug;

const { data: productSuggestions, status } = useLazyFetch<Product[]>(`/api/product/${slug}/suggestions`, {
    server: false,
    cache: 'force-cache',
});
</script>

<template>
    <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <USkeleton class="w-full h-52 rounded-md mb-4" />
        <USkeleton class="w-full h-52 rounded-md mb-4" />
        <USkeleton class="w-full h-52 rounded-md mb-4" />
    </div>
    <ProductsGrid v-else :products="productSuggestions || []" />
</template>