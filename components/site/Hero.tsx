"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Menu, X } from "lucide-react";
import { useLead } from "./Lead";
import { SITE, asset } from "@/lib/config";

const NAV = [
  { label: "Направления", href: "#directions" },
  { label: "Дыхание", href: "#breath" },
  { label: "Цены", href: "#pricing" },
  { label: "Как добраться", href: "#location" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"flex items-center gap-2 font-display text-[26px] leading-none tracking-[0.12em] " + className}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" opacity="0.35" />
        <circle cx="12" cy="12" r="6" opacity="0.7" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
      {SITE.name}
    </span>
  );
}

export function Nav() {
  const { open } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-4"
    >
      <div
        className={
          "max-w-5xl mx-auto flex items-center justify-between p-[8px] rounded-full backdrop-blur-xl border transition-all duration-500 " +
          (scrolled ? "bg-ink/70 border-white/10 shadow-2xl" : "bg-white/5 border-white/10")
        }
      >
        <a href="#top" className="flex-1 flex items-center pl-3 text-white">
          <Logo />
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {NAV.map((i) => (
            <a key={i.href} href={i.href} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group">
              {i.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <a href={`tel:${SITE.phoneHref}`} className="hidden md:inline-flex text-[14px] font-medium text-white/80 hover:text-white px-3 py-2 whitespace-nowrap">
            {SITE.phone}
          </a>
          <button
            onClick={() => open("trial")}
            className="rounded-full px-5 py-2.5 text-[14px] font-semibold bg-white text-ink hover:bg-cream transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Записаться
          </button>
          <button onClick={() => setMenu(true)} aria-label="Меню" className="lg:hidden w-10 h-10 rounded-full text-white flex items-center justify-center hover:bg-white/10">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl flex flex-col p-6 text-white"
          >
            <div className="flex justify-between items-center">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-5 mt-14">
              {NAV.map((i, idx) => (
                <motion.a
                  key={i.href}
                  href={i.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="font-display text-4xl"
                >
                  {i.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <a href={`tel:${SITE.phoneHref}`} className="h-14 rounded-full border border-white/20 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
              <button onClick={() => { setMenu(false); open("trial"); }} className="h-14 rounded-full bg-clay font-semibold">
                Записаться на первое занятие
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default function Hero() {
  const { open } = useLead();
  return (
    <section id="top" className="min-h-[100svh] md:min-h-[110vh] flex flex-col bg-black relative w-full overflow-hidden grain">
      {/* «Дышащий» фон: медленный зум как вдох-выдох */}
      <motion.img
        src={asset("/img/hero.webp")}
        alt="Практика йоги в студии с видом на парк"
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] z-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: [1.12, 1.02, 1.12] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 md:via-black/35 to-black/30 md:to-black/5 z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent z-[1]" />

      {/* Пылинки в лучах солнца */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-amber-100/70 blur-[1px]"
            style={{
              width: 2 + (i % 3) * 2,
              height: 2 + (i % 3) * 2,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 90}%`,
            }}
            animate={{ y: [0, -40, 0], x: [0, 12, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration: 7 + (i % 5), repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-[140px] pb-16 z-10 max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white/90 text-sm mb-7"
        >
          <MapPin className="w-4 h-4" /> Кунцево · {SITE.address}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-white text-[52px] sm:text-6xl lg:text-[92px] leading-[0.98] max-w-3xl mb-6"
        >
          Место, где Москва
          <br />
          делает <span className="italic text-[#f3d9b8]">выдох</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white/85 max-w-[520px] leading-relaxed mb-9"
        >
          Йога, йога для беременных, TRX и МФР рядом с домом — у метро Молодёжная и Кунцевская.
          Приходите уставшими — уходите собой.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <button
            onClick={() => open("trial")}
            className="relative rounded-full px-8 py-4 text-base font-semibold bg-clay text-white hover:bg-clay-dark transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-clay/40"
          >
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-clay"
              animate={{ scale: [1, 1.18], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            Записаться на первое занятие
          </button>
          <button
            onClick={() => open("callback")}
            className="rounded-full px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/25 text-white hover:bg-white/20 transition-all"
          >
            Перезвоните мне
          </button>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-white/60 mt-4"
        >
          Разовое занятие — 1 400 ₽ · абонемент от 1 200 ₽ за занятие
        </motion.span>

        {/* Метро вместо логотипов — локальное доверие */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
          initial="hidden"
          animate="show"
          className="mt-14 md:mt-20 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.2em] w-full md:w-auto">Рядом с метро</span>
          {SITE.metro.map((m) => (
            <motion.span
              key={m}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="flex items-center gap-2 text-white/80 font-medium"
            >
              <span className="w-5 h-5 rounded-full border-2 border-[#e4423b] text-[9px] font-bold flex items-center justify-center text-white">М</span>
              {m}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
