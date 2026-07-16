<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
  {
    label: 'Выбрать студию и записаться',
    to: '/#schedule',
    trailingIcon: 'i-lucide-arrow-right',
    class: '!rounded-xl font-bold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200',
  },
  {
    label: 'Узнать больше',
    to: '/#faq',
    trailingIcon: 'i-lucide-arrow-right-circle',
    class: '!rounded-xl font-bold bg-transparent text-neutral-900 border border-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:border-neutral-100 dark:hover:bg-neutral-900',
  },
]);
</script>

<template>
  <UPageHero
    orientation="horizontal"
    :links="links"
  >
    <template #title>
      Тренировки с тренером или <span class="text-red-600">самостоятельно</span>
    </template>

    <template #description>
      <Carousel />
    </template>

    <div class="relative p-2 max-w-sm mx-auto overflow-hidden rounded-none md:rounded-xl">
      <p class="mb-3">О студии за 30 секунд</p>

      <video
        controls
        poster="/img/hero_video_preview.png"
        class="w-full h-auto aspect-9/16 object-cover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <source src="~/assets/video/hero_vid.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео
      </video>
    </div>
  </UPageHero>

  <!-- <Carousel /> -->
</template>
