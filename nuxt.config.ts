// https://nuxt.com
import { visualizer } from 'rollup-plugin-visualizer';

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
    delayHydration: {
      mode: 'init',
      replayClick: true,
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
    }
  },
  devtools: {
    enabled: false,
  },
  
  // Добавляем транспиляцию для проблемных пакетов
  build: {
    transpile: ['@vueuse/core', '@vueuse/shared', 'maska']
  },

  vite: {
    optimizeDeps: {
      include: [
        'maska/vue',
        'swiper/element/bundle',
        'zod',
      ],
      // Исключаем проблемный dist из предварительной оптимизации, чтобы Vite брал чистый ESM
      exclude: ['@vueuse/core', '@vueuse/shared']
    },
    plugins: [
      visualizer({
        filename: './.nuxt/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
    ],
    build: {
      // Настраиваем разбиение на чанки (Code Splitting)
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Выносим тяжелые вендорные библиотеки в отдельные файлы
            if (id.includes('node_modules')) {
              if (id.includes('zod')) return 'vendor-zod';
              if (id.includes('swiper')) return 'vendor-swiper';
              if (id.includes('@vueuse')) return 'vendor-vueuse';
              if (id.includes('maska')) return 'vendor-maska';
              return 'vendor-core'; // Всё остальное (Nuxt/Vue ядро)
            }
          }
        }
      }
    }
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
      '/_nuxt/**': { 
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } 
      },
      '/fonts/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
      }
    }
  },
  experimental: {
    componentIslands: true,
  },
});
