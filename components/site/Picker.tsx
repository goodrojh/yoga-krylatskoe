"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLead } from "./Lead";
import { asset } from "@/lib/config";
import type { FormId } from "@/lib/forms";

type Option = { feel: string; title: string; text: string; image: string; form: FormId; tag: string };

const OPTIONS: Option[] = [
  { feel: "Болит спина, сижу за компьютером", tag: "Йога + МФР", title: "Йога и МФР", text: "Йога вернёт подвижность позвоночнику, а МФР снимет зажимы в шее и пояснице. Начните с йоги для новичков.", image: "/img/hatha.webp", form: "yoga" },
  { feel: "Жду малыша", tag: "Йога для беременных", title: "Йога для беременных", text: "Бережная практика под ваш триместр: дыхание, мягкая сила, подготовка тела к родам.", image: "/img/prenatal.webp", form: "prenatal" },
  { feel: "Хочу силы и тонуса", tag: "TRX", title: "TRX", text: "Функциональная тренировка в петлях: кор, ягодицы, руки — без тяжёлого железа.", image: "/img/trx.webp", form: "trx" },
  { feel: "Стресс, плохо сплю", tag: "Вайвейшн", title: "Вайвейшн и мягкая йога", text: "Индивидуальная сессия связного дыхания помогает отпустить накопленное и вернуть сон.", image: "/img/vivation.webp", form: "vivation" },
  { feel: "Нужна глубокая перезагрузка", tag: "Холотропное дыхание", title: "Холотропное дыхание", text: "Семинар-погружение для тех, кто готов к глубокой работе с собой. Обсудим противопоказания.", image: "/img/holotropic.webp", form: "holotropic" },
  { feel: "Хочу, чтобы занимались только со мной", tag: "Персонально", title: "Персональное занятие", text: "Программа под ваши цели и ограничения. Идеально для старта или восстановления.", image: "/img/personal.webp", form: "personal" },
];

export default function Picker() {
  const { open } = useLead();
  const [active, setActive] = useState<number | null>(null);
  const cur = active !== null ? OPTIONS[active] : null;

  return (
    <section className="w-full px-4 md:px-6 py-24 bg-sand relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-clay uppercase tracking-[0.25em] text-xs font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Подбор за 10 секунд
          </p>
          <h2 className="font-display text-[44px] md:text-6xl leading-[1.02] mb-5">
            Что вы чувствуете <span className="italic text-sage">прямо сейчас?</span>
          </h2>
          <p className="text-muted text-lg mb-8">Выберите — и мы подскажем, с чего начать.</p>
          <div className="flex flex-wrap gap-2.5">
            {OPTIONS.map((o, i) => (
              <motion.button
                key={o.feel}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(i)}
                className={
                  "rounded-full px-5 py-3 text-[15px] border transition-all " +
                  (active === i ? "bg-ink text-white border-ink shadow-xl" : "bg-cream border-ink/10 hover:border-ink/30")
                }
              >
                {o.feel}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[460px] rounded-[32px] overflow-hidden bg-ink">
          <AnimatePresence mode="wait">
            {cur ? (
              <motion.div key={cur.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                <motion.img
                  src={asset(cur.image)}
                  alt={cur.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 p-7 md:p-9 text-white"
                >
                  <span className="inline-flex rounded-full bg-white/15 backdrop-blur border border-white/25 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Вам подойдёт · {cur.tag}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl mt-4">{cur.title}</h3>
                  <p className="text-white/85 mt-3 max-w-md leading-relaxed">{cur.text}</p>
                  <button
                    onClick={() => open(cur.form)}
                    className="mt-6 group inline-flex items-center gap-2 rounded-full bg-clay hover:bg-clay-dark px-7 py-3.5 font-semibold transition-all"
                  >
                    Записаться <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute inset-0 rounded-full border border-white/30"
                      animate={{ scale: [0.4, 1.4], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
                    />
                  ))}
                  <span className="w-4 h-4 rounded-full bg-[#f3d9b8] shadow-[0_0_30px_#f3d9b8]" />
                </div>
                <p className="font-display italic text-white/80 text-3xl mt-8">Выберите своё состояние — и мы подскажем практику</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
