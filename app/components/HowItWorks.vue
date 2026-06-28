<script setup lang="ts">
interface Step {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
}

const steps = ref<Step[]>([
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Выбери формат',
    description: 'Занимайся самостоятельно или выбери профессионального тренера в приложении.',
    icon: 'i-lucide-dumbbell'
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Найди студию',
    description: 'Все наши студии находятся в шаговой доступности рядом с домом или работой.',
    icon: 'i-lucide-map-pin'
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Забронируй время',
    description: 'Выбери подходящий час. Доступ в студию откроется автоматически через код в приложении.',
    icon: 'i-lucide-calendar-clock'
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Тренируйся свободно',
    description: 'Приходи один или бери с собой друга без доплат.',
    icon: 'i-lucide-zap'
  }
])
</script>

<template>
  <!-- <section class="bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300"> -->
  <section
    id="howitworks"
    class="w-full max-w-(--ui-container) mx-auto py-12 px-4"
  >
    <div class="max-w-7xl mx-auto">
      
      <!-- Заголовок секции -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
            Как это <span class="text-red-600 dark:text-red-500">работает</span>
          </h2>
        </div>
      </div>

      <!-- Сетка шагов -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div 
          v-for="step in steps" 
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
    </div>
  </section>
</template>
