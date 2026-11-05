<script setup lang="ts">
import { getStudio, studios } from '~/data/studios'

const route = useRoute()
const studio = getStudio(String(route.params.slug))

if (!studio) {
  throw createError({ statusCode: 404, statusMessage: 'Студия не найдена' })
}

const siteUrl = 'https://odin-fitness.ru'
const pageUrl = `${siteUrl}/studios/${studio.slug}/`
const pageTitle = `Фитнес-студия ОДИН «${studio.name}» — тренировки у метро ${studio.metro}`
const pageDescription = `Тренировки с тренером и в мини-группах в студии «ОДИН» на ${studio.address}. Метро ${studio.metro}. Пробная тренировка от 1000 ₽, запись онлайн.`

const priceValues = studio.prices.flatMap(category => category.items.map(item => item.price))
const priceRange = `${Math.min(...priceValues)}–${Math.max(...priceValues)} ₽`

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)

const routePoints = `https://yandex.ru/maps/?rtext=~${studio.lat},${studio.lon}&rtt=pd`
const otherStudios = studios.filter(item => item.slug !== studio.slug)
const showMap = ref(false)

const faq = [
  {
    question: 'Нужен ли годовой абонемент?',
    answer: 'Нет. Занятия оплачиваются разово или блоками из 5 и 10 тренировок — без годового абонемента и обязательств.',
  },
  {
    question: 'Сколько стоит пробная тренировка?',
    answer: 'Пробное занятие с тренером — 1500 ₽, в мини-группе — 1000 ₽.',
  },
  {
    question: 'Можно ли заниматься самостоятельно?',
    answer: studio.selfTraining
      ? 'Да. В студии есть формат самостоятельных посещений: 1200 ₽ разово, 5500 ₽ за 5 посещений или 10 000 ₽ за 10.'
      : 'В этой студии тренировки проходят с тренером или в мини-группе. Формат самостоятельных посещений доступен в студиях «Грайвороновский» и «Коминтерна».',
  },
  {
    question: 'Как записаться на тренировку?',
    answer: 'Оставьте заявку в форме на сайте или позвоните по телефону +7 (915) 294-00-04. Актуальное расписание — в разделе «Расписание».',
  },
]

const gymSchema = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: `ОДИН Фитнес — ${studio.name}`,
  description: studio.intro,
  url: pageUrl,
  image: `${siteUrl}${studio.image}`,
  telephone: '+7-915-294-00-04',
  priceRange,
  currenciesAccepted: 'RUB',
  address: {
    '@type': 'PostalAddress',
    streetAddress: studio.address,
    addressLocality: 'Москва',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: studio.lat,
    longitude: studio.lon,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '23:00',
    },
  ],
  sameAs: ['https://t.me/Odinfitness', 'https://vk.com/club218956657'],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Студии', item: `${siteUrl}/studios/` },
    { '@type': 'ListItem', position: 3, name: `ОДИН ${studio.name}`, item: pageUrl },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: `${siteUrl}${studio.image}`,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}${studio.image}`,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(gymSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema) },
  ],
})
</script>

<template>
  <div class="bg-white dark:bg-black">
    <section class="relative h-[360px] md:h-[440px] overflow-hidden bg-zinc-900">
      <NuxtImg
        :src="studio.image"
        :alt="`Фитнес-студия «ОДИН» — ${studio.name}`"
        width="1600"
        height="900"
        format="webp"
        quality="65"
        loading="eager"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-black/25" />

      <div class="relative h-full max-w-7xl mx-auto px-4 pb-8 flex flex-col justify-end">
        <nav aria-label="Хлебные крошки" class="mb-4 text-xs text-zinc-300">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li><a href="/" class="inline-flex min-h-11 items-center hover:text-white transition-colors">Главная</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/studios/" class="inline-flex min-h-11 items-center hover:text-white transition-colors">Студии</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" class="text-white font-semibold">{{ studio.name }}</li>
          </ol>
        </nav>

        <h1 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tight max-w-3xl">
          Тренировки в студии <span class="text-red-500">«ОДИН»</span> — {{ studio.name }}
        </h1>

        <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-200">
          <span class="inline-flex items-center gap-2">
            <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-red-500" />
            {{ studio.address }}
          </span>
          <span class="inline-flex items-center gap-2">
            <UIcon name="i-lucide-train-front" class="w-4 h-4 text-red-500" />
            м. {{ studio.metro }}
          </span>
          <span class="inline-flex items-center gap-2">
            <UIcon name="i-lucide-clock" class="w-4 h-4 text-red-500" />
            Ежедневно 09:00–23:00
          </span>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <a
            href="/#studios"
            class="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
          >
            Записаться на тренировку
          </a>
          <a
            href="tel:+79152940004"
            class="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-zinc-900"
          >
            +7 (915) 294-00-04
          </a>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div class="lg:col-span-7 space-y-6">
        <h2 class="text-2xl md:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
          О студии
        </h2>
        <p class="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {{ studio.intro }}
        </p>
        <p class="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          «ОДИН» — сеть фитнес-студий в Москве, где не нужно покупать годовой абонемент. Вы выбираете формат:
          персональные занятия с тренером, мини-группа до четырёх человек или самостоятельные тренировки.
          Начать можно с пробного занятия, чтобы познакомиться с залом и тренером.
        </p>
        <p class="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          Студия находится в районе {{ studio.district }}. Адрес: {{ studio.address }},
          ближайшая станция метро — «{{ studio.metro }}».
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
            <UIcon name="i-lucide-user" class="w-5 h-5 text-red-500" />
            <p class="mt-2 text-sm font-bold text-zinc-900 dark:text-white">С тренером</p>
            <p class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Пробное занятие — 1500 ₽</p>
          </div>
          <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
            <UIcon name="i-lucide-users" class="w-5 h-5 text-red-500" />
            <p class="mt-2 text-sm font-bold text-zinc-900 dark:text-white">Мини-группа</p>
            <p class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">2–4 человека, от 1000 ₽</p>
          </div>
          <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4">
            <UIcon name="i-lucide-dumbbell" class="w-5 h-5 text-red-500" />
            <p class="mt-2 text-sm font-bold text-zinc-900 dark:text-white">Самостоятельно</p>
            <p class="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {{ studio.selfTraining ? 'От 1200 ₽ за посещение' : 'В студиях «Грайвороновский» и «Коминтерна»' }}
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 space-y-4">
        <div class="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 h-[320px] lg:h-[380px] bg-zinc-100 dark:bg-zinc-900">
          <iframe
            v-if="showMap"
            :src="studio.mapUrl"
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen="true"
            loading="lazy"
            :title="`Карта — студия «ОДИН» ${studio.name}`"
            class="w-full h-full"
          />
          <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
            <UIcon name="i-lucide-map" class="w-10 h-10 text-red-500" />
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              Карта загружается по нажатию, чтобы страница открывалась быстрее.
            </p>
            <button
              type="button"
              class="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white px-5 py-3 text-sm font-bold text-white dark:text-zinc-900 transition-colors hover:bg-red-600 hover:text-white"
              @click="showMap = true"
            >
              Показать карту
            </button>
          </div>
        </div>
        <a
          :href="routePoints"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:text-red-600 transition-colors"
        >
          <UIcon name="i-lucide-route" class="w-4 h-4" />
          Построить маршрут в Яндекс Картах
        </a>
      </div>
    </section>

    <section id="prices" class="bg-zinc-50 dark:bg-zinc-950 py-12 md:py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
          Цены <span class="text-red-600 dark:text-red-500">студии</span>
        </h2>
        <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Оплата разово или блоками. Годовой абонемент не нужен.
        </p>

        <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            v-for="category in studio.prices"
            :key="category.title"
            class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
          >
            <div class="flex items-center gap-2">
              <UIcon :name="category.icon" class="w-5 h-5 text-red-500" />
              <h3 class="text-base font-bold text-zinc-900 dark:text-white">{{ category.title }}</h3>
            </div>
            <ul class="mt-4 space-y-3">
              <li
                v-for="item in category.items"
                :key="item.name + item.price"
                class="flex items-start justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p class="text-sm text-zinc-700 dark:text-zinc-300">{{ item.name }}</p>
                  <p v-if="item.note" class="text-xs text-zinc-500">{{ item.note }}</p>
                </div>
                <span class="text-sm font-bold text-zinc-900 dark:text-white whitespace-nowrap">{{ formatPrice(item.price) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
        Частые <span class="text-red-600 dark:text-red-500">вопросы</span>
      </h2>
      <div class="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
        <details v-for="item in faq" :key="item.question" class="group py-4">
          <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-zinc-900 dark:text-white">
            {{ item.question }}
            <UIcon name="i-lucide-plus" class="w-5 h-5 shrink-0 text-red-500 transition-transform group-open:rotate-45" />
          </summary>
          <p class="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{{ item.answer }}</p>
        </details>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 pb-12 md:pb-16">
      <h2 class="text-2xl md:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
        Другие <span class="text-red-600 dark:text-red-500">студии</span>
      </h2>
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="item in otherStudios"
          :key="item.slug"
          :href="`/studios/${item.slug}/`"
          class="group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <div class="relative h-44 overflow-hidden">
            <NuxtImg
              :src="item.image"
              :alt="`Студия «ОДИН» — ${item.name}`"
              width="480"
              height="320"
              format="webp"
              quality="45"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-4">
            <p class="text-base font-bold text-zinc-900 dark:text-white">ОДИН {{ item.name }}</p>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{{ item.address }}</p>
            <p class="mt-1 text-sm text-zinc-500">м. {{ item.metro }}</p>
          </div>
        </a>
      </div>
    </section>

    <section class="bg-zinc-950 py-12 md:py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
          Запишитесь на пробную тренировку
        </h2>
        <p class="mt-3 text-sm md:text-base text-zinc-400">
          Познакомьтесь со студией на {{ studio.name }} и выберите формат занятий.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/#studios"
            class="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
          >
            Оставить заявку
          </a>
          <a
            href="tel:+79152940004"
            class="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-zinc-900"
          >
            Позвонить
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
