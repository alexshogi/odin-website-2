<script setup lang="ts">
import { studios } from '~/data/studios'

const siteUrl = 'https://odin-fitness.ru'
const pageUrl = `${siteUrl}/studios/`
const pageTitle = 'Фитнес-студии «ОДИН» в Москве — адреса, метро и цены'
const pageDescription = 'Четыре фитнес-студии «ОДИН» в Москве: Тагильская, Красная Сосна, Грайвороновский и Коминтерна. Тренировки с тренером, в мини-группах и самостоятельно, без годового абонемента.'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Студии', item: pageUrl },
  ],
}

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: `${siteUrl}/og-image.jpg`,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}/og-image.jpg`,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) }],
})
</script>

<template>
  <div class="bg-white dark:bg-black">
    <section class="bg-zinc-950 py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <nav aria-label="Хлебные крошки" class="mb-6 text-xs text-zinc-400">
          <ol class="flex flex-wrap items-center gap-1.5">
            <li><a href="/" class="inline-flex min-h-11 items-center hover:text-white transition-colors">Главная</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" class="text-white font-semibold">Студии</li>
          </ol>
        </nav>

        <h1 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tight max-w-4xl">
          Фитнес-студии <span class="text-red-500">«ОДИН»</span> в Москве
        </h1>
        <p class="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-zinc-400">
          Четыре студии в разных районах Москвы. В каждой можно заниматься персонально с тренером
          или в мини-группе до четырёх человек, а в «Грайвороновском» и «Коминтерна» — ещё и самостоятельно.
          Годовой абонемент не нужен: оплата разово или блоками занятий.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          v-for="studio in studios"
          :key="studio.slug"
          :href="`/studios/${studio.slug}/`"
          class="group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <div class="relative h-56 overflow-hidden">
            <NuxtImg
              :src="studio.image"
              :alt="`Фитнес-студия «ОДИН» — ${studio.name}`"
              width="600"
              height="375"
              format="webp"
              quality="50"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-5">
            <h2 class="text-xl font-bold text-zinc-900 dark:text-white">ОДИН {{ studio.name }}</h2>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ studio.address }}</p>
            <p class="mt-1 text-sm text-zinc-500">м. {{ studio.metro }} · {{ studio.district }}</p>
            <p class="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-red-600 group-hover:text-red-500">
              Подробнее о студии
              <UIcon name="i-lucide-arrow-right" class="ml-1 w-4 h-4" />
            </p>
          </div>
        </a>
      </div>
    </section>

    <section class="bg-zinc-950 py-12 md:py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
          Не знаете, какую студию выбрать?
        </h2>
        <p class="mt-3 text-sm md:text-base text-zinc-400">
          Оставьте заявку — подскажем, какая студия ближе и где есть удобное время для тренировки.
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
