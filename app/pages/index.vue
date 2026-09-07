<template>
  <Hero />

  <!-- <Studios /> -->

  <LazyDownloadApps />

  <LazySchedule />

  <NuxtHydrate when-visible>
    <LazyStudiosSlider />
  </NuxtHydrate>

  <LazyHowItWorks />

  <LazyPricingPackages />

  <LazyTrainerSelection />

  <LazyFAQ />

  <LazyContacts />

  <NuxtHydrate when-visible>
    <LazyCallbackForm />
  </NuxtHydrate>

  <NuxtHydrate when-visible>
    <LazyReviews />
  </NuxtHydrate>
</template>
