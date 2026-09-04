<script lang="ts" setup>
const slides = [
  '/img/interiors/int_01.webp',
  '/img/interiors/int_02.webp',
  '/img/interiors/int_03.webp',
  '/img/interiors/int_04.webp',
  '/img/interiors/int_05.webp',
  '/img/interiors/int_06.webp',
  '/img/interiors/int_07.webp',
  '/img/interiors/int_08.webp',
  '/img/interiors/int_09.webp',
  '/img/interiors/int_10.webp',
];

onMounted(async () => {
  const { register } = await import('swiper/element/bundle')
  register()
})
</script>

<template>
  <div class="w-full max-w-(--ui-container) mx-auto px-4">
    <!-- Заголовок -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
        Фотографии <span class="text-red-600 dark:text-red-500">студий</span>
      </h2>
    </div>

    <UCarousel
      :items="slides"
      loop
      class="w-full"
      :ui="{
        item: 'basis-3/4 md:basis-1/2 shrink-0 p-2'
      }"
    >
      <!-- Достаем индекс слайда index для управления приоритетом загрузки -->
      <template #default="{ item, index }">
        <div class="w-full select-none">
          <div class="block relative h-120 rounded-2xl overflow-hidden bg-neutral-500 border border-neutral-900 shadow-xl">
            <!-- Оптимизируем через NuxtImg -->
            <NuxtImg 
              :src="item" 
              alt="Фотография интерьера студии Один Фитнес"
              width="800"
              height="480"
              quality="75"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </template>
    </UCarousel>
  </div>
</template>
