<script setup lang="ts">
/**
 * █ [DASHBOARD] :: SIDEBAR
 * =====================================================================
 * DESC:   Navegación lateral para el panel de control.
 *         Soporta estado colapsable y funcionalidad de búsqueda.
 * STATUS: ESTABLE
 * =====================================================================
 */

import {
    type CommandPaletteGroup,
    type CommandPaletteItem,
    type NavigationMenuItem,
} from '@nuxt/ui';

// =============================================================================
// █ NÚCLEO: ESTADO
// =============================================================================
const { user } = useAuthentication();

// =============================================================================
// █ CONFIG: ELEMENTOS DE NAVEGACIÓN
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
            label: 'Contactos',
            icon: 'i-lucide-users',
        },
        {
            label: 'Ajustes',
            icon: 'i-lucide-settings',
            defaultOpen: true,
            children: [
                {
                    label: 'General',
                },
                {
                    label: 'Miembros',
                },
                {
                    label: 'Notificaciones',
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
            label: 'Ayuda y Soporte',
            icon: 'i-lucide-info',
            to: 'https://github.com/nuxt/ui',
            target: '_blank',
        },
    ],
];

// =============================================================================
// █ CONFIG: BÚSQUEDA
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
        <!-- █ SLOT: CABECERA -->
        <!-- ------------------------------------------------------------------- -->
        <template #header="{ collapsed }" class="flex items-center gap-2">
            <NuxtLink to="/" class="flex flex-row items-center justify-center">
                <UDashboardSidebarCollapse variant="subtle" class="mr-2" />
                <IconsNuxtui class="h-6 w-auto" v-if="!collapsed" />
            </NuxtLink>
        </template>

        <!-- ------------------------------------------------------------------- -->
        <!-- █ SLOT: POR DEFECTO (CONTENIDO) -->
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
        <!-- █ SLOT: PIE -->
        <!-- ------------------------------------------------------------------- -->
        <template #footer="{ collapsed }">
            <UButton :avatar="{
                src: 'https://github.com/benjamincanac.png',
            }" :label="collapsed ? undefined : user?.name" color="neutral" variant="ghost" class="w-full"
                :block="collapsed" />
        </template>
    </UDashboardSidebar>
</template>