<script setup lang="ts">
import { ref } from 'vue';

const links = [
  { label: 'Студии', to: '/#studios' },
  { label: 'Расписание', to: '/#schedule' },
  { label: 'Цены', to: '/#prices' },
  { label: 'Тренеры', to: '/#trainers' },
  { label: 'Как это работает', to: '/#howitworks' },
  { label: 'Контакты', to: '/#contacts' }
];

const isMenuOpen = ref(false);
const route = useRoute();
const { isMobile } = useDevice();

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <!-- 
    Используем штатный UHeader из Nuxt UI v4.
    Проп mode="drawer" заставляет мобильное меню открываться на весь экран.
    Через :ui принудительно переопределяем цвет фона для шапки и шторки.
  -->
  <UHeader
    v-model:open="isMenuOpen"
    title="MyBrand"
    to="/"
    mode="drawer"
    class="sticky top-0 z-50 backdrop-blur-md border-b border-zinc-800 pt-safe-top"
    :ui="{
      root: 'bg-zinc-950/95',
      content: 'bg-zinc-900',
      body: 'bg-zinc-900 flex flex-col items-center justify-center pt-safe-top'
    }"
  >
    <!-- Логотип слева -->
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Один Фитнес"
          class="h-10 sm:h-12 object-contain"
        />
      </NuxtLink>
    </template>

    <!-- Десктопное меню -->
    <UNavigationMenu
      v-if="!isMobile"
      :items="links"
      variant="link"
      class="hidden md:flex [--ui-bg-elevated]:bg-transparent [--ui-bg-hover]:bg-transparent"
      :ui="{
        link: 'text-zinc-900 dark:text-white hover:text-primary dark:hover:text-primary data-[active]:text-primary font-bold uppercase tracking-wider text-sm transition-colors duration-300',
      }"
    />

    <!-- Правая часть: кнопка переключения темы и автоматическая кнопка бургера -->
    <template #right>
      <UColorModeButton
        light-icon="i-heroicons-moon-20-solid"
        dark-icon="i-heroicons-sun-20-solid"
        color="neutral"
        variant="ghost"
        class="hover:bg-zinc-800"
      />
      
      <!-- Стандартный бургер из Nuxt UI, который сам превращается в крестик -->
      <UHeaderBurger class="md:hidden text-white" />
    </template>

    <!-- 
      Содержимое мобильного меню, которое отображается во весь экран.
      За счет настроек `:ui` выше, этот блок будет 100% темным.
    -->
    <template #body>
      <div class="relative w-full flex flex-col items-center justify-center min-h-[60vh] px-6 select-none">
        
        <!-- Красное свечение в центре меню -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <!-- Навигационные ссылки -->
        <nav class="flex flex-col items-center gap-8 w-full z-10">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            @click="closeMenu"
            class="text-2xl font-heading font-black uppercase tracking-widest text-zinc-100 hover:text-primary dark:hover:text-primary transition-all duration-300"
            :class="{ 'text-primary dark:text-primary': route.hash === link.to.split('#')[1] }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Подвал внутри мобильной шторки -->
        <div class="mt-16 flex flex-col items-center gap-2 z-10">
          <a href="tel:+79152940004" class="text-sm font-bold text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition-colors">
            +7 (915) 294-00-04
          </a>
          <span class="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Работаем круглосуточно</span>
        </div>

      </div>
    </template>
  </UHeader>
</template>
