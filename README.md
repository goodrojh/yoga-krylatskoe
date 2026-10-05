# ДЫШИ — сайт йога-студии в Кунцево

Next.js 15 + Tailwind 4 + framer-motion, статический экспорт.

## Перед запуском
Откройте `lib/config.ts` и замените телефон, WhatsApp, Telegram.
Заявки: если `leadEndpoint` пуст — заявка отправляется сообщением в WhatsApp.
Для приёма заявок без участия клиента укажите URL (Formspree / Make / Telegram-бот).

Тексты и вопросы каждой формы — `lib/forms.ts`.

## Сборка
    npm install
    NEXT_PUBLIC_BASE_PATH=/yoga-krylatskoe npm run build   # для GitHub Pages
    npm run build                                         # для своего домена
Готовый сайт — в папке `out/`.
