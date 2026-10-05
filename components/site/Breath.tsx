"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Users, User, AlertCircle } from "lucide-react";
import { useLead } from "./Lead";
import { asset } from "@/lib/config";

// Сигнатурный элемент сайта: круг, который дышит вместе с посетителем (4 с вдох / 4 с выдох)
function BreathCircle() {
  const [inhale, setInhale] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setInhale((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-[230px] h-[230px] md:w-[280px] md:h-[280px] flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f3d9b8]/40 to-clay/30 blur-2xl"
        animate={{ scale: inhale ? 1.1 : 0.6 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border border-[#f3d9b8]/40"
        style={{ inset: 0 }}
        animate={{ scale: inhale ? 1 : 0.55 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-[#f3d9b8]/10 backdrop-blur-sm border border-[#f3d9b8]/30"
        style={{ inset: "18%" }}
        animate={{ scale: inhale ? 1.05 : 0.6 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={inhale ? "in" : "out"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.6 }}
          className="relative font-display italic text-4xl text-[#f3d9b8]"
        >
          {inhale ? "вдох" : "выдох"}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Breath() {
  const { open } = useLead();
  const cards = [
    {
      id: "holotropic" as const,
      icon: Users,
      kind: "Семинар",
      title: "Холотропное дыхание",
      price: "7 000 ₽",
      image: "/img/holotropic.webp",
      text: "Глубокая дыхательная практика под музыку при поддержке ведущего. Пространство, чтобы отпустить накопленное напряжение и встретиться с собой.",
      points: ["Групповой семинар", "Подготовка и интеграция опыта", "Безопасное пространство"],
      cta: "Узнать дату семинара",
    },
    {
      id: "vivation" as const,
      icon: User,
      kind: "Индивидуальная сессия",
      title: "Вайвейшн",
      price: "3 000 ₽",
      image: "/img/vivation.webp",
      text: "Мягкая техника связного дыхания. Учит проживать эмоции без сопротивления и возвращает ощущение лёгкости и ясности.",
      points: ["Один на один с ведущим", "Мягко и бережно", "Подходит для первого опыта"],
      cta: "Записаться на сессию",
    },
  ];

  return (
    <section id="breath" className="relative bg-[#141311] text-white py-24 md:py-32 px-4 md:px-6 overflow-hidden grain">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-clay/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-16 md:mb-20">
          <div>
            <p className="text-[#f3d9b8] uppercase tracking-[0.25em] text-xs font-bold mb-4">Дыхательные практики</p>
            <h2 className="font-display text-[46px] md:text-7xl leading-[0.98]">
              Сделайте вдох <br />
              <span className="italic text-[#f3d9b8]">вместе с нами</span>
            </h2>
            <p className="text-white/65 text-lg mt-6 max-w-lg leading-relaxed">
              Дыхание — самый быстрый путь от тревоги к спокойствию. Попробуйте прямо сейчас: следите за кругом
              и дышите в его ритме. Чувствуете? А теперь представьте два часа такой практики.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <BreathCircle />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative rounded-[32px] overflow-hidden border border-white/10 min-h-[600px] flex flex-col"
            >
              <img src={asset(c.image)} alt={c.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1.2s]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-[#141311]/70 to-[#141311]/10" />
              <div className="relative z-10 p-7 md:p-9 flex justify-between items-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3.5 py-1.5 text-xs font-semibold">
                  <c.icon className="w-3.5 h-3.5" /> {c.kind}
                </span>
                <span className="font-display text-3xl md:text-4xl text-[#f3d9b8]">{c.price}</span>
              </div>
              <div className="relative z-10 mt-auto p-7 md:p-9">
                <h3 className="font-display text-5xl md:text-6xl leading-none">{c.title}</h3>
                <p className="text-white/75 mt-4 leading-relaxed max-w-md">{c.text}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {c.points.map((p) => (
                    <span key={p} className="text-xs rounded-full border border-white/20 px-3 py-1.5 text-white/80">{p}</span>
                  ))}
                </div>
                <button
                  onClick={() => open(c.id)}
                  className="mt-7 group/btn inline-flex items-center gap-2 rounded-full bg-[#f3d9b8] text-ink pl-6 pr-1.5 py-1.5 font-semibold hover:bg-white transition-colors"
                >
                  {c.cta}
                  <span className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center group-hover/btn:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="flex items-start gap-2 text-white/45 text-sm mt-6 max-w-3xl">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          Интенсивные дыхательные практики имеют противопоказания (беременность, заболевания сердца и сосудов,
          эпилепсия и др.). Перед записью обязательно обсудим ваше самочувствие.
        </p>
      </div>
    </section>
  );
}
