import { NuxtPage } from '../../.nuxt/components';
<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout',
    middleware: 'auth'
})
</script>

<template>
    <div>
        <NuxtPage />
    </div>
</template>