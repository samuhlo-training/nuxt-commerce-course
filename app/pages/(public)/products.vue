<script setup lang="ts">
/**
 * █ [PAGE] :: PRODUCTS_LIST_PUBLIC
 * =====================================================================
 * DESC:   Catálogo de productos específico público.
 * PATH:   /products
 * META:   - Obtiene productos paginados (vista pública)
 * STATUS: ESTABLE
 * =====================================================================
 */

// =============================================================================
// █ OBTENCIÓN DE DATOS
// =============================================================================
const { products, total, currentPage, perPage } = await usePaginatedProducts();
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ PÁGINA: LISTA_DE_PRODUCTOS_PÚBLICA -->
  <!-- ======================================================================= -->
  <UPageCTA orientation="horizontal" title="Productos" description="Descubre nuestros productos y servicios.">
    <template #default>
      <div class="flex items-center justify-center">
        <UIcon name="i-lucide-box" :size="150" />
      </div>
    </template>
  </UPageCTA>

  <div class="mt-10" />

  <!-- ======================================================================= -->
  <!-- █ CUADRÍCULA DE PRODUCTOS -->
  <!-- ======================================================================= -->
  <ProductsGrid :products="products || []" />

  <!-- ======================================================================= -->
  <!-- █ PAGINACIÓN -->
  <!-- ======================================================================= -->
  <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />
</template>

<style scoped></style>