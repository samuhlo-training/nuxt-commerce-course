import { NuxtPage } from '../../.nuxt/components';
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout',
    middleware: 'auth',
    breadcrumbName: 'Inicio',
    icon: 'i-lucide-house',
})
</script>

<template>
    <div>
        <NuxtPage />
    </div>
</template>