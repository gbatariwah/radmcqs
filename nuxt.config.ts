// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxthq/ui", "@nuxt/content", "@vueuse/nuxt"],
  ui: {
    icons: ["ic"],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://analytics.umami.is/script.js",
          async: true,
          "data-website-id": process.env.UMAMI_ID,
        },
      ],
    },
  },
});
