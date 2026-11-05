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

        <!-- Общий рейтинг -->
        <div class="shrink-0 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:max-w-xs">
          <div class="flex items-center space-x-4">
            <div>
              <div class="flex items-center space-x-0.5 text-red-600">
                <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-4 h-4 fill-red-600 text-red-600" />
              </div>
              <p class="text-xs font-bold text-zinc-900 dark:text-white mt-1">5.0 на Яндекс.Картах</p>
            </div>
            <div class="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
            <a
              href="https://yandex.ru/maps/org/odin/14674183148/reviews/?ll=37.753191%2C55.816612&z=16"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-1 p-0 text-xs font-bold uppercase tracking-wider text-red-600 transition-colors hover:text-red-500"
            >
              Читать все
              <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Сетка отзывов -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="(review, index) in testimonials"
          :key="index"
          class="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <div class="space-y-4 relative z-10">
            <!-- Верх карточки: звезды и тег направления -->
            <div class="flex items-center justify-between">
              <div class="flex text-red-600">
                <UIcon v-for="star in 5" :key="star" name="i-lucide-star" class="w-3.5 h-3.5 fill-red-600 text-red-600" />
              </div>
              <span class="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {{ review.tag }}
              </span>
            </div>

            <!-- Текст отзыва -->
            <p class="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
              «{{ review.text }}»
            </p>
          </div>

          <!-- Футер карточки с автором -->
          <div class="flex items-center space-x-3 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 relative z-10">
            <NuxtImg
              :src="review.avatar"
              :alt="review.name"
              width="40"
              height="40"
              format="webp"
              loading="lazy"
              decoding="async"
              class="size-10 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800"
            />
            <div>
              <p class="text-xs font-bold text-zinc-900 dark:text-white">
                {{ review.name }}
              </p>
              <p class="text-[11px] text-zinc-500 dark:text-zinc-400">
                {{ review.role }}
              </p>
            </div>
          </div>
        </article>
      </div>
  </section>
</template>
