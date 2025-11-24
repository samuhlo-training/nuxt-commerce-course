<template>
    <div>
        <h1>Welcome to the App {{ count }}</h1>
        <p>This is a simple application built with Nuxt.js</p>
        <button @click="count++">Click for ++</button>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
   layout: 'dashboard-layout'
})

const count = ref(0)
</script>