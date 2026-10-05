"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check, PhoneCall, TrendingUp } from "lucide-react";
import { useLead } from "./Lead";
import { asset } from "@/lib/config";

const container: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const step: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } };

function Step({ n, title, text, image, children }: { n: string; title: string; text: string; image: string; children: React.ReactNode }) {
  return (
    <motion.div variants={step} className="flex flex-col gap-6">
      <div className="rounded-[24px] overflow-hidden relative aspect-[4/3] w-full shadow-lg">
        <img src={asset(image)} alt={title} className="object-cover w-full h-full absolute inset-0" loading="lazy" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-white/20 backdrop-blur-2xl rounded-[16px] border border-white/30 p-5 flex flex-col justify-center gap-2.5 shadow-2xl overflow-hidden"
          >
            {children}
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="inline-flex w-fit rounded-full text-clay text-xs font-bold px-3 py-1 border border-clay">Шаг {n}</span>
        <h3 className="font-display text-3xl leading-tight">{title}</h3>
        <p className="text-base text-muted leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

const Chip = ({ children, active, delay = 0 }: { children: React.ReactNode; active?: boolean; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 + delay }}
    className={
      "rounded-[10px] px-3 py-2 flex items-center gap-2 text-[12px] font-semibold " +
      (active ? "bg-white shadow-2xl shadow-sage/20 border border-sage/20 relative overflow-hidden" : "bg-white/45 backdrop-blur-md border border-white/40")
    }
  >
    {active && (
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-sage/20 to-transparent -skew-x-12"
      />
    )}
    {children}
  </motion.div>
);

export default function HowItWorks() {
  const { open } = useLead();
  return (
    <section className="w-full px-4 md:px-12 lg:px-20 py-24 bg-cream relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <p className="text-clay uppercase tracking-[0.25em] text-xs font-bold mb-4">Как начать</p>
        <h2 className="font-display text-[44px] md:text-6xl leading-[1.02]">
          Три шага <span className="italic text-sage">до первого выдоха</span>
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16 max-w-7xl mx-auto relative z-10"
      >
        <Step n="01" title="Оставляете заявку" text="Пара кликов — и мы перезвоним, чтобы понять ваш запрос и подобрать направление." image="/img/still.webp">
          <Chip><Check className="w-3.5 h-3.5 text-sage" /> Имя</Chip>
          <Chip active delay={0.1}><PhoneCall className="w-3.5 h-3.5 text-sage" /> Перезваниваем…</Chip>
          <Chip delay={0.2}><Check className="w-3.5 h-3.5 text-sage" /> Направление: йога</Chip>
        </Step>

        <Step n="02" title="Приходите знакомиться" text="Расскажете о самочувствии и целях, инструктор подстроит практику. Коврик и инвентарь ждут вас в зале." image="/img/personal.webp">
          <div className="flex items-center justify-between h-full">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white] z-10" />
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0.2, 1.6], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: i * 0.9 }}
                  className="absolute inset-0 border border-white/50 rounded-full"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2 items-end">
              {["Цели", "Здоровье", "Уровень"].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={"rounded-[8px] px-4 py-2 text-[11px] font-bold min-w-[86px] text-center shadow-xl " + (i === 1 ? "bg-sage text-white" : "bg-white text-ink")}
                >
                  {t}
                </motion.div>
              ))}
            </div>
          </div>
        </Step>

        <Step n="03" title="Практикуете в своём ритме" text="Разовые визиты или абонемент — как удобно. Через месяц тело начинает благодарить." image="/img/hatha.webp">
          <div className="bg-white rounded-[10px] p-3 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-sage" />
              <span className="text-[11px] font-bold">Самочувствие · 4 недели</span>
            </div>
            <div className="flex items-end gap-1 h-14">
              {[20, 28, 26, 38, 44, 50, 58, 62, 70, 78, 84, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: h + "%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.06 }}
                  className="flex-1 rounded-t-[3px] bg-gradient-to-t from-sage/40 to-sage"
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[8px] px-3 py-1.5 w-fit flex items-center gap-2 text-[11px] font-bold shadow-lg">
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-clay" />
            Лёгкость в теле
          </div>
        </Step>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => open("trial")}
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-sage text-white shadow-xl shadow-sage/25"
        >
          Сделать первый шаг
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => open("question")}
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-ink border border-ink/10 shadow-lg"
        >
          Задать вопрос
        </motion.button>
      </div>
    </section>
  );
}
