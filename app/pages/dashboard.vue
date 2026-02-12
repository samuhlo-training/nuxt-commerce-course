<script setup lang="ts">
/**
 * █ [PAGE] :: DASHBOARD
 * =====================================================================
 * DESC:   Envoltura principal del diseño del panel de control.
 * PATH:   /dashboard
 * META:   Requiere middleware 'auth'.
 * STATUS: ESTABLE
 * =====================================================================
 */

// =============================================================================
// █ PAGE META
// =============================================================================
definePageMeta({
    layout: 'dashboard-layout',
    middleware: 'auth',
    breadcrumbName: 'Inicio',
    icon: 'i-lucide-house',
})
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ PÁGINA: PANEL DE CONTROL -->
    <!-- ======================================================================= -->
    <div>
        <NuxtPage />
    </div>
</template>