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
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
        }
      ]
    }
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
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});
