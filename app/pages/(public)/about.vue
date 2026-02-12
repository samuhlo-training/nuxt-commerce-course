<script setup lang="ts">
/**
 * █ [PAGE] :: ABOUT
 * =====================================================================
 * DESC:   Static about page with SEO metadata.
 * PATH:   /about
 * META:   - Sets detailed SEO tags (OG, Twitter)
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ SEO META
// =============================================================================
useSeoMeta({
    title: 'About - Mi Sitio Nuxt',
    description: 'This is the about page of the Nuxt.js application.',
    ogTitle: 'About - Mi Sitio Nuxt',
    ogDescription: 'This is the about page of the Nuxt.js application.',
    ogImage: '/about-og-image.png',
    ogUrl: 'https://misitio.com/about',
    twitterTitle: 'About - Mi Sitio Nuxt',
    twitterDescription: 'This is the about page of the Nuxt.js application.',
    twitterImage: '/about-og-image.png',
    twitterCard: 'summary_large_image'
})
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ PAGE: ABOUT -->
    <!-- ======================================================================= -->
    <div>
        <h1>About Page</h1>
        <p>This is the about page of the Nuxt.js application.</p>
    </div>
</template>