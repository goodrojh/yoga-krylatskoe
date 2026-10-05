"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "./ui";
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
    <Section id="picker">
      <Container className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.04] mb-5">
            Что вы чувствуете <span className="text-muted">прямо сейчас?</span>
          </h2>
          <p className="text-muted text-[17px] leading-relaxed mb-10">Выберите состояние — подскажем, с какой практики начать.</p>
          <div className="flex flex-col gap-2">
            {OPTIONS.map((o, i) => (
              <motion.button
                key={o.feel}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(i)}
                className={
                  "h-14 rounded-2xl px-5 text-left text-[15px] font-medium border transition-all flex items-center justify-between " +
                  (active === i ? "bg-ink text-white border-ink" : "bg-white border-ink/5 hover:border-ink/20")
                }
              >
                {o.feel}
                <ArrowRight className={"w-4 h-4 transition-opacity " + (active === i ? "opacity-100" : "opacity-30")} />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:col-start-7 lg:col-span-6 relative min-h-[520px] rounded-3xl overflow-hidden bg-ink">
          <AnimatePresence mode="wait">
            {cur ? (
              <motion.div key={cur.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                <motion.img
                  src={asset(cur.image)}
                  srcSet={`${asset(cur.image.replace(".webp", "-sm.webp"))} 860w, ${asset(cur.image)} 1280w`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  decoding="async"
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
                  <p className="text-white/60 text-[14px]">Вам подойдёт</p>
                  <h3 className="font-display text-[32px] md:text-[40px] leading-tight mt-1">{cur.title}</h3>
                  <p className="text-white/85 mt-3 max-w-md leading-relaxed">{cur.text}</p>
                  <button
                    onClick={() => open(cur.form)}
                    className="mt-7 group inline-flex h-[52px] items-center gap-3 rounded-full bg-clay hover:bg-clay-dark px-7 text-[15px] font-semibold transition-colors"
                  >
                    Записаться <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="ring-pulse absolute inset-0 rounded-full border border-white/30" style={{ animationDelay: `${i * 1.3}s` }} />
                  ))}
                  <span className="w-4 h-4 rounded-full bg-[#f3d9b8] shadow-[0_0_30px_#f3d9b8]" />
                </div>
                <p className="font-display text-white/80 text-[24px] mt-8 max-w-xs">Здесь появится практика, которая подойдёт вам</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
