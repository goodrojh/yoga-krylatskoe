"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, User, AlertCircle } from "lucide-react";
import { useLead } from "./Lead";

import { Container, Section, Button, Pic } from "./ui";

// Сигнатурный элемент сайта: круг, который дышит вместе с посетителем (4 с вдох / 4 с выдох).
// Только CSS-трансформации и градиенты — без blur/backdrop-filter, поэтому на телефонах нет артефактов.
function BreathCircle() {
  const [started, setStarted] = useState(false);
  const [inhale, setInhale] = useState(true);
  useEffect(() => {
    setStarted(true);
    const t = setInterval(() => setInhale((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] select-none" aria-hidden="true">
      {/* статичные ориентиры */}
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[22.5%] rounded-full border border-white/10" />
      {/* дышащее свечение и контур */}
      <div
        className={"absolute inset-0 rounded-full " + (started ? "breathe" : "")}
        style={{ transform: "scale(0.55)", background: "radial-gradient(circle, rgba(233,207,174,0.32) 0%, rgba(196,112,63,0.16) 45%, rgba(196,112,63,0) 70%)" }}
      />
      <div
        className={"absolute inset-[6%] rounded-full border-2 border-[#e9cfae]/70 " + (started ? "breathe" : "")}
        style={{ transform: "scale(0.55)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={"absolute font-display text-[28px] text-[#e9cfae] transition-opacity duration-700 " + (inhale ? "opacity-100" : "opacity-0")}>вдох</span>
        <span className={"absolute font-display text-[28px] text-[#e9cfae] transition-opacity duration-700 " + (inhale ? "opacity-0" : "opacity-100")}>выдох</span>
      </div>
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
    <Section id="breath" tone="dark">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 35%, rgba(196,112,63,0.12), transparent 70%)" }} />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[36px] md:text-[52px] leading-[1.04]">
              Сделайте вдох <span className="text-white/45">вместе с нами</span>
            </h2>
            <p className="text-white/65 text-[17px] mt-6 max-w-[520px] leading-relaxed">
              Дыхание — самый быстрый путь от тревоги к спокойствию. Следите за кругом и дышите в его ритме:
              четыре секунды вдох, четыре — выдох.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
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
              className="group rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Pic src={c.image} sizes="(max-width: 768px) 100vw, 50vw" alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
                <span className="absolute top-5 left-5 h-9 px-3.5 rounded-full bg-black/40 backdrop-blur border border-white/20 text-[13px] font-medium flex items-center gap-2">
                  <c.icon className="w-3.5 h-3.5" /> {c.kind}
                </span>
              </div>
              <div className="p-7 md:p-8 flex flex-col flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[28px] leading-tight">{c.title}</h3>
                  <span className="font-display text-[24px] text-[#e9cfae] whitespace-nowrap">{c.price}</span>
                </div>
                <p className="text-white/65 text-[16px] mt-3 leading-relaxed">{c.text}</p>
                <ul className="mt-6 grid gap-2.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px] text-white/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e9cfae]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button variant="light" onClick={() => open(c.id)}>{c.cta}</Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="flex items-start gap-2 text-white/45 text-[14px] mt-8 max-w-[760px]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          Интенсивные дыхательные практики имеют противопоказания (беременность, заболевания сердца и сосудов,
          эпилепсия и др.). Перед записью обязательно обсудим ваше самочувствие.
        </p>
      </Container>
    </Section>
  );
}
