// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    'nuxt-og-image',
    'nuxt-swiper'
  ],
  css: ['~/assets/css/main.css'],
  fonts: {
    priority: ['google', 'local'],
    providers: {
      fontsource: false,
      fontshare: false,
    },
  },
  devtools: {
    enabled: true,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'swiper/element/bundle',
      ],
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  sitemap: {
    zeroRuntime: true,
  },
  site: {
    url: 'odin-fitness.ru',
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'fitbase-widget',
    },
  },
});
