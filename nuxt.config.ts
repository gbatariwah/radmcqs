// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxthq/ui", "@nuxt/content", "@vueuse/nuxt"],
  ui: {
    icons: ["ic"],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
