<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

export interface SelectOption {
  label: string;
  value: string;
  id: number;
}

const studios: SelectOption[] = [
  { label: 'Рокоссовского', value: 'rokossovskogo', id: 1 },
  { label: 'Ростокино', value: 'rostokino', id: 2 },
  { label: 'Текстильщики', value: 'tekstilschiki', id: 3 },
  { label: 'Бабушкинская', value: 'babushkinskaya', id: 4 },
];

const isLoading = ref(true);
const selectedTabValue = ref('rokossovskogo');
const selectedStudioId = ref(1);

const tabItems = computed(() => {
  return studios.map(studio => ({
    label: studio.label,
    value: studio.value
  }));
});

function onTabChange(newValue: string | number) {
  const targetStudio = studios.find(s => s.value === newValue);

  if (targetStudio) {
    selectedStudioId.value = targetStudio.id;
    startLoadingTimer();
  }
}

const fitbaseWidgetUrl = computed(() => {
  return `https://m58666.fitbase.io/schedule-fitbase-widget?club=${selectedStudioId.value}`;
});

function startLoadingTimer() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}

onMounted(() => {
  startLoadingTimer();
});
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

      <!-- Переключатель студий с поддержкой скролла на мобильных -->
      <div class="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border-b border-zinc-100 dark:border-zinc-800/60 overflow-hidden">
        <div class="-mx-4 px-4 overflow-x-auto scrollbar-none snap-x snap-mandatory flex">
          <UTabs
            v-model="selectedTabValue"
            :items="tabItems"
            class="w-full min-w-max"
            @update:model-value="onTabChange"
            :ui="{
              list: 'bg-zinc-100 dark:bg-zinc-800/60 rounded-xl p-1 gap-1.5 flex flex-nowrap',
              indicator: 'bg-transparent',
              trigger: 'shrink-0 p-0 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer snap-start'
            }"
          >
            <template #default="{ item }">
              <span
                :class="[
                  selectedTabValue === item.value
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.01]'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                ]"
                class="w-full h-full flex items-center justify-center rounded-lg py-3 px-6 whitespace-nowrap transition-all duration-150"
              >
                {{ item.label }}
              </span>
            </template>
          </UTabs>
        </div>
      </div>

      <!-- Контейнер виджета -->
      <div class="relative w-full h-[650px] md:h-[800px] bg-zinc-50 dark:bg-zinc-950/40">
        
        <!-- Скелетон от Nuxt UI -->
        <div 
          v-show="isLoading" 
          class="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-4 bg-white dark:bg-zinc-900 z-10 transition-opacity duration-300"
          :class="{ 'opacity-100': isLoading, 'opacity-0 pointer-events-none': !isLoading }"
        >
          <USkeleton class="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md" />
          <USkeleton class="h-4 w-48 bg-zinc-100 dark:bg-zinc-800/60 animate-pulse rounded-md" />
          <div class="w-full max-w-md space-y-2 pt-4">
            <USkeleton class="h-12 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-xl" />
            <USkeleton class="h-12 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-xl" />
          </div>
        </div>

        <!-- Тег iframe виджета FitBase -->
        <iframe
          :src="fitbaseWidgetUrl"
          frameborder="0"
          scrolling="yes"
          allow="geolocation"
          class="w-full h-full border-0 rounded-b-xl"
          title="Онлайн-расписание FitBase"
        />

      </div>

      <!-- Резервный блок -->
      <div class="p-6 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800/60 text-center">
        <p class="text-xs text-zinc-400 dark:text-zinc-500 mb-3">
          Не отображается расписание? Откройте выбранную студию в отдельной вкладке:
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
          Открыть текущую студию на Fitbase
        </UButton>
      </div>

    </div>
  </section>
</template>

<style scoped>
iframe {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
