<script setup lang="ts">
/**
 * █ [HOME] :: CTA
 * =====================================================================
 * DESC:   Sección de llamada a la acción para la página de inicio.
 *         Obtiene contenido de la API.
 * STATUS: ESTABLE
 * =====================================================================
 */

import type { ButtonProps } from '@nuxt/ui';

// =============================================================================
// █ CORE: DATA FETCHING
// =============================================================================
const { data } = await useFetch('/api/home/cta-info');

// =============================================================================
// █ CONFIG: LINKS
// =============================================================================
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
    <!-- ======================================================================= -->
    <!-- █ COMPONENT: CTA -->
    <!-- ======================================================================= -->
    <UPageCTA :title="data?.message" :description="data?.description" orientation="horizontal" :links="links">
        <img src="https://picsum.photos/640/728" width="320" height="364" alt="Illustration"
            class="w-full rounded-lg" />
    </UPageCTA>
</template>
