declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[][] };
  }
}

export default defineNuxtPlugin(() => {
  const { public: { ymId } } = useRuntimeConfig();
  const id = Number(ymId);
  if (!Number.isFinite(id) || id <= 0) return;

  const win = window;

  if (!win.ym) {
    win.ym = (...args: unknown[]) => {
      (win.ym!.a ||= []).push(args);
    };
  }

  let tagRequested = false;
  const pendingGoals: Array<[string, Record<string, unknown> | undefined]> = [];

  const reachGoal = (goal: string, params?: Record<string, unknown>) => {
    if (tagRequested) {
      win.ym?.(id, 'reachGoal', goal, params);
    } else {
      pendingGoals.push([goal, params]);
    }
  };

  const loadTag = () => {
    if (tagRequested) return;
    tagRequested = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    const firstScript = document.scripts[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);

    win.ym?.(id, 'init', {});

    for (const [goal, params] of pendingGoals) {
      win.ym?.(id, 'reachGoal', goal, params);
    }
    pendingGoals.length = 0;
  };

  // tag.js весит 224 КБ и на мобильных даёт длинный блок разбора,
  // поэтому грузим его только после действия пользователя.
  // Резерв — для тех, кто читает страницу без скролла.
  for (const event of ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const) {
    window.addEventListener(event, loadTag, { once: true, passive: true });
  }
  setTimeout(loadTag, 20000);

  // Футер и часть секций не гидратируются, поэтому клики считаем на уровне документа
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) {
      reachGoal('phone_click');
    } else if (href.includes('t.me/') || href.includes('max.ru/')) {
      reachGoal('messenger_click', { link: href });
    }
  }, { capture: true });
});
