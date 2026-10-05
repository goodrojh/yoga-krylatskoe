// Все контакты и настройки студии — в одном месте.
// ЗАМЕНИТЕ телефон / WhatsApp / Telegram на реальные перед запуском рекламы.
export const SITE = {
  name: "ДЫШИ",
  descriptor: "йога-студия в Кунцево",
  phone: "+7 (999) 000-00-00",
  phoneHref: "+79990000000",
  // номер для WhatsApp без «+», только цифры
  whatsapp: "79990000000",
  // ЗАМЕНИТЕ ссылки на реальные аккаунты:
  // Telegram — https://t.me/ник (или https://t.me/+79990000000 — по номеру телефона)
  telegramUrl: "https://t.me/+79990000000",
  // MAX — ссылка на профиль/канал из приложения MAX («Поделиться профилем»)
  maxUrl: "https://max.ru/",
  address: "Рублёвское шоссе, 16/1",
  city: "Москва",
  metro: ["Молодёжная", "Кунцевская", "Крылатское", "Пионерская"],
  // ВПИШИТЕ имя инструктора — появится в блоке «Инструктор» и в форме вопроса
  instructor: {
    name: "Гульнара",
    role: "Инструктор йоги и дыхательных практик",
  },
  // URL для приёма заявок (Formspree, Make, свой бэкенд, Telegram-бот через прокси).
  // Если пусто — заявка уходит сообщением в WhatsApp.
  leadEndpoint: "",
};

export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
