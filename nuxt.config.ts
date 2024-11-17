// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "nuxt-security",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://analytics.umami.is/script.js",
          async: true,
          "data-website-id": "9a32b8c5-210d-4297-81d3-3e22ef2c3f30",
        },
      ],
    },
  },
  runtimeConfig: {
    // Private keys are only available on the server

    // Public keys that are exposed to the client
    public: {
      endPoint: process.env.END_POINT,
      projectID: process.env.PROJECT_ID,
    },
  },
  icon: {
    serverBundle: {
      collections: ["ph"],
    },
  },
  security: {
    // corsHandler: {
    //   origin: "*",
    // },
  },

  supabase: {
    redirectOptions: {
      login: "/sign-in",
    },
  },

  compatibilityDate: "2024-11-14",
});
