<script setup lang="ts">
interface Trainer {
  id: string
  name: string
  photo: string
  role: string
  regalias: string[]
  quotes?: string[]
}

interface StudioTrainers {
  studioId: string
  studioName: string
  address: string
  trainers: Trainer[]
}

const activeStudioId = ref('tagil')

const studiosData = ref<StudioTrainers[]>([
  {
    studioId: 'tagil',
    studioName: 'Тагильская',
    address: 'Тагильская ул., 4В помещение H29',
    trainers: [
      {
        id: 'tagil-arina',
        name: 'Арина',
        role: 'Персональный тренер',
        photo: 'img/coaches/Arina.webp',
        regalias: [
          'Профессиональная школа бодибилдинга и фитнеса',
          'Персональный тренер по фитнесу и бодибилдингу',
        ],
        quotes: [
          'Главная задача фитнеса — приумножать ваше здоровье',
          'В работе со мной вы достигнете своих желаний! Составлю индивидуальный план тренировок и питания как для девушек, которые хотят иметь утончённую фигуру, без перекаченных проблемных зон, так и для мужчин, желающих стать мужественными, сильными и здоровыми!',
        ]
      },
      {
        id: 'tagil-igor',
        name: 'Игорь',
        role:'Персональный тренер',
        photo: 'img/coaches/Igor.webp',
        regalias: [
          'Профессиональная школа по Фитнесу и Бодибилдингу Start Fit',
          'Стаж работы тренером 12 лет',
          'Стаж собственных тренировок 27 лет',
        ],
        quotes: []
      },
    ]
  },
  {
    studioId: 'red-pine',
    studioName: 'Красная сосна',
    address: 'ул. Красная сосна, 3A',
    trainers: [
      {
        id: 'pine-tatiana',
        name: 'Татьяна',
        role: 'Персональный тренер',
        photo: 'img/coaches/Tati.webp',
        regalias: [
          'Колледж фитнеса и бодибилдинга им. Бена Вейдера',
          'Опыт более 9 лет',
        ],
        quotes: [
          'Открою новые грани твоего тела и энергии. Эффективные тренировки плюс персональный план питания — формула твоего успеха',
          'Сильнее, выносливее, ярче — твоя трансформация начинается здесь!',
        ]
      },
      {
        id: 'pine-alexander',
        name: 'Александр',
        role: 'Персональный тренер',
        photo: 'img/coaches/Alexandr.webp',
        regalias: [],
        quotes: [
          'Знакомо чувство, когда тренировки даются тяжело и не приносят удовольствия? Давай изменим это! Моя суперсила — видеть цели каждого и превращать их в четкий и увлекательный план действий. Мы будем заниматься так, как нравится тебе: в твоём темпе, с заботой о самочувствии и полным вниманием к деталям',
          'Я всегда рядом — чтобы поддержать, подстраховать и искренне порадоваться твоим успехам вместе с тобой!'
        ]
      }
    ]
  },
  {
    studioId: 'grayvoron',
    studioName: 'Грайвороновская',
    address: '1-й Грайвороновский проезд, 11к2',
    trainers: [
      {
        id: 'gray-makar',
        name: 'Макар',
        role: 'Персональный тренер',
        photo: 'img/coaches/Makar.webp',
        regalias: [
          'МС по тяжелой атлетике. Призёр чемпионата России',
          'МС по пауэрлифтингу IPF',
          'КМС по гиревому спорту',
          'Тренерский стаж более 6ти лет',
          'Собственный тренировочный стаж более 16ти лет',
        ],
        quotes: []
      }
    ]
  },
  {
    studioId: 'komintern',
    studioName: 'Коминтерна',
    address: 'ул. Коминтерна, 15к1 помещение h7',
    trainers: [
      {
        id: 'kom-alexey',
        name: 'Алексей',
        role: 'Персональный тренер',
        photo: 'img/coaches/Alex.webp',
        regalias: [
          'Колледж профессионального фитнеса Дмитрия Никифорова',
          'Тренировочный стаж 14 лет',
          'Тренерский стаж 5 лет',
        ],
        quotes: [
          'Тренировки — это борьба с самим собой. Борьба со своим характером, ленью, генетикой и обстоятельствами жизни'
        ]
      },
      {
        id: 'kom-eteri',
        name: 'Этери',
        role: 'Персональный тренер',
        photo: 'img/coaches/Eteri.webp',
        regalias: [
          'Ассоциация профессионалов фитнеса (FPA)',
          'Тренерский стаж 4 года',
        ],
        quotes: [
          'Начните тренироваться сегодня — и уже скоро увидите реальные изменения. Подберу для каждого персональный план тренировок и питания, буду с вами на каждом этапе. Я помогу тебе не только похудеть и накачаться, но ещё и почувствовать себя живым и сильным'
        ]
      }
    ]
  }
])

const currentStudio = computed<StudioTrainers>(() => {
  return studiosData.value.find(s => s.studioId === activeStudioId.value) as StudioTrainers
})
</script>

<template>
  <section id="trainers" class="bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
    <div class="max-w-7xl mx-auto">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">
          Наши <span class="text-red-600 dark:text-red-500">тренеры</span>
        </h2>
        <h3 class="text-lg md:text-xl font-bold text-zinc-500 mt-2 font-mono">{{ currentStudio.address }}</h3>
      </div>

      <!-- Вкладки студий -->
      <div class="flex flex-wrap justify-center gap-2 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <button v-for="studio in studiosData" @click="activeStudioId = studio.studioId" :class="[
          'px-5 py-3 text-sm font-bold uppercase rounded-lg transition-all',
          activeStudioId === studio.studioId ? 'bg-red-600 text-white' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
        ]">
          {{ studio.studioName }}
        </button>
      </div>

      <!-- Карточки тренеров -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <article v-for="trainer in currentStudio.trainers" :key="trainer.id" 
          class="group bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col sm:flex-row">
          <!-- Фото -->
          <div class="relative w-full sm:w-56 h-80 bg-zinc-200 dark:bg-zinc-900">
            <img loading="lazy" :src="trainer.photo" :alt="trainer.name" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500">
          </div>
          <!-- Инфо -->
          <div class="p-6 flex flex-col flex-1">
            <h3 class="text-2xl font-black text-zinc-950 dark:text-white uppercase">{{ trainer.name }}</h3>
            <h4 class="text-xs font-bold text-red-600 dark:text-red-400 font-mono mb-4 uppercase">{{ trainer.role }}</h4>
            <div class="space-y-1.5 mb-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <p v-for="reg in trainer.regalias" :key="reg">{{ reg }}</p>
            </div>
            <p v-if="trainer.quotes?.[0]" class="text-zinc-600 dark:text-zinc-400 text-xs italic mb-4 border-l-2 border-red-600 pl-2">
              «{{ trainer.quotes[0] }}»
            </p>

            <p v-if="trainer.quotes?.[1]" class="text-zinc-600 dark:text-zinc-400 text-xs italic mb-4 border-l-2 border-red-600 pl-2">
              «{{ trainer.quotes[1] }}»
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
