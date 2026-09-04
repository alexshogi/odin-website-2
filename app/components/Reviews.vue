<script setup lang="ts">
// Настоящие отзывы с Яндекс.Карт и сайтов студий «ОДИН»
const testimonials = [
  {
    name: 'Ekaterina',
    role: 'Занимается 6 месяцев',
    avatar: '/img/reviews/ekaterina.png',
    rating: 5,
    tag: 'Мини-группы',
    text: 'Долго искала «ту самую» студию, где не будет толкучки как в больших фитнес-клубах. В ОДИН прекрасная атмосфера, тренеры следят за техникой каждого! За полгода полностью ушли боли в спине, подтянулось тело. Очень рекомендую!'
  },
  {
    name: 'Михаил Т.',
    role: 'Занимается 3 месяца',
    avatar: '/img/reviews/mihail.png',
    rating: 5,
    tag: 'Персональный тренинг',
    text: 'Хожу на Тагильскую к тренеру Дмитрию. Тренировки выстроены четко под мои цели - согнал лишнее, набрал форму. Зал чистый, оборудование новое, комьюнити классное.'
  },
  {
    name: 'Анна В.',
    role: 'Занимается 1 год',
    avatar: '/img/reviews/anna.png',
    rating: 5,
    tag: 'Мини-группы',
    text: 'Обожаю студию на Текстильщиках! Уютно, чисто, администраторы всегда приветливые. Тренировки проходят на одном дыхании, нагрузка отличная, после занятия чувствуешь прилив сил, а не разбитость.'
  },
  {
    name: 'Дмитрий',
    role: 'Занимается 2 месяца',
    avatar: '/img/reviews/dima.jpg',
    rating: 5,
    tag: 'Функциональный тренинг',
    text: 'Формат мини-групп - пушка. Нас всего 4-5 человек, внимание тренера 100%. Ошибки исправляют сразу, халявить не получается. Ценник за такой уровень сервиса более чем адекватный.'
  }
];

onMounted(async () => {
  const { register } = await import('swiper/element/bundle')
  register()
})
</script>

<template>
  <section id="reviews" class="w-full max-w-(--ui-container) mx-auto py-12 px-4">
      <!-- Шапка секции -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div class="space-y-3">
          <h2 class="text-3xl sm:text-4xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
            Отзывы о студиях
          </h2>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
            Реальные истории людей, которые доверили нам свое тело, здоровье и тренировочный процесс.
          </p>
        </div>

        <!-- Общий рейтинг в стиле Nuxt UI v4 -->
        <UCard 
          :ui="{ 
            root: 'bg-white dark:bg-zinc-900 border shadow-none border-zinc-200 dark:border-zinc-800 rounded-2xl shrink-0 md:max-w-xs',
            body: 'p-4 flex items-center space-x-4'
          }"
        >
          <div>
            <div class="flex items-center space-x-0.5 text-red-600">
              <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-4 h-4 fill-red-600 text-red-600" />
            </div>
            <p class="text-xs font-bold text-zinc-900 dark:text-white mt-1">5.0 на Яндекс.Картах</p>
          </div>
          <div class="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
          <UButton 
            variant="link" 
            to="https://yandex.ru/maps/org/odin/14674183148/reviews/?ll=37.753191%2C55.816612&z=16" 
            target="_blank"
            size="sm"
            class="p-0 font-bold uppercase tracking-wider text-xs text-red-600 hover:text-red-500"
            trailing-icon="i-lucide-arrow-up-right"
          >
            Читать все
          </UButton>
        </UCard>
      </div>

      <!-- Сетка отзывов на компонентах Nuxt UI v4 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard 
          v-for="(review, index) in testimonials" 
          :key="index"
          :ui="{
            root: 'border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col',
            body: 'p-6 flex-1 flex flex-col justify-between relative overflow-hidden'
          }"
        >
          <div class="space-y-4 relative z-10">
            <!-- Верх карточки: звезды и тег направления -->
            <div class="flex items-center justify-between">
              <div class="flex text-red-600">
                <UIcon v-for="star in 5" :key="star" name="i-lucide-star" class="w-3.5 h-3.5 fill-red-600 text-red-600" />
              </div>
              <UBadge color="neutral" variant="subtle" size="sm" class="rounded-md font-medium text-[10px]">
                {{ review.tag }}
              </UBadge>
            </div>

            <!-- Текст отзыва -->
            <p class="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
              «{{ review.text }}»
            </p>
          </div>

          <!-- Футер карточки с автором (UAvatar) -->
          <div class="flex items-center space-x-3 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 relative z-10">
            <UAvatar 
              :src="review.avatar" 
              :alt="review.name"
              loading="lazy"
              size="lg"
              class="rounded-xl object-cover transition-all duration-500 border border-zinc-200 dark:border-zinc-800"
            />
            <div>
              <h4 class="text-xs font-bold text-zinc-900 dark:text-white">
                {{ review.name }}
              </h4>
              <p class="text-[11px] text-zinc-500 dark:text-zinc-500">
                {{ review.role }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
  </section>
</template>
