<script setup lang="ts">
import { ref, computed } from 'vue';

const STUDIO_ID = 3;
const isLoading = ref(false);
const isIframeLoaded = ref(false);
const isActivated = ref(false); // Флаг: нажал ли пользователь на кнопку активации

const fitbaseWidgetUrl = computed(() => {
  return `https://m58666.fitbase.io/schedule-fitbase-widget?club=${STUDIO_ID}`;
});

// Активация виджета по клику
function activateWidget() {
  isActivated.value = true;
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
          Расписание занятий Грайвороновский
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Выберите удобное время и запишитесь на тренировку онлайн
        </p>
      </div>

      <!-- Контейнер виджета -->
      <div class="relative w-full h-[500px] md:h-[650px] bg-zinc-50 dark:bg-zinc-950/40">
        
        <!-- СОСТОЯНИЕ 1: Интерактивное превью (Ноль влияния на TBT / Script Evaluation) -->
        <div 
          v-if="!isActivated" 
          class="absolute inset-0 flex flex-col items-center justify-center p-8 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm z-20 text-center"
        >
          <h3 class="text-lg font-bold text-zinc-800 dark:text-zinc-200">Онлайн-расписание</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-1 mb-6">
            Нажмите кнопку ниже, чтобы загрузить актуальное расписание и записаться на тренировку.
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
            :src="fitbaseWidgetUrl"
            frameborder="0"
            scrolling="yes"
            allow="geolocation"
            class="w-full h-full border-0 rounded-b-xl transition-opacity duration-500"
            :class="{ 'opacity-100': isIframeLoaded, 'opacity-0': !isIframeLoaded }"
            title="Онлайн-расписание FitBase"
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
