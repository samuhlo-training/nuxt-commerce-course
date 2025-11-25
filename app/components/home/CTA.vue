<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
    {
        label: 'Empezando',
        color: 'neutral'
    },
    {
        label: 'Aprende más',
        color: 'neutral',
        variant: 'subtle',
        trailingIcon: 'i-lucide-arrow-right'
    }
])
</script>

<template>
    <UPageCTA title="Confiado y respaldado por nuestra increíble comunidad"
        description="Hemos establecido una asociación sólida y duradera. Su confianza es el motor que nos impulsa hacia el éxito compartido."
        orientation="horizontal" :links="links">
        <img src="https://picsum.photos/640/728" width="320" height="364" alt="Illustration"
            class="w-full rounded-lg" />
    </UPageCTA>
</template>
