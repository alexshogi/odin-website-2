<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { useRoute } from '#imports';

const links = [
  { label: 'Студии', to: '/#studios', hash: 'studios' },
  { label: 'Расписание', to: '/#schedule', hash: 'schedule' },
  { label: 'Цены', to: '/#prices', hash: 'prices' },
  { label: 'Тренеры', to: '/#trainers', hash: 'trainers' },
  { label: 'Как это работает', to: '/#howitworks', hash: 'howitworks' },
  { label: 'Контакты', to: '/#contacts', hash: 'contacts' }
];

const isMenuOpen = ref(false);
const route = useRoute();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

const closeMenu = () => {
  isMenuOpen.value = false;
};

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark';
};

// Блокируем скролл страницы, пока открыто мобильное меню
watch(isMenuOpen, (open) => {
  if (!import.meta.client) return;
  document.body.style.overflow = open ? 'hidden' : '';
});

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = '';
});
</script>

<template>
  <header class="relative md:sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 pt-safe-top">
    <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        <!-- Логотип -->
        <NuxtLink to="/" class="flex min-h-11 items-center gap-2 shrink-0" @click="closeMenu">
          <NuxtImg
            src="/logo.png"
            alt="Один Фитнес"
            width="175"
            height="50"
            format="webp"
            quality="70"
            class="h-10 sm:h-12 w-auto object-contain"
          />
        </NuxtLink>

        <!-- Десктопное меню -->
        <nav class="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Основная навигация">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="font-bold uppercase tracking-wider text-xs lg:text-sm whitespace-nowrap transition-colors duration-200"
            :class="route.hash === `#${link.hash}` ? 'text-primary' : 'text-white hover:text-primary'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Управление -->
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-zinc-800 hover:text-primary transition-colors cursor-pointer"
            :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
            @click="toggleColorMode"
          >
            <svg
              v-if="isDark"
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <svg
              v-else
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>

          <button
            type="button"
            class="md:hidden inline-flex size-11 items-center justify-center rounded-lg text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            :aria-expanded="isMenuOpen"
            aria-label="Открыть меню"
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              v-if="isMenuOpen"
              class="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            <svg
              v-else
              class="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  </header>

  <!-- Мобильное меню -->
  <Teleport to="body">
    <Transition name="menu">
      <div
        v-if="isMenuOpen"
        class="md:hidden fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 overflow-y-auto bg-zinc-950/98 backdrop-blur-lg"
      >
        <nav class="relative flex min-h-[60vh] flex-col items-center justify-center gap-7 px-6 py-10" aria-label="Мобильная навигация">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="relative z-10 flex min-h-11 items-center text-2xl font-heading font-black uppercase tracking-widest transition-colors duration-200"
            :class="route.hash === `#${link.hash}` ? 'text-primary' : 'text-zinc-100 hover:text-primary'"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>

          <div class="relative z-10 mt-8 flex flex-col items-center gap-2">
            <a href="tel:+79152940004" class="inline-flex min-h-11 items-center text-sm font-bold text-zinc-400 hover:text-primary transition-colors">
              +7 (915) 294-00-04
            </a>
            <span class="text-xs uppercase tracking-widest text-zinc-600">Работаем круглосуточно</span>
          </div>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
