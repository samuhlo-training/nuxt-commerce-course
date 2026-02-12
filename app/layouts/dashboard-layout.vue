<script setup lang="ts">
/**
 * █ [LAYOUT] :: DASHBOARD
 * =====================================================================
 * DESC:   Main layout for dashboard pages.
 * META:   - Includes Sidebar, Navbar, and Content Panel
 *         - Persists selection state
 * STATUS: STABLE
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