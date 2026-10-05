"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Sprout, Baby, Wallet, ArrowRight } from "lucide-react";
import { useLead } from "./Lead";
import { asset } from "@/lib/config";

type Item = { q: string; a: string };

const data: Record<string, Item[]> = {
  new: [
    { q: "Я никогда не занимался(ась) йогой. Мне подойдёт?", a: "Да. Большинство приходит без опыта. Инструктор объясняет каждое движение и предлагает упрощённые варианты асан. Гибкость — не условие, а результат практики." },
    { q: "Что взять с собой на первое занятие?", a: "Удобную одежду, которая не стесняет движений, и бутылку воды. Занимаемся босиком. Коврики и инвентарь есть в зале." },
    { q: "Можно ли заниматься, если болит спина?", a: "Часто именно с этим запросом и приходят. Расскажите о ситуации при записи — подберём направление и нагрузку. При острой боли или после травм сначала проконсультируйтесь с врачом." },
    { q: "Чем отличаются йога, TRX и МФР?", a: "Йога — работа с телом, дыханием и вниманием. TRX — силовая функциональная тренировка в петлях. МФР — восстановление: снимаем мышечные и фасциальные зажимы роллами и мячами. Их отлично сочетать." },
    { q: "Что такое холотропное дыхание и вайвейшн?", a: "Это дыхательные практики. Холотропное дыхание — интенсивный групповой семинар-погружение. Вайвейшн — мягкая индивидуальная техника связного дыхания для работы с эмоциями и напряжением." },
  ],
  pregnant: [
    { q: "С какого срока можно приходить?", a: "Срок и формат занятий обсуждаем индивидуально. Обязательное условие — одобрение врача, ведущего беременность." },
    { q: "Это безопасно для малыша?", a: "Практика строится вокруг безопасности: никаких скручиваний живота, прыжков и перегрузок. Нагрузка подбирается под триместр и самочувствие." },
    { q: "Поможет ли йога в родах?", a: "Мы много работаем с дыханием и расслаблением, укрепляем мышцы спины и тазового дна. Это помогает чувствовать себя увереннее и лучше слышать своё тело." },
    { q: "Можно ли вернуться к занятиям после родов?", a: "Да, после разрешения врача. Начинаем мягко, с восстановления и бережной работы с телом." },
  ],
  pay: [
    { q: "Сколько стоит занятие?", a: "Разовое — 1 400 ₽. Абонемент на 4 занятия — 5 200 ₽ (1 300 ₽ за занятие), на 8 занятий — 9 600 ₽ (1 200 ₽ за занятие). Персональное — 4 000 ₽." },
    { q: "Можно ли по абонементу ходить на разные направления?", a: "Да, групповые направления можно чередовать — уточним расписание при записи." },
    { q: "Сколько стоят дыхательные практики?", a: "Семинар по холотропному дыханию — 7 000 ₽, индивидуальная сессия вайвейшн — 3 000 ₽." },
    { q: "Как записаться?", a: "Нажмите любую кнопку «Записаться» на сайте и оставьте телефон — мы перезвоним и подберём удобное время." },
  ],
};

const tabs = [
  { id: "new", label: "Новичкам", icon: Sprout },
  { id: "pregnant", label: "Будущим мамам", icon: Baby },
  { id: "pay", label: "Цены и запись", icon: Wallet },
];

export default function FAQ() {
  const { open } = useLead();
  const [tab, setTab] = useState("new");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-24 px-4 md:px-[80px]">
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-[44px] md:text-6xl leading-tight mb-3">
            Всё, что хочется <span className="italic text-sage">спросить</span>
          </h2>
          <p className="text-muted">Короткие ответы на частые вопросы</p>
        </div>

        <div className="flex justify-start sm:justify-center gap-2 border-b border-ink/10 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setOpenIdx(null); }}
              className={
                "inline-flex items-center gap-2 px-5 py-3 text-[15px] border-b-2 whitespace-nowrap transition-all " +
                (tab === t.id ? "text-sage font-semibold border-sage" : "text-muted border-transparent")
              }
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <div>
          {data[tab].map((item, i) => (
            <div key={tab + i} className="border-b border-ink/10 py-5">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex justify-between items-center gap-4 text-left">
                <span className="text-[17px] font-medium">{item.q}</span>
                <span className="text-muted shrink-0">{openIdx === i ? <X size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}</span>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-[15px] text-ink/65 leading-[1.7]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-sand rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {["/img/prenatal.webp", "/img/personal.webp", "/img/vivation.webp"].map((src, i) => (
                <img key={src} src={asset(src)} alt="" className="w-12 h-12 rounded-full border-2 border-sand object-cover" style={{ zIndex: 3 - i }} />
              ))}
            </div>
            <div>
              <p className="font-semibold">Не нашли ответ?</p>
              <p className="text-sm text-muted">Спросите — ответим лично</p>
            </div>
          </div>
          <button onClick={() => open("question")} className="group bg-ink text-white rounded-full px-7 py-3.5 font-semibold flex items-center gap-2 hover:bg-sage-dark transition-colors">
            Задать вопрос <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
