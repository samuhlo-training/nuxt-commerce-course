<script setup lang="ts">
/**
 * █ [LAYOUT] :: DEFAULT
 * =====================================================================
 * DESC:   Default public layout.
 * META:   - Header (Top)
 *         - Main Content (Centered)
 *         - Footer (Bottom)
 * STATUS: STABLE
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