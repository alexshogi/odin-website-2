<script lang="ts" setup>
const slides = [
  { badge: 'Экономно', titleHtml: 'Без годового<br>абонемента', imageUrl: '/img/slider/gym-slide-1.webp' },
  { badge: 'Удобно', titleHtml: 'Тренируйся один<br>или с тренером', imageUrl: '/img/slider/gym-slide-2.webp' },
  { badge: 'Удобно', titleHtml: 'Без очередей<br>на тренажеры', imageUrl: '/img/slider/gym-slide-3.webp' },
  { badge: 'Выгодно', titleHtml: 'Плати за одного<br>тренируйся втроем', imageUrl: '/img/slider/gym-slide-4.webp' },
];
</script>

<template>
  <div class="w-full max-w-(--ui-container) mx-auto overflow-hidden">
    <!-- 
      Рендерим карусель напрямую (SSR-friendly).
      Класс `[&_ul]:flex-nowrap` не дает слайдам переноситься на новую строку, пока грузится JS.
    -->
    <UCarousel
      :items="slides"
      loop
      class="w-full [&_ul]:flex-nowrap"
      :ui="{ item: 'basis-2/3 md:basis-1/2 shrink-0 p-2' }"
    >
      <template #default="{ item, index }">
        <div class="w-full select-none">
          <div class="block relative h-64 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-xl group transition-transform duration-200">
            <div class="absolute inset-0 bg-linear-to-t from-neutral-950/30 via-neutral-900/15 to-transparent z-10" />

            <!-- 
              NuxtImg сгенерирует правильный тег srcset прямо на сервере.
              Поскольку это SSR, браузер мгновенно найдет картинку в HTML.
            -->
            <NuxtImg 
              :src="item.imageUrl"
              alt="Слайд Один Фитнес"
              quality="80"
              format="webp"
              :loading="index <= 1 ? 'eager' : 'lazy'"
              :fetchpriority="index <= 1 ? 'high' : 'auto'"
              sizes="xs:350px sm:350px md:600px"
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
            />

            <div class="absolute inset-0 p-6 flex flex-col justify-between z-20 text-white">
              <span class="self-start px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-600 text-white">
                {{ item.badge }}
              </span>
              <h3 v-html="item.titleHtml" class="text-lg font-black uppercase tracking-wide leading-tight bg-neutral-950/60 p-4 rounded-xl backdrop-blur-sm"></h3>
            </div>
          </div>
        </div>
      </template>
    </UCarousel>
  </div>
</template>
