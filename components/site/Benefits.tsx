"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Wind, Smile, Zap, Feather, HeartPulse, Baby, PersonStanding, Brain, Sun } from "lucide-react";

const items = [
  { icon: PersonStanding, t: "Ровная осанка", d: "Спина перестаёт ныть к вечеру" },
  { icon: Moon, t: "Глубокий сон", d: "Засыпаете быстрее и просыпаетесь отдохнувшими" },
  { icon: Wind, t: "Свободное дыхание", d: "Дыхание становится инструментом спокойствия" },
  { icon: Brain, t: "Тишина в голове", d: "Меньше тревоги и внутреннего шума" },
  { icon: Zap, t: "Энергия", d: "Сил хватает и на работу, и на себя" },
  { icon: Feather, t: "Лёгкость", d: "Уходят зажимы в шее и плечах" },
  { icon: HeartPulse, t: "Тонус", d: "Крепкие мышцы без изнуряющих нагрузок" },
  { icon: Baby, t: "Связь с малышом", d: "Спокойная беременность и подготовка к родам" },
  { icon: Smile, t: "Своё сообщество", d: "Люди из соседних домов, которые тоже выбирают себя" },
  { icon: Sun, t: "Ритуал для себя", d: "Время, которое принадлежит только вам" },
];
const all = [...items, ...items];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const pos = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id: number;
    const tick = () => {
      if (!hover) {
        pos.current += 0.5;
        if (pos.current >= el.scrollWidth / 2) pos.current = 0;
        el.scrollLeft = pos.current;
      } else pos.current = el.scrollLeft;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [hover]);

  return (
    <section className="bg-cream py-20 px-4 md:px-20 overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h2 className="font-display text-[40px] md:text-[52px] leading-tight mb-2">
              Что меняется <span className="italic text-sage">через месяц</span>
            </h2>
            <p className="text-muted">Регулярная практика 1–2 раза в неделю</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
          <div
            ref={ref}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {all.map(({ icon: Icon, t, d }, i) => (
              <motion.div
                key={t + i}
                whileHover={{ y: -4 }}
                className="min-w-[230px] md:min-w-[260px] bg-white/70 border border-ink/5 rounded-[18px] p-7 flex flex-col gap-3 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-sage/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sage" />
                </div>
                <h3 className="font-bold text-[16px]">{t}</h3>
                <p className="text-[13px] text-muted leading-[1.5]">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
