<script setup lang="ts">
// Начинаем гидратацию за 300px до появления секции во вьюпорте,
// чтобы к моменту скролла кнопки и табы уже работали.
const hydrateOnVisible = { rootMargin: '300px 0px' };
</script>

<template>
  <LazyHero hydrate-never />

  <!-- <Studios /> -->

  <LazyDownloadApps :hydrate-on-visible="hydrateOnVisible" />

  <LazySchedule :hydrate-on-visible="hydrateOnVisible" />

  <LazyStudiosSlider :hydrate-on-visible="hydrateOnVisible" />

  <LazyHowItWorks :hydrate-on-visible="hydrateOnVisible" />

  <LazyPricingPackages :hydrate-on-visible="hydrateOnVisible" />

  <LazyTrainerSelection :hydrate-on-visible="hydrateOnVisible" />

  <LazyFAQ :hydrate-on-visible="hydrateOnVisible" />

  <LazyContacts :hydrate-on-visible="hydrateOnVisible" />

  <LazyCallbackForm :hydrate-on-visible="hydrateOnVisible" />

  <LazyReviews :hydrate-on-visible="hydrateOnVisible" />
</template>
