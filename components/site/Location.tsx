"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";
import { useLead } from "./Lead";
import { SITE } from "@/lib/config";

const MAP_QUERY = encodeURIComponent(`${SITE.city}, ${SITE.address}`);

export default function Location() {
  const { open } = useLead();
  return (
    <section id="location" className="bg-sand py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-cream rounded-[32px] p-7 md:p-10 flex flex-col"
        >
          <p className="text-clay uppercase tracking-[0.25em] text-xs font-bold mb-4">Как добраться</p>
          <h2 className="font-display text-[42px] md:text-[56px] leading-[1.02]">
            Йога <span className="italic text-sage">рядом с домом</span>
          </h2>
          <p className="text-muted mt-4 leading-relaxed">
            Не нужно ехать через весь город. Зал в Кунцево — удобно жителям Крылатского, Молодёжной, Кунцевской и Пионерской.
          </p>

          <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl bg-white">
            <div className="w-11 h-11 rounded-xl bg-clay/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-clay" />
            </div>
            <div>
              <p className="font-semibold text-lg">{SITE.address}</p>
              <p className="text-sm text-muted">{SITE.city}, район Кунцево</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {SITE.metro.map((m) => (
              <div key={m} className="flex items-center gap-2.5 p-4 rounded-2xl bg-white/60">
                <span className="w-6 h-6 rounded-full border-2 border-[#e4423b] text-[10px] font-bold flex items-center justify-center">М</span>
                <span className="font-medium text-sm">{m}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://yandex.ru/maps/?rtext=~${MAP_QUERY}&rtt=auto`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-14 rounded-full bg-ink text-white font-semibold flex items-center justify-center gap-2 hover:bg-sage-dark transition-colors"
            >
              <Navigation className="w-4 h-4" /> Построить маршрут
            </a>
            <button
              onClick={() => open("callback")}
              className="flex-1 h-14 rounded-full border border-ink/15 font-semibold flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Phone className="w-4 h-4" /> Перезвоните мне
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-[32px] overflow-hidden min-h-[420px] bg-white relative"
        >
          <iframe
            title="Карта: студия на Рублёвском шоссе"
            src={`https://yandex.ru/map-widget/v1/?text=${MAP_QUERY}&z=15`}
            className="absolute inset-0 w-full h-full border-0 grayscale-[35%]"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
