<script lang="ts" setup>
const slides = [
  {
    badge: 'Экономно',
    titleHtml: 'Без годового<br>абонемента',
    imageUrl: '/img/slider/gym-slide-1.webp',
  },
  {
    badge: 'Удобно',
    titleHtml: 'Тренируйся один<br>или с тренером',
    imageUrl: '/img/slider/gym-slide-2.webp',
  },
  {
    badge: 'Удобно',
    titleHtml: 'Без очередей<br>на тренажеры',
    imageUrl: '/img/slider/gym-slide-3.webp',
  },
  {
    badge: 'Выгодно',
    titleHtml: 'Плати за одного<br>тренируйся втроем',
    imageUrl: '/img/slider/gym-slide-4.webp',
  },
];
</script>

<template>
  <div class="w-full max-w-(--ui-container) mx-auto px-4">
    <UCarousel
      :items="slides"
      loop
      auto-scroll
      class="w-full"
      :ui="{
        item: 'basis-2/3 md:basis-1/2 shrink-0 p-2'
      }"
    >
      <template #default="{ item }">
        <div class="w-full select-none">
          <div class="block relative h-64 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-xl group transition-all duration-200">
            
            <!-- Затемняющий градиент -->
            <div class="absolute inset-0 bg-linear-to-t from-neutral-950/30 via-neutral-900/15 to-transparent z-10" />

            <!-- Картинка слайда -->
            <img 
              :src="item.imageUrl" 
              alt="Слайд" 
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
            />

            <!-- Контент (текст и бэйдж) -->
            <div class="absolute inset-0 p-6 flex flex-col justify-between z-20 text-white">
              
              <span class="self-start px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-600 text-white">
                {{ item.badge }}
              </span>

              <h3 
                v-html="item.titleHtml" 
                class="text-lg font-black uppercase tracking-wide leading-tight bg-neutral-950/60 p-4 rounded-xl backdrop-blur-sm"
              ></h3>

            </div>
          </div>

        </div>
      </template>
    </UCarousel>
  </div>
</template>
