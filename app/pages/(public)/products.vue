<script setup lang="ts">
/**
 * █ [PAGE] :: PRODUCTS_LIST_PUBLIC
 * =====================================================================
 * DESC:   Public specific products catalog.
 * PATH:   /products
 * META:   - Fetches paginated products (public view)
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ DATA FETCHING
// =============================================================================
const { products, total, currentPage, perPage } = await usePaginatedProducts();
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ PAGE: PRODUCTS_LIST_PUBLIC -->
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
  <!-- █ PRODUCTS GRID -->
  <!-- ======================================================================= -->
  <ProductsGrid :products="products || []" />

  <!-- ======================================================================= -->
  <!-- █ PAGINATION -->
  <!-- ======================================================================= -->
  <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />
</template>

<style scoped></style>