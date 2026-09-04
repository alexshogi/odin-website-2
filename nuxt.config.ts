// https://nuxt.com
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    'nuxt-delay-hydration',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
    'nuxt-swiper',
    '@nuxt/fonts',
  ],
  $production: {
    // @ts-ignore
    delayHydration: {
      mode: 'init', // Меняем с 'mount' на 'init'
      replayClick: true, // Запоминает первый клик пользователя и воспроизводит его после гидратации
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
        }
      ],
      // link: [
      //   {
      //     rel: 'preload',
      //     href: '/fonts/Geometria-Regular.woff2',
      //     as: 'font',
      //     type: 'font/woff2',
      //     crossorigin: 'anonymous'
      //   },
      //   {
      //     rel: 'preload',
      //     href: '/fonts/Geometria-Medium.woff2',
      //     as: 'font',
      //     type: 'font/woff2',
      //     crossorigin: 'anonymous'
      //   },
      //   {
      //     rel: 'preload',
      //     href: '/fonts/RexBold.woff2',
      //     as: 'font',
      //     type: 'font/woff2',
      //     crossorigin: 'anonymous'
      //   },
      // ]
    }
  },
  devtools: {
    enabled: false, // Выключаем девтулзы, они жестко жрут TBT на продакшене
  },
  vite: {
    optimizeDeps: {
      include: [
        'maska/vue',
        'swiper/element/bundle',
        'zod',
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
      xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536,
    },
  },
  nitro: {
    routeRules: {
      // Кэшируем системные файлы Nuxt на 1 год
      '/_nuxt/**': { 
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } 
      },
      // Кэшируем шрифты на 1 год (убирает предупреждения Lighthouse)
      '/fonts/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
      }
    }
  },
  experimental: {
    componentIslands: true,
  },
});