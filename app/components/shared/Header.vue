<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'


const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
    label: 'Productos',
    to: '/products',
    //icon: 'i-lucide-book-open',
    active: route.path.startsWith('/products')
}, {
    label: 'Precios',
    to: '/pricing',
    //icon: 'i-lucide-box',
    active: route.path.startsWith('/prices')
}, {
    label: 'About',
    //icon: 'i-simple-icons-figma',
    to: '/about',
    active: route.path.startsWith('/about'),
}, {
    label: 'Contacto',
    //icon: 'i-lucide-rocket',
    to: '/contact',
    active: route.path.startsWith('/contact'),

}])

const responsiveMenu = ref([
    ...items.value,
    {
        label: 'Iniciar sesión',
        icon: 'i-heroicons-user-circle',
        to: '/login',
        active: route.path.startsWith('/login'),
    }
]);
</script>

<template>
    <UHeader>
        <template #title>
            <IconsNuxtui class="h-6 w-auto" />
        </template>

        <UNavigationMenu :items="items" />

        <template #right>
            <UColorModeButton />

            <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
                <UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
                    icon="i-simple-icons-github" aria-label="GitHub" />
            </UTooltip>
            <UButton icon="i-heroicons-user-circle" size="lg" color="primary" variant="solid" to="/login"
                label="Login" />

        </template>

        <template #body>
            <UNavigationMenu :items="responsiveMenu" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>
