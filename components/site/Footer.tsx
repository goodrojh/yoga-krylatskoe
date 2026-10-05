"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Phone, MapPin, CalendarHeart } from "lucide-react";
import { useLead, formatPhone, phoneValid, sendLead } from "./Lead";
import { Logo } from "./Hero";
import { Pic } from "./ui";
import { SITE } from "@/lib/config";
import { MessengerIcons, MessengerButtons } from "./Messengers";
import type { FormId } from "@/lib/forms";

function InlineCallback() {
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneValid(phone)) return setErr(true);
    await sendLead("Обратный звонок (подвал сайта)", { Телефон: phone });
    setDone(true);
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 h-16 px-8 rounded-full bg-sage text-white flex items-center gap-3 font-semibold"
        >
          <Check className="w-5 h-5" /> Спасибо! Перезвоним на {phone}
        </motion.div>
      ) : (
        <motion.form
          key="f"
          onSubmit={submit}
          noValidate
          className={"mt-10 w-full max-w-[540px] h-16 bg-black/30 md:bg-white/15 md:backdrop-blur-md rounded-full border flex overflow-hidden " + (err ? "border-clay" : "border-white/25")}
        >
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onFocus={() => !phone && setPhone("+7")}
            onChange={(e) => { setErr(false); setPhone(e.target.value ? formatPhone(e.target.value) : ""); }}
            placeholder="Ваш телефон"
            aria-label="Ваш телефон"
            className="flex-1 min-w-0 bg-transparent px-6 text-[16px] text-white placeholder:text-white/70 outline-none"
          />
          <button className="h-full px-5 sm:px-8 bg-clay text-white rounded-full text-[12px] sm:text-[13px] font-bold tracking-[0.08em] hover:bg-clay-dark transition-colors whitespace-nowrap">
            ПЕРЕЗВОНИТЕ МНЕ
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  const { open } = useLead();
  const cols: { title: string; links: { label: string; form?: FormId; href?: string }[] }[] = [
    {
      title: "Направления",
      links: [
        { label: "Йога", form: "yoga" },
        { label: "Йога для беременных", form: "prenatal" },
        { label: "TRX", form: "trx" },
        { label: "МФР", form: "mfr" },
        { label: "Персональные занятия", form: "personal" },
      ],
    },
    {
      title: "Дыхание",
      links: [
        { label: "Холотропное дыхание", form: "holotropic" },
        { label: "Вайвейшн", form: "vivation" },
        { label: "Цены", href: "#pricing" },
        { label: "Вопросы", href: "#faq" },
      ],
    },
  ];

  return (
    <footer id="footer" className="w-full bg-cream">
      <div className="m-2 rounded-3xl overflow-hidden relative min-h-[820px] md:h-screen md:min-h-[820px] flex flex-col">
        <Pic src={"/img/studio.webp"} sizes="100vw" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-10 text-center">
          <h2
            className="reveal font-display text-[44px] md:text-[80px] text-white leading-[1] max-w-[900px]"
          >
            Начните <span className="text-[#e9cfae]">с одного вдоха</span>
          </h2>
          <p className="text-white/80 text-[17px] mt-6 max-w-md">Оставьте номер — перезвоним, ответим на вопросы и подберём время первого занятия.</p>
          <InlineCallback />
        </div>

        <div style={{ transitionDelay: `${0.2}s` }}
          className="reveal relative z-10 bg-black/50 md:bg-black/25 md:backdrop-blur-xl border border-white/15 rounded-3xl mx-3 md:mx-5 mb-3 md:mb-5 p-7 md:p-10 text-white"
        >
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="md:w-[32%]">
              <Logo />
              <p className="mt-4 text-white/60 text-[13px] leading-relaxed max-w-[280px]">
                Йога-студия в Кунцево. Йога, йога для беременных, TRX, МФР и дыхательные практики.
              </p>
            </div>
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-[13px] font-semibold mb-4">{c.title}</h3>
                <ul className="space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.form ? (
                        <button onClick={() => open(l.form!)} className="text-white/65 text-[13px] hover:text-white transition-colors">{l.label}</button>
                      ) : (
                        <a href={l.href} className="text-white/65 text-[13px] hover:text-white transition-colors">{l.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-[13px] font-semibold mb-4">Контакты</h3>
              <ul className="space-y-3 text-[13px] text-white/75">
                <li><a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" /> {SITE.phone}</a></li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {SITE.address}</li>
                <li><button onClick={() => open("trial")} className="flex items-center gap-2 hover:text-white"><CalendarHeart className="w-4 h-4" /> Записаться онлайн</button></li>
                <li className="pt-2"><MessengerButtons dark className="w-[200px]" /></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/50">
            <span>© {new Date().getFullYear()} {SITE.name} · {SITE.descriptor} · Карта © OpenStreetMap</span>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar() {
  const { open } = useLead();
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const on = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    // у подвала панель убирается, чтобы не перекрывать форму и контакты
    const footer = document.getElementById("footer");
    const io = footer ? new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), { rootMargin: "0px 0px -80px 0px" }) : null;
    if (footer && io) io.observe(footer);
    return () => {
      window.removeEventListener("scroll", on);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !atFooter;
  return (
    <div
      className={
        "md:hidden fixed inset-x-3 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#1d1c19] shadow-2xl border border-white/10 transition-[transform,opacity,visibility] duration-300 " +
        // в скрытом состоянии панель не только уезжает вниз, но и становится невидимой —
        // иначе в браузерах с собственной нижней панелью (Яндекс на iOS) торчит край
        (show ? "translate-y-0 opacity-100 visible" : "translate-y-[calc(100%+48px)] opacity-0 invisible pointer-events-none")
      }
      style={{ bottom: "calc(12px + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <a href={`tel:${SITE.phoneHref}`} aria-label="Позвонить" className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
        <Phone className="w-5 h-5" />
      </a>
      <MessengerIcons size={44} ring="bg-white/10" className="!gap-1.5" />
      <button onClick={() => open("trial")} className="flex-1 h-11 rounded-full bg-clay text-white text-[15px] font-semibold">
        Записаться
      </button>
    </div>
  );
}
