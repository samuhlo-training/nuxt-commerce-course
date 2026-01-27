// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/global.css"],

  app: {
    head: {
      title: "Mi Sitio con Nuxt",
      meta: [
        {
          name: "description",
          content: "Este es mi sitio web construido con Nuxt 3",
        },
      ],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@prisma/nuxt",
    "nuxt-auth-utils",
  ],

  // additional config
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },

  // SPA - Single Page Application
  // ssr: false,
  // nitro: {
  //   preset: "static",
  //   static: true
  // }

  nitro: {
    prerender: {
      routes: ["/", "/about", "/contact", "/pricing", "/products"],
      ignore: ["/dashboard", "/dashboard/**"],
      // Habilitar el crawling para descubrir enlaces automáticamente
      crawlLinks: true,
    },
  },
});