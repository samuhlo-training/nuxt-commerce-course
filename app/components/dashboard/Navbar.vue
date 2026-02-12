<script setup lang="ts">
/**
 * █ [DASHBOARD] :: NAVBAR
 * =====================================================================
 * DESC:   Top navigation bar for the dashboard layout.
 *         Handles breadcrumbs, user menu, and notifications.
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ CORE: DEPENDENCIES & STATE
// =============================================================================
const { logout } = useAuthentication();
const route = useRoute();

// =============================================================================
// █ LOGIC: BREADCRUMBS
// =============================================================================
// [TODO]: Refactor to a composable for cleaner logic
const breadcrumbItems = computed(() => {
    // 1. 'route.matched' gives an array with the entire hierarchy of current routes.
    // IT IS LIKE ASKING: "What doors did I pass through to get here?"
    return route.matched.map((record) => {
        return {
            // Use the title saved in 'meta', and if not, the route name.
            label: (record.meta.breadcrumbName || record.name || 'Inicio') as string,
            // 'path' is the real and complete route, so the link will never fail!
            to: record.path,
            // You can also save icons in meta.
            icon: (record.meta.icon || 'i-lucide-chevron-right') as string
        };
    });
});

// =============================================================================
// █ CONFIG: MENU ITEMS
// =============================================================================
const userMenuItems = [
    [
        {
            label: 'Perfil',
            icon: 'i-lucide-user',
            to: '#',
        },
        {
            label: 'Preferencias',
            icon: 'i-lucide-settings',
            to: '#',
        },
    ],
    [
        {
            label: 'Cerrar sesión',
            icon: 'i-lucide-log-out',
            onSelect: async () => {
                await logout();
                navigateTo('/login');
            },
        },
    ],
];
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENT: NAVBAR -->
    <!-- ======================================================================= -->
    <div class="border-b border-default bg-primary/10 sticky top-0 z-10">
        <div class="flex items-center justify-between px-6 py-4">
            
            <!-- ------------------------------------------------------------------- -->
            <!-- █ SECTION: LEFT (BREADCRUMB) -->
            <!-- ------------------------------------------------------------------- -->
            <div class="flex-1">
                <UBreadcrumb :items="breadcrumbItems" :ui="{ list: 'text-sm font-medium' }" />
            </div>

            <!-- ------------------------------------------------------------------- -->
            <!-- █ SECTION: RIGHT (ACTIONS & MENU) -->
            <!-- ------------------------------------------------------------------- -->
            <div class="flex items-center gap-4 ms-auto">
                <!-- Notification Bell -->
                <UButton icon="i-lucide-bell" color="neutral" variant="ghost" square class="h-8 w-8" />

                <!-- Divider -->
                <USeparator orientation="vertical" class="h-6" />

                <!-- User Dropdown Menu -->
                <UDropdownMenu :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
                    <UButton icon="i-lucide-user" color="neutral" variant="ghost" trailing-icon="i-lucide-chevron-down"
                        label="Account" />
                </UDropdownMenu>
            </div>
        </div>
    </div>
</template>