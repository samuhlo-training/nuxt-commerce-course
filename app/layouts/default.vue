<script setup lang="ts">
/**
 * █ [LAYOUT] :: DEFAULT
 * =====================================================================
 * DESC:   Diseño público predeterminado.
 * META:   - Encabezado (Arriba)
 *         - Contenido principal (Centrado)
 *         - Pie de página (Abajo)
 * STATUS: ESTABLE
 * =====================================================================
 */
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ LAYOUT: DEFAULT -->
    <!-- ======================================================================= -->
    <div class="flex flex-col h-screen">
        <!-- <MainNavigation /> -->
        <!-- Header -->
        <SharedHeader />
        <main class="container mx-auto flex-1 mt-2">
            <slot />
        </main>
        <!-- Footer -->
        <SharedFooter />
    </div>
</template>