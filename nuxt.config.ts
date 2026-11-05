// https://nuxt.com
import { visualizer } from 'rollup-plugin-visualizer';
import { studioSlugs } from './app/data/studios';

const isAnalyze = process.env.ANALYZE === 'true';
const studioRoutes = ['/studios/', ...studioSlugs.map(slug => `/studios/${slug}/`)];

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Номер счётчика Яндекс.Метрики. 0 — счётчик отключён.
      ymId: 114094798,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Один Фитнес — тренировки с тренером или самостоятельно',
      link: [
        { rel: 'canonical', href: 'https://odin-fitness.ru/' },
        // Иконка в PNG вместо 43 КБ .ico
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Шрифты грузим заранее, чтобы не было подмены текста (FOUT)
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/RexBold.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Geometria-Regular.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Geometria-Medium.woff2', crossorigin: 'anonymous' }
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
        },
        {
          name: 'description',
          content: 'Студии «Один Фитнес» в Москве: тренировки с тренером и самостоятельные занятия без годового абонемента. Расписание, цены и запись онлайн.'
        },
        {
          name: 'theme-color',
          content: '#09090b'
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Один Фитнес' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: 'Один Фитнес — тренировки с тренером или самостоятельно' },
        {
          property: 'og:description',
          content: 'Студии «Один Фитнес» в Москве: тренировки с тренером и самостоятельные занятия без годового абонемента. Расписание, цены и запись онлайн.'
        },
        { property: 'og:url', content: 'https://odin-fitness.ru/' },
        { property: 'og:image', content: 'https://odin-fitness.ru/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Один Фитнес — зал для тренировок' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Один Фитнес — тренировки с тренером или самостоятельно' },
        {
          name: 'twitter:description',
          content: 'Студии «Один Фитнес» в Москве: тренировки с тренером и самостоятельные занятия без годового абонемента. Расписание, цены и запись онлайн.'
        },
        { name: 'twitter:image', content: 'https://odin-fitness.ru/og-image.jpg' }
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
      ],
      // Исключаем проблемный dist из предварительной оптимизации, чтобы Vite брал чистый ESM
      exclude: ['@vueuse/core', '@vueuse/shared']
    },
    plugins: [
      ...(isAnalyze
        ? [visualizer({
            filename: './.nuxt/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true
          })]
        : []),
    ],
    build: {
      // Настраиваем разбиение на чанки (Code Splitting)
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Выносим тяжелые вендорные библиотеки в отдельные файлы
            if (id.includes('node_modules')) {
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
    urls: studioRoutes,
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
    prerender: {
      routes: studioRoutes,
    },
    routeRules: {
      '/_nuxt/**': { 
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } 
      },
      '/fonts/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
      },
      '/_ipx/**': {
        headers: { 'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400' }
      },
      '/img/**': {
        headers: { 'Cache-Control': 'public, max-age=2592000' }
      },
      '/video/**': {
        headers: { 'Cache-Control': 'public, max-age=2592000' }
      },
      '/docs/**': {
        headers: { 'Cache-Control': 'public, max-age=86400' }
      }
    }
  },
  features: {
    // CSS сразу в HTML: убирает блокирующий отрисовку запрос стилей
    inlineStyles: true,
  },
  experimental: {
    componentIslands: true,
  },
});
