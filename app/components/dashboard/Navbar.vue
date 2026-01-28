<script setup lang="ts">

const {logout} = useAuthentication()

//TODO: Hacer script para sacar breadcrumbItems de forma dinámica de la ruta actual + la ruta anterior

const route = useRoute()
const breadcrumbItems = computed(() => {
  // 1. 'route.matched' nos da un array con toda la jerarquía de rutas actuales
  // Es como preguntar: "¿Por qué puertas he pasado para llegar hasta aquí?"
  return route.matched.map((record) => {
    return {
      // Usamos el título que guardamos en 'meta', y si no hay, el nombre de la ruta
      label: (record.meta.breadcrumbName || record.name || 'Inicio') as string,
      // 'path' es la ruta real y completa, ¡así nunca fallará el enlace!
      to: record.path,
      // También puedes guardar iconos en meta
      icon: (record.meta.icon || 'i-lucide-chevron-right') as string
    }
  })
})
// const breadcrumbItems = [
//     {
//         label: 'Dashboard',
//         icon: 'i-lucide-layout-dashboard',
//     },
//     {
//         label: 'Inicio',
//         icon: 'i-lucide-house',
//     },
// ];
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
               await logout()
               navigateTo('/login')
            },
        },
    ],
];
</script>

<template>
    <div class="border-b border-default bg-primary/10 sticky top-0 z-10">
        <div class="flex items-center justify-between px-6 py-4">
            <!-- Left Side: Breadcrumb or Title -->
            <div class="flex-1">
                <UBreadcrumb :items="breadcrumbItems" :ui="{ list: 'text-sm font-medium' }" />
            </div>

            <!-- Right Side: Actions and User Menu -->
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