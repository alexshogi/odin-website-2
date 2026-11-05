# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Сайт собирается в статику: страницы, оптимизированные картинки и `/_ipx`-варианты
генерируются заранее. Это самый быстрый вариант для хостинга.

```bash
npm run build      # = nuxt generate
```

Готовая папка для деплоя: `.output/public`. Её можно выложить на любой статический
хостинг (Netlify, Cloudflare Pages, GitHub Pages, nginx).

Кэширование для `_nuxt`, шрифтов и картинок настроено в `public/_headers`
(поддерживается Netlify и Cloudflare Pages).

Если когда-нибудь понадобится Node-сервер вместо статики:

```bash
npm run build:server
npm run preview
```

Локальный просмотр статической сборки:

```bash
npx serve .output/public
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
