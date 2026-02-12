<script setup lang="ts">
/**
 * █ [PAGE] :: PRICING
 * =====================================================================
 * DESC:   Página de información de precios.
 * PATH:   /pricing
 * META:   - Usa el componente PricingTable
 * STATUS: ESTABLE
 * =====================================================================
 */
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ PÁGINA: PRECIOS -->
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
    <!-- █ TABLA DE PRECIOS -->
    <!-- ======================================================================= -->
    <PricingTable />
</template>