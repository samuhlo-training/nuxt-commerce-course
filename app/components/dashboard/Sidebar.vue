<script setup lang="ts">
/**
 * █ [DASHBOARD] :: SIDEBAR
 * =====================================================================
 * DESC:   Sidebar navigation for the dashboard.
 *         Supports collapsible state and search functionality.
 * STATUS: STABLE
 * =====================================================================
 */

import {
    type CommandPaletteGroup,
    type CommandPaletteItem,
    type NavigationMenuItem,
} from '@nuxt/ui';

// =============================================================================
// █ CORE: STATE
// =============================================================================
const { user } = useAuthentication();

// =============================================================================
// █ CONFIG: NAVIGATION ITEMS
// =============================================================================
const items: NavigationMenuItem[][] = [
    [
        {
            label: 'Inicio',
            icon: 'i-lucide-house',
            to: '/dashboard',
            exact: true,
        },
        {
            label: 'Productos',
            icon: 'i-lucide-inbox',
            badge: '4',
            to: '/dashboard/products',
            exact: false,
        },
        {
            label: 'Contacts',
            icon: 'i-lucide-users',
        },
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            defaultOpen: true,
            children: [
                {
                    label: 'General',
                },
                {
                    label: 'Members',
                },
                {
                    label: 'Notifications',
                },
            ],
        },
    ],
    [
        {
            label: 'Feedback',
            icon: 'i-lucide-message-circle',
            to: 'https://github.com/nuxt-ui-templates/dashboard',
            target: '_blank',
        },
        {
            label: 'Help & Support',
            icon: 'i-lucide-info',
            to: 'https://github.com/nuxt/ui',
            target: '_blank',
        },
    ],
];

// =============================================================================
// █ CONFIG: SEARCH
// =============================================================================
const searchGroups = ref<CommandPaletteGroup<CommandPaletteItem>[]>([
    {
        label: 'Productos',
        id: 'products',
        highlightedIcon: 'i-lucide-box',
        items: [
            {
                label: 'Nuevo Producto',
                id: 'new-product',
                icon: 'i-lucide-plus',
                to: '/dashboard/products/new',
            },
        ],
    },
]);
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENT: SIDEBAR -->
    <!-- ======================================================================= -->
    <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
        
        <!-- ------------------------------------------------------------------- -->
        <!-- █ SLOT: HEADER -->
        <!-- ------------------------------------------------------------------- -->
        <template #header="{ collapsed }" class="flex items-center gap-2">
            <NuxtLink to="/" class="flex flex-row items-center justify-center">
                <UDashboardSidebarCollapse variant="subtle" class="mr-2" />
                <IconsNuxtui class="h-6 w-auto" v-if="!collapsed" />
            </NuxtLink>
        </template>

        <!-- ------------------------------------------------------------------- -->
        <!-- █ SLOT: DEFAULT (CONTENT) -->
        <!-- ------------------------------------------------------------------- -->
        <template #default="{ collapsed }">
            <UDashboardSearchButton />
            <UDashboardSearch title="Buscar" :groups="searchGroups" />
            
            <UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" />
            <UNavigationMenu :collapsed="collapsed" :items="items[1]" orientation="vertical" class="mt-auto" />

            <div class="">
                <UDashboardSidebarCollapse color="neutral" variant="ghost" square class="w-full"
                    :title="collapsed ? 'Expandir' : 'Contraer'" />
            </div>
        </template>

        <!-- ------------------------------------------------------------------- -->
        <!-- █ SLOT: FOOTER -->
        <!-- ------------------------------------------------------------------- -->
        <template #footer="{ collapsed }">
            <UButton :avatar="{
                src: 'https://github.com/benjamincanac.png',
            }" :label="collapsed ? undefined : user?.name" color="neutral" variant="ghost" class="w-full"
                :block="collapsed" />
        </template>
    </UDashboardSidebar>
</template>