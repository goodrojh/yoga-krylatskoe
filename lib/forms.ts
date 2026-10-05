// Каждая кнопка на сайте открывает СВОЮ форму — со своим заголовком, фото и вопросами.
export type ChipField = { name: string; label: string; options: string[]; multi?: boolean };

export type LeadForm = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  chips?: ChipField[];
  comment?: string; // placeholder для поля комментария; нет — поля нет
  note?: string;
};

const DIRECTIONS = ["Йога", "Йога для беременных", "TRX", "МФР", "Пока не знаю"];
const TIME = ["Утро", "День", "Вечер", "Выходные"];

export const FORMS = {
  trial: {
    id: "trial",
    badge: "Первое занятие",
    title: "Запишитесь на первое занятие",
    subtitle: "Перезвоним, подберём направление и удобное время. Ничего не нужно покупать заранее.",
    image: "/img/hero.webp",
    cta: "Записаться",
    chips: [
      { name: "Направление", label: "Что хочется попробовать?", options: DIRECTIONS },
      { name: "Время", label: "Когда удобнее?", options: TIME, multi: true },
    ],
  },
  yoga: {
    id: "yoga",
    badge: "Йога",
    title: "Йога, после которой спина говорит «спасибо»",
    subtitle: "Расскажите о своём опыте — подберём группу по уровню.",
    image: "/img/hatha.webp",
    cta: "Записаться на йогу",
    chips: [
      { name: "Опыт", label: "Ваш опыт в йоге", options: ["Никогда не занимался(ась)", "Немного пробовал(а)", "Практикую регулярно"] },
      { name: "Запрос", label: "Что важнее всего?", options: ["Спина и осанка", "Гибкость", "Снять стресс", "Сила и тонус"], multi: true },
    ],
  },
  prenatal: {
    id: "prenatal",
    badge: "Йога для беременных",
    title: "Бережная практика для вас и малыша",
    subtitle: "Нагрузку подбираем под срок и самочувствие. Перед стартом уточним рекомендации вашего врача.",
    image: "/img/prenatal.webp",
    cta: "Записаться на занятие",
    chips: [
      { name: "Срок", label: "Ваш срок", options: ["I триместр", "II триместр", "III триместр", "Уже родила — восстановление"] },
      { name: "Опыт", label: "Занимались йогой раньше?", options: ["Да", "Нет, впервые"] },
    ],
    note: "Занятия проходят только с одобрения врача, ведущего беременность.",
  },
  trx: {
    id: "trx",
    badge: "TRX",
    title: "Сильное тело на собственном весе",
    subtitle: "Петли TRX — нагрузка, которую легко подстроить под любой уровень.",
    image: "/img/trx.webp",
    cta: "Записаться на TRX",
    chips: [
      { name: "Цель", label: "Ваша цель", options: ["Тонус и рельеф", "Крепкий кор", "Выносливость", "Дополнить йогу"], multi: true },
    ],
  },
  mfr: {
    id: "mfr",
    badge: "МФР",
    title: "Отпустить зажимы, которые вы носите годами",
    subtitle: "Миофасциальный релиз: роллы, мячи и мягкое внимание к телу.",
    image: "/img/mfr.webp",
    cta: "Записаться на МФР",
    chips: [
      { name: "Где напряжение", label: "Где чувствуете напряжение?", options: ["Шея и плечи", "Поясница", "Ноги", "Везде понемногу"], multi: true },
    ],
  },
  holotropic: {
    id: "holotropic",
    badge: "Семинар · 7 000 ₽",
    title: "Холотропное дыхание",
    subtitle: "Оставьте контакт — пришлём дату ближайшего семинара и расскажем, как подготовиться.",
    image: "/img/holotropic.webp",
    cta: "Хочу на семинар",
    chips: [
      { name: "Опыт дыхательных практик", label: "Был ли опыт дыхательных практик?", options: ["Да", "Нет, впервые"] },
    ],
    note: "Есть противопоказания (беременность, сердечно-сосудистые заболевания, эпилепсия и др.) — обсудим при звонке.",
  },
  vivation: {
    id: "vivation",
    badge: "Вайвейшн · 3 000 ₽",
    title: "Вайвейшн — сессия связного дыхания",
    subtitle: "Индивидуальная сессия. Подберём время, когда вам будет спокойно и никуда не надо спешить.",
    image: "/img/vivation.webp",
    cta: "Записаться на сессию",
    chips: [{ name: "Время", label: "Когда удобнее?", options: TIME, multi: true }],
    comment: "С каким состоянием хотите поработать? (необязательно)",
  },
  personal: {
    id: "personal",
    badge: "Персонально · 4 000 ₽",
    title: "Занятие один на один",
    subtitle: "Программа под ваше тело, цели и график. Всё внимание инструктора — только вам.",
    image: "/img/personal.webp",
    cta: "Записаться персонально",
    chips: [
      { name: "Направление", label: "Направление", options: ["Йога", "Йога для беременных", "TRX", "МФР"] },
      { name: "Время", label: "Когда удобнее?", options: TIME, multi: true },
    ],
    comment: "Цель или ограничения по здоровью (необязательно)",
  },
  single: {
    id: "single",
    badge: "Разовое · 1 400 ₽",
    title: "Разовое занятие",
    subtitle: "Просто приходите попробовать. Без абонементов и обязательств.",
    image: "/img/still.webp",
    cta: "Записаться",
    chips: [{ name: "Направление", label: "Направление", options: DIRECTIONS }],
  },
  pass4: {
    id: "pass4",
    badge: "Абонемент · 4 занятия",
    title: "Абонемент на 4 занятия — 5 200 ₽",
    subtitle: "Раз в неделю — мягкий ритм, чтобы встроить практику в жизнь.",
    image: "/img/hatha.webp",
    cta: "Оформить абонемент",
    chips: [{ name: "Направление", label: "Направление", options: DIRECTIONS }],
  },
  pass8: {
    id: "pass8",
    badge: "Абонемент · 8 занятий",
    title: "Абонемент на 8 занятий — 9 600 ₽",
    subtitle: "Дважды в неделю — ритм, в котором изменения чувствуются уже через месяц.",
    image: "/img/studio.webp",
    cta: "Оформить абонемент",
    chips: [{ name: "Направление", label: "Направление", options: DIRECTIONS }],
  },
  question: {
    id: "question",
    badge: "Вопрос",
    title: "Задайте любой вопрос",
    subtitle: "Про здоровье, противопоказания, расписание — инструктор ответит лично, без шаблонов.",
    image: "/img/instructor.webp",
    cta: "Отправить вопрос",
    comment: "Ваш вопрос",
  },
  callback: {
    id: "callback",
    badge: "Обратный звонок",
    title: "Перезвоним за пару минут",
    subtitle: "Оставьте номер — всё расскажем и запишем.",
    image: "/img/studio.webp",
    cta: "Перезвоните мне",
  },
} satisfies Record<string, LeadForm>;

export type FormId = keyof typeof FORMS;
