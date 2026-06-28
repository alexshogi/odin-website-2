<script setup lang="ts">
import { ref } from 'vue';

const links = [
  { label: 'Студии', to: '/#studios' },
  { label: 'Расписание', to: '/#schedule' },
  { label: 'Контакты', to: '/#contacts' },
];

const isMenuOpen = ref(false);

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
    class="sticky top-0 z-50 backdrop-blur-md"
    :ui="{
      root: 'bg-zinc-950/95 border-b border-zinc-900 text-white',
      content: 'bg-zinc-950 text-white',
      body: 'bg-zinc-950 text-white flex flex-col items-center justify-center'
    }"
  >
    <!-- Логотип слева -->
    <template #left>
      <NuxtLink to="/">
        <img
          src="/logo.png"
          alt="Один Фитнесс"
          class="h-12 sm:h-15 object-contain"
        />
      </NuxtLink>
    </template>

    <!-- Десктопное меню -->
    <UNavigationMenu
      :items="links"
      variant="link"
      class="hidden md:flex [--ui-bg-elevated]:bg-transparent [--ui-bg-hover]:bg-transparent"
      :ui="{
        link: 'text-white hover:text-red-500 data-active:text-red-500 font-bold uppercase tracking-wider text-sm transition-colors',
      }"
    />

    <!-- Правая часть: кнопка переключения темы и автоматическая кнопка бургера -->
    <template #right>
      <UColorModeButton
        light-icon="i-lucide-moon"
        dark-icon="i-lucide-sun"
        color="neutral"
        variant="ghost"
        class="text-white hover:bg-zinc-900"
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
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <!-- Навигационные ссылки -->
        <nav class="flex flex-col items-center gap-8 w-full z-10">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            @click="closeMenu"
            class="text-2xl font-black uppercase tracking-widest text-zinc-200 hover:text-red-500 active:text-red-600 transition-all duration-200 transform hover:scale-105"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Подвал внутри мобильной шторки -->
        <div class="mt-16 flex flex-col items-center gap-2 z-10">
          <a href="tel:+79991112233" class="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
            +7 (999) 111-22-33
          </a>
          <span class="text-[10px] uppercase tracking-widest text-zinc-600">Работаем круглосуточно</span>
        </div>

      </div>
    </template>
  </UHeader>
</template>
