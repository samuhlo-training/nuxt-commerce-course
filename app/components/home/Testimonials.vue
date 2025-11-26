<script setup lang="ts">

const { data } = await useFetch('/api/home/reviews')
const testimonials = computed(() => {
    if (!data.value) return []
    return data.value.map((item: any) => ({
        user: {
            name: item.name,
            description: item.subtitle,
            avatar: {
                src: item.profileImage,
                alt: `${item.name}'s profile image`
            }
        },
        quote: item.description
    }))
})

</script>

<template>
    <UPageSection title="Testimonios" description="Nuestros testimonios de clientes satisfechos"
        headline="Testimonios" />
    <UPageColumns>

        <UPageCard v-for="(testimonial, index) in testimonials" :key="index" variant="subtle"
            :description="testimonial.quote"
            :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }">
            <template #footer>
                <UUser v-bind="testimonial.user" size="xl" />
            </template>
        </UPageCard>
    </UPageColumns>
</template>
