<template>
  <UError
    :error="error"
     :clear="{
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      class: 'rounded-full',
      label: 'Vuelve al inicio'
      
    }"
    :ui="{
      statusCode : 'text-8xl font-extrabold'
    }"
   
  />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
 defineProps<{
  error: NuxtError;
}>();

</script>
