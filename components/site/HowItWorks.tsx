"use client";
import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, Footprints, Repeat } from "lucide-react";
import { useLead } from "./Lead";
import { Container, Section, SectionHead, Button } from "./ui";

const STEPS = [
  { icon: PhoneCall, title: "Оставляете заявку", text: "Перезваниваем, узнаём ваш запрос и самочувствие, подбираем направление и время." },
  { icon: Footprints, title: "Приходите на первое занятие", text: "Инструктор знакомится с вами и подстраивает практику. Коврик и инвентарь ждут в зале." },
  { icon: Repeat, title: "Практикуете в своём ритме", text: "Разовые визиты или абонемент — как удобно. Чем регулярнее, тем заметнее результат." },
];

export default function HowItWorks() {
  const { open } = useLead();
  return (
    <Section id="steps">
      <Container>
        <SectionHead title="Три шага" accent="до первого выдоха" text="Ничего не нужно покупать заранее и готовиться — просто приходите." />

        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          {/* Соединительная линия процесса */}
          <div className="hidden md:block absolute top-7 left-7 right-[calc(33.333%-28px)] h-px bg-ink/15" />
          <motion.div
            className="hidden md:block absolute top-7 left-7 right-[calc(33.333%-28px)] h-px bg-clay origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25 }}
              className="relative flex md:flex-col gap-5 md:gap-0"
            >
              <div className="relative w-14 h-14 rounded-full bg-white border border-ink/10 flex items-center justify-center shrink-0 ring-8 ring-cream">
                <s.icon className="w-5 h-5 text-clay" />
              </div>
              <div className="md:mt-8 md:pr-6">
                <p className="text-[14px] font-semibold text-muted">0{i + 1}</p>
                <h3 className="font-display text-[24px] leading-tight mt-1">{s.title}</h3>
                <p className="text-muted text-[16px] leading-relaxed mt-3">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-3">
          <Button onClick={() => open("trial")}>Записаться</Button>
          <Button variant="outline" arrow={false} onClick={() => open("question")}>
            Задать вопрос
          </Button>
        </div>
      </Container>
    </Section>
  );
}
