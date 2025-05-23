// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["amasugar/amasugar.css"],
  app: {
    buildAssetsDir: '/sewing_cad/'
  }
})