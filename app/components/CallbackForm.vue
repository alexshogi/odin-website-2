<script setup lang="ts">
import { ref, reactive } from 'vue';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { vMaska } from 'maska/vue';

const contactMethods = [
  { 
    value: 'call', 
    label: 'Звонок',
    svg: '<svg class="w-6 h-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 118.72" style="enable-background:new 0 0 122.88 118.72" xml:space="preserve"><g><path d="M29.22,56.54c3.57,6.43,7.67,12.6,13.02,18.24C47.58,80.45,54.24,85.6,62.86,90c0.64,0.31,1.25,0.31,1.78,0.1 c0.82-0.31,1.66-0.99,2.48-1.81c0.64-0.64,1.43-1.66,2.26-2.77c3.31-4.36,7.42-9.77,13.21-7.07c0.13,0.06,0.23,0.13,0.35,0.19 l19.33,11.11c0.06,0.03,0.13,0.1,0.19,0.13c2.55,1.75,3.6,4.46,3.63,7.52c0,3.12-1.15,6.63-2.83,9.58 c-2.22,3.91-5.51,6.5-9.29,8.21c-3.6,1.66-7.61,2.55-11.46,3.12c-6.05,0.89-11.71,0.32-17.5-1.46c-5.67-1.75-11.37-4.65-17.6-8.5 l-0.46-0.29c-2.86-1.78-5.95-3.7-8.98-5.95c-11.1-8.38-22.4-20.47-29.76-33.78C2.03,57.15-1.34,45.09,0.5,33.59 c1.02-6.3,3.72-12.03,8.44-15.82c4.11-3.31,9.64-5.13,16.81-4.49c0.82,0.06,1.56,0.54,1.94,1.24l12.39,20.94 c1.81,2.35,2.04,4.68,1.05,7.01c-0.82,1.91-2.48,3.67-4.74,5.31c-0.67,0.57-1.46,1.15-2.29,1.75c-2.77,2.01-5.92,4.33-4.84,7.07 L29.22,56.54L29.22,56.54L29.22,56.54z M73.35,7.55c-0.51-0.04-0.99-0.18-1.42-0.4c-0.45-0.23-0.84-0.54-1.16-0.91 c-0.32-0.38-0.57-0.81-0.73-1.29C69.9,4.49,69.84,4,69.88,3.49l0.01-0.07c0.04-0.49,0.18-0.95,0.39-1.36l0.04-0.07 c0.22-0.42,0.52-0.79,0.87-1.08c0.37-0.32,0.81-0.57,1.29-0.73c0.45-0.15,0.93-0.21,1.42-0.18l0.1,0.01 c3.43,0.27,6.74,0.79,9.92,1.55c3.21,0.77,6.27,1.8,9.16,3.05c2.91,1.27,5.65,2.78,8.2,4.52c2.54,1.74,4.91,3.71,7.06,5.9 c2.13,2.17,4.06,4.56,5.77,7.15c1.69,2.57,3.16,5.34,4.4,8.28c1.2,2.88,2.18,5.94,2.92,9.18c0.72,3.17,1.21,6.5,1.45,9.98 l0.01,0.17l0,0.18c0,0.46-0.08,0.91-0.23,1.33c-0.16,0.45-0.4,0.85-0.71,1.2c-0.31,0.35-0.68,0.64-1.1,0.86 c-0.39,0.21-0.84,0.34-1.31,0.4l-0.2,0.02l-0.19,0c-0.47,0.01-0.92-0.07-1.34-0.23c-0.44-0.16-0.85-0.4-1.2-0.71 c-0.37-0.32-0.68-0.72-0.9-1.17c-0.21-0.43-0.35-0.92-0.38-1.42c-0.21-3.09-0.63-6.03-1.26-8.8c-0.63-2.83-1.48-5.5-2.52-8.01 c-1.04-2.52-2.29-4.88-3.72-7.06c-1.45-2.21-3.08-4.23-4.88-6.07c-1.82-1.85-3.81-3.51-5.97-4.98c-2.17-1.48-4.51-2.76-7.01-3.84 l-0.04-0.02c-2.48-1.07-5.11-1.95-7.88-2.61C79.29,8.23,76.39,7.78,73.35,7.55L73.35,7.55z M65.03,43.21 c-0.51-0.05-0.99-0.21-1.41-0.43c-0.44-0.24-0.83-0.56-1.13-0.94c-0.29-0.36-0.52-0.78-0.67-1.23c-0.14-0.42-0.2-0.87-0.18-1.33 c0.01-0.13,0.01-0.23,0.03-0.35c0.07-0.48,0.23-0.93,0.45-1.32c0.23-0.41,0.54-0.77,0.9-1.06c0.36-0.29,0.78-0.52,1.23-0.67 c0.42-0.13,0.87-0.2,1.34-0.18l0.35,0.03c1.49,0.16,2.92,0.42,4.3,0.77c1.4,0.36,2.73,0.82,3.98,1.36l0.04,0.02 c1.27,0.56,2.46,1.21,3.57,1.96c1.12,0.76,2.16,1.61,3.12,2.57c0.95,0.95,1.81,1.98,2.57,3.1c0.76,1.11,1.42,2.3,1.99,3.58 c0.55,1.25,1.01,2.58,1.37,3.98c0.35,1.37,0.6,2.83,0.76,4.37c0.05,0.51,0,1.01-0.13,1.47l-0.01,0.04 c-0.14,0.46-0.38,0.89-0.67,1.26l-0.01,0.02c-0.31,0.38-0.69,0.69-1.13,0.93c-0.42,0.23-0.9,0.38-1.41,0.43l-0.05,0 c-0.49,0.04-0.97-0.01-1.42-0.14c-0.48-0.14-0.92-0.38-1.3-0.69l-0.01,0c-0.38-0.31-0.7-0.69-0.94-1.14 c-0.23-0.42-0.38-0.9-0.43-1.4l0-0.04c-0.11-1.09-0.29-2.13-0.54-3.12c-0.25-1.01-0.57-1.95-0.95-2.82 c-0.38-0.87-0.82-1.68-1.32-2.42c-0.51-0.75-1.07-1.43-1.69-2.05c-0.62-0.62-1.31-1.18-2.06-1.68c-0.75-0.5-1.57-0.94-2.46-1.33 l-0.05-0.02c-0.87-0.38-1.81-0.69-2.8-0.94C67.22,43.51,66.15,43.33,65.03,43.21L65.03,43.21z M69.03,25.99l-0.1,0l-0.13-0.02 c-0.47-0.05-0.91-0.19-1.3-0.39c-0.42-0.22-0.79-0.51-1.1-0.85l0,0c-0.32-0.36-0.57-0.77-0.73-1.23c-0.15-0.43-0.23-0.89-0.22-1.38 l0-0.17l0.02-0.16c0.05-0.46,0.19-0.9,0.39-1.29c0.22-0.42,0.51-0.8,0.85-1.1c0.37-0.33,0.8-0.58,1.28-0.75 c0.46-0.16,0.95-0.23,1.46-0.2c2.66,0.16,5.19,0.5,7.58,1.01c2.4,0.51,4.67,1.2,6.78,2.06c2.13,0.87,4.12,1.92,5.96,3.14 c1.82,1.21,3.5,2.6,5.01,4.17c1.5,1.55,2.84,3.27,4,5.15c1.15,1.86,2.14,3.88,2.94,6.05c0.78,2.12,1.4,4.4,1.84,6.84 c0.43,2.4,0.69,4.93,0.77,7.62l0.01,0.14c0,0.48-0.09,0.95-0.27,1.38c-0.18,0.45-0.44,0.85-0.76,1.2c-0.33,0.36-0.74,0.65-1.2,0.85 c-0.43,0.2-0.92,0.31-1.43,0.33l-0.17,0c-0.48-0.01-0.93-0.1-1.35-0.27c-0.45-0.18-0.85-0.44-1.19-0.76 c-0.36-0.34-0.65-0.74-0.86-1.2c-0.2-0.44-0.31-0.92-0.33-1.44c-0.06-2.24-0.28-4.35-0.63-6.34c-0.35-2.01-0.85-3.88-1.47-5.6 c-0.62-1.72-1.38-3.3-2.26-4.75c-0.89-1.46-1.91-2.77-3.05-3.96c-1.16-1.19-2.44-2.26-3.85-3.19c-1.42-0.94-2.99-1.75-4.67-2.43 l-0.04-0.02c-1.7-0.67-3.52-1.22-5.47-1.63c-1.96-0.41-4.05-0.69-6.25-0.82L69.03,25.99L69.03,25.99z"/></g></svg>'
  },
  { 
    value: 'telegram', 
    label: 'Telegram',
    svg: `
      <svg class="w-6 h-6" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="99.2583404%" id="linearGradient-1">
                <stop stop-color="#2AABEE" offset="0%"></stop>
                <stop stop-color="#229ED9" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <circle id="Oval" fill="url(#linearGradient-1)" cx="500" cy="500" r="500"></circle>
            <path d="M226.328419,494.722069 C372.088573,431.216685 469.284839,389.350049 517.917216,369.122161 C656.772535,311.36743 685.625481,301.334815 704.431427,301.003532 C708.567621,300.93067 717.815839,301.955743 723.806446,306.816707 C728.864797,310.92121 730.256552,316.46581 730.922551,320.357329 C731.588551,324.248848 732.417879,333.113828 731.758626,340.040666 C724.234007,419.102486 691.675104,610.964674 675.110982,699.515267 C668.10208,736.984342 654.301336,749.547532 640.940618,750.777006 C611.904684,753.448938 589.856115,731.588035 561.733393,713.153237 C517.726886,684.306416 492.866009,666.349181 450.150074,638.200013 C400.78442,605.66878 432.786119,587.789048 460.919462,558.568563 C468.282091,550.921423 596.21508,434.556479 598.691227,424.000355 C599.00091,422.680135 599.288312,417.758981 596.36474,415.160431 C593.441168,412.561881 589.126229,413.450484 586.012448,414.157198 C581.598758,415.158943 511.297793,461.625274 375.109553,553.556189 C355.154858,567.258623 337.080515,573.934908 320.886524,573.585046 C303.033948,573.199351 268.692754,563.490928 243.163606,555.192408 C211.851067,545.013936 186.964484,539.632504 189.131547,522.346309 C190.260287,513.342589 202.659244,504.134509 226.328419,494.722069 Z" id="Path-3" fill="#FFFFFF"></path>
        </g>
      </svg>
    `
  },
  { 
    value: 'max', 
    label: 'MAX',
    svg: '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><linearGradient id="b"><stop offset="0" stop-color="#00f"/><stop offset="1" stop-opacity="0"/></linearGradient><linearGradient id="a"><stop offset="0" stop-color="#4cf"/><stop offset=".662" stop-color="#53e"/><stop offset="1" stop-color="#93d"/></linearGradient><linearGradient id="c" x1="117.847" x2="1000" y1="760.536" y2="500" gradientUnits="userSpaceOnUse" href="#a"/><radialGradient id="d" cx="-87.392" cy="1166.116" r="500" fx="-87.392" fy="1166.116" gradientTransform="rotate(51.356 1551.478 559.3)scale(2.42703433 1)" gradientUnits="userSpaceOnUse" href="#b"/></defs><rect width="1000" height="1000" fill="url(#c)" ry="249.681"/><rect width="1000" height="1000" fill="url(#d)" ry="249.681"/><path fill="#fff" fill-rule="evenodd" d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z" clip-rule="evenodd"/></svg>'
  }
];

// Карта соответствия ключей из компонента и русских названий для бэкенда
const methodLabels: Record<string, string> = {
  call: 'Звонок',
  telegram: 'Telegram',
  max: 'MAX'
};

const schema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().refine((val) => val.replace(/\D/g, '').length === 11, {
    message: 'Введите номер телефона полностью',
  }),
  message: z.string().optional(),
  contactMethod: z.string(),
  // Передаем объект с ключом message напрямую:
  agreeOffer: z.literal(true, {
    message: 'Необходимо согласиться с договором-офертой'
  }),
  agreePersonalData: z.literal(true, {
    message: 'Необходимо согласиться на обработку данных'
  }),
});

type Schema = z.output<typeof schema>;

// Структура данных формы
const state = reactive<Partial<Schema>>({
  name: '',
  phone: '',
  message: '',
  contactMethod: 'call',
  agreeOffer: undefined,
  agreePersonalData: undefined,
});

const isSubmitting = ref<boolean>(false);
const formSent = ref<boolean>(false);
const toast = useToast(); // Используем встроенные уведомления Nuxt UI

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  // Получаем текстовое название выбранного способа связи (или дефолт, если не найдено)
  const selectedMethodLabel = methodLabels[event.data.contactMethod] || event.data.contactMethod;

  // Формируем объект данных в точности так, как ожидает бэкенд api.odin-fitness.ru
  const feedback = {
    name: event.data.name,
    phone: event.data.phone,
    message: event.data.message || '',
    contacts: selectedMethodLabel,
  };

  try {
    // Используем встроенный в Nuxt метод $fetch
    const result = await $fetch<{ error?: string }>('https://api.odin-fitness.ru/submit', {
      method: 'POST',
      body: feedback, // $fetch сам добавит заголовки и преобразует в JSON
    });

    console.log('Успех:', result);
    formSent.value = true; // Переключаем флаг успешной отправки

    // Красивое уведомление об успехе
    toast.add({
      title: 'Успешно!',
      description: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
      color: 'success',
      icon: 'i-heroicons-check-circle',
    });

    // Очищаем поля формы сразу после успешного ответа
    state.name = '';
    state.phone = '';
    state.message = '';
    state.contactMethod = 'call';
    state.agreeOffer = true;
    state.agreePersonalData = true;

    // Через 10 секунд сбрасываем статус "форма отправлена", как на старом сайте
    setTimeout(() => {
      formSent.value = false;
    }, 10000);
  } catch (error: any) {
    // Ловим ошибки сети или ошибки со статусом 4xx/5xx от бэкенда
    console.error('Ошибка:', error.message);

    // Пытаемся достать текст ошибки, отправленный сервером
    const backendError = error.data?.error || 'Что-то пошло не так при отправке.';

    toast.add({
      title: 'Ошибка отправки',
      description: backendError,
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle',
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section 
    id="studios" 
    class="w-full max-w-(--ui-container) mx-auto px-4 py-18 sm:py-12 lg:py-18"
  >
    <div class="max-w-xl mx-auto p-8 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <h2 class="text-2xl font-bold uppercase tracking-wider mb-6 text-center">
        Обратная связь
      </h2>

      <!-- Передаем схему в UForm. Убираем нативный required у инпутов, чтобы работала плавная валидация -->
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-5">
        
        <!-- Поле: Имя -->
        <UFormField label="Имя *" name="name">
          <UInput 
            v-model="state.name" 
            placeholder="Ваше имя" 
            size="lg"
            class="w-full"
          />
        </UFormField>

        <!-- Поле: Телефон -->
        <UFormField label="Телефон *" name="phone">
          <UInput 
            v-maska
            v-model="state.phone" 
            data-maska="+7 (###) ###-##-##"
            type="tel"
            placeholder="+7 (999) 999-99-99" 
            size="lg"
            class="w-full"
          />
        </UFormField>

        <!-- Поле: Сообщение -->
        <UFormField label="Сообщение" name="message">
          <UTextarea 
            v-model="state.message" 
            placeholder="Ваш комментарий или вопрос" 
            size="lg"
            class="w-full"
          />
        </UFormField>

        <!-- Поле: Способ связи -->
        <UFormField label="Удобный способ связи" name="contactMethod" class="space-y-3">
          <URadioGroup
            v-model="state.contactMethod"
            :items="contactMethods"
            name="contactMethod"
            class="w-full mt-1"
            :ui="{
              fieldset: 'grid grid-cols-2 sm:grid-cols-3 gap-3 w-full',
              indicator: 'hidden',
              container: 'hidden',
              item: 'w-full odd:last:max-sm:col-span-2',
              label: 'w-full'
            }"
          >
            <template #label="{ item }">
              <div 
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all duration-200 cursor-pointer w-full text-center select-none"
                :class="state.contactMethod === item.value 
                  ? 'border-red-500 bg-red-500/10 text-red-500 shadow-sm scale-[1.02]' 
                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'"
              >
                <span 
                  v-html="item.svg" 
                  :class="state.contactMethod === item.value ? 'text-red-500' : 'text-zinc-400'"
                  class="shrink-0 flex items-center justify-center"
                />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </URadioGroup>
        </UFormField>

        <!-- Чекбоксы с красивой выгрузкой индивидуальных ошибок -->
        <div class="space-y-3 pt-2 text-sm text-zinc-600 dark:text-zinc-400">
          <UFormField name="agreeOffer">
            <UCheckbox v-model="state.agreeOffer">
              <template #label>
                <span>С текстом <a href="/docs/ОфертаСтудия.pdf" target="_blank" class="underline hover:text-zinc-900 dark:hover:text-white transition-colors">лицензионного договора-оферты</a> согласен</span>
              </template>
            </UCheckbox>
          </UFormField>

          <UFormField name="agreePersonalData">
            <UCheckbox v-model="state.agreePersonalData">
              <template #label>
                <span>Даю согласие на <a href="/docs/СтудияПолитика.pdf" target="_blank" class="underline hover:text-zinc-900 dark:hover:text-white transition-colors">обработку персональных данных</a></span>
              </template>
            </UCheckbox>
          </UFormField>
        </div>

        <!-- Кнопка отправки -->
        <div class="pt-2">
          <UButton 
            type="submit" 
            block 
            size="xl" 
            :loading="isSubmitting"
            class="uppercase font-bold tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Отправить
          </UButton>
        </div>

      </UForm>
    </div>
    <!-- Компонент отображения тостов -->
    <UNotifications />
  </section>
</template>
