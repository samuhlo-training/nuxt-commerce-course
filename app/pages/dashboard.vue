<script setup lang="ts">
/**
 * █ [PAGE] :: DASHBOARD
 * =====================================================================
 * DESC:   Main dashboard layout wrapper.
 * PATH:   /dashboard
 * META:   Requires 'auth' middleware.
 * STATUS: STABLE
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
    <!-- █ PAGE: DASHBOARD -->
    <!-- ======================================================================= -->
    <div>
        <NuxtPage />
    </div>
</template>