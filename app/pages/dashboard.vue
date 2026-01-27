import { NuxtPage } from '../../.nuxt/components';
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout',
    middleware: 'auth'
})
</script>

<template>
    <div>
        <h3>Dashboard Page</h3>
        <NuxtPage />
    </div>
</template>