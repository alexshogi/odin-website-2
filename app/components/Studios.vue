<template>
  <section 
    id="studios" 
    class="w-full max-w-(--ui-container) mx-auto px-4 py-18 sm:py-12 lg:py-18 scroll-mt-17.5 md:scroll-mt-25 md:py-12 grid grid-cols-1 md:grid-cols-2 auto-rows-[200px] md:auto-rows-[300px] gap-6 md:gap-12.5"
  >
    <div 
      v-for="studio in studios" 
      :key="studio.id"
      class="h-full border rounded-xl p-4 md:p-8 flex flex-col justify-between gap-4 relative overflow-hidden bg-neutral-900 text-white"
    >
      <!-- Фоновое изображение из папки public/gallery/ -->
      <NuxtImg 
        :src="studio.bgImage" 
        :alt="studio.title"
        loading="lazy"
        format="webp"
        sizes="100vw"
        class="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
      />

      <!-- Слой затемнения -->
      <div class="absolute inset-0 bg-linear-to-r from-[rgba(10,0,7,0.85)] to-[rgba(22,5,5,0.623)] z-0 pointer-events-none" />

      <!-- Контент карточки -->
      <div class="relative z-10 h-full flex flex-col justify-between pointer-events-none">
        <!-- Тег (Компонент Nuxt UI v4) -->
        <div class="flex gap-3 ml-2 md:ml-4 pointer-events-auto">
          <UBadge 
            label="СТУДИЯ" 
            variant="solid"
            class="bg-linear-to-r from-[rgba(163,18,40,0.65)] to-[rgba(191,25,50,0.65)] text-white text-xs font-semibold px-3 py-0.5 rounded-[10px] h-6 flex items-center border-none"
          />
        </div>

        <!-- Название студии -->
        <h3 
          @click="scrollTo('#feedback-form')" 
          class="pl-2 md:pl-4 text-2xl md:text-[36px] md:leading-9 font-bold m-0 cursor-pointer select-none text-white pointer-events-auto"
        >
          <span class="text-[#f71735]">ОДИН</span>
          {{ studio.title }}
        </h3>

        <!-- Адрес и рейтинг (Иконки через двоеточие — стандарт Nuxt UI v4) -->
        <div class="flex">
          <ul class="m-0 p-0 pl-2 md:pl-4 list-none flex flex-col gap-2">
            <!-- Адрес -->
            <li class="flex items-center gap-3 text-white text-sm leading-none">
              <UIcon name="heroicons:map-pin" class="w-5 h-5 text-zinc-400 shrink-0" />
              <span>{{ studio.address }}</span>
            </li>

            <!-- Метро -->
            <li class="flex items-center gap-3 text-white text-sm leading-none">
              <UIcon name="heroicons:building-office-2" class="w-5 h-5 text-red-500 shrink-0" />
              <span>м. {{ studio.metro }}</span>
            </li>

            <!-- Рейтинг Яндекс -->
            <li class="flex items-center gap-4 text-white text-sm mt-1">
              <div class="flex items-center gap-1.5">
                <UIcon name="heroicons:star" class="w-5 h-5 text-red-500 shrink-0" />
                <span class="font-semibold">5,0</span>
              </div>
              <div class="flex items-center gap-1.5 bg-zinc-900/80 px-2 py-1 rounded text-xs border border-zinc-800">
                <img src="../assets/img/yandex-logo.svg" alt="yandex">
                <span class="capitalize text-zinc-300">Хорошее место</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const studios = [
  {
    id: 1,
    title: 'ТАГИЛЬСКАЯ',
    address: 'Москва, Тагильская ул., д. 4В',
    metro: 'Бульвар Рокоссовского',
    bgImage: '/gallery/tag.jpg'
  },
  {
    id: 2,
    title: 'КРАСНАЯ СОСНА',
    address: 'Москва, ул. Красная Сосна, д. 3A',
    metro: 'Ростокино',
    bgImage: '/gallery/sosna.jpg'
  },
  {
    id: 3,
    title: 'ГРАЙВОРОНОВСКИЙ',
    address: 'Москва, 1-й Грайвороновский проезд, 11к2',
    metro: 'Текстильщики',
    bgImage: '/gallery/tekst.jpg'
  },
  {
    id: 4,
    title: 'КОМИНТЕРНА',
    address: 'Москва, ул. Коминтерна, 15',
    metro: 'Бабушкинская',
    bgImage: '/gallery/kom.webp'
  }
]

const scrollTo = (id) => {
  const target = document.querySelector(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
