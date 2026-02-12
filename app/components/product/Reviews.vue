<script setup lang="ts">
/**
 * █ [PRODUCT] :: REVIEWS_LIST
 * =====================================================================
 * DESC:   Lista todas las reseñas para un producto específico.
 *         Incluye estado de carga esqueleto e integración modal.
 * STATUS: ESTABLE
 * =====================================================================
 */

import { USkeleton } from '../../../.nuxt/components';

// =============================================================================
// █ NÚCLEO: PROPS
// =============================================================================
const props = defineProps({
    slug: {
        type: String,
        required: true,
    },
});

// =============================================================================
// █ NÚCLEO: DEPENDENCIAS Y ESTADO
// =============================================================================
const { isLoggedIn, user } = useAuthentication();
const { data, status, refresh } = useFetch(`/api/product/${props.slug}/reviews`, { server: false, lazy: true });

// =============================================================================
// █ LÓGICA: COMPUTADA
// =============================================================================
const hasUserPostedReview = computed(() => {
    return data.value?.hasUserPostedReview;
});

// =============================================================================
// █ INTERACCIÓN: MANEJADORES
// =============================================================================
const handleReviewPosted = () => {
    console.log('Review posted');
};
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ COMPONENTE: LISTA DE RESEÑAS -->
    <!-- ======================================================================= -->
    <ClientOnly>
        
        <!-- ------------------------------------------------------------------- -->
        <!-- █ SECCIÓN: CABECERA Y ACCIÓN -->
        <!-- ------------------------------------------------------------------- -->
        <UCard class="mb-8" icon="i-lucide-star">
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-star" class="text-primary-500 text-2xl" />
                    <div>
                        <h2 class="text-xl font-semibold">Reseñas</h2>
                        <p class="text-gray-600 text-sm">
                            Nuestras reseñas de clientes satisfechos.
                        </p>
                    </div>
                </div>
                <ModalReview v-if="!hasUserPostedReview && isLoggedIn" @review-posted="handleReviewPosted" :slug="slug"
                    :user="user" button-label="Añadir reseña" />
            </div>
        </UCard>

        <!-- ------------------------------------------------------------------- -->
        <!-- █ ESTADO: CARGANDO -->
        <!-- ------------------------------------------------------------------- -->
        <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <USkeleton class="w-full h-48 rounded-md mb-4" />
            <USkeleton class="w-full h-48 rounded-md mb-4" />
            <USkeleton class="w-full h-48 rounded-md mb-4" />
        </div>

        <!-- ------------------------------------------------------------------- -->
        <!-- █ ESTADO: CARGADO (LISTA) -->
        <!-- ------------------------------------------------------------------- -->
        <UPageColumns v-else-if="data?.productReviews">
            <UPageCard v-for="(review, index) in data.productReviews" :key="index" variant="subtle"
                :description="review.review" :ui="{
                    description: 'before:content-[open-quote] after:content-[close-quote]',
                }" class="fade-in">
                <template #footer>
                    <div class="flex items-center gap-2 mb-2">
                        <UIcon name="i-lucide-star" class="text-primary-500 text-xl" v-for="star in review.rating"
                            :key="star" />
                    </div>
                    <UUser :avatar='{
                        alt: review.name,
                        name: review.name,
                    }' :name="review.name" :description="review.userTitle" size="xl" />
                </template>
            </UPageCard>
        </UPageColumns>
    </ClientOnly>
</template>