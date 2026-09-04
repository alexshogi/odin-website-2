<template>
  <Hero />

  <!-- <Studios /> -->

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

  <LazyDownloadApps />
</template>
