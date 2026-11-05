<template>
  <AppHeader />

  <main class="pt-0 md:pt-[calc(4rem+env(safe-area-inset-top))]">
    <NuxtPage />
  </main>

  <LazyAppFooter hydrate-never />
</template>
