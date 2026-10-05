"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Menu, X } from "lucide-react";
import { Container, Button } from "./ui";
import { MessengerIcons, MessengerButtons } from "./Messengers";
import { useLead } from "./Lead";
import { SITE, asset } from "@/lib/config";

const NAV = [
  { label: "Направления", href: "#directions" },
  { label: "Дыхание", href: "#breath" },
  { label: "Инструктор", href: "#instructor" },
  { label: "Цены", href: "#pricing" },
  { label: "Как добраться", href: "#location" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"flex items-center gap-2.5 font-display text-[20px] leading-none tracking-[0.18em] " + className}>
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
      className="fixed top-0 inset-x-0 z-50 pt-4"
    >
      <div className="max-w-[1240px] mx-auto px-3 md:px-8">
      <div
        className={
          "md:-mx-5 flex items-center justify-between p-2 rounded-full backdrop-blur-md border transition-colors duration-500 " +
          (scrolled ? "bg-[#1d1c19]/90 border-white/10 shadow-xl" : "bg-white/5 border-white/10")
        }
      >
        <a href="#top" className="flex-1 flex items-center pl-3 text-white">
          <Logo />
        </a>

        <div className="hidden xl:flex items-center gap-6">
          {NAV.map((i) => (
            <a key={i.href} href={i.href} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group">
              {i.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <a href={`tel:${SITE.phoneHref}`} className="hidden 2xl:inline-flex text-[14px] font-medium text-white/80 hover:text-white px-2 py-2 whitespace-nowrap">
            {SITE.phone}
          </a>
          <MessengerIcons className="hidden md:flex mr-1" />
          <button
            onClick={() => open("trial")}
            className="rounded-full px-5 py-2.5 text-[14px] font-semibold bg-white text-ink hover:bg-cream transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Записаться
          </button>
          <button onClick={() => setMenu(true)} aria-label="Меню" className="xl:hidden w-10 h-10 rounded-full text-white flex items-center justify-center hover:bg-white/10">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1d1c19] flex flex-col p-6 text-white overflow-y-auto"
          >
            <div className="flex justify-between items-center">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4 mt-12">
              {NAV.map((i, idx) => (
                <motion.a
                  key={i.href}
                  href={i.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="font-display text-[32px]"
                >
                  {i.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto pt-10 flex flex-col gap-3">
              <MessengerButtons dark />
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
    <section id="top" className="relative min-h-[100svh] flex flex-col bg-black w-full overflow-hidden">
      {/* «Дышащий» фон: медленный зум как вдох-выдох */}
      <img
        src={asset("/img/hero.webp")}
        srcSet={`${asset("/img/hero-sm.webp")} 860w, ${asset("/img/hero.webp")} 2000w`}
        sizes="100vw"
        alt="Практика йоги в студии с видом на парк"
        className="hero-breathe absolute inset-0 w-full h-full object-cover object-[70%_center] z-0"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 md:via-black/35 to-black/30 md:to-black/0 z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 to-transparent z-[1]" />

      <Container className="relative z-10 w-full flex-1 flex flex-col pt-36 md:pt-44 pb-10">
        <div className="flex-1 flex flex-col justify-center max-w-[680px]">
          <p
            className="flex items-center gap-2 text-white/75 text-[15px] mb-6"
          >
            <MapPin className="w-4 h-4" /> Кунцево · {SITE.address}
          </p>

          <h1
            className="font-display text-white text-[44px] sm:text-[64px] lg:text-[80px] leading-[1] mb-6"
          >
            Место, где Москва <span className="text-[#e9cfae]">делает выдох</span>
          </h1>

          <p
            className="text-[17px] text-white/80 max-w-[520px] leading-relaxed mb-10"
          >
            Йога, йога для беременных, TRX и МФР рядом с домом — у метро Молодёжная и Кунцевская.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button onClick={() => open("trial")}>Записаться на первое занятие</Button>
            <Button variant="outline-light" arrow={false} onClick={() => open("callback")}>
              Перезвоните мне
            </Button>
          </div>
        </div>

        {/* Нижняя линейка: цены и метро — на одной базовой линии */}
        <div
            className="mt-16 pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-6 gap-y-5 gap-x-6 text-white"
        >
          <div className="col-span-2 lg:col-span-2">
            <p className="text-white/50 text-[13px] mb-1">Разовое занятие</p>
            <p className="font-display text-[22px]">1 400 ₽ <span className="text-white/50 text-[15px] font-sans font-normal tracking-normal">· абонемент от 1 200 ₽</span></p>
          </div>
          {SITE.metro.map((m) => (
            <div key={m} className="flex items-center gap-2.5 text-[15px] text-white/85">
              <span className="w-5 h-5 rounded-full border-2 border-[#e4423b] text-[9px] font-bold flex items-center justify-center shrink-0">М</span>
              {m}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
