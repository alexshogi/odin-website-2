export interface StudioPriceItem {
  name: string
  price: number
  note?: string
}

export interface StudioPriceCategory {
  title: string
  icon: string
  items: StudioPriceItem[]
}

export interface Studio {
  slug: string
  name: string
  fullName: string
  address: string
  metro: string
  district: string
  lat: number
  lon: number
  mapUrl: string
  image: string
  intro: string
  selfTraining: boolean
  prices: StudioPriceCategory[]
}

const trainerPrices: StudioPriceCategory = {
  title: 'Персонально с тренером',
  icon: 'i-lucide-user',
  items: [
    { name: 'Пробная тренировка', price: 1500 },
    { name: 'Разовое занятие', price: 3500 },
    { name: 'Блок из 5 занятий', price: 14000 },
    { name: 'Блок из 10 занятий', price: 27000 },
  ],
}

const groupPrices: StudioPriceCategory = {
  title: 'Мини-группа (2–4 человека)',
  icon: 'i-lucide-users',
  items: [
    { name: 'Пробная тренировка', price: 1000 },
    { name: 'Разовое занятие', price: 2500 },
    { name: 'Блок из 5 занятий', price: 10000 },
    { name: 'Блок из 10 занятий', price: 18000 },
    { name: 'Блок из 10 занятий', price: 16000, note: 'Дети до 18 лет' },
  ],
}

const selfPrices: StudioPriceCategory = {
  title: 'Самостоятельно (твой зал)',
  icon: 'i-lucide-dumbbell',
  items: [
    { name: 'Разовое посещение', price: 1200 },
    { name: 'Блок из 5 посещений', price: 5500 },
    { name: 'Блок из 10 занятий', price: 10000 },
  ],
}

export const studios: Studio[] = [
  {
    slug: 'tagilskaya',
    name: 'Тагильская',
    fullName: 'ОДИН Тагильская',
    address: 'ул. Тагильская, 4В, помещение H29',
    metro: 'Бульвар Рокоссовского',
    district: 'Богородское, ВАО',
    lat: 55.81538,
    lon: 37.752658,
    mapUrl: 'https://yandex.ru/map-widget/v1/?ll=37.752658,55.815380&z=16&pt=37.752658,55.815380,pm2rdm',
    image: '/gallery/tag.jpg',
    intro: 'Студия в районе Богородское, ближайшая станция метро — «Бульвар Рокоссовского». Тренировки с тренером и в мини-группах до четырёх человек, без годового абонемента.',
    selfTraining: false,
    prices: [trainerPrices, groupPrices],
  },
  {
    slug: 'krasnaya-sosna',
    name: 'Красная Сосна',
    fullName: 'ОДИН Красная Сосна',
    address: 'ул. Красная Сосна, 3А',
    metro: 'Ростокино',
    district: 'Свиблово, СВАО',
    lat: 55.850744,
    lon: 37.68391,
    mapUrl: 'https://yandex.ru/map-widget/v1/?ll=37.683910,55.850744&z=16&pt=37.683910,55.850744,pm2rdm',
    image: '/gallery/sosna.jpg',
    intro: 'Студия в районе Свиблово, ближайшая станция метро — «Ростокино». Персональные тренировки и мини-группы, оплата разово или блоками занятий.',
    selfTraining: false,
    prices: [trainerPrices, groupPrices],
  },
  {
    slug: 'grayvoronovsky',
    name: 'Грайвороновский',
    fullName: 'ОДИН Грайвороновский',
    address: '1-й Грайвороновский проезд, 11к2',
    metro: 'Текстильщики',
    district: 'Текстильщики, ЮВАО',
    lat: 55.721956,
    lon: 37.722102,
    mapUrl: 'https://yandex.ru/map-widget/v1/?ll=37.722102,55.721956&z=16&pt=37.722102,55.721956,pm2rdm',
    image: '/gallery/tekst.jpg',
    intro: 'Студия в районе Текстильщики, ближайшая станция метро — «Текстильщики». Можно заниматься с тренером, в мини-группе или самостоятельно по своему плану.',
    selfTraining: true,
    prices: [
      {
        ...trainerPrices,
        items: [
          { name: 'Пробная тренировка', price: 1500 },
          { name: 'Разовое занятие', price: 3000 },
          { name: 'Блок из 5 занятий', price: 12000 },
          { name: 'Блок из 10 занятий', price: 23000 },
        ],
      },
      {
        ...groupPrices,
        items: [
          { name: 'Пробная тренировка', price: 1000 },
          { name: 'Разовое занятие', price: 2000 },
          { name: 'Блок из 5 занятий', price: 9000 },
          { name: 'Блок из 10 занятий', price: 16000 },
          { name: 'Блок из 10 занятий', price: 16000, note: 'Дети до 18 лет' },
        ],
      },
      selfPrices,
    ],
  },
  {
    slug: 'kominterna',
    name: 'Коминтерна',
    fullName: 'ОДИН Коминтерна',
    address: 'ул. Коминтерна, 15к1, помещение h7',
    metro: 'Бабушкинская',
    district: 'Бабушкинский, СВАО',
    lat: 55.870652,
    lon: 37.686766,
    mapUrl: 'https://yandex.ru/map-widget/v1/?ll=37.686766,55.870652&z=16&pt=37.686766,55.870652,pm2rdm',
    image: '/gallery/kom.webp',
    intro: 'Студия в Бабушкинском районе, ближайшая станция метро — «Бабушкинская». Персональные занятия, мини-группы и самостоятельные тренировки без годового абонемента.',
    selfTraining: true,
    prices: [trainerPrices, groupPrices, selfPrices],
  },
]

export const studioSlugs = studios.map(studio => studio.slug)

export function getStudio(slug: string): Studio | undefined {
  return studios.find(studio => studio.slug === slug)
}
