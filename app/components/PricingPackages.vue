<script setup lang="ts">
interface PriceItem {
  name: string
  price: number
  note?: string
}

interface PriceCategory {
  title: string
  icon: string
  items: PriceItem[]
}

interface Studio {
  id: string
  name: string
  categories: PriceCategory[]
}

const activeStudioId = ref('tagil')

const studios = ref<Studio[]>([
  {
    id: 'tagil',
    name: 'Тагильская',
    categories: [
      {
        title: 'Персонально с тренером',
        icon: 'i-lucide-user',
        items: [
          { name: 'Пробная тренировка', price: 1500 },
          { name: 'Разовое занятие', price: 3500 },
          { name: 'Блок из 5 занятий', price: 14000 },
          { name: 'Блок из 10 занятий', price: 27000 }
        ]
      },
      {
        title: 'Мини-группа (2-4 человека)',
        icon: 'i-lucide-users',
        items: [
          { name: 'Пробная тренировка', price: 1000 },
          { name: 'Разовое занятие', price: 2500 },
          { name: 'Блок из 5 занятий', price: 10000 },
          { name: 'Блок из 10 занятий', price: 18000 },
          { name: 'Блок из 10 занятий', price: 16000, note: 'Дети до 18 лет' }
        ]
      }
    ]
  },
  {
    id: 'red-pine',
    name: 'Красная сосна',
    categories: [
      {
        title: 'Персонально с тренером',
        icon: 'i-lucide-user',
        items: [
          { name: 'Пробная тренировка', price: 1500 },
          { name: 'Разовое занятие', price: 3500 },
          { name: 'Блок из 5 занятий', price: 14000 },
          { name: 'Блок из 10 занятий', price: 27000 }
        ]
      },
      {
        title: 'Мини-группа (2-4 человека)',
        icon: 'i-lucide-users',
        items: [
          { name: 'Пробная тренировка', price: 1000 },
          { name: 'Разовое занятие', price: 2500 },
          { name: 'Блок из 5 занятий', price: 10000 },
          { name: 'Блок из 10 занятий', price: 18000 },
          { name: 'Блок из 10 занятий', price: 16000, note: 'Дети до 18 лет' }
        ]
      }
    ]
  },
  {
    id: 'grayvoron',
    name: 'Грайвороновская',
    categories: [
      {
        title: 'Персонально с тренером',
        icon: 'i-lucide-user',
        items: [
          { name: 'Пробная тренировка', price: 1500 },
          { name: 'Разовое занятие', price: 3000 },
          { name: 'Блок из 5 занятий', price: 12000 },
          { name: 'Блок из 10 занятий', price: 23000 }
        ]
      },
      {
        title: 'Мини-группа (2-4 человека)',
        icon: 'i-lucide-users',
        items: [
          { name: 'Пробная тренировка', price: 1000 },
          { name: 'Разовое занятие', price: 2000 },
          { name: 'Блок из 5 занятий', price: 9000 },
          { name: 'Блок из 10 занятий', price: 16000 },
          { name: 'Блок из 10 занятий', price: 16000, note: 'Дети до 18 лет' }
        ]
      },
      {
        title: 'Самостоятельно (твой зал)',
        icon: 'i-lucide-dumbbell',
        items: [
          { name: 'Разовое посещение', price: 1200 },
          { name: 'Блок из 5 посещений', price: 5500 },
          { name: 'Блок из 10 занятий', price: 10000 }
        ]
      }
    ]
  },
  {
    id: 'komintern',
    name: 'Коминтерна',
    categories: [
      {
        title: 'Персонально с тренером',
        icon: 'i-lucide-user',
        items: [
          { name: 'Пробная тренировка', price: 1500 },
          { name: 'Разовое занятие', price: 3500 },
          { name: 'Блок из 5 занятий', price: 14000 },
          { name: 'Блок из 10 занятий', price: 27000 }
        ]
      },
      {
        title: 'Мини-группа (2-4 человека)',
        icon: 'i-lucide-users',
        items: [
          { name: 'Пробная тренировка', price: 1000 },
          { name: 'Разовое занятие', price: 2500 },
          { name: 'Блок из 5 занятий', price: 10000 },
          { name: 'Блок из 10 занятий', price: 18000 }
        ]
      }
    ]
  }
])

const currentStudio = computed<Studio>(() => {
  return studios.value.find(s => s.id === activeStudioId.value) as Studio
})

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <section id="prices" class="bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
    <div class="max-w-7xl mx-auto">
      
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
          Пакеты <span class="text-red-600 dark:text-red-500">занятий</span>
        </h2>
      </div>

      <!-- Переключатель Вкладок (Студии) -->
      <div class="flex flex-wrap justify-center gap-2 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <button
          v-for="studio in studios"
          :key="studio.id"
          @click="activeStudioId = studio.id"
          :class="[
            'px-5 py-3 text-sm md:text-base font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer border',
            activeStudioId === studio.id
              ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20'
              : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
          ]"
        >
          {{ studio.name }}
        </button>
      </div>

      <!-- Сетка Категорий для выбранной студии -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div
          v-for="(category, idx) in currentStudio.categories"
          :key="idx"
          :class="[
            'bg-zinc-50 dark:bg-zinc-950 border p-6 rounded-xl transition-colors duration-300 flex flex-col h-full justify-between',
            // Выделяем среднюю колонку визуально, если их 3, либо делаем стандартный бордер
            category.title.includes('Персонально') 
              ? 'border-red-600/50 dark:border-red-500/30 ring-1 ring-red-600/20' 
              : 'border-zinc-200 dark:border-zinc-800'
          ]"
        >
          <div>
            <!-- Шапка Категории -->
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div class="w-10 h-10 rounded-lg bg-zinc-200/50 dark:bg-zinc-900 flex items-center justify-center text-red-600 dark:text-red-500">
                <Icon :name="category.icon" class="w-5 h-5" />
              </div>
              <h3 class="text-lg md:text-xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
                {{ category.title }}
              </h3>
            </div>

            <!-- Список тарифов -->
            <div class="space-y-3">
              <div
                v-for="(item, itemIdx) in category.items"
                :key="itemIdx"
                class="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900"
              >
                <div>
                  <p class="text-sm md:text-base font-bold text-zinc-800 dark:text-zinc-200">
                    {{ item.name }}
                  </p>
                  <span v-if="item.note" class="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-semibold px-2 py-0.5 rounded mt-1">
                    {{ item.note }}
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-base md:text-lg font-black text-red-600 dark:text-red-500 whitespace-nowrap">
                    {{ formatPrice(item.price) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Кнопка действия для карточки -->
          <!-- <div class="mt-8">
            <button class="w-full py-3 px-4 rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer border border-transparent dark:border-zinc-800">
              Выбрать тариф
            </button>
          </div> -->

        </div>
      </div>

    </div>
  </section>
</template>
