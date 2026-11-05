<script setup lang="ts">
const links = [
  {
    label: 'Выбрать студию и записаться',
    to: '/#schedule',
    icon: 'i-lucide-arrow-right',
    class: 'rounded-xl font-bold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200',
  },
  {
    label: 'Узнать больше',
    to: '/#faq',
    icon: 'i-lucide-arrow-right-circle',
    class: 'rounded-xl font-bold bg-transparent text-neutral-900 border border-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:border-neutral-100 dark:hover:bg-neutral-900',
  },
];
</script>

<template>
  <section class="relative isolate">
    <div class="flex flex-col lg:grid lg:grid-cols-2 gap-16 sm:gap-y-24 py-18 sm:py-12 lg:py-18 px-4 max-w-(--ui-container) mx-auto lg:items-center">
      <div>
        <h1 class="mb-4 text-4xl min-[360px]:text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted">
          Тренировки с тренером или <span class="text-red-600">самостоятельно</span>
        </h1>

        <div class="text-lg sm:text-xl/8 text-zinc-600 dark:text-zinc-400 text-pretty">
          <Carousel />
        </div>

        <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 text-base transition-colors duration-200"
            :class="link.class"
          >
            <span>{{ link.label }}</span>
            <UIcon :name="link.icon" class="size-5 shrink-0" />
          </NuxtLink>
        </div>
      </div>

      <div class="relative p-2 max-w-sm mx-auto overflow-hidden rounded-none md:rounded-xl">
        <p class="mb-3 font-medium text-sm">О студии за 30 секунд</p>

        <video
          controls
          preload="none"
          poster="/img/hero_video_preview.webp"
          class="w-full h-auto aspect-9/16 object-cover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
          title="Презентация студии Один Фитнес"
        >
          <source src="/video/hero_vid.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео
        </video>
      </div>
    </div>
  </section>
</template>
