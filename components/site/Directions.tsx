"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check } from "lucide-react";
import { useLead } from "./Lead";
import { Container, Section, SectionHead, Button, Pic } from "./ui";

import type { FormId } from "@/lib/forms";

const container: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const card: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const ITEMS: { id: FormId; n: string; title: string; text: string; image: string; points: string[]; pos?: string }[] = [
  {
    id: "yoga",
    n: "01",
    title: "Йога",
    text: "Сила, гибкость и спокойная голова. Объясняем каждую асану и подстраиваем нагрузку под ваше тело.",
    image: "/img/hatha.webp",
    points: ["Для новичков и практикующих", "Здоровая спина и осанка", "Работа с дыханием"],
  },
  {
    id: "prenatal",
    n: "02",
    title: "Йога для беременных",
    text: "Бережная практика под срок и самочувствие. Учимся дыханию, которое поможет в родах.",
    image: "/img/prenatal.webp",
    points: ["Программа по триместрам", "Меньше отёков и тревоги", "Подготовка к родам"],
    pos: "object-[center_30%]",
  },
  {
    id: "trx",
    n: "03",
    title: "TRX",
    text: "Функциональная тренировка в петлях с весом собственного тела. Нагрузка регулируется под любой уровень.",
    image: "/img/trx.webp",
    points: ["Крепкий кор и спина", "Тонус без тяжёлого железа", "Баланс и координация"],
    pos: "object-[center_20%]",
  },
  {
    id: "mfr",
    n: "04",
    title: "МФР",
    text: "Миофасциальный релиз: роллы и мячи снимают зажимы. Ощущение — как после хорошего массажа.",
    image: "/img/mfr.webp",
    points: ["Шея, плечи, поясница", "Восстановление после нагрузок", "Лёгкость в теле"],
  },
];

export default function Directions() {
  const { open } = useLead();
  return (
    <Section id="directions">
      <Container>
        <SectionHead
          title="Четыре направления"
          accent="для тела и головы"
          text="Для тех, кто впервые встаёт на коврик, для будущих мам и для тех, кто хочет сильное и свободное тело."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {ITEMS.map((it) => (
            <motion.article
              key={it.id}
              variants={card}
              className="group bg-white rounded-3xl overflow-hidden flex flex-col border border-ink/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Pic
                  src={it.image} sizes="(max-width: 768px) 100vw, 50vw"
                  alt={it.title}
                 
                  className={"absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 " + (it.pos ?? "")}
                />
                <span className="absolute top-5 left-5 h-9 px-3.5 rounded-full bg-white/85 backdrop-blur text-[13px] font-semibold flex items-center">
                  {it.n}
                </span>
              </div>
              <div className="p-7 md:p-8 flex flex-col flex-1">
                <h3 className="font-display text-[26px] leading-tight">{it.title}</h3>
                <p className="text-muted text-[16px] leading-relaxed mt-3">{it.text}</p>
                <ul className="mt-6 grid gap-2.5">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px]">
                      <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-sage stroke-[3]" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button variant="dark" onClick={() => open(it.id)}>
                    Записаться
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
