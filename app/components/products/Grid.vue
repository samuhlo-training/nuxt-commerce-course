<script setup lang="ts">
/**
 * █ [PRODUCTS] :: GRID
 * =====================================================================
 * DESC:   Responsive grid layout for product cards.
 * STATUS: STABLE
 * =====================================================================
 */

defineProps<{
    products: Product[];
}>();
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENT: PRODUCTS GRID -->
    <!-- ======================================================================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>