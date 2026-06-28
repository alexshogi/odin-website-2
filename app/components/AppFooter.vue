<template>
  <footer class="bg-zinc-950 text-zinc-400 border-t border-zinc-900 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Основная сетка футера -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

        <!-- Блок 1: О бренде -->
        <div class="space-y-4">
          <h3 class="text-white text-xl font-black tracking-wider uppercase">
            ОДИН
          </h3>
          <p class="text-xs leading-relaxed max-w-xs text-zinc-500">
            Сеть фитнес-студий, где заканчиваются поиски «той самой» тренировки. Работаем на результат в мини-группах и персонально с тренером, либо самостоятельно.
          </p>
          <div class="flex space-x-3 pt-2">
            <a
              href="https://t.me/Odinfitness"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-red-600 hover:text-white text-zinc-400 flex items-center justify-center transition-colors"
            >
              <UIcon name="i-lucide-send" class="w-4 h-4" />
            </a>
            <a
              href="https://vk.com/club218956657"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-red-600 hover:text-white text-zinc-400 flex items-center justify-center transition-colors"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC2F1HjrDJ3gp4c4A0Ga-GkQ"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-red-600 hover:text-white text-zinc-400 flex items-center justify-center transition-colors"
            >
              <UIcon name="i-lucide-video" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Блок 2: Адреса студий в Москве -->
        <div class="space-y-4">
          <h4 class="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-600 pl-2">
            Наши студии
          </h4>
          <ul class="space-y-3 text-xs">
            <li class="group flex items-start space-x-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-zinc-300 font-medium">м. Бульвар Рокоссовского</p>
                <p class="text-zinc-500 group-hover:text-zinc-400 transition-colors">ул. Тагильская, д. 4В</p>
              </div>
            </li>
            <li class="group flex items-start space-x-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-zinc-300 font-medium">м. Ростокино</p>
                <p class="text-zinc-500 group-hover:text-zinc-400 transition-colors">ул. Красная Сосна, д. 3A</p>
              </div>
            </li>
            <li class="group flex items-start space-x-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-zinc-300 font-medium">м. Текстильщики</p>
                <p class="text-zinc-500 group-hover:text-zinc-400 transition-colors">1-й Грайвороновский проезд, 11к2</p>
              </div>
            </li>
            <li class="group flex items-start space-x-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-zinc-300 font-medium">м. Бабушкинская</p>
                <p class="text-zinc-500 group-hover:text-zinc-400 transition-colors">ул. Коминтерна, д. 15к1</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Блок 3: Контакты и Режим работы -->
        <div class="space-y-4">
          <h4 class="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-600 pl-2">
            Контакты
          </h4>
          <ul class="space-y-3 text-xs">
            <li class="flex items-center space-x-2">
              <UIcon name="i-lucide-phone" class="w-4 h-4 text-zinc-500" />
              <a href="tel:+79152940004" class="text-zinc-300 font-semibold hover:text-red-500 transition-colors text-sm">
                +7 (915) 294-00-04
              </a>
            </li>
            <li class="flex items-center space-x-2">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-zinc-500" />
              <a href="mailto:dirom1995@mail.ru" class="hover:text-zinc-200 transition-colors">
                dirom1995@mail.ru
              </a>
            </li>
            <li class="flex items-start space-x-2 pt-1 border-t border-zinc-900">
              <UIcon name="i-lucide-clock" class="w-4 h-4 text-zinc-500 mt-0.5" />
              <div>
                <p class="text-zinc-300">Ежедневно</p>
                <p class="text-zinc-500">09:00 – 23:00</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Блок 4: Навигация / Быстрые ссылки -->
        <div class="space-y-4">
          <h4 class="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-red-600 pl-2">
            Навигация
          </h4>
          <ul class="grid grid-cols-2 gap-2 text-xs">
            <li><a href="#studios" class="hover:text-white transition-colors py-1 block">Студии</a></li>
            <li><a href="#reviews" class="hover:text-white transition-colors py-1 block">Отзывы</a></li>
            <li><a href="#contacts" class="hover:text-white transition-colors py-1 block">Контакты</a></li>
            <li class="col-span-2 mt-2">
              <a href="#schedule">
                <UButton 
                  size="sm" 
                  color="neutral" 
                  variant="solid" 
                  block
                  class="rounded-xl! font-bold bg-white text-black hover:bg-red-600 hover:text-white transition-colors py-2 cursor-pointer"
                >
                  Записаться онлайн
                </UButton>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Нижняя линия: Копирайт и Юридические данные -->
      <div class="border-t border-zinc-900 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-zinc-600">
        <div class="space-y-1">
          <p>© {{ new Date().getFullYear() }} Сеть фитнес-студий «ОДИН». Все права защищены.</p>
          <p class="text-zinc-700">
            ИП Загребин Дмитрий Романович | ИНН: 504314265400 | ОГРНИП: 323508100388277
          </p>
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-1">
          <a href="/docs/ОфертаСтудия.pdf" class="hover:text-zinc-400 transition-colors">Договор-оферта</a>
          <a href="/docs/СтудияПолитика.pdf" class="hover:text-zinc-400 transition-colors">Политика конфиденциальности</a>
        </div>
      </div>

    </div>
  </footer>
</template>
