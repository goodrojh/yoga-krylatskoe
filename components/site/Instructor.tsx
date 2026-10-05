"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, SlidersHorizontal, Wind } from "lucide-react";
import { useLead } from "./Lead";
import { Container, Section, Button } from "./ui";
import { SITE, asset } from "@/lib/config";

const PRINCIPLES = [
  { icon: HeartHandshake, title: "Знает каждого по имени", text: "Помнит ваш запрос, самочувствие и то, с чем вы пришли в первый раз." },
  { icon: SlidersHorizontal, title: "Практика под вас", text: "Нагрузка подстраивается под тело и состояние в этот день — а не наоборот." },
  { icon: Wind, title: "Бережно в глубине", text: "Сама проводит семинары холотропного дыхания и сессии вайвейшн и сопровождает весь процесс." },
];

export default function Instructor() {
  const { open } = useLead();
  const { name, role } = SITE.instructor;

  return (
    <Section id="instructor">
      <Container className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-sand">
            <img
              src={asset("/img/instructor.webp")}
              alt={name ? `${name} — инструктор студии` : "Инструктор студии"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            />
          </div>
          <div className="absolute left-5 right-5 bottom-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 px-5 py-4">
            {name && <p className="font-display text-[20px] leading-tight">{name}</p>}
            <p className={name ? "text-muted text-[14px] mt-1" : "font-semibold text-[15px]"}>{role}</p>
          </div>
        </motion.div>

        <div className="lg:col-start-7 lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-[36px] md:text-[52px] leading-[1.04]"
          >
            Практику ведёт человек, <span className="text-muted">а не расписание</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted text-[17px] leading-relaxed mt-6"
          >
            {name ? `${name} ведёт` : "Инструктор ведёт"} йогу, йогу для беременных, TRX, МФР и дыхательные практики.
            Вы приходите не к «случайному тренеру», а к человеку, который знает вас и ваш путь.
          </motion.p>

          <div className="mt-10 grid gap-6">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="flex gap-5 pb-6 border-b border-ink/10 last:border-0 last:pb-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-sand flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-clay" />
                </div>
                <div>
                  <h3 className="font-display text-[20px] leading-tight">{p.title}</h3>
                  <p className="text-muted text-[15px] leading-relaxed mt-1.5">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button onClick={() => open("personal")}>Записаться персонально</Button>
            <Button variant="outline" arrow={false} onClick={() => open("question")}>
              Задать вопрос
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
