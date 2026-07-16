<script setup lang="ts">
import { ref } from 'vue'

interface Step {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
}

// Активная вкладка: 'trainer' или 'self'
const activeTab = ref<'trainer' | 'self'>('trainer')

// Шаги для вкладки "С тренером"
const trainerSteps = ref<Step[]>([
  {
    id: 't-1',
    stepNumber: '01',
    title: 'Оставь заявку',
    description: 'Оставь заявку на сайте или позвони. Администратор сразу передаст твой контакт тренеру.',
    icon: 'i-lucide-phone-call'
  },
  {
    id: 't-2',
    stepNumber: '02',
    title: 'Запишись на время',
    description: 'Тренер свяжется с тобой и подберет идеальное время для первой тренировки.',
    icon: 'i-lucide-calendar-days'
  },
  {
    id: 't-3',
    stepNumber: '03',
    title: 'Приходи в зал',
    description: 'Приходи в назначенное время, оплачивай пробное занятие и начинай заниматься.',
    icon: 'i-lucide-dumbbell'
  }
])

// Шаги для вкладки "Самостоятельно"
const selfSteps = ref<Step[]>([
  {
    id: 's-1',
    stepNumber: '01',
    title: 'Скачай приложение',
    description: 'Установи наше официальное приложение студии (ссылки ждут тебя внизу страницы).',
    icon: 'i-lucide-smartphone'
  },
  {
    id: 's-2',
    stepNumber: '02',
    title: 'Оплати занятия',
    description: 'Купи разовое посещение или выгодный блок для самостоятельных тренировок прямо в приложении.',
    icon: 'i-lucide-credit-card'
  },
  {
    id: 's-3',
    stepNumber: '03',
    title: 'Забронируй час',
    description: 'В разделе «Расписание» выбери любое свободное время и подтверди запись.',
    icon: 'i-lucide-clock'
  },
  {
    id: 's-4',
    stepNumber: '04',
    title: 'Управляй доступом',
    description: 'Приходи к залу, нажми в приложении «ВОЙТИ В ЗАЛ». После тренировки нажми «ВЫЙТИ ИЗ ЗАЛА».',
    icon: 'i-lucide-door-open'
  }
])
</script>

<template>
  <section id="howitworks" class="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Заголовок -->
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
          Как это <span class="text-red-600 dark:text-red-500">работает</span>
        </h2>
      </div>

      <!-- Переключатель вкладок (Табы) -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-md w-full sm:w-auto">
          <button
            @click="activeTab = 'trainer'"
            :class="[
              'flex-1 sm:flex-none px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200',
              activeTab === 'trainer'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            ]"
          >
            С тренером
          </button>
          <button
            @click="activeTab = 'self'"
            :class="[
              'flex-1 sm:flex-none px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200',
              activeTab === 'self'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            ]"
          >
            Самостоятельно
          </button>
        </div>
      </div>

      <!-- Сетка шагов (Динамическая) -->
      <div 
        class="grid grid-cols-1 sm:grid-cols-2 lg:gap-6 gap-6 relative transition-all duration-300"
        :class="activeTab === 'trainer' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'"
      >
        <div 
          v-for="step in (activeTab === 'trainer' ? trainerSteps : selfSteps)"
          :key="step.id" 
          class="group relative bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-red-600 dark:hover:border-red-500 p-6 rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          <!-- Фоновый декоративный номер шага -->
          <div class="absolute -right-4 -bottom-6 font-black text-8xl text-zinc-200/50 dark:text-zinc-900/40 pointer-events-none group-hover:text-red-600/10 dark:group-hover:text-red-500/10 transition-colors duration-300 font-mono">
            {{ step.stepNumber }}
          </div>

          <div>
            <!-- Верхняя панель: Иконка и Номер -->
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-red-600 dark:group-hover:bg-red-500 group-hover:border-red-600 dark:group-hover:border-red-500 transition-colors duration-300">
                <Icon 
                  :name="step.icon" 
                  class="w-5 h-5 text-zinc-900 dark:text-white group-hover:text-white group-hover:scale-110 transition-all duration-300" 
                />
              </div>
              <span class="text-red-600 dark:text-red-500 font-mono font-bold text-sm tracking-wider">
                Шаг {{ step.stepNumber }}
              </span>
            </div>

            <!-- Текстовый блок -->
            <h3 class="text-xl font-bold text-zinc-950 dark:text-white mb-3 tracking-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-300">
              {{ step.title }}
            </h3>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative z-10">
              {{ step.description }}
            </p>
          </div>

          <!-- Декоративная красная полоса снизу карточки -->
          <div class="absolute bottom-0 left-0 h-0.75 bg-red-600 dark:bg-red-500 w-0 group-hover:w-full transition-all duration-300"></div>
        </div>
      </div>

      <!-- Блок: Что взять с собой -->
      <div class="mt-16 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0 text-red-600 dark:text-red-500">
            <Icon name="i-lucide-luggage" class="w-6 h-6" />
          </div>
          <div>
            <h4 class="text-xl font-extrabold text-zinc-950 dark:text-white uppercase tracking-tight">
              Что взять с собой?
            </h4>
            <p class="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">
              Минимум вещей — максимум результата
            </p>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-3 w-full md:w-auto">
          <span class="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200 shadow-sm">
            👟 Сменную обувь и кроссовки
          </span>
          <span class="px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200 shadow-sm">
            👕 Спортивную форму
          </span>
          <span class="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-sm font-bold text-red-700 dark:text-red-400 shadow-sm">
            🔥 Гордость за себя, что решились!
          </span>
        </div>
      </div>

    </div>
  </section>
</template>
