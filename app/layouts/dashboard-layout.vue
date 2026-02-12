<script setup lang="ts">
/**
 * █ [LAYOUT] :: DASHBOARD
 * =====================================================================
 * DESC:   Diseño principal para las páginas del panel de control.
 * META:   - Incluye barra lateral, barra de navegación y panel de contenido
 *         - Persiste el estado de selección
 * STATUS: ESTABLE
 * =====================================================================
 */
import { UDashboardGroup, UDashboardPanel } from '#components';
// Note: DashboardSidebar and DashboardNavbar are likely auto-imported or components
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ LAYOUT: DASHBOARD -->
    <!-- ======================================================================= -->
    <UDashboardGroup storage="local" storage-key="dashboard-sidebar" :persistent="true">
        <DashboardSidebar />
        <UDashboardPanel>
            <DashboardNavbar />
            <div class="flex-1 overflow-auto p-6">
                <slot />
            </div>
        </UDashboardPanel>
    </UDashboardGroup>
</template>