"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { useLead } from "./Lead";
import { asset } from "@/lib/config";
import type { FormId } from "@/lib/forms";

const plans: {
  id: FormId; name: string; tagline: string; price: string; unit: string; per?: string; save?: string; popular?: boolean; features: string[];
}[] = [
  {
    id: "single", name: "Разовое", tagline: "Попробовать и почувствовать", price: "1 400", unit: "₽ / занятие",
    features: ["Любое групповое направление", "Без обязательств", "Инвентарь — в зале"],
  },
  {
    id: "pass4", name: "4 занятия", tagline: "Раз в неделю — мягкий ритм", price: "5 200", unit: "₽", per: "1 300 ₽ за занятие", save: "экономия 400 ₽",
    features: ["Йога, TRX, МФР, йога для беременных", "Можно чередовать направления", "Хороший старт привычки"],
  },
  {
    id: "pass8", name: "8 занятий", tagline: "Дважды в неделю — заметный результат", price: "9 600", unit: "₽", per: "1 200 ₽ за занятие", save: "экономия 1 600 ₽", popular: true,
    features: ["Все групповые направления", "Самая выгодная цена занятия", "Ритм, в котором видны изменения"],
  },
];

const extras: { id: FormId; name: string; price: string; note: string }[] = [
  { id: "personal", name: "Персональное занятие", price: "4 000 ₽", note: "Один на один, программа под вас" },
  { id: "vivation", name: "Вайвейшн", price: "3 000 ₽", note: "Индивидуальная дыхательная сессия" },
  { id: "holotropic", name: "Холотропное дыхание", price: "7 000 ₽", note: "Семинар-погружение" },
];

export default function Pricing() {
  const { open } = useLead();
  return (
    <section id="pricing" className="w-full py-24 bg-cream overflow-hidden relative">
      <div className="text-center px-6 mb-12">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-clay uppercase tracking-[0.25em] text-xs font-bold mb-4">
          Цены
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[44px] md:text-6xl leading-[1.02]"
        >
          Честно и <span className="italic text-sage">без мелкого шрифта</span>
        </motion.h2>
        <p className="mt-4 text-muted text-lg">Чем регулярнее практика — тем ниже цена занятия.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-3 md:mx-10 xl:mx-auto max-w-[1300px] relative rounded-[28px] overflow-hidden"
      >
        <img src={asset("/img/studio.webp")} alt="Зал студии" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 bg-white/45 backdrop-blur-xl m-3 md:m-10 rounded-[18px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/50">
            {plans.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-9 " + (p.popular ? "bg-white/50" : "")}
              >
                <div className="pb-7 border-b border-ink/10">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-display text-3xl">{p.name}</h3>
                    {p.popular && (
                      <span className="px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase bg-clay text-white rounded-full whitespace-nowrap">
                        Выгоднее всего
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/75">{p.tagline}</p>
                  <div className="mt-7 flex items-baseline gap-1.5">
                    <span className="font-display font-semibold text-6xl leading-none">{p.price}</span>
                    <span className="text-sm font-semibold text-ink/60">{p.unit}</span>
                  </div>
                  <div className="h-6 mt-2 flex items-center gap-2 text-sm">
                    {p.per && <span className="text-ink/70">{p.per}</span>}
                    {p.save && <span className="text-sage font-bold">· {p.save}</span>}
                  </div>
                  <button
                    onClick={() => open(p.id)}
                    className={
                      "mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " +
                      (p.popular ? "bg-clay text-white hover:bg-clay-dark" : "bg-ink text-white hover:bg-sage-dark")
                    }
                  >
                    <span className="flex-1 px-5 py-2.5 text-sm font-semibold text-left">{p.id === "single" ? "Записаться" : "Оформить абонемент"}</span>
                    <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
                <div className="pt-7 flex flex-col gap-3">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-sage/15 border border-sage/30 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-sage-dark stroke-[3]" />
                      </div>
                      <span className="text-[13px] font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1300px] mx-3 md:mx-10 xl:mx-auto mt-6 grid md:grid-cols-3 gap-4">
        {extras.map((e, i) => (
          <motion.button
            key={e.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            onClick={() => open(e.id)}
            className="group text-left bg-white rounded-[22px] border border-ink/5 p-6 flex items-center justify-between gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-shadow"
          >
            <div>
              <p className="font-semibold">{e.name}</p>
              <p className="text-sm text-muted mt-1">{e.note}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-display text-2xl font-semibold">{e.price}</span>
              <span className="w-9 h-9 rounded-full bg-cream flex items-center justify-center group-hover:bg-clay group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
