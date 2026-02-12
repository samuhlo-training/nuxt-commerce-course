<script setup lang="ts">
/**
 * █ [PRODUCTS] :: GRID
 * =====================================================================
 * DESC:   Diseño de cuadrícula adaptable para tarjetas de productos.
 * STATUS: ESTABLE
 * =====================================================================
 */

defineProps<{
    products: Product[];
}>();
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENTE: CUADRÍCULA DE PRODUCTOS -->
    <!-- ======================================================================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>