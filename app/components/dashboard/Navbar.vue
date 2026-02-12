<script setup lang="ts">
/**
 * █ [DASHBOARD] :: NAVBAR
 * =====================================================================
 * DESC:   Barra de navegación superior para el diseño del panel de control.
 *         Maneja migas de pan, menú de usuario y notificaciones.
 * STATUS: ESTABLE
 * =====================================================================
 */

// =============================================================================
// █ NÚCLEO: DEPENDENCIAS Y ESTADO
// =============================================================================
const { logout } = useAuthentication();
const route = useRoute();

// =============================================================================
// █ LÓGICA: MIGAS DE PAN
// =============================================================================
// [TODO]: Refactorizar a un composable para una lógica más limpia
const breadcrumbItems = computed(() => {
    // 1. 'route.matched' devuelve un array con toda la jerarquía de rutas actuales.
    // ES COMO PREGUNTAR: "¿Por qué puertas pasé para llegar aquí?"
    return route.matched.map((record) => {
        return {
            // Usa el título guardado en 'meta', y si no, el nombre de la ruta.
            label: (record.meta.breadcrumbName || record.name || 'Inicio') as string,
            // 'path' es la ruta real y completa, ¡así que el enlace nunca fallará!
            to: record.path,
            // También puedes guardar iconos en meta.
            icon: (record.meta.icon || 'i-lucide-chevron-right') as string
        };
    });
});

// =============================================================================
// █ CONFIG: ELEMENTOS DEL MENÚ
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
            <!-- █ SECCIÓN: IZQUIERDA (MIGAS DE PAN) -->
            <!-- ------------------------------------------------------------------- -->
            <div class="flex-1">
                <UBreadcrumb :items="breadcrumbItems" :ui="{ list: 'text-sm font-medium' }" />
            </div>

            <!-- ------------------------------------------------------------------- -->
            <!-- █ SECCIÓN: DERECHA (ACCIONES Y MENÚ) -->
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