"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Phone, MapPin, CalendarHeart } from "lucide-react";
import { useLead, formatPhone, phoneValid, sendLead } from "./Lead";
import { Logo } from "./Hero";
import { SITE, asset, waLink } from "@/lib/config";
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
          className={"mt-10 w-full max-w-[540px] h-16 bg-white/15 backdrop-blur-md rounded-full border flex overflow-hidden " + (err ? "border-clay" : "border-white/25")}
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
    <footer className="w-full bg-cream">
      <div className="m-2 rounded-3xl overflow-hidden relative min-h-[820px] md:h-screen md:min-h-[820px] flex flex-col">
        <img src={asset("/img/studio.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-[44px] md:text-[80px] text-white leading-[1] max-w-[900px]"
          >
            Начните <span className="text-[#e9cfae]">с одного вдоха</span>
          </motion.h2>
          <p className="text-white/80 text-[17px] mt-6 max-w-md">Оставьте номер — перезвоним, ответим на вопросы и подберём время первого занятия.</p>
          <InlineCallback />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-black/25 backdrop-blur-2xl border border-white/15 rounded-3xl mx-3 md:mx-5 mb-3 md:mb-5 p-7 md:p-10 text-white"
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
                <h4 className="text-[13px] font-semibold mb-4">{c.title}</h4>
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
              <h4 className="text-[13px] font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-[13px] text-white/75">
                <li><a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" /> {SITE.phone}</a></li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {SITE.address}</li>
                <li><button onClick={() => open("trial")} className="flex items-center gap-2 hover:text-white"><CalendarHeart className="w-4 h-4" /> Записаться онлайн</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/50">
            <span>© {new Date().getFullYear()} {SITE.name} · {SITE.descriptor}</span>
            <div className="flex gap-3">
              <a href={waLink("Здравствуйте! Хочу записаться на занятие")} target="_blank" rel="noopener noreferrer" className="h-9 px-4 rounded-full border border-white/20 flex items-center hover:bg-white/10 transition-colors">WhatsApp</a>
              {SITE.telegram && (
                <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" className="h-9 px-4 rounded-full border border-white/20 flex items-center hover:bg-white/10 transition-colors">Telegram</a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export function MobileBar() {
  const { open } = useLead();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="md:hidden fixed bottom-3 inset-x-3 z-40 flex gap-2 p-2 rounded-full bg-ink/85 backdrop-blur-xl shadow-2xl border border-white/10"
        >
          <a href={`tel:${SITE.phoneHref}`} aria-label="Позвонить" className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </a>
          <button onClick={() => open("trial")} className="flex-1 h-12 rounded-full bg-clay text-white font-semibold">
            Записаться на занятие
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
