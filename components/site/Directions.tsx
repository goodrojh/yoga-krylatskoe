"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Flower2, Sprout, Heart, ArrowUpRight, Dumbbell, Activity, Scale } from "lucide-react";
import { useLead } from "./Lead";
import { asset } from "@/lib/config";

const container: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const card: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

function CardButton({ label, onClick, light }: { label: string; onClick: () => void; light?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={
        "group/btn inline-flex items-center gap-2 rounded-full pl-5 pr-1.5 py-1.5 text-sm font-semibold transition-all " +
        (light ? "bg-white text-ink hover:bg-cream" : "bg-ink text-white hover:bg-sage-dark")
      }
    >
      {label}
      <span className={"w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover/btn:rotate-45 " + (light ? "bg-ink text-white" : "bg-white/15")}>
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </button>
  );
}

export default function Directions() {
  const { open } = useLead();
  return (
    <section id="directions" className="w-full px-4 md:px-6 py-24 md:py-[140px] bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sage/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-clay/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-14 md:mb-16 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-clay uppercase tracking-[0.25em] text-xs font-bold mb-4">
          Направления
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[44px] md:text-6xl leading-[1.02] mb-6"
        >
          Четыре пути <span className="italic text-sage">к себе</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted max-w-2xl mx-auto"
        >
          Для тех, кто впервые встаёт на коврик, для будущих мам и для тех, кто хочет сильное и свободное тело.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10"
      >
        {/* Card 1 — Йога */}
        <motion.div
          variants={card}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] p-6 md:p-8 flex flex-col gap-10 group relative overflow-hidden min-h-[520px]"
        >
          <div className="absolute inset-0 z-0">
            <img src={asset("/img/hatha.webp")} alt="Групповое занятие йогой" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/70" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-4xl md:text-5xl text-white leading-[1.02] drop-shadow-lg">
              Йога, после которой <br />
              <span className="italic text-[#f3d9b8]">спина говорит «спасибо»</span>
            </h3>
            <p className="text-base text-white/90 leading-relaxed max-w-[450px] mt-3">
              Сила, гибкость и спокойная голова. Объясняем каждую асану и подстраиваем нагрузку под ваше тело.
            </p>
          </div>
          <div className="mt-auto relative z-10 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Flower2, t: "Для новичков", d: "Начинаем с азов, без «сложных» поз в первый день." },
                { icon: Sprout, t: "Для практикующих", d: "Углубляем практику, работаем с балансами и дыханием." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 p-5 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all group/item">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 shrink-0 group-hover/item:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white">{t}</span>
                    <p className="text-xs text-white/75 leading-relaxed mt-1">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <CardButton light label="Записаться на йогу" onClick={() => open("yoga")} />
            </div>
          </div>
        </motion.div>

        {/* Card 2 — Йога для беременных */}
        <motion.div
          variants={card}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] border border-ink/10 p-6 md:p-8 flex flex-col overflow-hidden relative min-h-[520px] bg-[#f4e4d6]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f7e7da] via-[#f1ddd0] to-[#eadfce]" />
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-clay/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e8a98a]/30 rounded-full blur-[60px]" />

          <div className="relative z-10 flex-1 flex flex-col sm:flex-row items-center gap-6 py-4">
            <div className="relative w-44 h-56 sm:w-48 sm:h-64 shrink-0 rounded-[120px] overflow-hidden shadow-2xl shadow-clay/20 border-4 border-white/70">
              <img src={asset("/img/prenatal.webp")} alt="Йога для беременных" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="w-full max-w-[290px] bg-white/45 backdrop-blur-xl border border-white/70 rounded-[24px] p-5 shadow-2xl shadow-clay/10">
              <div className="space-y-3">
                {[
                  { label: "I триместр — мягкая адаптация", color: "bg-[#e8a98a]" },
                  { label: "II триместр — сила и устойчивость", color: "bg-clay" },
                  { label: "III триместр — дыхание к родам", color: "bg-sage" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    className="flex items-center gap-3 bg-white/85 rounded-xl p-3 border border-white/40 shadow-sm"
                  >
                    <div className={"w-2 h-2 rounded-full shrink-0 " + item.color} />
                    <span className="text-xs font-medium text-ink/80">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-white/90 rounded-full p-2 flex items-center gap-3 shadow-lg shadow-clay/10">
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-7 h-7 rounded-full bg-clay/15 flex items-center justify-center"
                >
                  <Heart className="w-3.5 h-3.5 text-clay fill-clay" />
                </motion.div>
                <span className="text-[11px] font-medium text-muted flex-1">Подбираем нагрузку под ваш срок…</span>
              </div>
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">Йога для беременных</h3>
              <p className="text-sm text-ink/65 leading-relaxed mt-2 max-w-sm">
                Меньше отёков и тревоги, больше доверия к телу. Учимся дыханию, которое поможет в родах.
              </p>
            </div>
            <CardButton label="Записаться" onClick={() => open("prenatal")} />
          </div>
        </motion.div>

        {/* Card 3 — TRX */}
        <motion.div variants={card} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-[32px] border border-ink/10 overflow-hidden flex flex-col">
          <div className="h-80 relative overflow-hidden group">
            <img src={asset("/img/trx.webp")} alt="Тренировка TRX" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {[
              { icon: Dumbbell, t: "Сила", c: "top-8 right-6", d: 0 },
              { icon: Scale, t: "Баланс", c: "bottom-10 left-6", d: 1 },
              { icon: Activity, t: "Крепкий кор", c: "bottom-24 right-8", d: 2 },
            ].map(({ icon: Icon, t, c, d }) => (
              <motion.div
                key={t}
                animate={{ y: [0, d % 2 ? 10 : -10, 0] }}
                transition={{ duration: 5 + d, repeat: Infinity, ease: "easeInOut", delay: d * 0.6 }}
                className={"absolute " + c + " flex items-center gap-2 rounded-2xl bg-white/25 backdrop-blur-md border border-white/50 px-3.5 py-2.5 shadow-xl"}
              >
                <Icon className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">{t}</span>
              </motion.div>
            ))}
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5 flex-1">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">TRX</h3>
              <p className="text-base text-muted leading-relaxed mt-2 max-w-sm">
                Тренировка в петлях с весом собственного тела. Нагрузку легко регулировать — подходит любому уровню.
              </p>
            </div>
            <CardButton label="Записаться" onClick={() => open("trx")} />
          </div>
        </motion.div>

        {/* Card 4 — МФР */}
        <motion.div variants={card} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-[32px] border border-ink/10 overflow-hidden flex flex-col">
          <div className="h-80 relative overflow-hidden group">
            <img src={asset("/img/mfr.webp")} alt="Миофасциальный релиз" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-black/10" />
            {/* «Индикатор напряжения», который тает */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-[270px] bg-white/70 backdrop-blur-xl rounded-2xl border border-white/80 p-4 shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider">Напряжение в теле</span>
                <motion.span
                  className="text-[11px] font-bold text-sage"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6 }}
                >
                  −70%
                </motion.span>
              </div>
              <div className="flex items-end gap-1.5 h-14">
                {[90, 85, 78, 70, 58, 46, 38, 30, 24, 20, 18, 16].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: "95%" }}
                    whileInView={{ height: h + "%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-sage to-[#9fb596]"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5 flex-1">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">МФР</h3>
              <p className="text-base text-muted leading-relaxed mt-2 max-w-sm">
                Миофасциальный релиз: роллы и мячи снимают зажимы в шее, плечах и пояснице. Ощущение — как после массажа.
              </p>
            </div>
            <CardButton label="Записаться" onClick={() => open("mfr")} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
