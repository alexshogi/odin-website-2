<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const faqItems: AccordionItem[] = [
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

    <!-- Компонент аккордеона Nuxt UI v4 -->
    <UAccordion
      :items="faqItems"
      multiple
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        root: 'w-full flex flex-col gap-3',
        item: 'border-none',
        trigger: 'group w-full flex justify-between items-center py-4 px-4 text-left font-bold border rounded-xl cursor-pointer shadow-none text-base md:text-lg bg-white text-black border-zinc-200 hover:border-red-600 data-[state=open]:bg-black data-[state=open]:text-white data-[state=open]:border-black dark:bg-zinc-900 dark:text-white dark:border-zinc-800 dark:hover:border-red-600 dark:data-[state=open]:bg-white dark:data-[state=open]:text-black dark:data-[state=open]:border-white',
        trailingIcon: 'w-5 h-5 transform transition-transform duration-200 text-zinc-400 group-data-[state=open]:rotate-180 group-data-[state=open]:text-red-600',
        body: 'px-4',
        content: 'pb-4 pt-1 pl-4 text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-red-600 mt-2'
      }"
    >
      <!-- Слот обработки HTML-контента для всех элементов сразу -->
      <template #content="{ item }">
        <div v-html="item.content" />
      </template>
    </UAccordion>
  </div>
</template>
