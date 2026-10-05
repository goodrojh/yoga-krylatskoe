"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLead } from "./Lead";
import { Container, Section, SectionHead, Button, Pic } from "./ui";


type Stage = { title: string; text: string; image: string };

const STAGES = ["После первого занятия", "Через 2–3 недели", "Через 1–2 месяца", "Через 3 месяца"];

const TRACKS: Record<"body" | "mind", { label: string; items: Stage[] }> = {
  body: {
    label: "Тело",
    items: [
      { title: "Лёгкость", text: "Уходит скованность после рабочего дня, тело словно «размораживается».", image: "/img/t-light.webp" },
      { title: "Осанка", text: "Плечи раскрываются, спина меньше устаёт к вечеру, проходит зажим в шее.", image: "/img/t-posture.webp" },
      { title: "Гибкость", text: "Наклоны становятся глубже, суставы — подвижнее, движения — свободнее.", image: "/img/t-flex.webp" },
      { title: "Сила и тонус", text: "Крепкий кор, подтянутое тело и уверенный баланс без изнуряющих нагрузок.", image: "/img/t-strength.webp" },
    ],
  },
  mind: {
    label: "Состояние",
    items: [
      { title: "Выдох", text: "Напряжение отпускает уже на первой практике — вы уходите спокойнее, чем пришли.", image: "/img/m-exhale.webp" },
      { title: "Сон", text: "Засыпаете легче и просыпаетесь отдохнувшими, а не разбитыми.", image: "/img/m-sleep.webp" },
      { title: "Тишина в голове", text: "Меньше тревоги и внутреннего шума, больше фокуса и ясности.", image: "/img/m-calm.webp" },
      { title: "Энергия и радость", text: "Появляются силы на себя, близких и то, что давно откладывали.", image: "/img/m-joy.webp" },
    ],
  },
};

export default function Transformation() {
  const { open } = useLead();
  const [track, setTrack] = useState<"body" | "mind">("body");
  const items = TRACKS[track].items;

  return (
    <Section id="results" tone="sand">
      <Container>
        <SectionHead
          title="Как меняются тело"
          accent="и состояние"
          text="Ориентир при практике два раза в неделю. У каждого свой темп — но направление одно."
        >
          <div className="mt-6 inline-flex p-1 rounded-full bg-cream border border-ink/5">
            {(Object.keys(TRACKS) as ("body" | "mind")[]).map((k) => (
              <button
                key={k}
                onClick={() => setTrack(k)}
                className={"relative h-11 px-6 rounded-full text-[15px] font-semibold transition-colors " + (track === k ? "text-white" : "text-ink/60 hover:text-ink")}
              >
                {track === k && <motion.span layoutId="track-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", damping: 30, stiffness: 300 }} />}
                <span className="relative">{TRACKS[k].label}</span>
              </button>
            ))}
          </div>
        </SectionHead>

        {/* Шкала времени */}
        <div className="relative hidden md:grid grid-cols-4 gap-6 mb-8">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-ink/15" />
          <div
            key={track}
            className="reveal-x absolute left-0 top-[7px] h-px bg-clay origin-left"
            style={{ right: 0 }}
          />
          {STAGES.map((s, i) => (
            <div key={s} className="relative">
              <span style={{ transitionDelay: `${0.2 + i * 0.4}s` }}
                key={track + i}
                className="reveal-pop block w-[15px] h-[15px] rounded-full bg-clay ring-4 ring-sand"
              />
              <p className="mt-4 text-[14px] font-semibold">{s}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.article
                key={track + it.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ink/5">
                  <Pic src={it.image} sizes="(max-width: 768px) 50vw, 25vw" alt={it.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="md:hidden mt-4 text-[13px] font-semibold text-clay-dark">{STAGES[i]}</p>
                <h3 className="font-display text-[22px] md:text-[24px] mt-2 md:mt-5">{it.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed mt-2">{it.text}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-ink/10">
          <p className="text-[17px] max-w-[520px]">Первый шаг — одно занятие. Остальное тело сделает само.</p>
          <Button onClick={() => open("trial")}>Записаться на первое занятие</Button>
        </div>
      </Container>
    </Section>
  );
}
