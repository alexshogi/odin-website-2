<script setup lang="ts">
interface FaqItem {
  label: string;
  content: string;
}

const faqItems: FaqItem[] = [
  {
    label: 'Есть ли полугодовые/годовые абонементы?',
    content: `
      Концепция наших студий основана на почасовых занятиях с тренером или без.<br><br>
      Приобретая разовую тренировку или блок занятий с тренером, клиент не обязан покупать годовой доступ в студию.
    `
  },
  {
    label: 'Сколько человек может находиться в студии?',
    content: `
      Одновременно в студии могут заниматься:<br>
      • <strong>От 1 до 7 человек</strong> — максимальный состав группы при тренировках с тренером.<br>
      • <strong>До 3 человек</strong> — максимальное количество участников при самостоятельных занятиях.<br><br>
      <span class="text-xs italic text-zinc-400 dark:text-zinc-500">Примечание: дети, которые не тренируются, а просто ждут родителей, в этот лимит не входят.</span>
    `
  },
  {
    label: 'Сколько длится тренировка, если я бронирую час?',
    content: `
      Сама тренировка длится ровно <strong>60 минут</strong>.<br><br>
      При этом доступ в студию через приложение открывается заранее и действует дольше:<br>
      • <strong>За 10 минут до начала</strong> занятия — чтобы вы успели переодеться.<br>
      • <strong>В течение 20 минут после</strong> окончания — чтобы вы могли спокойно собраться.
    `
  },
  {
    label: 'Можно ли забронировать тренировку на 1,5 часа?',
    content: `
      Нет, забронировать полтора часа нельзя.<br><br>
      Вы можете оформить бронирование только на фиксированное количество часов:<br>
      • На 1 полный час.<br>
      • На несколько часов подряд (например, 2 или 3 часа), если это время еще не занято другими клиентами.
    `
  },
  {
    label: 'Какая комплектация студии?',
    content: `
      В наших студиях есть всё необходимое для полноценных тренировок:<br><br>
      • <strong>Тренажеры:</strong> мультистанция (Смит, кроссовер, брусья, турник), силовая рама, гребной тренажер, беговая дорожка, гиперэкстензия, тренажер для разгибания/сгибания ног, регулируемые скамьи (2 горизонтальные, 2 наклонные), безопасное резиновое покрытие.<br>
      • <strong>Свободные веса:</strong> гантели от 1 до 20 кг; гири (4, 8, 10, 16, 24 кг); 5 штанг (4 олимпийских грифа по 20 кг и 1 гриф 10 кг); блины суммарным весом от 1,25 до 25 кг.<br>
      • <strong>Мелкий инвентарь:</strong> коврики, TRX, полусфера, медбол, степы, роллы для МФР, резинки (короткие и для подтягиваний от 10 до 60 кг), утяжелители, манжеты для ног, тяжелоатлетические пояса (S, M) и пояс с цепью, кистевые бинты и лямки, скакалки, подкладки для штанги.<br>
      • <strong>Дополнительно:</strong> биоимпедансные весы для анализа состава тела, кулер с водой, аптечка, резинки для волос и даже зонтик на случай непогоды.
    `
  }
];
</script>

<template>
  <div id="faq" class="w-full max-w-3xl mx-auto py-12 px-4">
    <!-- Заголовок -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
        Частые <span class="text-red-600 dark:text-red-500">вопросы</span>
      </h2>
    </div>

    <!-- Нативный аккордеон на <details>: работает без JS и гидратации -->
    <div class="flex w-full flex-col gap-3">
      <details
        v-for="item in faqItems"
        :key="item.label"
        class="group rounded-xl border border-zinc-200 bg-white text-black transition-colors open:border-black open:bg-black open:text-white hover:border-red-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:open:border-white dark:open:bg-white dark:open:text-black dark:hover:border-red-600"
      >
        <summary class="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left text-base font-bold md:text-lg [&::-webkit-details-marker]:hidden">
          <span>{{ item.label }}</span>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180 group-open:text-red-600"
          />
        </summary>
        <div
          class="mt-2 border-l-2 border-red-600 px-4 pb-4 pl-4 pt-1 leading-relaxed text-zinc-600 dark:text-zinc-400"
          v-html="item.content"
        />
      </details>
    </div>
  </div>
</template>
