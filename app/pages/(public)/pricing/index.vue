<script setup lang="ts">
/**
 * █ [PAGE] :: PRICING
 * =====================================================================
 * DESC:   Pricing information page.
 * PATH:   /pricing
 * META:   - Uses PricingTable component
 * STATUS: STABLE
 * =====================================================================
 */
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ PAGE: PRICING -->
    <!-- ======================================================================= -->
    <UPageCTA orientation="horizontal" title="Información de precios" description="Descubre nuestros precios y planes.">
        <template #default>
            <div class="flex items-center justify-center">
                <UIcon name="i-simple-icons-nuxtdotjs" :size="150" />
            </div>
        </template>
    </UPageCTA>

    <div class="mt-10" />

    <!-- ======================================================================= -->
    <!-- █ PRICING TABLE -->
    <!-- ======================================================================= -->
    <PricingTable />
</template>