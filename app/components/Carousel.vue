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
      Нативная карусель на CSS scroll-snap: не требует JS, гидратации и Embla.
      Свайпается пальцем на телефоне и колесом/трекпадом на десктопе.
    -->
    <div class="flex w-full snap-x snap-mandatory overflow-x-auto no-scrollbar" role="region" aria-label="Преимущества студии">
      <div
        v-for="(item, index) in slides"
        :key="item.imageUrl"
        class="basis-2/3 md:basis-1/2 shrink-0 snap-start p-2"
      >
        <div class="w-full select-none">
          <div class="block relative h-64 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-xl group transition-transform duration-200">
            <div class="absolute inset-0 bg-linear-to-t from-neutral-950/30 via-neutral-900/15 to-transparent z-10" />

            <NuxtImg
              :src="item.imageUrl"
              alt="Слайд Один Фитнес"
              quality="60"
              format="webp"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              sizes="xs:230px sm:350px md:600px"
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
            />

            <div class="absolute inset-0 p-6 flex flex-col justify-between z-20 text-white">
              <span class="self-start px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-600 text-white">
                {{ item.badge }}
              </span>
              <p v-html="item.titleHtml" class="text-lg font-black uppercase tracking-wide leading-tight bg-neutral-950/60 p-4 rounded-xl backdrop-blur-sm"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
