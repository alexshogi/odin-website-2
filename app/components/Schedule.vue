<script setup lang="ts">
import { ref, computed } from 'vue';

interface Studio {
  id: number;
  label: string;
}

const studios: Studio[] = [
  { id: 3, label: 'Грайвороновская' },
  { id: 4, label: 'Коминтерна' }
];

const activeStudioId = ref(3);
const activatedStudios = ref<number[]>([]); // Студии, для которых пользователь уже открыл расписание
const isLoading = ref(false);
const isIframeLoaded = ref(false);

const activeStudio = computed(() => {
  return studios.find(studio => studio.id === activeStudioId.value) ?? studios[0];
});

// Виджет рендерится только после клика по кнопке для текущей студии
const isActivated = computed(() => activatedStudios.value.includes(activeStudioId.value));

const fitbaseWidgetUrl = computed(() => {
  return `https://m58666.fitbase.io/schedule-fitbase-widget?club=${activeStudioId.value}`;
});

// Переключение студии: уже открытое расписание сразу загружаем, иначе показываем превью
function selectStudio(id: number) {
  if (id === activeStudioId.value) return;

  activeStudioId.value = id;
  isIframeLoaded.value = false;
  isLoading.value = activatedStudios.value.includes(id);
}

// Активация виджета по клику
function activateWidget() {
  if (!activatedStudios.value.includes(activeStudioId.value)) {
    activatedStudios.value.push(activeStudioId.value);
  }
  isIframeLoaded.value = false;
  isLoading.value = true;
}

// Скрытие скелетона только после полной загрузки фрейма
function handleIframeLoad() {
  isLoading.value = false;
  isIframeLoaded.value = true;
}
</script>

<template>
  <section 
    id="schedule" 
    class="w-full max-w-(--ui-container) mx-auto px-4 py-12 sm:py-16 lg:py-20"
  >
    <div class="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-colors duration-200 overflow-hidden">
      
      <!-- Шапка секции -->
      <div class="p-6 border-b border-zinc-100 dark:border-zinc-800/60 text-center">
        <h2 class="text-2xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
          Расписание занятий
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Выберите студию, удобное время и запишитесь на тренировку онлайн
        </p>
      </div>

      <!-- Переключатель студий -->
      <div class="p-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <div
          class="flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Выбор студии"
        >
          <button
            v-for="studio in studios"
            :key="studio.id"
            type="button"
            role="tab"
            :aria-selected="activeStudioId === studio.id"
            @click="selectStudio(studio.id)"
            :class="[
              'px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer border',
              activeStudioId === studio.id
                ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600'
            ]"
          >
            {{ studio.label }}
          </button>
        </div>
      </div>

      <!-- Контейнер виджета -->
      <div class="relative w-full h-[500px] md:h-[650px] bg-zinc-50 dark:bg-zinc-950/40">
        
        <!-- СОСТОЯНИЕ 1: Интерактивное превью (Ноль влияния на TBT / Script Evaluation) -->
        <div 
          v-if="!isActivated" 
          class="absolute inset-0 flex flex-col items-center justify-center p-8 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm z-20 text-center"
        >
          <h3 class="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            Онлайн-расписание · {{ activeStudio.label }}
          </h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-1 mb-6">
            Нажмите кнопку ниже, чтобы загрузить актуальное расписание студии «{{ activeStudio.label }}» и записаться на тренировку.
          </p>
          <UButton
            size="xl"
            color="primary"
            class="font-bold rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform"
            icon="i-lucide-play"
            @click="activateWidget"
          >
            Показать расписание
          </UButton>
        </div>

        <!-- СОСТОЯНИЕ 2: Скелетон во время реальной загрузки фрейма -->
        <div 
          v-if="isLoading" 
          class="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-4 bg-white dark:bg-zinc-900 z-10"
        >
          <USkeleton class="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md" />
          <USkeleton class="h-4 w-48 bg-zinc-100 dark:bg-zinc-800/60 animate-pulse rounded-md" />
          <div class="w-full max-w-md space-y-2 pt-4">
            <USkeleton class="h-12 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-xl" />
            <USkeleton class="h-12 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-xl" />
          </div>
        </div>

        <!-- Настоящий iframe (Рендерится СТРОГО после клика) -->
        <ClientOnly>
          <iframe
            v-if="isActivated"
            :key="activeStudioId"
            :src="fitbaseWidgetUrl"
            frameborder="0"
            scrolling="yes"
            allow="geolocation"
            class="w-full h-full border-0 rounded-b-xl transition-opacity duration-500"
            :class="{ 'opacity-100': isIframeLoaded, 'opacity-0': !isIframeLoaded }"
            :title="`Онлайн-расписание FitBase — ${activeStudio.label}`"
            @load="handleIframeLoad"
          />
        </ClientOnly>
      </div>

      <!-- Резервный блок -->
      <div class="p-6 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800/60 text-center">
        <p class="text-xs text-zinc-400 dark:text-zinc-500 mb-3">
          Не отображается расписание? Откройте его в отдельной вкладке:
        </p>
        <UButton
          :to="fitbaseWidgetUrl"
          target="_blank"
          size="lg"
          variant="outline"
          color="neutral"
          trailing-icon="i-lucide-external-link"
          class="rounded-xl! font-bold cursor-pointer"
        >
          Открыть на Fitbase
        </UButton>
      </div>

    </div>
  </section>
</template>
