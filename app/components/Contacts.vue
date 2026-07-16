<script setup>
import { ref, computed } from 'vue'

// Данные филиалов студии ОДИН с официального сайта
const locations = [
  {
    id: 'tagilskaya',
    name: 'ОДИН Тагильская',
    address: 'ул. Тагильская, д. 4В, помещение H29',
    metro: 'м. Бульвар Рокоссовского',
    rating: '5,0 yandex Хорошее место',
    // Ссылка на эмбед карты Яндекса для данного адреса
    mapUrl: 'https://' + 'yandex.ru' + '/map-widget/v1/' + '?ll=37.752658,55.815380&z=16&pt=37.752658,55.815380,pm2rdm'
  },
  {
    id: 'krasnaya_sosna',
    name: 'ОДИН Красная Сосна',
    address: 'ул. Красная Сосна, д. 3A',
    metro: 'м. Ростокино',
    rating: '5,0 yandex Хорошее место',
    mapUrl: 'https://' + 'yandex.ru' + '/map-widget/v1/' + '?ll=37.683910,55.850744&z=16&pt=37.683910,55.850744,pm2rdm'
  },
  {
    id: 'graivoronov',
    name: 'ОДИН Грайвороновский',
    address: '1-й Грайвороновский проезд, 11к2',
    metro: 'м. Текстильщики',
    rating: '5,0 yandex Хорошее место',
    mapUrl: 'https://' + 'yandex.ru' + '/map-widget/v1/' + '?ll=37.722102,55.721956&z=16&pt=37.722102,55.721956,pm2rdm'
  },
  {
    id: 'kominterna',
    name: 'ОДИН Коминтерна',
    address: 'ул. Коминтерна, 15к1, помещение h7',
    metro: 'м. Бабушкинская',
    rating: '5,0 yandex Хорошее место',
    mapUrl: 'https://' + 'yandex.ru' + '/map-widget/v1/' + '?ll=37.686766,55.870652&z=16&pt=37.686766,55.870652,pm2rdm'
  }
]

const activeBranchId = ref('tagilskaya')
const currentBranch = computed(() => locations.find(b => b.id === activeBranchId.value))
</script>

<template>
  <section
    id="contacts"
    class="w-full max-w-(--ui-container) mx-auto py-12 px-4"
  >
    <!-- Заголовок -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
        Контактная <span class="text-red-600 dark:text-red-500">информация</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <!-- ЛЕВАЯ ЧАСТЬ: Переключатели филиалов и инфо -->
      <div class="lg:col-span-5 flex flex-col justify-between space-y-6">
        
        <!-- Список филиалов (Табы) -->
        <div class="space-y-3">
          <button
            v-for="branch in locations"
            :key="branch.id"
            @click="activeBranchId = branch.id"
            class="w-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col group relative overflow-hidden"
            :class="activeBranchId === branch.id 
              ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900 shadow-sm' 
              : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600'"
          >
            <div class="flex items-center justify-between w-full">
              <span class="font-bold text-base uppercase tracking-wider">{{ branch.name }}</span>
              <UIcon 
                name="i-lucide-map-pin" 
                class="w-5 h-5"
                :class="activeBranchId === branch.id ? 'text-red-500' : 'text-zinc-400 group-hover:text-zinc-600'"
              />
            </div>
            <span 
              class="text-xs mt-1"
              :class="activeBranchId === branch.id ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500'"
            >
              {{ branch.metro }}
            </span>
          </button>
        </div>

        <!-- Информация о выбранном филиале -->
        <UCard 
          :ui="{ 
            root: 'border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-none bg-zinc-50 dark:bg-zinc-900/50',
            body: 'p-5 space-y-4'
          }"
        >
          <div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Адрес</span>
            <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
              {{ currentBranch.address }}
            </p>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Рейтинг Яндекса</span>
              <div class="flex items-center space-x-1">
                <UIcon name="i-lucide-star" class="w-4 h-4 fill-amber-500 text-amber-500" />
                <span class="text-xs font-bold text-zinc-900 dark:text-white">5.0 / Хорошее место</span>
              </div>
            </div>
            
            <div class="text-right">
              <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Контакты</span>
              <a href="tel:+79152940004" class="text-sm font-bold text-zinc-900 dark:text-white hover:underline block">
                +7 (915) 294-00-04
              </a>
            </div>
          </div>
        </UCard>
      </div>

      <!-- ПРАВАЯ ЧАСТЬ: Карта (iframe) -->
      <div class="lg:col-span-7 min-h-[350px] lg:min-h-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
        <!-- Индикатор загрузки при смене таба -->
        <iframe
          :key="currentBranch.id"
          :src="currentBranch.mapUrl"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen="true"
          class="absolute inset-0 w-full h-full grayscale dark:invert dark:hue-rotate-180 dark:contrast-125"
          style="position: absolute;"
        ></iframe>
      </div>
    </div>
  </section>
</template>

